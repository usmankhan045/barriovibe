import { Icon } from '@/components/icons';
import { cx } from '@/lib/cx';
import type { IconBadgeProps } from './contracts';

/**
 * SLOT — the glossy circular icon holder from the mockups. See ./README.md.
 *
 * Two variants: a blue sphere lit from the upper left, and a chrome one. The
 * off-centre radial highlight at 30%/22% is what makes them read as spherical
 * rather than as flat circles.
 *
 * The site uses `chrome` everywhere — see content/pillars.ts for why. `blue`
 * is kept because the variant is part of this slot's public contract and the
 * client's own component may swap in later, but nothing in `content/` selects
 * it today.
 */

/**
 * `xs` exists for the deck and nothing else. A stacked card shows only the
 * strip above the card in front of it, and that strip's height is the badge's
 * height — at `sm` the six cards spread over 520px of diagonal and read as a
 * staircase rather than as one object. 30px is what lets the pitch come down
 * to 3.25rem. See `.u-deck` in globals.css.
 */
const SIZES = {
  xs: { box: 30, icon: 15 },
  sm: { box: 44, icon: 20 },
  md: { box: 56, icon: 24 },
  lg: { box: 64, icon: 26 },
} as const;

export function IconBadge({
  icon,
  variant = 'blue',
  size = 'lg',
  className,
}: IconBadgeProps) {
  const { box, icon: iconSize } = SIZES[size];

  return (
    <span
      className={cx('u-badge', `u-badge--${variant}`, className)}
      style={{ width: box, height: box }}
    >
      <Icon name={icon} size={iconSize} />
    </span>
  );
}
