import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Container,
  Section,
  SectionHeading,
  Eyebrow,
  Chip,
  Rule,
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
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/jsonld';
import { PILLAR_BY_SLUG } from '@/content/pillars';
import { SERVICES, getService, serviceHref, relatedServices } from '@/content/services';
import { pageMetadata } from '@/lib/seo';
import type { ArtName } from '@/lib/art';
import { cx } from '@/lib/cx';

/**
 * The service page template — one file, eighteen prerendered pages.
 *
 * Every service renders the identical section order, which is deliberate: a
 * visitor comparing two services should find the same information in the same
 * place both times, and any section that would be empty (documents, for the
 * non-compliance services) is omitted rather than shown blank.
 *
 * All content comes from content/services/*.ts. `pnpm check:content` asserts
 * every field these sections read is populated, so a half-finished service
 * cannot reach the build.
 */
export function generateStaticParams() {
  return SERVICES.map((service) => ({
    pillar: service.pillar,
    service: service.slug,
  }));
}

export const dynamicParams = false;

/**
 * Art rotates by position within the pillar so adjacent service pages never
 * show the same render.
 */
const ART_ROTATION: ArtName[] = ['pawn', 'formation', 'cluster', 'victory', 'hero', 'pawn'];

type Params = Promise<{ pillar: string; service: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return pageMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: serviceHref(service),
  });
}

export default async function ServicePage({ params }: { params: Params }) {
  const { pillar: pillarSlug, service: serviceSlug } = await params;
  const service = getService(serviceSlug);

  // Guard against a service being reached through the wrong pillar's path,
  // which would otherwise render a page with a mismatched breadcrumb.
  if (!service || service.pillar !== pillarSlug) notFound();

  const pillar = PILLAR_BY_SLUG[service.pillar];
  const related = relatedServices(service);
  const artIndex = SERVICES.filter((s) => s.pillar === service.pillar).findIndex(
    (s) => s.slug === service.slug,
  );
  const art = ART_ROTATION[artIndex % ART_ROTATION.length] ?? 'pawn';

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: pillar.shortTitle, href: `/services/${pillar.slug}` },
    { label: service.title, href: serviceHref(service) },
  ];

  return (
    <main id="main" tabIndex={-1}>
      <JsonLd data={serviceSchema(service)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={faqSchema(service.faqs)} />

      {/* ── 1. Hero ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-16 pt-10 md:pt-14">
        <Container>
          <Breadcrumb items={crumbs} />

          <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative z-10">
              <div className="mb-6 flex items-center gap-4">
                <IconBadge icon={service.icon} variant={pillar.badge} size="md" />
                <Link
                  href={`/services/${pillar.slug}`}
                  className="u-eyebrow transition-colors hover:text-blue-500"
                >
                  {pillar.title}
                </Link>
              </div>

              <h1 className="text-h1 text-ink">{service.title}</h1>
              <Rule className="mt-6" />

              <p className="mt-6 max-w-[60ch] text-body-lg text-ink-body">{service.intro}</p>

              <div className="mt-7 flex flex-wrap gap-2">
                <Chip>
                  <Icon name="clock" size={14} className="mr-1.5 text-ink-body" />
                  {service.turnaround}
                </Chip>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={`/contact?service=${service.slug}`} size="lg">
                  Start a project
                </Button>
                <Button href="#included" variant="chrome" size="lg">
                  What&rsquo;s included
                </Button>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <IconWatermark />
              <ChessArt name={art} sizes="40vw" className="relative mx-auto max-w-[380px]" />
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2. What's included ────────────────────────────────────────── */}
      <Section id="included" band>
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-32">
                <SectionHeading
                  eyebrow="Scope"
                  lines={["What's"]}
                  accent="included"
                />
                <p className="mt-6 max-w-[40ch] text-[15px] leading-[1.65] text-ink-body">
                  Everything below is in the standard engagement. Anything outside it is
                  agreed in writing before the work starts, never after.
                </p>
              </div>
            </Reveal>

            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {service.included.map((item, i) => (
                <Reveal key={item} as="li" index={i} className="h-full">
                  <div className="u-tile flex h-full items-start gap-4 p-6">
                    <span
                      className="mt-0.5 grid size-6 flex-none place-items-center rounded-pill bg-blue-50 text-blue-600"
                      aria-hidden="true"
                    >
                      <Icon name="check" size={14} />
                    </span>
                    <span className="text-[15px] leading-[1.6] text-ink-strong">{item}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ── 3. Who it's for ───────────────────────────────────────────── */}
      <Section tight>
        <Container>
          <Reveal>
            <div className="u-tile flex flex-col gap-6 p-8 md:flex-row md:items-center md:gap-10">
              <div className="md:w-64 md:flex-none">
                <Eyebrow>Who this is for</Eyebrow>
                <p className="mt-2 font-display text-h3 text-ink">
                  Built for three situations
                </p>
              </div>
              <ul className="flex flex-1 flex-wrap gap-3">
                {service.audience.map((item) => (
                  <li key={item}>
                    <Chip className="text-[14px]">{item}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ── 4. How it works ───────────────────────────────────────────── */}
      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Process"
              lines={['How this']}
              accent="actually runs"
            />
          </Reveal>

          <ol className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {service.steps.map((step, i) => (
              <Reveal key={step.title} as="li" index={i} className="h-full">
                <div className="u-tile flex h-full flex-col p-7">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-display text-ghost text-ink-ghost" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <Chip className="text-[12.5px]">{step.duration}</Chip>
                  </div>
                  <h3 className="mt-4 font-display text-h3 text-ink">{step.title}</h3>
                  <p className="mt-2.5 text-[14.5px] leading-[1.6] text-ink-body">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ── 5. Deliverables + 6. Documents ────────────────────────────── */}
      <Section band>
        <Container>
          {/*
            The column count follows the CONTENT, not the section.
            Eleven of the eighteen services have no documents requirement, and
            a fixed two-column grid left the right half of the band visibly
            empty on all of them — which reads as a card that failed to render
            rather than as a deliberate single-column layout.
          */}
          <div
            className={cx(
              'grid grid-cols-1 gap-10 lg:gap-14',
              service.documents.length > 0 ? 'lg:grid-cols-2' : 'mx-auto max-w-3xl',
            )}
          >
            <Reveal>
              <div className="u-tile h-full p-8">
                <Eyebrow>Deliverables</Eyebrow>
                <h2 className="mt-3 font-display text-h3 text-ink">What you end up holding</h2>
                <Rule className="mt-5" />
                <ul className="mt-6 flex flex-col gap-3.5">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Icon
                        name="check"
                        size={16}
                        className="mt-1 flex-none text-blue-600"
                      />
                      <span className="text-[15px] leading-[1.6] text-ink-body">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Compliance services only. Omitted entirely rather than shown
                empty for services with no paperwork requirement. */}
            {service.documents.length > 0 && (
              <Reveal index={1}>
                <div className="u-tile h-full p-8">
                  <Eyebrow>What we need from you</Eyebrow>
                  <h2 className="mt-3 font-display text-h3 text-ink">Documents required</h2>
                  <Rule className="mt-5" />
                  <ul className="mt-6 flex flex-col gap-3.5">
                    {service.documents.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Icon
                          name="document"
                          size={16}
                          className="mt-1 flex-none text-ink-body"
                        />
                        <span className="text-[15px] leading-[1.6] text-ink-body">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 border-t border-line pt-5 text-[13.5px] text-ink-body">
                    Missing something? Tell us anyway. We can usually work around a gap,
                    and it is better to know before we start.
                  </p>
                </div>
              </Reveal>
            )}
          </div>
        </Container>
      </Section>

      {/* ── 7. Turnaround ─────────────────────────────────────────────── */}
      {/* Was "Timeline & pricing": a two-column block, turnaround beside a
          "Starting from" figure. The pricing half is gone sitewide, so this is
          turnaround and the CTA. Kept as its own band rather than folded into
          the hero — it is the last thing before the FAQ and it is what carries
          the CTA at the bottom of a long page. */}
      <Section tight>
        <Container>
          <Reveal>
            <div className="u-tile flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
              <div>
                <Eyebrow>Turnaround</Eyebrow>
                <p className="mt-2 font-display text-h3 text-ink">{service.turnaround}</p>
              </div>

              <div className="flex flex-col items-start gap-3 lg:items-end">
                <Button href={`/contact?service=${service.slug}`}>Talk to us about it</Button>
                <p className="text-[13px] text-ink-body">
                  Scope and dates confirmed in writing before anything starts.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ── 8. FAQ ────────────────────────────────────────────────────── */}
      <Section band>
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-32">
                <SectionHeading eyebrow="Questions" lines={['About']} accent={service.title} />
              </div>
            </Reveal>
            <FaqAccordion faqs={service.faqs} />
          </div>
        </Container>
      </Section>

      {/* ── 9. Related services ───────────────────────────────────────── */}
      <Section tight>
        <Container>
          <Reveal>
            <h2 className="font-display text-h3 text-ink">Often taken alongside</h2>
          </Reveal>
          <ul className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-3">
            {related.map((item, i) => {
              const itemPillar = PILLAR_BY_SLUG[item.pillar];
              return (
                <Reveal key={item.slug} as="li" index={i} className="h-full">
                  <Link
                    href={serviceHref(item)}
                    className="u-tile u-tile-interactive group flex h-full flex-col p-6"
                  >
                    <Eyebrow as="span">{itemPillar.shortTitle}</Eyebrow>
                    <h3 className="mt-3 font-display text-[17px] font-bold text-ink transition-colors group-hover:text-blue-600">
                      {item.title}
                    </h3>
                    <p className="mt-2 flex-1 text-[14px] leading-[1.55] text-ink-body">
                      {item.oneLiner}
                    </p>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </Section>

      <CtaBand
        // Not `.toLowerCase()` — that mangled proper nouns and acronyms into
        // "agentic ai development" and "shopify store development". The
        // sentence is shaped so the title keeps its own casing.
        title={`Ready to get started with ${service.title}?`}
        body="Send us the details and you will have a scope and a date within one working day."
        primaryLabel="Start a project"
        service={service.slug}
      />
    </main>
  );
}
