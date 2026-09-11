/**
 * Send a branded reply.
 *
 * ── Why a script and not Gmail ──
 *
 * A reply typed into the Gmail web client is composed and sent by Gmail. This
 * codebase never sees it, so no change here can make it carry the site's
 * design. To send a reply that looks like the rest of the brand, it has to be
 * sent from here.
 *
 * Usage:
 *
 *   pnpm reply --to "ayesha@example.com" --name "Ayesha" \
 *     --subject "Re: your enquiry to BarrioVibe" --body "Thanks for writing..."
 *
 *   # or take the body from a file, or from a pipe, which is easier for
 *   # anything longer than a sentence:
 *   pnpm reply --to "ayesha@example.com" --name "Ayesha" --file reply.txt
 *   echo "Thanks for writing." | pnpm reply --to "ayesha@example.com"
 *
 * Add --dry-run to write the rendered HTML to a file and send nothing.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { replyEmail } from '../lib/email/reply';
import { sendMail, isMailConfigured, MAIL_TARGETS } from '../lib/email/mailer';

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? undefined : process.argv[i + 1];
}
const has = (name: string) => process.argv.includes(`--${name}`);

function readStdin(): string {
  try {
    return readFileSync(0, 'utf8');
  } catch {
    return '';
  }
}

const to = arg('to');
const name = arg('name');
const signOff = arg('from');
const file = arg('file');
const dryRun = has('dry-run');

// Body precedence: --body, then --file, then whatever is piped in.
const body = arg('body') ?? (file ? readFileSync(file, 'utf8') : readStdin());

if (!to) {
  console.error('Missing --to. See the usage block at the top of this file.');
  process.exit(1);
}
if (!body.trim()) {
  console.error('Missing message body. Pass --body, --file, or pipe it in.');
  process.exit(1);
}

// A reply belongs to a thread, so its subject should be the original one.
// Prefixing here rather than silently inventing a subject keeps the reply in
// the same conversation in the recipient's client.
const rawSubject = arg('subject') ?? 'your enquiry to BarrioVibe';
const subject = /^re:/i.test(rawSubject) ? rawSubject : `Re: ${rawSubject}`;

const { html, text } = replyEmail({ name, body, signOff });

if (dryRun) {
  const out = '/tmp/reply-preview.html';
  writeFileSync(out, html);
  console.log(`Dry run. Nothing sent.\nTo:      ${to}\nSubject: ${subject}\nWrote:   ${out}`);
  process.exit(0);
}

if (!isMailConfigured()) {
  console.error('SMTP is not configured. Set SMTP_USER and SMTP_PASS in .env.local.');
  process.exit(1);
}

const sent = await sendMail({
  to: name ? `${name} <${to}>` : to,
  subject,
  html,
  text,
  // A reply should come back to the inbox a human reads, which for this
  // account is the same address it is sent from. Set explicitly so that
  // moving to domain mail later does not silently change where replies land.
  replyTo: MAIL_TARGETS.notifyTo,
});

if (!sent) {
  console.error('Send failed. The error is logged above.');
  process.exit(1);
}

console.log(`Sent to ${to}\nSubject: ${subject}`);
