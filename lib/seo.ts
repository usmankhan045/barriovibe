import type { Metadata } from 'next';
import { BRAND, TAGLINE, X_HANDLE } from '@/content/site';
import { TAX_YEAR } from '@/lib/tax/pakistan';

/**
 * Metadata helpers. Every page builds its metadata through `pageMetadata` so
 * canonical URLs, title suffixing and Open Graph defaults can never drift
 * between routes.
 */

export const SITE_URL = BRAND.domain.replace(/\/$/, '');

/**
 * The social card, named explicitly.
 *
 * `app/opengraph-image.tsx` is a file convention, and Next applies it to the
 * route segment it sits in and to segments that inherit their metadata. A page
 * that declares its own `openGraph` object replaces the inherited one wholesale
 * rather than merging into it, so every page built by `pageMetadata` below was
 * dropping the card: 85 of 87 pages shipped no `og:image` at all, and a service
 * or tool link pasted into WhatsApp or LinkedIn rendered as bare text.
 *
 * Naming the route here puts the image back on all of them. One card for the
 * whole site is deliberate, per the note in app/opengraph-image.tsx: the title
 * and description sit beside it in every social preview, so per-page cards
 * would add build time for something nobody looks at twice.
 */
const OG_IMAGE = {
  url: absoluteUrl('/opengraph-image'),
  width: 1200,
  height: 630,
  alt: `${BRAND.name}: ${TAGLINE}`,
};

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

interface PageMetaInput {
  title: string;
  description: string;
  /** Site-relative path, e.g. '/services/finance-tax'. */
  path: string;
  /** Set on pages that should not be indexed (dev, thank-you pages). */
  noIndex?: boolean;
}

export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${BRAND.name}`,
      description,
      url,
      siteName: BRAND.name,
      locale: 'en_PK',
      type: 'website',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${BRAND.name}`,
      description,
      // Both keys, because they answer different questions: `site` is the
      // account the page belongs to and `creator` the byline. With one
      // account they are the same handle, and X attributes the card to it
      // either way.
      site: X_HANDLE,
      creator: X_HANDLE,
      images: [OG_IMAGE.url],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

export const DEFAULT_DESCRIPTION = TAGLINE;

/**
 * Metadata for a calculator page.
 *
 * The one thing this adds over `pageMetadata` is the tax year, appended to the
 * title from `TAX_YEAR.searchLabel`.
 *
 * ── Why centrally, and not written into each tool's `seo.title` ──
 *
 * Twenty-two hand-edited titles would be twenty-two chances to write a
 * different year, and every one of them would have to be found again the next
 * time a Finance Act lands. Worse, a title claiming the wrong year on a tax
 * calculator is not a cosmetic error: it is the page telling a reader the
 * figures are for a year they are not for.
 *
 * Here it is one string, derived from the same constant the rates are, so the
 * title cannot outlive the slabs beneath it.
 *
 * ── On length ──
 *
 * This pushes titles past the ~60 characters Google renders, and that is a
 * deliberate trade rather than an oversight. A truncated title still matches
 * the query in full: the year is what makes "income tax calculator pakistan
 * 2026-27" resolve to this page rather than to a competitor's, and matching a
 * search nobody else answers is worth more than a tidy ellipsis. The brand,
 * appended last by the layout template, is what gets cut, and it is the part a
 * reader already sees in the URL beneath.
 */
export function toolMetadata({
  title,
  description,
  path,
}: Omit<PageMetaInput, 'noIndex'>): Metadata {
  return pageMetadata({
    title: `${title} ${TAX_YEAR.searchLabel}`,
    description,
    path,
  });
}
