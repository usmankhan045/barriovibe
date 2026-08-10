import Link from 'next/link';
import {
  Container,
  Section,
  SectionHeading,
  Lead,
  DotList,
  IconWatermark,
} from '@/components/primitives';
import { Icon } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { IconBadge } from '@/components/ui/IconBadge';
import { Reveal } from '@/components/ui/Reveal';
import { Coverflow } from '@/components/ui/Coverflow';
import { PILLARS } from '@/content/pillars';
import { pillarHref } from '@/content/services';

/**
 * "One agency. Five disciplines." — mockup 2, re-staged as a coverflow rake.
 *
 * ── What changed and why the section is dark ──
 *
 * This was five numbered rows stacked vertically on the canvas. The rows are
 * now cards on a rake: the centred one is un-rotated, full size and showing its
 * blurb, and the four others are tilted away from it at decreasing scale.
 * Hovering a side card brings it to the centre, so there is one focal card at
 * any moment rather than five equal ones.
 *
 * The band behind them is dark, and that is a structural requirement rather
 * than a mood. The cards are made of `.u-glass`, and the box at the top of that
 * class in globals.css is unambiguous about the condition that material comes
 * with: glass is only worth anything where there is something behind it to
 * bend. The previous glass cards on this site were reverted precisely because
 * a near-white canvas gave them nothing. These have a dark gradient with a
 * hotspot, the icon watermark, and each other — see `.u-glass--card`.
 *
 * ── The one placement rule ──
 *
 * The carousel is NOT inside a `<Reveal>`, and must not be moved into one.
 * `[data-reveal]` sets `filter` unconditionally, a filter forms a backdrop
 * root, and a backdrop root between the stage and the cards means the cards
 * sample an empty box and render as flat rectangles. The heading is revealed;
 * the stage and the cards are one unbroken stacking context. The same note is
 * on `.u-stage` in globals.css.
 */
export function Disciplines() {
  return (
    <Section id="disciplines" tight className="u-stage">
      {/* The refraction substrate. Behind everything, and aria-hidden — it is
          geometry for the lenses to bend, not a graphic to be read. */}
      <IconWatermark className="u-stage-field" />

      <Container>
        {/*
          Centred, on the same axis as everything below it.

          This was a two-column split — headline left, lead right — which was
          the right shape when the column also carried the button. Once the
          button moved under the cards the lead was the only thing left in that
          column, and a single paragraph alone in the right half of a container
          has nothing to sit against: it reads as text that landed there rather
          than text that was placed. Bottom-aligning it to the headline's rule
          helped and did not fix it, because the problem was the column, not the
          alignment.

          So the section is now one axis all the way down — header, rake,
          action. That is also the only arrangement the carousel was ever going
          to agree with: the fan is symmetric about the centre, and a header
          weighted to one side pulls against it.

          The headline is two lines rather than three for the same reason. Split
          as "One agency. / Five / disciplines." the middle line is one short
          word, which is invisible when the block is left-aligned and reads as a
          stray when it is centred.
        */}
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            lines={['One agency.']}
            accent="Five disciplines"
            centred
          />
        </Reveal>

        {/* Its own reveal, one step behind the heading. The stagger is what
            makes the rule read as drawing INTO the copy rather than beside
            it — the heading lands, the rule strikes, the sentence follows. */}
        <Reveal index={1}>
          <Lead className="mx-auto text-center">
            Five teams under one contract. Whichever you start with, the others are
            already briefed on your business.
          </Lead>
        </Reveal>
      </Container>

      {/* Full width, outside the container — the rake needs the room, and the
          cards at the ends of it are meant to run past the gutter. */}
      <Coverflow
        className="mt-4 lg:mt-6"
        label="The five disciplines"
        slides={PILLARS.map((pillar) => ({
          id: pillar.slug,
          label: pillar.title,
          card: (
            <Link href={pillarHref(pillar.slug)} className="u-cf-card-body">
              <span className="flex items-center justify-between">
                <span
                  className="font-display text-ghost tabular text-ink-ghost-on-glass"
                  aria-hidden="true"
                >
                  {pillar.number}
                </span>
                <IconBadge icon={pillar.icon} variant={pillar.badge} size="md" />
              </span>

              {/* Rises as the card takes centre, so the copy settles into the
                  space the detail below is about to occupy rather than the
                  detail arriving under a block that never moved. */}
              <span className="u-cf-lede mt-auto block">
                <span className="block font-display text-h3 text-white">{pillar.title}</span>
                <DotList items={pillar.highlights} className="mt-2 text-white/80" />
              </span>

              {/* Legible only on the centred card, but in the DOM for every
                  card regardless. All five are real content — a screen reader
                  should get the blurb whichever card happens to be in the
                  middle when it reaches this list, and a crawler should see
                  the same five descriptions the rows used to carry. */}
              <span className="u-cf-detail mt-4 block border-t border-white/15 pt-4">
                <span className="line-clamp-4 block text-caption leading-relaxed text-white/80">
                  {pillar.blurb}
                </span>
                <span className="mt-3 flex items-center gap-2 text-caption font-medium text-white">
                  Explore
                  <Icon name="arrow-right" size={16} className="u-cf-arrow" />
                </span>
              </span>
            </Link>
          ),
        }))}
      />

      {/* The one action, under the thing it acts on. It follows the cards
          rather than sitting beside the headline because by the time it is
          useful the reader has been through the five disciplines — and centred,
          because the rake above it is symmetric and anything else would pull
          against that. */}
      <Container>
        <div className="mt-10 flex justify-center lg:mt-12">
          <Button href="/services">Explore services</Button>
        </div>
      </Container>
    </Section>
  );
}
