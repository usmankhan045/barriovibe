import type { ReactNode } from 'react';
import type { IconName } from '@/content/types';
import type { StepArtName } from '@/lib/art';

/**
 * Prop contracts for every swappable slot in `components/ui/`.
 *
 * These interfaces are the boundary between the client's components and the
 * page composition in `components/sections/`. They are fixed deliberately:
 * an incoming component with a different API gets a ≤20-line adapter, and the
 * rest of the site never changes.
 *
 * See ./README.md for the handover process.
 */

// ── Button ──────────────────────────────────────────────────────────────────

/**
 * Two variants. There is no third.
 *
 * The mockups show one button pair — a glossy blue pill and a chrome pill —
 * and they are the pair on every screen, including the dark ones. `white` and
 * `ghost` variants existed here for the CTA band and were a mistake: they put
 * two more button colours on the site that appear in no mockup. Adding a
 * variant back is a brand decision, not a component decision.
 */
export type ButtonVariant =
  /** Glossy blue pill. The primary action. One per view. */
  | 'blue'
  /** Chrome pill. The secondary action beside a blue one. */
  | 'chrome';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * Renders an `<a>` instead of a `<button>`. Navigation must be a link so it
   * supports middle-click, cmd-click and "copy link address".
   */
  href?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  /** Required when the label alone does not say where the link goes. */
  'aria-label'?: string;
}

// ── Tile ────────────────────────────────────────────────────────────────────

export interface TileProps {
  children: ReactNode;
  /** Adds the hover lift. Use only when the whole tile is clickable. */
  interactive?: boolean;
  /** Wraps the tile in a link covering its full area. */
  href?: string;
  className?: string;
  as?: 'div' | 'article' | 'li';
}

// ── IconBadge ───────────────────────────────────────────────────────────────

export interface IconBadgeProps {
  icon: IconName;
  /**
   * `chrome` is what the site uses everywhere — one silver treatment, matching
   * the chrome button. `blue` stays in the contract for a future swap-in, but
   * nothing in `content/` selects it. See content/pillars.ts.
   */
  variant?: 'blue' | 'chrome';
  /** `xs` is the deck's size and is not used anywhere else — see IconBadge.tsx. */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

// ── DisplayCards (the stacked deck) ─────────────────────────────────────────

export interface DisplayCardItem {
  title: string;
  description: string;
  icon: IconName;
  /** Defaults to `chrome`, matching every other badge on the site. */
  badge?: 'blue' | 'chrome';
}

export interface DisplayCardsProps {
  /**
   * Order is depth order: the FIRST card sits at the back of the deck and the
   * LAST card is the one on top, fully readable without interaction. Put the
   * strongest claim last.
   */
  cards: readonly DisplayCardItem[];
  /**
   * Names the deck for assistive tech. Every card's copy is in the DOM in
   * full, so the label is what tells a screen-reader user what the list is.
   */
  label: string;
  className?: string;
}

// ── Timeline ────────────────────────────────────────────────────────────────

export interface TimelineStep {
  /** `01`–`04`. Rendered in the node on the rail. */
  number: string;
  title: string;
  description: string;
  /** Which photograph fills the card's media band. See lib/art.ts. */
  art: StepArtName;
  /**
   * The pill over the photograph.
   *
   * The component this is adapted from puts a `date` and a `category` here,
   * and a process has neither — these are four steps, not a history. Rather
   * than invent a turnaround time, which for a compliance firm is a promise
   * nobody has agreed to make, the pill restates something the step's own
   * description ALREADY says: "No fee", "In writing". If a tag cannot be
   * traced to a sentence in `description`, it is a new claim and does not
   * belong here.
   */
  tag: string;
}

export interface TimelineProps {
  steps: readonly TimelineStep[];
  /** Names the list for assistive tech. */
  label: string;
  className?: string;
}

// ── Reveal (scroll animation) ───────────────────────────────────────────────

export interface RevealProps {
  children: ReactNode;
  /**
   * Stagger index. Multiplied by 60ms so items in a grid cascade rather than
   * arriving together.
   */
  index?: number;
  /** Element to render. Default 'div'. */
  as?: 'div' | 'li' | 'section' | 'article';
  className?: string;
}

// ── Coverflow ───────────────────────────────────────────────────────────────

/**
 * One card.
 *
 * ── Why the card arrives as an ELEMENT and not as a render prop ──
 *
 * A render prop is the more idiomatic React shape and it cannot be used here:
 * the carousel is a client component and the sections that use it are Server
 * Components, and a function does not cross that boundary. An element does.
 *
 * The constraint turns out to be the better design anyway: passing finished
 * elements keeps every card — its badge, its icon, its copy — rendered on the
 * server, so the client ships the geometry and nothing else. The carousel's own
 * chunk measures 7KB gzipped, and that is the entire client cost of this
 * section.
 *
 * (It would be neater still to say this keeps `components/icons` out of the
 * client bundle. It does not: that module holds all 33 icons in one lookup
 * object, and `HeaderClient` — a client component — already imports it, so the
 * set is downloaded either way. The saving here is the card markup, not the
 * icons.)
 *
 * It also means a card cannot re-render per selection, which is why nothing
 * about a card's appearance is driven by React state. The centred card expands
 * because the paint loop flips `[data-cf-active]` on its cell and CSS
 * transitions off that flag — see `.u-cf-detail` in globals.css.
 */
export interface CoverflowSlide {
  /** Stable React key. Not the array index — the ring reorders visually. */
  id: string;
  /** Announced by the pagination dots. Say what the card is, not "slide 3". */
  label: string;
  /**
   * The card's root element. Must be an `<a>` — `next/link` is what these are
   * — because these cards navigate, and navigation has to survive middle-click,
   * cmd-click and "copy link address".
   *
   * It is rendered INSIDE the glass surface, untouched — nothing is cloned onto
   * it and none of its props are read. See the note on CARD_CLASS in
   * ./Coverflow.tsx for why: an element that has crossed the Server → Client
   * boundary is a reference React resolves at render time, so cloning it or
   * reading `.props` off it fails during prerender. `next dev` shows neither
   * failure; `next build` catches both.
   *
   * Give it `className="u-cf-card-body"` for the padding and column layout —
   * a CSS class name, so nothing has to cross the boundary. Click and focus are
   * handled on the cell around it, so no handler is injected here.
   */
  card: ReactNode;
}

export interface CoverflowProps {
  slides: CoverflowSlide[];

  /**
   * Every number below is geometry, and they are tuned against each other
   * rather than independently — see the paint loop in ./Coverflow.tsx. Card
   * WIDTH is deliberately not among them: it is `--cf-card` in CSS, because the
   * whole scene derives from it and it has to be fluid.
   */

  /** Degrees the first neighbour tilts. The only genuine 3D in the scene. */
  rotate?: number;
  /**
   * How much the first neighbour shrinks. This carries BOTH the depth and the
   * centre card's prominence, because there is no `translateZ` in this
   * carousel and there must not be — see the block comment in ./Coverflow.tsx
   * for the measurement that rules it out.
   */
  shrink?: number;
  /** Exponent on distance. Below 1 the rake eases off as cards travel out. */
  falloff?: number;
  /** Opacity lost per step from the centre. */
  fade?: number;
  /** Space between cards as a fraction of card width. NEGATIVE overlaps them. */
  gap?: number;
  /**
   * How hard the spacing tightens for cards further from the centre — the
   * perspective convergence this rake has to draw by hand, having no
   * `translateZ` to get it from. 0 is a flat linear pitch, which lets the ends
   * of the ribbon come apart. See the paint loop in ./Coverflow.tsx.
   */
  converge?: number;
  /** Names the carousel for assistive tech. */
  label?: string;
  className?: string;
}

// ── Marquee ─────────────────────────────────────────────────────────────────

export interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full loop. Slower reads as more premium. */
  duration?: number;
  className?: string;
}

// ── Form fields ─────────────────────────────────────────────────────────────

export interface FieldProps {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel';
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  defaultValue?: string;
  /** Validation message. Rendered with the field marked invalid. */
  error?: string;
  /** Persistent helper text below the field. */
  hint?: string;
}

export interface SelectFieldProps extends Omit<FieldProps, 'type' | 'placeholder'> {
  options: { value: string; label: string }[];
  placeholder?: string;
}

export interface TextareaFieldProps extends Omit<FieldProps, 'type'> {
  rows?: number;
}
