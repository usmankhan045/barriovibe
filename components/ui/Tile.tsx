import Link from 'next/link';
import { cx } from '@/lib/cx';
import type { TileProps } from './contracts';

/**
 * SLOT — the white card that everything sits in. See ./README.md.
 *
 * The card separates from the canvas by border and shadow rather than by fill,
 * because in the source mockups the canvas (#FDFDFE) and the card (#FFFFFF)
 * are effectively the same color. That is what produces the light, floating
 * look — filling the card grey would flatten it.
 */
export function Tile({
  children,
  interactive = false,
  href,
  className,
  as: Element = 'div',
}: TileProps) {
  const classes = cx('u-tile', (interactive || href) && 'u-tile-interactive', className);

  if (href) {
    return (
      <Link href={href} className={cx(classes, 'block')}>
        {children}
      </Link>
    );
  }

  return <Element className={classes}>{children}</Element>;
}
