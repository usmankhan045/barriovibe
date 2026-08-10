import Link from 'next/link';
import { cx } from '@/lib/cx';
import type { ButtonProps } from './contracts';

/**
 * SLOT — the client is supplying their own button. See ./README.md.
 *
 * This implementation is a Server Component with zero client JS: the gloss and
 * the hover state are both CSS. If the incoming button needs interactivity (a
 * magnetic cursor-follow, for instance), it becomes a client component and only
 * this file changes.
 *
 * The visual treatment lives in `app/globals.css` as `u-btn--*` classes rather
 * than here, so an incoming component can adopt the exact brand surface by
 * applying one class.
 */
export function Button({
  children,
  variant = 'blue',
  size = 'md',
  href,
  type = 'button',
  disabled = false,
  onClick,
  className,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = cx(
    'u-btn',
    `u-btn--${variant}`,
    size !== 'md' && `u-btn--${size}`,
    className,
  );

  const content = children;

  if (href) {
    // Anything off-site or non-http (mailto:, tel:, wa.me) uses a plain <a> —
    // next/link's prefetching and client routing do not apply.
    const isExternal = /^(https?:|mailto:|tel:)/.test(href);

    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          aria-label={ariaLabel}
          {...(href.startsWith('http')
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
