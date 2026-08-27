import Link from 'next/link';
import Image from 'next/image';
import { BRAND } from '@/content/site';
import { cx } from '@/lib/cx';
import logoMark from '@/public/brand/logo.png';

/**
 * The wordmark.
 *
 * Mark plus the name on one line. The mockups' lockup also carried a small
 * letterspaced descriptor under the name; it was dropped from the lockup on
 * request. `BRAND.descriptor` still exists and is still rendered by
 * `app/opengraph-image.tsx`, so removing it from content/site.ts would break
 * the OG card.
 *
 * The name stays as type rather than baked into the mark image, deliberately:
 * type scales, recolours and stays crisp, and changing `BRAND.name` in
 * content/site.ts renames the entire site without touching the mark.
 */
export function Wordmark({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    /* `u-tap` for the touch floor. The header's copy gets there anyway through
       the glass plate it carries below lg (see HeaderClient.tsx), but the
       footer renders this bare, where the lockup measured 154x36 and is the
       link home. Coarse pointers only, so the desktop lockup is untouched and
       the header's plate is unaffected either way. */
    <Link
      href="/"
      className={cx('u-tap group inline-flex items-center gap-2.5', className)}
      aria-label={`${BRAND.name} home`}
    >
      <Image
        src={logoMark}
        alt=""
        aria-hidden="true"
        priority
        className="h-9 w-auto flex-none"
      />

      <span
        className={cx(
          'font-display text-[19px] font-black leading-none tracking-[-0.02em]',
          onDark ? 'text-white' : 'text-ink',
        )}
      >
        {BRAND.name}
      </span>
    </Link>
  );
}
