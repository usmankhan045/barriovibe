/**
 * TypeScript mirror of the design tokens.
 *
 * CSS variables cover ~99% of the site. This file exists for the handful of
 * places that cannot read CSS at all:
 *
 *   • `viewport.themeColor` in app/layout.tsx — a meta tag value
 *   • Open Graph images generated with next/og at build time
 *   • Any inline SVG needing a literal fill in a generated image
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  This is the ONLY other file allowed to hold hex values, and         │
 * │  `pnpm check:tokens` verifies every value here matches app/tokens.css │
 * │  exactly. The two cannot drift apart.                                │
 * └──────────────────────────────────────────────────────────────────────┘
 */

export const TOKENS = {
  /** ★ FROZEN — the client's Chess Blue. */
  blue600: '#0b2f92',
  blue800: '#061a51',
  blue900: '#041134',
  /** ★ FROZEN — the client's Metallic Silver. */
  silver400: '#c9cdd3',
  silver700: '#67707e',
  silver900: '#0b0c0e',
  canvas: '#fefefe',
  surface: '#ffffff',
  white: '#ffffff',
} as const;

/** The CTA band gradient, for OG image backgrounds. */
export const CTA_GRADIENT = `linear-gradient(135deg, ${TOKENS.blue600} 0%, ${TOKENS.blue800} 58%, ${TOKENS.blue900} 100%)`;
