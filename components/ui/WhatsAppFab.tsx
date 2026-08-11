'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/icons';
import { CONTACT } from '@/content/site';

/**
 * The floating WhatsApp button, and it arrives at the end of the page.
 *
 * ## Why it is not simply always there
 *
 * A chat bubble pinned to the corner from the first pixel is the most tired
 * pattern on the web and it costs something real: it covers the bottom-right of
 * every screen for the whole visit, which is where a right-handed thumb rests
 * and where the last word of every paragraph ends. It also asks for the sale
 * before the page has made one.
 *
 * So it is the closing ask instead. This replaced the full-bleed blue CTA band
 * that used to sit at the foot of the home page, and it does the same job at a
 * fiftieth of the height: when a visitor reaches the last section, having read
 * the case, the one next step follows them down. Nothing before that point.
 *
 * ## Where it starts
 *
 * `from` names the section it arrives at, and everything after that section is
 * "after". On the home page that is `#disciplines`, the third section, which is
 * where the page stops introducing itself and starts naming work: before it a
 * visitor has read a headline and four numbers and has nothing to ask about
 * yet, and from it to the footer there is always something on screen worth a
 * question. The first version started at the LAST section, which is the safest
 * possible reading of "the end of the page" and, in use, most of the page went
 * past without the button.
 *
 * With no `from`, it falls back to the last element child of `#main`, found
 * rather than named, so a page that mounts this without an opinion still gets
 * the conservative behaviour.
 *
 * Which is also why this renders OUTSIDE `<main>`, and the first version did
 * not. Mounted as the last child of `#main` it WAS that last element child, so
 * it observed itself: a `position: fixed` element is in the viewport at every
 * scroll position, the observer reported "intersecting" for ever, and the
 * button was simply always on. It belongs outside for a plainer reason too,
 * which is that a floating link to another app is not part of the page's main
 * content. The `while` below is the guard against that recurring by accident
 * rather than the fix for it.
 *
 * ## Why the root is a mile tall, which is the whole trick
 *
 * "Have we got this far" is a question about POSITION and an
 * IntersectionObserver answers questions about VISIBILITY, and the gap between
 * those two cost this component a bug worth recording.
 *
 * The first version tested `isIntersecting || boundingClientRect.top < 0`:
 * on screen, or already passed. It reads correctly and it is broken, because an
 * observer only notifies when the intersection ratio CROSSES a threshold. A
 * target below the viewport has ratio 0 and a target above it has ratio 0, so a
 * scroll that jumps clean over the section, an anchor link, a scrollbar drag, a
 * restored position, changes nothing the observer considers a change and the
 * callback never runs. Stepping down the page worked, because each step took
 * the section through the viewport and produced real crossings; one jump from
 * the top to the footer left the button switched off for the whole page.
 *
 * The fix is to stop asking the wrong question. `rootMargin` grows the root a
 * mile upward, so the region being watched is the viewport plus everything
 * above it. The section is inside that region if and only if its top edge has
 * reached the bottom of the viewport, which is the actual condition, and it is
 * now a genuine change of state: not-intersecting below, intersecting at and
 * after. Any jump in either direction crosses it, so any jump fires.
 *
 * `isIntersecting` alone after that. One observer, no scroll listener, no
 * measurement of our own, and no second clause doing the work the observer was
 * supposed to be doing.
 *
 * ## Hidden means hidden
 *
 * `visibility: hidden` in the resting state rather than opacity alone, so the
 * button is out of the tab order and out of hit testing while it is invisible.
 * A link that is only 0% opaque is still focusable, and a keyboard user tabbing
 * through the header would land on something they cannot see. The visibility
 * flip is delayed to the end of the exit transition so the fade still plays.
 * See `.u-fab` in globals.css.
 */
export function WhatsAppFab({
  from,
}: {
  /**
   * Selector for the section the button arrives at. Everything from that
   * section to the end of the page counts as after it. Defaults to the last
   * element child of `#main`.
   */
  from?: string;
}) {
  const self = useRef<HTMLAnchorElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let target = from ? document.querySelector(from) : null;

    if (!target) {
      target = document.getElementById('main')?.lastElementChild ?? null;
      // Never observe ourselves. See the note above for what that looked like.
      while (target && self.current && target.contains(self.current)) {
        target = target.previousElementSibling;
      }
    }
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setShown(entry.isIntersecting);
      },
      // Effectively infinite, rather than measured: the root only has to reach
      // further up than the target can ever be, and every real document is
      // orders of magnitude under this. A measured value would have to be
      // recomputed whenever the page grows, which an accordion opening does.
      { rootMargin: '999999px 0px 0px 0px', threshold: 0 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [from]);

  return (
    <a
      ref={self}
      href={`https://wa.me/${CONTACT.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="u-fab"
      data-shown={shown || undefined}
      // The glyph is the whole label, so it needs a written one. "Message us"
      // rather than "WhatsApp" alone: the name of an app is not an action.
      aria-label="Message us on WhatsApp"
    >
      <Icon name="whatsapp" size={26} />
    </a>
  );
}
