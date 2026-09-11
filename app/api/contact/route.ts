import { NextResponse } from 'next/server';
import { leadSchema } from '@/lib/leads.server';
import { LEAD_RULES, type LeadResult } from '@/lib/leads';
import { SERVICES } from '@/content/services';
import { autoReplyEmail, notificationEmail } from '@/lib/email/templates';
import { sendMail, isMailConfigured, MAIL_TARGETS } from '@/lib/email/mailer';

/**
 * The only server surface on the site. Every page is static HTML; this one
 * route handler exists so credentials never reach a browser and so validation
 * cannot be bypassed by editing the DOM.
 *
 * ── Email is the system of record ──
 *
 * Gmail SMTP is the only backend this route requires. A submission is captured
 * when the notification email is accepted by Gmail, and that is what the
 * visitor's success message means.
 *
 * Supabase is OPTIONAL. When SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are
 * set, the lead is also written to a table, which buys a searchable archive
 * that survives a mailbox being cleared. When they are unset the route skips
 * the write and nothing else changes. Adding it later means filling in two
 * environment variables, not editing code.
 *
 * Runs on Node rather than the edge because nodemailer needs a TCP socket,
 * which the edge runtime does not provide.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** Supabase is an optional archive. See the note at the top of this file. */
const archiveEnabled = Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);

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
  if (!isMailConfigured()) {
    // Misconfiguration is our problem, not the visitor's, so give them a way
    // to reach us that does not depend on this endpoint.
    console.error('[contact] SMTP is not configured; cannot accept enquiries.');
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

  // ── Archive, if one is configured ────────────────────────────────────────
  //
  // Best effort on purpose. The email below is the record that matters, so a
  // database that is unreachable, misconfigured or simply absent must not cost
  // us a lead that Gmail would have delivered perfectly well.
  await archiveLead(lead, {
    ipHash: await hashIp(ip),
    userAgent: request.headers.get('user-agent')?.slice(0, 300) ?? null,
  });

  // ── Notify, and acknowledge ──────────────────────────────────────────────
  //
  // This send IS the capture. With no database in front of it there is no
  // second copy of the enquiry, so unlike the archive above it is allowed to
  // fail the request: telling someone we have their message when it never
  // reached an inbox loses them silently, and they never learn to try again.
  const delivered = await sendLeadEmails(lead);

  if (!delivered) {
    return fail(
      'We could not send your enquiry just now. Please email or WhatsApp us directly and we will pick it up.',
      502,
    );
  }

  return NextResponse.json<LeadResult>({ ok: true });
}

/**
 * Write the lead to Supabase when it is configured. Never throws.
 *
 * The import is dynamic so `@supabase/supabase-js` is only pulled into the
 * serverless bundle when it is actually going to be used.
 */
async function archiveLead(
  lead: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    service?: string;
    message: string;
    sourcePath?: string;
  },
  meta: { ipHash: string; userAgent: string | null },
): Promise<void> {
  if (!archiveEnabled) return;

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { error } = await supabase.from('leads').insert({
      name: lead.name,
      email: lead.email,
      phone: lead.phone || null,
      company: lead.company || null,
      service_slug: lead.service || null,
      // budget_band is left unwritten. The form no longer asks; the column
      // stays so previously collected bands are not destroyed.
      message: lead.message,
      source_path: lead.sourcePath || null,
      ip_hash: meta.ipHash,
      user_agent: meta.userAgent,
    });

    if (error) console.error('[contact] archive insert failed:', error.message);
  } catch (error) {
    console.error(
      '[contact] archive unavailable:',
      error instanceof Error ? error.message : String(error),
    );
  }
}

/** Resolve the stored slug to the title a human recognises. */
function serviceTitle(slug: string | undefined): string | undefined {
  if (!slug) return undefined;
  if (slug === 'not-sure') return 'Not sure yet';
  return SERVICES.find((s) => s.slug === slug)?.title;
}

/**
 * Send the notification and the auto-reply.
 *
 * Resolves to whether the NOTIFICATION reached Gmail, because that is the one
 * that decides whether we learn about the enquiry at all. A failed auto-reply
 * is a worse experience for the enquirer but costs us nothing: we still have
 * their message and can answer it by hand.
 */
async function sendLeadEmails(lead: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
  sourcePath?: string;
}): Promise<boolean> {
  if (!isMailConfigured()) {
    // Unreachable: POST returns 503 before reaching here. Kept so the function
    // stays correct if it is ever called from somewhere else.
    console.warn('[contact] SMTP not configured; no email sent.');
    return false;
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

  // Sequential, not Promise.all. The pooled transporter opens a second
  // connection for a concurrent pair, so a provider that throttles connections
  // fails the auto-reply on a greeting timeout while the notification
  // succeeds. Two sends over one warm connection cost roughly 170ms together,
  // which is not worth a whole class of flakiness.
  const notified = await sendMail({
    to: MAIL_TARGETS.notifyTo,
    subject: notify.subject,
    html: notify.html,
    text: notify.text,
    // So that hitting reply in Gmail writes to the enquirer, not to ourselves.
    // This is the single most useful line in this function.
    replyTo: `${lead.name} <${lead.email}>`,
  });

  const replied = await sendMail({
    to: `${lead.name} <${lead.email}>`,
    subject: reply.subject,
    html: reply.html,
    text: reply.text,
    headers: {
      // Marks this as machine-generated so an out-of-office or another
      // autoresponder on their side does not reply to it and start a loop.
      // Auto-Submitted is the RFC 3834 header; the X- ones are what Microsoft
      // and older systems actually honour.
      'Auto-Submitted': 'auto-replied',
      'X-Auto-Response-Suppress': 'All',
      Precedence: 'auto_reply',
    },
  });

  if (!notified) console.error('[contact] notification email failed for', lead.email);
  if (!replied) console.error('[contact] auto-reply failed for', lead.email);

  return notified;
}
