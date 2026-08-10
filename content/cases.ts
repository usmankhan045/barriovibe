import type { PillarSlug } from './types';

/**
 * Case studies.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  PLACEHOLDER. Set CASES_ENABLED to false until real work exists.      │
 * └──────────────────────────────────────────────────────────────────────┘
 *
 * Deliberately shipped disabled. Invented case studies with invented metrics
 * are the single easiest thing for a prospective client to catch out, and the
 * hardest reputational damage to undo. The home page falls back to the
 * capability sections when this is off, which is honest and still persuasive.
 *
 * When real work lands: fill the array, flip the flag, and every metric below
 * must be one you can evidence if asked.
 */

export interface CaseStudy {
  slug: string;
  pillar: PillarSlug;
  /** Client name, or a description if under NDA — e.g. 'A Lahore textile exporter'. */
  client: string;
  title: string;
  summary: string;
  /** Exactly two, rendered as the split stat footer on the case tile. */
  metrics: [{ value: string; label: string }, { value: string; label: string }];
}

export const CASES_ENABLED = false;

/** TODO: real engagements with evidenced numbers. */
export const CASE_STUDIES: CaseStudy[] = [];
