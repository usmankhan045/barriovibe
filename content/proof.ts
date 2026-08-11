import { SERVICE_COUNT } from './services';
import { PILLARS } from './pillars';

const PILLAR_COUNT = PILLARS.length;

/**
 * Stats and client logos.
 *
 * The rule for both blocks: nothing here may be invented. A placeholder
 * renders as a hyphen rather than a plausible number, so an unfilled stat
 * looks unfinished instead of shipping a credible-looking fabrication. For a
 * new firm that is the failure mode that actually costs you, because the one
 * number a prospect can check is the one that decides whether they believe the
 * rest of the page.
 *
 * Setting `enabled: false` hides a block entirely, which is the right call
 * when the numbers do not exist yet. Capability speaks for itself; invented
 * credibility does not survive one conversation.
 */

export interface Stat {
  /** The figure itself. Use '-' while unknown. */
  value: string;
  /** Numeric target for the count-up animation. Omit to disable animation. */
  countTo?: number;
  /** Suffix appended after the animated number, e.g. '+' or '%'. */
  suffix?: string;
  label: string;
}

export const STATS_ENABLED = true;

/**
 * EVERY FIGURE HERE IS TRUE AND CHECKABLE ON THIS SITE.
 *
 * Three of the four used to be a hyphen: "Businesses served -", "Client
 * retention -", "Filings on time -". A row of hyphens sitting across the hero
 * is worse than no bar at all, because the first thing a visitor reads is that
 * the firm has nothing to report.
 *
 * The fix was not to invent numbers. It was to count the things that are
 * genuinely countable today. Services and disciplines come straight from the
 * content layer, so they cannot drift. Jurisdictions is four because the
 * catalogue covers Pakistan, Saudi Arabia, the UAE and the United Kingdom, and
 * International Expansion has a page for each of the last three. One point of
 * contact is the firm's actual operating model, stated everywhere else on the
 * site.
 *
 * When real performance figures exist, replace the third and fourth of these
 * with them: client retention and filings on time were the intended slots and
 * are far stronger than a structural count. Until then, do not put a number
 * here that nobody could check.
 */
export const STATS: Stat[] = [
  { value: String(SERVICE_COUNT), countTo: SERVICE_COUNT, label: 'Services under one roof' },
  { value: String(PILLAR_COUNT), countTo: PILLAR_COUNT, label: 'Specialist disciplines' },
  { value: '4', countTo: 4, label: 'Jurisdictions covered' },
  { value: '1', countTo: 1, label: 'Point of contact' },
];

export interface ClientLogo {
  name: string;
  /** Path under /public/logos. Omit to render the name as a wordmark instead. */
  src?: string;
}

export const LOGOS_ENABLED = false;

/** TODO: real client names and logo files, then set LOGOS_ENABLED to true. */
export const CLIENT_LOGOS: ClientLogo[] = [];
