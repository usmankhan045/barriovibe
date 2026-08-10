'use client';

import { useEffect, useRef } from 'react';

/**
 * A statistic that counts up the first time it scrolls into view.
 *
 * ── Why this animates the DOM directly instead of using state ──
 *
 * The obvious implementation calls setState on every animation frame. Over a
 * 1200ms count-up that is ~70 React renders per statistic, four statistics to
 * a bar — 280 renders to animate some digits. It also means the server renders
 * "0", so the real figure is missing from the HTML and from the page a user
 * sees with JavaScript disabled.
 *
 * Writing to `textContent` fixes both. The true value is in the server-rendered
 * HTML, the animation is zero-render, and reduced-motion needs no special case:
 * we simply never start the animation and the correct value is already there.
 *
 * `tabular-nums` on the container is what stops the digits reflowing the row as
 * they change width.
 */
export function StatValue({
  value,
  countTo,
  suffix,
}: {
  value: string;
  countTo?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Placeholder stats (the em-dashes) have no target, so there is nothing
    // to animate and no behaviour to ship.
    if (countTo === undefined) return;

    const node = ref.current;
    if (!node) return;

    // The final value is already rendered. Under reduced motion we leave it
    // exactly as it is.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();

        const DURATION = 1200;
        let start: number | null = null;

        const tick = (now: number) => {
          start ??= now;
          const t = Math.min((now - start) / DURATION, 1);
          // Ease-out cubic: quick off the mark, settling at the end.
          const eased = 1 - Math.pow(1 - t, 3);
          node.textContent = `${Math.round(eased * countTo)}${suffix ?? ''}`;
          if (t < 1) raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );

    observer.observe(node);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [countTo, suffix]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
