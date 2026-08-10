/**
 * Lead capture — the CLIENT-SAFE half.
 *
 * ── Why there is no zod in this file ──
 *
 * The obvious design puts one zod schema here and imports it from both the
 * form and the route handler. It reads well and it cost 66KB gzipped in the
 * client bundle — zod is a full parser, and the browser was downloading all of
 * it to check that an email contains an "@".
 *
 * So the responsibilities are split along the line they should have been on
 * anyway:
 *
 *   • This file — plain functions, zero dependencies. Client-side validation
 *     is a UX convenience: catch mistakes before a round trip.
 *   • lib/leads.server.ts — the zod schema. Server-side validation is the
 *     actual security boundary, because anything the browser checks can be
 *     bypassed by posting straight to the endpoint.
 *
 * The two are kept in step by `LEAD_RULES` below, which both sides read.
 */

/* NO BUDGET BAND. The form used to ask for one from a list of PKR ranges;
 * the site publishes no figures now and does not ask for one either. The
 * `budget_band` column still exists in supabase/migrations/0001_create_leads.sql
 * and simply stops being written — dropping it would destroy the bands already
 * collected against past leads, which is a data decision, not a form one. */

/** Shared limits. lib/leads.server.ts builds its zod schema from these. */
export const LEAD_RULES = {
  name: { min: 2, max: 100 },
  email: { max: 200 },
  phone: { max: 40 },
  company: { max: 150 },
  message: { min: 10, max: 4000 },
  /** Below this, the submission was not typed by a human. */
  minElapsedMs: 2000,
} as const;

export interface LeadInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
  sourcePath?: string;
  /** Honeypot. Invisible to real users; anything here is a bot. */
  website?: string;
  /** Milliseconds from form mount to submit. */
  elapsedMs?: number;
}

export type LeadResult =
  | { ok: true }
  | { ok: false; message: string; fieldErrors?: Record<string, string> };

/**
 * Deliberately permissive email check.
 *
 * A strict RFC 5322 regex rejects addresses that are perfectly valid and
 * deliverable, which loses real leads. "Something, an @, something with a dot"
 * catches every realistic typo; whether the address actually receives mail is
 * settled by sending to it, not by a regex.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Client-side validation. Returns a field → message map; empty means valid.
 * The server re-validates everything regardless of what this returns.
 */
export function validateLead(input: LeadInput): Record<string, string> {
  const errors: Record<string, string> = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const message = input.message.trim();

  if (name.length < LEAD_RULES.name.min) {
    errors.name = 'Please enter your name.';
  } else if (name.length > LEAD_RULES.name.max) {
    errors.name = 'That name is too long.';
  }

  if (!email) {
    errors.email = 'We need an email to reply to.';
  } else if (!EMAIL_PATTERN.test(email) || email.length > LEAD_RULES.email.max) {
    errors.email = 'That does not look like a valid email address.';
  }

  if ((input.phone ?? '').length > LEAD_RULES.phone.max) {
    errors.phone = 'That phone number is too long.';
  }

  if ((input.company ?? '').length > LEAD_RULES.company.max) {
    errors.company = 'That company name is too long.';
  }

  if (message.length < LEAD_RULES.message.min) {
    errors.message = 'Tell us a little more, at least a sentence.';
  } else if (message.length > LEAD_RULES.message.max) {
    errors.message = 'That message is too long. Please email us instead.';
  }

  return errors;
}

/**
 * Submit a lead.
 *
 * ── The portability seam ──
 *
 * This is the ONLY place the site talks to a lead backend. Today it posts to
 * /api/contact, which writes to Supabase with a service-role key that never
 * reaches the browser.
 *
 * If the site ever needs to be a fully static export (`output: 'export'` on
 * cPanel, Netlify, GitHub Pages), the body of this one function becomes a
 * direct `supabase-js` insert against an insert-only RLS policy. Nothing else
 * in the codebase moves — no component imports a backend directly.
 */
export async function submitLead(input: LeadInput): Promise<LeadResult> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    const data = (await response.json()) as LeadResult;

    if (!response.ok) {
      return data.ok === false
        ? data
        : { ok: false, message: 'Something went wrong. Please try again.' };
    }

    return data;
  } catch {
    // Network failure, offline, or a blocked request. Give the user a route
    // that does not depend on our infrastructure working.
    return {
      ok: false,
      message:
        'We could not reach our server. Please check your connection, or email us directly.',
    };
  }
}
