import { TAX_YEAR } from '@/lib/tax/pakistan';
import { BRAND } from './site';

/**
 * Who stands behind the calculators, what the figures are drawn from, and when
 * they were last checked.
 *
 * ── Why this file exists ──
 *
 * The tools do arithmetic on a visitor's income and hand back a number they may
 * act on. That is YMYL content in Google's sense: money-or-life, held to the
 * highest evidence bar there is, and rated in large part on whether a reader
 * can tell who produced it and when.
 *
 * Until this file the site failed that test on every count. No named reviewer,
 * no date, no disclaimer, and a statutory citation on five of the twenty-two
 * tools. Not because the work was not done: `pnpm check:tax` reconciles every
 * slab against the First Schedule and asserts hand-computed cases on every
 * build, which is more than most published calculators can claim. It was done
 * and it was invisible. A reader saw an anonymous, undated number, and so did a
 * quality rater.
 *
 * So this is not new marketing. It is the existing rigour, said out loud, in
 * one place both the page and the schema read from, so the two cannot drift.
 *
 * ── The no-figures rule still holds ──
 *
 * Nothing here states a rate. `basis` names the instrument the rates come from
 * and interpolates `TAX_YEAR.authority` rather than restating a year, for the
 * reason set out at the top of content/tools.ts: a second copy of a fact is a
 * second thing to get wrong.
 */

/**
 * The last date a person checked these figures against the statute.
 *
 * ── Maintaining this ──
 *
 * Move it when someone has ACTUALLY re-read the rates against the Ordinance and
 * the current Finance Act. Not on a deploy, not when unrelated copy changes,
 * and not because it looks stale: a review date that advances on its own is a
 * false claim about work nobody did, and it is worse than an old date honestly
 * stated. `pnpm check:tax` passing is a necessary condition, not this date's
 * trigger. The script proves the numbers are internally consistent; only a
 * person can confirm they still match what Parliament passed.
 *
 * ISO 8601, because `dateModified` in the schema is emitted straight from it.
 */
export const RATES_REVIEWED = '2026-09-04';

/**
 * The statutory basis, as one sentence.
 *
 * Every tool page carries this under its calculator. The seventeen tools that
 * cited nothing now cite the same instrument as the five that did, which is the
 * point: a reader comparing two calculators on this site should not find one
 * sourced and the other bare.
 */
export const RATES_BASIS =
  `Income Tax Ordinance, 2001, as amended by the ${TAX_YEAR.authority}, for ${TAX_YEAR.label.toLowerCase()} (${TAX_YEAR.period}).`;

/**
 * The reviewer, as displayed and as `reviewedBy` in the schema.
 *
 * ── A standing TODO, and why it is worth closing ──
 *
 * `name` is the firm, not a person. That is honest and it is a real improvement
 * on nothing, because it attaches the figures to a named, addressable, legally
 * accountable entity rather than to no one.
 *
 * It is still the weaker of the two available claims. Google's guidance on YMYL
 * is specific that a named individual with a relevant credential outranks an
 * organisation, and BarrioVibe files returns for a living, so the qualified
 * person almost certainly exists inside the firm already.
 *
 * When the owner confirms who signs these off, set `name` to that person and
 * `credential` to the real designation (ACCA, ICAP, ITP, FBR practitioner
 * registration). Do not invent one: a fabricated credential on tax content is
 * the single fastest way to turn an E-E-A-T asset into a liability, and it is
 * the kind of claim that is trivially checked against a public register.
 */
export const RATES_REVIEWER = {
  name: BRAND.name,
  /** TODO: the individual's designation, once the owner names the signatory. */
  credential: null as string | null,
  /** What the firm's standing is for making the claim at all. */
  standing: 'files income tax returns through FBR IRIS',
} as const;

/**
 * The limit of what a calculator can be, stated plainly.
 *
 * Deliberately two sentences rather than a wall of legal boilerplate. Every
 * tool already carries a "what this does not do" section listing its specific
 * blind spots, and that section does the real work. This is the general point
 * that section cannot make: an estimate from a form is not advice about a
 * person, and the site that says so is more trustworthy than the one that
 * leaves a reader to assume it.
 */
export const RATES_DISCLAIMER =
  `These figures are an estimate computed from the rates above, not tax advice for your situation. Your return depends on facts a form cannot see, so treat the number as a starting point and speak to us before you file on it.`;
