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
  blue400: TOKENS.blue400,
  blue600: TOKENS.blue600,
  blue800: TOKENS.blue800,
  blue900: TOKENS.blue900,
  ink: TOKENS.silver900,
  body: TOKENS.body,
  quiet: TOKENS.silver600,
  faintLine: TOKENS.line,
  divider: TOKENS.silver300,
  band: TOKENS.band,
  ground: TOKENS.canvasGround,
  surface: TOKENS.surface,
  blue50: TOKENS.blue50,
  blue100: TOKENS.blue100,
  blue200: TOKENS.blue200,
  silver400: TOKENS.silver400,
} as const;

/* Satoshi and Inter are webfonts the site loads and an email client will not.
   The stack degrades to the system UI face, which is what the major clients
   use for their own chrome and reads correctly everywhere. */
export const FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

/**
 * The site's display face is Satoshi at weight 900 with tight negative
 * tracking (--text-h1 in app/tokens.css). No email client will load it, but
 * the SHAPE of the setting is what reads as ours: very heavy, very tight.
 * Applied to headlines so a system face still lands in the same register
 * rather than as generic bold.
 */
const DISPLAY = `font-family:${FONT};font-weight:800;letter-spacing:-0.03em;`;

/**
 * The eyebrow: 0.18em tracking, uppercase, 700 (--text-eyebrow). The site
 * labels almost every section with one, so it is the cheapest way for a
 * message to sit in the same family as the pages.
 */
function eyebrow(label: string, color: string = C.quiet): string {
  return `<p style="margin:0 0 10px;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:${color};">${escapeHtml(label)}</p>`;
}

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

/** Preserve the writer's paragraph breaks without trusting their markup. */
export function paragraphs(text: string): string {
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
  return `<span style="font-family:${FONT};font-size:22px;font-weight:800;letter-spacing:-0.03em;color:${C.surface};">${BRAND.name}</span>`;
}

/**
 * The monogram: a "B" in a rounded tile, set beside the wordmark.
 *
 * The site's logo is a raster PNG, which cannot be used here for the reason
 * in the file header: most clients block remote images until the reader asks
 * for them, and a brand that only appears after a click is not a brand. A
 * single letter in a bordered tile is drawable in pure table markup, so it
 * renders identically whether or not images are enabled. The tile is a lighter
 * blue than the masthead behind it, which is how the site separates a surface
 * from its ground: a step in value, not a drop shadow.
 */
function monogram(): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="display:inline-block;vertical-align:middle;">
      <tr>
        <td width="40" height="40" align="center" valign="middle" bgcolor="${C.blue400}" style="width:40px;height:40px;border-radius:11px;border:1px solid ${C.blue200};font-family:${FONT};font-size:20px;font-weight:800;letter-spacing:-0.02em;color:${C.surface};text-align:center;">${escapeHtml(BRAND.name.slice(0, 1))}</td>
      </tr>
    </table>`;
}

/** Wraps body content in the shell every message shares. */
export function shell({
  preheader,
  kicker,
  heading,
  headingAccent,
  headingSub,
  body,
}: {
  preheader: string;
  /** The tracked uppercase label above the headline, in brand blue. */
  kicker: string;
  heading: string;
  /**
   * The tail of the headline, set in Chess Blue.
   *
   * Every hero on the site does this: black opening, final phrase in blue,
   * a short blue rule under it ("One firm for everything your BUSINESS RUNS
   * ON.", "Tell us what you need. Get a STRAIGHT ANSWER."). It is the single
   * most recognisable thing about the pages, and a message without it does
   * not read as coming from the same place.
   */
  headingAccent?: string;
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
<body style="margin:0;padding:0;background-color:${C.band};-webkit-font-smoothing:antialiased;">
<!-- The preheader: the grey line a client shows after the subject in the
     inbox list. Left unset, clients pull the first text they find, which is
     usually the wordmark or a link. It is hidden in the message itself. -->
<div style="display:none;font-size:1px;color:${C.band};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(preheader)}</div>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${C.band};">
<tr>
<td align="center" style="padding:32px 16px;">

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:100%;background-color:${C.surface};border-radius:24px;overflow:hidden;border:1px solid ${C.faintLine};">

    <!-- Masthead. The CTA band's gradient, over a solid blue-600 bgcolor:
         Outlook ignores CSS gradients entirely, so the gradient is
         progressive enhancement and the flat brand blue is what it falls
         back to. The monogram and wordmark sit on one row, the descriptor
         below as a tracked eyebrow, which is the site's own lockup. -->
    <tr>
      <td bgcolor="${C.blue600}" style="background-color:${C.blue600};background-image:linear-gradient(135deg, ${C.blue400} 0%, ${C.blue600} 45%, ${C.blue900} 100%);padding:30px 32px 28px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td valign="middle" style="padding-right:13px;">${monogram()}</td>
            <td valign="middle">
              ${wordmark()}
              <div style="margin-top:3px;font-family:${FONT};font-size:10.5px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${C.blue100};">${escapeHtml(BRAND.descriptor)}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- A 3px brand rule under the masthead. The site edges its blue surfaces
         with a lighter stop of the same hue rather than a shadow; this is that
         edge, and it is also what stops the gradient ending on a hard seam. -->
    <tr><td height="3" bgcolor="${C.blue400}" style="height:3px;line-height:3px;font-size:0;">&nbsp;</td></tr>

    <tr>
      <td style="padding:38px 32px 8px;">
        ${eyebrow(kicker, C.blue600)}
        <h1 style="margin:0;${DISPLAY}font-size:29px;line-height:1.18;color:${C.ink};">${escapeHtml(heading)}${
          headingAccent ? ` <span style="color:${C.blue600};">${escapeHtml(headingAccent)}</span>` : ''
        }</h1>

        <!-- The rule under the headline. 2px, 44px wide, brand blue: the same
             mark every hero on the site carries beneath its headline. -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:18px 0 0;">
          <tr><td width="44" height="2" bgcolor="${C.blue600}" style="width:44px;height:2px;line-height:2px;font-size:0;">&nbsp;</td></tr>
        </table>
        ${
          headingSub
            ? `<p style="margin:18px 0 0;font-family:${FONT};font-size:15.5px;line-height:1.62;color:${C.body};">${escapeHtml(headingSub)}</p>`
            : ''
        }
      </td>
    </tr>

    <tr>
      <td style="padding:18px 32px 34px;font-family:${FONT};">
        ${body}
      </td>
    </tr>

    <!-- Footer.
         The site's own footer is light: border-t border-line on bg-band, with
         the wordmark and a grey link list (components/layout/Footer.tsx). An
         earlier draft of this file ended on a deep blue band, which looked
         striking and matched nothing on the site. This is the real one. -->
    <tr>
      <td bgcolor="${C.band}" style="padding:28px 32px 30px;background-color:${C.band};border-top:1px solid ${C.faintLine};font-family:${FONT};">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 16px;">
          <tr>
            <td valign="middle" style="padding-right:11px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="30" height="30" align="center" valign="middle" bgcolor="${C.blue600}" style="width:30px;height:30px;border-radius:9px;font-family:${FONT};font-size:15px;font-weight:800;line-height:30px;color:${C.surface};text-align:center;">${escapeHtml(BRAND.name.slice(0, 1))}</td>
                </tr>
              </table>
            </td>
            <td valign="middle">
              <div style="font-family:${FONT};font-size:15.5px;font-weight:800;letter-spacing:-0.03em;color:${C.ink};">${escapeHtml(BRAND.name)}</div>
              <div style="margin-top:1px;font-family:${FONT};font-size:9.5px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${C.quiet};">${escapeHtml(BRAND.descriptor)}</div>
            </td>
          </tr>
        </table>

        <p style="margin:0 0 5px;font-size:13.5px;line-height:1.65;color:${C.ink};">
          <a href="mailto:${CONTACT.email}" style="color:${C.blue600};text-decoration:none;font-weight:600;">${CONTACT.email}</a>
          <span style="color:${C.silver400};">&nbsp;·&nbsp;</span>
          <a href="https://wa.me/${CONTACT.whatsapp}" style="color:${C.blue600};text-decoration:none;font-weight:600;">${escapeHtml(CONTACT.phone)}</a>
        </p>
        <p style="margin:0 0 16px;font-size:13px;line-height:1.65;color:${C.body};">
          ${escapeHtml(CONTACT.address.city)}, ${escapeHtml(CONTACT.address.country)}<span style="color:${C.silver400};">&nbsp;·&nbsp;</span>${escapeHtml(CONTACT.hours)}
        </p>

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 15px;">
          <tr><td height="1" bgcolor="${C.divider}" style="height:1px;line-height:1px;font-size:0;">&nbsp;</td></tr>
        </table>

        <p style="margin:0 0 13px;font-size:12.5px;line-height:1.9;">
          ${SOCIALS.map(
            (s) =>
              `<a href="${s.href}" style="color:${C.body};text-decoration:none;">${escapeHtml(s.label)}</a>`,
          ).join(`<span style="color:${C.silver400};"> · </span>`)}
        </p>
        <p style="margin:0;font-size:11.5px;line-height:1.7;color:${C.quiet};">
          © ${new Date().getFullYear()} ${escapeHtml(BRAND.legalName)}. All rights reserved.<br />
          <a href="${BRAND.domain}" style="color:${C.quiet};text-decoration:underline;">${BRAND.domain.replace(/^https:\/\//, '')}</a>
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

/**
 * What happens after someone writes to us.
 *
 * Module scope, and typed, so the HTML and the plain-text half below cannot
 * drift into describing two different processes. Three steps because that is
 * the whole of it: anything longer stops being read.
 */
const NEXT_STEPS: readonly { title: string; detail: string }[] = [
  {
    title: 'We read it',
    detail: 'Your enquiry goes straight to our inbox, not a ticket queue.',
  },
  {
    title: 'We reply in person',
    detail: 'Within one working day, with a real answer, not an acknowledgement.',
  },
  {
    title: 'We take it from there',
    detail:
      'If it is a fit we scope it properly. If it is not, we say so and point you somewhere better.',
  },
];

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
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 28px;">
      <tr>
        <td bgcolor="${C.blue50}" style="background-color:${C.blue50};border:1px solid ${C.blue100};border-radius:20px;padding:22px 24px;">
          <p style="margin:0;${DISPLAY}font-size:17.5px;line-height:1.42;color:${C.blue800};">${escapeHtml(CONTACT.responseTime)}</p>
          <p style="margin:7px 0 0;font-family:${FONT};font-size:13.5px;line-height:1.6;color:${C.body};">We are here ${escapeHtml(CONTACT.hours)}. If it is urgent, WhatsApp is the fastest way to reach us.</p>
        </td>
      </tr>
    </table>

    <!-- What happens next, as a numbered sequence.
         The headline promises to say what happens next, and the old template
         never actually answered it: it went straight to quoting the message
         back. Three steps is the whole process, and knowing it is what stops
         someone wondering on day two whether they have been forgotten.
         Numerals sit in their own fixed-width cell so the text block keeps a
         single left edge, which is what makes a list read as a sequence
         rather than as three loose paragraphs. -->
    ${eyebrow('What happens next')}
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 28px;">
      ${NEXT_STEPS.map(
        ({ title, detail }, i, all) => `
      <tr>
        <td width="36" valign="top" style="width:36px;padding:1px 13px ${i === all.length - 1 ? '0' : '18px'} 0;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td width="23" height="23" align="center" valign="middle" bgcolor="${C.blue600}" style="width:23px;height:23px;border-radius:999px;font-family:${FONT};font-size:11.5px;font-weight:700;line-height:23px;color:${C.surface};text-align:center;">${i + 1}</td>
            </tr>
          </table>
        </td>
        <td valign="top" style="padding:0 0 ${i === all.length - 1 ? '0' : '18px'};font-family:${FONT};">
          <p style="margin:0 0 2px;font-size:14.5px;font-weight:700;letter-spacing:-0.01em;color:${C.ink};line-height:1.45;">${escapeHtml(title)}</p>
          <p style="margin:0;font-size:13.5px;line-height:1.6;color:${C.body};">${escapeHtml(detail)}</p>
        </td>
      </tr>`,
      ).join('')}
    </table>

    <!-- Their own words, quoted back. Set on the band tint rather than inside
         a bordered box: it is a quotation, so it should read as a different
         surface from the message around it, not as another panel competing
         with the promise above. -->
    ${eyebrow('What you sent us')}
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 28px;">
      <tr>
        <td bgcolor="${C.band}" style="background-color:${C.band};border:1px solid ${C.faintLine};border-radius:20px;padding:22px 24px;">
          ${
            lead.service
              ? `<p style="margin:0 0 13px;padding:0 0 13px;border-bottom:1px solid ${C.divider};font-family:${FONT};font-size:13px;line-height:1.5;color:${C.body};"><span style="color:${C.quiet};">Service</span> &nbsp;<strong style="color:${C.ink};font-weight:600;">${escapeHtml(lead.service)}</strong></p>`
              : ''
          }
          ${paragraphs(lead.message)}
        </td>
      </tr>
    </table>

    <!-- A bulletproof button: the table + bgcolor construction, because a
         styled <a> alone loses its background in Outlook and becomes a bare
         blue link. The site's own buttons are a 9-slice PNG sprite, which no
         email client can reproduce, so this borrows the one thing that does
         survive: the brand blue and the pill radius. -->
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 6px;">
      <tr>
        <td align="center" bgcolor="${C.blue600}" style="border-radius:999px;">
          <a href="https://wa.me/${CONTACT.whatsapp}" style="display:inline-block;padding:14px 30px;font-family:${FONT};font-size:14.5px;font-weight:700;letter-spacing:-0.01em;color:${C.surface};text-decoration:none;border-radius:999px;">Message us on WhatsApp</a>
        </td>
      </tr>
    </table>
    <p style="margin:16px 0 0;font-family:${FONT};font-size:13.5px;line-height:1.65;color:${C.body};">
      You can also just reply to this email: it reaches the same inbox and we will pick it up there.
    </p>
  `;

  const html = shell({
    preheader: `Thanks ${firstName}. ${CONTACT.responseTime}`,
    kicker: 'Enquiry received',
    heading: `Thanks, ${firstName}.`,
    headingAccent: 'We have your enquiry.',
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
    'WHAT HAPPENS NEXT',
    ...NEXT_STEPS.map((step, i) => `${i + 1}. ${step.title}. ${step.detail}`),
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
      <td style="padding:12px 0;border-bottom:1px solid ${C.faintLine};font-family:${FONT};font-size:10.5px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${C.quiet};width:118px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:12px 0;border-bottom:1px solid ${C.faintLine};font-family:${FONT};font-size:14.5px;font-weight:600;letter-spacing:-0.01em;color:${C.ink};vertical-align:top;">${
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

    ${eyebrow('Message')}
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 26px;">
      <tr><td bgcolor="${C.band}" style="background-color:${C.band};border:1px solid ${C.faintLine};border-radius:20px;padding:22px 24px;">${paragraphs(lead.message)}</td></tr>
    </table>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td align="center" bgcolor="${C.blue600}" style="border-radius:999px;">
          <a href="mailto:${lead.email}?subject=${encodeURIComponent(`Re: your enquiry to ${BRAND.name}`)}" style="display:inline-block;padding:14px 30px;font-family:${FONT};font-size:14.5px;font-weight:700;letter-spacing:-0.01em;color:${C.surface};text-decoration:none;border-radius:999px;">Reply to ${escapeHtml(lead.name.split(/\s+/)[0] ?? lead.name)}</a>
        </td>
      </tr>
    </table>
  `;

  const html = shell({
    preheader: `${lead.name}${lead.company ? ` · ${lead.company}` : ''}${lead.service ? ` · ${lead.service}` : ''}`,
    kicker: 'New lead',
    heading: 'New enquiry from',
    headingAccent: 'the website.',
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
