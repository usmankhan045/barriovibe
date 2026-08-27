import { Container } from '@/components/primitives';
import { STATS, STATS_ENABLED } from '@/content/proof';
import { StatValue } from './StatValue';

/**
 * The phone-only '+', kept here rather than as a `suffix` on `STATS` in
 * content/proof.ts. That field is shared by both markups below, and adding
 * it there once actually leaked "43+" onto the desktop card too — this is
 * the fix, and also the reason it must not go back into the shared data.
 * Three labels, not all four: "Point of contact" is a claim that the number
 * STAYS at one, so a '+' on it would contradict the thing it is saying.
 */
const MOBILE_PLUS = new Set(['Services under one roof', 'Specialist disciplines', 'Jurisdictions covered']);

/**
 * The floating proof bar that overlaps the hero, from mockup 1.
 *
 * Renders nothing when STATS_ENABLED is false — the honest option for a new
 * agency with no numbers yet, and better than a row of em-dashes.
 *
 * Two markups, not one reflowed by breakpoint. Below `lg` the four-up card
 * becomes a plain vertical column — dot, number, label, repeated, no tile,
 * no border, no shadow — sitting straight on the page's own white. A card
 * was tried there and dropped: the pattern worth borrowing is the LAYOUT (a
 * dot above a number above a label), not a boxed surface, and a card is also
 * why the desktop version can overlap the hero image while this one cannot —
 * plain text needs the canvas under it, not a photograph. So the pull-up
 * that lets the desktop tile float over the hero is desktop-only; below `lg`
 * this sits in normal flow after it. The desktop card is otherwise untouched.
 */
export function StatBar() {
  if (!STATS_ENABLED) return null;

  return (
    // `id="proof"`: the WhatsApp FAB on the home page watches this element to
    // know when the hero is behind the visitor. See the note at its call
    // site in app/page.tsx for why StatBar, and not a later section, is what
    // "after the hero" actually means.
    <Container id="proof" className="relative z-20 mt-10 lg:-mt-24">
      <div className="u-tile hidden rounded-tile-lg shadow-bar lg:block">
        <dl className="grid grid-cols-2 divide-y divide-line sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1.5 px-6 py-7 text-center lg:py-9"
            >
              <dt className="order-2 text-caption text-ink-body">{stat.label}</dt>
              <dd className="order-1 font-display text-stat tabular text-blue-600">
                <StatValue value={stat.value} countTo={stat.countTo} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* The two colors are the site's own two buttons: the digit is ink,
          the blue button's brand color lights only the '+' and the dot — an
          accent doing one job instead of the whole numeral shouting. */}
      <dl className="flex flex-col items-center gap-9 py-2 text-center lg:hidden">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-2.5">
            <span aria-hidden="true" className="block size-2 rounded-full bg-blue-600" />
            <dd className="font-display text-stat tabular text-ink">
              <StatValue value={stat.value} countTo={stat.countTo} />
              {MOBILE_PLUS.has(stat.label) && <span className="text-blue-600">+</span>}
            </dd>
            <dt className="text-caption tracking-[0.08em] text-ink-body">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </Container>
  );
}
