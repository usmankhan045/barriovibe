import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GuidePage } from '@/components/sections/GuidePage';
import { guideHref } from '@/content/guides';
import { getManagedGuide, managedGuides } from '@/lib/editorial-content';
import { pageMetadata } from '@/lib/seo';

/**
 * /guides/{cluster}/{slug}
 *
 * Generated only from PUBLISHED_GUIDES, which filters on the build date. A
 * guide whose publishedAt has not arrived produces no route at all, so it 404s
 * rather than rendering an unfinished page, and it is absent from the sitemap
 * rather than announced before it exists. The daily rebuild is the whole
 * publishing mechanism.
 */

export async function generateStaticParams() {
  return (await managedGuides()).map((g) => ({ cluster: g.cluster, slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cluster: string; slug: string }>;
}): Promise<Metadata> {
  const { cluster, slug } = await params;
  const guide = await getManagedGuide(cluster, slug);
  if (!guide) return {};
  return pageMetadata({
    title: guide.seo.title,
    description: guide.seo.description,
    path: guideHref(guide),
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ cluster: string; slug: string }>;
}) {
  const { cluster, slug } = await params;
  const guide = await getManagedGuide(cluster, slug);
  if (!guide) notFound();
  return <GuidePage guide={guide} />;
}
