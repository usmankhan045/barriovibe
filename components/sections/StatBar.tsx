import { Container } from '@/components/primitives';
import { STATS, STATS_ENABLED } from '@/content/proof';
import { StatValue } from './StatValue';

/**
 * The floating proof bar that overlaps the hero, from mockup 1.
 *
 * Renders nothing when STATS_ENABLED is false — the honest option for a new
 * agency with no numbers yet, and better than a row of em-dashes.
 *
 * Two markups, not one reflowed by breakpoint. Below `lg` this becomes a
 * vertical, glowing dot-and-number column on the coverflow's own dark
 * material (`--grad-glass-card` — see the note on `.u-glow-dot` in
 * globals.css) rather than the four-up white tile: a 2x2 grid of labelled
 * cells reads as a form on a phone, where a lit thread of numbers reads as a
 * credential. The desktop tile below is untouched.
 */
export function StatBar() {
  if (!STATS_ENABLED) return null;

  return (
    <Container className="relative z-20 -mt-20 lg:-mt-24">
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

      <dl
        className="flex flex-col items-center gap-8 overflow-hidden rounded-tile-lg px-8 py-11 text-center shadow-bar lg:hidden"
        style={{ backgroundImage: 'var(--grad-glass-card)' }}
      >
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-2.5">
            <span aria-hidden="true" className="u-glow-dot size-2" />
            <dd className="font-display text-stat tabular text-white">
              <StatValue value={stat.value} countTo={stat.countTo} suffix={stat.suffix} />
            </dd>
            <dt className="text-caption tracking-[0.08em] text-white/60">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </Container>
  );
}
