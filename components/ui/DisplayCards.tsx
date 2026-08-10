import type { CSSProperties } from 'react';
import { IconBadge } from './IconBadge';
import { cx } from '@/lib/cx';
import type { DisplayCardsProps } from './contracts';

/**
 * SLOT — the raked deck. See ./README.md.
 *
 * ── Provenance ──
 *
 * Adapted from `display-cards` on 21st.dev. What was kept is the idea: cards
 * sharing one grid cell, offset diagonally, skewed, with the ones behind
 * receding and any card coming forward on hover.
 *
 * Everything else is re-derived, because the original is built for a dark
 * SaaS surface and this site is a near-white one:
 *
 *   • The original recedes back cards with `grayscale(100%)` plus a
 *     `bg-background/50` veil. On `#fefefe` a white veil over a white card is
 *     invisible and greyscale has nothing to desaturate — the depth cue has to
 *     come from the INK and the elevation instead, which is what `--deck-dim`
 *     and the two-tier `--shadow-tile` scale below do.
 *   • Its palette is `bg-muted`, `border-border`, `bg-blue-800`, `text-blue-300`
 *     — shadcn tokens this project does not have. Every surface here is the
 *     site's own `u-tile` recipe, so the deck inherits the brand for free.
 *   • `-skew-y-[8deg]` is halved. At 8° a three-line paragraph of real body
 *     copy visibly fights the reader; the rake still reads at 4°.
 *   • The original stacks on every viewport and reveals only on hover, which
 *     leaves five of six commitments unreadable on a phone or a tablet. The
 *     stack here is gated behind `(hover: hover) and (pointer: fine)` and a
 *     `lg` width — everywhere else the same markup is a plain card grid.
 *
 * ── Why there is no client JS ──
 *
 * The whole deck is `--i` on each card and one CSS transform reading it. No
 * state, no effects, no hydration boundary. It is a Server Component and the
 * section it sits in stays one too.
 */
export function DisplayCards({ cards, label, className }: DisplayCardsProps) {
  return (
    <ul
      className={cx('u-deck', className)}
      style={{ '--deck-count': cards.length } as CSSProperties}
      aria-label={label}
    >
      {cards.map((card, i) => (
        <li
          key={card.title}
          className="u-tile u-deck__card"
          style={{ '--i': i } as CSSProperties}
          /*
           * Non-interactive list items are not normally focusable, and this is
           * the case that earns the exception: in the stacked layout every
           * card but the last is visually cut off at its title, and hover is
           * the only thing that finishes it. A keyboard user with no pointer
           * would have no way to read five of the six. Focus does exactly what
           * hover does — see `.u-deck__card:focus-visible` in globals.css.
           *
           * Screen readers never needed it; the full copy is in the DOM
           * regardless of what is painted over what.
           */
          tabIndex={0}
        >
          <div className="u-deck__body">
            <div className="flex items-center gap-3">
              <IconBadge icon={card.icon} variant={card.badge ?? 'chrome'} size="xs" />
              <h3 className="font-display text-[1.0625rem] font-semibold leading-snug text-ink">
                {card.title}
              </h3>
            </div>
            <p className="u-deck__copy mt-3 text-[14.5px] leading-[1.55] text-ink-body">
              {card.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
