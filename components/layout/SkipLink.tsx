/**
 * Skip link. Visually hidden until focused, then it appears as a normal pill
 * button in the top-left.
 *
 * Without this, a keyboard user tabs through the wordmark, five nav items, the
 * mega-menu trigger and a CTA on every single page before reaching content.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:rounded-pill focus-visible:bg-blue-600 focus-visible:px-5 focus-visible:py-3 focus-visible:font-display focus-visible:text-caption focus-visible:font-bold focus-visible:text-white"
    >
      Skip to content
    </a>
  );
}
