import type { Faq, IconName } from '../types';

/**
 * Types for the guides under `/guides`.
 *
 * ## What a guide is, and what it is not
 *
 * A guide is reference content: the current, correct answer to one question a
 * reader can act on. It is updated in place and carries a review date. It does
 * NOT carry a publish date in the chronological sense, because it is not news.
 *
 * That is the whole reason `/guides` exists separately from `/blog`. If
 * "Income Tax Slabs 2026-27" ships as a blog post and next year "2027-28"
 * ships as another, the authority splits across two URLs and the old one rots
 * while still ranking. Five years of that leaves five half-strong pages.
 * Updating one guide URL keeps every link it has earned.
 *
 * The reverse is equally true. An argument ("you probably do not need an AI
 * agent") is not reference content, it is opinion with a shelf life, and it
 * belongs on the blog with a date attached.
 *
 * ## The no-figures rule applies here, harder
 *
 * Same constraint as `content/tools.ts`, for the same reason and with more at
 * stake. A rate typed into guide prose is a second source of truth that no
 * check can see, and the first Finance Act to move it leaves the guide arguing
 * with the calculator it links to on the same page.
 *
 * So a guide that needs a figure interpolates it from `lib/tax/`, or it does
 * not state one. `pnpm check:content` enforces this: see the rate-literal scan
 * in scripts/check-content.ts.
 */

/** The clusters. A guide belongs to exactly one. */
export type ClusterSlug =
  | 'filer'
  | 'pseb'
  | 'ntn'
  | 'company'
  | 'trademark'
  | 'property'
  | 'salestax'
  | 'cross-border';

export interface Cluster {
  slug: ClusterSlug;
  /** The H1 on the cluster hub, and the breadcrumb label. */
  title: string;
  /** One sentence on the /guides index card. */
  card: string;
  /** Two or three sentences under the cluster H1. */
  intro: string;
  icon: IconName;
}

/**
 * A section of a guide's body.
 *
 * Deliberately a small, closed set rather than freeform markdown. Every guide
 * then renders through the same components, which is what stops the fortieth
 * guide from looking like a different site than the first, and it means a
 * section type can gain a schema treatment or a style everywhere at once.
 */
export type GuideSection =
  /** Prose. One idea per block; the renderer adds the spacing. */
  | { kind: 'prose'; heading?: string; body: string[] }
  /** A list where the order does not matter: documents, requirements. */
  | { kind: 'list'; heading: string; intro?: string; items: string[] }
  /** A list where it does: a process. Rendered as an ordered list, and it is
   *  what a HowTo schema is built from when a guide declares one. */
  | { kind: 'steps'; heading: string; intro?: string; steps: { title: string; body: string }[] }
  /** A callout for the thing a reader most needs and least expects. */
  | { kind: 'note'; tone: 'warning' | 'info'; heading: string; body: string }
  /** A comparison. `rows` are [label, ...cells] against `columns`. */
  | { kind: 'table'; heading: string; intro?: string; columns: string[]; rows: string[][] }
  /** A pointer at a calculator. The whole point of a guide on this site: the
   *  claim above it becomes a number the reader can check on their own case. */
  | { kind: 'calculator'; toolSlug: string; heading: string; body: string };

export interface Guide {
  /** URL segment under `/guides/<cluster>`. */
  slug: string;
  cluster: ClusterSlug;

  /** The H1. Written to match how the question is actually searched. */
  title: string;
  /** Breadcrumb and card label, where the cluster is already implied. */
  navLabel: string;
  /** One sentence on the cluster hub card. */
  card: string;

  /**
   * The answer, in the first 60 words or so.
   *
   * Not a preamble and not a summary of what follows. Someone who reads this
   * paragraph and closes the tab should have what they came for. Everything
   * after it is the working, the limits and the edges.
   */
  answer: string;

  sections: GuideSection[];
  faqs: Faq[];

  /**
   * The date this guide becomes visible.
   *
   * ISO 8601. A guide with a future date is excluded from the routes, the
   * sitemap, the hub listings and the nav, so the whole slate can sit in the
   * repo, reviewed and merged, and appear one per day without anyone touching
   * the repository on the day.
   *
   * The daily GitHub Action just rebuilds and redeploys; the date does the
   * scheduling. See .github/workflows/publish-guides.yml.
   */
  publishedAt: string;

  /**
   * Sibling guides worth a reader's next click, by slug.
   *
   * Named rather than automatic: a reader on the wrong guide wants the right
   * one, not a directory of everything in the cluster.
   */
  related?: string[];

  seo: { title: string; description: string };
}
