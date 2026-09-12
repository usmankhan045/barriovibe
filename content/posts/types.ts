import type { Faq, IconName } from '../types';
import type { GuideSection } from '../guides/types';

/**
 * Types for the posts under `/blog`.
 *
 * ## What a post is, and why it is not a guide
 *
 * `content/guides/types.ts` draws the line and it is worth restating from the
 * other side. A guide is reference content: the current, correct answer to a
 * question, updated in place, carrying a review date rather than a publication
 * date because it is not news.
 *
 * A post is an argument with a shelf life. "You probably do not need an agent"
 * is not the current state of anything; it is a position, held on a date, from
 * evidence available on that date. It belongs on a dated URL that stays dated,
 * because a reader in 2028 needs to know they are reading a 2026 judgement.
 *
 * The practical test, applied to every post in `research/POSTS.md`: if the
 * right response to the facts changing is to REWRITE the page, it is a guide.
 * If the right response is to write a new piece and leave this one standing as
 * a record of what was true then, it is a post.
 *
 * ## Why posts reuse GuideSection
 *
 * The forty-seven guides are rendered from a closed set of six section kinds,
 * and the reason given there applies unchanged here: a closed set is what stops
 * the fortieth piece from becoming a different design than the first, and it
 * means a schema or spacing change lands everywhere at once.
 *
 * Posts could have justified their own section union. They do not get one,
 * because every kind a post needs already exists, and a second nearly-identical
 * union is exactly the duplication that `research/EXECUTION.md` records as the
 * trap that produced a table living in two places.
 *
 * ## The no-figures rule, in its blog form
 *
 * Guides may not type a tax rate into prose: it must be interpolated from
 * `lib/tax/`, because a second copy of a rate is a second thing to get wrong
 * when the Finance Act moves it.
 *
 * Posts have no `lib/tax/` to interpolate from, because their figures are
 * vendor prices rather than statute. So the rule takes a different form here,
 * and `sources` is how it is enforced: a post that states a price states where
 * it came from and WHEN it was read, because the answer to "is this still
 * true?" is never "yes" for a pricing page. A figure with no dated source
 * behind it does not go in.
 */

/** The clusters. A post belongs to exactly one. */
export type PostClusterSlug =
  | 'agent-cost'
  | 'agent-failure'
  | 'automation'
  | 'build-cost'
  | 'ecommerce'
  | 'buying-dev'
  | 'ai-data'
  | 'shipping'
  | 'us-entity'
  | 'ai-failure'
  | 'automate-or-hire';

export interface PostCluster {
  slug: PostClusterSlug;
  /** The H1 on the cluster hub, and the breadcrumb label. */
  title: string;
  /** One sentence on the /blog index card. */
  card: string;
  /** Two or three sentences under the cluster H1. */
  intro: string;
  icon: IconName;
}

/**
 * Where a claim in a post came from, and when it was read.
 *
 * ## Why this is required rather than optional
 *
 * Guides cite one instrument, named once in `content/provenance.ts`, and every
 * guide inherits it. That works because every guide is sourced from the same
 * statute. It does not work here: a post about n8n pricing and a post about
 * Shopify's supported countries share no source at all, and emitting the
 * Income Tax Ordinance as the citation for either would be false.
 *
 * ## Why `readOn` is not optional either
 *
 * The single most common defect in published pricing content is a figure that
 * was true once, presented as though it is true now. Our own research notes
 * record it as the reason the comparison SERP is worthless: every post recycles
 * the same numbers and none says when it looked.
 *
 * Naming the date converts a liability into the reason to trust the page. It
 * also gives a reader the one thing they need to check it themselves, and it
 * makes staleness visible to us rather than silent.
 */
export interface PostSource {
  /** What it is, in a reader's words. "n8n Cloud pricing page". */
  label: string;
  /** The URL a reader can open to check the claim. */
  url: string;
  /** ISO date, `YYYY-MM-DD`. The day a person actually read it. */
  readOn: string;
  /** Optional: what this source is load-bearing for, where it is not obvious. */
  supports?: string;
}

export interface Post {
  /** URL segment under `/blog/<cluster>`. */
  slug: string;
  cluster: PostClusterSlug;

  /** The H1. */
  title: string;
  /** Breadcrumb and card label, where the cluster is already implied. */
  navLabel: string;
  /** One sentence on the cluster hub card. */
  card: string;

  /**
   * The answer, in the first 60 words or so.
   *
   * Same discipline as a guide's: someone who reads this and closes the tab
   * should have the position, not a promise that the position is coming. On a
   * post this is harder and matters more, because a post has a thesis, and a
   * thesis withheld until the conclusion is a thesis nobody reads.
   */
  answer: string;

  sections: GuideSection[];
  faqs: Faq[];

  /**
   * The moment this post becomes visible. UTC ISO 8601, `YYYY-MM-DDTHH:MM:SSZ`.
   *
   * Identical mechanism to the guides: the gate compares instants at build
   * time, so a future-dated post produces no route, no sitemap entry and no
   * listing until a build runs at or after its slot. See `content/guides/
   * types.ts` for why this is a timestamp rather than a date.
   */
  publishedAt: string;

  /**
   * The day the post's claims were last checked against their sources.
   *
   * Distinct from `publishedAt` and from the guides' `RATES_REVIEWED`, which is
   * a statement about tax rates and has nothing to say about a vendor's pricing
   * page. Move it only when someone has actually re-read the sources.
   *
   * Defaults to the publication date where absent, which is true on the day and
   * honest afterwards: it says "checked when written, not since".
   */
  reviewedOn?: string;

  /**
   * Every source the post's load-bearing claims rest on.
   *
   * Rendered visibly at the foot of the post AND emitted into schema, from this
   * one array, so the two cannot drift. Required and non-empty: a post with no
   * checkable sources is the thing this whole content model exists to prevent.
   */
  sources: PostSource[];

  /**
   * What this post does NOT claim, where a reader could reasonably assume it
   * does.
   *
   * ## Why a field rather than a paragraph
   *
   * Because the honest limitation is the first thing cut when prose is tightened,
   * and it is the thing that makes the rest credible. A pricing comparison that
   * says "these are list prices, we have not audited enterprise discounts" is
   * more trustworthy than one that quietly implies it covered everything.
   *
   * Optional, because not every post has a material limit worth naming. Where
   * one exists, stating it is not a weakness in the post, it is the post.
   */
  limits?: string[];

  /** The one ask at the foot. Same rationale as a guide's. */
  cta?: {
    heading: string;
    body: string;
    buttonLabel: string;
    href?: string;
  };

  /** Sibling posts worth a reader's next click, by slug. */
  related?: string[];

  seo: { title: string; description: string };
}
