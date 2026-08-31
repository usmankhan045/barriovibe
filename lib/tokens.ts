/**
 * TypeScript mirror of the design tokens.
 *
 * CSS variables cover ~99% of the site. This file exists for the handful of
 * places that cannot read CSS at all:
 *
 *   • `viewport.themeColor` in app/layout.tsx — a meta tag value
 *   • Open Graph images generated with next/og at build time
 *   • Any inline SVG needing a literal fill in a generated image
 *   • lib/email/templates.ts. Email clients support neither custom properties
 *     nor stylesheets, so every colour in a message is an inline literal. That
 *     is the whole reason the EMAIL group below exists: without it those hex
 *     values would be typed out in the template, where nothing would keep them
 *     in step with the site.
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

  /* ── Email only ──────────────────────────────────────────────────────────
     The subset of the palette the mail templates need as literals. Same
     values as the matching custom properties in app/tokens.css, and
     `pnpm check:tokens` fails the build if any of them stops matching. */
  /** --color-silver-700: body copy, 5.01:1. */
  body: '#67707e',
  /** --color-line: hairline borders. */
  line: '#e9eaed',
  /** --color-band: the alternating section fill the email uses as its ground. */
  band: '#f7f8f9',
  /** --color-blue-50: the response-time panel fill. */
  blue50: '#ecf1fe',
  /** --color-blue-100: masthead sub-line on the gradient. */
  blue100: '#d4dffc',
} as const;

/** The CTA band gradient, for OG image backgrounds. */
export const CTA_GRADIENT = `linear-gradient(135deg, ${TOKENS.blue600} 0%, ${TOKENS.blue800} 58%, ${TOKENS.blue900} 100%)`;
