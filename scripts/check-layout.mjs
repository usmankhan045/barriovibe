#!/usr/bin/env node
/**
 * Layout guard — catches the mobile-overflow class of bug at build time.
 *
 * ── The bug this exists to prevent ──
 *
 * A responsive grid written as:
 *
 *     <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
 *
 * looks correct, and is wrong on mobile. Below the `lg` breakpoint there is no
 * explicit `grid-template-columns`, so the browser creates ONE IMPLICIT column
 * sized `auto` — which means `minmax(min-content, max-content)`. An implicit
 * auto column grows to its content's **max-content** width and overflows the
 * container instead of wrapping.
 *
 * On this site that surfaced as the home page laying out 453px wide inside a
 * 342px column on a 390px viewport, clipping the right edge of every card in
 * the section. `overflow-x: clip` on <body> hid the scrollbar, so it looked
 * fine at a glance and was only visible as missing content.
 *
 * The fix is always the same: declare a base `grid-cols-1`. Tailwind emits
 * `repeat(1, minmax(0, 1fr))`, whose zero minimum lets the track shrink to the
 * container.
 *
 * Run: pnpm check:layout
 */

import { readFile, readdir } from 'node:fs/promises';
import { join, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SCAN_DIRS = ['app', 'components'];

/** Matches a className string containing a bare `grid` display utility. */
const CLASS_ATTR = /className=(?:"([^"]*)"|\{cx\(([^)]*)\)\})/g;

const failures = [];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (extname(entry.name) === '.tsx') yield full;
  }
}

for (const scanDir of SCAN_DIRS) {
  for await (const file of walk(join(ROOT, scanDir))) {
    const rel = relative(ROOT, file);
    const source = await readFile(file, 'utf8');

    source.split('\n').forEach((line, i) => {
      for (const match of line.matchAll(CLASS_ATTR)) {
        const classes = (match[1] ?? match[2] ?? '').replace(/['"]/g, ' ');
        const tokens = classes.split(/\s+/);

        // Only interested in elements that turn on grid display.
        if (!tokens.includes('grid')) continue;

        // `place-items` / `place-content` grids are single-cell centring
        // helpers, not layout grids — they have no column tracks to size.
        if (tokens.some((t) => t.startsWith('place-'))) continue;

        // A base (unprefixed) column count is what makes the track shrinkable.
        const hasBaseCols = tokens.some(
          (t) => /^grid-cols-/.test(t) && !t.includes(':'),
        );
        // `grid-flow-col` grids intentionally size columns to content.
        const flowsCol = tokens.some((t) => t.includes('grid-flow-col'));

        if (!hasBaseCols && !flowsCol) {
          const responsive = tokens.filter((t) => /:grid-cols-/.test(t));
          failures.push(
            `${rel}:${i + 1}\n` +
              `    grid has no base "grid-cols-*"` +
              (responsive.length ? ` (only ${responsive.join(', ')})` : '') +
              `\n    Its single implicit column sizes to max-content and will overflow on` +
              ` mobile.\n    Add "grid-cols-1".`,
          );
        }
      }
    });
  }
}

if (failures.length > 0) {
  console.error(`\n  ✗ Layout check failed — ${failures.length} problem(s):\n`);
  for (const f of failures) console.error(`  • ${f}\n`);
  process.exit(1);
}

console.log('  ✓ Layout check passed — every grid declares a base column count');
