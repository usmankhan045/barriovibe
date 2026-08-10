import Image from 'next/image';
import type { CSSProperties } from 'react';
import { cx } from '@/lib/cx';
import { STEP_ART } from '@/lib/art';
import { Reveal } from './Reveal';
import { PointerTilt } from './PointerTilt';
import type { TimelineProps } from './contracts';

/**
 * SLOT — the alternating timeline. See ./README.md.
 *
 * ── Provenance ──
 *
 * Adapted from `3d-interactive-timeline` on 21st.dev. The shape is kept: a
 * centre rail, numbered nodes sitting on it, cards alternating left and right,
 * each card a photograph over a title whose description opens on interaction.
 *
 * Almost none of the original code survived, and the reasons are worth having
 * written down:
 *
 *   • IT DOES NOT RENDER AS WRITTEN. `useInView` and `useAnimation` are called
 *     inside `events.map()` — hooks in a loop. It only appears to work because
 *     the array length never changes, and `eslint-config-next` fails the build
 *     on it. Any port has to move the per-item hooks into a per-item
 *     component; here that turned out to be moot, because there are no hooks
 *     left to move.
 *   • Entrance animation is <Reveal>, the site's own. One shared
 *     IntersectionObserver already watches all 68 revealed elements on this
 *     page; `react-intersection-observer` would have added a second observer
 *     per card to do the same job.
 *   • Everything else the original animates — the node, the hover lift, the
 *     image push-in, the description opening, the progress bar — is CSS here,
 *     so `framer-motion` is not imported and this file is a Server Component.
 *     The four photographs and all the copy are server-rendered; the client
 *     gets <PointerTilt>, which is one listener.
 *   • The eight `filter: blur(8px)` spheres on `repeat: Infinity` are gone.
 *     They are a dark-theme neon effect with nothing to do on a light band,
 *     and eight permanently-animating blurred layers is the exact cost this
 *     codebase stripped `backdrop-filter` out of its cards to avoid.
 *   • `bg-slate-900`, `bg-indigo-600`, `border-slate-700` are re-keyed to the
 *     site's tokens. `bg-${event.color}-500` is dropped outright: it is an
 *     interpolated Tailwind class, which the compiler cannot see and therefore
 *     never emits — those cards were rendering with no colour at all.
 *
 * ── Depth, honestly ──
 *
 * The tilt is ±3.5°, off a shared pointer position, applied per card with the
 * sign flipped by side so the two columns lean toward the pointer rather than
 * in parallel. It is small on purpose: this is a page about filing deadlines,
 * and a card that swings is a card nobody trusts.
 */
export function Timeline({ steps, label, className }: TimelineProps) {
  return (
    <PointerTilt>
      {/* The rail is drawn by each item's own ::before rather than by an
          element here, so the last step draws none and the line ends exactly
          at the last node. See `.u-timeline__item::before` in globals.css. */}
      <ol className={cx('u-timeline', className)} aria-label={label}>
        {steps.map((step, i) => {
          const art = STEP_ART[step.art];

          return (
            <Reveal
              key={step.number}
              as="li"
              index={i}
              // Parity decides which side the card sits on and which way it
              // leans. This has to travel as a CLASS: <Reveal> takes exactly
              // four props and does not spread the rest, so a `data-side`
              // attribute passed here is silently dropped and every card lands
              // in column one. Widening Reveal's contract to carry it would
              // mean changing a slot the client is replacing, for the sake of
              // one modifier.
              className={cx(
                'u-timeline__item',
                i % 2 === 0 ? 'u-timeline__item--start' : 'u-timeline__item--end',
              )}
            >
              <span className="u-timeline__node" aria-hidden="true">
                {step.number}
              </span>

              <article
                className="u-timeline__card"
                style={{ '--card-i': i } as CSSProperties}
                /*
                 * Same exception, same reason as the deck: below `lg` every
                 * description is visible and this does nothing, but on a
                 * pointer device the description is behind a hover and a
                 * keyboard user would have no way to reach four paragraphs of
                 * it. Focus does exactly what hover does.
                 */
                tabIndex={0}
              >
                <div className="u-timeline__media">
                  <Image
                    src={art.src}
                    alt={art.alt}
                    // Static import, so intrinsic size and the blur
                    // placeholder come for free — no aspect box to maintain by
                    // hand and no flash of empty card on load.
                    placeholder="blur"
                    // Tracks the card's own width rule: full width of a
                    // single-column card below `lg`, then half the container
                    // until that exceeds the 26rem cap. A `sizes` that
                    // over-states the slot makes the optimizer serve a larger
                    // file than any display can use.
                    sizes="(max-width: 1024px) 92vw, (max-width: 1200px) 42vw, 26rem"
                    className="u-timeline__img"
                  />
                  <span className="u-timeline__tag">{step.tag}</span>
                </div>

                <div className="u-timeline__body">
                  <h3 className="font-display text-h3 text-ink">{step.title}</h3>

                  {/* Opens on hover or focus. `grid-template-rows: 0fr → 1fr`
                      animates a real auto height, so nothing here depends on
                      guessing a max-height that a longer sentence would then
                      clip. */}
                  <div className="u-timeline__detail">
                    {/* The inner div is the thing that gets clipped, and it
                        exists so the paragraph's spacing can live INSIDE it.
                        Put that spacing on the clipped element itself and the
                        row never reaches zero — see `.u-timeline__copy`. */}
                    <div className="u-timeline__detail-inner">
                      <p className="u-timeline__copy">{step.description}</p>
                    </div>
                  </div>
                </div>

                <span className="u-timeline__progress" aria-hidden="true" />
              </article>
            </Reveal>
          );
        })}
      </ol>
    </PointerTilt>
  );
}
