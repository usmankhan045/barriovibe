import localFont from 'next/font/local';

/**
 * Two self-hosted variable fonts, 91KB combined, covering every weight the
 * design system uses (300–900). Because they're variable there is exactly one
 * network request per family — not one per weight.
 *
 * Self-hosted rather than next/font/google so the build never depends on a
 * network fetch and the browser never touches a third-party origin.
 *
 * `adjustFontFallback` defaults to 'Arial' with synthesized metrics, which is
 * what holds CLS at 0 during the swap.
 */

export const satoshi = localFont({
  src: [
    {
      path: './fonts/Satoshi-Variable.woff2',
      weight: '300 900',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

export const inter = localFont({
  src: [
    {
      path: './fonts/Inter-Variable-latin.woff2',
      weight: '100 900',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});
