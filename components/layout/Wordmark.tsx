import Link from 'next/link';
import { BRAND } from '@/content/site';
import { cx } from '@/lib/cx';

/**
 * The wordmark.
 *
 * Set as type rather than an image file, deliberately: there is no drawn logo
 * for BarrioVibe yet, and type scales, recolours and stays crisp without one.
 * Changing `BRAND.name` in content/site.ts renames the entire site.
 *
 * Mark plus the name on one line. The mockups' lockup also carried a small
 * letterspaced descriptor under the name; it was dropped from the lockup on
 * request. `BRAND.descriptor` still exists and is still rendered by
 * `app/opengraph-image.tsx`, so removing it from content/site.ts would break
 * the OG card.
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
      {/* Stand-in mark: a chess pawn in the brand gradient, matching the
          favicon. A pawn rather than an initial deliberately — it survives
          the agency being renamed, and ties the lockup to the chess art.
          Replace wholesale when the real logo exists. */}
      <span
        className="grid size-9 flex-none place-items-center rounded-[11px] text-white shadow-btn-blue"
        style={{ backgroundImage: 'var(--grad-blue)' }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 64 64" className="size-[22px]" fill="currentColor">
          <path d="M32 12a7.4 7.4 0 0 0-4.3 13.4c-1.3 1.2-2.2 2.8-2.5 4.6h13.6c-.3-1.8-1.2-3.4-2.5-4.6A7.4 7.4 0 0 0 32 12Zm-8.3 21.6c1.4 4-.2 8.3-3.4 11.4-.6.6-.9 1.4-.9 2.2v1.2h25.2v-1.2c0-.8-.3-1.6-.9-2.2-3.2-3.1-4.8-7.4-3.4-11.4Zm-6.4 18.6h29.4a2 2 0 0 1 2 2V56H15.3v-1.8a2 2 0 0 1 2-2Z" />
        </svg>
      </span>

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
