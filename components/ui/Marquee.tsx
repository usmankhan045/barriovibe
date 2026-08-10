import { cx } from '@/lib/cx';
import type { MarqueeProps } from './contracts';

/**
 * SLOT — the infinite logo strip. See ./README.md.
 *
 * Zero JavaScript. The track holds two identical copies of the children, so
 * translating it by exactly -50% loops seamlessly and the animation can be a
 * single CSS keyframe. Edges are feathered with a mask rather than hard-clipped.
 *
 * Pauses on hover (so a logo can be read) and stops entirely under
 * prefers-reduced-motion, both handled in globals.css.
 */
export function Marquee({ children, duration = 40, className }: MarqueeProps) {
  return (
    <div
      className={cx('u-marquee u-marquee-mask overflow-hidden', className)}
      style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
    >
      <div className="u-marquee-track">
        <div className="flex items-center">{children}</div>
        {/* The duplicate is presentational — a screen reader should not hear
            the logo list twice. */}
        <div className="flex items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
