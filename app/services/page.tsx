import Link from 'next/link';
import {
  Container,
  Section,
  SectionHeading,
  Lead,
  Eyebrow,
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
import { JsonLd, breadcrumbSchema, itemListSchema } from '@/lib/jsonld';
import {
  SERVICE_GROUPS,
  SERVICE_COUNT,
  SERVICE_COUNT_WORD,
  serviceHref,
  pillarHref,
} from '@/content/services';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: `All ${SERVICE_COUNT} Services`,
  description: `Every service we offer, listed in full: web, apps, AI agents, automation, accounting, income and sales tax, SECP compliance, trademark and import-export registration, social, paid ads, Shopify and marketplaces.`,
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
 * Each service shows its one-liner and turnaround, so a visitor can compare
 * across pillars without opening 18 tabs. No price band — the site publishes
 * no figures; see content/types.ts.
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
                accent="Five disciplines"
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

      {/* ── One block per pillar ──────────────────────────────────────── */}
      {SERVICE_GROUPS.map(({ pillar, services }, groupIndex) => (
        <Section key={pillar.slug} id={pillar.slug} band={groupIndex % 2 === 0}>
          <Container>
            <Reveal>
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex items-start gap-5">
                  <IconBadge icon={pillar.icon} variant={pillar.badge} />
                  <div>
                    <Eyebrow>Discipline {pillar.number}</Eyebrow>
                    <h2 className="mt-2 font-display text-h2 text-ink">{pillar.title}</h2>
                  </div>
                </div>
                <Link
                  href={pillarHref(pillar.slug)}
                  className="u-arrow-link self-start text-caption lg:self-auto"
                >
                  About this discipline
                  <Icon name="arrow-right" size={15} className="u-arrow-link__icon" />
                </Link>
              </div>
              <p className="mt-6 max-w-[68ch] text-body-lg text-ink-body">{pillar.intro}</p>
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

                    <p className="mt-3 flex-1 text-[15px] leading-[1.6] text-ink-body">
                      {service.oneLiner}
                    </p>

                    {/* One chip, turnaround only — the price chip that used to
                        sit under it is gone with the rest of the site's
                        pricing. Still a column: turnaround strings run long
                        ("4–10 weeks depending on scope") and a wrapped chip
                        would make one card's bottom block taller than its
                        neighbours', which is what moves the hairline divider
                        out of line across a row. */}
                    <div className="mt-6 flex flex-col items-start gap-2 border-t border-line pt-5">
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
      ))}

      <CtaBand
        title="Not sure which of these you need?"
        body={`Tell us the problem rather than the service. We will tell you which of the ${SERVICE_COUNT_WORD.toLowerCase()} applies, and if none of them do, we will say that too.`}
        primaryLabel="Describe your situation"
      />
    </main>
  );
}
