import Link from 'next/link';
import {
  Container,
  Section,
  SectionHeading,
  Lead,
  Eyebrow,
  Breadcrumb,
  ChessArt,
} from '@/components/primitives';
import { Icon } from '@/components/icons';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { CtaBand } from '@/components/layout/CtaBand';
import { JsonLd, breadcrumbSchema } from '@/lib/jsonld';
import { CASE_STUDIES, CASES_ENABLED } from '@/content/cases';
import { PILLAR_BY_SLUG } from '@/content/pillars';
import { SERVICE_GROUPS, serviceHref } from '@/content/services';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Work',
  description:
    'Case studies and published results. We publish work only once a client has agreed and the numbers can be evidenced.',
  path: '/work',
});

const CRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
];

/**
 * The work page.
 *
 * With CASES_ENABLED false this renders an honest empty state rather than
 * padding the page with stock imagery or invented projects. It says plainly
 * why there is nothing here, states the standard we will publish to, and then
 * gives the visitor somewhere useful to go — which is more persuasive than a
 * fabricated portfolio and considerably safer.
 */
export default function WorkPage() {
  const hasCases = CASES_ENABLED && CASE_STUDIES.length > 0;

  return (
    <main id="main" tabIndex={-1}>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />

      <Section tight>
        <Container>
          <Breadcrumb items={CRUMBS} />

          <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <SectionHeading
                level={1}
                eyebrow="Our work"
                lines={['Results that', 'speak for']}
                accent="themselves"
              />
              <Lead className="mt-7 max-w-[54ch]">
                {hasCases
                  ? 'Every number below is one we can evidence. Ask us for the working and we will show you.'
                  : 'We publish a project only when the client has agreed to it and every number in it can be evidenced. That means this page is empty right now.'}
              </Lead>
            </div>

            <div className="hidden lg:block">
              <ChessArt name="victory" sizes="45vw" className="mx-auto max-w-[420px]" />
            </div>
          </div>
        </Container>
      </Section>

      {hasCases ? (
        <Section tight>
          <Container>
            <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {CASE_STUDIES.map((study, i) => (
                <Reveal key={study.slug} as="li" index={i} className="h-full">
                  <article className="u-tile flex h-full flex-col p-8">
                    <Eyebrow as="span">{PILLAR_BY_SLUG[study.pillar].title}</Eyebrow>
                    <h2 className="mt-3 font-display text-h3 text-ink">{study.title}</h2>
                    <p className="mt-1.5 text-caption text-ink-body">{study.client}</p>
                    <p className="mt-4 flex-1 text-[15px] leading-[1.65] text-ink-body">
                      {study.summary}
                    </p>
                    <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-line pt-6">
                      {study.metrics.map((metric) => (
                        <div key={metric.label}>
                          <dd className="font-display text-[28px] font-extrabold tabular text-blue-600">
                            {metric.value}
                          </dd>
                          <dt className="mt-1 text-[13px] text-ink-body">{metric.label}</dt>
                        </div>
                      ))}
                    </dl>
                  </article>
                </Reveal>
              ))}
            </ul>
          </Container>
        </Section>
      ) : (
        /* ── Honest empty state ─────────────────────────────────────── */
        <Section tight>
          <Container>
            <Reveal>
              <div className="u-tile mx-auto max-w-3xl p-8 md:p-12">
                <span className="u-badge u-badge--chrome grid size-14 place-items-center">
                  <Icon name="award" size={24} />
                </span>

                <h2 className="mt-6 font-display text-h3 text-ink">
                  Nothing published yet, deliberately
                </h2>

                <div className="mt-5 flex flex-col gap-4 text-[15px] leading-[1.7] text-ink-body">
                  <p>
                    It would take an afternoon to fill this page with plausible-looking
                    projects and impressive percentages. Plenty of agencies do. We would
                    rather you could trust everything else on this site.
                  </p>
                  <p>When work appears here, it will meet three conditions:</p>
                </div>

                <ul className="mt-6 flex flex-col gap-3.5">
                  {[
                    'The client has agreed by name, or agreed to be described anonymously.',
                    'Every figure can be evidenced from an account we actually ran.',
                    'The brief and the constraints are stated, not just the outcome.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Icon name="check" size={17} className="mt-0.5 flex-none text-blue-600" />
                      <span className="text-[15px] leading-[1.6] text-ink-strong">{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-7 border-t border-line pt-6 text-[15px] leading-[1.65] text-ink-body">
                  In the meantime, the service pages are the honest substitute: each one
                  states exactly what is included, what you receive, how long it takes and
                  what we need from you. That is checkable before you spend anything.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/services">Browse the services</Button>
                  <Button href="/contact" variant="chrome">
                    Ask for references
                  </Button>
                </div>
              </div>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* ── What we could do for you ──────────────────────────────────── */}
      <Section band>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="In the meantime"
              lines={['What we would', 'actually']}
              accent="do for you"
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {SERVICE_GROUPS.map(({ pillar, services }, i) => (
              <Reveal key={pillar.slug} index={i}>
                <div className="u-tile flex h-full flex-col p-7">
                  <Eyebrow>{pillar.number}</Eyebrow>
                  <h3 className="mt-2 font-display text-h3 text-ink">{pillar.title}</h3>
                  <ul className="mt-5 flex flex-1 flex-col gap-2">
                    {services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={serviceHref(service)}
                          className="group flex items-center justify-between gap-3 py-1 text-[14px] text-ink-body transition-colors hover:text-blue-600"
                        >
                          {service.title}
                          <Icon
                            name="arrow-right"
                            size={14}
                            className="flex-none text-transparent transition-colors group-hover:text-blue-600"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Be the first case study."
        body="Early clients get our full attention and a rate that reflects it. In exchange we would like to write it up, with your approval on every word."
        primaryLabel="Start a conversation"
      />
    </main>
  );
}
