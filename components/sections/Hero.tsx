import { Container, Eyebrow, Rule, ChessArt, IconWatermark } from '@/components/primitives';
import { Button } from '@/components/ui/Button';
import { HERO_SUBHEAD } from '@/content/site';
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
  /* `pt-8` below md, down from `pt-14`.
   *
   * The 72px sticky header already sits above this in the flow, so 56px of
   * section padding put the eyebrow 128px down a 660px screen: a fifth of the
   * viewport spent on nothing, at the one point in the page where the visitor
   * has not yet been given a reason to scroll. Desktop keeps its `md:pt-20`,
   * where the same padding is a much smaller share of a taller viewport and the
   * hero has an art column to balance against.
   *
   * `pb-32` stays as it is. The StatBar is pulled up into it by `-mt-20`, so
   * this padding is what sets the gap between the art and that bar, and
   * trimming it closes a gap rather than removing empty space.
   */
  return (
    <section className="relative overflow-hidden pb-32 pt-8 md:pt-20 lg:pb-40">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.22fr_0.78fr] lg:gap-10">
          {/* ── Copy ──────────────────────────────────────────────────── */}
          <div className="relative z-10">
            {/* Non-breaking spaces before each separator. With ordinary
                spaces the line broke as "SOFTWARE · AI · FINANCE · COMPLIANCE" /
                "· GROWTH", orphaning a bullet onto line two. */}
            <Eyebrow>{'Software\u00A0· AI\u00A0· Finance\u00A0· Compliance\u00A0· Growth'}</Eyebrow>

            {/*
              ONE SENTENCE ACROSS THREE LINES, last line in brand blue. That
              colour break is the mockups' signature and it stays.

              What changed is what the sentence says. It used to be three past
              participles, one per discipline: "Books balanced. / Growth
              engineered. / Software shipped." Read aloud, three clipped
              fragments in a row are a slogan rather than a statement, and the
              client's verdict was that they read as showing off. They also
              made the reader assemble the actual claim themselves, since
              nothing in them said the three came from the same firm.

              This says the claim outright. The eyebrow above already lists the
              disciplines and the subhead below carries the detail, so the
              headline's only job is the argument that makes the list worth
              anything: one firm, all of it.

              LINE LENGTH IS A HARD CONSTRAINT, not a preference. At the
              display size this column fits roughly 18 characters per line;
              anything longer wraps mid-phrase and collapses the three-line
              block the whole composition is built on. These are 12 / 15 / 17.
              Count the characters before changing this copy.
            */}
            <h1 className="mt-6 text-display">
              <span className="block">One firm for</span>
              <span className="block">everything your</span>
              <span className="block text-blue-600">
                business runs on<span aria-hidden="true">.</span>
              </span>
            </h1>

            <Rule className="mt-8" />

            <p className="mt-7 max-w-[52ch] text-body-lg text-ink-body">{HERO_SUBHEAD}</p>

            {/* FULL WIDTH ON A PHONE, SHRINK-TO-FIT FROM sm.
                `flex-wrap` alone put these on two rows below sm, because there
                is not 370px of room for a 170px and a 200px pill side by side.
                A wrapped row of shrink-to-fit buttons is two different widths
                stacked on the left margin with two different amounts of space
                to their right. Nothing is broken about it and nothing is chosen
                about it either; it is the layout the widths of two unrelated
                labels happened to produce.

                Stacked and full width, the pair reads as a decision: one edge
                down the left, one down the right, and the primary action is the
                full measure of the column rather than 47% of it. It is also the
                shape a phone asks for on its own terms, which is a target under
                the thumb rather than a target the thumb has to find.

                `sm:w-auto` puts the labels back in charge the moment there is
                room for both on one line, so nothing changes at any width the
                original was already right at. */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="/contact" size="lg" className="w-full sm:w-auto">
                Start a project
              </Button>
              <Button href="/services" variant="chrome" size="lg" className="w-full sm:w-auto">
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
