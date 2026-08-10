import { Container, Section, SectionHeading, Lead, ChessArt } from '@/components/primitives';
import { Eyebrow } from '@/components/primitives';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Marquee } from '@/components/ui/Marquee';
import { CASE_STUDIES, CASES_ENABLED } from '@/content/cases';
import { CLIENT_LOGOS, LOGOS_ENABLED } from '@/content/proof';
import { PILLAR_BY_SLUG } from '@/content/pillars';

/**
 * "Results that speak for themselves." — mockup 4.
 *
 * Renders NOTHING while CASES_ENABLED is false, and that is the intended
 * launch state. Invented case studies with invented metrics are the easiest
 * claim for a prospect to check and the hardest to recover from, and a new
 * agency has no need to fake them — the service pages and the commitments
 * section already carry the argument.
 *
 * The component is complete, so publishing real work is a matter of filling
 * content/cases.ts and flipping one flag.
 */
export function Results() {
  if (!CASES_ENABLED || CASE_STUDIES.length === 0) return null;

  return (
    <Section id="results">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Our work"
              lines={['Results that', 'speak for']}
              accent="themselves"
            />
            <Lead className="mt-7">
              Every number below is one we can evidence. Ask us for the working.
            </Lead>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/work">View all projects</Button>
            </div>
          </Reveal>

          <ChessArt
            name="victory"
            sizes="(max-width: 1024px) 90vw, 50vw"
            className="mx-auto max-w-[560px]"
          />
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {CASE_STUDIES.map((study, i) => (
            <Reveal key={study.slug} as="li" index={i} className="h-full">
              <article className="u-tile u-tile-interactive flex h-full flex-col p-7">
                <Eyebrow as="span">{PILLAR_BY_SLUG[study.pillar].title}</Eyebrow>
                <h3 className="mt-3 font-display text-h3 text-ink">{study.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-[1.6] text-ink-body">
                  {study.summary}
                </p>

                <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5">
                  {study.metrics.map((metric) => (
                    <div key={metric.label}>
                      <dd className="font-display text-[26px] font-extrabold tabular text-blue-600">
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
  );
}

/**
 * The "trusted by" logo strip. Also disabled until real clients exist.
 * Pure CSS marquee — no JavaScript.
 */
export function LogoWall() {
  if (!LOGOS_ENABLED || CLIENT_LOGOS.length === 0) return null;

  return (
    <Section tight>
      <Container>
        <div className="u-tile flex flex-col items-center gap-6 overflow-hidden py-8 lg:flex-row lg:gap-10 lg:px-10">
          <p className="flex-none border-blue-600 px-4 text-center font-display text-[13px] font-bold uppercase leading-tight tracking-[0.14em] text-ink lg:border-l-2 lg:text-left">
            Trusted by
            <br />
            forward-thinking
            <br />
            brands
          </p>

          <Marquee duration={45} className="min-w-0 flex-1">
            {CLIENT_LOGOS.map((logo) => (
              <span
                key={logo.name}
                className="px-8 font-display text-[19px] font-bold tracking-[-0.01em] text-ink-body"
              >
                {logo.name}
              </span>
            ))}
          </Marquee>
        </div>
      </Container>
    </Section>
  );
}
