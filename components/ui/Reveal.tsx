import { cx } from '@/lib/cx';
import type { RevealProps } from './contracts';

/**
 * SLOT — scroll reveal. The client is supplying their own scroll animation.
 * See ./README.md; this is the spec theirs should meet.
 *
 * Note what this component is NOT: it is not a client component. It renders
 * two attributes and nothing else. A single shared IntersectionObserver
 * mounted once in the root layout (`RevealObserver`) watches every
 * `[data-reveal]` on the page.
 *
 * That matters. The naive version — one client component with its own
 * observer per revealed element — would put a hydration boundary and an
 * observer instance around 60+ elements on the home page. This way the entire
 * scroll-animation system costs one observer and ~0.6KB of JS for the whole
 * site, and every revealed element stays a Server Component.
 *
 * The hidden start state is gated behind `@media (scripting: enabled)` in
 * globals.css, so if JS fails the content is simply visible rather than
 * permanently invisible.
 *
 * Do NOT wrap above-the-fold hero content in this — the hidden start state
 * would delay LCP.
 */
export function Reveal({ children, index = 0, as: Element = 'div', className }: RevealProps) {
  return (
    <Element
      data-reveal=""
      className={cx(className)}
      // Cascade rather than arrive together, but only just.
      //
      // Was 60ms × up to 8 — a 480ms delay on top of a 600ms transition, so
      // the last card in a grid finished more than a second after the first
      // started. At scroll speed that meant looking straight at items still
      // waiting to begin. 40ms × up to 5 caps the whole cascade at 200ms,
      // which still reads as a stagger without outrunning the scroll.
      style={index > 0 ? { '--reveal-delay': `${Math.min(index, 5) * 40}ms` } as React.CSSProperties : undefined}
    >
      {children}
    </Element>
  );
}
