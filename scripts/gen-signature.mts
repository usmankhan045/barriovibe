/**
 * Generate the Gmail signature.
 *
 * ── Why this is not the email template ──
 *
 * lib/email/templates.ts builds whole messages, where we control every pixel.
 * A Gmail signature is a fragment pasted into someone else's editor, and that
 * editor rewrites what it is given: Gmail's signature field strips most CSS on
 * paste. Background fills, padding, border-radius and box-shadow are commonly
 * dropped, which is why the branded CARD from the auto-reply cannot be
 * reproduced here and this is a lockup and a rule instead.
 *
 * What does survive, reliably, across Gmail web, iOS and Android:
 *   • font-family, font-size, font-weight, color, letter-spacing
 *   • <a href>, including mailto: and tel:
 *   • <img> with width/height attributes
 *   • <table> for layout, and a border on a <td>
 *
 * So the signature is built from exactly those.
 *
 * Run: pnpm signature          (writes the file and prints paste steps)
 *      pnpm signature --no-img (text-only, for before the image is deployed)
 */
import { writeFileSync } from 'node:fs';
import { BRAND, CONTACT, SOCIALS } from '../content/site';
import { TOKENS } from '../lib/tokens';

const withImage = !process.argv.includes('--no-img');

const FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

/* The mark is served from the live site. A signature image MUST be an absolute
   https URL: Gmail cannot embed a local file, and a relative path resolves
   against mail.google.com and 404s.
   
   This points at logo.png, which is already deployed, rather than the smaller
   logo-email.png generated alongside this script. Gmail proxies and caches
   signature images through googleusercontent, so the 141KB original is fetched
   by Google once and not re-downloaded per message; the size costs the reader
   nothing. Switch this to logo-email.png after the next deploy if you would
   rather serve the 7KB version. */
const LOGO = `${BRAND.domain}/brand/logo.png`;

const blue = TOKENS.blue600;
const ink = TOKENS.silver900;
const body = TOKENS.body;
const quiet = TOKENS.silver600;
const line = TOKENS.silver300;

const html = `<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-family:${FONT};">
  <tr>
    <td style="padding:0 0 10px;">
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
        <tr>${
          withImage
            ? `
          <td valign="middle" style="padding-right:11px;">
            <img src="${LOGO}" alt="${BRAND.name}" width="36" height="36" style="display:block;width:36px;height:36px;border:0;" />
          </td>`
            : ''
        }
          <td valign="middle">
            <div style="font-family:${FONT};font-size:16px;font-weight:bold;color:${ink};letter-spacing:-0.02em;">${BRAND.name}</div>
            <div style="font-family:${FONT};font-size:10px;font-weight:bold;color:${quiet};letter-spacing:0.14em;text-transform:uppercase;padding-top:2px;">${BRAND.descriptor}</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="border-top:1px solid ${line};padding:10px 0 0;font-family:${FONT};font-size:13px;line-height:1.7;color:${body};">
      <a href="mailto:${CONTACT.email}" style="color:${blue};text-decoration:none;font-weight:bold;">${CONTACT.email}</a>
      <span style="color:${line};">&nbsp;|&nbsp;</span>
      <a href="https://wa.me/${CONTACT.whatsapp}" style="color:${blue};text-decoration:none;font-weight:bold;">${CONTACT.phone}</a>
      <br />
      <span style="color:${body};">${CONTACT.address.city}, ${CONTACT.address.country}</span>
      <span style="color:${line};">&nbsp;|&nbsp;</span>
      <span style="color:${body};">${CONTACT.hours}</span>
      <br />
      <a href="${BRAND.domain}" style="color:${blue};text-decoration:none;font-weight:bold;">${BRAND.domain.replace(/^https:\/\//, '')}</a>
      <span style="color:${line};">&nbsp;|&nbsp;</span>
      ${SOCIALS.map(
        (s) => `<a href="${s.href}" style="color:${body};text-decoration:none;">${s.label}</a>`,
      ).join(`<span style="color:${line};"> · </span>`)}
    </td>
  </tr>
</table>`;

const out = '/tmp/barriovibe-signature.html';
// A full document, so opening it in a browser shows the signature as it will
// look. You select all of THIS page and paste that, not the source.
writeFileSync(
  out,
  `<!doctype html><html><head><meta charset="utf-8"><title>BarrioVibe signature</title></head><body style="margin:0;padding:40px;background:#ffffff;">${html}</body></html>`,
);

console.log(`Wrote ${out}${withImage ? '' : '  (text only, no image)'}

To install it in Gmail:
  1. open ${out} in a browser
  2. select the signature block and copy it (Cmd+A, Cmd+C)
  3. Gmail > Settings (gear) > See all settings > General > Signature
  4. Create new, name it, paste into the box
  5. set it for BOTH "For new emails" and "On reply/forward"
  6. Save Changes at the bottom of the page
`);
