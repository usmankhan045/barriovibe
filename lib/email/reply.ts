import 'server-only';
import { BRAND } from '@/content/site';
import { shell, paragraphs, escapeHtml, FONT } from './templates';
import { TOKENS } from '@/lib/tokens';

/**
 * A branded reply to a person who wrote to us.
 *
 * ── Why this exists ──
 *
 * The contact form's two messages are generated here, so they carry the
 * brand. A reply typed into Gmail is not: Gmail composes and sends that
 * itself and never touches this codebase, which is why hitting reply in the
 * web client produces plain text no matter what this file does.
 *
 * So a reply that should look like the rest of the site has to be SENT from
 * here instead. `scripts/reply.mts` is the front end for that: it takes the
 * recipient and the text, wraps it with `replyEmail` below, and hands it to
 * the same mailer the contact form uses.
 *
 * The text is written as plain prose with blank lines between paragraphs.
 * Nothing about the layout is the sender's problem.
 */

export interface ReplyFields {
  /** Their display name, used for the greeting. */
  name?: string;
  /** The body, as plain text. Blank lines separate paragraphs. */
  body: string;
  /** Optional closing name, e.g. "Usman". Defaults to the brand. */
  signOff?: string;
}

/**
 * Build the reply.
 *
 * `subject` is NOT set here: a reply's subject belongs to the thread it is
 * answering, and inventing one would break threading in the recipient's
 * client. scripts/reply.mts asks for it and prefixes "Re:" when it is missing.
 */
export function replyEmail(fields: ReplyFields): { html: string; text: string } {
  const firstName = fields.name?.trim().split(/\s+/)[0];
  const greeting = firstName ? `Hi ${firstName},` : 'Hi,';
  const signOff = fields.signOff?.trim() || BRAND.name;

  const body = `
    <p style="margin:0 0 16px;font-family:${FONT};font-size:15.5px;line-height:1.65;color:${TOKENS.silver900};">${escapeHtml(greeting)}</p>
    ${paragraphs(fields.body.trim())}
    <p style="margin:22px 0 0;font-family:${FONT};font-size:15.5px;line-height:1.65;color:${TOKENS.silver900};">${escapeHtml(signOff)}</p>
  `;

  const html = shell({
    preheader: firstPlainLine(fields.body),
    kicker: 'A note from',
    heading: BRAND.name,
    // No accent phrase and no sub-heading: this is a letter, not a landing
    // page. The masthead, the rule, the type and the footer already say whose
    // it is, and a marketing sub-line above a personal reply would undercut
    // the one thing it is for.
    body,
  });

  return {
    html,
    text: [greeting, '', fields.body.trim(), '', signOff].join('\n'),
  };
}

/** The preheader: the first real line of the reply, trimmed for the inbox list. */
function firstPlainLine(body: string): string {
  const line = body.trim().split(/\n/).find((l) => l.trim().length > 0) ?? '';
  return line.length > 110 ? `${line.slice(0, 107).trimEnd()}...` : line;
}
