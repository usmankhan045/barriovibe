import { Icon } from '@/components/icons';
import { Reveal } from './Reveal';
import { cx } from '@/lib/cx';
import type { ProcessStep } from '@/content/differentiators';

/**
 * SLOT — the "pinned to the plan" process trail.
 *
 * ── Provenance ──
 *
 * Adapted from a `how-it-works` component built around five sticky-note
 * cards scattered on a corkboard: a push-pin, a scattered/rotated layout, and
 * a hand-drawn dashed line connecting them, animated with `framer-motion`.
 * What survived the port is the idea — real steps, pinned rather than boxed
 * in a row, walked by a moving line — and almost nothing else:
 *
 *   • The three pastel themes (orange/blue/purple) are gone. This site has
 *     one brand colour, not a rotation of them — see the note on `badge` in
 *     content/pillars.ts, which made the same call for the discipline icons.
 *   • The card is `.u-tile`, the exact white surface every other resting
 *     card on the site is built from, not a bespoke shadow recipe.
 *   • The numeral is `font-display` (Satoshi), not Comic Sans / Chalkboard —
 *     this site has a type system and the numeral uses it like everything
 *     else does.
 *   • The pin is a small circular badge in brand blue, the same family as
 *     `.u-bento-icon` and `IconBadge`, not a loose decorative SVG floating
 *     above the card with its own drop shadow.
 *   • The dashed line is a CSS `stroke-dashoffset` loop — the same technique
 *     `.u-marquee-track` already uses — so the whole component stays a
 *     Server Component. `framer-motion` bought one infinite loop a plain
 *     `@keyframes` already does for free; see the note on `PointerTilt.tsx`
 *     for why that trade is made the same way everywhere on this site.
 *   • Four steps, not a generic N — content/differentiators.ts fixes the
 *     engagement at four, so the positions below are tuned for four rather
 *     than built as a formula that has to look right for any count.
 *
 * ── Why the canvas only appears at `lg` ──
 *
 * The scattered layout needs room for two ~280px columns plus the stagger
 * between them. Below `lg` that arithmetic gets tight against the
 * container's own padding, so the fallback below `lg` is a plain stacked
 * list — full width, no rotation, no path. That is also what a screen
 * reader gets: `role="list"` on the stack, the canvas hidden from it, so the
 * four steps are announced once, not twice.
 */

const ANCHOR_1 = { x: 200, y: 110 };
const ANCHOR_2 = { x: 700, y: 360 };
const ANCHOR_3 = { x: 190, y: 600 };
const ANCHOR_4 = { x: 690, y: 850 };

const POSITIONS = [
  { box: 'left-[6%] top-0 -rotate-2', anchor: ANCHOR_1 },
  { box: 'left-[56%] top-[250px] rotate-2', anchor: ANCHOR_2 },
  { box: 'left-[5%] top-[490px] -rotate-2', anchor: ANCHOR_3 },
  { box: 'left-[55%] top-[740px] rotate-2', anchor: ANCHOR_4 },
] as const;

const CANVAS_HEIGHT = 1010;

const PATH_D =
  `M ${ANCHOR_1.x} ${ANCHOR_1.y} ` +
  `C ${ANCHOR_1.x + 250} ${ANCHOR_1.y}, ${ANCHOR_2.x - 200} ${ANCHOR_2.y - 60}, ${ANCHOR_2.x} ${ANCHOR_2.y} ` +
  `C ${ANCHOR_2.x + 200} ${ANCHOR_2.y + 50}, ${ANCHOR_3.x + 260} ${ANCHOR_3.y - 100}, ${ANCHOR_3.x} ${ANCHOR_3.y} ` +
  `C ${ANCHOR_3.x - 210} ${ANCHOR_3.y + 60}, ${ANCHOR_4.x - 260} ${ANCHOR_4.y - 70}, ${ANCHOR_4.x} ${ANCHOR_4.y}`;

function PinBadge() {
  return (
    <span
      className="absolute -top-4 left-1/2 grid size-8 -translate-x-1/2 place-items-center rounded-full bg-blue-600 text-white shadow-[0_6px_14px_-2px_rgb(11_47_146_/_0.5)]"
      aria-hidden="true"
    >
      <Icon name="pin" size={15} />
    </span>
  );
}

function StepCard({ step }: { step: ProcessStep }) {
  return (
    <div className="u-tile relative flex h-full flex-col p-6 pt-8" role="listitem">
      <PinBadge />
      <span className="font-display text-[2rem] font-extrabold leading-none tabular text-blue-600">
        {step.number}
      </span>
      <h3 className="mt-3 font-display text-h3 text-ink">{step.title}</h3>
      <p className="mt-2 flex-1 text-[14.5px] leading-[1.55] text-ink-body">{step.description}</p>
      <span className="mt-4 inline-flex w-fit items-center rounded-pill border border-line bg-band px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-ink-strong">
        {step.tag}
      </span>
    </div>
  );
}

export function PinnedSteps({
  steps,
  label,
  className,
}: {
  steps: ProcessStep[];
  label: string;
  className?: string;
}) {
  return (
    <div className={cx('relative mx-auto w-full max-w-[1000px]', className)}>
      {/* Desktop: the scattered canvas. */}
      <div className="relative hidden lg:block" style={{ height: CANVAS_HEIGHT }} role="list" aria-label={label}>
        <svg
          className="absolute inset-0 h-full w-full text-blue-200"
          viewBox={`0 0 1000 ${CANVAS_HEIGHT}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d={PATH_D}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="u-flow-path"
          />
        </svg>

        {steps.map((step, i) => {
          const position = POSITIONS[i % POSITIONS.length] ?? POSITIONS[0];
          return (
            <Reveal key={step.number} index={i} className={cx('absolute w-[280px]', position.box)}>
              <StepCard step={step} />
            </Reveal>
          );
        })}
      </div>

      {/* Below `lg`: a plain stacked list. No canvas, no path, no rotation. */}
      <div className="flex flex-col gap-6 lg:hidden" role="list" aria-label={label}>
        {steps.map((step, i) => (
          <Reveal key={step.number} index={i}>
            <StepCard step={step} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
