import { Container, Section, SectionHeading, Lead } from '@/components/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { PinnedSteps } from '@/components/ui/PinnedSteps';
import { PROCESS } from '@/content/differentiators';

/**
 * "How we work" — the four real steps, pinned rather than boxed in a row.
 * See components/ui/PinnedSteps.tsx for what this replaced and why.
 */

export function Process() {
  return (
    <Section id="process" band>
      <Container>
        {/*
          Centred, on the same axis as the rail below it — the same arrangement
          the disciplines section uses, and for the same reason it moved there.
          The split this replaces put the headline left and the lead alone in
          the right half, and a single paragraph with nothing to sit against
          reads as text that landed there rather than text that was placed.

          It matters more here than it did there: the pinned canvas below is
          itself centred in the container, so a header weighted to one side
          pulls against the one axis the whole section is built around.

          THE HEADLINE IS NOW TWO LINES, NOT THREE. Split as "Four steps. / No /
          surprises." the middle line is the single short word "No" — invisible
          while the block was left-aligned, a stray once it is centred. That is
          not a new observation: it is written on the disciplines heading, which
          hit exactly this with "One agency. / Five / disciplines." Same shape,
          same fix.
        */}
        <Reveal>
          <SectionHeading
            eyebrow="How we work"
            lines={['Four steps.']}
            accent="No surprises"
            centred
          />
        </Reveal>

        {/* Its own reveal, one step behind — the heading lands, the rule
            strikes, the sentence follows. Matches the disciplines header. */}
        <Reveal index={1}>
          <Lead className="mx-auto mt-7 text-center">
            You know the scope and the date before anything starts. Changes are agreed
            in writing, never assumed.
          </Lead>
        </Reveal>

        <PinnedSteps steps={PROCESS} label="How an engagement runs, in four steps" className="mt-16" />
      </Container>
    </Section>
  );
}
