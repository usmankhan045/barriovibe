import type { MetadataRoute } from 'next';
import { SERVICES, serviceHref, PRACTICE_PAGES } from '@/content/services';
import { PILLARS } from '@/content/pillars';
import { TOOLS, toolHref } from '@/content/tools';
import { absoluteUrl } from '@/lib/seo';
import { newestLastModified } from '@/lib/lastmod';

/**
 * Sitemap, generated from the content layer.
 *
 * Deriving it means a new service is listed automatically: the usual failure
 * mode with a hand-maintained sitemap is a page that exists, is linked, and is
 * never submitted.
 *
 * `/dev/kitchen-sink` is deliberately absent; it is a development surface and
 * is also marked noindex.
 *
 * ── On lastmod ──
 *
 * Every URL used to carry `new Date()`, the moment of the build. That claimed
 * the privacy policy and every calculator changed together on each deploy,
 * which is the pattern Google's documentation names as a reason to stop
 * believing a sitemap's dates entirely. The cost fell on the pages that really
 * do change: a calculator revised after a Finance Act is the one thing here
 * worth recrawling promptly, and it was buried in eighty-three false positives.
 *
 * Each URL now carries the commit date of the content it is generated from. See
 * lib/lastmod.ts.
 */

/** Files every page renders through, so a change to any of them touches all. */
const GLOBAL_SOURCES = ['app/layout.tsx', 'content/site.ts'];

/** The commit date of `sources`, or of the global files if that is newer. */
function modified(...sources: string[]): Date {
  return newestLastModified([...GLOBAL_SOURCES, ...sources]);
}

export default function sitemap(): MetadataRoute.Sitemap {
  /*
   * changeFrequency is a hint Google has said for years that it ignores, so
   * these are set to be *true* rather than to be persuasive. The calculators
   * say monthly because Finance Act amendments and SRO revisions genuinely land
   * through the year. /blog and /work say yearly because they are empty states
   * today: claiming monthly on a page that has not changed since launch is the
   * same false-freshness signal the lastmod fix above exists to remove, and
   * doing it deliberately here would undo that.
   */
  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
    sources: string[];
  }[] = [
    { path: '/', priority: 1, changeFrequency: 'monthly', sources: ['app/page.tsx'] },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly', sources: ['app/services/page.tsx', 'content/services/index.ts'] },
    { path: '/about', priority: 0.6, changeFrequency: 'yearly', sources: ['app/about/page.tsx'] },
    { path: '/work', priority: 0.6, changeFrequency: 'yearly', sources: ['app/work/page.tsx', 'content/cases.ts'] },
    { path: '/blog', priority: 0.5, changeFrequency: 'yearly', sources: ['app/blog/page.tsx'] },
    { path: '/contact', priority: 0.7, changeFrequency: 'yearly', sources: ['app/contact/page.tsx'] },
    { path: '/tools', priority: 0.7, changeFrequency: 'monthly', sources: ['app/tools/page.tsx', 'content/tools.ts'] },
    { path: '/privacy', priority: 0.2, changeFrequency: 'yearly', sources: ['app/privacy/page.tsx'] },
    { path: '/terms', priority: 0.2, changeFrequency: 'yearly', sources: ['app/terms/page.tsx'] },
  ];

  return [
    ...staticRoutes.map(({ path, priority, changeFrequency, sources }) => ({
      url: absoluteUrl(path),
      lastModified: modified(...sources),
      changeFrequency,
      priority,
    })),
    // Practice pages rank above the disciplines under them: they are what the
    // navbar leads with, and each one covers a whole practice.
    ...PRACTICE_PAGES.map(({ practice }) => ({
      url: absoluteUrl(`/services/${practice.slug}`),
      lastModified: modified('content/practices.ts', 'app/services/[category]/page.tsx'),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
    ...PILLARS.map((pillar) => ({
      url: absoluteUrl(`/services/${pillar.slug}`),
      lastModified: modified('content/pillars.ts', 'app/services/[category]/page.tsx'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    /* Each service dates from its own content file, so revising the tax
       services does not claim the software ones changed with them. */
    ...SERVICES.map((service) => ({
      url: absoluteUrl(serviceHref(service)),
      lastModified: modified(
        ...pillarSources(service.pillar),
        'app/services/[category]/[service]/page.tsx',
      ),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    /* The calculators, ranked with the service pages rather than below them:
       they are pages people search for by name, and their rates change with
       each Finance Act, which is what the monthly frequency is saying.

       A tool's date covers its copy, its rate module and the shared template,
       so a Finance Act amendment to lib/tax/ moves exactly the calculators it
       touched. That is the recrawl signal this sitemap exists to send. */
    ...TOOLS.map((tool) => ({
      url: absoluteUrl(toolHref(tool)),
      lastModified: modified(
        'content/tools.ts',
        'content/provenance.ts',
        'components/sections/ToolPage.tsx',
        ...toolRateSources(tool.slug),
      ),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}

/**
 * The content files a pillar's services are written in.
 *
 * One file per pillar, except international expansion: the US and UK blocks
 * each outgrew the shared file and moved to their own, all three exporting
 * under the same pillar slug. Naming only the pillar file there would date the
 * ten US and UK services off a file that no longer contains them.
 */
function pillarSources(pillar: string): string[] {
  const base = `content/services/${pillar}.ts`;
  return pillar === 'international-expansion'
    ? [base, 'content/services/usa.ts', 'content/services/uk.ts']
    : [base];
}

/**
 * The rate modules a given calculator computes from.
 *
 * Mapped by prefix rather than exhaustively per tool: the point is that a
 * change to lib/tax/property.ts moves the property calculators and not the
 * vehicle ones, and a prefix match gets that right while staying legible. A
 * slug matching nothing here falls back to the salary engine, which is the
 * module the shared slab helpers live in.
 */
function toolRateSources(slug: string): string[] {
  const base = 'lib/tax';
  const byPrefix: [test: (s: string) => boolean, files: string[]][] = [
    [(s) => s.includes('property'), [`${base}/property.ts`]],
    [(s) => s.includes('vehicle'), [`${base}/vehicle.ts`]],
    [(s) => s.includes('corporate') || s.includes('super-tax'), [`${base}/corporate.ts`]],
    [(s) => s.includes('business') || s.includes('turnover'), [`${base}/business.ts`]],
    [
      (s) => s.includes('capital-gains') || s.includes('mutual-fund'),
      [`${base}/investments.ts`],
    ],
    [
      (s) =>
        s.includes('cash-withdrawal') ||
        s.includes('electricity') ||
        s.includes('mobile-internet') ||
        s.includes('rental') ||
        s.includes('freelancer'),
      [`${base}/withholding.ts`],
    ],
    [(s) => s.includes('agriculture'), [`${base}/provincial.ts`]],
    [
      (s) => s.includes('salary') || s.includes('job-offer') || s.includes('increment'),
      [`${base}/salary-tools.ts`, `${base}/pakistan.ts`],
    ],
  ];

  const hit = byPrefix.find(([test]) => test(slug));
  return hit ? hit[1] : [`${base}/pakistan.ts`];
}
