import { Container, Section, SectionHeading, Lead, IconWatermark } from '@/components/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { DisplayCards } from '@/components/ui/DisplayCards';
import { DIFFERENTIATORS } from '@/content/differentiators';

/**
 * "Why choose us" — the six commitments, dealt as a raked deck.
 *
 * ── The headline ──
 *
 * It used to read "We don't follow trends. We set standards." Both halves are
 * adjectives about ourselves, which is the exact thing the copy underneath
 * promises not to do — and "we set standards" is a claim no visitor can check,
 * from a firm with no case studies yet. The replacement points at the six
 * cards instead of at us: anyone can say it, we write it down.
 *
 * ── The layout ──
 *
 * Six equal tiles in a 3×2 grid have no focal point, and a composition without
 * one reads as a template — the same conclusion the bento block in globals.css
 * came to. The deck gives the section its subject: one object, raked, with the
 * strongest commitment on top and the other five legible at the claim.
 *
 * The chess formation render came out with the grid. Two full-height visuals
 * in one section is one too many, and the deck is now the thing worth looking
 * at; `formation` is still in rotation on /services and the pillar pages, so
 * nothing is orphaned. The icon watermark stays behind the deck for the same
 * faint texture the art used to sit on.
 *
 * `items-center` rather than `items-start`: the deck's mass sits high (the
 * rake falls away below it), so top-aligning it left the headline floating
 * against a stack that had already visually ended.
 */
export function WhyUs() {
  return (
    <Section id="why-us">
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Why choose us"
              lines={['Six commitments,', 'every one of them']}
              accent="checkable"
            />
            <Lead className="mt-7">
              Six commitments, each one you can hold us to. No adjectives, nothing that
              every other agency also claims.
            </Lead>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="/contact">Work with us</Button>
              <Button href="/about" variant="chrome">
                How we operate
              </Button>
            </div>
          </Reveal>

          <Reveal className="relative">
            <IconWatermark className="u-stage-field" />
            <DisplayCards cards={DIFFERENTIATORS} label="What we commit to" />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
