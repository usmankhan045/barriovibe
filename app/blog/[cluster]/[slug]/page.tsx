import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PostPage } from '@/components/sections/PostPage';
import { PUBLISHED_POSTS, postHref } from '@/content/posts';
import { pageMetadata } from '@/lib/seo';

/**
 * /blog/{cluster}/{slug}
 *
 * Generated only from PUBLISHED_POSTS, which filters on the build instant, so a
 * post whose slot has not arrived produces no route and 404s rather than
 * rendering early. Same mechanism as the guides: the scheduled rebuild is the
 * publishing step.
 */

export function generateStaticParams() {
  return PUBLISHED_POSTS.map((p) => ({ cluster: p.cluster, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cluster: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = PUBLISHED_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return pageMetadata({
    title: post.seo.title,
    description: post.seo.description,
    path: postHref(post),
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ cluster: string; slug: string }>;
}) {
  const { cluster, slug } = await params;
  const post = PUBLISHED_POSTS.find((p) => p.slug === slug && p.cluster === cluster);
  if (!post) notFound();
  return <PostPage post={post} />;
}
