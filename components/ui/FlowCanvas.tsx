'use client';

import { useEffect, useRef } from 'react';
import { cx } from '@/lib/cx';

/**
 * The converging particle flow, as a card background.
 *
 * ── What this is, and what it came from ──
 *
 * The effect is 21st.dev's "Gateway Flow": two fans of dotted bezier paths
 * sweeping in from the left and right edges and converging on a point, with
 * particles running along them. The source ships it as a `<iframe srcDoc>`
 * carrying a whole HTML document: a Tailwind CDN script, GSAP, ScrollTrigger,
 * Iconify, a login form, three avatars off a CDN, and a block of "focus CSS"
 * whose job is to hide all of that again so only the canvas shows.
 *
 * None of that could ship here. Twelve cards on /work would have meant twelve
 * sandboxed iframes, each fetching four scripts over the network to draw an
 * effect that is about forty lines of canvas work, and nothing inside an iframe
 * can read `--color-*`, so the brand blue would have had to be hardcoded past
 * the token guard (scripts/check-tokens.mjs). So this is the drawing logic,
 * lifted out and rewritten against the page's own canvas.
 *
 * ── One loop, not one per card ──
 *
 * Same reasoning as Reveal and its single shared IntersectionObserver: the
 * naive version is one rAF loop per card, which on /work is twelve loops all
 * waking on the same frame. Instead every instance registers itself in a
 * module-level set, and ONE loop walks that set. Mount cost per card is a
 * canvas and a set entry.
 *
 * The loop only runs while at least one canvas is actually on screen, so a
 * grid scrolled past costs nothing, and it stops itself entirely when the last
 * card unmounts.
 *
 * ── Why the paths are not the source's ──
 *
 * The original fans in from both side edges of a full-screen viewport and
 * converges dead centre, which is a shape that needs a screen to read. A card is
 * a small box with type across the left two thirds of it, and converging inside
 * it does two things wrong: it draws every path into one lit knot sitting in the
 * open space on the right, and it runs the dotted lines straight through the
 * tagline to get there.
 *
 * So the convergence is spread across the ROW instead, and the fan enters from
 * one side only. The dotted stroke and the square particles are the source's.
 *
 * ── The row is one stream, not three ──
 *
 * Every card in a row shares ONE clock and one set of paths. A particle does
 * not restart at the left edge of each card: it runs off the right edge of the
 * first card and arrives at the left edge of the next, at the same height and
 * the same moment, so a row of three reads as a single flow passing behind
 * three windows onto it.
 *
 * That is what `row` does. Cards sharing a row key share a Stream, and each one
 * asks the stream to draw the slice of it that falls within that card's own
 * bounds. A card is a viewport onto the stream, not an animation of its own.
 *
 * Geometry lives in STREAM space, whose x runs 0..1 across the whole row. Each
 * card knows its own [x0, x1] within that row (measured from the DOM, so a
 * wrapping grid or an uneven last row is handled without being told), and maps
 * stream coordinates into its own pixels.
 *
 * The shape across that space is a pinched band: wide, closed to a single
 * thread for the whole of the middle card, then wide again. See WAIST_IN /
 * WAIST_OUT below for why the pinch is a band and not a point.
 */

type Rect = { x0: number; x1: number; top: number; h: number };

type Instance = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  host: HTMLElement;
  stream: Stream;
  w: number;
  h: number;
  /** This card's span within its row, in stream space (0..1) and in px. */
  span: Rect;
  visible: boolean;
};

type Path = {
  /** Vertical position at the row's left edge, as a fraction of row height. */
  offset: number;
  t: number;
  speed: number;
};

/**
 * One continuous flow, shared by every card in a row.
 *
 * Holds the paths and the heat, so all its cards advance on the same frame with
 * the same values, and light up together.
 */
type Stream = {
  paths: Path[];
  /** Eased toward 1 while the pointer is over ANY card in the row. */
  heat: number;
  hot: boolean;
  members: Set<Instance>;
  /** Row bounds in page px, recomputed on resize. */
  left: number;
  width: number;
  height: number;
  /**
   * Where the pinched thread runs, as a fraction of row height.
   *
   * MEASURED, not assumed. A fixed fraction was wrong: 0.76 sits in the open
   * strip on a grid card, but on the taller panel on a project page the copy
   * reaches further down and the same fraction laid the thread straight through
   * the tagline. The gap below the text is in a different place on every card
   * that uses this, so it is read from the DOM (see measure()).
   */
  lane: number;
};

const STREAMS = new Map<string, Stream>();
const REGISTRY = new Set<Instance>();
let frame = 0;
let last = 0;

/** Paths per ROW. A row is three cards wide, so this is not three cards' worth. */
const PATHS = 30;
function makeStream(): Stream {
  const paths: Path[] = [];
  for (let i = 0; i < PATHS; i += 1) {
    paths.push({
      /* Spread the fan past the row top and bottom so the outermost paths
         enter from off-canvas rather than starting visibly at a corner. */
      offset: (i / PATHS) * 1.5 - 0.25,
      t: Math.random(),
      /* Slower than the single-card version: a path now crosses three cards,
         so the same speed would read as a sprint. */
      speed: 0.00055 + Math.random() * 0.0007,
    });
  }
  return {
    paths,
    heat: 0,
    hot: false,
    members: new Set(),
    left: 0,
    width: 1,
    height: 1,
    lane: 0.76,
  };
}

/* ── The row is a PINCHED BAND: gather, carry, release ─────────────────────
   In stream space (0 = the row's left edge, 1 = its right), the fan is wide at
   both ends and pinched to a single thread between WAIST_IN and WAIST_OUT.

   Two earlier versions were wrong, in instructive ways.

   The first converged once, at the far right of the row. Card 1 got the fan,
   card 2 the taper and card 3 the dead tail: three fragments, and the last card
   nearly empty.

   The second pinched to a POINT at the first gutter (1/3). That fixed the
   emptiness but put the whole gesture inside cards 1 and 2: the thread pinched
   at card 2's left edge and had re-spread by its right edge, so card 2 did both
   the carry and the release and card 3 only received what was already wide.

   A point cannot be carried; only a BAND can. So the pinch is held flat across
   the whole of card 2, from the first gutter to the second. Now each card owns
   exactly one phase of one gesture:

     card 1  (0    -> 1/3)   gather: the wide fan draws down to a thread
     card 2  (1/3  -> 2/3)   carry:  a single thread, flat, all the way across
     card 3  (2/3  -> 1)     release: the thread opens back out and off the edge

   The boundaries are the grid's own gutters at three columns. At narrower
   breakpoints the same stream still spans whatever cards remain, measured from
   the DOM, so the phases simply redistribute rather than breaking. */
const WAIST_IN = 1 / 3;
const WAIST_OUT = 2 / 3;

/** Half-width of the fan at stream position x: 1 at the row's ends, 0 in the band. */
function spread(x: number) {
  if (x >= WAIST_IN && x <= WAIST_OUT) return 0;
  const d =
    x < WAIST_IN
      ? (WAIST_IN - x) / WAIST_IN
      : (x - WAIST_OUT) / (1 - WAIST_OUT);
  /* Cosine rather than a linear taper: it flattens as it approaches the band,
     so the threads converge smoothly into the thread and leave it the same way,
     instead of meeting at a hard V. */
  return (1 - Math.cos(Math.min(1, Math.max(0, d)) * Math.PI)) / 2;
}

/**
 * Draw one card's slice of its row's stream.
 *
 * Everything is computed in stream space first (x from 0 at the row's left edge
 * to 1 at its right), then translated into this card's pixels. The card clips
 * whatever falls outside itself, which is what makes the flow continue across
 * the gutter instead of restarting.
 *
 * The paths are sampled as polylines rather than drawn as beziers: the shape is
 * now defined by spread() at every x, which is not a curve a single cubic can
 * express, and sampling it keeps the stroke and the particles on exactly the
 * same geometry by construction.
 */
function draw(inst: Instance) {
  const { ctx, w, h, stream, span } = inst;
  ctx.clearRect(0, 0, w, h);

  const heat = stream.heat;
  const lineAlpha = 0.16 + 0.3 * heat;
  const dotAlpha = 0.34 + 0.5 * heat;

  // Stream space -> this card's pixels.
  const sx = (x: number) => ((x - span.x0) / (span.x1 - span.x0)) * w;
  /* Rows are ragged: a card can be shorter than its tallest neighbour. Anchor
     the vertical mapping to the ROW box, so a path sits at the same screen
     height in every card it crosses rather than being squashed per card. */
  const sy = (y: number) => y * stream.height - span.top;

  /** Height of one path at stream position x, as a fraction of row height. */
  /* WHERE THE THREAD SITS, VERTICALLY.

     The band is a single flat thread across the whole of card 2, and at the
     row's mid-height that thread lies straight through the tagline: the one
     place on the card where a hard horizontal line is least welcome. Dropping
     the centreline to 0.76 puts it below the copy and above "Read the build",
     in the open strip every card has.

     Only the PINCHED part moves. The fan's ends stay centred on 0.5, so cards 1
     and 3 keep their symmetric spread and nothing is lopsided; the centreline
     eases from 0.5 to 0.76 exactly as the fan closes, using the same spread()
     that drives the pinch, so the two are one motion. */
  const width = spread;

  const centre = (x: number) => 0.5 + (1 - width(x)) * (stream.lane - 0.5);

  /* A perfectly flat thread across card 2 reads as a rule drawn under the copy,
     not as something in motion. A shallow sine along the band gives it a drift:
     enough to say the thread is travelling, far too little to wander back into
     the type. Amplitude is scaled by (1 - spread) so it exists only where the
     fan is closed and dies out into the spread at both ends. */
  const drift = (x: number) => Math.sin(x * Math.PI * 3) * 0.02 * (1 - width(x));

  /* THE SHEAR, ACROSS THE WHOLE RAKE.

     Every thread leans the same way by an amount that grows with its distance
     from the middle of the fan, so the sheet twists about its own axis and no
     two threads ever cross. Written in x rather than in seat-local space, the
     twist runs continuously from one end of the rake to the other: it is one
     long turn, of which each card shows a different part.

     Two earlier versions were wrong in opposite directions. A single lean
     shared by every thread bent the fan as a rigid shape, which read as a
     graphic pasted on the card; varying the lean per thread by its own offset
     gave neighbours unrelated directions, so they crossed and the bloom became
     a tangle. A shear is the middle: ordered by construction, and still three
     dimensional. */
  const pathY = (p: Path, x: number) =>
    centre(x) + drift(x) + (p.offset - 0.5) * width(x);

  /* Only sample the span this card can actually show, plus a margin so a
     stroke entering at the edge is not cut short of it. Off-card geometry is
     work the card would only clip away. */
  const from = Math.max(0, span.x0 - 0.04);
  const to = Math.min(1, span.x1 + 0.04);
  const STEPS = 22;

  ctx.lineWidth = 1;
  ctx.setLineDash([1, 4]);
  ctx.strokeStyle = `rgba(255,255,255,${lineAlpha})`;

  for (const p of stream.paths) {
    ctx.beginPath();
    for (let i = 0; i <= STEPS; i += 1) {
      const x = from + ((to - from) * i) / STEPS;
      const px = sx(x);
      const py = sy(pathY(p, x));
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    /* The particle travels the WHOLE stream, so it crosses every card in turn:
       one continuous run from the left edge of the first to the right edge of
       the last. This is what makes a thread visibly hand over at a boundary
       rather than restart inside each card. */
    const x = p.t;
    const px = sx(x);
    const py = sy(pathY(p, x));

    /* Fade in at the stream's start and out at its end only. A particle must
       NOT fade at a card boundary: it is one thread passing through, and
       dimming it there would break the handover the arrangement exists to
       show. */
    const fade = Math.min(1, Math.min(x, 1 - x) / 0.12);
    ctx.fillStyle = `rgba(255,255,255,${dotAlpha * fade})`;
    ctx.fillRect(px - 1.25, py - 1.25, 2.5, 2.5);
  }

  ctx.setLineDash([]);
}

function tick(now: number) {
  // Frame-rate independent, and clamped so a backgrounded tab returning after
  // a long pause does not jump every particle across its whole path at once.
  const dt = Math.min(3, last ? (now - last) / 16.667 : 1);
  last = now;

  // Advance each stream ONCE, not once per card. This is what keeps the three
  // cards of a row on the same frame of the same animation.
  for (const stream of STREAMS.values()) {
    const target = stream.hot ? 1 : 0;
    stream.heat += (target - stream.heat) * Math.min(1, 0.11 * dt);
    for (const p of stream.paths) {
      p.t += p.speed * dt * (1 + 1.1 * stream.heat);
      if (p.t > 1) p.t -= 1;
    }
  }

  for (const inst of REGISTRY) {
    if (inst.visible) draw(inst);
  }

  frame = REGISTRY.size > 0 ? requestAnimationFrame(tick) : 0;
  if (!frame) last = 0;
}

function start() {
  if (!frame) {
    last = 0;
    frame = requestAnimationFrame(tick);
  }
}

/** Recompute every member's span within its row, from the live DOM. */
function measure(stream: Stream) {
  let left = Infinity;
  let right = -Infinity;
  let top = Infinity;
  let bottom = -Infinity;
  const boxes = new Map<Instance, DOMRect>();

  for (const inst of stream.members) {
    const r = inst.host.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    boxes.set(inst, r);
    left = Math.min(left, r.left);
    right = Math.max(right, r.right);
    top = Math.min(top, r.top);
    bottom = Math.max(bottom, r.bottom);
  }
  if (!boxes.size || right <= left) return;

  stream.left = left;
  stream.width = right - left;
  stream.height = bottom - top;

  for (const [inst, r] of boxes) {
    inst.span = {
      x0: (r.left - left) / stream.width,
      x1: (r.right - left) / stream.width,
      top: r.top - top,
      h: r.height,
    };
  }

  /* THE LANE: the widest horizontal gap BETWEEN blocks of text.

     Not "below the lowest text", which is what this did first and which put the
     thread straight through "Read the build": on a grid card the lowest text IS
     that link row, so anything below it lands on the card's bottom edge, and
     halfway between it and the bottom lands on the link itself.

     What the thread actually wants is the gap every one of these cards has
     between the end of the tagline and the link row beneath it. So collect the
     text blocks, sort them, and take the largest vertical gap between one
     block's bottom and the next block's top. On a grid card that is the space
     above "Read the build"; on a project-page panel, where there is no link
     row, the largest gap is the open area below the tagline and the thread sits
     there instead. Both come out of the same rule.

     Blocks are collected across the WHOLE row so all three cards agree on one
     lane: a thread that changed height at each gutter would not read as one
     thread. */
  const bands: Array<{ top: number; bottom: number }> = [];
  for (const inst of stream.members) {
    for (const el of inst.host.querySelectorAll('p, h1, h2, h3, span, a')) {
      if (!el.textContent?.trim()) continue;
      // Only leaf-ish text: a wrapper's box spans its children and would close
      // the very gap being looked for.
      if (el.querySelector('p, h1, h2, h3, span, a')) continue;
      const b = el.getBoundingClientRect();
      if (b.height) bands.push({ top: b.top - top, bottom: b.bottom - top });
    }
  }
  bands.sort((a, b) => a.top - b.top);

  let bestGap = 0;
  let lane = 0.74;
  let reach = bands.length ? bands[0]!.bottom : 0;
  for (const band of bands) {
    const gap = band.top - reach;
    if (gap > bestGap) {
      bestGap = gap;
      lane = (reach + gap / 2) / stream.height;
    }
    reach = Math.max(reach, band.bottom);
  }
  /* If the row has no usable gap (a card of solid text), fall back to the strip
     under everything rather than drawing through the middle of the copy. */
  if (bestGap < 12) lane = (reach + (stream.height - reach) / 2) / stream.height;
  // Never let it ride the very bottom rim, where the bevel is brightest.
  stream.lane = Math.min(0.86, Math.max(0.5, lane));
}

export function FlowCanvas({ row, className }: { row: string; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    // Motion is decoration here and carries no information, so honour the
    // preference by never starting rather than by slowing down.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const host = (canvas.closest('[data-flow-host]') ??
      canvas.parentElement) as HTMLElement | null;
    if (!host) return;

    let stream = STREAMS.get(row);
    if (!stream) {
      stream = makeStream();
      STREAMS.set(row, stream);
    }

    const inst: Instance = {
      canvas,
      ctx,
      host,
      stream,
      w: 0,
      h: 0,
      span: { x0: 0, x1: 1, top: 0, h: 1 },
      visible: false,
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      inst.w = rect.width;
      inst.h = rect.height;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // One card changing size can move every other card in the row.
      measure(stream);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // A card scrolled off screen keeps its state but stops being drawn.
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (entry) inst.visible = entry.isIntersecting;
      },
      { rootMargin: '120px' },
    );
    io.observe(canvas);

    /* WHY pointerover AND NOT pointerenter.
       The card's title link carries `after:absolute after:inset-0`, an overlay
       covering the whole card so the entire surface is clickable. The pointer
       therefore lands on that <a>, never on the <article> itself, and
       pointerenter does not bubble — so a listener here was never called and
       the card never lit up. pointerover bubbles, so it reaches the host from
       whatever child the pointer is actually over.

       pointerout fires when moving BETWEEN children of the card, so the leave
       is taken from pointerleave (which does not bubble, but is correctly
       dispatched on the host itself when the pointer truly exits). */
    const enter = () => {
      stream.hot = true;
    };
    const leave = () => {
      stream.hot = false;
    };
    host.addEventListener('pointerover', enter);
    host.addEventListener('pointerleave', leave);
    // Keyboard users get the same brightening: focus anywhere inside the card
    // counts as hover, which matters because the card's whole surface is a link.
    host.addEventListener('focusin', enter);
    host.addEventListener('focusout', leave);

    stream.members.add(inst);
    REGISTRY.add(inst);
    resize();
    // A late-mounting sibling shifts the row, so re-measure all of it.
    measure(stream);
    start();

    const onWindowResize = () => measure(stream);
    window.addEventListener('resize', onWindowResize);

    return () => {
      REGISTRY.delete(inst);
      stream.members.delete(inst);
      if (stream.members.size === 0) STREAMS.delete(row);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('resize', onWindowResize);
      host.removeEventListener('pointerover', enter);
      host.removeEventListener('pointerleave', leave);
      host.removeEventListener('focusin', enter);
      host.removeEventListener('focusout', leave);
      if (REGISTRY.size === 0 && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
        last = 0;
      }
    };
  }, [row]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={cx('pointer-events-none absolute inset-0 h-full w-full', className)}
    />
  );
}
