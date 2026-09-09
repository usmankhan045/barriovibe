#!/usr/bin/env tsx
/**
 * Is a guide due to appear today?
 *
 * The daily workflow asks this before doing anything, so a deploy hook fires
 * only on days something is actually due rather than 365 times a year to
 * publish fifty-four guides.
 *
 * Writes GitHub Actions output syntax on stdout (`due=true|false`), and a
 * human-readable summary on stderr so the run log says which guide went live
 * without the output parsing seeing it.
 *
 * Run: pnpm tsx scripts/guides-due.ts [YYYY-MM-DD]
 *
 * The optional date argument is for testing. Without it, today.
 */

import { ALL_GUIDES, guideHref } from '../content/guides';

const today = process.argv[2] ?? new Date().toISOString().slice(0, 10);

if (!/^\d{4}-\d{2}-\d{2}$/.test(today)) {
  console.error(`Not a date: ${today}. Expected YYYY-MM-DD.`);
  process.exit(2);
}

const dueToday = ALL_GUIDES.filter((g) => g.publishedAt === today);
const live = ALL_GUIDES.filter((g) => g.publishedAt <= today);
const upcoming = ALL_GUIDES.filter((g) => g.publishedAt > today).sort((a, b) =>
  a.publishedAt.localeCompare(b.publishedAt),
);

// stdout: consumed by the workflow via $GITHUB_OUTPUT. Nothing else goes here.
console.log(`due=${dueToday.length > 0}`);
console.log(`count=${dueToday.length}`);

// stderr: the run log.
const log = (s: string) => console.error(s);

log(`Date: ${today}`);
log(`Guides live after this build: ${live.length} of ${ALL_GUIDES.length}`);

if (dueToday.length > 0) {
  log('');
  log(`Publishing today:`);
  for (const g of dueToday) {
    log(`  ${guideHref(g)}`);
    log(`    ${g.title}`);
  }
} else {
  log('');
  log('Nothing due today.');
}

if (upcoming.length > 0) {
  const next = upcoming[0]!;
  log('');
  log(`Next: ${next.publishedAt}, ${guideHref(next)}`);
  log(`${upcoming.length} guide(s) still scheduled.`);
} else {
  log('');
  log('No guides remain scheduled. Add more, or the daily run has nothing left to do.');
}
