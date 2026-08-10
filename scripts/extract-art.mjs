#!/usr/bin/env node
/**
 * Chess art extraction.
 *
 * The client's mockups (assets/source/) contain 3D chess renders on a white
 * background. Those renders are the visual signature of the design, so we
 * reuse them — but the source PNGs are 1.3–1.4MB each and contain the whole
 * page layout, not just the art.
 *
 * This script crops each render out and re-encodes it as WebP, taking the
 * hero art from ~1.4MB to well under 100KB. Run once; the output is committed.
 *
 *   pnpm art
 *
 * ── Why the white background is KEPT rather than keyed to transparency ──
 *
 * The obvious move is to make the background transparent. We deliberately
 * don't, for three reasons:
 *
 *   1. The canvas these sit on is #FDFDFE and the render background is
 *      #FEFEFE — a difference of 1/255. It is genuinely invisible.
 *   2. Keying would destroy the contact shadows and floor reflections under
 *      each piece, which are most of what makes the renders read as 3D.
 *   3. Any luminance-threshold key punches holes in the silver pieces, whose
 *      specular highlights are brighter than the background.
 *
 * Instead the art container applies a CSS edge-feather mask, so the render
 * fades into whatever it sits on. Same result, no artefacts, no halos.
 *
 * ── Resolution ceiling ──
 *
 * The source renders are only 600–800px wide, so that is the ceiling on
 * output quality. They are sized in the layout to display at roughly two
 * thirds of native width, which keeps them sharp on 2× displays. If higher-
 * resolution renders ever become available, drop them into assets/source/ and
 * raise MAX_WIDTH — nothing else needs to change.
 */

import { mkdir, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SOURCE_DIR = join(ROOT, 'assets/source');
const OUT_DIR = join(ROOT, 'public/art');

/** Ceiling on output width. Sources are smaller than this; no upscaling. */
const MAX_WIDTH = 1200;
const WEBP_QUALITY = 88;

/**
 * One entry per render.
 *
 * `window` is a generous search box that excludes the mockup's text columns,
 * buttons and cards. Within it, the exact bounding box of the chess pieces is
 * detected automatically — so a slightly different source render still crops
 * correctly without anyone re-measuring pixel coordinates by hand.
 */
const ASSETS = [
  {
    name: 'chess-hero',
    source: 'mockup-1-hero.png',
    window: [855, 120, 1536, 856],
    alt: 'A blue chess queen standing ahead of a row of silver pawns',
  },
  {
    name: 'chess-cluster',
    source: 'mockup-2-disciplines.png',
    // Top edge kept below the mockup's CTA buttons.
    window: [0, 500, 660, 868],
    alt: 'A blue chess king surrounded by silver pieces',
  },
  {
    name: 'chess-formation',
    source: 'mockup-3-why.png',
    window: [700, 30, 1520, 515],
    alt: 'A blue chess king centred in a formation of silver pawns',
  },
  {
    name: 'chess-victory',
    source: 'mockup-4-work.png',
    window: [640, 30, 1520, 520],
    alt: 'A blue chess king standing over a toppled silver piece',
  },
  {
    name: 'chess-pawn',
    source: 'social-post.jpg',
    // Right edge kept clear of the social post's headline text.
    window: [0, 340, 580, 1040],
    alt: 'A blue chess pawn stepping out of a line of silver pawns',
  },
];

/**
 * Anything darker than this is chess; anything lighter is canvas or the faint
 * line-icon watermark. The watermark sits above 245, the canvas at 254, and
 * the lightest part of a silver piece well below 230 — so this cleanly
 * separates subject from background for bounding-box purposes.
 */
const SUBJECT_LUMA_MAX = 230;
/** Breathing room around the detected bounds, in source pixels. */
const PADDING = 8;

/**
 * Finds the bounding box of the chess pieces inside `window`.
 * Returns coordinates relative to the full source image.
 */
async function detectBounds(image, [wx0, wy0, wx1, wy1]) {
  const width = wx1 - wx0;
  const height = wy1 - wy0;

  const { data } = await image
    .clone()
    .extract({ left: wx0, top: wy0, width, height })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y += 1) {
    const row = y * width;
    for (let x = 0; x < width; x += 1) {
      if (data[row + x] < SUBJECT_LUMA_MAX) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < 0) return null;

  return {
    left: wx0 + Math.max(0, minX - PADDING),
    top: wy0 + Math.max(0, minY - PADDING),
    right: wx0 + Math.min(width, maxX + 1 + PADDING),
    bottom: wy0 + Math.min(height, maxY + 1 + PADDING),
  };
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const manifest = [];
  let totalIn = 0;
  let totalOut = 0;

  for (const asset of ASSETS) {
    const sourcePath = join(SOURCE_DIR, asset.source);
    const image = sharp(sourcePath);
    const meta = await image.metadata();

    // Clamp the search window to the actual image, so a differently-sized
    // source fails gracefully instead of throwing an extract error.
    const win = [
      Math.max(0, asset.window[0]),
      Math.max(0, asset.window[1]),
      Math.min(meta.width, asset.window[2]),
      Math.min(meta.height, asset.window[3]),
    ];

    const bounds = await detectBounds(image, win);
    if (!bounds) {
      console.error(`  ✗ ${asset.name}: no subject found in window. Check the coordinates.`);
      process.exitCode = 1;
      continue;
    }

    const cropWidth = bounds.right - bounds.left;
    const cropHeight = bounds.bottom - bounds.top;
    const outWidth = Math.min(cropWidth, MAX_WIDTH);

    const outPath = join(OUT_DIR, `${asset.name}.webp`);

    await image
      .clone()
      .extract({
        left: bounds.left,
        top: bounds.top,
        width: cropWidth,
        height: cropHeight,
      })
      .resize({ width: outWidth, withoutEnlargement: true, kernel: 'lanczos3' })
      .webp({ quality: WEBP_QUALITY, effort: 6 })
      .toFile(outPath);

    const inSize = (await stat(sourcePath)).size;
    const outSize = (await stat(outPath)).size;
    const outMeta = await sharp(outPath).metadata();

    totalIn += inSize;
    totalOut += outSize;

    manifest.push({
      name: asset.name,
      width: outMeta.width,
      height: outMeta.height,
      alt: asset.alt,
    });

    const kb = (n) => `${(n / 1024).toFixed(0)}KB`;
    console.log(
      `  ✓ ${asset.name.padEnd(16)} ${String(outMeta.width).padStart(4)}×${String(outMeta.height).padEnd(4)}  ` +
        `${kb(inSize).padStart(7)} → ${kb(outSize).padStart(6)}`,
    );
  }

  console.log(
    `\n  ${(totalIn / 1024 / 1024).toFixed(2)}MB of source → ${(totalOut / 1024).toFixed(0)}KB of art\n`,
  );

  console.log('  Import these with a static import so next/image gets dimensions');
  console.log('  and a blur placeholder for free:\n');
  for (const m of manifest) {
    console.log(`    import ${m.name.replace(/-./g, (s) => s[1].toUpperCase())} from '@/public/art/${m.name}.webp';`);
  }
  console.log('');
}

// Guard against a missing source directory, which is the likeliest failure
// after a fresh clone if assets/ was gitignored by accident.
try {
  await readdir(SOURCE_DIR);
} catch {
  console.error(`  ✗ assets/source/ not found. The mockup PNGs are the input to this script.`);
  process.exit(1);
}

await main();
