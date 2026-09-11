import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Container,
  Section,
  Eyebrow,
  Rule,
  Breadcrumb,
} from '@/components/primitives';
import { Icon } from '@/components/icons';
import { Reveal } from '@/components/ui/Reveal';
import { JsonLd, breadcrumbSchema, itemListSchema, organizationRef } from '@/lib/jsonld';
import {
  POST_CLUSTER_BY_SLUG,
  activePostClusters,
  postClusterHref,
  postHref,
  postsInCluster,
  type PostClusterSlug,
} from '@/content/posts';
import { pageMetadata } from '@/lib/seo';

/** /blog/{cluster}: the hub for one line of argument. */

export function generateStaticParams() {
  return activePostClusters().map((c) => ({ cluster: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cluster: string }>;
}): Promise<Metadata> {
  const { cluster } = await params;
  const c = POST_CLUSTER_BY_SLUG[cluster as PostClusterSlug];
  if (!c) return {};
  return pageMetadata({
    title: c.title,
    description: c.card,
    path: postClusterHref(c.slug),
  });
}

export default async function Page({ params }: { params: Promise<{ cluster: string }> }) {
  const { cluster } = await params;
  const c = POST_CLUSTER_BY_SLUG[cluster as PostClusterSlug];
  if (!c) notFound();
  const posts = postsInCluster(c.slug);
  if (posts.length === 0) notFound();

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: c.title, href: postClusterHref(c.slug) },
  ];

  return (
    <main id="main" tabIndex={-1}>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={organizationRef()} />
      <JsonLd data={itemListSchema(c.title, posts.map(postHref))} />

      <Section tight>
        <Container>
          <Breadcrumb items={crumbs} />
          <div className="mt-8 max-w-[62ch]">
            <Eyebrow>Blog</Eyebrow>
            <h1 className="mt-3 font-display text-h1 text-ink">{c.title}</h1>
            <Rule className="mt-6" />
            <p className="mt-6 text-body-lg text-ink-body">{c.intro}</p>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.slug} as="li" index={i} className="h-full">
                <Link
                  href={postHref(p)}
                  className="u-tile u-tile-interactive group flex h-full flex-col p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-display text-h3 text-ink transition-colors group-hover:text-blue-600">
                      {p.navLabel}
                    </h2>
                    <Icon
                      name="arrow-up-right"
                      size={18}
                      className="mt-1 flex-none text-ink-body transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600"
                    />
                  </div>
                  <p className="mt-3 flex-1 text-[15px] leading-[1.6] text-ink-body">{p.card}</p>
                  <time
                    dateTime={p.publishedAt.slice(0, 10)}
                    className="mt-4 text-caption text-ink-body"
                  >
                    {new Date(p.publishedAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      timeZone: 'UTC',
                    })}
                  </time>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>
    </main>
  );
}
