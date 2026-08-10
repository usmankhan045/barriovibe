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
 * keyboard user able to reach three of the five disciplines. The copies are
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
 * OMEGA is its natural frequency in rad/s — raise it for a quicker carousel,
 * lower it for a more languid one. It is the one number to reach for; the
 * damping is derived from it (2ω, critical) so the spring can never be tuned
 * into overshooting by accident.
 *
 * ── Why not something chosen by feel ──
 *
 * It was 10, and that settled in about 1.2 seconds. Measured against what this
 * kind of component actually does elsewhere, that was roughly triple:
 *
 *   Swiper — the most widely used carousel library — defaults to 300ms
 *   per slide. Apple's Human Interface Guidelines put interface motion at
 *   0.2–0.5s and say that past 0.7s motion "drags user attention, increasing
 *   perceived latency".
 *
 * A critically damped spring reaches 95% of its travel at ωt ≈ 4.74, so a
 * 0.32s move wants ω ≈ 14.8; REACH_SLOW divides ω by 1.22 at one card, hence
 * 18. That lands one card at ~0.32s and two at ~0.38s — inside Apple's range
 * at both ends, and next to Swiper's default for the common case.
 *
 * ── The pair is tuned so that DISTANCE BUYS TIME, NOT SPEED ──
 *
 * REACH_SLOW softens ω as the distance grows. The two numbers are therefore
 * one setting, and the thing they are set against is not either duration on its
 * own — it is the SPEED of a long move against a short one. A carousel that
 * covers two cards in barely more time than one is not "quicker", it whips, and
 * that is the complaint every earlier round of tuning here was chasing.
 *
 * Measured in a browser rather than derived, hovering one card out and then two
 * (time until the rake is within about three pixels of home, and the fastest
 * the cards ever travel):
 *
 *     OMEGA  REACH_SLOW    one card         two cards        verdict
 *      16       0.22      0.36s  ~1500px/s  0.43s  2600px/s  whips
 *      26       1.2       0.50s  1748px/s   0.87s  1439px/s  drags
 *      25       0.8       0.42s  1859px/s   0.70s  1873px/s  <- this
 *
 * The last row is the point: the peak speeds match to within 1%, so two cards
 * take 1.7x as long as one because they are twice as far, not because anything
 * accelerated. That is what "reads as further rather than merely faster" has to
 * mean to be worth saying.
 *
 * One card at 0.42s also sits beside the deck in "Why choose us", which opens
 * over 520ms and is the piece of motion on this site that reads as unhurried —
 * two components a screen apart should not run at visibly different speeds. Two
 * cards at 0.70s is the longest move the rake can make and lands on Apple's
 * limit, which is the right place for the rarest case.
 *
 * REST / REST_V are how close counts as arrived. Critical damping has a famously
 * long tail — it approaches without ever quite landing — so the threshold is
 * what actually decides when the animation stops. Set it below one pixel of
 * travel and the eye cannot tell; set it lower still and rAF simply runs on for
 * another half second for nothing.
 *
 * REST moved with OMEGA, and it had to. The tail is measured in ω⁻¹, so
 * softening the spring by a third lengthened it by the same third — the rake
 * would have gone on creeping for 200ms after it had visibly stopped. That is
 * not a smoothness cost (the frames are pure compositing) but it delays
 * everything that waits on the rake having landed: the depth of field, the
 * material's hover, the `will-change` coming back off. 0.006 of a card is
 * about a pixel and a half of travel abandoned in the frame the spring stops,
 * at a point where it is moving slower than that per frame anyway.
 */
const OMEGA = 25;
const REACH_SLOW = 0.8;
/**
 * How much of its eventual speed the spring is handed at the instant it starts,
 * as a fraction of `gap × OMEGA`. Zero is a textbook spring, and reads as
 * reluctant. Too high and it lurches. See the note at the call site.
 *
 * The spring leaves at half the speed it would eventually reach and decelerates
 * from there for the whole of the travel, which is the shape of an ease-out —
 * an eager departure and a long settle.
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
 * only while this stays at or below 1 — that guarantee is about a spring
 * released from REST, and this releases it moving.
 *
 * Worth stating because it was being violated without the constant changing:
 * the leap read the base OMEGA while the spring ran at a softened one, so the
 * EFFECTIVE leap on a long move was OMEGA/ω times this — 1.7 at the old
 * softening, 3.4 at the current one. See the call site.
 */
const LEAP = 0.5;
/* Sub-pixel: one card of travel is ~240px on a desktop, so 0.003 of a card is
   under three quarters of a pixel. Tighter than this and the loop keeps running
   for another half second to move a distance nothing can display. */
/** Integration step, in seconds. See the loop — this is what makes the spring
 *  behave the same at 120Hz, 60Hz and a throttled 30Hz. */
const SUBSTEP = 1 / 240;
const REST = 0.006;
const REST_V = 0.03;

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
  const rafRef = useRef<number | null>(null);

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
   * `final` means "the rake has stopped" — a resize, a media-query flip, or the
   * frame the spring rests on. It is what separates the two kinds of work below.
   *
   * Everything the loop does per frame is compositor work — a `transform` and
   * an `opacity`, both written to a cell that `will-change` has promoted, and
   * nothing else. Those two properties are the entire list of what a
   * compositor can change without waking a rasteriser, and a promoted layer is
   * the condition on which they qualify. Five cards then move for nothing.
   *
   * Nothing else may be added to the per-frame path. Every value that used to
   * be here — the depth-of-field filter, `--cf-near`, `display` — cost a
   * repaint of a card built from four gradients and a column of text, on every
   * frame of every move. They are now either a flag CSS transitions off, or
   * work that waits for `final`.
   *
   * The two things that DO cost — the depth-of-field filter, and dropping a
   * retired cell out of the tree — happen only on a final paint. Both were
   * previously evaluated every frame, and both are about where a card has
   * ARRIVED, which is a question a moving rake has no answer to anyway.
   */
  const paint = useCallback((final = false, prune = final) => {
    const width = widthRef.current;
    const track = trackRef.current;
    if (!width || !track) return;

    const pitch = width * (1 + gap);
    const pos = posRef.current;
    const flattened = flatRef.current;
    /**
     * Whether the rake has effectively arrived, and which SLIDE it arrived at.
     *
     * ── A SLIDE, NOT A CELL, AND THAT MATTERS AT THE WRAP ───────────────────
     *
     * Every slide is rendered twice (see `cells`), and when the spring rests
     * `lap` folds `pos` back into the first lap — which hands the middle from
     * one copy of a card to the OTHER copy of the same card. Nothing moves on
     * screen; the two are identical and co-located. But if `[data-cf-active]`
     * is a property of the CELL, it moves with the fold: the cell that was
     * arriving loses it and its twin gains it, from a standing start.
     *
     * The twin's detail block is at opacity 0, so it replays the whole arrival
     * sequence — 110ms of delay and 300ms of fade — on a card that has already
     * been sitting in the middle. The blurb visibly starts appearing, stops,
     * and appears again. Measured on one hover: `centred cell 8`, then
     * `centred cell 3`, both the same card, 200ms apart.
     *
     * Asking about the slide instead makes the fold a non-event: BOTH copies
     * carry the flag the whole time, so when they trade places there is nothing
     * to transition. The hidden twin having it costs nothing — it is
     * `visibility: hidden` and cannot be hovered or seen.
     *
     * Arrival is measured on the RAKE (how near `pos` is to its target) rather
     * than on each card's own distance, which is what keeps a card merely
     * passing through the middle on a two-card move from lighting up as though
     * it were the destination.
     */
    const arrived = Math.abs(targetRef.current - pos) < ACTIVE_RANGE;
    const activeSlide = ((Math.round(targetRef.current) % count) + count) % count;

    Array.from(track.children).forEach((node, index) => {
      const cell = node as HTMLElement;
      const card = cell.firstElementChild as HTMLElement | null;
      if (!card) return;

      // ── THE RING IS DOUBLED, AND THAT IS WHAT MAKES IT SMOOTH ────────────
      //
      // A ring has to teleport a card from one end to the other, and it can
      // only get away with it where nobody is looking. With five cells the fold
      // sat 2.5 cards out while the rake showed cards 2 out — the wrap-point
      // was INSIDE the visible fan, and the only cover available was to fade a
      // card to nothing across the half-card before it. Measured on a far
      // hover, one card's opacity frame by frame:
      //
      //     0.86 → 0.63 → 0.42 → 0.24 → 0.03 → 0.37 → 0.53 → 0.70 → 0.86
      //
      // A fully visible card vanishing and returning inside ~300ms, twice per
      // hover. That is the "pop", and no amount of slowing the move fixes it —
      // a longer move just stretches the blink out.
      //
      // Every card is therefore rendered TWICE and the ring is `cells` long,
      // so the fold happens `count` cards out — five, against a fan that shows
      // under three. Nothing crosses the wrap-point while it is visible, which
      // means nothing has to be faded to hide it, which means the outer cards
      // can stay at full strength. `pos` is kept inside one lap (see `land`),
      // so the copies that carry focus are always the ones on screen.
      let offset = (((index - pos) % cells) + cells) % cells;
      if (offset > cells / 2) offset -= cells;

      const distance = Math.abs(offset);
      // Both the tilt and the shrink ease off as cards travel out — doubling
      // the distance adds only about half again as much of each. A linear ramp
      // folds the second card shut; this keeps it readable.
      const ramp = Math.pow(distance, falloff);
      const scale = 1 - shrink * ramp;

      // Perspective is what pulls distant cards toward the vanishing point, and
      // with no translateZ to supply it (see the block above) the rake spaces
      // its cards on a flat linear pitch. That is the whole reason the ends of
      // the ribbon came apart: a card two out is turned nearly edge-on and
      // scaled down, so it covers a fraction of the width it did at rest, while
      // still sitting twice as far from the middle. The result was a tight fan
      // in the centre with two cards floating off the ends of it.
      //
      // This is that convergence, applied directly. The curve is rational
      // rather than a power of `distance`, and that is the point: `d^0.56` has
      // a vertical tangent at zero, so a card crossing the middle would lurch.
      // This one is exactly linear at the centre — a drag tracks the pointer
      // one-to-one there — and tightens only as cards travel out.
      const spread = offset / (1 + converge * distance);

      cell.style.transform = flattened
        ? // No rake and no tilt. Only the offset, the scale and the fade
          // survive, so the centred card is still obvious without anything
          // rotating or flying toward the viewer.
          `translateX(calc(-50% + ${offset * width * 1.06}px)) scale(${scale})`
        : // Capped short of edge-on so a far card never turns its back.
          `translateX(calc(-50% + ${spread * pitch}px)) ` +
          // Capped well short of edge-on. At 78° a far card was 50px of
          // visible width — a sliver that read as a seam rather than a card,
          // and the thing the ribbon had to stretch around. These cards carry
          // TEXT, which is the difference from the image carousel this is
          // modelled on: a sliver of album art still reads as album art, and a
          // sliver of a card is a title sheared in half.
          `rotateY(${-Math.min(rotate * ramp, 58) * Math.sign(offset)}deg) ` +
          `scale(${scale})`;

      const depth = String(100 - Math.round(distance * 10));
      if (cell.style.zIndex !== depth) cell.style.zIndex = depth;

      // ── THE FADE IS ON THE CELL, AND THAT IS THE WHOLE POINT ─────────────
      //
      // It was on the CARD, one element down, and that one step is the
      // difference between a compositor write and a repaint of everything the
      // card is made of — a conic gradient, three radial gradients and a
      // column of text — sixty times a second, on five cards at once.
      //
      // `transform` and `opacity` are the only two properties a compositor can
      // change without a rasteriser, and even they only qualify on an element
      // that HAS a layer. The cell has one: it is promoted by `will-change`
      // (see globals.css), which now names opacity as well as transform for
      // exactly this reason. The card inside it has none and never should —
      // promoting five more layers to save a repaint is the wrong trade — so
      // the value simply moves to the element already equipped to take it.
      //
      // Nothing changes on screen. The cell's only child is the card, so
      // fading one and fading the other are the same picture.
      //
      // A card is teleported across the ring at exactly half a turn out, so it
      // has to be gone by then or the jump is visible. Two things multiplied:
      // the gentle per-step fade that gives the rake its depth, and the reach
      // that retires a card once it is past the span the rake shows. Nothing
      // teleports, so neither has to be abrupt.
      const reach = Math.min(1, Math.max(0, (SPAN + SPAN_FADE - distance) / SPAN_FADE));
      const opacity = (Math.max(0, 1 - fade * distance) * reach).toFixed(3);
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
      // sample — the same trap documented on `.u-stage`. Blurring only the copy
      // leaves the material intact, and has the useful side effect of settling
      // the far cards' text down where it shows through the pane in front.
      //
      // `final` only, and this is the loop's single biggest saving. A filter is
      // the one property on these cards that the compositor cannot honour by
      // itself: every change to its value re-RASTERISES the element, and the
      // element is a column of text. Written per frame, per card, it was the
      // rake's per-frame cost — quantising it to a quarter pixel cut the number
      // of rasterisations and never came close to removing them.
      //
      // Nothing is lost by waiting. Depth of field says where a card IS, and
      // five cards mid-slide are not anywhere yet. See `.u-cf-card-body` in
      // globals.css for the CSS half: the filter is dropped outright while the
      // rake moves and eased back in from here.
      if (final) {
        const blur = Math.min(BLUR_MAX, Math.max(0, distance - BLUR_FROM) * BLUR_RATE);
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
      // This was `distance < ACTIVE_RANGE` on each card's own distance and
      // nothing else, and that one omission is what made a two-card hover look
      // like two hovers.
      //
      // Crossing two cards drags the one in between through the middle — it
      // has to, the rake is a strip and there is no way round it. What does
      // NOT have to happen is that card running its whole arrival while it
      // passes: `[data-cf-active]` drives the detail sequence, the lede's
      // rise, the lifted shadow and the full glass material, so an
      // intermediate card expanded, filled in its blurb, lifted, and then
      // shut again inside about 150ms. Measured on a hover of the far card,
      // one gesture:
      //
      //     1245  commit -> slide 3
      //     1305  card 02 became the centred card     <- nobody asked for this
      //     1440  card 03 became the centred card
      //
      // Two cards visibly arriving for one decision, the first of them
      // announcing itself and retracting it. That reads as the carousel
      // changing its mind, and no amount of tuning the spring fixes it,
      // because the spring was doing exactly what it was told.
      //
      // So a card is THE card only if the rake has arrived AND this is the
      // slide it arrived at. An intermediate card still slides through the
      // middle — that is geometry — but it stays a card in transit and says
      // nothing.
      //
      // `targetRef` tracks the pointer during a drag (see `onDragMove`), so
      // dragging still expands whichever card you pull into the centre.
      const active = arrived && index % count === activeSlide;
      if (active !== (cell.dataset.cfActive === 'true')) {
        cell.dataset.cfActive = String(active);
      }

      // Dropping a retired cell out of the tree waits for the rake to stop;
      // hiding it does not. See `setGone`. Revealing one is a no-op here,
      // because `reveal` has already brought in everything this move will
      // cross — it stays as a backstop for the paths that do not go through a
      // settle at all, like the first paint after a resize.
      setGone(cell, reach === 0, index >= count, prune);
    });
  }, [cells, count, fade, falloff, gap, converge, rotate, shrink]);

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

  /**
   * ── A SPRING, NOT A TWEEN ────────────────────────────────────────────────
   *
   * This was a timed tween: pick a duration from the distance, run an easing
   * curve from A to B. It is the obvious way to animate a carousel and it is
   * what made the hover feel like something you had to insist on, for one
   * reason above all others — a tween has no memory of how fast it was already
   * going. Hover a card, then change your mind and hover another while the
   * first move is still running, and the old tween is thrown away and a new one
   * starts from ZERO velocity. The rake stalls dead and sets off again. Do that
   * twice and it feels like the carousel is arguing with the pointer.
   *
   * A spring carries its velocity across that boundary. Point somewhere else
   * mid-flight and the motion simply bends toward the new target at the speed
   * it already had. Nothing restarts, nothing stalls, and there is no seam to
   * feel. That continuity is most of what "smooth" actually means here; the
   * easing curve was never the problem.
   *
   * It is also what lets the drag hand over properly. A flick used to be
   * translated into "how many cards would that carry" and then re-animated
   * from a standstill; now the pointer's own velocity IS the spring's starting
   * velocity, so the throw continues rather than being re-enacted.
   *
   * Critically damped, so it never overshoots — a card that sails past the
   * middle and comes back reads as sloppy on something carrying text. What
   * gives it life instead is that the deceleration is real physics rather than
   * the tail of a bezier.
   */
  const settle = useCallback(
    (target: number, velocity?: number) => {
      const gap = target - posRef.current;
      targetRef.current = target;
      omegaRef.current = OMEGA / (1 + REACH_SLOW * Math.min(Math.abs(gap), 3));
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
        // decelerates the whole way — the eagerness of an ease-out with the
        // continuity of a spring, which is the combination neither gives on its
        // own.
        //
        // Only from rest. A move already under way has real velocity and must
        // keep it; that carry-through is the whole reason this is a spring.
        //
        // ── OFF THIS MOVE'S OMEGA, NOT THE BASE ONE ─────────────────────────
        //
        // This read `OMEGA` directly, which is the stiffness of a ZERO-distance
        // move — the stiffest the spring ever gets. Every longer move was
        // therefore launched at a speed its own, softer spring would never have
        // produced, and the further it had to go the worse the mismatch: at the
        // softening the rake now uses, a two-card move was being handed 3.4x
        // the velocity it was tuned for.
        //
        // It is not only fast, it is fast in the one way critical damping does
        // not protect against. "Never overshoots" is a guarantee about a spring
        // released from REST; hand one enough initial velocity and it sails
        // past the target and comes back. So the longest moves — the ones the
        // softening exists to calm — were the only ones that could overshoot.
        // Measured before the fix: a two-card move covering its whole distance
        // in 200ms at a peak of 3784 px/s, against 367ms for a single card.
        velocityRef.current = gap * omegaRef.current * LEAP;
      }

      // Everything this move will cross, in the tree before the first frame of
      // it rather than as each card reaches the edge of the rake.
      reveal(posRef.current, target);

      // Reduce Motion gets the destination, not the journey.
      if (flatRef.current) {
        posRef.current = lap(target);
        targetRef.current = posRef.current;
        velocityRef.current = 0;
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        if (trackRef.current) {
          delete trackRef.current.dataset.moving;
          delete trackRef.current.dataset.live;
        }
        paint(true);
        return;
      }

      // Two flags, because the compositor and the eye stop caring at different
      // moments. `live` runs until the integrator has nothing left to do and is
      // what holds the layer promotion; `moving` runs until the rake LOOKS as
      // though it has arrived, and is what holds off the cards' own paint work
      // — the rim sweep, the shadow transitions, the depth of field. See
      // SETTLED, and `.u-cf-track[data-moving]` in globals.css.
      //
      // ── SET BEFORE THE EARLY RETURN BELOW, NOT AFTER ──────────────────────
      // `moving` is now cleared before the loop ends, so a new target arriving
      // during the old move's tail finds the loop still running AND the flag
      // already off. Asserted after the return, it would never come back on:
      // the new move would run with every card free to repaint. Measured that
      // way, a two-card move reported 215ms of `moving` against 932ms of
      // actual travel — the 215ms being the leftovers of the move before it.
      if (trackRef.current) {
        trackRef.current.dataset.live = 'true';
        trackRef.current.dataset.moving = 'true';
      }

      // Already running: the loop below reads `targetRef` every frame, so a new
      // target is picked up without restarting anything. This is the whole
      // point — do NOT cancel and re-schedule here.
      if (rafRef.current !== null) return;

      let last = performance.now();

      const step = (now: number) => {
        const frame = Math.min((now - last) / 1000, 1 / 15);
        last = now;

        const to = targetRef.current;

        // ── FIXED SUBSTEPS, NOT ONE STEP PER FRAME ─────────────────────────
        //
        // An explicit integrator is only stable while ω·dt stays well below 1,
        // and a frame is not a fixed quantity. Integrating once per frame tied
        // the spring's behaviour to the refresh rate: identical code settled
        // differently at 60Hz and 30Hz, and a single dropped frame could hand
        // it a dt large enough to jump the whole distance in one go and keep
        // going. Raising OMEGA to 30 made that visible — 439px of overshoot on
        // a spring that is mathematically incapable of overshooting.
        //
        // Stepping at a fixed 1/240s regardless of frame length makes ω·h ~0.1
        // at any usable stiffness, so the motion is identical on a 120Hz
        // display, a 60Hz one, and a laptop that has dropped to 30Hz to save
        // battery. It costs a handful of multiplications per frame.
        // ── THE SOFTENING IS PER MOVE, NOT PER INSTANT ─────────────────────
        //
        // `omega` is fixed for the whole of this move, from the distance the
        // move set out to cover. It used to be recomputed every substep from
        // the distance REMAINING, and that quietly cancelled the very thing it
        // was for.
        //
        // The intent was "softer the further it has to go, so two cards read as
        // further rather than merely faster". But the gap shrinks as the move
        // runs, so the spring stiffened as it went: a two-card move started
        // soft and finished at full one-card stiffness, and the softening only
        // ever applied to the part of the journey furthest from the eye. Two
        // cards took 0.43s against 0.36s for one — 19% more time for 100% more
        // distance, which is a move travelling 70% faster. That is the whip.
        //
        // Held constant, distance buys time as intended, and the peak speed of
        // a two-card move lands within about a third of a one-card move instead
        // of nearly double it.
        //
        // Changing target mid-flight re-derives it from the new distance, which
        // steps the stiffness once. Nothing is visible in that: the spring
        // keeps its velocity across the change, so only the acceleration
        // changes, and the whole point of a spring here is that it bends rather
        // than restarts.
        const omega = omegaRef.current;

        let remaining = frame;
        while (remaining > 0) {
          const h = Math.min(remaining, SUBSTEP);
          const gap = to - posRef.current;
          // Semi-implicit Euler, critically damped: c = 2ω.
          velocityRef.current +=
            (omega * omega * gap - 2 * omega * velocityRef.current) * h;
          posRef.current += velocityRef.current * h;
          remaining -= h;
        }
        const left = Math.abs(to - posRef.current);

        // Arrived, as far as anything anybody can see is concerned. Cleared
        // BEFORE the paint, so the blur that paint writes lands in a frame
        // where the CSS is willing to show it — and therefore eases in, rather
        // than being suppressed and snapping a frame later.
        const track = trackRef.current;
        const arrived = left < SETTLED;
        if (arrived && track?.dataset.moving) delete track.dataset.moving;
        // Retiring cells is held back to the very end regardless: it is the one
        // thing here that costs a layout, and there is no reason to spend it in
        // a frame the rake is still drawing.
        paint(arrived, false);

        if (left < REST && Math.abs(velocityRef.current) < REST_V) {
          posRef.current = lap(to);
          targetRef.current = posRef.current;
          velocityRef.current = 0;
          rafRef.current = null;
          if (track) delete track.dataset.live;
          paint(true, true);
          // Nothing to re-anchor. The hover guard counts distance travelled
          // rather than remembering a position, so it is already correct here
          // whether the hand moved during the settle or not — see
          // `hoverPathRef`.
          return;
        }
        rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    },
    [indexAt, lap, paint, reveal],
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

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
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
    (clientX: number) => {
      const track = trackRef.current;
      const width = widthRef.current;
      if (!track || !width) return null;

      const pitch = width * (1 + gap);
      const pos = posRef.current;
      const flattened = flatRef.current;
      let best: number | null = null;
      let nearest = Infinity;

      Array.from(track.children).forEach((node, index) => {
        const cell = node as HTMLElement;
        if (cell.dataset.gone === 'true') return;

        let offset = (((index - pos) % cells) + cells) % cells;
        if (offset > cells / 2) offset -= cells;
        const distance = Math.abs(offset);
        if (distance >= nearest) return;

        const scale = 1 - shrink * Math.pow(distance, falloff);
        const spread = flattened
          ? offset * width * 1.06
          : (offset / (1 + converge * distance)) * pitch;
        const half = (width * scale) / 2;
        const cx = centreXRef.current + spread;
        if (clientX < cx - half || clientX > cx + half) return;

        nearest = distance;
        best = index % count;
      });

      return best;
    },
    [cells, converge, count, falloff, gap, shrink],
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

    const index = slideAt(event.clientX);
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

  // ── Measurement ───────────────────────────────────────────────────────────

  // Card width drives pitch, depth and perspective, so it is the only thing
  // worth measuring — and only when the box actually changes.
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
      paint(true);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [paint]);

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
      paint(true);
    };

    sync();
    queries.forEach((query) => query.addEventListener('change', sync));
    return () => queries.forEach((query) => query.removeEventListener('change', sync));
  }, [paint]);

  useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      // A drag in flight owns three window listeners. Unmounting mid-drag —
      // a route change while the pointer is down — would otherwise leave them
      // attached to a component that no longer exists.
      detachRef.current?.();
      if (hoverTimerRef.current !== null) window.clearTimeout(hoverTimerRef.current);
    },
    [],
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

      <div className="flex items-center justify-center gap-2.5">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Show ${slide.label}`}
            aria-current={index === selected}
            onClick={() => goTo(index)}
            className={cx(
              'h-1.5 rounded-pill transition-all duration-[260ms]',
              // `bg-current`, so the dots take the section's own text colour.
              // Hardcoding white assumed a dark stage and left them invisible
              // the moment the stage went light.
              'bg-current',
              index === selected ? 'w-7 opacity-90' : 'w-1.5 opacity-30 hover:opacity-60',
            )}
          />
        ))}
      </div>
    </div>
  );
}
