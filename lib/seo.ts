import type { Metadata } from 'next';
import { BRAND, TAGLINE, X_HANDLE } from '@/content/site';

/**
 * Metadata helpers. Every page builds its metadata through `pageMetadata` so
 * canonical URLs, title suffixing and Open Graph defaults can never drift
 * between routes.
 */

export const SITE_URL = BRAND.domain.replace(/\/$/, '');

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
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

export const DEFAULT_DESCRIPTION = TAGLINE;
