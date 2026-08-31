import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { leadSchema } from '@/lib/leads.server';
import { LEAD_RULES, type LeadResult } from '@/lib/leads';
import { SERVICES } from '@/content/services';
import { autoReplyEmail, notificationEmail } from '@/lib/email/templates';
import { sendMail, isMailConfigured, MAIL_TARGETS } from '@/lib/email/mailer';

/**
 * The only server surface on the site. Every page is static HTML; this one
 * route handler exists so the Supabase service-role key never reaches a
 * browser and so validation cannot be bypassed by editing the DOM.
 *
 * Runs on Node rather than the edge because the Supabase service-role client
 * and the crypto hashing below are both simpler there, and this endpoint is
 * called a handful of times a day — edge latency is irrelevant.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** Minimum time a human plausibly takes to fill the form. */
const MIN_ELAPSED_MS = LEAD_RULES.minElapsedMs;

/**
 * In-memory rate limit: 5 submissions per IP per hour.
 *
 * Deliberately simple. This is a low-traffic contact form, and the map resets
 * on deploy — which is fine, because it exists to blunt casual abuse, not to
 * be an authoritative quota. If the site ever needs a real limit across
 * instances, move this to Supabase or Upstash; the call site does not change.
 */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const attempts = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    attempts.set(key, recent);
    return true;
  }
  recent.push(now);
  attempts.set(key, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (attempts.size > 5000) {
    for (const [k, times] of attempts) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) attempts.delete(k);
    }
  }
  return false;
}

/**
 * Hash the IP rather than storing it.
 *
 * We want to be able to spot repeat submissions without holding personal data
 * we have no use for. The salt means the stored value is not reversible via a
 * rainbow table of the ~4 billion IPv4 addresses.
 */
async function hashIp(ip: string): Promise<string> {
  const salt = process.env.LEAD_IP_SALT ?? 'no-salt-configured';
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .slice(0, 16)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function fail(message: string, status: number, fieldErrors?: Record<string, string>) {
  return NextResponse.json<LeadResult>({ ok: false, message, fieldErrors }, { status });
}

export async function POST(request: Request) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    // Misconfiguration is our problem, not the visitor's — tell them a way to
    // reach us that does not depend on this endpoint.
    console.error('[contact] Supabase environment variables are not set.');
    return fail(
      'Our contact form is temporarily unavailable. Please email us directly and we will reply the same day.',
      503,
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return fail('Malformed request.', 400);
  }

  const parsed = leadSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form');
      fieldErrors[key] ??= issue.message;
    }
    return fail('Please check the highlighted fields.', 422, fieldErrors);
  }

  const lead = parsed.data;

  // ── Spam gates ───────────────────────────────────────────────────────────
  // Both return a success response on purpose. Telling a bot precisely why it
  // was rejected is free information for tuning the next attempt; a human can
  // never hit either of these.
  if (lead.website) {
    console.warn('[contact] honeypot triggered');
    return NextResponse.json<LeadResult>({ ok: true });
  }

  if (typeof lead.elapsedMs === 'number' && lead.elapsedMs < MIN_ELAPSED_MS) {
    console.warn('[contact] submitted too fast', lead.elapsedMs);
    return NextResponse.json<LeadResult>({ ok: true });
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  if (isRateLimited(ip)) {
    return fail(
      'You have sent several enquiries recently. Please email us directly instead.',
      429,
    );
  }

  // ── Insert ───────────────────────────────────────────────────────────────
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error } = await supabase.from('leads').insert({
    name: lead.name,
    email: lead.email,
    phone: lead.phone || null,
    company: lead.company || null,
    service_slug: lead.service || null,
    // budget_band is left unwritten — the form no longer asks. The column stays
    // in the schema so previously collected bands are not destroyed.
    message: lead.message,
    source_path: lead.sourcePath || null,
    ip_hash: await hashIp(ip),
    user_agent: request.headers.get('user-agent')?.slice(0, 300) ?? null,
  });

  if (error) {
    console.error('[contact] insert failed:', error.message);
    return fail(
      'We could not save your enquiry. Please email us directly and we will pick it up.',
      500,
    );
  }

  // ── Notify, and acknowledge ──────────────────────────────────────────────
  //
  // Deliberately AFTER the insert and deliberately not allowed to fail the
  // request. The database row is the durable record of the enquiry; email is
  // how we find out about it quickly. If SMTP is down, the lead is still
  // captured and still visible in Supabase, and telling the visitor their
  // enquiry failed would be a lie that costs us the lead.
  //
  // The two sends run concurrently because neither depends on the other, and
  // a visitor waiting on a spinner should not pay for two sequential SMTP
  // round trips.
  await sendLeadEmails(lead);

  return NextResponse.json<LeadResult>({ ok: true });
}

/** Resolve the stored slug to the title a human recognises. */
function serviceTitle(slug: string | undefined): string | undefined {
  if (!slug) return undefined;
  if (slug === 'not-sure') return 'Not sure yet';
  return SERVICES.find((s) => s.slug === slug)?.title;
}

async function sendLeadEmails(lead: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
  sourcePath?: string;
}): Promise<void> {
  if (!isMailConfigured()) {
    // Loud, because in production this means enquiries are arriving and
    // nobody is being told. The lead is safe in the database either way.
    console.warn('[contact] SMTP not configured: lead saved, no email sent.');
    return;
  }

  const fields = {
    name: lead.name,
    email: lead.email,
    phone: lead.phone || undefined,
    company: lead.company || undefined,
    service: serviceTitle(lead.service),
    message: lead.message,
    sourcePath: lead.sourcePath || undefined,
  };

  const notify = notificationEmail(fields, { submittedAt: new Date() });
  const reply = autoReplyEmail(fields);

  const [notified, replied] = await Promise.all([
    sendMail({
      to: MAIL_TARGETS.notifyTo,
      subject: notify.subject,
      html: notify.html,
      text: notify.text,
      // So that hitting reply in Gmail writes to the enquirer, not to
      // ourselves. This is the single most useful line in this function.
      replyTo: `${lead.name} <${lead.email}>`,
    }),
    sendMail({
      to: `${lead.name} <${lead.email}>`,
      subject: reply.subject,
      html: reply.html,
      text: reply.text,
      headers: {
        // Marks this as machine-generated so that an out-of-office or another
        // autoresponder on their side does not reply to it and start a loop.
        // Auto-Submitted is the RFC 3834 header; the X- ones are what
        // Microsoft and older systems actually honour.
        'Auto-Submitted': 'auto-replied',
        'X-Auto-Response-Suppress': 'All',
        Precedence: 'auto_reply',
      },
    }),
  ]);

  if (!notified) console.error('[contact] notification email failed for', lead.email);
  if (!replied) console.error('[contact] auto-reply failed for', lead.email);
}
