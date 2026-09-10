#!/usr/bin/env tsx
/**
 * Is a guide due to appear right now?
 *
 * The publishing workflow asks this before doing anything, so a deploy hook
 * fires only when a guide is genuinely waiting rather than on every scheduled
 * run forever.
 *
 * ## What "due" means, and why it is not "equals now"
 *
 * Guides carry a `publishedAt` timestamp and the site's gate publishes
 * everything at or before the build time. So the question this script answers
 * is not "is a guide stamped exactly now" but "would a build now put something
 * live that is not live yet".
 *
 * That distinction is what makes a missed run harmless. If the 07:00 slot does
 * not fire, the guide is not lost: it is simply still waiting, and the next run
 * that happens picks it up along with anything else outstanding. Comparing for
 * equality would have skipped it forever.
 *
 * ## How it knows what is already live
 *
 * It cannot ask the deployed site, so it infers: the previous slot boundary is
 * the last moment a scheduled build ran. Anything stamped at or before that is
 * assumed already out, and anything between then and now is what this build
 * would newly publish. The window is passed in rather than guessed, so a manual
 * dispatch outside slot times still reports honestly.
 *
 * Writes GitHub Actions output syntax on stdout (`due=true|false`), and a
 * human-readable summary on stderr so the run log says which guide went live
 * without the output parsing seeing it.
 *
 * Run: pnpm tsx scripts/guides-due.ts [ISO timestamp or YYYY-MM-DD]
 *
 * The optional argument is for testing. Without it, now.
 */

import { ALL_GUIDES, clusterHref, guideHref } from '../content/guides';

/**
 * The publishing slots, as UTC hours. Must match the crons in
 * .github/workflows/publish-guides.yml: 08:00 and 12:00 Pakistan time.
 */
const SLOT_HOURS_UTC = [3, 7];

/** How long before `now` counts as "the previous run should have caught this". */
const LOOKBACK_MS = 12 * 60 * 60 * 1000;

const arg = process.argv[2];
let now: Date;

if (!arg) {
  now = new Date();
} else if (/^\d{4}-\d{2}-\d{2}$/.test(arg)) {
  // A bare date means the end of that day, matching GUIDE_BUILD_DATE.
  now = new Date(`${arg}T23:59:59Z`);
} else {
  now = new Date(arg);
  if (Number.isNaN(now.getTime())) {
    console.error(`Not a date or timestamp: ${arg}. Expected YYYY-MM-DD or an ISO 8601 instant.`);
    process.exit(2);
  }
}

const nowIso = now.toISOString();

/**
 * The start of the window this build is responsible for.
 *
 * The most recent slot boundary STRICTLY BEFORE this one, and the window is
 * then treated as inclusive of that boundary.
 *
 * Both halves of that matter. Opening the window at the previous slot rather
 * than the current one means a run that fires at 07:00 after a missed 03:00
 * still reports both of the day's guides rather than only its own. Making the
 * boundary inclusive means the guide stamped exactly at that previous slot is
 * inside the window rather than sitting on its edge and being dropped.
 *
 * The effect is that a slot's own guide is always reported, and a guide left
 * behind by a missed run is reported again at the next one. Reporting a guide
 * twice across two runs is harmless: the deploy publishes whatever the gate
 * says is live, so the second run simply confirms what the first already did.
 * Failing to report one is not harmless, which is why the bias runs this way.
 *
 * Falls back to a fixed lookback when no earlier slot sits within it, so a long
 * gap in runs still reports everything outstanding rather than silently
 * narrowing the window to nothing.
 */
function windowStart(): Date {
  // A whole slot before now, so a boundary exactly equal to now is excluded and
  // the one before it is found instead.
  const cutoff = now.getTime() - 1;

  const candidates: Date[] = [];
  for (const dayOffset of [0, -1]) {
    for (const hour of SLOT_HOURS_UTC) {
      const d = new Date(now);
      d.setUTCDate(d.getUTCDate() + dayOffset);
      d.setUTCHours(hour, 0, 0, 0);
      if (d.getTime() < cutoff) candidates.push(d);
    }
  }
  const mostRecent = candidates.sort((a, b) => b.getTime() - a.getTime())[0];
  const floor = new Date(now.getTime() - LOOKBACK_MS);
  return mostRecent && mostRecent.getTime() > floor.getTime() ? mostRecent : floor;
}

const since = windowStart().toISOString();

/*
 * Compared as instants, not as strings. `publishedAt` is written
 * `2026-09-10T03:00:00Z` while `toISOString()` yields
 * `2026-09-10T03:00:00.000Z`; those are the same moment but `Z` sorts after
 * `.`, so a string comparison calls the guide "not yet due" throughout its own
 * slot. Same rule as the gate in content/guides/index.ts.
 */
const nowMs = now.getTime();
const sinceMs = windowStart().getTime();
const at = (g: { publishedAt: string }) => Date.parse(g.publishedAt);

const live = ALL_GUIDES.filter((g) => at(g) <= nowMs);
// Inclusive of the window's own boundary: if the 03:00 run was missed, the
// 07:00 run must report BOTH guides, including the one stamped exactly 03:00.
const dueNow = live.filter((g) => at(g) >= sinceMs);
const upcoming = ALL_GUIDES.filter((g) => at(g) > nowMs).sort((a, b) => at(a) - at(b));

// stdout: consumed by the workflow via $GITHUB_OUTPUT. Nothing else goes here.
console.log(`due=${dueNow.length > 0}`);
console.log(`count=${dueNow.length}`);
/*
 * The hrefs of what is going live, space separated, for the IndexNow ping.
 *
 * Submitting only the paths that actually changed is what the protocol asks
 * for, and it is also the honest thing to send: a blanket resubmission of the
 * whole site on every slot would be noise. The cluster hub goes with each
 * guide because its listing changes when a guide appears beneath it.
 */
console.log(
  `paths=${[...new Set(dueNow.flatMap((g) => [guideHref(g), clusterHref(g.cluster)]))].join(' ')}`,
);

// stderr: the run log.
const log = (s: string) => console.error(s);

log(`Now:   ${nowIso}`);
log(`Since: ${since}`);
log(`Guides live after this build: ${live.length} of ${ALL_GUIDES.length}`);

if (dueNow.length > 0) {
  log('');
  log('Publishing at this slot:');
  for (const g of dueNow) {
    log(`  ${g.publishedAt}  ${guideHref(g)}`);
    log(`    ${g.title}`);
  }
} else {
  log('');
  log('Nothing new is due at this slot.');
}

if (upcoming.length > 0) {
  const next = upcoming[0]!;
  log('');
  log(`Next: ${next.publishedAt}, ${guideHref(next)}`);
  log(`${upcoming.length} guide(s) still scheduled.`);
} else {
  log('');
  log('No guides remain scheduled. Add more, or the scheduled runs have nothing left to do.');
}
