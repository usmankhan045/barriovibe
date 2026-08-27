'use client';

import { useState } from 'react';
import { Icon } from '@/components/icons';
import { cx } from '@/lib/cx';
import type { ProcessStep } from '@/content/differentiators';
import type { IconName } from '@/content/types';

/**
 * The phone-only ring: four steps as nodes on a circle instead of the
 * scattered canvas, on the client's reference (a circular selector with a
 * dashed connecting path and a detail panel below it) built in the site's
 * own material — white tile, brand blue, no second palette.
 *
 * `StepCard` in PinnedSteps.tsx is untouched and still what the desktop
 * canvas renders; this is a second view of the same four fields (number,
 * title, description, tag), not a reskin of one shared component.
 *
 * Client-only because the reference's interaction is real: tapping OR
 * hovering a node swaps which step's detail shows below, rather than every
 * step being permanently visible. Hover is what the reference actually does
 * — the ring reacts as the pointer arrives, not only on click — so a mouse
 * gets that immediately and a touch gets the same result on tap, since a tap
 * fires both. `PinnedSteps` itself stays a Server Component; this is the one
 * piece of it that has to run on the client.
 *
 * Content has no per-step icon (`ProcessStep` in content/differentiators.ts
 * only carries number/title/description/tag), so the four here are chosen
 * in this file, by what each step actually is, not invented content.
 */
const STEP_ICONS: IconName[] = ['compass', 'document', 'workflow', 'chart'];

/**
 * Four nodes, evenly spaced at the top/right/bottom/left of the ring —
 * the four-point equivalent of the reference's five-point pentagon. Percent
 * positions of the square frame, paired with a `-translate-1/2` on the node
 * itself so the number given is the node's CENTRE, which is also where the
 * ring's own radius places it (see the `<circle>` below, same frame).
 */
const RING_POSITIONS = [
  { top: '0%', left: '50%' },
  { top: '50%', left: '100%' },
  { top: '100%', left: '50%' },
  { top: '50%', left: '0%' },
] as const;

export function MobileStepRing({ steps, label }: { steps: ProcessStep[]; label: string }) {
  const [active, setActive] = useState(0);
  const step = steps[active] ?? steps[0]!;

  return (
    <div role="list" aria-label={label}>
      <div className="relative mx-auto aspect-square w-full max-w-[272px]">
        {/* The ring itself. A `<circle>` rather than an open path, so the
            `u-flow-dash` loop (borrowed from the desktop canvas's own
            connecting line) is seamless with no dash pattern to match to
            the path length: a closed loop has no seam to hide. */}
        <svg
          viewBox="0 0 272 272"
          className="absolute inset-0 size-full text-blue-200"
          aria-hidden="true"
        >
          <circle
            cx="136"
            cy="136"
            r="112"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="8 6"
            className="u-flow-path"
          />
        </svg>

        {/* The centre mark, in the ring's own middle — the client's "ONE
            ECOSYSTEM", reworded for a process rather than a product suite. */}
        <div className="absolute inset-0 grid place-items-center px-14 text-center">
          <span className="font-display text-[11px] font-bold uppercase leading-tight tracking-[0.14em] text-ink-body">
            How we
            <br />
            <span className="text-blue-600">work</span>
          </span>
        </div>

        {steps.map((s, i) => {
          const position = RING_POSITIONS[i % RING_POSITIONS.length]!;
          const isActive = i === active;
          return (
            <button
              key={s.number}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              style={{
                top: position.top,
                left: position.left,
                // The active node is painted with the SAME recipe as the
                // "Start a project" button, `--grad-blue` — a glossy 3D
                // surface, not a flat fill. The button itself paints this
                // via a border-image PNG sliced for a pill; a circle has no
                // slices to speak of, so the gradient goes straight on as a
                // background instead. Cleared (not just left unset) when
                // inactive, so the 300ms colour transition below has an
                // actual background-color to animate to rather than fighting
                // a leftover background-image.
                backgroundImage: isActive ? 'var(--grad-blue)' : 'none',
              }}
              aria-pressed={isActive}
              aria-label={`${s.number} ${s.title}`}
              className={cx(
                'u-tap absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition-[background-color,color,box-shadow,width,height,transform] duration-300',
                isActive
                  ? 'size-16 scale-100 text-white shadow-btn-blue'
                  : 'size-12 scale-100 border border-line bg-surface text-blue-600 hover:scale-110 hover:border-blue-200',
              )}
            >
              <Icon name={STEP_ICONS[i % STEP_ICONS.length]!} size={isActive ? 22 : 18} />
            </button>
          );
        })}
      </div>

      {/* The detail panel. `key={step.number}` so <Reveal>-style re-mounts
          are not needed: a fresh key on tap is enough for the fade below to
          restart, without a client-side animation library for one crossfade. */}
      <div key={step.number} className="u-tile mt-10 animate-[u-step-fade_0.3s_ease-out] p-7 text-center">
        <span className="font-display text-[11px] font-bold uppercase tracking-[0.14em] text-blue-600">
          {step.number} · {step.title}
        </span>
        <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-body">{step.description}</p>
        <span className="mt-4 inline-flex w-fit items-center rounded-pill border border-line bg-band px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-ink-strong">
          {step.tag}
        </span>
      </div>
    </div>
  );
}
