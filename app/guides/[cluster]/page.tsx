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
  CLUSTER_BY_SLUG,
  activeClusters,
  clusterHref,
  guideHref,
  guidesInCluster,
  type ClusterSlug,
} from '@/content/guides';
import { pageMetadata } from '@/lib/seo';

/** /guides/{cluster}: the hub that owns the head term for its topic. */

export function generateStaticParams() {
  return activeClusters().map((c) => ({ cluster: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cluster: string }>;
}): Promise<Metadata> {
  const { cluster } = await params;
  const c = CLUSTER_BY_SLUG[cluster as ClusterSlug];
  if (!c) return {};
  return pageMetadata({
    title: `${c.title} guides`,
    description: c.card,
    path: clusterHref(c.slug),
  });
}

export default async function Page({ params }: { params: Promise<{ cluster: string }> }) {
  const { cluster } = await params;
  const c = CLUSTER_BY_SLUG[cluster as ClusterSlug];
  if (!c) notFound();
  const guides = guidesInCluster(c.slug);
  if (guides.length === 0) notFound();

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Guides', href: '/guides' },
    { label: c.title, href: clusterHref(c.slug) },
  ];

  return (
    <main id="main" tabIndex={-1}>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={organizationRef()} />
      <JsonLd data={itemListSchema(`${c.title} guides`, guides.map(guideHref))} />

      <Section tight>
        <Container>
          <Breadcrumb items={crumbs} />
          <div className="mt-8 max-w-[62ch]">
            <Eyebrow>Guides</Eyebrow>
            <h1 className="mt-3 font-display text-h1 text-ink">{c.title}</h1>
            <Rule className="mt-6" />
            <p className="mt-6 text-body-lg text-ink-body">{c.intro}</p>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {guides.map((g, i) => (
              <Reveal key={g.slug} as="li" index={i} className="h-full">
                <Link
                  href={guideHref(g)}
                  className="u-tile u-tile-interactive group flex h-full flex-col p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-display text-h3 text-ink transition-colors group-hover:text-blue-600">
                      {g.navLabel}
                    </h2>
                    <Icon
                      name="arrow-up-right"
                      size={18}
                      className="mt-1 flex-none text-ink-body transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600"
                    />
                  </div>
                  <p className="mt-3 flex-1 text-[15px] leading-[1.6] text-ink-body">{g.card}</p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>
    </main>
  );
}
