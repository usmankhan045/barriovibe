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
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { ServiceTiles } from '@/components/sections/ServiceTiles';
import { FaqAccordion } from '@/components/sections/FaqList';
import { JsonLd, breadcrumbSchema, faqSchema, itemListSchema } from '@/lib/jsonld';
import { PILLARS, PILLAR_BY_SLUG } from '@/content/pillars';
import { PRACTICE_OF_PILLAR } from '@/content/practices';
import {
  servicesByPillar,
  servicesByPractice,
  serviceHref,
  practiceHref,
  pillarHref,
  getPracticePage,
  PRACTICE_PAGES,
} from '@/content/services';
import type { Pillar, Practice, PillarSlug } from '@/content/types';
import { pageMetadata } from '@/lib/seo';
import type { ArtName } from '@/lib/art';

/**
 * The category route. One template, two kinds of page.
 *
 * `/services/{slug}` resolves to a PRACTICE page when the slug names a
 * practice holding more than one discipline, and to a DISCIPLINE page
 * otherwise. Nine routes in total: seven disciplines plus Marketing &
 * E-commerce and Corporate & Advisory.
 *
 * ── Why one segment carries both ──
 *
 * Not by preference. `software-ai` is the slug of a practice AND of the
 * discipline inside it, so the two levels cannot occupy separate dynamic
 * segments at the same depth without one shadowing the other. Resolving both
 * here also keeps the URL shape flat, which is what the breadcrumbs, the
 * mega-menu and every existing inbound link already assume.
 *
 * The segment is named `category` rather than `pillar` for that reason: the
 * value is whichever level of the tree the slug names.
 *
 * `generateStaticParams` + `dynamicParams = false` bakes all nine to HTML at
 * build time and 404s anything else at the edge rather than invoking a server.
 */
export function generateStaticParams() {
  return [
    ...PILLARS.map((pillar) => ({ category: pillar.slug })),
    ...PRACTICE_PAGES.map(({ practice }) => ({ category: practice.slug })),
  ];
}

export const dynamicParams = false;

/* One render per discipline so pages within a practice do not share art.
 *
 * There are seven disciplines and five renders, so two reuses are unavoidable.
 * They are placed ACROSS practices rather than within one: Intellectual
 * Property and International Expansion sit beside Corporate & Legal and
 * Finance & Tax in the same practice, so they borrow from the two disciplines
 * furthest from them in the navigation instead. Two adjacent tabs opening onto
 * the same illustration is the thing this map exists to avoid. */
const PILLAR_ART: Record<PillarSlug, ArtName> = {
  'software-ai': 'cluster',
  'growth-marketing': 'victory',
  ecommerce: 'pawn',
  'finance-tax': 'hero',
  'corporate-legal': 'formation',
  'intellectual-property': 'pawn',
  'international-expansion': 'victory',
};

/* The three navbar tabs open onto `cluster` (the Software & AI discipline
   page), `hero` and `formation`. Distinct across the tab strip is the rule that
   matters most here: those three pages are one click apart from each other, so
   two of them sharing a render is the reuse a visitor would actually notice.
   Corporate & Advisory reuses its Corporate & Legal discipline's render, which
   is four scrolls down its own page rather than beside it in the nav. */
const PRACTICE_ART: Record<string, ArtName> = {
  'marketing-ecommerce': 'hero',
  'corporate-advisory': 'formation',
};

type Params = Promise<{ category: string }>;

/**
 * The two questions every visitor has before enquiring, surfaced as an FAQ
 * block rather than left to be asked. `subject` is the thing they would be
 * buying one of: a discipline on a discipline page, a practice on a practice
 * page.
 */
function categoryFaqs(subject: string) {
  return [
    {
      question: `Can I take just one ${subject} service?`,
      answer:
        'Yes. Every service on this page is available on its own, with no minimum and no bundle. Most clients start with one and add others only when there is a reason to.',
    },
    {
      question: 'How quickly can you start?',
      answer:
        'We reply to every enquiry within one working day and can usually scope within two. We do not publish a turnaround per service, because the honest answer depends on your documents and, for anything filed with a regulator, on the regulator. You get a firm date in writing before any work begins.',
    },
  ];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { category: slug } = await params;

  const practiceEntry = getPracticePage(slug);
  if (practiceEntry) {
    const { practice, groups } = practiceEntry;
    const services = servicesByPractice(practice.slug);
    return pageMetadata({
      title: practice.title,
      description: `${services.length} services across ${groups
        .map((g) => g.pillar.title)
        .join(' and ')}: ${services.map((s) => s.title).join(', ')}.`.slice(0, 158),
      path: `/services/${practice.slug}`,
    });
  }

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

export default async function CategoryPage({ params }: { params: Params }) {
  const { category: slug } = await params;

  const practiceEntry = getPracticePage(slug);
  if (practiceEntry) return <PracticeView {...practiceEntry} />;

  const pillar = PILLAR_BY_SLUG[slug as PillarSlug];
  if (!pillar) notFound();

  return <PillarView pillar={pillar} />;
}

/* ── The practice page ─────────────────────────────────────────────────────
 *
 * Everything under one navbar tab, on the page that tab opens. The services
 * are grouped by discipline rather than run together as one grid of six or
 * thirteen: the grouping is the reason the practice exists, and a visitor who
 * came for a Shopify store should be able to see where the marketplace work
 * stops and the paid campaigns start.
 */
function PracticeView({
  practice,
  groups,
}: {
  practice: Practice;
  groups: { pillar: Pillar; services: ReturnType<typeof servicesByPillar> }[];
}) {
  const services = servicesByPractice(practice.slug);
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: practice.title, href: `/services/${practice.slug}` },
  ];

  const faqs = categoryFaqs(practice.shortTitle.toLowerCase());

  return (
    <main id="main" tabIndex={-1}>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={itemListSchema(practice.title, services.map(serviceHref))} />
      <JsonLd data={faqSchema(faqs)} />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-20 pt-10 md:pt-14">
        <Container>
          <Breadcrumb items={crumbs} />

          <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative z-10">
              <SectionHeading
                level={1}
                size="display"
                eyebrow={practice.title}
                lines={practice.headline!.lines}
                accent={practice.headline!.accent}
              />

              <Lead className="mt-7 max-w-[58ch]">{practice.intro}</Lead>

              {/* The disciplines, named before the fold. This is the line that
                  was missing: the tab says two things, so the page has to show
                  both of them above the grid rather than only in it. */}
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {groups.map(({ pillar, services: pillarServices }) => (
                  <li key={pillar.slug}>
                    {/* `u-tap` on the anchor, not the Chip. The anchor is what
                        takes the tap and it was an inline box collapsed to 19px
                        around the Chip inside it, so the visible pill was bigger
                        than the thing that answered to a finger. See the
                        tap-target note in globals.css. */}
                    <Link href={`#${pillar.slug}`} className="u-tap">
                      <Chip className="gap-2 transition-colors hover:border-blue-200 hover:text-blue-600">
                        {pillar.title}
                        <span className="font-normal text-ink-body">{pillarServices.length}</span>
                      </Chip>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/contact" size="lg">
                  Start a project
                </Button>
                <Button href="#services" variant="chrome" size="lg">
                  {services.length} services in this practice
                </Button>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <IconWatermark />
              <ChessArt
                name={PRACTICE_ART[practice.slug] ?? 'formation'}
                sizes="45vw"
                className="relative mx-auto max-w-[460px]"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ── Every service in the practice, one block per discipline ──────
          No section heading over the top of these. Each discipline announces
          itself at full size, and a "What's included" header above them would
          be a second heading competing with the first block's own. */}
      <Section id="services" band>
        <Container>
          {groups.map(({ pillar, services: pillarServices }, i) => (
            <div
              key={pillar.slug}
              id={pillar.slug}
              className={i === 0 ? 'scroll-mt-28' : 'scroll-mt-28 pt-20'}
            >
              <Reveal>
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    {/* H2, not H3. Each discipline block is a top-level
                        section of this page, under the H1 and under nothing
                        else, so H3 skipped a level: an outline reader saw a
                        subsection of a heading that was not there. It went
                        unnoticed on the seven practice pages that happen to
                        carry an H2 further down, and showed plainly on
                        corporate-advisory and marketing-ecommerce, which do
                        not. `size` still renders it at h2 scale, so this
                        changes the document outline and not the design. */}
                    <SectionHeading
                      level={2}
                      size="h2"
                      eyebrow={pillar.title}
                      lines={pillar.servicesHeadline.lines}
                      accent={pillar.servicesHeadline.accent}
                    />
                    <p className="mt-7 max-w-[64ch] text-body-lg text-ink-body">{pillar.blurb}</p>
                  </div>
                  <Link
                    href={pillarHref(pillar.slug)}
                    className="u-arrow-link flex-none self-start text-caption lg:self-auto lg:pb-2"
                  >
                    About this discipline
                    <Icon name="arrow-right" size={15} className="u-arrow-link__icon" />
                  </Link>
                </div>
              </Reveal>

              <ServiceTiles services={pillarServices} />
            </div>
          ))}
        </Container>
      </Section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <Section tight>
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <SectionHeading eyebrow="Questions" lines={['Before you']} accent="ask" />
            </Reveal>
            <FaqAccordion faqs={faqs} />
          </div>
        </Container>
      </Section>
    </main>
  );
}

/* ── The discipline page ─────────────────────────────────────────────────── */
function PillarView({ pillar }: { pillar: Pillar }) {
  const services = servicesByPillar(pillar.slug);
  const practice = PRACTICE_OF_PILLAR[pillar.slug];

  /* The practice crumb is only worth a level when the practice has a page of
     its own. For Software & AI that page IS this one, so adding it would be a
     breadcrumb linking to itself. */
  const practiceCrumb =
    practice && practice.pillars.length > 1
      ? [{ label: practice.shortTitle, href: practiceHref(practice.slug) }]
      : [];

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    ...practiceCrumb,
    { label: pillar.title, href: `/services/${pillar.slug}` },
  ];

  const pillarFaqs = categoryFaqs(pillar.shortTitle.toLowerCase());

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
              <SectionHeading
                level={1}
                size="display"
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

              {/* One discipline of several under a tab that names the practice.
                  Without this line the page is a dead end for a visitor who
                  clicked "Marketing & E-commerce" and wants the other half. */}
              {practice && practice.pillars.length > 1 && (
                <p className="mt-7 text-[14px] text-ink-body">
                  Part of{' '}
                  <Link href={practiceHref(practice.slug)} className="u-arrow-link">
                    {practice.title}
                    <Icon name="arrow-right" size={15} className="u-arrow-link__icon" />
                  </Link>{' '}
                  <span className="text-ink-ghost">
                    ({servicesByPractice(practice.slug).length} services in the practice)
                  </span>
                </p>
              )}
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
              lines={pillar.servicesHeadline.lines}
              accent={pillar.servicesHeadline.accent}
            />
          </Reveal>

          <div className="mt-4">
            <ServiceTiles services={services} />
          </div>
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
    </main>
  );
}
