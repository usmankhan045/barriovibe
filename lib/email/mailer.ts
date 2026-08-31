import 'server-only';
import nodemailer, { type Transporter } from 'nodemailer';
import { BRAND, CONTACT } from '@/content/site';

/**
 * Outbound mail.
 *
 * ── Why Gmail SMTP and not a mail API ──
 *
 * The firm's published address is a Gmail account and there is no mail on the
 * barriovibe.com domain. That single fact settles the design:
 *
 * A provider like Resend or SendGrid can only send as an address on a domain
 * you have proved you own. With no domain mailbox, everything it sent would
 * come from a provider test sender, which is both off-brand and the kind of
 * mismatch (`From: onboarding@resend.dev` claiming to be BarrioVibe) that
 * lands in spam. Authenticating with the Gmail account itself sidesteps all of
 * it: Google signs the message with its own SPF and DKIM, the address in the
 * From line is one that genuinely receives mail, and a reply from a recipient
 * arrives in the same inbox a human already reads.
 *
 * ── Switching to domain mail later is one environment variable ──
 *
 * Nothing below hardcodes Gmail. `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` /
 * `SMTP_PASS` describe any SMTP server, and `MAIL_FROM` sets the visible
 * sender. Point them at Google Workspace, Zoho, Fastmail or an SES relay on
 * barriovibe.com and this file does not change.
 */

const SMTP_HOST = process.env.SMTP_HOST ?? 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 465);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

/**
 * Where enquiry notifications land. Defaults to the address the site
 * publishes, so the form and the contact page can never point at different
 * inboxes without someone deciding to set this.
 */
const NOTIFY_TO = process.env.CONTACT_NOTIFY_TO ?? CONTACT.email;

/**
 * The visible From address.
 *
 * Gmail will not let you forge this: SMTP authenticated as the account can
 * only send as that account or one of its verified aliases, and anything else
 * is silently rewritten. So this defaults to SMTP_USER rather than to
 * something aspirational, and the display name carries the brand.
 */
const MAIL_FROM = process.env.MAIL_FROM ?? `${BRAND.name} <${SMTP_USER ?? CONTACT.email}>`;

export function isMailConfigured(): boolean {
  return Boolean(SMTP_USER && SMTP_PASS);
}

/**
 * One transporter, reused.
 *
 * `pool: true` keeps the TCP+TLS connection open between sends. Without it
 * every message pays a fresh handshake to Gmail, which on a serverless
 * instance handling two sends back to back is the slowest thing in the
 * request. Module scope means the pool survives between invocations on a warm
 * instance and is rebuilt on a cold one.
 */
let cached: Transporter | null = null;

function transporter(): Transporter {
  if (cached) return cached;
  cached = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    // 465 is implicit TLS; 587 upgrades with STARTTLS. Deriving this from the
    // port rather than asking for a flag removes a way to misconfigure it.
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    pool: true,
    maxConnections: 2,
    // A hung SMTP dial must not hold the request open until the platform's
    // own timeout kills it: the lead is already saved, so failing fast and
    // letting the caller move on is strictly better than waiting.
    //
    // These are deliberately short. Measured against a local SMTP server the
    // whole two-message send completes in ~170ms, so a dial still unanswered
    // after 5s is not slow, it is broken. The visitor is watching a spinner
    // the entire time this runs, and the worst case they can experience is
    // the sum of these.
    connectionTimeout: 5_000,
    greetingTimeout: 5_000,
    socketTimeout: 10_000,
  });
  return cached;
}

export interface OutboundMail {
  to: string;
  subject: string;
  html: string;
  text: string;
  /** Where a reply should go, when that is not us. */
  replyTo?: string;
  /** Set on the auto-reply. See the note at the call site. */
  headers?: Record<string, string>;
}

/**
 * Send one message. Resolves to whether it was sent.
 *
 * Never throws. Every caller here is running after the lead has already been
 * written to the database, and at that point the visitor's enquiry is safe:
 * failing their request because our SMTP credentials expired would lose a
 * lead we have, to report a problem only we can fix.
 */
export async function sendMail(mail: OutboundMail): Promise<boolean> {
  if (!isMailConfigured()) {
    console.warn('[mail] SMTP is not configured; skipping send to', mail.to);
    return false;
  }

  try {
    await transporter().sendMail({
      from: MAIL_FROM,
      to: mail.to,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
      replyTo: mail.replyTo,
      headers: mail.headers,
    });
    return true;
  } catch (error) {
    console.error(
      '[mail] send failed:',
      error instanceof Error ? error.message : String(error),
    );
    return false;
  }
}

export const MAIL_TARGETS = { notifyTo: NOTIFY_TO, from: MAIL_FROM } as const;
