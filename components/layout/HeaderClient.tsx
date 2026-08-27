'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import { Icon } from '@/components/icons';
import type { IconName } from '@/content/types';
import { Button } from '@/components/ui/Button';
import { Wordmark } from './Wordmark';
import { cx } from '@/lib/cx';

/**
 * The minimum the navigation needs to render. Deliberately narrow: the Header
 * is a client component, and importing the content layer here pulled every
 * service's full text, intros, FAQs, step descriptions, into the browser
 * bundle to populate a menu that uses two strings per link.
 *
 * The server builds this in Header.tsx and passes it down.
 */
/** `useLayoutEffect` warns when it runs on the server. This one measures. */
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export interface NavData {
  /** `mega` is set on the single "Services" item that opens the panel. */
  primary: { label: string; href: string; mega?: boolean }[];
  /** One per practice. Three of them. */
  columns: {
    slug: string;
    title: string;
    href: string;
    /* Three icons, and no prose at all. The blurbs used to be here for the
       detail pane's description line; that line is gone, so the strings go
       with it rather than shipping to every page unrendered. The rule this
       file exists to enforce is "do not drag the content layer into the
       bundle". */
    icon: IconName;
    /** The disciplines inside this practice, each with its services. */
    groups: {
      slug: string;
      title: string;
      href: string;
      links: { label: string; href: string }[];
    }[];
  }[];
}

/**
 * SLOT — the client is supplying their own navbar. See components/ui/README.md.
 *
 * This is one of only a handful of client components on the site. It needs to
 * be, for three reasons: the scroll-triggered blur, the mega-menu open state,
 * and the mobile sheet. Everything else it renders is static markup.
 *
 * The mega-menu lists ALL services rather than a curated subset. That is
 * deliberate and load-bearing: `pnpm check:content` fails the build if any
 * service is missing from it, which is what enforces the client's "nothing
 * hidden" requirement at the navigation level.
 */
export function HeaderClient({ nav }: { nav: NavData }) {
  /* The slug of the practice tab showing inside the Services panel, or null
     when the panel is closed. "Which practice is selected" and "whether the
     panel is open" are the same question now that there is one trigger, so
     they are the same piece of state rather than a separate open boolean. */
  const [openPractice, setOpenPractice] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const megaRef = useRef<HTMLDivElement>(null);
  // Escape has to return focus to the trigger that opened the panel. There is
  // one trigger — "Services" — regardless of which practice tab is showing.
  const servicesTriggerRef = useRef<HTMLAnchorElement | null>(null);
  // The whole nav pill is the hover/focus region. It has to be, now that
  // moving between two practice triggers passes over a third element: scoping
  // it to a single <li> made every sideways move a close and a reopen.
  const megaRegionRef = useRef<HTMLUListElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Once the page has moved, the wordmark and the CTA fade out and only the
  // nav pill rides down the page. Desktop only — see the call sites.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /**
   * The sticky wordmark goes fully inert the moment the footer's OWN
   * lockup scrolls into view. On desktop that is moot — `scrolled` has
   * already hidden it long before the page reaches its end — but below
   * `lg` the wordmark carries a scroll-triggered plate instead of fading
   * out (see the render site), so without this it kept floating over the
   * footer, sitting directly on top of the second "BarrioVibe" the footer
   * renders a few dozen pixels below it. One observer on the page's single
   * `<footer>`, found by tag rather than threaded down as a prop: header
   * and footer are unrelated siblings in the tree and neither otherwise
   * needs a reference to the other.
   */
  const [footerVisible, setFooterVisible] = useState(false);
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => setFooterVisible(!!entry?.isIntersecting));
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // Any navigation closes everything, including a client-side route change
  // that does not remount this component.
  //
  // Adjusted during render rather than in an effect. An effect would paint the
  // new page once with the menu still open and then close it — a visible flash
  // on every navigation — and React's lint rules flag the cascading render it
  // causes. This is the documented "adjust state when a prop changes" pattern:
  // React re-runs the render immediately, before anything reaches the screen.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setOpenPractice(null);
    setMobileOpen(false);
  }

  // Escape closes whichever layer is open. Required for the mega-menu to be
  // keyboard-operable rather than a hover-only trap.
  useEffect(() => {
    if (!openPractice && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      // Returning focus to the trigger is required by the disclosure pattern.
      // Without it, dismissing the menu drops focus to <body> and a keyboard
      // user restarts from the top of the page having lost their place.
      if (openPractice) servicesTriggerRef.current?.focus();
      setOpenPractice(null);
      setMobileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openPractice, mobileOpen]);

  // The mobile sheet covers the page, so the page behind it must not scroll.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  /* Opening is immediate; closing waits.
   *
   * The delay stops the panel vanishing when the pointer crosses the gap
   * between the trigger and the panel below it. It also does a second job now
   * that there are three panels: sliding from one practice to the next cancels
   * the pending close and swaps the panel in place, so the menu reads as one
   * surface changing contents rather than three that blink out and back. */
  const openMega = (slug: string) => {
    clearTimeout(closeTimer.current);
    setOpenPractice(slug);
  };
  const closeMega = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenPractice(null), 120);
  };
  /* Entering the Services trigger itself does not know which practice tab to
     show. If one is already selected (the pending close was just cancelled
     because the pointer came back before the 120ms fired) that selection
     survives; otherwise it defaults to the first practice. */
  const openServicesMega = () => openMega(openPractice ?? nav.columns[0]?.slug ?? '');

  /**
   * Close when focus leaves the nav pill AND the panel.
   *
   * The menu opens on focus so it is reachable by keyboard, but without this
   * it never closed again: tabbing onward left a full-width panel covering the
   * hero across several unrelated tab stops, dismissable only with Escape.
   * `relatedTarget` is the element receiving focus, so containment is checked
   * against where focus is going, not where it has been.
   */
  const handleMegaBlur = (event: React.FocusEvent) => {
    const next = event.relatedTarget as Node | null;
    if (next && (megaRegionRef.current?.contains(next) || megaRef.current?.contains(next))) {
      return;
    }
    setOpenPractice(null);
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const practice = nav.columns.find((c) => c.slug === openPractice);

  /**
   * The panel hangs from the Services trigger, not from the centre of the
   * page. The trigger sits inside the nav pill, which is itself centred on
   * the viewport rather than on any particular item, so a panel centred on
   * the page would drift away from the word that opened it the moment the
   * pill's own contents were not symmetric around Services.
   *
   * So the panel's left edge is aligned to the trigger's, then clamped to the
   * page gutters so the four-column Corporate & Advisory tab (the widest of
   * the three) does not run off the right of the viewport. The trigger itself
   * does not move when the internal tab strip switches practice, but the
   * panel's width does, so the clamp is recomputed on every switch.
   *
   * The measuring frame is the `relative` div inside the panel's own
   * `u-container`, NOT the nav. That matters: the nav carries
   * `-translate-x-1/2` and a transform is both a containing block and a
   * backdrop root, so a panel positioned against it loses its glass and gets
   * shrink-to-fit down to the width of the pill. The panel stays outside the
   * nav; see the note at its render site.
   *
   * Measured rather than computed from the content, because the panel's width
   * comes from how many disciplines the practice holds and duplicating that
   * arithmetic here is exactly the kind of derived constant that goes stale.
   * `useIsoLayoutEffect` runs before paint, so the panel is never painted at
   * the wrong offset first.
   */
  const megaTrackRef = useRef<HTMLDivElement>(null);
  const [panelLeft, setPanelLeft] = useState(0);
  useIsoLayoutEffect(() => {
    if (!openPractice) return;
    const trigger = servicesTriggerRef.current;
    const track = megaTrackRef.current;
    const panel = track?.querySelector('[data-mega-panel]') as HTMLElement | null;
    if (!trigger || !track || !panel) return;

    const trackBox = track.getBoundingClientRect();
    const offset = trigger.getBoundingClientRect().left - trackBox.left;
    setPanelLeft(Math.max(0, Math.min(offset, trackBox.width - panel.offsetWidth)));
  }, [openPractice]);

  /* Counted here rather than imported. `SERVICE_COUNT` lives in the content
     layer, and importing anything from there into this client component drags
     every service's full text into the browser bundle — the failure the note
     at the top of this file exists to prevent. The nav tree is already here
     and already complete, so the number is free. */
  const serviceCount = nav.columns.reduce(
    (total, column) =>
      total + column.groups.reduce((groupTotal, group) => groupTotal + group.links.length, 0),
    0,
  );

  return (
    /* No background, at any scroll position.
     *
     * This used to fade in a tinted, blurred bar with a bottom hairline once
     * the page had moved 24px. The client's call is that the header carries no
     * surface of its own — the wordmark, the nav pill and the CTA hang over the
     * page and content scrolls behind them.
     *
     * What keeps the bar legible over scrolling content is that its three
     * elements each carry their own material: the pill is `bg-surface` with a
     * shadow, the CTA is a solid blue pill, and the wordmark is ink on a canvas
     * that is near-white sitewide. Do not reintroduce a header background to
     * "fix" legibility — fix the element that lost it. */
    <header className="sticky top-0 z-50">
      {/* Two tracks: wordmark and CTA. The nav is NOT a cell here — see below.
          `justify-between` centres nothing, it distributes free space, so
          anything positioned by this row is positioned by how wide its
          neighbours happen to be. */}
      <div className="u-container grid h-[var(--header-h)] grid-cols-[1fr_auto] items-center gap-6">
        {/* justify-self-start, or the link box stretches the full 1fr track.
            With the nav out of flow that track now runs from the gutter all the
            way to the CTA, so a stretched <a href="/"> would turn ~1300px of
            empty header into a click target that silently sends you home.

            `invisible`, not `opacity-0` alone: a faded-but-present link is
            still tabbable and still read by a screen reader, so the wordmark
            would keep answering to keyboard and AT while invisible on screen.
            visibility:hidden takes it out of both. It transitions as a discrete
            step at the end of the fade, which is exactly the wanted order —
            fade out, then go inert.

            Scoped to `lg`. Below it the nav pill is display:none and the row is
            just wordmark + hamburger, so hiding the wordmark there would leave
            a header with one lone button in it.

            ── Bare at the top, on the client's instruction; the plate only
                arrives once there is something to protect against ──

            This carried a glass pill below `lg` PERMANENTLY, at every scroll
            position: the wordmark does not fade out on scroll at that width
            the way it does on desktop, so a phone was otherwise sitting bare
            on top of whatever scrolled underneath it. The client's own
            instruction was the plain lockup — no pill sitting under "BarrioVibe"
            at the top of the page, which is where anyone actually looks at it.

            So the plate now answers to `scrolled`, the same signal that
            already drives the desktop fade-out below: gone at rest, so the
            hero reads exactly as asked, and faded in the moment real content
            — body copy, stat numerals, a chrome button — has something to
            pass underneath it. It is a background fading in, not the wordmark
            itself, which is why it is a sibling `-z-10` span rather than a
            class on the lockup: fading the Wordmark's own opacity would fade
            the text along with the plate, and the text has to stay solid
            throughout. Same `-z-10`-span-behind-a-lit-element pattern as the
            nav pill's active seat below.

            The whole lockup goes invisible again once the footer scrolls
            into view — see `footerVisible` above — because the footer
            carries its own "BarrioVibe" a short scroll below this one, and
            a plated logo floating on top of a second, bare one read as a
            mistake rather than as two sections. */}
        <div
          className={cx(
            'relative isolate justify-self-start transition-[opacity,visibility] duration-200 motion-reduce:transition-none',
            scrolled && 'lg:invisible lg:opacity-0',
            footerVisible && 'invisible opacity-0',
          )}
        >
          <span
            aria-hidden="true"
            className={cx(
              'u-glass u-glass--pill u-plate-to-lg absolute inset-0 -z-10 rounded-pill transition-opacity duration-300 motion-reduce:transition-none',
              scrolled ? 'opacity-100' : 'opacity-0',
            )}
          />
          <Wordmark className="whitespace-nowrap py-1.5 pl-1.5 pr-3.5" />
        </div>

        {/* ── Desktop nav ─────────────────────────────────────────────── */}
        {/*
          The "tube light" treatment: a white pill holding the links, with the
          active item on a tinted seat that SLIDES between items on a shared
          motion layoutId, marked by a bar along its top edge.

          White pill on a near-white canvas, so it is separated by border and
          shadow rather than by fill — the same way `.u-tile` works. The
          backdrop blur is what keeps it legible once page content scrolls
          underneath.

          Note on the indicator: on a dark ground the bar and its three blurred
          halos read as an emitted glow. On white they cannot — a glow only
          exists against something darker than itself. Here the same geometry
          reads as a solid brand-blue bar with a soft blue haze under it. Same
          shape, different material.
        */}
        {/* Centred on the VIEWPORT, not on the row.
         *
         * This was a `justify-self-center` cell in the middle of a
         * `1fr auto 1fr` grid. That does centre it — but only for as long as
         * neither side track is forced wider than its 1fr share, because `1fr`
         * is `minmax(auto, 1fr)` and cannot shrink below its content's
         * min-content width. The moment the wordmark or the CTA outgrows its
         * share, that track wins the extra space and the pill slides the other
         * way.
         *
         * That is a live risk rather than a theoretical one: at 1024px each
         * side track is only ~261px against a ~159px wordmark. An agency name
         * much longer than "BarrioVibe" would have pushed the pill off centre
         * with nothing in the build to catch it.
         *
         * Taking it out of flow and pinning it to the header, which is
         * full-bleed and `sticky`, so it is the positioned ancestor, makes the
         * centring independent of both neighbours. It is now exact by
         * construction at every width, whatever the brand name turns out to be.
         */}
        {/* THE PILL SHRINKS TO FIT AT lg. IT DOES NOT DISAPPEAR.
         *
         * The pill now holds five short items (Home, Services, Contact, About,
         * Blog) instead of the three long practice names it used to carry, so
         * it is narrower than the 755px that originally forced the px-2.5/xl
         * step-down below. The step-down is left in place regardless: it costs
         * nothing when there is headroom, and it is the thing that keeps this
         * safe if an item is ever renamed to something longer.
         *
         * Raising the breakpoint to xl was tried and REJECTED: it takes the
         * navigation away from every 1024-1279 laptop, and a hamburger on a
         * 13-inch screen is a downgrade, not a responsive adaptation. The
         * navbar is the point of this design. It stays visible.
         *
         * Measured with getBoundingClientRect against the wordmark and the CTA:
         *
         *     1024   wordmark 142px   CTA 167px    clear
         *     1152   wordmark 206px   CTA 231px    clear
         *     1440   wordmark 277px   CTA 302px    clear
         *
         * All three comfortably clear now that the pill is shorter. Re-measure
         * if the brand is renamed or an item is added or lengthened. */}
        <nav
          aria-label="Primary"
          className="hidden lg:absolute lg:left-1/2 lg:top-0 lg:flex lg:h-[var(--header-h)] lg:-translate-x-1/2 lg:items-center"
        >
          {/* The nav pill is Liquid Glass, which is the one placement Apple's
              own guidance actually asks for — glass belongs in the navigation
              layer, floating above content. It also settles the legibility
              question the comment above raises in the material's own terms:
              the pill lenses whatever scrolls under it instead of needing a
              header background to hide it.

              `rounded-pill` and `shadow-bar` are Tailwind utilities and land
              in the utilities layer, so they override `.u-glass`'s own radius
              and shadow rather than being overridden by them. */}
          {/* The hover region is the whole pill, not the individual items, so
              leaving the pill (rather than leaving whichever item happens to
              be under the pointer) is what starts the close timer. That still
              matters with one mega trigger: it is what lets the pointer travel
              sideways from Services onto Home/Contact/About/Blog without the
              panel's own close-on-leave racing the neighbouring item's
              close-on-enter. */}
          <ul
            ref={megaRegionRef}
            onMouseLeave={closeMega}
            onBlur={handleMegaBlur}
            className="u-glass u-glass--pill flex items-center gap-0.5 rounded-pill p-1 shadow-bar xl:gap-1"
          >
            {nav.primary.map((item) => {
              const hasMega = Boolean(item.mega);
              const active = isActive(item.href);
              const expanded = hasMega && openPractice !== null;

              return (
                <li
                  key={item.href}
                  {...(hasMega
                    ? { onMouseEnter: openServicesMega }
                    : // Entering a non-mega item still has to dismiss an open
                      // panel. Without this, sliding from Services onto About
                      // leaves the panel up, because the pointer never left
                      // the pill's own region.
                      { onMouseEnter: closeMega })}
                >
                  <Link
                    {...(hasMega
                      ? {
                          ref: servicesTriggerRef,
                          'aria-expanded': expanded,
                          onFocus: openServicesMega,
                        }
                      : // Focus does what the pointer does. Tabbing from
                        // Services onto About used to leave its panel hanging
                        // open under an unrelated item, because focus was
                        // still inside the pill and nothing had told it to
                        // close.
                        { onFocus: closeMega })}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cx(
                      // `isolate` — the lit seat below is -z-10 so it sits
                      // behind the label. Without its own stacking context the
                      // negative z would drop it behind the PILL's background
                      // (a non-positioned block paints its background after
                      // negative-z descendants) and the whole effect vanishes.
                      //
                      // `whitespace-nowrap`: the practice labels are two and
                      // three words long, and a wrapped item makes the pill two
                      // rows tall.
                      // Scaled to the space rather than hidden below xl. See
                      // the measurements on the <nav> above: at 1024 the pill
                      // has to lose about 40px to clear the wordmark and the
                      // CTA, and it finds them in the seat padding, the gap
                      // and half a point of type. It steps back up at xl.
                      'relative isolate inline-flex items-center gap-1 whitespace-nowrap rounded-pill px-2.5 py-2 text-[13px] font-semibold transition-colors duration-200 xl:gap-1.5 xl:px-3.5 xl:text-[14px]',
                      active || expanded
                        ? 'text-blue-600'
                        : 'text-ink-strong hover:text-blue-600',
                    )}
                  >
                    {item.label}
                    {hasMega && (
                      <Icon
                        name="chevron-down"
                        size={14}
                        className={cx(
                          'transition-transform duration-200',
                          expanded && 'rotate-180',
                        )}
                      />
                    )}

                    {active && (
                      <motion.span
                        layoutId="header-nav-lamp"
                        className="absolute inset-0 -z-10 rounded-pill bg-blue-50"
                        initial={false}
                        // The accessibility floor requires reduced motion be
                        // honoured, and the global @media rule in globals.css
                        // cannot reach this: motion animates via inline
                        // transforms on rAF, not CSS transitions. The seat
                        // still moves, it just arrives instantly.
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { type: 'spring', stiffness: 300, damping: 30 }
                        }
                      >
                        {/* The bar, plus three stacked blurs beneath it.
                            Chess Blue on white — the brand colour is legible
                            here, where on the dark pill it was 1.62:1 and had
                            to be swapped for a light tint. aria-hidden: it
                            duplicates the state already on aria-current. */}
                        <span
                          aria-hidden="true"
                          className="absolute left-1/2 top-0 h-1 w-8 -translate-x-1/2 rounded-b-full bg-blue-600"
                        >
                          <span className="absolute -left-2 top-0 h-6 w-12 rounded-pill bg-blue-600/20 blur-md" />
                          <span className="absolute top-0 h-6 w-8 rounded-pill bg-blue-600/20 blur-md" />
                          <span className="absolute left-2 top-0 h-4 w-4 rounded-pill bg-blue-600/20 blur-sm" />
                        </span>
                      </motion.span>
                    )}
                  </Link>

                  {/* THE PANEL IS NOT RENDERED HERE, and must not be moved
                      here. Nesting it inside the trigger's <li> is tempting
                      because it would put the menu into the tab order right
                      after the item that opens it. It was tried and it breaks
                      the panel twice over:

                      · The <nav> above carries `-translate-x-1/2`, and a
                        transform forms a BACKDROP ROOT. Inside it the panel's
                        `backdrop-filter` has nothing to sample and the glass
                        renders as flat white.
                      · A transform is also a containing block, so the panel's
                        absolute positioning resolved against the 755px pill
                        instead of the page. Shrink-to-fit then crushed four
                        224px columns into ~85px each and the labels overlapped.

                      It lives outside the <nav>, below. */}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* The CTA and the mobile trigger share ONE grid cell. As separate
            cells they would be separate tracks, and the middle track would no
            longer be the centre one. */}
        <div className="flex items-center justify-self-end">
          {/* Only this wrapper fades, not the whole cell — the mobile trigger
              below is its sibling and has to survive the scroll. */}
          <div
            className={cx(
              'hidden transition-[opacity,visibility] duration-200 motion-reduce:transition-none lg:block',
              scrolled && 'invisible opacity-0',
            )}
          >
            <Button href="/contact" size="sm">
              Start a project
            </Button>
          </div>

          {/* ── Mobile trigger ────────────────────────────────────────── */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="u-glass u-glass-interactive grid size-11 place-items-center rounded-chip text-ink lg:hidden"
          >
            <Icon name={mobileOpen ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </div>

      {/* ── Mega-menu ─────────────────────────────────────────────────── */}
      {/* A sibling of the header row, NOT a child of the <nav>. The nav is
          `-translate-x-1/2` to centre the pill, and a transform is both a
          backdrop root and a containing block: inside it this panel renders as
          flat white with its columns crushed to the pill's width. Positioned
          here it resolves against <header>, which is `sticky` and untransformed,
          so the glass has the page behind it to bend. */}
      {practice && (
      <div
        ref={megaRef}
        /* Re-asserting the open practice on the panel's own mouseenter is what
           lets the pointer travel from the trigger into the panel without the
           pending close firing halfway across the gap. It re-states what is
           already open rather than choosing, so nothing changes under the
           cursor. */
        onMouseEnter={() => openMega(practice.slug)}
        onMouseLeave={closeMega}
        onBlur={handleMegaBlur}
        className="absolute inset-x-0 top-full hidden lg:block"
      >
        {/* Two elements, not one. The measuring frame is INSIDE the container
            rather than being it, so its border box and the box `left` resolves
            against are the same rectangle. Measuring the container itself would
            be out by its own horizontal padding and every panel would sit a
            gutter to the right of its trigger. */}
        <div className="u-container">
          <div ref={megaTrackRef} className="relative pt-2">
        <motion.div
          data-mega-panel
          style={{ left: panelLeft }}
          initial={reduceMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          /* `w-max`, and the width comes from the fixed-width discipline columns
             inside it: Software & AI opens at ~518px and Corporate & Advisory at
             ~1020px. That is the point of giving each practice its own panel,
             where one `max-w-5xl` box sized for the widest left the other two as
             a short list of links floating in an acre of glass.

             It MUST be `w-max` rather than plain shrink-to-fit. An absolutely
             positioned box with `left` set and `right: auto` sizes to the space
             remaining to its right, so the moment the clamp pushed Corporate &
             Advisory rightward the panel shrank, which let the clamp push it
             further: measured, it settled at 883px with the fourth discipline
             clipped off by `overflow-hidden`. `w-max` takes the width out of
             that loop, so the panel measures the same however it is positioned
             and the clamp converges in one pass.

             `max-w-[72rem]` is the backstop for a practice with five
             disciplines, which would otherwise widen past the page gutters.
             `top-2` reproduces the frame's `pt-2`, which an absolutely
             positioned child does not inherit. */
          className="u-glass absolute top-2 flex w-max max-w-[72rem] flex-col overflow-hidden rounded-tile-lg shadow-bar"
        >
          {/* The practice tab strip. There is one trigger in the navbar now
              ("Services"), so this row is what picks which practice's
              columns show below it — the job the three separate nav
              triggers used to do. A horizontal row across the top of the
              panel, on the client's instruction, rather than a rail down the
              left: hovering or focusing a tab still swaps the content below
              without closing the panel, the same swap the old triggers did
              when the pointer moved sideways between them.

              A real `<Link>`, not a button: clicking a tab still has to reach
              the practice's own page, exactly as the old top-level items did. */}
          <div className="flex flex-none items-center gap-1 border-b border-line p-3">
            {nav.columns.map((column) => {
              const tabActive = practice.slug === column.slug;
              return (
                <Link
                  key={column.slug}
                  href={column.href}
                  onMouseEnter={() => openMega(column.slug)}
                  onFocus={() => openMega(column.slug)}
                  className={cx(
                    'flex items-center gap-2.5 whitespace-nowrap rounded-chip px-3.5 py-2.5 text-[13.5px] font-semibold transition-colors',
                    tabActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-ink-strong hover:bg-blue-50/60 hover:text-blue-600',
                  )}
                >
                  <Icon name={column.icon} size={16} className="flex-none" />
                  {column.title}
                </Link>
              );
            })}
          </div>

          {/* One fixed-width column per discipline, the practice's single
              discipline split across two.

              Fixed rather than fractional because the panel has no width of its
              own to divide up: the `w-56` cells are what GIVE it one. 224px
              holds every current nav label on one line, the longest being
              "E-commerce Management" and "UK VAT & Bookkeeping".

              Software & AI is the one practice with a single discipline, and
              eight links in one column makes a tall thin panel hanging off a
              wide navbar. Two columns of four is the better shape and, at
              2×224px, still a narrower panel than either of the others, which is
              honest about it holding one discipline. */}
          <div className="flex flex-col p-5">
            <div className="flex gap-x-7">
              {practice.groups.map((group) => (
                <div key={group.slug}>
                  {/* The discipline heading is a link, not a label: it is the
                      only route to the discipline page from inside the menu.

                      Suppressed when the practice holds a single discipline,
                      where it would restate the navbar item the panel is already
                      hanging from. */}
                  {practice.groups.length > 1 && (
                    <Link
                      href={group.href}
                      className="mb-2 block border-b border-line pb-2 font-display text-[11px] font-bold uppercase tracking-[0.08em] text-ink-body transition-colors hover:text-blue-600"
                    >
                      {group.title}
                    </Link>
                  )}

                  <ul
                    className={cx(
                      'grid gap-x-7 gap-y-0.5',
                      practice.groups.length === 1 ? 'grid-cols-2' : 'grid-cols-1',
                    )}
                  >
                    {group.links.map((link) => (
                      <li key={link.href} className="w-56">
                        <Link
                          href={link.href}
                          /* These have to read as links AT REST, not only under
                             the pointer. Previously the only affordances — a
                             tinted pill and a colour shift — were both
                             hover-only, so a stationary cursor saw columns of
                             plain grey text.

                             So: an underline that is always present (the one
                             unambiguous link signal) and ink-strong rather than
                             ink-body for deliberateness. rounded-pill on the
                             hover fill still matches the nav pill's active seat
                             above.

                             inline-flex, not flex: a block-level link fills the
                             whole column, so the hover fill ran far past a short
                             label. Shrink-to-fit keeps the pill on the words. */
                          className="inline-flex items-center rounded-pill px-2 py-1 text-[13.5px] font-medium text-ink-strong underline decoration-silver-300 decoration-1 underline-offset-[5px] transition-colors hover:bg-blue-50 hover:text-blue-600 hover:decoration-blue-600"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* The one route out of a practice-scoped panel to the whole
                catalogue, distinct from the "Services" item that opened the
                panel: that item and its href both point at /services already,
                but a visitor scanning one practice's columns still benefits
                from an explicit link to the full list rather than having to
                notice the trigger word above does the same thing.

                The rule is on the wrapper, not the link: `self-start` on a
                bordered link shrinks it to the text, which renders the divider
                as a stray 90px dash rather than as the edge of the last row. */}
            <div className="mt-5 border-t border-line pt-4">
              <Link href="/services" className="u-arrow-link text-[13px]">
                All {serviceCount} services
              </Link>
            </div>
          </div>
        </motion.div>
          </div>
        </div>
      </div>
      )}

      {/* ── Mobile sheet ──────────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-50 overflow-y-auto overscroll-contain border-t border-line bg-canvas lg:hidden"
        >
          <div className="u-container flex flex-col gap-8 py-8">
            {/* Services get accordions so every one stays reachable without an
                endless scroll. Native <details>, no JS, no state.

                One accordion per PRACTICE, with the disciplines as headings
                inside it. Nesting a second <details> layer was the obvious
                alternative and is worse on a phone: two taps to reach a
                service, and a closed inner row gives no clue how much is
                behind it. Thirty-two links across three sections scrolls
                perfectly well once opened. */}
            <div className="flex flex-col gap-2">
              {nav.columns.map((column) => (
                /* `py-1.5` on the tile, down from `py-3`, because the height
                   moved onto the <summary> below. The padding belonged to the
                   <details>, and tapping a <details>'s padding does not toggle
                   it: only the <summary> does. So the row LOOKED 49px tall and
                   answered to 25px of it. The visible row is now 56px and all
                   of it is the control. */
                <details key={column.slug} className="group u-tile px-4 py-1.5">
                  {/* `u-tap` for the 44px floor. This is the top-level control
                      of the mobile navigation; nothing else in the sheet matters
                      more. `flex` wins the display over `u-tap`'s inline-flex,
                      so `justify-between` still pushes the chevron right. */}
                  <summary className="u-tap flex cursor-pointer list-none items-center justify-between gap-3">
                    <span className="flex items-center gap-2.5">
                      <Icon
                        name={column.icon}
                        size={17}
                        className="flex-none text-ink-decorative"
                      />
                      <span className="font-display text-[15px] font-bold text-ink">
                        {column.title}
                      </span>
                    </span>
                    <Icon
                      name="chevron-down"
                      size={18}
                      className="text-ink-body transition-transform group-open:rotate-180"
                    />
                  </summary>

                  <div className="mt-3 flex flex-col gap-4 border-t border-line pt-3">
                    {column.groups.map((group) => (
                      <div key={group.slug}>
                        {/* Suppressed when the practice has only one
                            discipline: a heading that repeats the accordion
                            label immediately above it is noise, not
                            structure. */}
                        {column.groups.length > 1 && (
                          /* `u-tap` rather than `block`: these measured 18px
                             tall and they are the only route to a discipline
                             page from the sheet. `u-tap` makes the box
                             inline-flex so the min-height has something to
                             apply to and the label stays optically centred;
                             `block` would leave it at the top of a 44px box. */
                          <Link
                            href={group.href}
                            className="u-tap mb-1 px-2 font-display text-[11px] font-bold uppercase tracking-[0.08em] text-ink-body"
                          >
                            {group.title}
                          </Link>
                        )}
                        <ul className="flex flex-col gap-0.5">
                          {group.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                className="block rounded-chip px-2 py-2.5 text-[15px] text-ink-body"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </details>
              ))}

              <Link href="/services" className="u-arrow-link mt-1 self-start px-2 text-[14px]">
                All services
              </Link>
            </div>

            {/* The Services item is the accordions above, so it is filtered
                out here rather than listed a second time as a dead link. */}
            <nav aria-label="Primary mobile" className="flex flex-col gap-1">
              {nav.primary
                .filter((i) => !i.mega)
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={cx(
                      'rounded-chip px-2 py-3 font-display text-[17px] font-bold',
                      isActive(item.href) ? 'text-blue-600' : 'text-ink',
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
            </nav>

            <Button href="/contact" size="lg" className="w-full">
              Start a project
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
