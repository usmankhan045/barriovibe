import { Fragment, type ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/components/icons';
import { cx } from '@/lib/cx';
import { ART, type ArtName } from '@/lib/art';

/**
 * Layout and typographic primitives.
 *
 * These are NOT swappable slots — they are the site's own structure. The
 * client's components drop into `components/ui/`; these compose around them.
 *
 * All of them are Server Components with zero client JS.
 */

// ── Layout ──────────────────────────────────────────────────────────────────

export function Container({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div id={id} className={cx('u-container', className)}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
  tight = false,
  band = false,
  as: Element = 'section',
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Reduced vertical padding, for sections that sit close together. */
  tight?: boolean;
  /** The alternating grey band background. */
  band?: boolean;
  as?: 'section' | 'div';
}) {
  return (
    <Element
      id={id}
      className={cx(
        tight ? 'u-section-tight' : 'u-section',
        band && 'bg-band',
        'relative',
        className,
      )}
    >
      {children}
    </Element>
  );
}

// ── Typography ──────────────────────────────────────────────────────────────

export function Eyebrow({
  children,
  className,
  as: Element = 'p',
}: {
  children: ReactNode;
  className?: string;
  as?: 'p' | 'span' | 'div';
}) {
  return <Element className={cx('u-eyebrow', className)}>{children}</Element>;
}

export function Rule({ className }: { className?: string }) {
  return <span className={cx('u-rule', className)} aria-hidden="true" />;
}

/**
 * The signature heading from every mockup: a 2–3 line headline whose LAST line
 * switches to the brand blue and ends in a period, with a 40×3 blue rule
 * beneath.
 *
 * Encoding it once means the pattern is identical on all 28 pages and cannot
 * drift. Pass the plain lines in `lines` and the accented final line in
 * `accent` — the period is added automatically so it can never be forgotten.
 *
 * The heading level is explicit because pages have exactly one h1 and the
 * component is used for both.
 */
export function SectionHeading({
  eyebrow,
  lines,
  accent,
  level = 2,
  size,
  rule = true,
  onDark = false,
  centred = false,
  className,
  id,
}: {
  eyebrow?: string;
  /** Lines rendered in ink. Each becomes its own visual line. */
  lines: string[];
  /** Final line, rendered in brand blue with a trailing period. */
  accent: string;
  level?: 1 | 2 | 3;
  /**
   * Type size, when it should not be the one the level implies.
   *
   * Separate from `level` because the two answer different questions: `level`
   * is what the heading IS in the document outline, `size` is how loudly it is
   * set. The category pages are the case that needs both: they are h1s, like
   * every other page title, and they are set at `display` because a page whose
   * whole job is to name a practice or a discipline should open at the same
   * volume as the home page rather than a step below it. A discipline block
   * inside a practice page is the mirror case: an h3 under the section's h2,
   * set at `h2` because it heads a whole list of services rather than a
   * paragraph.
   */
  size?: 'display' | 'h1' | 'h2' | 'h3';
  rule?: boolean;
  /**
   * Re-keys the three brand colours for a dark surface.
   *
   * All three of them — the accent line, the rule and the eyebrow — are
   * blue-600, which is 11.44:1 on white and around 1.5:1 on a deep blue band.
   * On a dark surface the half of the headline that carries the brand would
   * simply not be visible. blue-200 goes the other way and keeps them inside
   * the brand family rather than flattening them to white.
   *
   * Nothing selects this today: the disciplines section used it while that band
   * was dark and is back on the canvas. It stays because the CTA band and the
   * bento feature card are the same kind of surface, and because a heading that
   * only works on white is the thing worth avoiding.
   *
   * A prop rather than an override the caller passes in `className`, because
   * this is the heading knowing about a surface it supports — not a page
   * reaching in to repaint its internals with arbitrary-variant selectors.
   */
  onDark?: boolean;
  /**
   * Centres the block and, with it, the rule's draw origin.
   *
   * A prop rather than the caller passing `items-center text-center`, because
   * the alignment has a motion consequence the classes cannot express: the
   * rule draws from its left edge by default, which is right for a
   * left-aligned heading and reads as misaligned under a centred one. This
   * sets `data-centred`, which globals.css uses to move the origin.
   */
  centred?: boolean;
  className?: string;
  id?: string;
}) {
  const Heading = ({ 1: 'h1', 2: 'h2', 3: 'h3' } as const)[level];
  /* Written out rather than composed as `text-${size}`: Tailwind scans source
     for whole class names, and an interpolated one is not emitted at all. */
  const sizeClass = {
    display: 'text-display',
    h1: 'text-h1',
    h2: 'text-h2',
    h3: 'font-display text-h3',
  }[size ?? (({ 1: 'h1', 2: 'h2', 3: 'h3' } as const)[level])];

  return (
    <div
      data-centred={centred || undefined}
      className={cx('flex flex-col', centred && 'items-center text-center', className)}
    >
      {eyebrow && (
        <Eyebrow className={cx('mb-5', onDark && 'text-blue-200')}>{eyebrow}</Eyebrow>
      )}
      <Heading id={id} className={cx(sizeClass, onDark && 'text-white')}>
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
        <span className={cx('block', onDark ? 'text-blue-200' : 'text-blue-600')}>
          {accent}
          <span aria-hidden="true">.</span>
        </span>
      </Heading>
      {rule && <Rule className={cx('mt-6', onDark && 'bg-blue-200')} />}
    </div>
  );
}

export function Lead({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx('text-body-lg text-ink-body max-w-[46ch]', className)}>{children}</p>;
}

export function Chip({
  children,
  variant = 'silver',
  className,
}: {
  children: ReactNode;
  variant?: 'silver' | 'blue';
  className?: string;
}) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-chip px-3 py-1.5 text-caption font-medium',
        variant === 'blue'
          ? 'bg-blue-50 text-blue-600'
          : 'bg-silver-100 text-ink-strong border border-line',
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * The `·`-separated summary line used under service and pillar names.
 *
 * ── The list breaks BETWEEN terms and nowhere else ──
 *
 * Each term is its own nowrap run and the `·` is glued to the term BEFORE it
 * with a non-breaking space, so the only break opportunity in the whole line is
 * the ordinary space that follows a separator. Two things fall out of that, and
 * both were visible on the practice cards:
 *
 *   · a term made of more than one word cannot be split — "Web · Apps · AI
 *     Agents · RAG · Digital / FTE · Automation" was breaking "Digital FTE" in
 *     half across the line
 *   · a line cannot START with a separator — "Finance & Tax · Corporate / · IP ·
 *     International" was hanging the `·` out in the left margin, which reads as
 *     a bullet that lost its list
 *
 * The separator still carries a REAL space after it, and that part is load
 * bearing: it was once a bare `·` spaced with margins, which are visual only.
 * Without actual whitespace `<span>·</span>Compliance` is a single unbreakable
 * run to the line breaker, and on a narrow viewport it pushed past the
 * container instead of wrapping. That was a live mobile overflow bug, not a
 * hypothetical — the non-breaking space goes BEFORE the separator, never after.
 */
export function DotList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <p className={cx('text-caption text-ink-body', className)}>
      {items.map((item, i) => (
        <Fragment key={item}>
          {i > 0 && ' '}
          <span className="whitespace-nowrap">
            {item}
            {i < items.length - 1 && (
              <span className="text-ink-decorative" aria-hidden="true">
                {' ·'}
              </span>
            )}
          </span>
        </Fragment>
      ))}
    </p>
  );
}

/** Text link with an arrow that slides on hover. */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={cx('u-arrow-link', className)}>
      {children}
      <Icon name="arrow-right" size={17} className="u-arrow-link__icon" />
    </Link>
  );
}

// ── Chess art ───────────────────────────────────────────────────────────────

/**
 * Renders one of the five chess renders extracted from the client's mockups.
 *
 * The edge-feather mask is the important part. The renders keep their white
 * background (see scripts/extract-art.mjs for why), and this mask fades their
 * edges out so they blend into whatever section they sit on instead of
 * showing a visible rectangle.
 *
 * `priority` must be set on the hero instance only — that image is the LCP
 * element and needs to be preloaded; every other instance should lazy-load.
 */
export function ChessArt({
  name,
  priority = false,
  sizes = '(max-width: 1024px) 90vw, 45vw',
  className,
}: {
  name: ArtName;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const art = ART[name];

  return (
    <Image
      src={art.src}
      // Decorative: the copy beside these already says everything they
      // illustrate. An empty alt keeps them out of the accessibility tree
      // rather than announcing "blue chess king" on four separate sections.
      alt={art.decorative ? '' : art.alt}
      aria-hidden={art.decorative ? true : undefined}
      priority={priority}
      // Static import gives Next the intrinsic dimensions and a generated blur
      // placeholder, which is half of how CLS stays at zero.
      placeholder="blur"
      sizes={sizes}
      className={cx('u-art-feather h-auto w-full select-none', className)}
      draggable={false}
    />
  );
}

/**
 * The faint line-icon field that sits behind the hero and section art in the
 * mockups. Pure inline SVG at very low opacity — no image request.
 */
export function IconWatermark({ className }: { className?: string }) {
  return (
    <svg
      className={cx('pointer-events-none absolute inset-0 h-full w-full', className)}
      viewBox="0 0 600 600"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {/* Kept very faint. In the mockups this layer is barely perceptible —
          it should register as texture behind the art, never as a graphic
          competing with the headline. */}
      <g className="text-silver-500 opacity-[0.22]">
        {/* Concentric arcs — the radiating rings behind the chess pieces. */}
        <circle cx="300" cy="330" r="150" strokeDasharray="2 7" />
        <circle cx="300" cy="330" r="230" strokeDasharray="2 7" />
        <circle cx="300" cy="330" r="310" strokeDasharray="2 7" />

        {/* Scattered outline glyphs, matching the mockups' watermark motifs. */}
        <g transform="translate(70 90)">
          <rect x="0" y="0" width="34" height="24" rx="3" />
          <path d="m2 3 15 11L32 3" />
        </g>
        <g transform="translate(470 120)">
          <circle cx="14" cy="14" r="14" />
          <path d="M14 6v8l5 3" />
        </g>
        <g transform="translate(500 380)">
          <path d="M0 30V6M10 30V0M20 30V12M30 30V4" />
        </g>
        <g transform="translate(60 400)">
          <circle cx="12" cy="9" r="8" />
          <path d="M0 30a12 12 0 0 1 24 0" />
        </g>
        <g transform="translate(250 40)">
          <circle cx="15" cy="15" r="15" />
          <circle cx="15" cy="15" r="8" />
          <circle cx="15" cy="15" r="2" />
        </g>
        <g transform="translate(430 520)">
          <path d="M0 14 30 0l-8 28-7-11z" />
        </g>
        <g transform="translate(140 540)">
          <circle cx="14" cy="14" r="14" />
          <path d="M0 14h28M14 0c4 4 6 9 6 14s-2 10-6 14c-4-4-6-9-6-14s2-10 6-14z" />
        </g>
      </g>
    </svg>
  );
}

// Re-exported so pages import every primitive from one place.
export { Breadcrumb, type Crumb } from './Breadcrumb';
