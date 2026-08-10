import { Container } from '@/components/primitives';
import { STATS, STATS_ENABLED } from '@/content/proof';
import { StatValue } from './StatValue';

/**
 * The floating proof bar that overlaps the hero, from mockup 1.
 *
 * Renders nothing when STATS_ENABLED is false — the honest option for a new
 * agency with no numbers yet, and better than a row of em-dashes.
 */
export function StatBar() {
  if (!STATS_ENABLED) return null;

  return (
    <Container className="relative z-20 -mt-20 lg:-mt-24">
      <div className="u-tile rounded-tile-lg shadow-bar">
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
    </Container>
  );
}
