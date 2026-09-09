import Link from 'next/link';
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
import { GUIDES_HUB, activeClusters, clusterHref, guidesInCluster } from '@/content/guides';
import { pageMetadata } from '@/lib/seo';

/**
 * /guides: the index.
 *
 * Lists clusters rather than every guide, because the cluster is the unit that
 * owns a topic. A reader arriving here has a subject in mind, not a slug.
 */

export const metadata = pageMetadata({
  title: GUIDES_HUB.seo.title,
  description: GUIDES_HUB.seo.description,
  path: '/guides',
});

const CRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'Guides', href: '/guides' },
];

export default function GuidesPage() {
  const clusters = activeClusters();

  return (
    <main id="main" tabIndex={-1}>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <JsonLd data={organizationRef()} />
      <JsonLd
        data={itemListSchema('Guides', clusters.map((c) => clusterHref(c.slug)))}
      />

      <Section tight>
        <Container>
          <Breadcrumb items={CRUMBS} />
          <div className="mt-8 max-w-[62ch]">
            <Eyebrow>Reference</Eyebrow>
            <h1 className="mt-3 font-display text-h1 text-ink">{GUIDES_HUB.title}</h1>
            <Rule className="mt-6" />
            <p className="mt-6 text-body-lg text-ink-body">{GUIDES_HUB.intro}</p>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {clusters.map((c, i) => {
              const count = guidesInCluster(c.slug).length;
              return (
                <Reveal key={c.slug} as="li" index={i} className="h-full">
                  <Link
                    href={clusterHref(c.slug)}
                    className="u-tile u-tile-interactive group flex h-full flex-col p-7"
                  >
                    <span
                      className="u-badge u-badge--chrome grid size-11 place-items-center"
                      aria-hidden="true"
                    >
                      <Icon name={c.icon} size={19} />
                    </span>
                    <h2 className="mt-5 font-display text-h3 text-ink transition-colors group-hover:text-blue-600">
                      {c.title}
                    </h2>
                    <p className="mt-3 flex-1 text-[15px] leading-[1.6] text-ink-body">{c.card}</p>
                    <span className="mt-5 text-caption text-ink-body">
                      {count} {count === 1 ? 'guide' : 'guides'}
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </Section>
    </main>
  );
}
