import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Container,
  Section,
  SectionHeading,
  Lead,
  Chip,
  Breadcrumb,
  ChessArt,
  IconWatermark,
} from '@/components/primitives';
import { Icon } from '@/components/icons';
import { IconBadge } from '@/components/ui/IconBadge';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { CtaBand } from '@/components/layout/CtaBand';
import { FaqAccordion } from '@/components/sections/FaqList';
import { JsonLd, breadcrumbSchema, faqSchema, itemListSchema } from '@/lib/jsonld';
import { PILLARS, PILLAR_BY_SLUG } from '@/content/pillars';
import { servicesByPillar, serviceHref, SERVICE_GROUPS } from '@/content/services';
import type { PillarSlug } from '@/content/types';
import { pageMetadata } from '@/lib/seo';
import type { ArtName } from '@/lib/art';

/**
 * Pillar pages — five of them, all prerendered from content/pillars.ts.
 *
 * `generateStaticParams` + `dynamicParams = false` means these five routes are
 * baked to HTML at build time and anything else 404s at the edge rather than
 * invoking a server.
 */
export function generateStaticParams() {
  return PILLARS.map((pillar) => ({ pillar: pillar.slug }));
}

export const dynamicParams = false;

/** One render per pillar so no two pages share art — five pillars, five renders. */
const PILLAR_ART: Record<PillarSlug, ArtName> = {
  'finance-tax': 'hero',
  'corporate-compliance': 'formation',
  'growth-marketing': 'victory',
  ecommerce: 'pawn',
  'software-ai': 'cluster',
};

type Params = Promise<{ pillar: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { pillar: slug } = await params;
  const pillar = PILLAR_BY_SLUG[slug as PillarSlug];
  if (!pillar) return {};

  const services = servicesByPillar(pillar.slug);

  return pageMetadata({
    title: pillar.title,
    description: `${pillar.blurb} ${services.length} services: ${services
      .map((s) => s.title)
      .join(', ')}.`.slice(0, 158),
    path: `/services/${pillar.slug}`,
  });
}

export default async function PillarPage({ params }: { params: Params }) {
  const { pillar: slug } = await params;
  const pillar = PILLAR_BY_SLUG[slug as PillarSlug];
  if (!pillar) notFound();

  const services = servicesByPillar(pillar.slug);
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: pillar.title, href: `/services/${pillar.slug}` },
  ];

  // The other four pillars, for cross-discipline discovery at the foot.
  const otherPillars = SERVICE_GROUPS.filter((g) => g.pillar.slug !== pillar.slug);

  // Surfaced as an FAQ block so the page answers the two questions every
  // visitor has before enquiring, rather than making them ask.
  const pillarFaqs = [
    {
      question: `Can I take just one ${pillar.shortTitle.toLowerCase()} service?`,
      answer: `Yes. Every service on this page is available on its own, with no minimum and no bundle. Most clients start with one and add others only when there is a reason to.`,
    },
    {
      question: 'How quickly can you start?',
      answer:
        'We reply to every enquiry within one working day and can usually scope within two. Turnaround per service is listed on each card above, and we give you a firm date in writing before any work begins.',
    },
  ];

  return (
    <main id="main" tabIndex={-1}>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={itemListSchema(pillar.title, services.map(serviceHref))} />
      <JsonLd data={faqSchema(pillarFaqs)} />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-20 pt-10 md:pt-14">
        <Container>
          <Breadcrumb items={crumbs} />

          <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative z-10">
              <div className="mb-7 flex items-center gap-4">
                <IconBadge icon={pillar.icon} variant={pillar.badge} />
                <span className="font-display text-ghost text-ink-ghost" aria-hidden="true">
                  {pillar.number}
                </span>
              </div>

              <SectionHeading
                level={1}
                eyebrow={pillar.title}
                lines={pillar.headline.lines}
                accent={pillar.headline.accent}
              />

              <Lead className="mt-7 max-w-[58ch]">{pillar.intro}</Lead>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/contact" size="lg">
                  Start a project
                </Button>
                <Button href="#services" variant="chrome" size="lg">
                  {services.length} services in this discipline
                </Button>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <IconWatermark />
              <ChessArt
                name={PILLAR_ART[pillar.slug]}
                sizes="45vw"
                className="relative mx-auto max-w-[460px]"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ── Services in this pillar ───────────────────────────────────── */}
      <Section id="services" band>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What's included"
              lines={[`${services.length} services under`]}
              accent={pillar.shortTitle}
            />
          </Reveal>

          <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.slug} as="li" index={i} className="h-full">
                <Link
                  href={serviceHref(service)}
                  className="u-tile u-tile-interactive group flex h-full flex-col p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-h3 text-ink transition-colors group-hover:text-blue-600">
                      {service.title}
                    </h3>
                    <Icon
                      name="arrow-up-right"
                      size={18}
                      className="mt-1 flex-none text-ink-body transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600"
                    />
                  </div>

                  <p className="mt-3 text-[15px] leading-[1.6] text-ink-body">
                    {service.oneLiner}
                  </p>

                  <ul className="mt-5 flex flex-1 flex-col gap-2">
                    {service.included.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Icon name="check" size={15} className="mt-1 flex-none text-blue-600" />
                        <span className="text-[13.5px] leading-[1.5] text-ink-body">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-5">
                    <Chip>
                      <Icon name="clock" size={13} className="mr-1.5 text-ink-body" />
                      {service.turnaround}
                    </Chip>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <Section tight>
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <SectionHeading eyebrow="Questions" lines={['Before you']} accent="ask" />
            </Reveal>
            <FaqAccordion faqs={pillarFaqs} />
          </div>
        </Container>
      </Section>

      {/* ── Other disciplines ─────────────────────────────────────────── */}
      <Section band tight>
        <Container>
          <Reveal>
            <h2 className="font-display text-h3 text-ink">The other four disciplines</h2>
          </Reveal>
          <ul className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {otherPillars.map(({ pillar: other, services: otherServices }, i) => (
              <Reveal key={other.slug} as="li" index={i} className="h-full">
                <Link
                  href={`/services/${other.slug}`}
                  className="u-tile u-tile-interactive group flex h-full flex-col p-6"
                >
                  <IconBadge icon={other.icon} variant={other.badge} size="sm" />
                  <h3 className="mt-4 font-display text-[17px] font-bold text-ink transition-colors group-hover:text-blue-600">
                    {other.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[14px] leading-[1.55] text-ink-body">
                    {other.blurb}
                  </p>
                  <p className="mt-4 text-caption font-medium text-blue-600">
                    {otherServices.length} services →
                  </p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand
        title={`Need help with ${pillar.shortTitle.toLowerCase()}?`}
        body={pillar.blurb}
        primaryLabel="Start a project"
      />
    </main>
  );
}
