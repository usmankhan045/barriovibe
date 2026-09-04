import type { MetadataRoute } from 'next';
import { SERVICES, serviceHref, PRACTICE_PAGES } from '@/content/services';
import { PILLARS } from '@/content/pillars';
import { TOOLS, toolHref } from '@/content/tools';
import { absoluteUrl } from '@/lib/seo';

/**
 * Sitemap, generated from the content layer.
 *
 * Deriving it means a new service is listed automatically — the usual failure
 * mode with a hand-maintained sitemap is a page that exists, is linked, and is
 * never submitted.
 *
 * `/dev/kitchen-sink` is deliberately absent; it is a development surface and
 * is also marked noindex.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Static build timestamp — every page is prerendered together, so they all
  // share a modification date.
  const lastModified = new Date();

  const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '/', priority: 1, changeFrequency: 'monthly' },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/work', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/blog', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.7, changeFrequency: 'yearly' },
    { path: '/tools', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.2, changeFrequency: 'yearly' },
  ];

  return [
    ...staticRoutes.map(({ path, priority, changeFrequency }) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency,
      priority,
    })),
    // Practice pages rank above the disciplines under them: they are what the
    // navbar leads with, and each one covers a whole practice.
    ...PRACTICE_PAGES.map(({ practice }) => ({
      url: absoluteUrl(`/services/${practice.slug}`),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
    ...PILLARS.map((pillar) => ({
      url: absoluteUrl(`/services/${pillar.slug}`),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...SERVICES.map((service) => ({
      url: absoluteUrl(serviceHref(service)),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    /* The calculators, ranked with the service pages rather than below them:
       they are pages people search for by name, and their rates change with
       each Finance Act, which is what the monthly frequency is saying.
       Derived from TOOLS for the same reason the services are derived from
       SERVICES: a tool that ships and is never submitted is the usual failure
       mode of a hand-kept list. */
    ...TOOLS.map((tool) => ({
      url: absoluteUrl(toolHref(tool)),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
