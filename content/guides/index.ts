import type { Cluster, ClusterSlug, Guide } from './types';
import { FILER_GUIDES } from './filer';
import { NTN_GUIDES } from './ntn';
import { COMPANY_GUIDES } from './company';
import { TRADEMARK_GUIDES } from './trademark';
import { PROPERTY_GUIDES } from './property';
import { PSEB_GUIDES } from './pseb';
import { SALESTAX_GUIDES } from './salestax';
import { SALARY_GUIDES } from './salary';
import { FILING_GUIDES } from './filing';
import { CREATOR_GUIDES } from './creator';

export type { Cluster, ClusterSlug, Guide, GuideSection } from './types';

/**
 * The guide registry.
 *
 * Same shape as `content/tools.ts`: one array, everything else derived. A guide
 * added here appears in its cluster hub, the `/guides` index, the sitemap and
 * `llms.txt` without anyone remembering to add it in four places.
 *
 * ## Scheduling
 *
 * Guides are written and merged ahead of time, then appear on their
 * `publishedAt` date. `PUBLISHED_GUIDES` is what every route, listing and
 * sitemap entry reads, and it filters on the build date. A daily rebuild is
 * therefore the entire publishing mechanism: no CMS, no queue, no cron writing
 * to a database, and a guide that is not due yet simply is not in the build
 * output at all.
 *
 * The reason to prefer this over a scheduled CMS: a guide can be reviewed in a
 * pull request against the same checks as the rest of the site, and the thing
 * that ships is the thing that was reviewed.
 */

export const CLUSTERS: Cluster[] = [
  {
    slug: 'filer',
    title: 'Filer status',
    card: 'What being on the Active Taxpayer List is worth, in rupees, and how to get on it.',
    intro:
      'Every one of these answers the same underlying question from a different angle: what does filer status actually change. The figures come from the same modules the calculators use, so where a guide states a rate you can check it against the tool on the page.',
    icon: 'ledger',
  },
  {
    slug: 'ntn',
    title: 'NTN registration',
    card: 'Getting a National Tax Number, what it costs (nothing), and what registration does and does not oblige you to do.',
    intro:
      'FBR\'s own portal ranks first on most of these questions and answers almost none of them. These guides are assembled from FBR\'s own documents: the requirements, the IRIS steps, and the point where most registrations quietly stop short of finishing.',
    icon: 'receipt',
  },
  {
    slug: 'company',
    title: 'Company formation',
    card: 'Registering with SECP, the fees most published pages get wrong, and the filings due before you have found an office.',
    intro:
      'Every figure here comes from the Seventh Schedule to the Companies Act or from the Act itself. Where SECP has not published a position, this says so rather than guessing, because a confident wrong number about a fee is worse than an honest gap.',
    icon: 'building',
  },
  {
    slug: 'trademark',
    title: 'Trademark and IP',
    card: 'What registration really costs across the whole lifecycle, from the search to the renewal ten years later.',
    intro:
      'The fees below are read from the gazette notification that set them, not from the tables circulating online, two of which conflate different forms. Costs scale by class in Pakistan, and the renewal is the largest single fee.',
    icon: 'trademark',
  },
  {
    slug: 'property',
    title: 'Property tax',
    card: 'What a buyer and a seller each pay, how advance tax credits against your final bill, and which rates changed in 2026.',
    intro:
      'Property carries the largest single sums most people will ever be taxed on, and the rules moved twice in 2026. These guides state the rate, the section it comes from, and what it is charged on, because the three are not the same question.',
    icon: 'building',
  },
  {
    slug: 'pseb',
    title: 'PSEB and IT export',
    card: 'The 0.25% rate on software and IT service exports: what qualifies, what registration costs, and which conditions are no longer law.',
    intro:
      'This is where the tax half of the firm and the software half meet. The rate is set by statute, the registration is a statutory condition rather than paperwork, and one widely repeated requirement was repealed in 2022.',
    icon: 'code',
  },
  {
    slug: 'salestax',
    title: 'Sales tax',
    card: 'Who has to register, why the turnover threshold you have read about does not exist, and whether you belong to FBR or your province.',
    intro:
      'Sales tax registration is decided by what you do rather than what you earn, and by whether you supply goods or services. Both of those are widely misreported, and getting either wrong means registering with the wrong authority.',
    icon: 'receipt',
  },
  {
    slug: 'salary',
    title: 'Salary and slabs',
    card: 'What is deducted from a Pakistani salary, the bands it is deducted on, and the surcharge that was withdrawn this year.',
    intro:
      'The slab table here is rendered from the same module the salary calculator computes with, so the two cannot disagree. Where a figure appears, it is the figure the tool uses.',
    icon: 'calculator',
  },
  {
    slug: 'filing',
    title: 'Filing a return',
    card: 'The IRIS screens in order, the wealth statement that catches people out, and what late filing actually costs.',
    intro:
      'Written from FBR\'s own IRIS manual rather than from a description of it, which is why the amount codes are here. Those codes are what you are looking at on screen.',
    icon: 'document',
  },
  {
    slug: 'creator',
    title: 'Creator income',
    card: 'The withholding on YouTube, TikTok and social media revenue, and why calling it a final tax is wrong for nearly everyone.',
    intro:
      'Section 154B arrived on 1 July 2026 and almost every account of it is wrong in the same way. What follows is read from the statute, including the part that decides whether the 5 percent is the end of the matter or only the start.',
    icon: 'play',
  },
];

/** Every guide, due or not. Use `PUBLISHED_GUIDES` for anything reader-facing. */
export const ALL_GUIDES: Guide[] = [
  ...FILER_GUIDES,
  ...NTN_GUIDES,
  ...COMPANY_GUIDES,
  ...TRADEMARK_GUIDES,
  ...PROPERTY_GUIDES,
  ...PSEB_GUIDES,
  ...SALESTAX_GUIDES,
  ...SALARY_GUIDES,
  ...FILING_GUIDES,
  ...CREATOR_GUIDES,
];

/**
 * "Now", as the build sees it.
 *
 * Pinned to a date rather than a timestamp so a guide dated today appears on
 * any rebuild that day, whatever hour it runs and whatever timezone the runner
 * is in. Comparing full timestamps would mean a 02:00 UTC build hid a guide
 * dated today until the next run.
 */
function buildDate(): string {
  /*
   * GUIDE_BUILD_DATE exists for QA: it lets a build render the whole scheduled
   * slate at once so every guide can be checked before its date arrives. It is
   * never set in CI, so a normal build uses the real date and the schedule
   * holds.
   */
  return process.env.GUIDE_BUILD_DATE ?? new Date().toISOString().slice(0, 10);
}

/**
 * The guides that are live. Everything reader-facing reads this.
 *
 * A future-dated guide is absent from the routes, so it 404s rather than
 * rendering an unfinished page, and absent from the sitemap, so it is not
 * announced before it exists.
 */
export const PUBLISHED_GUIDES: Guide[] = ALL_GUIDES.filter(
  (g) => g.publishedAt <= buildDate(),
);

export const CLUSTER_BY_SLUG: Record<ClusterSlug, Cluster> = Object.fromEntries(
  CLUSTERS.map((c) => [c.slug, c]),
) as Record<ClusterSlug, Cluster>;

export function guidesInCluster(cluster: ClusterSlug): Guide[] {
  return PUBLISHED_GUIDES.filter((g) => g.cluster === cluster);
}

export function getGuide(slug: string): Guide | undefined {
  return PUBLISHED_GUIDES.find((g) => g.slug === slug);
}

export function guideHref(guide: Guide): string {
  return `/guides/${guide.cluster}/${guide.slug}`;
}

export function clusterHref(cluster: ClusterSlug): string {
  return `/guides/${cluster}`;
}

/** Clusters with at least one live guide. An empty cluster renders nothing. */
export function activeClusters(): Cluster[] {
  return CLUSTERS.filter((c) => guidesInCluster(c.slug).length > 0);
}

export const GUIDES_HUB = {
  title: 'Guides',
  intro:
    'Reference answers on Pakistani tax and company compliance, each citing the section it comes from and linking to the calculator that proves the number. Updated when the law changes, not on a schedule.',
  seo: {
    title: 'Tax and Compliance Guides for Pakistan',
    description:
      'Reference guides on Pakistani income tax, filer status, company registration, PSEB and trademarks. Every rate cited to its section of the Ordinance and linked to a free calculator.',
  },
} as const;
