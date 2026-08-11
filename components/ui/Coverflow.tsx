'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type {
  KeyboardEvent,
  FocusEvent as ReactFocusEvent,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
} from 'react';
import { cx } from '@/lib/cx';
import type { CoverflowProps } from './contracts';

/**
 * The material, rendered by this component as a wrapper AROUND the caller's
 * card rather than applied onto it.
 *
 * The obvious shape is `cloneElement(slide.card, { className: … })`, and it
 * cannot be used: an element that has crossed the Server → Client boundary is a
 * reference React resolves at render time, not a plain element object. Cloning
 * it during prerender throws `Element type is invalid … got: undefined` and
 * takes the whole static export of the page with it. (An earlier attempt to
 * read `slide.card.props.className` failed one step sooner, for the same
 * underlying reason.) Neither failure appears in `next dev` — only `next build`
 * catches them.
 *
 * Wrapping asks nothing of the element except that it render, which is the one
 * thing a cross-boundary element is guaranteed to do. The caller's card keeps
 * being a real `<a>` carrying the content, and puts `u-cf-card-body` on itself
 * for the layout — a CSS class name, not an imported value, so nothing has to
 * cross the boundary at all.
 */
const CARD_CLASS = 'u-glass u-glass--card u-glass-interactive u-cf-card';

/**
 * SLOT — the coverflow rake. See ./README.md.
 *
 * ── Provenance ──
 *
 * The motion engine is adapted from the `coverflow-carousel` component on
 * 21st.dev. What was kept is the part worth keeping: the ring-folding in
 * `paint()`, which is how the rake loops without cloning nodes or reordering
 * the DOM, and the pointer drag with its throw.
 *
 * It is a fork and not the thin adapter ./README.md asks for, and the reason is
 * that the original renders one `<img>` per slide and nothing else — so every
 * difference this site needs lands inside the part an adapter cannot reach:
 *
 *   • Cards are content, not images. Each is a link carrying a numeral, a
 *     badge, a title, a service list and a blurb.
 *   • The centred card is the EXPANDED one. The original's centre card is
 *     merely the un-rotated one, all cards being the same size. Here the rake
 *     also scales, and the loop flips `[data-cf-active]` so the card in the
 *     middle can show detail the others do not.
 *   • Hovering a card brings it to the centre. The original has no concept of
 *     this, and it is most of the code below that is not geometry.
 *   • Two elements per card instead of one — see the structural note on
 *     `.u-cf-cell` in globals.css.
 *   • Reduced motion flattens the scene rather than merely shortening it.
 *
 * ── Why it paints straight to the DOM ──
 *
 * Sixty state updates a second would re-render every card for numbers React
 * never needs to see. `selected` is the only value in state, and it changes
 * once per card rather than once per frame — it is there because the
 * pagination dots are real UI that has to re-render.
 */

/** `useLayoutEffect` warns when it runs on the server. This one measures. */
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Take a cell out of rendering, or put it back.
 *
 * ── A HIDDEN CELL IS NOT A FREE CELL ─────────────────────────────────────
 *
 * `visibility: hidden` stops a card being painted and does NOT stop it being a
 * layer. Inside a `preserve-3d` context WebKit gives every child its own layer
 * whether or not anything is visible in it, and this track has ten children.
 * Measured in WebKit, p95 frame time scrolling past this section:
 *
 *     as it was, ten cells .............. 42ms
 *     with the ring's copies deleted .... 20ms
 *     with no carousel at all ........... 23ms
 *
 * So the copies were costing about as much as the entire rest of the section,
 * while being invisible the whole time.
 *
 * `display: none` takes a cell out of rendering completely — but only the
 * COPIES may have it. The real cells carry the links, and an element that is
 * `display: none` is not in the tab order, so hiding those would leave a
 * keyboard user able to reach only the middle few slides. The copies are
 * already `inert` and hold no focus, so nothing is lost by dropping them out of
 * the tree until the ring needs them again.
 *
 * ── AND IT IS NOT FREE TO PUT BACK, WHICH IS WHY THIS IS NOT IN `paint` ──
 *
 * This used to be the last thing the paint loop did, evaluated per cell per
 * frame — so a card crossing the edge of the rake flipped `display` MID-MOVE.
 * Un-hiding an element is style, layout and a first rasterisation of a whole
 * glass card (five gradients, a conic rim, a column of text), and it was
 * landing inside the same frame the spring was trying to advance in.
 *
 * It is worst exactly where the complaint was: hovering an END card is a
 * two-card move, and a two-card move is the one that drags the ring's copies in
 * from off-stage. One hover, two cards materialising, both during the motion.
 *
 * So the two halves of this are on different clocks, and `prune` is which half:
 *
 *   visibility + pointer-events   every frame, as before. Both are cheap in
 *                                 the direction the loop ever needs them —
 *                                 turning a card OFF costs no layout and no
 *                                 raster, and turning one back on never
 *                                 happens here because `reveal` has already
 *                                 done it. Pointer-events has to keep up
 *                                 regardless: a card at zero opacity still sits
 *                                 past the end of the rake, and left hittable
 *                                 it would take a hover meant for nothing at
 *                                 all and drag itself to the centre.
 *
 *   display                       only once the spring has rested. This is the
 *                                 half that costs a layout and a first paint,
 *                                 and nothing about it is urgent.
 */
function setGone(cell: HTMLElement, gone: boolean, copy: boolean, prune = false) {
  if (gone !== (cell.dataset.gone === 'true')) {
    const card = cell.firstElementChild as HTMLElement | null;
    cell.dataset.gone = String(gone);
    if (card) {
      card.style.visibility = gone ? 'hidden' : 'visible';
      card.style.pointerEvents = gone ? 'none' : 'auto';
    }
  }

  const dropped = gone && copy && prune;
  if (dropped !== (cell.style.display === 'none')) {
    cell.style.display = dropped ? 'none' : '';
  }
}

/**
 * Below this width the rake has no room and would be clutter rather than
 * depth, so the scene flattens. Matches Tailwind's `md`, which is where this
 * site's grids already collapse to one column.
 */
const NARROW = '(width < 48rem)';
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

/** Pointer travel in px past which a press is a drag and not a click. */
const DRAG_SLOP = 6;

/**
 * Depth of field. Blur starts BLUR_FROM cards out — so the centre card and the
 * moment either side of it stay perfectly sharp — and grows at BLUR_RATE px per
 * card to BLUR_MAX. Small numbers on purpose: this should register as depth,
 * not as an effect anyone can name.
 */
const BLUR_FROM = 0.45;
const BLUR_RATE = 1.6;
const BLUR_MAX = 2.75;

/** How near the centre a card must be to be THE card, and run its sequence. */
const ACTIVE_RANGE = 0.4;

/**
 * How many cards either side of the centre the rake actually shows, and how
 * far past that a card takes to disappear.
 *
 * Without a ring there is nothing forcing cards out of sight, so at the ends of
 * the line every remaining card piled up on one side — five cards' worth of
 * copy overlapping in the space two normally occupy. This is what replaces the
 * ring's edge fade: it does the same job of retiring a card, over four times
 * the distance, and nothing teleports at the end of it.
 *
 * The span is deliberately wider than the fade is long, so a card is at full
 * strength for its whole useful life and only softens once it is genuinely
 * leaving. 0.8 of a card at glide speed is roughly 300ms of fade — slow enough
 * to read as a card receding rather than being switched off.
 */
const SPAN = 2;
const SPAN_FADE = 0.8;

/**
 * How far the pointer must have travelled since the last move landed before a
 * `pointerenter` counts as the user choosing a card.
 *
 * Bringing a card to the centre slides a DIFFERENT card into the space the
 * pointer is occupying, and from then on the pointer is sitting on a card it
 * never went to. A stationary pointer is easy to reject — it has moved zero
 * pixels — but the first real twitch of a resting hand is movement, and at a
 * 6px threshold that was enough to centre the interloper. One deliberate hover
 * produced two slides. Measured before the fix: card 1 centred at 126ms, then
 * card 2 at 1558ms off a 12px nudge.
 *
 * An earlier attempt marked the arriving CARD as ineligible instead, which
 * reads better as a rule and does not work: after a move the pointer is often
 * in a gap between two cards, so there is no card to mark and the next enter
 * sails through. Distance is the thing actually being asked about, and it is
 * defined whether or not a card is under the cursor.
 *
 * ── PATH LENGTH, NOT DISPLACEMENT ────────────────────────────────────────
 *
 * This measured the straight line from the anchor to the pointer, and that is
 * the wrong quantity in a way a browser probe caught and reasoning did not.
 *
 * A hand that leaves a card, goes somewhere else and comes back has chosen
 * twice, deliberately, and its DISPLACEMENT from where it started is zero. So
 * the guard refused it. Measured: hovering the far card, letting it land, then
 * sweeping back out to the far card again produced no move at all — the second
 * gesture ended within a few pixels of where the first one committed, and by
 * displacement that is indistinguishable from never having moved.
 *
 * Distance TRAVELLED has no such blind spot. It is zero for a stationary hand,
 * a few pixels for a settling one, and hundreds for any real gesture including
 * one that returns to where it began.
 *
 * ── And in card widths, not 28px ──
 *
 * 28px was set against a hand tremor, and a tremor is the smaller of the two
 * things this has to survive. The larger is a hand SETTLING: the arm finishes
 * its throw, the wrist relaxes, and the pointer drifts thirty or forty pixels
 * over the next half second — every pixel of it while the rake is still
 * moving, so a card that had slid underneath became eligible.
 *
 * What the guard wants to know is whether the pointer has moved far enough to
 * be aiming somewhere else, and "somewhere else" is a distance in CARDS.
 * Adjacent cards on the rake sit 130–190px apart on screen, so ~0.38 of a card
 * is clear of any settle and under a deliberate move to the next card along.
 * Scaling it with the card keeps that true at every width the `--cf-card` clamp
 * produces; the floor covers the narrow end, where a fraction of a small card
 * would drop back toward tremor range.
 */
const HOVER_TRAVEL = 0.38;
const HOVER_TRAVEL_MIN = 44;

/**
 * How long after a touch to distrust a "mouse" pointerenter. Chrome's
 * compatibility sequence lands within a frame or two of the tap; this is
 * generous by an order of magnitude and costs nothing, because the only thing
 * it suppresses is hover on a device that just told us it was touched.
 */
const GHOST_MOUSE_WINDOW = 600;

/**
 * The spring, in one place.
 *
 * OMEGA is its natural frequency in rad/s: raise it for a quicker carousel,
 * lower it for a more languid one. It is the one number to reach for, and the
 * damping is derived from it (2ω, critical) so the spring can never be tuned
 * into overshooting by accident.
 *
 * ── THIS IS A SHOWPIECE, NOT A CONTROL, AND THAT DECIDES WHICH RULE APPLIES ──
 *
 * It was 20, and 20 was set against Swiper's 300ms default and against Apple's
 * 0.2 to 0.5s window for interface motion, which also warns that past 0.7s
 * motion "drags user attention, increasing perceived latency". Every one of
 * those references describes a CONTROL: a select, a dropdown, a tab strip.
 * Something a person operates, repeatedly, to get somewhere else. The budget is
 * short because motion standing between a user and their task is latency.
 *
 * This rake is not standing between anyone and anything. It IS the content: a
 * hover picks a discipline up and carries it to the middle while four others
 * turn away from it, and there is no next action queued behind that. Given a
 * control's budget it behaved like a control, which is to say it got the job
 * done and stopped, and that is precisely the quality that kept being described
 * as missing while the number was nudged from 25 to 20 and back.
 *
 * So what changed here is the reference class, not another nudge. The rake is a
 * piece of presentation and is tuned against presentation: 0.8s of travel, in
 * the company of a film title card or a product page's hero, rather than 0.3s
 * in the company of a menu.
 *
 * Measured as before, by integrating the pair against the rake's own converged
 * geometry so the speeds are real screen pixels rather than cards per second
 * (time until the rake is within about three pixels of home, and the fastest
 * the cards ever travel):
 *
 *     OMEGA  REACH  LEAP    one card         two cards        ratio  verdict
 *       20    0.7    0.5   0.50s 1179px/s   0.79s 1248px/s    1.06   was this
 *       10    0.3    0.6   0.73s  902px/s   1.02s 1056px/s    1.17   whips long
 *       10    0.45   0.5   0.83s  691px/s   1.24s  789px/s    1.14   soft start
 *       10    0.45   0.6   0.81s  809px/s   1.21s  890px/s    1.10   <- this
 *       10    0.55   0.6   0.86s  757px/s   1.33s  805px/s    1.06   long drags
 *        8    0.45   0.6   1.00s  648px/s   1.50s  712px/s    1.10   sedated
 *
 * A card now crosses the fan at about two thirds of the speed it did and takes
 * half again as long to get there. That is the whole of what anyone sees, and
 * it is a change of PACE and not of SHAPE: half the distance is still covered
 * in the first 154ms of the move, where it used to be the first 100ms. The rake
 * still leaves the instant it is asked and spends the extra time on the settle,
 * which is the only version of slow that is worth having. Slow at the start is
 * lag. Slow at the end is weight.
 *
 * ── DISTANCE STILL BUYS TIME, NOT SPEED ──
 *
 * REACH_SLOW softens ω as the distance grows, so these two are one setting, and
 * what they are set against is neither duration on its own. It is the ratio
 * column: the SPEED of a long move against a short one. A carousel that covers
 * two cards in barely more time than one does not read as quicker, it whips,
 * and that is what every earlier round of tuning here was chasing.
 *
 * 0.45 gives a little of that away. The two-card move peaks 10% faster than the
 * one-card move, where the old pair matched to within 6%. It buys a two-card
 * move that lands at 1.21s instead of 1.33s, and the trade is deliberate: 10%
 * is under what the eye separates, and a third of a second past a second is
 * not. If the long move ever starts to read as lag, 0.3 is the row to take, at
 * the cost of the ratio going to 1.17 and the ends of the fan whipping.
 *
 * REST / REST_V are how close counts as arrived. Critical damping has a
 * famously long tail, approaching without ever quite landing, so the threshold
 * is what actually decides when the animation stops. Set it below one pixel of
 * travel and the eye cannot tell; set it lower still and the schedule simply
 * runs on for another half second for nothing.
 *
 * Halving OMEGA did not have to move REST with it, which is worth recording
 * because the previous re-tune did. The tail is measured in ω⁻¹, so it should
 * have doubled, and it did not: REST_V is the binding condition down there, and
 * the gap between the rake LOOKING as though it has landed (SETTLED) and the
 * integrator having nothing left to do went from 158ms to 175ms. That gap is
 * what delays the depth of field, the material's hover and the `will-change`
 * coming back off, and 17ms of it is a frame.
 */
const OMEGA = 10;
const REACH_SLOW = 0.45;
/**
 * How much of its eventual speed the spring is handed at the instant it starts,
 * as a fraction of `gap × ω`. Zero is a textbook spring and reads as reluctant.
 * Too high and it lurches. See the note at the call site.
 *
 * This is what keeps the slow rake from being a sluggish one, and it went UP
 * when OMEGA came down, which is the opposite of what "make it slower" sounds
 * like it should do. The spring now leaves at three fifths of the speed it
 * would eventually reach and decelerates from there for the whole of the
 * travel: the shape of an ease-out, an eager departure and a long settle. Take
 * it back to 0.5 and the same 0.8s move loses 15% of its top speed and reaches
 * the halfway point 17ms later, and those two together are the difference
 * between a card being carried and a card being dragged.
 *
 * ── It may not exceed 1, and that is a proof rather than a preference ──
 *
 * With a critically damped spring given initial velocity `LEAP * ω * gap`
 * toward its target, the remaining distance is
 *
 *     d(t) = gap * (1 + (1 - LEAP) * ω * t) * e^(-ω t)
 *
 * which is strictly positive for LEAP <= 1 and crosses zero for LEAP > 1. So
 * the "critically damped, so it never overshoots" guarantee at `settle` holds
 * only while this stays at or below 1. That guarantee is about a spring
 * released from REST, and this one is released moving.
 *
 * Worth stating because it was once being violated without the constant
 * changing: the leap read the base OMEGA while the spring ran at a softened
 * one, so the EFFECTIVE leap on a long move was OMEGA/ω times this, which at
 * the current softening would be 1.9. See the call site, which reads this
 * move's own ω.
 */
const LEAP = 0.6;
/* Sub-pixel: one card of travel is ~240px on a desktop, so 0.003 of a card is
   under three quarters of a pixel. Tighter than this and the integrator keeps
   going for another half second to move a distance nothing can display. */
/** Integration step, in seconds. This is what makes the spring behave the same
 *  at 120Hz, 60Hz and a throttled 30Hz. */
const SUBSTEP = 1 / 240;
const REST = 0.006;
const REST_V = 0.03;

/**
 * How often the precomputed path is sampled into a keyframe: every other
 * substep, so 1/120s.
 *
 * The keyframes are interpolated linearly between samples, so this is the one
 * number that decides how faithfully the compositor reproduces the spring. It
 * is deliberately the frame time of a 120Hz display: every frame of the move on
 * the fastest screen this site will meet lands on a sample rather than between
 * two of them, and on a 60Hz screen every other one does. Halving it again
 * would double the keyframe count to buy accuracy nothing can display.
 *
 * MAX_MOVE is a backstop on the integration, not a duration anything reaches.
 * The longest real move is two cards, at about 1.4s to full rest since the
 * spring was slowed. It is deliberately left with room above that: the only
 * thing it costs is samples in a case nothing produces, and a drag thrown hard
 * enough starts its settle already moving.
 */
const SUBSTEPS_PER_SAMPLE = 2;
const SAMPLE = SUBSTEP * SUBSTEPS_PER_SAMPLE;
const MAX_MOVE = 2.5;

/**
 * How often the stacking order is re-derived while building the schedule, in
 * samples. Ordering changes only where two cards are equidistant from the
 * middle, which happens two or three times in a whole move, so this is asking a
 * question every 33ms whose answer changes twice. Finer would cost sorts for
 * nothing; coarser would put a swap up to a frame away from the crossing it
 * belongs to.
 */
const STACK_EVERY = 4;

/**
 * How close counts as ARRIVED, as opposed to stopped. About three pixels.
 *
 * These are two different questions and they were being answered by one number,
 * which is affordable on a stiff spring and not on a soft one. A critically
 * damped spring approaches without ever quite landing, so the distance between
 * "the eye says it is there" and "the integrator has nothing left to do" is
 * real time — and softening the spring for long moves stretched it to a third
 * of a second.
 *
 * Everything that waits on the rake having landed — the depth of field, the
 * material's hover, the card's own transitions — now waits on THIS, so it fires
 * when the move looks finished rather than when the arithmetic finishes. What
 * still waits for REST is the loop itself and the layer promotion, because
 * those genuinely care about the last sub-pixel.
 */
const SETTLED = 0.014;

/**
 * How long a pointer has to be STILL on a card before it is brought to the
 * centre, and how far it may drift in that time and still count as still.
 *
 * The rake must react to where the pointer STOPPED, not to everything it passed
 * over on the way. Sweeping in from the right crosses every card between the
 * edge and the one being aimed at, each fires `pointerenter`, and each starts
 * its own settle — two or three cards lurching past in succession before the
 * one actually wanted arrives. A lot of motion nobody asked for, and it reads
 * as the carousel reacting to the mouse being in the room rather than to a
 * choice.
 *
 * ── A DELAY ALONE DOES NOT DO THIS, WHICH IS WHAT THE 32ms VERSION MISSED ──
 *
 * The obvious guard is a timer: wait a moment after `pointerenter` and only
 * then move. That rejects a pointer flying past a card in under the delay, and
 * a card is about 240px wide — so at any speed a hand actually travels, the
 * pointer is over each card for HUNDREDS of milliseconds. A fixed 32ms delay
 * expired comfortably on every card in the sweep and moved the rake for all of
 * them. The delay was rejecting a speed nobody uses.
 *
 * What separates passing over from arriving is not elapsed time, it is whether
 * the pointer is STILL MOVING. So the timer is restarted by `pointermove` for
 * as long as the pointer keeps travelling, and fires only once it comes to
 * rest — on whichever card it happens to be resting on. A sweep across the
 * whole rake now produces exactly one move, to the card the hand stopped at,
 * and a pointer that crosses the section without stopping produces none.
 *
 * That inversion is also why 80ms is affordable where the ORIGINAL 110ms was
 * not. 110ms was charged on arrival — you pointed at a card and waited a tenth
 * of a second, which is the sensation of having to insist on something. This is
 * charged on stopping, and the hand has already finished moving by then; it has
 * to outlast the gap between two `pointermove` events during a real sweep (a
 * frame, or a dropped frame) and nothing more.
 *
 * HOVER_STILL is the drift allowed before a move counts as travel. Above a hand
 * tremor, far below any deliberate movement — without it, a resting hand's own
 * jitter would restart the timer forever and the rake would never move at all.
 */
const HOVER_INTENT = 80;
const HOVER_STILL = 4;

/** Everything the geometry needs that is not the card's own index. */
type Scene = {
  cells: number;
  width: number;
  flat: boolean;
  gap: number;
  falloff: number;
  shrink: number;
  converge: number;
  rotate: number;
  fade: number;
};

/** Where one cell is, and how solid, at one rake position. */
type Placement = {
  distance: number;
  /** Horizontal travel from the middle, in px, before the projection. */
  shift: number;
  scale: number;
  /** Degrees of `rotateY`, signed as the transform writes it. */
  turn: number;
  transform: string;
  opacity: number;
  reach: number;
};

/** Signed distance from the middle in cards, folded the shorter way round. */
function cellOffset(index: number, pos: number, cells: number) {
  let offset = (((index - pos) % cells) + cells) % cells;
  if (offset > cells / 2) offset -= cells;
  return offset;
}

/**
 * The scene, as one pure function of (cell, position).
 *
 * It was the body of the paint loop, and it had to come out of it, because it
 * now has two callers on two different clocks: the loop that writes a resting
 * frame straight to the DOM, and the keyframe builder that samples a whole move
 * before a pixel of it has been drawn. One function is what stops those two
 * describing subtly different rakes.
 */
function place(index: number, pos: number, scene: Scene): Placement {
  const { cells, width, flat, gap, falloff, shrink, converge, rotate, fade } = scene;
  const pitch = width * (1 + gap);

  const offset = cellOffset(index, pos, cells);
  const distance = Math.abs(offset);
  // Both the tilt and the shrink ease off as cards travel out: doubling the
  // distance adds only about half again as much of each. A linear ramp folds
  // the second card shut; this keeps it readable.
  const ramp = Math.pow(distance, falloff);
  const scale = 1 - shrink * ramp;

  // Perspective is what pulls distant cards toward the vanishing point, and
  // with no translateZ to supply it (see the block below) the rake spaces its
  // cards on a flat linear pitch. That is the whole reason the ends of the
  // ribbon came apart: a card two out is turned nearly edge-on and scaled down,
  // so it covers a fraction of the width it did at rest while still sitting
  // twice as far from the middle. The result was a tight fan in the centre with
  // two cards floating off the ends of it.
  //
  // This is that convergence, applied directly. The curve is rational rather
  // than a power of `distance`, and that is the point: `d^0.56` has a vertical
  // tangent at zero, so a card crossing the middle would lurch. This one is
  // exactly linear at the centre, so a drag tracks the pointer one-to-one
  // there, and tightens only as cards travel out.
  const shift = flat
    ? offset * width * 1.06
    : (offset / (1 + converge * distance)) * pitch;

  // Capped well short of edge-on. At 78deg a far card was 50px of visible
  // width, a sliver that read as a seam rather than a card. These cards carry
  // TEXT, which is the difference from the image carousel this is modelled on:
  // a sliver of album art still reads as album art, and a sliver of a card is a
  // title sheared in half.
  const turn = flat ? 0 : -Math.min(rotate * ramp, 58) * Math.sign(offset);

  const transform = flat
    ? // No rake and no tilt. Only the offset, the scale and the fade survive,
      // so the centred card is still obvious without anything rotating or
      // flying toward the viewer.
      `translateX(${shift.toFixed(2)}px) scale(${scale.toFixed(4)})`
    : `translateX(${shift.toFixed(2)}px) ` +
      `rotateY(${turn.toFixed(3)}deg) ` +
      `scale(${scale.toFixed(4)})`;

  // Two things multiplied: the gentle per-step fade that gives the rake its
  // depth, and the reach that retires a card once it is past the span the rake
  // shows.
  const reach = Math.min(1, Math.max(0, (SPAN + SPAN_FADE - distance) / SPAN_FADE));
  const opacity = Math.max(0, 1 - fade * distance) * reach;

  return { distance, shift, scale, turn, transform, opacity, reach };
}

/**
 * The silhouette a card actually occupies on screen, as opposed to the box it
 * was sent to.
 *
 * ── WHY THE UN-PROJECTED BOX IS NOT THE CARD ────────────────────────────────
 *
 * `place` says where a card is SENT. What the eye sees is that box after the
 * frame's `perspective` has had it, and the two differ by more than a rounding:
 *
 *   • Turned 48deg, a card covers about two thirds of its own width. Testing
 *     against `width * scale` therefore claimed a strip of empty frame either
 *     side of every side card, and the strips of neighbouring cards overlapped
 *     in places where the eye can see straight through to the stage behind.
 *   • The half of a turned card nearer the viewer is about a tenth TALLER than
 *     the half behind it, so a card is a trapezoid and not a rectangle.
 *
 * And the vertical axis was not being asked about at all, which is the bigger
 * one: a card is `--cf-height` inside a frame with 2.25rem of padding above and
 * below it, and a side card is scaled down inside even that. Everything under
 * the fan answered as though it were a card, so the rake reacted to a pointer
 * that was nowhere near one.
 *
 * `x` is measured from the rake's centre line, which is also where the frame
 * puts its perspective origin, so the projection is the plain one:
 *
 *     a point u across the card sits at z = -u sin(turn)
 *     everything at that depth is magnified by p / (p + u sin(turn))
 *
 * Returns null when the point is off the card, and otherwise how much taller or
 * shorter the card is at that point, which is all the caller needs to finish
 * the test on the other axis.
 */
function silhouette(spot: Placement, x: number, width: number, perspective: number) {
  const half = (width * spot.scale) / 2;

  // Flattened, or a browser that reported no perspective: the box IS the card.
  if (!spot.turn || !perspective) {
    if (x < spot.shift - half || x > spot.shift + half) return null;
    return 1;
  }

  const radians = (spot.turn * Math.PI) / 180;
  const sin = Math.sin(radians);
  const cos = Math.cos(radians);
  const project = (u: number) => ((spot.shift + u * cos) * perspective) / (perspective + u * sin);

  const a = project(-half);
  const b = project(half);
  if (x < Math.min(a, b) || x > Math.max(a, b)) return null;

  // Which point across the card is under `x`. The denominator reduces to
  // p(shift·sin - p·cos), which cannot reach zero at any rake this component
  // can produce: the far card sits at 1.36 card widths with sin 0.85, against a
  // perspective of 3.4 widths with cos 0.53, so the two sides differ by 55%.
  const u = (perspective * (spot.shift - x)) / (x * sin - perspective * cos);
  return perspective / (perspective + u * sin);
}

/**
 * Painting order, as a z-index per cell: nearest the middle on top.
 *
 * This used to be `100 - round(distance * 10)`, a value that changed every
 * twentieth of a card and therefore up to twenty times per card of travel. Only
 * the ORDER was ever legible, and the order changes two or three times in a
 * whole move, where two cards are equidistant and swap. Ranking says exactly
 * that and nothing more, which is what makes it schedulable: a move now carries
 * a handful of z-index writes at the crossings instead of a stream of them.
 *
 * Ties break on index so the answer is stable frame to frame.
 */
function stackOrder(distances: number[]): number[] {
  const order = distances.map((_, index) => index);
  order.sort((a, b) => distances[a]! - distances[b]! || a - b);
  const depth = new Array<number>(distances.length);
  order.forEach((index, rank) => {
    depth[index] = 100 - rank;
  });
  return depth;
}

type Sample = { t: number; pos: number; v: number };
type Path = {
  samples: Sample[];
  /** Seconds to full rest. */
  duration: number;
  /** When the rake is near enough its destination for a card to be THE card. */
  activeAt: number;
  /** When it has arrived as far as the eye is concerned. See SETTLED. */
  settledAt: number;
};

/**
 * ── THE SPRING IS SOLVED UP FRONT, NOT ONE FRAME AT A TIME ──────────────────
 *
 * This is the same critically damped spring, the same semi-implicit Euler and
 * the same fixed 1/240s substep the rake has always used. The only thing that
 * changed is WHEN it runs: all of it, in one synchronous pass, before the move
 * starts, instead of a slice of it inside a requestAnimationFrame callback.
 *
 * That is the whole smoothness fix, and it is worth being precise about why,
 * because the per-frame version was already writing nothing but `transform` and
 * `opacity` to promoted layers, which is supposed to be free.
 *
 * It is not free, for a reason that has nothing to do with how much arithmetic
 * a frame costs. A transform written from JS is, to the browser, an unrelated
 * style change every frame. It cannot see the next value, so it cannot plan:
 * the transform carries a changing `scale`, and a composited layer whose scale
 * changes has to be re-rasterised to keep its contents sharp. Each of these
 * cards is five gradients, a conic rim and a column of text. Five of them
 * re-rasterising per frame is the cost, and no amount of trimming the loop
 * reaches it, because the loop was never what was expensive.
 *
 * Handed the whole path as keyframes, the browser knows the largest scale the
 * card will ever reach, rasterises once at that scale, and transforms the
 * texture for the rest of the move. Every frame after the first is pure
 * compositing, on the compositor thread, with the main thread free. That is
 * exactly what the deck in "Why choose us" gets for free by being a CSS
 * transition, and it is the only reason that section feels smoother than this
 * one ever did.
 *
 * The cost of solving ahead is about a hundred samples of trivial arithmetic,
 * once per move, in the frame the user pointed at a card.
 *
 * Interrupting is not lost by precomputing, which is the thing worth checking
 * before believing any of the above. The path carries velocity at every sample,
 * so a hover landing mid-flight reads the position AND the speed the rake is
 * actually travelling at, and the new path starts from both. Nothing restarts
 * from zero, which is what the per-frame spring was there to guarantee.
 */
function springPath(from: number, to: number, v0: number, omega: number): Path {
  const samples: Sample[] = [{ t: 0, pos: from, v: v0 }];
  let pos = from;
  let v = v0;
  let t = 0;
  let activeAt = -1;
  let settledAt = -1;

  while (t < MAX_MOVE) {
    for (let step = 0; step < SUBSTEPS_PER_SAMPLE; step += 1) {
      const gap = to - pos;
      // Semi-implicit Euler, critically damped: c = 2w.
      v += (omega * omega * gap - 2 * omega * v) * SUBSTEP;
      pos += v * SUBSTEP;
    }
    t += SAMPLE;
    samples.push({ t, pos, v });

    const left = Math.abs(to - pos);
    if (activeAt < 0 && left < ACTIVE_RANGE) activeAt = t;
    if (settledAt < 0 && left < SETTLED) settledAt = t;
    if (left < REST && Math.abs(v) < REST_V) break;
  }

  return {
    samples,
    duration: t,
    activeAt: activeAt < 0 ? t : activeAt,
    settledAt: settledAt < 0 ? t : settledAt,
  };
}

/** Where the rake is, and how fast, part way through a solved path. */
function sampleAt(path: Path, t: number): Sample {
  const { samples } = path;
  const last = samples[samples.length - 1]!;
  if (t <= 0) return samples[0]!;
  if (t >= last.t) return last;

  const index = Math.min(samples.length - 2, Math.floor(t / SAMPLE));
  const a = samples[index]!;
  const b = samples[index + 1]!;
  const k = (t - a.t) / (b.t - a.t);
  return { t, pos: a.pos + (b.pos - a.pos) * k, v: a.v + (b.v - a.v) * k };
}

/*
 * ── THERE IS NO translateZ IN THE RAKE, AND THERE MUST NOT BE ──
 *
 * The obvious way to build this — and what the original does — is to recede the
 * side cards with a negative `translateZ` under the frame's `perspective`. It
 * renders beautifully and it silently breaks every side card:
 *
 *   In Chrome, an element carrying a NEGATIVE translateZ inside a perspective
 *   container is painted but receives no hit-testing at all. Not "is harder to
 *   click" — `document.elementFromPoint` never returns it anywhere on screen.
 *
 * Measured on a minimal repro, sampling every point in the viewport:
 *
 *     rotateY(-40deg)                          1200 hittable points
 *     translateZ(50px) rotateY(-40deg)         2100 hittable points
 *     translateZ(-150px)                          0
 *     translateZ(-150px) rotateY(-40deg)          0
 *
 * The whole interaction model here is hover-a-side-card-to-centre-it, so this
 * failure takes the feature with it — and it takes clicking a side card too. It
 * is also invisible in a screenshot, which is exactly how it survived the first
 * pass of this component.
 *
 * Moving the scene forward instead (so every Z is positive) does restore
 * hit-testing, and was rejected: with the near plane that close, perspective
 * magnifies the centre card by about 1.6×, and backing the perspective off far
 * enough to correct that flattens the rake it exists to create.
 *
 * So depth is carried by `shrink` and by the overlap, and the genuine 3D — the
 * trapezoid a card folds into as it turns away — is `rotateY`, which is
 * perspective-projected exactly as before and hit-tests correctly. This is also
 * how the original Cover Flow was built: rotation, scale and overlap.
 */

export function Coverflow({
  slides,
  rotate = 48,
  shrink = 0.15,
  falloff = 0.56,
  fade = 0.07,
  gap = -0.03,
  converge = 0.22,
  label = 'Carousel',
  className,
}: CoverflowProps) {
  const count = slides.length;
  /**
   * Cells rendered: every slide twice. See the fold in `paint` for why.
   *
   * The second set is presentational only: a screen reader hears five cards,
   * Tab visits five links, and the duplicates exist purely to keep the ring's
   * wrap-point off screen.
   *
   * ── `inert` DID THAT IN ONE ATTRIBUTE, AND KILLED HALF THE CAROUSEL ──────
   *
   * It was `inert`, which removes an element from the accessibility tree and
   * the focus order together — exactly the two things wanted. It also, by the
   * same clause of the spec, makes the element **not respond to user
   * interaction events at all**: an inert subtree is not hit-tested, so it
   * cannot be hovered and cannot be clicked.
   *
   * These are CARDS ON SCREEN. At any moment two of the five in the fan are
   * copies, and which two depends on where the rake is sitting. At rest they
   * are the two on the LEFT. So half the carousel was dead: hovering those
   * cards did nothing, clicking them did nothing, and the pointer sailed
   * straight through to the frame behind. Measured with `elementFromPoint`
   * across the fan at rest — the copies fully painted at 0.86 and 0.93 opacity,
   * `visibility: visible`, `pointer-events: auto`:
   *
   *     x=  4 … 564   u-cf-track      <- cells 8 and 9 are here, and unreachable
   *     x=584 … 864   cell 0
   *     x=964 … 1084  cell 1
   *
   * It is invisible in a screenshot and invisible in the code, because the
   * attribute reads as an accessibility hint rather than as a pointer-events
   * switch — the render below carried a comment positively asserting that
   * copies still take pointer events. They never did.
   *
   * So the two jobs are done by the two things that do only those jobs:
   * `aria-hidden` for the accessibility tree, and `tabIndex = -1` on the links
   * inside (see the effect below) for the focus order. Hit-testing is left
   * alone, because to a mouse a copy is simply the card that is on screen at
   * that moment.
   */
  const cells = count * 2;

  const frameRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  /** Viewport x of the rake's centre line. Measured, never read per move. */
  const centreXRef = useRef(0);

  /**
   * The frame's perspective distance in px, read from the stylesheet rather
   * than restated here. It is `calc(var(--cf-card) * 3.4)` and it scales with
   * the card, so hard-coding the ratio would be a second copy of a number that
   * is allowed to change in one file only.
   *
   * Only the hit test needs it: the cards are projected by the browser, and
   * this is what lets `silhouette` work out where that projection put them.
   */
  const perspectiveRef = useRef(0);

  /**
   * The scene is read out of the DOM rather than collected into ref arrays.
   *
   * The track's element children ARE the cells, in slide order, and each cell's
   * only element child is its card — both invariants hold by construction from
   * the render below. Two ref arrays and a ref callback per card would restate
   * what the tree already says.
   *
   * It is also the only shape that is honest about `cloneElement`. A ref
   * callback passed inside a cloned props object is not recognisable as a ref
   * by anything reading this file, the `react-hooks/refs` rule included — and
   * that rule is right to flag it, because nothing in the shape says otherwise.
   */
  const cellAt = (index: number) =>
    (trackRef.current?.children[index] as HTMLElement | undefined) ?? null;
  /** The caller's link inside a card — what a keyboard user actually lands on. */
  const linkAt = (index: number) => cellAt(index)?.querySelector('a') ?? null;

  /**
   * Where the rake rests before anyone touches it: the MIDDLE card.
   *
   * With a ring, any starting card gave a full fan because the line had no
   * ends. A line has two, and starting at index 0 put the rest of the cards in
   * a heap to one side — the resting state of the section, and the worst view
   * of it. Starting in the middle means the section is first seen as the
   * symmetric fan it was designed as, and the ends are only reached by someone
   * who went looking for them.
   *
   * It also reads better than the ring did. The ring showed 04, 05, 01, 02, 03
   * left to right, because "the shorter way round" put the last two cards on
   * the left; the line shows 01 … 05 in order, with 03 in the middle.
   */
  /** Fractional card index at the centre. The single source of truth. */
  const posRef = useRef(0);
  /**
   * Where the current settle is headed. Stepping off `pos` instead would
   * swallow a keypress that lands mid-flight, before the round-off moves.
   */
  const targetRef = useRef(0);
  const widthRef = useRef(0);

  /**
   * The move currently in flight: one compositor animation per visible cell,
   * plus the solved path they were all built from.
   *
   * `clock` is whichever of those animations is asked for the time. They were
   * all started in the same task off the same document timeline, so any of them
   * answers for the rest, and reading the animation rather than the wall clock
   * is what makes an interruption exact: `performance.now()` would include the
   * gap between `animate()` being called and the animation actually starting,
   * which is up to a frame of position the rake never travelled.
   */
  const moveRef = useRef<{
    anims: Animation[];
    path: Path;
    clock: Animation | null;
  } | null>(null);

  /**
   * Timers owned by the move in flight: the stacking-order swaps and the three
   * moments the cards themselves respond to. All cancelled together, because a
   * retarget invalidates every one of them at once.
   */
  const timersRef = useRef<number[]>([]);

  const dragRef = useRef<{
    id: number;
    x: number;
    pos: number;
    velocity: number;
    time: number;
    travel: number;
  } | null>(null);

  /** Survives the drag so the click firing straight after it can be judged. */
  const travelRef = useRef(0);

  /** The spring's velocity, in cards per second. Survives a change of target. */
  const velocityRef = useRef(0);

  /**
   * The stiffness this move runs at, derived once from the distance it set out
   * to cover — see the note at the integrator for why it may not be re-read
   * from the shrinking gap.
   */
  const omegaRef = useRef(OMEGA);

  /**
   * Timestamp of the last touch, used to ignore the ghost mouse events that
   * follow it.
   *
   * After a tap, Chrome replays the interaction as a compatibility mouse
   * sequence — and that sequence includes a `pointerenter` reporting
   * `pointerType: "mouse"`. It is indistinguishable from a real hover by type
   * alone, so the tapped card was being hover-centred a few milliseconds before
   * its own click arrived. The click then found the card already centred and
   * followed the link, which meant one tap on a distant side card jumped
   * straight to the pillar page instead of bringing it in to be read.
   *
   * Touch gets the two-step it needs — tap to centre, tap again to open — and
   * a hybrid laptop still hovers with its mouse, because the suppression is
   * scoped to a moment after a touch rather than to the device.
   */
  const lastTouchRef = useRef(0);

  /** Live pointer position — the previous sample, so a move knows its delta. */
  const pointerPosRef = useRef<{ x: number; y: number } | null>(null);

  /**
   * Pixels the pointer has TRAVELLED since the rake last committed to a move.
   *
   * This is the whole answer to the oscillation problem. Hovering a side card
   * moves it toward the centre, which slides a DIFFERENT card under a pointer
   * that never moved — firing `pointerenter` again, centring that one, and so
   * on. A hand that has not travelled since the last commit cannot be choosing
   * anything, whatever happens to be underneath it; a hand that has, is.
   *
   * Reset to 0 at each commit, and to `Infinity` whenever there is no wake for
   * the pointer to be sitting in: before the first move, after a drag, and on
   * leaving the section.
   *
   * It replaced a remembered ANCHOR POSITION, which held the same idea and
   * measured the wrong quantity — see HOVER_TRAVEL for the gesture that broke
   * it. Distance travelled needs no clearing at the end of a settle either: the
   * earlier version had to re-anchor to wherever the hand had ended up, and
   * getting that wrong by one frame reopened the very hole it closed.
   */
  const hoverPathRef = useRef(Infinity);

  /** Pending hover-intent timer — see HOVER_INTENT. */
  const hoverTimerRef = useRef<number | null>(null);
  /** Which cell the pointer is inside, so a move can re-aim the pending timer. */
  const hoverIndexRef = useRef<number | null>(null);
  /** Where the pointer was when that timer was last started. */
  const hoverStillRef = useRef<{ x: number; y: number } | null>(null);

  const cancelHoverIntent = () => {
    if (hoverTimerRef.current !== null) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    hoverStillRef.current = null;
  };

  /** Mirrors `flat` for the paint loop, which must not read React state. */
  const flatRef = useRef(false);

  const [selected, setSelected] = useState(0);

  /** Nearest slide, folded back into 0..count-1. */
  const indexAt = useCallback(
    (pos: number) => ((Math.round(pos) % count) + count) % count,
    [count],
  );

  /**
   * Fold a position back into the first lap.
   *
   * `pos` and `pos + count` render identically — the cards repeat — so this
   * changes nothing on screen. What it buys is that the copies sitting in the
   * visible fan are always the FIRST set, which is the set that carries the
   * links, the focus order and the accessible names. The duplicates stay inert.
   */
  const lap = useCallback((pos: number) => ((pos % count) + count) % count, [count]);

  /**
   * Write the whole scene to the DOM at wherever the rake currently is.
   *
   * This is no longer a per-frame loop. A move is handed to the compositor as
   * keyframes (see `settle`), so what is left for this is the handful of
   * moments where the scene has to be stated outright rather than animated: the
   * first paint, a resize, a media-query flip, a drag tracking the pointer, and
   * the frame a move lands on.
   *
   * `final` means "the rake has stopped", and it is what separates the two
   * kinds of work here. Position, stacking and fade are always written.
   * The depth-of-field filter is written only on a final paint, because depth
   * of field says where a card IS and a card mid-slide is not anywhere yet.
   * `prune` goes further and drops retired cells out of the tree, which is the
   * one thing here that costs a layout.
   */
  const paint = useCallback((final = false, prune = final) => {
    const width = widthRef.current;
    const track = trackRef.current;
    if (!width || !track) return;

    const scene: Scene = {
      cells,
      width,
      flat: flatRef.current,
      gap,
      falloff,
      shrink,
      converge,
      rotate,
      fade,
    };

    const pos = posRef.current;
    /**
     * Whether the rake has effectively arrived, and which SLIDE it arrived at.
     *
     * ── A SLIDE, NOT A CELL, AND THAT MATTERS AT THE WRAP ───────────────────
     *
     * Every slide is rendered twice (see `cells`), and when a move lands `lap`
     * folds `pos` back into the first lap, which hands the middle from one copy
     * of a card to the OTHER copy of the same card. Nothing moves on screen;
     * the two are identical and co-located. But if `[data-cf-active]` is a
     * property of the CELL, it moves with the fold: the cell that was arriving
     * loses it and its twin gains it, from a standing start.
     *
     * The twin's detail block is at opacity 0, so it replays the whole arrival
     * sequence, 110ms of delay and 300ms of fade, on a card that has already
     * been sitting in the middle. The blurb visibly starts appearing, stops,
     * and appears again. Measured on one hover: `centred cell 8`, then
     * `centred cell 3`, both the same card, 200ms apart.
     *
     * Asking about the slide instead makes the fold a non-event: BOTH copies
     * carry the flag the whole time, so when they trade places there is nothing
     * to transition. The hidden twin having it costs nothing, being
     * `visibility: hidden` and unable to be hovered or seen.
     *
     * Arrival is measured on the RAKE (how near `pos` is to its target) rather
     * than on each card's own distance, which is what keeps a card merely
     * passing through the middle on a two-card move from lighting up as though
     * it were the destination.
     */
    const arrived = Math.abs(targetRef.current - pos) < ACTIVE_RANGE;
    const activeSlide = ((Math.round(targetRef.current) % count) + count) % count;

    const nodes = Array.from(track.children) as HTMLElement[];
    const places = nodes.map((_, index) => place(index, pos, scene));
    const depth = stackOrder(places.map((it) => it.distance));

    nodes.forEach((cell, index) => {
      const card = cell.firstElementChild as HTMLElement | null;
      if (!card) return;
      const spot = places[index]!;

      cell.style.transform = spot.transform;

      const z = String(depth[index]);
      if (cell.style.zIndex !== z) cell.style.zIndex = z;

      // ── THE FADE IS ON THE CELL, AND THAT IS THE WHOLE POINT ─────────────
      //
      // It was on the CARD, one element down, and that one step is the
      // difference between a compositor write and a repaint of everything the
      // card is made of: a conic gradient, three radial gradients and a column
      // of text.
      //
      // `transform` and `opacity` are the only two properties a compositor can
      // change without a rasteriser, and even they only qualify on an element
      // that HAS a layer. The cell has one: it is promoted by `will-change`
      // (see globals.css), which names opacity as well as transform for
      // exactly this reason. The card inside it has none and never should, so
      // the value simply moves to the element already equipped to take it.
      //
      // Nothing changes on screen. The cell's only child is the card, so
      // fading one and fading the other are the same picture.
      const opacity = spot.opacity.toFixed(3);
      if (cell.style.opacity !== opacity) cell.style.opacity = opacity;

      // ── DEPTH OF FIELD, ON ARRIVAL ONLY ──────────────────────────────────
      //
      // A lens has one focal plane, and the rake had none: every card was
      // equally sharp at every depth, which is most of why the fan read as five
      // flat pictures at angles rather than as objects at distances. Softening
      // the ones behind is the cue a camera gives for free and a CSS carousel
      // has to be told to give.
      //
      // On the card's CONTENT, not the card. A filter on the cell or the pane
      // would make it a backdrop root and the glass would have nothing left to
      // sample, the same trap documented on `.u-stage`. Blurring only the copy
      // leaves the material intact, and has the useful side effect of settling
      // the far cards' text down where it shows through the pane in front.
      //
      // `final` only. A filter is the one property on these cards that the
      // compositor cannot honour by itself: every change to its value
      // re-RASTERISES the element, and the element is a column of text. See
      // `.u-cf-card-body` in globals.css for the CSS half, which drops the
      // filter outright while the rake moves and eases it back in from here.
      if (final) {
        const blur = Math.min(
          BLUR_MAX,
          Math.max(0, spot.distance - BLUR_FROM) * BLUR_RATE,
        );
        const value = `${Math.round(blur * 4) / 4}px`;
        if (card.style.getPropertyValue('--cf-blur') !== value) {
          card.style.setProperty('--cf-blur', value);
        }

        // A card in focus drops the filter entirely rather than blurring by
        // zero. Two reasons, and the second is the better one: `blur(0px)`
        // still costs a render surface, AND a filtered element loses subpixel
        // antialiasing, so the card carrying the text you are actually reading
        // was rendering its type slightly thinner than every other card.
        const sharp = blur < 0.05;
        if (sharp !== (card.dataset.sharp === 'true')) card.dataset.sharp = String(sharp);
      }

      // ── THE ACTIVE CARD IS THE DESTINATION, NOT WHATEVER IS PASSING ──────
      //
      // Crossing two cards drags the one in between through the middle: it has
      // to, the rake is a strip and there is no way round it. What does NOT
      // have to happen is that card running its whole arrival while it passes.
      // `[data-cf-active]` drives the detail sequence, the lede's rise, the
      // lifted shadow and the full glass material, so an intermediate card
      // would expand, fill in its blurb, lift, and shut again inside about
      // 150ms. That reads as the carousel changing its mind.
      //
      // So a card is THE card only if the rake has arrived AND this is the
      // slide it arrived at. `targetRef` tracks the pointer during a drag (see
      // `onDragMove`), so dragging still expands whichever card you pull in.
      const active = arrived && index % count === activeSlide;
      if (active !== (cell.dataset.cfActive === 'true')) {
        cell.dataset.cfActive = String(active);
      }

      // Dropping a retired cell out of the tree waits for the rake to stop;
      // hiding it does not. See `setGone`.
      setGone(cell, spot.reach === 0, index >= count, prune);
    });
  }, [cells, count, fade, falloff, gap, converge, rotate, shrink]);

  /**
   * Hand `[data-cf-active]` to the slide the rake is arriving at, and to
   * nothing else.
   *
   * Separate from `paint` because it is the one part of arriving that has to
   * happen EARLY, while the last fraction of the move is still running. The
   * rest of what a landing paint does, retiring the cells leaving the far end
   * in particular, would be wrong at that moment: those cards are still
   * visibly fading, and hiding them there is a card blinking out rather than
   * receding.
   */
  const flagActive = useCallback(
    (target: number) => {
      const track = trackRef.current;
      if (!track) return;
      const slide = ((Math.round(target) % count) + count) % count;

      Array.from(track.children).forEach((node, index) => {
        const cell = node as HTMLElement;
        const active = index % count === slide;
        if (active !== (cell.dataset.cfActive === 'true')) {
          cell.dataset.cfActive = String(active);
        }
      });
    },
    [count],
  );

  /**
   * Bring in every cell the rake is about to cross, before it starts crossing
   * it. See `setGone` for why this cannot be left to the paint loop.
   *
   * The stretch of track being travelled is the interval between where the rake
   * is and where it is going, so a cell is needed if it comes within the rake's
   * own span of ANY point on that interval — which is `distance` measured to
   * the interval rather than to a point.
   */
  const reveal = useCallback(
    (from: number, to: number) => {
      const track = trackRef.current;
      if (!track) return;
      const start = Math.min(from, to);
      const span = Math.abs(to - from);
      // The ring's shorter-way-round arithmetic only holds for a move under
      // half a turn, which every settle is. A drag is not, so it reveals the
      // whole ring instead of trying to predict where it will end up.
      const wide = span >= cells / 2;

      Array.from(track.children).forEach((node, index) => {
        if (!wide) {
          let offset = (((index - start) % cells) + cells) % cells;
          if (offset > cells / 2) offset -= cells;
          const distance = Math.max(0, -offset, offset - span);
          if (distance >= SPAN + SPAN_FADE) return;
        }
        setGone(node as HTMLElement, false, index >= count);
      });
    },
    [cells, count],
  );

  /** Schedule one of this move's moments. Everything dies with `clearTimers`. */
  const after = useCallback((seconds: number, run: () => void) => {
    timersRef.current.push(window.setTimeout(run, Math.max(0, seconds * 1000)));
  }, []);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  /**
   * Where the rake is, and how fast it is going, right now.
   *
   * With the move running on the compositor, `posRef` is only true between
   * moves: during one it holds wherever the last paint left it. Anything that
   * has to know where the cards actually are (which card is under the pointer,
   * where a drag is taking over from) asks the solved path instead, at the
   * animation's own time.
   */
  const livePos = useCallback(() => {
    const move = moveRef.current;
    if (!move) return { pos: posRef.current, v: velocityRef.current };

    const time = move.clock?.currentTime;
    const sample = sampleAt(move.path, (typeof time === 'number' ? time : 0) / 1000);
    return { pos: sample.pos, v: sample.v };
  }, []);

  /**
   * Take the rake off its animation and leave it exactly where it stands,
   * travelling at exactly the speed it was.
   */
  const freeze = useCallback(() => {
    clearTimers();
    const move = moveRef.current;
    if (!move) return;

    const { pos, v } = livePos();
    posRef.current = pos;
    velocityRef.current = v;
    moveRef.current = null;

    // Inline styles first, cancel second, and the order is load-bearing. An
    // animation with `fill: forwards` outranks the element's own style, so the
    // write is invisible until the cancel lands. Done the other way round the
    // cells would show whatever transform the last paint left on them, which
    // can be a whole card away.
    paint();
    move.anims.forEach((anim) => anim.cancel());
  }, [clearTimers, livePos, paint]);

  /**
   * ── A SPRING, SOLVED ONCE AND HANDED TO THE COMPOSITOR ───────────────────
   *
   * The physics is unchanged and the tuning above still describes it exactly:
   * critically damped so it never overshoots, softened by distance so two cards
   * read as further rather than merely faster, launched with the LEAP so it
   * does not have to build speed before anything moves.
   *
   * What changed is that none of it runs per frame any more. `springPath`
   * integrates the whole move in one pass, `place` turns each sample into the
   * transform and opacity every cell wants at that instant, and the browser is
   * handed the result as keyframes. See the block on `springPath` for why that
   * is the difference between this and the deck in "Why choose us", which has
   * always been the smoother of the two for exactly this reason.
   *
   * A spring was chosen over a tween because a tween has no memory of how fast
   * it was already going: change your mind mid-move and it restarts from zero
   * and the rake visibly stalls. That property survives being precomputed,
   * which is the one thing worth checking here. `freeze` reads the position AND
   * the velocity out of the path in flight, and the replacement path starts
   * from both, so pointing somewhere else mid-move still bends the motion
   * rather than restarting it.
   */
  const settle = useCallback(
    (target: number, velocity?: number) => {
      // Whatever is in flight hands over its position and its speed.
      freeze();

      const gapCards = target - posRef.current;
      targetRef.current = target;
      omegaRef.current = OMEGA / (1 + REACH_SLOW * Math.min(Math.abs(gapCards), 3));
      setSelected(indexAt(target));

      if (velocity !== undefined) {
        velocityRef.current = velocity;
      } else if (Math.abs(velocityRef.current) < REST_V) {
        // ── THE LEAP ────────────────────────────────────────────────────────
        //
        // A spring starting from rest has zero velocity, so it has to
        // accelerate before anything moves. That is real physics and it is the
        // wrong physics for this: it means the first moments after you point at
        // a card are the SLOWEST of the whole move, which is exactly what
        // "having to force it" feels like. An ease-out leaves at full speed and
        // that is why a tween can feel eager where a spring feels reluctant.
        //
        // So the spring is given the velocity it would have had a moment in,
        // rather than being asked to build it. It leaves immediately and
        // decelerates the whole way: the eagerness of an ease-out with the
        // continuity of a spring, which is the combination neither gives on its
        // own.
        //
        // Only from rest. A move already under way has real velocity and must
        // keep it; that carry-through is the whole reason this is a spring.
        //
        // Off THIS move's omega, not the base one. `OMEGA` is the stiffness of
        // a zero-distance move, the stiffest the spring ever gets, so reading
        // it here launched every longer move at a speed its own softer spring
        // would never have produced. "Never overshoots" is a guarantee about a
        // spring released from REST; hand one enough initial velocity and it
        // sails past the target and comes back, so the longest moves were the
        // only ones that could. Measured before the fix: a two-card move
        // covering its whole distance in 200ms at a peak of 3784 px/s, against
        // 367ms for a single card.
        velocityRef.current = gapCards * omegaRef.current * LEAP;
      }

      // Everything this move will cross, in the tree before the first frame of
      // it rather than as each card reaches the edge of the rake.
      reveal(posRef.current, target);

      const track = trackRef.current;
      const width = widthRef.current;

      // Reduce Motion gets the destination, not the journey. So does a rake
      // that has not been measured yet.
      if (flatRef.current || !track || !width) {
        posRef.current = lap(target);
        targetRef.current = posRef.current;
        velocityRef.current = 0;
        if (track) {
          delete track.dataset.moving;
          delete track.dataset.live;
        }
        paint(true);
        return;
      }

      const path = springPath(
        posRef.current,
        target,
        velocityRef.current,
        omegaRef.current,
      );

      // Already there. Handing the compositor a zero-length animation would
      // only mean cancelling it again a frame later.
      if (path.samples.length < 2 || path.duration <= 0) {
        posRef.current = lap(target);
        targetRef.current = posRef.current;
        velocityRef.current = 0;
        paint(true, true);
        return;
      }

      // Two flags, because the compositor and the eye stop caring at different
      // moments. `live` holds the layer promotion for as long as anything is
      // animating; `moving` runs until the rake LOOKS as though it has arrived,
      // and is what holds off the cards' own paint work: the rim sweep, the
      // shadow transitions, the depth of field. See SETTLED, and
      // `.u-cf-track[data-moving]` in globals.css.
      track.dataset.live = 'true';
      track.dataset.moving = 'true';

      const scene: Scene = {
        cells,
        width,
        flat: false,
        gap,
        falloff,
        shrink,
        converge,
        rotate,
        fade,
      };
      const nodes = Array.from(track.children) as HTMLElement[];
      const last = path.samples.length - 1;

      const anims: Animation[] = [];
      nodes.forEach((cell, index) => {
        // A cell `reveal` left out of the tree is not on the rake for any part
        // of this move. `paint` restores it whenever it is next wanted.
        if (cell.style.display === 'none') return;

        const frames = path.samples.map((sample, i) => {
          const spot = place(index, sample.pos, scene);
          return {
            // The final offset is written rather than divided, because a
            // keyframe list whose last offset lands at 0.9999999 is a keyframe
            // list the browser holds a fraction short of its own end.
            offset: i === last ? 1 : sample.t / path.duration,
            transform: spot.transform,
            opacity: spot.opacity,
          };
        });

        anims.push(
          cell.animate(frames, {
            duration: path.duration * 1000,
            // The spring is already in the keyframes, evenly spaced in time.
            // Any easing here would be a second curve laid over the first.
            easing: 'linear',
            fill: 'forwards',
          }),
        );
      });

      moveRef.current = { anims, path, clock: anims[0] ?? null };

      // ── STACKING ORDER IS THE ONE THING KEYFRAMES CANNOT CARRY ───────────
      //
      // `z-index` is not animatable, and it genuinely has to change part way
      // through a move: the card coming to the middle has to cross in FRONT of
      // the one leaving, and they trade places exactly where they are
      // equidistant from it. Swapped at the end of the move the incoming card
      // would slide underneath its neighbour for the whole journey; swapped at
      // the start it would pop over it before it had gone anywhere.
      //
      // The path already knows when every crossing happens, so the swaps are
      // scheduled rather than watched for. A one-card move has one of them.
      let previous = '';
      for (let i = 0; i <= last; i += STACK_EVERY) {
        const at = path.samples[i]!;
        const depth = stackOrder(
          nodes.map((_, index) => Math.abs(cellOffset(index, at.pos, cells))),
        );
        const key = depth.join(',');
        if (key === previous) continue;
        previous = key;

        const apply = () => {
          nodes.forEach((cell, index) => {
            const z = String(depth[index]);
            if (cell.style.zIndex !== z) cell.style.zIndex = z;
          });
        };
        if (at.t === 0) apply();
        else after(at.t, apply);
      }

      // ── THE THREE MOMENTS THE CARDS THEMSELVES RESPOND TO ────────────────
      //
      // Each of these was a comparison the old loop re-made on every frame, and
      // each is really one instant that a solved path can name in advance.

      // The card at the destination becomes THE card, and starts its arrival
      // sequence. Only the flag: a full paint here would also retire the cells
      // leaving the far end of the rake, and at this point they are still
      // visibly fading rather than gone.
      after(path.activeAt, () => flagActive(target));

      // The rake has arrived as far as anything anyone can see is concerned.
      // `moving` is cleared BEFORE the paint, so the depth of field the paint
      // writes lands in a frame the CSS is willing to show it in and therefore
      // eases in rather than being suppressed and snapping a frame later.
      after(path.settledAt, () => {
        delete track.dataset.moving;
        posRef.current = target;
        paint(true, false);
      });

      // And the arithmetic finishes. Retiring cells out of the tree is held
      // back to here regardless: it is the one thing in the scene that costs a
      // layout, and there is no reason to spend it while the rake is drawing.
      after(path.duration, () => {
        const move = moveRef.current;
        moveRef.current = null;
        posRef.current = lap(target);
        targetRef.current = posRef.current;
        velocityRef.current = 0;
        // Same order as `freeze`: state the resting scene, then release the
        // animations onto it.
        paint(true, true);
        move?.anims.forEach((anim) => anim.cancel());
        delete track.dataset.live;
        // Nothing to re-anchor. The hover guard counts distance travelled
        // rather than remembering a position, so it is already correct here
        // whether the hand moved during the settle or not. See `hoverPathRef`.
      });
    },
    [
      after,
      cells,
      converge,
      fade,
      falloff,
      flagActive,
      freeze,
      gap,
      indexAt,
      lap,
      paint,
      reveal,
      rotate,
      shrink,
    ],
  );

  /**
   * ── ONE CARD COMES FORWARD PER HOVER, IN ONE MOVEMENT ────────────────────
   *
   * This walked the rake one card per settle for a while: hovering the card two
   * out brought its neighbour to the centre, let it land, and only then went on
   * to the card actually pointed at. The reasoning was that every card passing
   * through the middle should be a state the carousel was really in rather than
   * something the eye caught mid-flight.
   *
   * It is wrong, and for a reason worth writing down: the point of the gesture
   * is the card under the pointer. Stepping makes a card the user did not
   * choose arrive, settle and leave again on the way — so ONE hover visibly
   * brings TWO cards forward, which is the opposite of what the stepping was
   * for. The intermediate card reads as a mistake being corrected.
   *
   * So a hover is one continuous move to the card hovered, however far it is.
   * Distance is paid for in TIME instead — see the duration in `settle` — which
   * is what keeps a two-card move from being twice as fast as a one-card move.
   */
  const goTo = useCallback(
    (index: number) => {
      // Take the shorter way round rather than unwinding the whole ring.
      settle(index + Math.round((targetRef.current - index) / count) * count);
    },
    [count, settle],
  );

  // ── Pointer ───────────────────────────────────────────────────────────────

  /**
   * ── WHY THIS DOES NOT USE setPointerCapture ──
   *
   * Capturing the pointer on the frame is the textbook way to keep a drag alive
   * once the pointer leaves the element, and it quietly breaks the cards.
   *
   * Pointer capture retargets the pointer events to the capturing element, so
   * `pointerdown` and `pointerup` both fire on the FRAME. The click a browser
   * synthesises afterwards is dispatched at the common ancestor of those two
   * targets — the frame — and never at the anchor the user actually pressed. So
   * the cards stop navigating, and the click delegation on the cell stops
   * running too. Measured: `click.target` was `div.u-cf-frame`, with the anchor
   * nowhere in the event's path.
   *
   * Window listeners get the same "drag continues outside the element" without
   * touching event targeting, so the anchor keeps its click and middle-click,
   * cmd-click and "copy link address" all keep working.
   */
  const detachRef = useRef<(() => void) | null>(null);

  const onDragMove = useCallback(
    (event: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || drag.id !== event.pointerId) return;

      const pitch = widthRef.current * (1 + gap);
      if (!pitch) return;

      const previous = posRef.current;
      const moved = event.clientX - drag.x;
      drag.travel = Math.max(drag.travel, Math.abs(moved));
      posRef.current = drag.pos - moved / pitch;
      // A drag has no destination but the one under your thumb right now, and
      // `paint` reads this to decide which card is THE card. Left at the value
      // pointerdown froze it at, dragging would expand the card you started
      // from and nothing else.
      targetRef.current = posRef.current;

      // Cards per second, for the throw.
      const elapsed = Math.max(event.timeStamp - drag.time, 1);
      drag.velocity = ((posRef.current - previous) / elapsed) * 1000;
      drag.time = event.timeStamp;

      // React bails out when the value is unchanged, which it is for most of a
      // drag — so this is one comparison per pointermove, not a render.
      setSelected(indexAt(posRef.current));
      paint();
    },
    [gap, indexAt, paint],
  );

  const onDragEnd = useCallback(
    (event: PointerEvent) => {
      detachRef.current?.();
      const drag = dragRef.current;
      if (!drag || drag.id !== event.pointerId) return;
      dragRef.current = null;
      travelRef.current = drag.travel;

      // Let a flick carry, but never more than two cards.
      const carried = Math.max(-2, Math.min(2, drag.velocity * 0.18));
      settle(Math.round(posRef.current + carried));
    },
    [settle],
  );

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    // Let a secondary click through untouched.
    if (event.button !== 0) return;

    // A hand on the rake outranks anything it was doing on its own, and takes
    // it over from exactly where it had got to. `freeze` is what makes the
    // handover seamless: it lifts the live position out of the animation in
    // flight before cancelling it, so a press mid-move continues the move
    // rather than snapping it anywhere.
    freeze();
    targetRef.current = posRef.current;
    velocityRef.current = 0;
    // A drag puts the rake wherever the hand says, so nothing after it is
    // sitting in the wake of a move the carousel made on its own.
    hoverPathRef.current = Infinity;
    travelRef.current = 0;
    // A drag outranks a hover that has not fired yet.
    cancelHoverIntent();
    if (event.pointerType !== 'mouse') lastTouchRef.current = event.timeStamp;

    // A drag is motion too, and it is the one kind whose destination cannot be
    // known in advance — so the whole ring comes in now, while the pointer is
    // still down and nothing is moving, rather than a card at a time as the
    // drag reaches each one. `data-moving` is set here for the same reason it
    // is set in `settle`: it is what holds the cards' own paint work off for
    // the duration. `onDragEnd` always ends in a `settle`, which owns clearing
    // it again.
    if (trackRef.current) {
      trackRef.current.dataset.moving = 'true';
      trackRef.current.dataset.live = 'true';
    }
    reveal(0, cells);

    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      pos: posRef.current,
      velocity: 0,
      time: event.timeStamp,
      travel: 0,
    };

    detachRef.current?.();
    window.addEventListener('pointermove', onDragMove);
    window.addEventListener('pointerup', onDragEnd);
    window.addEventListener('pointercancel', onDragEnd);
    detachRef.current = () => {
      window.removeEventListener('pointermove', onDragMove);
      window.removeEventListener('pointerup', onDragEnd);
      window.removeEventListener('pointercancel', onDragEnd);
      detachRef.current = null;
    };
  };

  /**
   * Start — or restart — the wait for the pointer to come to rest on a card.
   *
   * Restarting is the whole mechanism: every `pointermove` that carries the
   * pointer further than HOVER_STILL throws this timer away and sets another,
   * so it can only ever expire in a gap between moves. A hand crossing the rake
   * never produces one; a hand that stops does, once, on the card it stopped
   * over. See HOVER_INTENT.
   *
   * The anchor is written when the timer FIRES rather than when it is set, so
   * it records where the hand actually was at the moment the rake committed —
   * which is what the guard in `onCellEnter` measures against.
   */
  /**
   * Which SLIDE is under a given viewport x — worked out from the same
   * arithmetic that painted the rake, rather than by asking the DOM what is
   * there.
   *
   * ── WHY THE DOM CANNOT BE ASKED ─────────────────────────────────────────
   *
   * The cards are turned up to 58° under a `perspective`, and Chrome does not
   * hit-test the half of a rotated element that recedes from the viewer. It
   * paints it perfectly and then reports nothing there. This is the same defect
   * the block at the top of this file records for negative `translateZ`, and it
   * arrives here through rotation instead — which is why that block's advice
   * (avoid translateZ) was followed and the problem persisted anyway.
   *
   * Scanned with `elementFromPoint` along the card centre line, at rest:
   *
   *     x=284…304   cell 8      <- 20px of a 206px-wide card
   *     x=324…344   nothing
   *     x=364…464   cell 9
   *     x=484…564   nothing     <- 80px of dead frame between two touching cards
   *     x=584…864   cell 0
   *
   * So roughly half of every side card was dead to the pointer, in strips, with
   * no visual boundary to explain them. Hovering a card did nothing; moving on
   * a little found live pixels belonging to a card further along, and the rake
   * jumped past the one that had been pointed at. That is most of what "I hover
   * and nothing happens, then suddenly cards slide" was describing.
   *
   * Geometry has none of that. `paint` already knows exactly where every card
   * is on screen and how wide it is after its scale, so the same numbers answer
   * "which card is at this x" exactly, over the whole rake, with no gaps.
   *
   * Ties go to the card nearest the middle, which is also the one painted on
   * top (see the z-index in `paint`) — so the answer is always the card the eye
   * says is under the pointer.
   */
  const slideAt = useCallback(
    (clientX: number, clientY: number) => {
      const track = trackRef.current;
      const width = widthRef.current;
      if (!track || !width) return null;

      const scene: Scene = {
        cells,
        width,
        flat: flatRef.current,
        gap,
        falloff,
        shrink,
        converge,
        rotate,
        fade,
      };
      // The rake's real position, not the last one painted. During a move the
      // cards are being carried by the compositor and `posRef` is stale by up
      // to a whole card, which would answer this question about a scene that is
      // no longer on screen.
      const pos = livePos().pos;
      const x = clientX - centreXRef.current;

      // The band the cards occupy, read rather than cached, because `clientY`
      // is measured from the viewport and the section moves whenever the page
      // scrolls. Deferred until a card has passed the horizontal test, so a
      // pointer crossing the frame beside the fan costs nothing, and read at
      // most once per pointer move on a layout this component is not dirtying.
      let band: { middle: number; height: number } | null = null;
      const vertical = () => {
        if (!band) {
          const box = track.getBoundingClientRect();
          band = { middle: box.top + box.height / 2, height: box.height };
        }
        return band;
      };

      let best: number | null = null;
      let nearest = Infinity;

      Array.from(track.children).forEach((node, index) => {
        const cell = node as HTMLElement;
        if (cell.dataset.gone === 'true') return;

        const spot = place(index, pos, scene);
        if (spot.distance >= nearest) return;

        const stretch = silhouette(spot, x, width, perspectiveRef.current);
        if (stretch === null) return;

        const { middle, height } = vertical();
        const halfHigh = (height * spot.scale * stretch) / 2;
        if (clientY < middle - halfHigh || clientY > middle + halfHigh) return;

        nearest = spot.distance;
        best = index % count;
      });

      return best;
    },
    [cells, converge, count, fade, falloff, gap, livePos, rotate, shrink],
  );

  /**
   * Has the pointer moved far enough since the rake last committed for this to
   * be a choice rather than a card arriving underneath it? See HOVER_TRAVEL.
   *
   * `Infinity` is the resting state — nothing has moved itself anywhere, so
   * there is no wake for the pointer to be sitting in and everything is
   * eligible.
   */
  const hasTravelled = () =>
    hoverPathRef.current >= Math.max(HOVER_TRAVEL_MIN, widthRef.current * HOVER_TRAVEL);

  const armHoverIntent = (index: number, x: number, y: number) => {
    cancelHoverIntent();
    hoverStillRef.current = { x, y };
    hoverTimerRef.current = window.setTimeout(() => {
      hoverTimerRef.current = null;
      hoverStillRef.current = null;
      // The rake is committing, so this is the moment everything downstream
      // measures from: the hand must travel again before it counts as choosing
      // again, and cards sliding under it in the meantime do not.
      hoverPathRef.current = 0;
      goTo(index);
    }, HOVER_INTENT);
  };

  /**
   * Leaving the section ends the interaction, so the travel guard is dropped
   * with it — a hand that has been somewhere else entirely is not a hand
   * sitting in the wake of a move. Clearing the last position matters too:
   * without it, coming back would count the whole excursion as one enormous
   * step of travel on the first move back inside.
   */
  const onFrameLeave = () => {
    hoverIndexRef.current = null;
    cancelHoverIntent();
    hoverPathRef.current = Infinity;
    pointerPosRef.current = null;
  };

  /**
   * ── ALL OF HOVER, IN ONE HANDLER ────────────────────────────────────────
   *
   * This used to be split between `pointerenter` on each cell (which card) and
   * `pointermove` on the frame (has the hand stopped), and neither half could
   * answer its question properly. `pointerenter` reports the moments a boundary
   * is crossed, and it only fires where the DOM agrees a card exists — which
   * over half of every rotated card, and all of the ring's copies, it did not.
   * `pointermove` fires everywhere and knew nothing about cards.
   *
   * `slideAt` gives the frame the half it was missing, so the frame can own the
   * whole gesture: which card, whether the hand has settled on it, and whether
   * the hand has moved since the rake last committed. Every one of those is a
   * question about a pointer that may never cross anything.
   */
  const onFrameMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    // Unconditional, and read by the landing move in `settle`.
    const previous = pointerPosRef.current;
    pointerPosRef.current = { x: event.clientX, y: event.clientY };
    if (previous) {
      hoverPathRef.current += Math.hypot(
        event.clientX - previous.x,
        event.clientY - previous.y,
      );
    }

    if (event.pointerType !== 'mouse' || dragRef.current) return;
    // The ghost mouse events a tap leaves behind — see `lastTouchRef`.
    if (event.timeStamp - lastTouchRef.current < GHOST_MOUSE_WINDOW) return;

    const index = slideAt(event.clientX, event.clientY);
    const moved = index !== hoverIndexRef.current;
    hoverIndexRef.current = index;

    // Off the rake entirely, or already looking at the card that is coming.
    if (index === null || index === indexAt(targetRef.current)) {
      cancelHoverIntent();
      return;
    }
    // A card the rake put under the hand, rather than one the hand went to.
    if (!hasTravelled()) return;

    // Onto a different card: aim at it immediately. Otherwise push the pending
    // wait back for as long as the hand keeps travelling, so it can only expire
    // once the hand has stopped — which is what makes one sweep across the rake
    // produce one move instead of one per card crossed.
    const still = hoverStillRef.current;
    if (!moved && still) {
      if (Math.hypot(event.clientX - still.x, event.clientY - still.y) < HOVER_STILL) return;
    }
    armHoverIntent(index, event.clientX, event.clientY);
  };

  /**
   * Click and focus are handled on the CELL, not on the card.
   *
   * Both events reach it — React's `onFocus` is `focusin`, which bubbles — so
   * delegating keeps the card element purely presentational and keeps
   * ref-reading closures out of `cloneElement`. That second point is not a lint
   * workaround: `cloneElement` is a call made DURING render, and handing it a
   * function that reads `travelRef.current` is genuinely indistinguishable, to
   * a reader, from reading that ref during render.
   *
   * ── Why the click is on the CAPTURE phase ──
   *
   * `next/link` attaches its navigation to the anchor's own `onClick`, and the
   * anchor is the target — so on the bubble phase it has already navigated by
   * the time the cell hears anything. Tapping a side card on a phone went
   * straight to the pillar page instead of bringing the card to the centre.
   *
   * Capture runs root-downward, so the cell sees the click first and can cancel
   * it. Next reads `e.defaultPrevented` at the top of its handler
   * (node_modules/next/dist/client/app-dir/link.js) and returns, so
   * `preventDefault()` alone is enough — no `stopPropagation`, and the anchor
   * keeps behaving like an anchor for everything this does not cancel.
   */
  const onCardClick = (index: number, event: ReactMouseEvent<HTMLDivElement>) => {
    // Modified clicks belong to the browser. cmd/ctrl-click opens a new tab and
    // must keep doing so even on a card that is not currently centred.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    // A drag that ends on a card is not a click on it.
    if (travelRef.current > DRAG_SLOP) {
      event.preventDefault();
      return;
    }
    // A card that is not centred is a target, not a destination: the first
    // click brings it in, the second follows the link. That is also what makes
    // this work on touch, where there is no hover to bring it in first.
    if (index !== indexAt(targetRef.current)) {
      event.preventDefault();
      goTo(index);
    }
  };

  /**
   * Keyboard focus drives the rake. Pointer focus must not.
   *
   * Tabbing to a card should bring it to the centre — otherwise a keyboard user
   * is reading a card that is rotated 48° away from them. But pressing a card
   * also focuses it, and focus fires BEFORE click, so centring on every focus
   * meant a press on a side card centred it a few milliseconds before its own
   * click arrived. The click then found the card already centred and followed
   * the link, which is precisely the two-step this component exists to avoid:
   * one press on a distant card jumped straight to the pillar page instead of
   * bringing it in to be read. It looked like the click handler was broken; the
   * click handler was correct and the state it read had already moved.
   *
   * `:focus-visible` is the platform's own answer to "did this focus come from
   * the keyboard", and it is the same signal the site's focus ring uses, so the
   * rake now moves exactly when a focus ring appears.
   */
  const onCardFocus = (index: number, event: ReactFocusEvent<HTMLDivElement>) => {
    if (!(event.target as HTMLElement).matches(':focus-visible')) return;
    if (index !== indexAt(targetRef.current)) goTo(index);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();

    const by = event.key === 'ArrowLeft' ? -1 : 1;
    const next = indexAt(targetRef.current + by);
    settle(Math.round(targetRef.current) + by);
    // Focus moves with the rake. Centring a card while focus stays on the one
    // that just left the middle puts the focus ring and the visible selection
    // on two different cards.
    linkAt(next)?.focus();
  };

  /**
   * The other half of what `inert` used to do: keep Tab out of the copies.
   *
   * `aria-hidden` alone would leave five duplicate links in the focus order,
   * and `aria-hidden` on a container that still holds focusable descendants is
   * worse than either problem on its own — a keyboard user lands on a link the
   * screen reader has been told does not exist.
   *
   * Written to the DOM rather than passed as a prop because the anchors are the
   * CALLER's elements, arriving through `slides[].card` across the Server →
   * Client boundary; nothing here may clone them or read their props (see the
   * note on CARD_CLASS). React does not manage `tabIndex` on an element that
   * never declared it, so this survives re-renders.
   */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    Array.from(track.children)
      .slice(count)
      .forEach((cell) => {
        cell
          .querySelectorAll<HTMLElement>('a[href], button, input, select, textarea, [tabindex]')
          .forEach((node) => {
            node.tabIndex = -1;
          });
      });
  }, [count, slides]);

  /**
   * Re-solve the move in flight, or say there was none.
   *
   * A precomputed path is baked against the card width it was built at, so
   * anything that changes the scene under a running move invalidates every
   * keyframe in it. Rather than let the rake finish against a geometry that no
   * longer exists, the move is taken back and re-issued from where it had got
   * to, at the speed it was going, toward the same card.
   */
  const rebuild = useCallback(() => {
    if (!moveRef.current) return false;
    const to = targetRef.current;
    freeze();
    settle(to, velocityRef.current);
    return true;
  }, [freeze, settle]);

  // ── Measurement ───────────────────────────────────────────────────────────

  // Card width drives pitch, depth and perspective, so it is the only thing
  // worth measuring, and only when the box actually changes.
  useIsoLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const measure = () => {
      // Any cell will do, but it has to be one that is actually rendered — the
      // ring's copies drop to `display: none` when they are off the rake, and
      // a `display: none` element measures zero.
      const track = trackRef.current;
      const rendered = track && Array.from(track.children).find(
        (c) => (c as HTMLElement).offsetWidth > 0,
      );
      if (!rendered) return;
      widthRef.current = (rendered as HTMLElement).offsetWidth;
      const box = track.getBoundingClientRect();
      centreXRef.current = box.left + box.width / 2;
      // `none` parses to NaN, which the hit test reads as "no projection" and
      // falls back to the un-projected box for.
      perspectiveRef.current = parseFloat(getComputedStyle(frame).perspective) || 0;
      if (!rebuild()) paint(true);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [paint, rebuild]);

  /**
   * Flatten the scene when the OS asks for less motion, or when the viewport is
   * too narrow for a rake to be depth rather than clutter.
   *
   * Both land on the same flag because they want the same thing. Reduce Motion
   * is Apple's own modifier for this material — it "decreases the intensity of
   * the effect and disables elastic properties", and a card flying toward the
   * viewer is the elastic part. A phone has no room for the rake at all. The
   * carousel keeps working either way: drag, tap, arrow keys and the dots are
   * all untouched, and the centred card still expands.
   */
  useEffect(() => {
    const queries = [window.matchMedia(REDUCED_MOTION), window.matchMedia(NARROW)];

    const sync = () => {
      flatRef.current = queries.some((query) => query.matches);
      // Flattening changes what every keyframe of a move in flight says, so the
      // move is re-issued rather than allowed to finish against the old scene.
      // In flat mode `settle` jumps straight to the destination, which is the
      // right answer the moment Reduce Motion comes on.
      if (!rebuild()) paint(true);
    };

    sync();
    queries.forEach((query) => query.addEventListener('change', sync));
    return () => queries.forEach((query) => query.removeEventListener('change', sync));
  }, [paint, rebuild]);

  useEffect(
    () => () => {
      // The move in flight owns compositor animations and a handful of timers.
      clearTimers();
      moveRef.current?.anims.forEach((anim) => anim.cancel());
      // A drag in flight owns three window listeners. Unmounting mid-drag, on a
      // route change while the pointer is down, would otherwise leave them
      // attached to a component that no longer exists.
      detachRef.current?.();
      if (hoverTimerRef.current !== null) window.clearTimeout(hoverTimerRef.current);
    },
    [clearTimers],
  );

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div
      className={cx('u-cf', className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div
        ref={frameRef}
        className="u-cf-frame"
        onPointerDown={onPointerDown}
        onPointerMove={onFrameMove}
        onPointerLeave={onFrameLeave}
        onKeyDown={onKeyDown}
      >
        <div ref={trackRef} className="u-cf-track">
          {Array.from({ length: cells }, (_, cellIndex) => {
            const index = cellIndex % count;
            const slide = slides[index]!;
            const copy = cellIndex >= count;
            return (
            <div
              key={`${slide.id}${copy ? '-copy' : ''}`}
              className="u-cf-cell"
              // The copies carry no semantics — see `cells` for why this is
              // `aria-hidden` and not `inert`. They DO take pointer events,
              // because to a mouse they are simply the card that is on screen
              // at that moment; a hover on one centres the slide it depicts,
              // which is the real one, and the ring arithmetic in `goTo`
              // already resolves to the lap the copy is sitting on.
              aria-hidden={copy || undefined}
              onClickCapture={(event) => onCardClick(index, event)}
              onFocus={(event) => onCardFocus(index, event)}
            >
              {/* The glass surface. `u-glass-interactive` owns its own hover
                  lift and gel press, which is exactly why it may not be the
                  element the paint loop writes to — see `.u-cf-cell` in
                  globals.css. The caller's anchor sits inside it and fills it,
                  so hovering the link hovers the glass, and `:focus-within`
                  gives a keyboard user the same response a mouse gets. */}
              <div className={CARD_CLASS} role="group" aria-roledescription="slide">
                {slide.card}
              </div>
            </div>
            );
          })}
        </div>
      </div>

      {/* ── The dots ──────────────────────────────────────────────────────
          THE BUTTON IS NOT THE DOT. It was, and on a phone that made the
          carousel's primary control a 6×6px target. Measured on an iPhone 14
          Pro, where the rake is flattened (see the `NARROW` effect above) and
          these dots are therefore the main way to move between slides, not a
          decorative position readout as they are on a desktop with hover, drag
          and arrow keys available.

          So the button is a 44px-tall strip with the dot painted by a span
          inside it, which is how UIPageControl is built and why Apple's dots
          look far too small to hit and are not. The visual result here is
          unchanged to within a pixel: `px-2` puts 16px between neighbouring
          dots against the 10px the old flex `gap` gave, so the row reads the
          same and every target grew from 6×6 to 22×44 with no two overlapping.

          `transition-[width,opacity]` rather than `transition-all`: the only
          two properties that change are width and opacity, and `all` also
          animates the inherited `color` behind `bg-current`, so a dot crossing
          a section boundary faded through an intermediate colour. */}
      <div className="flex items-center justify-center">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Show ${slide.label}`}
            aria-current={index === selected}
            onClick={() => goTo(index)}
            className="group grid h-11 place-items-center px-2"
          >
            <span
              aria-hidden="true"
              className={cx(
                'block h-1.5 rounded-pill transition-[width,opacity] duration-[260ms]',
                // `bg-current`, so the dots take the section's own text colour.
                // Hardcoding white assumed a dark stage and left them invisible
                // the moment the stage went light.
                'bg-current',
                index === selected
                  ? 'w-7 opacity-90'
                  : 'w-1.5 opacity-30 group-hover:opacity-60',
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
