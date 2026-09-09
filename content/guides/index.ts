import type { Cluster, ClusterSlug, Guide } from './types';
import { FILER_GUIDES } from './filer';

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
    icon: 'document',
  },
];

/** Every guide, due or not. Use `PUBLISHED_GUIDES` for anything reader-facing. */
export const ALL_GUIDES: Guide[] = [...FILER_GUIDES];

/**
 * "Now", as the build sees it.
 *
 * Pinned to a date rather than a timestamp so a guide dated today appears on
 * any rebuild that day, whatever hour it runs and whatever timezone the runner
 * is in. Comparing full timestamps would mean a 02:00 UTC build hid a guide
 * dated today until the next run.
 */
function buildDate(): string {
  return new Date().toISOString().slice(0, 10);
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
