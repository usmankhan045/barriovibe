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
import { ChessMark } from '@/components/icons/chess';
import { Reveal } from '@/components/ui/Reveal';
import { Coverflow } from '@/components/ui/Coverflow';
import { PILLAR_BY_SLUG } from '@/content/pillars';
import { PRACTICES } from '@/content/practices';
import { practiceHref, practiceServiceCount } from '@/content/services';

/**
 * "One agency. Three practices." — mockup 2, re-staged as a coverflow rake.
 *
 * ── Practices, not disciplines ──
 *
 * The rake used to carry the five disciplines. It carries the three practices
 * now, for two reasons. The disciplines grew to seven, which is more cards
 * than a rake can hold without the outer ones becoming decoration; and the
 * practices are the distinction a first-time visitor actually needs, which is
 * that this firm sells software, demand, and a regulated back office. The
 * disciplines are still named, on the dotted line inside each card, so nothing
 * is hidden by leading with the coarser cut.
 *
 * ── What changed and why the section is dark ──
 *
 * This was numbered rows stacked vertically on the canvas. The rows are now
 * cards on a rake: the centred one is un-rotated, full size and showing its
 * blurb, and the others are tilted away from it at decreasing scale. Hovering
 * a side card brings it to the centre, so there is one focal card at any
 * moment rather than several equal ones.
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
          as "One agency. / Three / practices." the middle line is one short
          word, which is invisible when the block is left-aligned and reads as a
          stray when it is centred.
        */}
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            lines={['One agency.']}
            accent="Three practices"
            centred
          />
        </Reveal>

        {/* Its own reveal, one step behind the heading. The stagger is what
            makes the rule read as drawing INTO the copy rather than beside
            it — the heading lands, the rule strikes, the sentence follows. */}
        <Reveal index={1}>
          <Lead className="mx-auto text-center">
            Seven disciplines under one contract. Whichever you start with, the others
            are already briefed on your business.
          </Lead>
        </Reveal>
      </Container>

      {/* Full width, outside the container — the rake needs the room, and the
          cards at the ends of it are meant to run past the gutter. */}
      <Coverflow
        className="mt-4 lg:mt-6"
        label="The three practices"
        slides={PRACTICES.map((practice) => ({
          id: practice.slug,
          label: practice.title,
          card: (
            /* The practice's own page, which carries every service under it.
               This used to link to the practice's lead discipline, which meant
               the card promised "6 services" and opened a page holding three.
               `practiceHref` falls back to the discipline for a practice that
               holds only one. See the note in content/practices.ts. */
            <Link href={practiceHref(practice.slug)} className="u-cf-card-body">
              {/* ── THE SLACK GOES ABOVE THE MARK, NOT UNDER IT ──────────────
                  `mt-auto` sits HERE, on the badge, and not on the lede below.
                  It is the same one line of flex slack either way; what changes
                  is where the card's spare ~110px ends up.

                  Under the badge, it fell between the mark and the title, and a
                  card is not a stack of parts that happen to be in one box: an
                  icon a third of a card away from the only words it could
                  possibly be labelling is an orphan. That gap was also the
                  single largest measure on the card, so the eye read it as the
                  composition — mark alone at the top, everything else crushed
                  into the bottom half.

                  Above it, every element is one block — mark, title,
                  disciplines, rule, blurb, action — anchored to the bottom
                  edge, and the spare height becomes one clear field above it.
                  That is the poster reading, and it is what the space was
                  always going to be; it was only ever a question of whether it
                  sat in the middle of the content or above it.

                  It also holds up in BOTH card states, which is the constraint
                  that decides this. `.u-cf-detail` never leaves the flow — it
                  fades, it does not collapse — so every card has the identical
                  box whether it is centred or not. On the four cards that are
                  not centred the detail is invisible, so what remains visible
                  is the mark, the title and the disciplines, and that group now
                  lands optically centred in the card instead of hanging off its
                  bottom. */}
              {/* Not an `IconBadge`. A chrome bubble holding a `</>`, a
                  megaphone and a shield is the same three symbols every agency
                  site carries, and it was also the brightest thing on a deep
                  blue card — so the loudest element was the least meaningful
                  one. The piece is drawn at 96px and left at a tenth of white:
                  it is a watermark the card is lit through, not an object sat
                  on top of it. `mark` in content/practices.ts says which piece
                  and why. Every other surface still uses the badge. */}
              <span className="u-cf-mark mt-auto flex items-center">
                <ChessMark piece={practice.mark} size={96} />
              </span>

              {/* Rises as the card takes centre, so the copy settles into the
                  space the detail below is about to occupy rather than the
                  detail arriving under a block that never moved.

                  The dotted line names the DISCIPLINES rather than a set of
                  keywords. It is the only place on the home page the second
                  level of the tree appears, and it is what keeps "Three
                  practices" from reading as though the offering shrank.

                  Except for a practice holding a single discipline, where the
                  line would be one word restating the title above it. Those
                  fall through to the discipline's own highlights, which is
                  what the card carried before practices existed and is the
                  same kind of information at the same weight. */}
              <span className="u-cf-lede mt-5 block">
                {/* `text-balance` because one of the three titles wraps and the
                    other two do not. "Performance Marketing & E-commerce" broke
                    as "Performance Marketing &" over "E-commerce", which strands
                    the ampersand at the end of a line — the one break a
                    two-line title must not take, because an ampersand reads as
                    a join and a line end reads as a stop. Balancing splits it
                    evenly instead and leaves the single-line titles alone. */}
                <span className="block text-balance font-display text-h3 text-white">
                  {practice.title}
                </span>
                <DotList
                  items={
                    practice.pillars.length > 1
                      ? practice.pillars.map((slug) => PILLAR_BY_SLUG[slug].shortTitle)
                      : PILLAR_BY_SLUG[practice.pillars[0]!].highlights
                  }
                  className="mt-2 text-balance text-white/80"
                />
              </span>

              {/* Legible only on the centred card, but in the DOM for every
                  card regardless. All three are real content — a screen reader
                  should get the blurb whichever card happens to be in the
                  middle when it reaches this list, and a crawler should see
                  the same three descriptions the rows used to carry. */}
              <span className="u-cf-detail mt-4 block border-t border-white/15 pt-4">
                {/* `text-pretty` for the rag. These blurbs run to four lines in
                    a 250px measure, and the greedy line breaker was ending one
                    line a word short of the edge and the next flush against it,
                    which on a card this size is the whole right margin moving.

                    Leading comes down from relaxed (1.625) to 1.5 to match the
                    dot list above it at 1.45. The two blocks are eight lines of
                    the same 14px caption separated by a rule, and set two
                    leadings apart they read as two settings that happen to sit
                    together rather than one column of type. Tighter also buys
                    back the room `line-clamp-4` needs, so the clamp stays a
                    guard rather than something the copy actually hits. */}
                {/* NO `block` HERE. `line-clamp` works by making the element a
                    `-webkit-box`, and `block` sets the same property, so the
                    two utilities were fighting and `block` won — the clamp was
                    dead. It went unnoticed on a desktop card, where the blurb
                    happens to run to exactly four lines on its own. In a phone
                    measure it runs to seven, and with nothing clamping them the
                    card hard-clipped the last three: the sentence ended at
                    "retrieval systems," and "8 services →" was gone from the
                    card altogether. Losing the call to action is the part that
                    matters. */}
                {/* FIVE lines below md, four from md up, and the extra line is
                    not slack: the phone card's text column is ~219px against
                    ~256px at the desktop maximum, so the same blurb wraps to one
                    more line there than here. At `line-clamp-4` on both, the
                    longest of the three practices reached the clamp on a phone
                    and lost its last few words.

                    Which defeats the point of the clamp. The note above calls it
                    a guard against a future edit to content/pillars.ts, and a
                    guard that the CURRENT copy already trips is not a guard, it
                    is silent truncation with an ellipsis on it. Five lines puts
                    the existing blurbs back inside it and leaves it doing the job
                    it was written for. `--cf-height`'s 1.42 aspect in globals.css
                    is what makes room for the fifth line; the two were measured
                    together. */}
                <span className="line-clamp-5 text-pretty text-caption leading-[1.5] text-white/80 md:line-clamp-4">
                  {practice.blurb}
                </span>
                <span className="mt-3 flex items-center gap-2 text-caption font-medium text-white">
                  {practiceServiceCount(practice.slug)} services
                  <Icon name="arrow-right" size={16} className="u-cf-arrow" />
                </span>
              </span>
            </Link>
          ),
        }))}
      />

      {/* The one action, under the thing it acts on. It follows the cards
          rather than sitting beside the headline because by the time it is
          useful the reader has been through the three practices — and centred,
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
