import type { StaticImageData } from 'next/image';

import chessHero from '@/public/art/chess-hero.webp';
import chessCluster from '@/public/art/chess-cluster.webp';
import chessFormation from '@/public/art/chess-formation.webp';
import chessVictory from '@/public/art/chess-victory.webp';
import chessPawn from '@/public/art/chess-pawn.webp';

import stepDiscover from '@/public/art/step-discover.webp';
import stepScope from '@/public/art/step-scope.webp';
import stepExecute from '@/public/art/step-execute.webp';
import stepReport from '@/public/art/step-report.webp';

/**
 * The five chess renders, cropped out of the client's own mockups by
 * `pnpm art`. Static imports so next/image gets intrinsic dimensions and a
 * blur placeholder for free — which is half of how CLS stays at zero.
 *
 * All five carry their white render background. See scripts/extract-art.mjs
 * for why, and use <ChessArt> to render them: it applies the edge-feather
 * mask that blends them into the surrounding section.
 */

export interface ArtAsset {
  src: StaticImageData;
  /**
   * These renders are decorative — they illustrate a metaphor, they do not
   * convey information the copy omits. `decorative: true` means <ChessArt>
   * renders them with an empty alt and aria-hidden, which is correct: a
   * screen reader announcing "blue chess king among silver pawns" on four
   * separate sections is noise, not access.
   */
  alt: string;
  decorative: boolean;
}

export const ART = {
  /** Hero. A blue queen ahead of a receding row of silver pawns. */
  hero: {
    src: chessHero,
    alt: 'A blue chess queen standing ahead of a row of silver pawns',
    decorative: true,
  },
  /** "Five disciplines" — a blue king among silver pieces. */
  cluster: {
    src: chessCluster,
    alt: 'A blue chess king surrounded by silver pieces',
    decorative: true,
  },
  /** "Why choose us" — a blue king centred in a silver formation. */
  formation: {
    src: chessFormation,
    alt: 'A blue chess king centred in a formation of silver pawns',
    decorative: true,
  },
  /** "Results" — a blue king over a toppled silver piece. */
  victory: {
    src: chessVictory,
    alt: 'A blue chess king standing over a toppled silver piece',
    decorative: true,
  },
  /** Tall portrait crop. Suits narrow columns and inner page heroes. */
  pawn: {
    src: chessPawn,
    alt: 'A blue chess pawn stepping out of a line of silver pawns',
    decorative: true,
  },
} as const satisfies Record<string, ArtAsset>;

export type ArtName = keyof typeof ART;

/**
 * Step photography for the "How we work" timeline.
 *
 * Kept separate from ART rather than merged into it, because the two are
 * different kinds of picture and are used differently. The chess renders are
 * metaphor on a white ground, are `decorative`, and are rendered through
 * <ChessArt> with its edge-feather mask. These are photographs that fill a
 * card's media band edge to edge, and they are NOT decorative — each one shows
 * the step it sits on, so each carries a real alt.
 *
 * Unsplash stock, downloaded and committed by `pnpm art:steps`. The photo IDs
 * and the reasoning for not hot-linking them are in scripts/fetch-step-art.mjs.
 * Swap the four files for client photography and nothing here changes.
 */
export const STEP_ART = {
  discover: {
    src: stepDiscover,
    alt: 'Four people talking around a table of open laptops',
    decorative: false,
  },
  scope: {
    src: stepScope,
    alt: 'Printed charts and figures spread across a meeting table',
    decorative: false,
  },
  execute: {
    src: stepExecute,
    alt: 'Two colleagues working side by side at desktop screens',
    decorative: false,
  },
  report: {
    src: stepReport,
    alt: 'A laptop screen showing analytics charts on a desk',
    decorative: false,
  },
} as const satisfies Record<string, ArtAsset>;

export type StepArtName = keyof typeof STEP_ART;
