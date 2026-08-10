#!/usr/bin/env node
/**
 * Process photography.
 *
 * The "How we work" timeline carries one photograph per step. Unlike the chess
 * renders, these are not in the client's mockups — they are Unsplash stock,
 * chosen per step and listed below with their photo IDs so the provenance of
 * every image on this site is traceable to a line of source.
 *
 *   pnpm art:steps
 *
 * ── Why these are downloaded and committed, not hot-linked ──
 *
 * The obvious move is `<Image src="https://images.unsplash.com/…">` with a
 * `remotePatterns` entry. Three things rule it out, and all three are things
 * this codebase has already decided:
 *
 *   1. next.config.ts states the only server surface is /api/contact, and
 *      points at the swap path to a fully static export. A remote <Image>
 *      adds the on-demand optimizer route and quietly ends that.
 *   2. Static imports are what give next/image intrinsic dimensions and a
 *      generated blur placeholder — "half of how CLS stays at zero", per
 *      lib/art.ts. A remote src has neither, so every card would need a
 *      hand-written aspect box and would still flash on load.
 *   3. The source files are 0.3–10MB each. Serving them unoptimized to avoid
 *      (1) is not an option, and resizing at Unsplash's CDN puts a page of
 *      the site behind a third party's uptime.
 *
 * Downloading once and committing costs ~30KB per image and removes all
 * three problems. Same trade extract-art.mjs already makes.
 *
 * ── Licence ──
 *
 * Unsplash images are free to use commercially without permission or
 * attribution. Attribution is appreciated, so the photo IDs are kept here and
 * echoed in lib/art.ts. If the client supplies their own photography, replace
 * the four files and nothing else changes.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const OUT_DIR = join(ROOT, 'public/art');

/**
 * Output geometry.
 *
 * Square. This started as 1000×420 — a banner, chosen so the photograph could
 * not dominate a card whose job is to carry four lines of copy. Square is what
 * was asked for, and it is a bigger change than it sounds: the media band is
 * the full width of the card, so going from 2.38:1 to 1:1 makes the image
 * nearly two and a half times taller. What keeps the card in proportion is
 * capping its WIDTH instead — see `--card-w` in globals.css.
 *
 * 1100 rather than 1000 because the card is displayed around 420px wide now,
 * and 1100 clears 2× on a retina display with room for the optimizer's
 * intermediate sizes to be useful.
 */
const WIDTH = 1100;
const HEIGHT = 1100;
const WEBP_QUALITY = 80;

/**
 * One entry per process step, in step order.
 *
 * `position` is sharp's gravity for the crop. These are wide photographs being
 * cut to a much wider band, so the subject is rarely dead centre and the
 * default would behead someone.
 */
const ASSETS = [
  {
    name: 'step-discover',
    /** https://unsplash.com/photos/009f0129c71c — people talking over laptops */
    photo: 'photo-1522071820081-009f0129c71c',
    position: 'centre',
    alt: 'Four people talking around a table of open laptops',
  },
  {
    name: 'step-scope',
    /** https://unsplash.com/photos/c3d57bc86b40 — documents and charts on a desk */
    photo: 'photo-1454165804606-c3d57bc86b40',
    position: 'centre',
    alt: 'Printed charts and figures spread across a meeting table',
  },
  {
    name: 'step-execute',
    /** https://unsplash.com/photos/e076c223a692 — two people working at screens */
    photo: 'photo-1551434678-e076c223a692',
    position: 'centre',
    alt: 'Two colleagues working side by side at desktop screens',
  },
  {
    name: 'step-report',
    /** https://unsplash.com/photos/afdab827c52f — a laptop showing analytics */
    photo: 'photo-1460925895917-afdab827c52f',
    position: 'centre',
    alt: 'A laptop screen showing analytics charts on a desk',
  },
];

await mkdir(OUT_DIR, { recursive: true });

for (const asset of ASSETS) {
  const url = `https://images.unsplash.com/${asset.photo}`;
  const response = await fetch(url);

  if (!response.ok) {
    // Loud, not silent. One of the IDs in the component this was adapted from
    // was already a 404, and a missing image that fails quietly here becomes a
    // broken card three steps later.
    console.error(`  ✗ ${asset.name}: ${url} returned ${response.status}`);
    process.exitCode = 1;
    continue;
  }

  const source = Buffer.from(await response.arrayBuffer());
  const out = join(OUT_DIR, `${asset.name}.webp`);

  const buffer = await sharp(source)
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: asset.position })
    .webp({ quality: WEBP_QUALITY })
    .toBuffer();

  await writeFile(out, buffer);

  const kb = (buffer.length / 1024).toFixed(1);
  const srcKb = (source.length / 1024).toFixed(0);
  console.log(`  ✓ ${asset.name}.webp  ${WIDTH}×${HEIGHT}  ${srcKb}KB → ${kb}KB`);
}

console.log('\n  Step photography written to public/art/. Commit the output.');
