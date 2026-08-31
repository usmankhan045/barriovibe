import { BRAND, CONTACT, SOCIALS } from '@/content/site';
import { TOKENS } from '@/lib/tokens';

/**
 * The two emails the contact form sends: an auto-reply to the enquirer and a
 * notification to us.
 *
 * ── Why this file looks like it was written in 2004 ──
 *
 * Because it has to be. Email clients are not browsers. Outlook on Windows
 * renders through Microsoft Word's HTML engine, Gmail strips `<style>` blocks
 * from forwarded mail, and neither supports flexbox, grid, custom properties
 * or `rem`. The rules this file follows, all of them load-bearing:
 *
 *   • Tables for layout. Not divs, not flex.
 *   • Inline `style` attributes on every element. A class is a suggestion.
 *   • Hex colours written out literally. `var(--color-blue-600)` is nothing
 *     in an email, which is why the values come from lib/tokens.ts, the one
 *     other file allowed to hold hex, and the one `check:tokens` verifies
 *     against app/tokens.css so these cannot drift from the site.
 *   • Pixels for every dimension.
 *   • No background-image for anything that carries meaning. Most clients
 *     block remote images until the reader clicks "show images", so the
 *     wordmark here is TEXT styled to look like the site's lockup rather
 *     than the PNG in public/brand. An email whose branding disappears in
 *     the default view is worse than one that never had an image.
 *   • Max width 600px, the width every client renders without reflowing.
 *
 * ── Accessibility and the plain-text half ──
 *
 * Every message ships a text/plain alternative built by the same function
 * that builds the HTML, so the two cannot describe different things. That is
 * not politeness: a message with no text part scores worse with spam filters,
 * and some corporate gateways strip HTML outright.
 */

/* The brand palette, resolved once. These are the same values the site
   renders; see the note above on why they are literals here. */
const C = {
  blue600: TOKENS.blue600,
  blue800: TOKENS.blue800,
  blue900: TOKENS.blue900,
  ink: TOKENS.silver900,
  body: TOKENS.body,
  faintLine: TOKENS.line,
  band: TOKENS.band,
  surface: TOKENS.surface,
  blue50: TOKENS.blue50,
  blue100: TOKENS.blue100,
} as const;

/* Satoshi and Inter are webfonts the site loads and an email client will not.
   The stack degrades to the system UI face, which is what the major clients
   use for their own chrome and reads correctly everywhere. */
const FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

/**
 * Escape text before it goes into HTML.
 *
 * Every interpolation below is attacker-controlled: the name, company and
 * message all come straight from a public form. Without this, a message
 * containing `<script>` or a stray `</td>` would either break the layout of
 * the mail we read or inject markup into it.
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Preserve the enquirer's paragraph breaks without trusting their markup. */
function paragraphs(text: string): string {
  return escapeHtml(text)
    .split(/\n{2,}/)
    .map(
      (block) =>
        `<p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:${C.ink};">${block.replace(
          /\n/g,
          '<br />',
        )}</p>`,
    )
    .join('');
}

/**
 * The wordmark, as text.
 *
 * The site's lockup is a glyph plus the name. Here it is the name alone, in
 * the brand blue at the weight the header uses, for the reason in the file
 * header: a remote image is blocked by default in most clients and a brand
 * that only appears after a click is not a brand. The mark reads as ours
 * because of the colour and the setting, which survive image blocking.
 */
function wordmark(): string {
  return `<span style="font-family:${FONT};font-size:21px;font-weight:700;letter-spacing:-0.02em;color:${C.surface};">${BRAND.name}</span>`;
}

/** Wraps body content in the shell every message shares. */
function shell({
  preheader,
  heading,
  headingSub,
  body,
}: {
  preheader: string;
  heading: string;
  headingSub?: string;
  body: string;
}): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>${escapeHtml(heading)}</title>
</head>
<body style="margin:0;padding:0;background-color:${C.band};">
<!-- The preheader: the grey line a client shows after the subject in the
     inbox list. Left unset, clients pull the first text they find, which is
     usually the wordmark or a link. It is hidden in the message itself. -->
<div style="display:none;font-size:1px;color:${C.band};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(preheader)}</div>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${C.band};">
<tr>
<td align="center" style="padding:32px 16px;">

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:100%;background-color:${C.surface};border-radius:14px;overflow:hidden;border:1px solid ${C.faintLine};">

    <!-- Masthead. The CTA band's gradient, flattened to blue-600 with a
         bgcolor fallback: Outlook ignores CSS gradients entirely, so the
         gradient is progressive enhancement over a solid brand blue. -->
    <tr>
      <td style="background-color:${C.blue600};background-image:linear-gradient(135deg, ${C.blue600} 0%, ${C.blue800} 58%, ${C.blue900} 100%);padding:26px 32px;">
        ${wordmark()}
        <div style="margin-top:4px;font-family:${FONT};font-size:12px;letter-spacing:0.04em;color:${C.blue100};">${escapeHtml(BRAND.descriptor)}</div>
      </td>
    </tr>

    <tr>
      <td style="padding:34px 32px 8px;">
        <h1 style="margin:0;font-family:${FONT};font-size:22px;line-height:1.3;font-weight:700;color:${C.ink};">${escapeHtml(heading)}</h1>
        ${
          headingSub
            ? `<p style="margin:10px 0 0;font-family:${FONT};font-size:15px;line-height:1.6;color:${C.body};">${escapeHtml(headingSub)}</p>`
            : ''
        }
      </td>
    </tr>

    <tr>
      <td style="padding:18px 32px 34px;font-family:${FONT};">
        ${body}
      </td>
    </tr>

    <tr>
      <td style="padding:22px 32px 26px;background-color:${C.band};border-top:1px solid ${C.faintLine};font-family:${FONT};">
        <p style="margin:0 0 6px;font-size:13px;line-height:1.6;color:${C.body};">
          <a href="mailto:${CONTACT.email}" style="color:${C.blue600};text-decoration:none;">${CONTACT.email}</a>
          &nbsp;·&nbsp;
          <a href="https://wa.me/${CONTACT.whatsapp}" style="color:${C.blue600};text-decoration:none;">${escapeHtml(CONTACT.phone)}</a>
        </p>
        <p style="margin:0 0 14px;font-size:13px;line-height:1.6;color:${C.body};">
          ${escapeHtml(CONTACT.address.city)}, ${escapeHtml(CONTACT.address.country)} &nbsp;·&nbsp; ${escapeHtml(CONTACT.hours)}
        </p>
        <p style="margin:0 0 14px;font-size:13px;line-height:1.6;">
          ${SOCIALS.map(
            (s) =>
              `<a href="${s.href}" style="color:${C.blue600};text-decoration:none;">${escapeHtml(s.label)}</a>`,
          ).join(`<span style="color:${C.body};"> · </span>`)}
        </p>
        <p style="margin:0;font-size:12px;line-height:1.6;color:${C.body};">
          © ${new Date().getFullYear()} ${escapeHtml(BRAND.legalName)}. All rights reserved.<br />
          <a href="${BRAND.domain}" style="color:${C.body};text-decoration:underline;">${BRAND.domain.replace(/^https:\/\//, '')}</a>
        </p>
      </td>
    </tr>

  </table>

</td>
</tr>
</table>
</body>
</html>`;
}

export interface LeadEmailFields {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  /** Human-readable service title, already resolved from the slug. */
  service?: string;
  message: string;
  sourcePath?: string;
}

/* ── 1. The auto-reply, to the person who filled the form ─────────────────── */

/**
 * Deliberately not a receipt.
 *
 * The useful thing to send someone who has just written to a firm is not a
 * copy of their own words with "we have received your message" on top. It is
 * an answer to the question they are actually holding: when do I hear back,
 * and from whom. So the reply-time promise is the first thing in the body and
 * the only element given a panel of its own; their message is quoted below it
 * so they can see what we actually got, which also makes this mail useful to
 * search for later.
 */
export function autoReplyEmail(lead: LeadEmailFields): {
  subject: string;
  html: string;
  text: string;
} {
  const firstName = lead.name.trim().split(/\s+/)[0] || lead.name.trim();

  const body = `
    <!-- The promise. A panel because it is the one thing in this mail the
         reader needs.
         The tint alone carries it, with no accent rule down the side. That
         construction (a thick coloured border on one edge of a tinted box) is
         the stock "callout" every template generator emits, and it is not a
         device this site uses anywhere. The site's own equivalent panel is the
         <noscript> notice in components/sections/ContactForm.tsx: bg-blue-50,
         one uniform radius, no border. This is that panel, in email markup. -->
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 26px;">
      <tr>
        <td style="background-color:${C.blue50};border-radius:10px;padding:16px 18px;">
          <p style="margin:0;font-size:15px;line-height:1.6;color:${C.ink};font-weight:600;">${escapeHtml(CONTACT.responseTime)}</p>
          <p style="margin:6px 0 0;font-size:13.5px;line-height:1.6;color:${C.body};">We are here ${escapeHtml(CONTACT.hours)}. If it is urgent, WhatsApp is the fastest way to reach us.</p>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${C.body};">What you sent us</p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 26px;border:1px solid ${C.faintLine};border-radius:10px;">
      <tr>
        <td style="padding:18px 20px;">
          ${lead.service ? `<p style="margin:0 0 12px;font-size:13.5px;color:${C.body};"><strong style="color:${C.ink};">Service:</strong> ${escapeHtml(lead.service)}</p>` : ''}
          ${paragraphs(lead.message)}
        </td>
      </tr>
    </table>

    <!-- A bulletproof button: the table + bgcolor construction, because a
         styled <a> alone loses its background in Outlook and becomes a bare
         blue link. -->
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 8px;">
      <tr>
        <td align="center" bgcolor="${C.blue600}" style="border-radius:8px;">
          <a href="https://wa.me/${CONTACT.whatsapp}" style="display:inline-block;padding:13px 26px;font-family:${FONT};font-size:14.5px;font-weight:600;color:${C.surface};text-decoration:none;border-radius:8px;">Message us on WhatsApp</a>
        </td>
      </tr>
    </table>
    <p style="margin:14px 0 0;font-size:13.5px;line-height:1.65;color:${C.body};">
      You can also just reply to this email: it reaches the same inbox and we will pick it up there.
    </p>
  `;

  const html = shell({
    preheader: `Thanks ${firstName}. ${CONTACT.responseTime}`,
    heading: `Thanks, ${firstName}. We have your enquiry.`,
    headingSub: `A real person at ${BRAND.name} is reading this, not an autoresponder queue. Here is what happens next.`,
    body,
  });

  const text = [
    `Thanks, ${firstName}. We have your enquiry.`,
    '',
    `A real person at ${BRAND.name} is reading this, not an autoresponder queue.`,
    '',
    CONTACT.responseTime,
    `We are here ${CONTACT.hours}. If it is urgent, WhatsApp is the fastest way to reach us:`,
    `https://wa.me/${CONTACT.whatsapp}`,
    '',
    'WHAT YOU SENT US',
    lead.service ? `Service: ${lead.service}` : null,
    '',
    lead.message,
    '',
    'You can also just reply to this email: it reaches the same inbox.',
    '',
    '---',
    `${BRAND.name}: ${BRAND.descriptor}`,
    `${CONTACT.email} · ${CONTACT.phone}`,
    `${CONTACT.address.city}, ${CONTACT.address.country}`,
    BRAND.domain,
  ]
    // null marks a field the enquirer left blank. An empty string is a
    // deliberate blank line and has to survive.
    .filter((line): line is string => line !== null)
    .join('\n');

  return {
    subject: `Thanks for contacting ${BRAND.name}, ${firstName}`,
    html,
    text,
  };
}

/* ── 2. The notification, to us ───────────────────────────────────────────── */

/**
 * Built for triage, not for looks.
 *
 * The subject line carries the name and the service so the inbox list alone
 * says whether this needs opening now, and the fields are a table because the
 * first thing anyone does with a lead is scan for the phone number. The
 * enquirer's address goes in Reply-To (see mailer.ts), so hitting reply in
 * Gmail writes to them rather than to ourselves.
 */
export function notificationEmail(
  lead: LeadEmailFields,
  meta: { submittedAt: Date },
): { subject: string; html: string; text: string } {
  const row = (label: string, value: string, href?: string) => `
    <tr>
      <td style="padding:11px 0;border-bottom:1px solid ${C.faintLine};font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${C.body};width:120px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:11px 0;border-bottom:1px solid ${C.faintLine};font-size:14.5px;color:${C.ink};vertical-align:top;">${
        href
          ? `<a href="${href}" style="color:${C.blue600};text-decoration:none;">${escapeHtml(value)}</a>`
          : escapeHtml(value)
      }</td>
    </tr>`;

  const body = `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 24px;">
      ${row('Name', lead.name)}
      ${row('Email', lead.email, `mailto:${lead.email}`)}
      ${lead.phone ? row('Phone', lead.phone, `tel:${lead.phone.replace(/[^\d+]/g, '')}`) : ''}
      ${lead.company ? row('Company', lead.company) : ''}
      ${lead.service ? row('Service', lead.service) : ''}
      ${row('Received', meta.submittedAt.toLocaleString('en-PK', { timeZone: 'Asia/Karachi', dateStyle: 'medium', timeStyle: 'short' }) + ' PKT')}
      ${lead.sourcePath ? row('Page', lead.sourcePath, `${BRAND.domain}${lead.sourcePath}`) : ''}
    </table>

    <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${C.body};">Message</p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 24px;border:1px solid ${C.faintLine};border-radius:10px;">
      <tr><td style="padding:18px 20px;">${paragraphs(lead.message)}</td></tr>
    </table>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td align="center" bgcolor="${C.blue600}" style="border-radius:8px;">
          <a href="mailto:${lead.email}?subject=${encodeURIComponent(`Re: your enquiry to ${BRAND.name}`)}" style="display:inline-block;padding:12px 24px;font-family:${FONT};font-size:14px;font-weight:600;color:${C.surface};text-decoration:none;border-radius:8px;">Reply to ${escapeHtml(lead.name.split(/\s+/)[0] ?? lead.name)}</a>
        </td>
      </tr>
    </table>
  `;

  const html = shell({
    preheader: `${lead.name}${lead.company ? ` · ${lead.company}` : ''}${lead.service ? ` · ${lead.service}` : ''}`,
    heading: 'New enquiry from the website',
    headingSub: `Reply-to is set to the sender, so replying to this email goes straight to them.`,
    body,
  });

  const text = [
    'NEW ENQUIRY FROM THE WEBSITE',
    '',
    `Name:     ${lead.name}`,
    `Email:    ${lead.email}`,
    lead.phone ? `Phone:    ${lead.phone}` : null,
    lead.company ? `Company:  ${lead.company}` : null,
    lead.service ? `Service:  ${lead.service}` : null,
    `Received: ${meta.submittedAt.toISOString()}`,
    lead.sourcePath ? `Page:     ${BRAND.domain}${lead.sourcePath}` : null,
    '',
    'MESSAGE',
    lead.message,
  ]
    .filter((line): line is string => line !== null)
    .join('\n');

  return {
    subject: `New enquiry: ${lead.name}${lead.service ? `, ${lead.service}` : ''}`,
    html,
    text,
  };
}
