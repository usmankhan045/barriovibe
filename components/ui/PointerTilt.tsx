'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { cx } from '@/lib/cx';

/**
 * The 3D of the "3D interactive timeline": cards lean toward the pointer.
 *
 * ── Why this is a wrapper and not the timeline itself ──
 *
 * Of everything the component this is adapted from animates — the entrance,
 * the node pulse, the hover lift, the image push-in, the description
 * expanding, the progress bar filling — exactly one thing cannot be done in
 * CSS: reading where the pointer is. So exactly one thing crosses the client
 * boundary. The timeline's markup, its four photographs and all of its copy
 * stay server-rendered inside `children`, the same arrangement Coverflow uses
 * and for the same reason.
 *
 * That is also why `motion` is not imported here. The original drives all of
 * the above through framer-motion; on this site the CSS was going to exist
 * anyway, and the library would have bought one `pointermove` listener.
 *
 * ── Why it writes to the DOM instead of setState ──
 *
 * The original keeps the pointer in React state:
 *
 *     const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
 *
 * which re-renders every card in the timeline on every mouse move — sixty
 * renders a second for two numbers that only CSS ever reads. This sets two
 * custom properties on one element and lets the cards inherit them. No render,
 * no reconciliation, and the values are already where the transform needs
 * them.
 */
export function PointerTilt({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Two opt-outs, and both are load-bearing rather than polite.
    //
    // A tilt that answers the pointer is precisely the "motion triggered by
    // user interaction" Reduce Motion exists to switch off.
    //
    // A coarse pointer has no hover state, so `pointermove` only ever fires
    // mid-tap — the cards would kick sideways as you scrolled past them and
    // then stay there, because nothing ever leaves.
    const still = window.matchMedia(
      '(prefers-reduced-motion: reduce), (hover: none), (pointer: coarse)',
    );
    if (still.matches) return;

    let frame = 0;

    const onMove = (event: PointerEvent) => {
      // One read per frame. `getBoundingClientRect` flushes pending layout, so
      // calling it per event during a fast drag across the section is the same
      // forced-reflow trap RevealObserver documents at length.
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const box = el.getBoundingClientRect();
        const x = ((event.clientX - box.left) / box.width) * 2 - 1;
        const y = ((event.clientY - box.top) / box.height) * 2 - 1;
        el.style.setProperty('--tilt-x', x.toFixed(3));
        el.style.setProperty('--tilt-y', y.toFixed(3));
      });
    };

    const onLeave = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      // Back to flat rather than frozen at the last angle the pointer had.
      el.style.setProperty('--tilt-x', '0');
      el.style.setProperty('--tilt-y', '0');
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={cx('u-tilt-field', className)}>
      {children}
    </div>
  );
}
