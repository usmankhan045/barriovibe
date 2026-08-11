import Link from 'next/link';
import {
  Container,
  Section,
  SectionHeading,
  Lead,
  Eyebrow,
  Breadcrumb,
  ChessArt,
  IconWatermark,
} from '@/components/primitives';
import { Icon } from '@/components/icons';
import { IconBadge } from '@/components/ui/IconBadge';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { JsonLd, breadcrumbSchema, itemListSchema } from '@/lib/jsonld';
import {
  PRACTICE_GROUPS,
  SERVICE_GROUPS,
  SERVICE_COUNT,
  SERVICE_COUNT_WORD,
  serviceHref,
  pillarHref,
  practiceHref,
  practiceServiceCount,
} from '@/content/services';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: `All ${SERVICE_COUNT} Services`,
  description: `Every service we offer, listed in full: web, apps, AI agents, RAG, automation, accounting, income and sales tax, SECP registration and compliance, trademarks and patents, contracts, paid ads, Shopify, and company setup in Saudi Arabia, the UAE and the UK.`,
  path: '/services',
});

const CRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
];

/**
 * The services hub — the full catalogue, expanded.
 *
 * The home page's index section is a summary; this is the complete reference.
 * Each service shows its one-liner, so a visitor can compare across
 * disciplines without opening three dozen tabs. No price and no turnaround:
 * the site publishes neither figure; see content/types.ts.
 *
 * Structured practice → discipline → services, because a flat run of seven
 * discipline blocks reads as one very long list and loses the thing the
 * navigation now leads with. The practice heading is a band-width divider
 * rather than a card, but it does link out: the practice pages exist now, and a
 * heading that names a page the visitor cannot get to from it is the same hole
 * this hub is here to close.
 */
export default function ServicesPage() {
  return (
    <main id="main" tabIndex={-1}>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <JsonLd
        data={itemListSchema(
          'Services',
          SERVICE_GROUPS.flatMap(({ services }) => services.map(serviceHref)),
        )}
      />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-20 pt-10 md:pt-14">
        <Container>
          <Breadcrumb items={CRUMBS} />

          <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative z-10">
              <SectionHeading
                level={1}
                eyebrow="Everything we offer"
                lines={[`${SERVICE_COUNT_WORD} services.`]}
                accent="Three practices"
              />
              <Lead className="mt-7">
                The complete catalogue with nothing collapsed. Every service below is
                available on its own. There is no minimum and no bundle you have to
                buy into.
              </Lead>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/contact" size="lg">
                  Start a project
                </Button>
                <Button href="/work" variant="chrome" size="lg">
                  See our work
                </Button>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <IconWatermark />
              <ChessArt name="formation" sizes="45vw" className="relative" />
            </div>
          </div>
        </Container>
      </section>

      {/* ── One section per practice, one block per discipline inside it ─
          `scroll-mt` because a practice id is now a link target rather than
          only an anchor for this page's own nav: the home page's Corporate &
          Advisory button points at `/services#corporate-advisory`. Without it
          the practice heading lands under the floating nav pill. Same value the
          discipline blocks inside use. */}
      {PRACTICE_GROUPS.map(({ practice, groups }, practiceIndex) => (
        <Section
          key={practice.slug}
          id={practice.slug}
          band={practiceIndex % 2 === 0}
          className="scroll-mt-28"
        >
          <Container>
            {/* The practice header, now a link. It carried no link when a
                practice had no page; the two multi-discipline practices have
                one, and `practiceHref` sends the third to its single
                discipline, so every heading here resolves to a page that
                covers exactly what the heading names. */}
            <Reveal>
              <div className="flex flex-col gap-5 border-b border-line pb-8 sm:flex-row sm:items-start">
                <IconBadge icon={practice.icon} variant={practice.badge} />
                <div className="flex-1">
                  <Eyebrow>{practiceServiceCount(practice.slug)} services</Eyebrow>
                  <h2 className="mt-2 font-display text-h2 text-ink">{practice.title}</h2>
                  <p className="mt-5 max-w-[68ch] text-body-lg text-ink-body">
                    {practice.intro}
                  </p>
                  <Link
                    href={practiceHref(practice.slug)}
                    className="u-arrow-link mt-6 text-caption"
                  >
                    {groups.length > 1
                      ? `All ${practiceServiceCount(practice.slug)} services in this practice`
                      : 'About this practice'}
                    <Icon name="arrow-right" size={15} className="u-arrow-link__icon" />
                  </Link>
                </div>
              </div>
            </Reveal>

            {groups.map(({ pillar, services }) => (
              <div key={pillar.slug} id={pillar.slug} className="scroll-mt-28 pt-16">
                <Reveal>
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                      <SectionHeading
                        level={3}
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

                <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {services.map((service, i) => (
                    <Reveal key={service.slug} as="li" index={i} className="h-full">
                      <Link
                        href={serviceHref(service)}
                        className="u-tile u-tile-interactive group flex h-full flex-col p-7"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <h4 className="font-display text-h3 text-ink transition-colors group-hover:text-blue-600">
                            {service.title}
                          </h4>
                          <Icon
                            name="arrow-up-right"
                            size={18}
                            className="mt-1 flex-none text-ink-body transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600"
                          />
                        </div>

                        <p className="mt-3 flex-1 text-[15px] leading-[1.6] text-ink-body">
                          {service.oneLiner}
                        </p>
                      </Link>
                    </Reveal>
                  ))}
                </ul>
              </div>
            ))}
          </Container>
        </Section>
      ))}

    </main>
  );
}
