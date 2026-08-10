#!/usr/bin/env node
/**
 * Brand color guard.
 *
 * Two jobs:
 *
 *   1. Assert the client's two frozen brand colors are still present verbatim
 *      in app/tokens.css. A refactor, a "cleanup", or a well-meaning color
 *      tweak cannot silently drift them.
 *
 *   2. Assert no other file contains a raw hex color. Every component must go
 *      through var(--color-*) — that is what guarantees a dropped-in component
 *      inherits the brand, and what makes a future palette change a one-file
 *      edit rather than a hunt.
 *
 * Run: pnpm check:tokens
 */

import { readFile, readdir } from 'node:fs/promises';
import { join, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const TOKENS_FILE = join(ROOT, 'app/tokens.css');

/** The client's exact brand colors. Do not edit without their say-so. */
const FROZEN = [
  { name: 'Chess Blue', hex: '#0B2F92' },
  { name: 'Metallic Silver', hex: '#C9CDD3' },
];

const SCAN_EXTENSIONS = new Set(['.css', '.ts', '.tsx', '.js', '.jsx', '.mjs', '.svg']);
const SKIP_DIRS = new Set(['node_modules', '.next', '.git', 'out', 'public', 'assets', 'scripts']);

/**
 * The only files allowed to hold hex literals.
 *
 * tokens.css is the source of truth. The mirrors restate a few of its values
 * for contexts that cannot read CSS at all:
 *   • lib/tokens.ts — meta theme-color, next/og image generation
 *   • app/icon.svg  — the favicon, which is a standalone file
 *
 * Check 3 below asserts every hex in a mirror also exists in tokens.css, so
 * a brand color change cannot leave a mirror silently stale.
 */
const TOKENS_MIRRORS = ['lib/tokens.ts', 'app/icon.svg'];
const HEX_ALLOWED = new Set(['app/tokens.css', ...TOKENS_MIRRORS]);

/** #RGB, #RGBA, #RRGGBB, #RRGGBBAA — but not longer hashes or fragment ids. */
const HEX_PATTERN = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})(?![0-9a-fA-F])/g;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') && entry.name !== '.') continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      yield* walk(full);
    } else if (SCAN_EXTENSIONS.has(extname(entry.name))) {
      yield full;
    }
  }
}

const failures = [];

// ── 1. Frozen colors still present ──────────────────────────────────────────
let tokens;
try {
  tokens = await readFile(TOKENS_FILE, 'utf8');
} catch {
  failures.push(`app/tokens.css is missing. It is the source of truth for every design value.`);
}

if (tokens) {
  for (const { name, hex } of FROZEN) {
    // Case-insensitive: the file writes them lowercase, the brand doc uppercase.
    if (!tokens.toLowerCase().includes(hex.toLowerCase())) {
      failures.push(
        `FROZEN BRAND COLOR MISSING — ${name} (${hex}) is not in app/tokens.css.\n` +
          `    This is the client's exact brand color. It must appear verbatim.`,
      );
    }
  }
}

// ── 2. No raw hex outside tokens.css ────────────────────────────────────────
for await (const file of walk(ROOT)) {
  const rel = relative(ROOT, file);
  if (HEX_ALLOWED.has(rel)) continue;

  const source = await readFile(file, 'utf8');
  const lines = source.split('\n');

  lines.forEach((line, i) => {
    // Skip comment lines — docs legitimately quote the brand hex values.
    const trimmed = line.trim();
    if (trimmed.startsWith('*') || trimmed.startsWith('//') || trimmed.startsWith('/*')) return;

    const matches = line.match(HEX_PATTERN);
    if (matches) {
      failures.push(
        `RAW HEX — ${rel}:${i + 1}  found ${matches.join(', ')}\n` +
          `    Use var(--color-*) from app/tokens.css instead. Raw hex breaks the` +
          ` single-source-of-truth guarantee.`,
      );
    }
  });
}

// ── 3. Mirrors must not drift from tokens.css ───────────────────────────────
if (tokens) {
  const lowerTokens = tokens.toLowerCase();

  for (const mirrorPath of TOKENS_MIRRORS) {
    const mirror = await readFile(join(ROOT, mirrorPath), 'utf8');
    const seen = new Set();

    for (const line of mirror.split('\n')) {
      const trimmed = line.trim();
      if (trimmed.startsWith('*') || trimmed.startsWith('//') || trimmed.startsWith('/*')) {
        continue;
      }

      for (const hex of line.match(HEX_PATTERN) ?? []) {
        const lower = hex.toLowerCase();
        if (seen.has(lower)) continue;
        seen.add(lower);

        // #fff is an acceptable shorthand for #ffffff in SVG.
        const expanded =
          lower.length === 4
            ? `#${lower[1]}${lower[1]}${lower[2]}${lower[2]}${lower[3]}${lower[3]}`
            : lower;

        if (!lowerTokens.includes(lower) && !lowerTokens.includes(expanded)) {
          failures.push(
            `MIRROR DRIFT — ${mirrorPath} declares ${hex}, which is not in app/tokens.css.\n` +
              `    Mirrors may only restate values that exist in the CSS source of truth.`,
          );
        }
      }
    }
  }
}

// ── Report ──────────────────────────────────────────────────────────────────
if (failures.length > 0) {
  console.error(`\n  ✗ Token check failed — ${failures.length} problem(s):\n`);
  for (const f of failures) console.error(`  • ${f}\n`);
  process.exit(1);
}

console.log(
  `  ✓ Token check passed — frozen brand colors intact, TS mirror in sync, no raw hex elsewhere`,
);
