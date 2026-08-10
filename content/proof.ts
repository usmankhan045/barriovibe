/**
 * Stats and client logos.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  EVERYTHING IN THIS FILE IS A PLACEHOLDER.                            │
 * │  Replace with real figures before launch, or set `enabled: false`.    │
 * └──────────────────────────────────────────────────────────────────────┘
 *
 * Placeholders render as hyphens rather than invented numbers. An unfilled
 * stat therefore looks obviously unfinished on the page instead of shipping a
 * credible-looking fabrication — which is the failure mode that actually
 * matters for a new agency.
 *
 * Set `enabled: false` on either block to hide that section entirely. That is
 * the honest option if the numbers are not there yet: capability speaks for
 * itself, invented credibility does not.
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

/** TODO: replace all four with real, defensible figures. */
export const STATS: Stat[] = [
  { value: '-', label: 'Businesses served' },
  { value: '19', countTo: 19, label: 'Services under one roof' },
  { value: '-', label: 'Client retention' },
  { value: '-', label: 'Filings on time' },
];

export interface ClientLogo {
  name: string;
  /** Path under /public/logos. Omit to render the name as a wordmark instead. */
  src?: string;
}

export const LOGOS_ENABLED = false;

/** TODO: real client names and logo files, then set LOGOS_ENABLED to true. */
export const CLIENT_LOGOS: ClientLogo[] = [];
