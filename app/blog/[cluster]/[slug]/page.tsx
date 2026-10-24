import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PostPage } from '@/components/sections/PostPage';
import { postHref } from '@/content/posts';
import { getManagedArticle, managedArticles } from '@/lib/editorial-content';
import { pageMetadata } from '@/lib/seo';

/**
 * /blog/{cluster}/{slug}
 *
 * Generated only from PUBLISHED_POSTS, which filters on the build instant, so a
 * post whose slot has not arrived produces no route and 404s rather than
 * rendering early. Same mechanism as the guides: the scheduled rebuild is the
 * publishing step.
 */

export async function generateStaticParams() {
  return (await managedArticles()).map((p) => ({ cluster: p.cluster, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cluster: string; slug: string }>;
}): Promise<Metadata> {
  const { cluster, slug } = await params;
  const post = await getManagedArticle(cluster, slug);
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
  const post = await getManagedArticle(cluster, slug);
  if (!post) notFound();
  return <PostPage post={post} />;
}
