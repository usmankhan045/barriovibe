'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * The entire scroll-animation engine for the site: one IntersectionObserver,
 * mounted once in the root layout, watching every `[data-reveal]` element.
 *
 * Renders nothing. Costs one observer and a few hundred bytes, versus a
 * hydration boundary per animated element.
 *
 * ── Why this is more careful than the textbook version ──
 *
 * The naive implementation reveals only on `entry.isIntersecting` and
 * unobserves. That has a real failure mode: during a fast scroll — a trackpad
 * flick, End, or an anchor jump — an element can enter and leave the viewport
 * between two of the browser's intersection computations. The callback then
 * fires once with `isIntersecting: false`, the element is never revealed, and
 * the user is left looking at a permanently blank section.
 *
 * Measured on this site's home page: a fast programmatic scroll left 24 of 34
 * elements hidden. So there are three guards:
 *
 *   1. Reveal on intersection (the normal path).
 *   2. Reveal on any callback where the element is ALREADY above the viewport
 *      — it was scrolled past faster than the observer could report it.
 *   3. A sweep after scrolling stops, catching anything both missed.
 *
 * The CSS also gates the hidden start state behind `@media (scripting:
 * enabled)`, so a JS failure shows content rather than hiding it forever.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    // Respect the OS setting by never starting at all. The CSS already forces
    // the revealed state under reduced motion, so content is visible either
    // way — this just avoids pointless work.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    /**
     * How long to wait before dropping the materialise filter. The blur runs
     * for `--duration-reveal * 1.6` plus whatever stagger the element carries;
     * this is comfortably past the slowest of those.
     */
    const SETTLE_AFTER = 1200;

    const reveal = (el: Element) => {
      const node = el as HTMLElement;
      node.dataset.revealed = 'true';
      // `filter: blur(0px)` still costs the element a render surface, and this
      // page has 68 revealed elements. Once the transition is over there is
      // nothing left for the filter to express, so it is taken off — see the
      // note on `[data-settled]` in globals.css.
      window.setTimeout(() => {
        node.dataset.settled = 'true';
      }, SETTLE_AFTER);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Guard 2: already scrolled past. `top < 0` means the element's top
          // edge is above the viewport, so it has been seen (or skipped) and
          // must not stay hidden.
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        }
      },
      {
        // threshold 0 + a negative bottom margin: fires as soon as any part of
        // the element crosses into the top 90% of the viewport. More reliable
        // than a percentage threshold, which a tall element can satisfy only
        // briefly.
        threshold: 0,
        rootMargin: '0px 0px -10% 0px',
      },
    );

    const observeAll = () => {
      for (const el of document.querySelectorAll('[data-reveal]:not([data-revealed])')) {
        observer.observe(el);
      }
    };

    observeAll();

    // Guard 3: a safety sweep that reveals anything already at or above the
    // fold which the observer has not reported.
    //
    // Throttled to one run per animation frame rather than debounced. A
    // debounce was the original implementation and was wrong: during a
    // continuous scroll the timer keeps resetting, so the sweep only runs
    // after the user stops — by which point they have already scrolled past
    // blank sections. Per-frame is what actually catches a fast flick.
    //
    // Positions are measured ONCE and cached, not read per frame.
    //
    // This used to call getBoundingClientRect() on every still-hidden element
    // on every animation frame of every scroll. That reads live layout, so
    // each call forces the browser to flush pending style and layout work
    // before it can answer — and the home page starts with 68 hidden
    // elements, i.e. up to 68 forced layout flushes per frame, precisely
    // during the first seconds of scrolling when the page should feel its
    // fastest.
    //
    // A reveal threshold does not need live geometry. Caching each element's
    // document-relative top and comparing it against window.scrollY gives the
    // same answer from arithmetic, turning N layout reads per frame into one
    // cheap scroll-position read. The cache is rebuilt on resize, which is
    // when the numbers can actually change.
    let pending = false;

    const measure = () =>
      Array.from(
        document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])'),
      ).map((el) => ({ el, top: el.getBoundingClientRect().top + window.scrollY }));

    let remaining = measure();

    const sweep = () => {
      const limit = window.scrollY + window.innerHeight * 0.9;
      remaining = remaining.filter((item) => {
        if (item.top >= limit) return true;
        reveal(item.el);
        observer.unobserve(item.el);
        return false;
      });
      if (remaining.length === 0) detach();
    };

    const onScroll = () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        sweep();
      });
    };

    // Re-measure rather than just re-sweep: a width change reflows everything
    // below it, so every cached offset is stale.
    const onResize = () => {
      remaining = measure();
      onScroll();
    };

    const detach = () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      detach();
      observer.disconnect();
    };
    // Re-scan after client-side navigation, when a new page's elements mount.
  }, [pathname]);

  return null;
}
