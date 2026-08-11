'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { cx } from '@/lib/cx';

/**
 * A drop of the material travels across the cards under the pointer.
 *
 * ## What this replaces, and why the replacement is a different KIND of thing
 *
 * The first version of this component wrote the pointer position into `--u-px`
 * / `--u-py` and let `.u-glass::after` paint its glow there: a soft blue wash
 * that brightened wherever the pointer was. It was the seam globals.css had
 * left open for exactly that, and as a way to say "the light is on this card"
 * it worked.
 *
 * It is not what Apple's material does, though, and the difference is not a
 * matter of degree. A wash is LIGHT ON A SURFACE. Liquid Glass is an OBJECT: a
 * lens with a rim, a thickness and a weight, which travels, lags behind the
 * thing pulling it, and deforms while it travels. You cannot get there by
 * tuning a gradient, because a gradient has no edge to catch light on and no
 * mass to be late with.
 *
 * So the wash is gone from `.u-glass--white::after` and this drives a real
 * element instead: `.u-lens`, one per card, server-rendered and inert until a
 * pointer arrives. Two sections mount it, SoftwareShowcase and RevenueEngine,
 * one listener each. What the drop does, in the order you notice it:
 *
 *   IT LAGS      The drop is on a spring, not on the cursor. Pinning a
 *                decoration to the pointer's exact position is the thing that
 *                reads as artificial: there is no motion in it, only
 *                teleporting. The spring gives it somewhere to travel from, so
 *                it arrives slightly after you do and settles rather than stops.
 *   IT DEFORMS   Speed is read off the spring's own velocity and spent on
 *                squash and stretch along the direction of travel. A droplet
 *                pulled quickly is not a circle. This is the whole reason the
 *                spring integrates velocity explicitly rather than easing a
 *                position: the velocity IS the effect, not a by-product.
 *   IT LENSES    `.u-lens` carries a backdrop-filter, so what passes under it
 *                comes back saturated and a shade deeper. Over the mockup that
 *                is real magnification of real geometry, which is the one thing
 *                a painted highlight can never fake. See the note on `.u-lens`
 *                in globals.css for why this is the one place on the whole site
 *                that filter is worth its cost.
 *
 * ## The physics, and the numbers that set the feel
 *
 * A velocity-Verlet-ish integrator, one line each for x and y:
 *
 *     v = (v + (target - position) * STIFFNESS) * DAMPING
 *     position += v
 *
 * STIFFNESS is how hard the drop is pulled toward the pointer and DAMPING is
 * how much of its speed survives each frame. Solved rather than dialled in:
 * the pair gives roots of modulus 0.849 at 0.332 rad/frame, which is a 21%
 * overshoot and a first arrival about nine frames (~150ms) after the pointer
 * stops. That is the number that matters: the drop reads as ARRIVED at the
 * overshoot, and the ~400ms tail after it is the settle nobody watches.
 *
 * The band either side is narrow. Damping at 0.76 takes the overshoot to 28%
 * and the drop visibly bounces past the cursor, which reads as a toy; below
 * ~0.6 it lands dead and the whole point of the spring is gone. Stiffness
 * under ~0.1 reads as lag, which is indistinguishable from a dropped frame.
 *
 * GROWTH is the same lerp on the drop's size and opacity, and it is faster than
 * the follow on purpose: the drop should already be there by the time it has
 * finished catching up, so the entrance never competes with the travel.
 *
 * Frame-rate note: these are per-frame constants, so the spring is stiffer on a
 * 120Hz display than a 60Hz one. That is the trade the whole industry's UI
 * springs make, it is imperceptible at this settle time, and the alternative
 * (integrating against a real delta) buys a physically identical curve at the
 * cost of a clock read and a variable timestep per frame.
 *
 * ## Crossing between cards, which is the one part worth reading twice
 *
 * There is one drop per grid and one element per card it can be drawn by, and
 * the gap between those two facts is where the first version went wrong. It faded
 * the old card's drop out where it stood and grew a new one at the pointer, so
 * moving between two cards read as a dissolve and a pop: two objects, not one
 * object moving.
 *
 * The fix is that a drop is never told to stop chasing. Every live drop's
 * target is THE POINTER, expressed in its own card's coordinates, whether or
 * not the pointer is still over that card. So the old card's drop keeps
 * travelling toward you, runs off its own edge and is cut there by the well's
 * `overflow: hidden`, exactly as a real drop passing off the edge of a real
 * card would be. It is retired only once it is fully outside its own box, which
 * is a frame on which it was already invisible.
 *
 * The new card's drop is not born at the pointer either. It is seeded at the
 * SCREEN POSITION of the drop already in flight, converted into the new card's
 * coordinates, carrying that drop's velocity and its `amp`. So the two elements
 * are one object in flight, in lockstep, one clipped by the card it is leaving
 * and one by the card it is arriving at. The gutter between them shows nothing,
 * which is correct: the drop is behind the gap. No fade and no pop anywhere in
 * the crossing.
 *
 * That leaves `amp` (0 at rest, 1 fully out) doing one job only: birth and
 * death. It grows when the first drop of a hover is made and falls when the
 * pointer leaves the grid entirely, and a hand-off passes it across untouched.
 *
 * ## One listener, not six, and one write per frame
 *
 * The obvious implementation puts a handler on each card, which is a hydration
 * boundary around every one of them. This wraps the grid and finds the card
 * with `closest()`, so the cards and everything in them stay server-rendered
 * and the client bundle gains one listener per section.
 *
 * `pointermove` fires far faster than the screen refreshes, so the handler only
 * stores the event and the work happens in `requestAnimationFrame`. That is
 * also why `getBoundingClientRect` is called once per frame per live drop
 * rather than once per event: it flushes pending layout, and calling it per
 * event during a fast sweep is the forced-reflow trap RevealObserver documents
 * at length. There are one or two live drops, ever.
 *
 * Only `transform` and `opacity` are ever written, both composited, so the
 * whole thing runs off the main thread's paint path. The loop stops itself the
 * moment every drop is settled and idle, and starts again on the next move, so
 * a pointer resting on a card costs nothing.
 *
 * ## Two opt-outs, and both are load-bearing rather than polite
 *
 * A drop that answers the pointer is precisely the "motion triggered by user
 * interaction" Reduce Motion exists to switch off. Under it, nothing here runs
 * and no drop is ever made visible: the card keeps its lift, its rim and its
 * rule, which are the parts that carry meaning.
 *
 * A coarse pointer has no hover, so `pointermove` only ever fires mid-tap: the
 * drop would appear under a finger, follow the drag, and then sit there for
 * ever, because nothing on a touchscreen ever leaves.
 */
export function LiquidLens({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  /**
   * The element the listener sits on. `ul` because RevenueEngine's rail is a
   * list of five and wrapping it in a div to hang one `pointermove` off would
   * either take the list semantics away or add a box between the grid and its
   * own items. Nothing in here reads the tag: it is a listener host and a
   * `closest()` boundary, and both work the same on either.
   */
  as?: 'div' | 'ul';
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const field = ref.current;
    if (!field) return;

    const still = window.matchMedia(
      '(prefers-reduced-motion: reduce), (hover: none), (pointer: coarse)',
    );
    if (still.matches) return;

    const STIFFNESS = 0.16;
    const DAMPING = 0.72;
    const GROWTH = 0.22;

    /** Speed, in px/frame, at which the drop is fully stretched. */
    const FULL_SPEED = 34;
    /** How much of its own width it gains along the direction of travel. */
    const STRETCH = 0.18;
    /** The size it grows in from. Never zero: see the note below. */
    const SEED = 0.64;

    type Bead = {
      card: HTMLElement;
      el: HTMLElement;
      /** Half the drop's own width, which is the exit test's whole content. */
      radius: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      /** The card's last known origin, so a hand-off can map screen to local. */
      left: number;
      top: number;
      /** 0 gone, 1 fully out. Birth and death only: see the note above. */
      amp: number;
      want: 0 | 1;
    };

    const beads = new Map<HTMLElement, Bead>();
    let frame = 0;
    let latest: PointerEvent | null = null;
    // Both held between frames rather than re-derived from the newest event.
    // The loop keeps running while a drop catches up, and on those frames there
    // is no event to read: either one recomputed per frame would come back null
    // and strand a drop the pointer is still driving.
    let pointer: { x: number; y: number } | null = null;
    let hovered: HTMLElement | null = null;

    const retire = (bead: Bead) => {
      bead.el.style.removeProperty('transform');
      bead.el.style.removeProperty('opacity');
      bead.card.removeAttribute('data-lit');
      beads.delete(bead.card);
    };

    const step = () => {
      frame = 0;

      // The pointer is resolved first, so the target every drop chases this
      // frame is the newest one there is.
      const event = latest;
      latest = null;

      if (event) {
        pointer = { x: event.clientX, y: event.clientY };
        // Null in the gutters between cards, which is correct: the grid's own
        // gap is not a card, and nothing new should be born there.
        hovered =
          (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-glass]') ?? null;

        if (hovered && !beads.has(hovered)) {
          const el = hovered.querySelector<HTMLElement>('.u-lens');
          if (el) {
            const box = hovered.getBoundingClientRect();
            // The drop already in flight, if there is one. Insertion order, so
            // the last entry is the most recent: on a fast sweep across three
            // cards it is the one whose motion should carry on.
            const flying = Array.from(beads.values()).pop();

            beads.set(hovered, {
              card: hovered,
              el,
              // Read once, at birth, next to a layout read this frame has
              // already paid for. It keeps the exit test honest if the size in
              // globals.css ever changes without this file being touched.
              radius: el.offsetWidth / 2,
              // Seeded at the pointer for a first hover, and at the flying
              // drop's own screen position for a hand-off. Never at the card's
              // edge or its centre: a drop that arrives from somewhere else
              // says the card was already lit and you interrupted it.
              x: flying ? flying.x + flying.left - box.left : event.clientX - box.left,
              y: flying ? flying.y + flying.top - box.top : event.clientY - box.top,
              vx: flying ? flying.vx : 0,
              vy: flying ? flying.vy : 0,
              left: box.left,
              top: box.top,
              amp: flying ? flying.amp : 0,
              want: 1,
            });
            hovered.setAttribute('data-lit', '');
          }
        }
      }

      let moving = false;

      for (const bead of beads.values()) {
        const box = bead.card.getBoundingClientRect();
        bead.left = box.left;
        bead.top = box.top;

        // Every live drop chases the pointer, including the one on a card that
        // has been left. That is the crossing, and the note above is why.
        if (pointer) {
          bead.vx = (bead.vx + (pointer.x - box.left - bead.x) * STIFFNESS) * DAMPING;
          bead.vy = (bead.vy + (pointer.y - box.top - bead.y) * STIFFNESS) * DAMPING;
        } else {
          bead.vx *= DAMPING;
          bead.vy *= DAMPING;
        }
        bead.x += bead.vx;
        bead.y += bead.vy;
        bead.amp += (bead.want - bead.amp) * GROWTH;

        // Off its own card, and so already invisible: the well clipped it some
        // frames ago. Only ever true of a card the pointer has left.
        if (
          bead.card !== hovered &&
          (bead.x < -bead.radius ||
            bead.y < -bead.radius ||
            bead.x > box.width + bead.radius ||
            bead.y > box.height + bead.radius)
        ) {
          retire(bead);
          continue;
        }

        const settled =
          Math.abs(bead.vx) < 0.05 &&
          Math.abs(bead.vy) < 0.05 &&
          Math.abs(bead.want - bead.amp) < 0.004;

        if (settled && bead.want === 0) {
          retire(bead);
          continue;
        }
        if (!settled) moving = true;

        // Squash and stretch. The pair of rotations is what puts the deformation
        // on the axis of travel: turn the drop's own frame into the direction it
        // is going, stretch it along that, turn it back. The highlight inside
        // shears with it, which is the point: a droplet's reflection smears
        // when the droplet is pulled.
        const speed = Math.hypot(bead.vx, bead.vy);
        const pull = Math.min(speed / FULL_SPEED, 1) * STRETCH;
        const angle = pull > 0.001 ? Math.atan2(bead.vy, bead.vx) : 0;
        // Never grows from nothing: a circle at scale 0 is a thing that came
        // out of nowhere, and nothing in the world does that.
        const size = SEED + (1 - SEED) * bead.amp;

        bead.el.style.transform =
          `translate3d(${bead.x.toFixed(2)}px, ${bead.y.toFixed(2)}px, 0)` +
          ` rotate(${angle.toFixed(3)}rad)` +
          ` scale(${(size * (1 + pull)).toFixed(4)}, ${(size * (1 - pull * 0.7)).toFixed(4)})` +
          ` rotate(${(-angle).toFixed(3)}rad)`;
        bead.el.style.opacity = bead.amp.toFixed(3);
      }

      // A pointer resting still on a card is the common case and it should cost
      // nothing: the loop parks itself and the next move restarts it.
      if (moving) frame = requestAnimationFrame(step);
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(step);
    };

    const onMove = (event: PointerEvent) => {
      latest = event;
      wake();
    };

    // Leaving the grid is the one move that is not a crossing: there is no next
    // card to hand the drop to, so it stops chasing and shrinks out where it
    // stands. Arriving, played backwards.
    const onLeave = () => {
      latest = null;
      pointer = null;
      hovered = null;
      for (const bead of beads.values()) bead.want = 0;
      wake();
    };

    field.addEventListener('pointermove', onMove);
    field.addEventListener('pointerleave', onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      field.removeEventListener('pointermove', onMove);
      field.removeEventListener('pointerleave', onLeave);
      for (const bead of beads.values()) retire(bead);
    };
  }, []);

  // Written out rather than resolved through a variable tag, which is the one
  // shape that keeps the ref typed on both branches without a cast per element.
  return as === 'ul' ? (
    <ul ref={ref as React.RefObject<HTMLUListElement>} className={cx(className)}>
      {children}
    </ul>
  ) : (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={cx(className)}>
      {children}
    </div>
  );
}
