import { Container, Eyebrow, Rule, ChessArt, IconWatermark } from '@/components/primitives';
import { Button } from '@/components/ui/Button';
import { TAGLINE } from '@/content/site';
import { SERVICE_COUNT } from '@/content/services';

/**
 * Home hero.
 *
 * Nothing here is wrapped in <Reveal>. This is the LCP region — a hidden
 * start state waiting on an IntersectionObserver would directly delay the
 * largest paint. Everything below the fold animates; this does not.
 *
 * The headline follows the mockups' signature pattern: plain lines in ink,
 * final line in brand blue, ending in a period. It is written out here rather
 * than passed through <SectionHeading> because the hero needs the em-dash
 * break and a different max-width than the section version.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pb-32 pt-14 md:pt-20 lg:pb-40">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.22fr_0.78fr] lg:gap-10">
          {/* ── Copy ──────────────────────────────────────────────────── */}
          <div className="relative z-10">
            {/* Non-breaking spaces before each separator. With ordinary
                spaces the line broke as "SOFTWARE · AI · FINANCE · COMPLIANCE" /
                "· GROWTH", orphaning a bullet onto line two. */}
            <Eyebrow>{'Software\u00A0· AI\u00A0· Finance\u00A0· Compliance\u00A0· Growth'}</Eyebrow>

            {/*
              Three past participles, last line in brand blue — the mockups'
              exact headline rhythm.

              Each line names one of the five disciplines by its OUTCOME
              rather than its category: finance, growth, software. Compliance
              and commerce are carried by the eyebrow and the subhead, because
              a fourth line would break the three-line composition.

              Line lengths are 15 / 18 / 17 characters, which is deliberate —
              near-equal lengths give the block the solid left-aligned mass the
              mockups have, rather than a ragged edge.

              Line length is a hard constraint here, not a stylistic
              preference. At the display size the copy column fits roughly 18
              characters per line; anything longer wraps mid-phrase and breaks
              the three-line structure the whole composition depends on. Keep
              every line at or under 18 characters if this copy is changed.
            */}
            <h1 className="mt-6 text-display">
              <span className="block">Books balanced.</span>
              <span className="block">Growth engineered.</span>
              <span className="block text-blue-600">
                Software shipped<span aria-hidden="true">.</span>
              </span>
            </h1>

            <Rule className="mt-8" />

            <p className="mt-7 max-w-[52ch] text-body-lg text-ink-body">{TAGLINE}</p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/contact" size="lg">
                Start a project
              </Button>
              <Button href="/services" variant="chrome" size="lg">
                See all {SERVICE_COUNT} services
              </Button>
            </div>
          </div>

          {/* ── Art ───────────────────────────────────────────────────── */}
          <div className="relative">
            {/* Clipped to the art's own box so the rings never bleed into the
                headline column or push the page wider. */}
            <IconWatermark className="scale-110 overflow-hidden" />
            <ChessArt
              name="hero"
              priority
              sizes="(max-width: 1024px) 80vw, 42vw"
              className="relative mx-auto max-w-[540px]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
