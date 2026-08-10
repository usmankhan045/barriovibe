import {
  Container,
  Section,
  SectionHeading,
  Lead,
  Eyebrow,
  Rule,
  Breadcrumb,
  ChessArt,
  IconWatermark,
} from '@/components/primitives';
import { IconBadge } from '@/components/ui/IconBadge';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { CtaBand } from '@/components/layout/CtaBand';
import { JsonLd, breadcrumbSchema, organizationSchema } from '@/lib/jsonld';
import { DIFFERENTIATORS, PROCESS } from '@/content/differentiators';
import { PILLARS } from '@/content/pillars';
import { SERVICE_COUNT, SERVICE_COUNT_WORD } from '@/content/services';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'About',
  description: `How we work: fixed scope, fixed dates, deadlines we own, and ${SERVICE_COUNT} services across software, AI, finance, compliance, growth and e-commerce under one accountable team.`,
  path: '/about',
});

const CRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
];

export default function AboutPage() {
  return (
    <main id="main" tabIndex={-1}>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={breadcrumbSchema(CRUMBS)} />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-16 pt-10 md:pt-14">
        <Container>
          <Breadcrumb items={CRUMBS} />

          <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative z-10">
              <SectionHeading
                level={1}
                eyebrow="About us"
                lines={['Five disciplines.', 'One']}
                accent="accountable team"
              />
              <Lead className="mt-7 max-w-[56ch]">
                Most businesses end up with an accountant who does not talk to the
                marketer, and a developer who does not talk to either. We put all three
                under one contract so nobody gets to point at somebody else.
              </Lead>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/contact" size="lg">
                  Work with us
                </Button>
                <Button href="/services" variant="chrome" size="lg">
                  See all {SERVICE_COUNT} services
                </Button>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <IconWatermark />
              <ChessArt name="victory" sizes="45vw" className="relative" />
            </div>
          </div>
        </Container>
      </section>

      {/* ── What we believe ───────────────────────────────────────────── */}
      <Section band>
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-32">
                <SectionHeading
                  eyebrow="How we operate"
                  lines={['Six things we', 'will not']}
                  accent="compromise on"
                />
              </div>
            </Reveal>

            <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {DIFFERENTIATORS.map((item, i) => (
                <Reveal key={item.title} as="li" index={i} className="h-full">
                  <div className="u-tile flex h-full flex-col p-7">
                    <IconBadge icon={item.icon} variant={item.badge} size="sm" />
                    <Rule className="mt-5 w-8" />
                    <h2 className="mt-4 font-display text-h3 text-ink">{item.title}</h2>
                    <p className="mt-2.5 text-[15px] leading-[1.6] text-ink-body">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ── Disciplines ───────────────────────────────────────────────── */}
      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What we cover"
              lines={['Five teams,', 'one']}
              accent="point of contact"
            />
            <Lead className="mt-7">
              You get one account lead. Behind them, the specialists who actually do the
              work, and they are in the same firm, not a subcontractor chain.
            </Lead>
          </Reveal>

          <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {PILLARS.map((pillar, i) => (
              <Reveal key={pillar.slug} as="li" index={i} className="h-full">
                <div className="u-tile flex h-full flex-col p-7">
                  <div className="flex items-center justify-between">
                    <IconBadge icon={pillar.icon} variant={pillar.badge} size="sm" />
                    <span
                      className="font-display text-ghost text-ink-ghost"
                      aria-hidden="true"
                    >
                      {pillar.number}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-h3 text-ink">{pillar.title}</h3>
                  <p className="mt-2.5 flex-1 text-[14.5px] leading-[1.6] text-ink-body">
                    {pillar.blurb}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── Process ───────────────────────────────────────────────────── */}
      <Section band tight>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="How an engagement runs"
              lines={['Four steps.', 'No']}
              accent="surprises"
            />
          </Reveal>

          <ol className="relative mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
            {/* Inset to the node centres. Spanning the full container ran the
                rail ~470px past the "04" circle with nothing to connect to.
                Nodes are 3rem wide and left-aligned in four equal columns, so
                the rail starts 1.5rem in and stops 1.5rem into the last one. */}
            <span
              aria-hidden="true"
              className="absolute left-6 right-[calc(25%-1.5rem)] top-6 hidden border-t-2 border-dashed border-blue-200 xl:block"
            />
            {PROCESS.map((step, i) => (
              <Reveal key={step.number} as="li" index={i} className="relative">
                <span className="relative z-10 grid size-12 place-items-center rounded-pill border border-line bg-surface font-display text-caption font-bold text-blue-600 shadow-tile">
                  {step.number}
                </span>
                <h3 className="mt-5 font-display text-h3 text-ink">{step.title}</h3>
                <p className="mt-2.5 max-w-[34ch] text-[15px] leading-[1.6] text-ink-body">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ── Honest note ───────────────────────────────────────────────── */}
      <Section tight>
        <Container>
          <Reveal>
            <div className="u-tile mx-auto max-w-3xl p-8 md:p-10">
              <Eyebrow>Straight talk</Eyebrow>
              <h2 className="mt-3 font-display text-h3 text-ink">
                We are new, and we are not going to pretend otherwise
              </h2>
              <div className="mt-5 flex flex-col gap-4 text-[15px] leading-[1.7] text-ink-body">
                <p>
                  You will not find invented client counts or borrowed logos on this site.
                  When we have work we can show and numbers we can evidence, they will go
                  up here, with the client&rsquo;s name on them.
                </p>
                <p>
                  Until then, judge us on what is checkable: the scope on every service
                  page is specific, the process is written down, and the commitments above
                  are ones you can hold us to from the first engagement. Ask us anything
                  and you will get a direct answer, including when the answer is that we
                  are not the right fit.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        title="Start with one service. Add the rest only if it earns it."
        body={`No minimum, no bundle, no lock-in. Tell us the problem and we will tell you which of the ${SERVICE_COUNT_WORD.toLowerCase()} applies.`}
        primaryLabel="Get in touch"
      />
    </main>
  );
}
