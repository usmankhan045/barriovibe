'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
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
 * is a client component, and importing the content layer here pulled all
 * eighteen services' full text — intros, FAQs, step descriptions — into the
 * browser bundle to populate a menu that uses two strings per link.
 *
 * The server builds this in Header.tsx and passes it down.
 */
export interface NavData {
  primary: { label: string; href: string }[];
  columns: {
    slug: string;
    title: string;
    href: string;
    /* Five icons, and no prose at all. The pillar blurbs used to be here for
       the detail pane's description line; that line is gone, so the strings go
       with it rather than shipping to every page unrendered. The rule this
       file exists to enforce is "do not drag the content layer into the
       bundle". */
    icon: IconName;
    links: { label: string; href: string }[];
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
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const megaRef = useRef<HTMLDivElement>(null);
  const megaTriggerRef = useRef<HTMLAnchorElement>(null);
  // The mega-menu's hover/focus region is the Services <li> in the nav pill.
  const megaRegionRef = useRef<HTMLLIElement>(null);
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
    setMegaOpen(false);
    setMobileOpen(false);
  }

  // Escape closes whichever layer is open. Required for the mega-menu to be
  // keyboard-operable rather than a hover-only trap.
  useEffect(() => {
    if (!megaOpen && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      // Returning focus to the trigger is required by the disclosure pattern.
      // Without it, dismissing the menu drops focus to <body> and a keyboard
      // user restarts from the top of the page having lost their place.
      if (megaOpen) megaTriggerRef.current?.focus();
      setMegaOpen(false);
      setMobileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [megaOpen, mobileOpen]);

  // The mobile sheet covers the page, so the page behind it must not scroll.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  // A small close delay stops the menu vanishing when the pointer crosses the
  // gap between the trigger and the panel.
  const openMega = () => {
    clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };

  /**
   * Close when focus leaves the trigger AND the panel.
   *
   * The menu opens on focus so it is reachable by keyboard, but without this
   * it never closed again: tabbing onward left a 433px full-width panel
   * covering the hero across five unrelated tab stops, dismissable only with
   * Escape. `relatedTarget` is the element receiving focus, so containment is
   * checked against where focus is going, not where it has been.
   */
  const handleMegaBlur = (event: React.FocusEvent) => {
    const next = event.relatedTarget as Node | null;
    if (next && (megaRegionRef.current?.contains(next) || megaRef.current?.contains(next))) {
      return;
    }
    setMegaOpen(false);
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  /**
   * Which discipline the mega-menu's detail pane is showing.
   *
   * Deliberately NOT reset when the menu opens. The obvious place to reset is
   * `openMega`, and that is wrong: `openMega` also fires on the panel's own
   * mouseenter, so moving the pointer from the rail into the pane would snap
   * the selection back to the first discipline mid-gesture. Keeping the last
   * choice is both correct and the better behaviour on reopen.
   */
  const [activePillar, setActivePillar] = useState(nav.columns[0]?.slug);
  const pillar = nav.columns.find((c) => c.slug === activePillar) ?? nav.columns[0];

  /* TAB ORDER IS NOT PILLAR ORDER, and only here.
   *
   * `content/pillars.ts` ranks the disciplines and that ranking drives the home
   * page, the services hub, the footer, the 404 and sitemap.xml — Software & AI
   * leads everywhere on the client's instruction. In the tab strip the lead
   * pillar is wanted in the MIDDLE seat instead, so this rotates the first
   * column to the centre index and leaves the rest in their ranked order.
   *
   * Display only. `activePillar` still defaults to `nav.columns[0]`, so the
   * lead discipline is still the tab open when the menu appears — it is just
   * the third one along rather than the first. Do not reorder pillars.ts to
   * achieve this; that would re-rank the whole site. */
  const tabColumns = useMemo(() => {
    const [lead, ...rest] = nav.columns;
    if (!lead) return nav.columns;
    const middle = Math.floor(nav.columns.length / 2);
    return [...rest.slice(0, middle), lead, ...rest.slice(middle)];
  }, [nav.columns]);

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
            a header with one lone button in it. */}
        <Wordmark
          className={cx(
            'justify-self-start whitespace-nowrap transition-[opacity,visibility] duration-200 motion-reduce:transition-none',
            scrolled && 'lg:invisible lg:opacity-0',
          )}
        />

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
         * That is a live risk rather than a theoretical one: BRAND.name is an
         * explicit placeholder, and at 1024px each side track is only ~261px
         * against a ~159px wordmark. A real agency name much longer than
         * "Northbound" would have pushed the pill off centre with nothing in
         * the build to catch it.
         *
         * Taking it out of flow and pinning it to the header — which is
         * full-bleed and `sticky`, so it is the positioned ancestor — makes the
         * centring independent of both neighbours. It is now exact by
         * construction at every width, whatever the brand name turns out to be.
         */}
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
          <ul className="u-glass u-glass--pill flex items-center gap-1 rounded-pill p-1 shadow-bar">
            {nav.primary.map((item) => {
              const hasMega = item.href === '/services';
              const active = isActive(item.href);

              return (
                <li
                  key={item.href}
                  {...(hasMega && {
                    ref: megaRegionRef,
                    onMouseEnter: openMega,
                    onMouseLeave: closeMega,
                    onBlur: handleMegaBlur,
                  })}
                >
                  <Link
                    {...(hasMega && {
                      ref: megaTriggerRef,
                      'aria-expanded': megaOpen,
                      onFocus: openMega,
                    })}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cx(
                      // `isolate` — the lit seat below is -z-10 so it sits
                      // behind the label. Without its own stacking context the
                      // negative z would drop it behind the PILL's background
                      // (a non-positioned block paints its background after
                      // negative-z descendants) and the whole effect vanishes.
                      'relative isolate inline-flex items-center gap-1.5 rounded-pill px-4 py-2 text-[15px] font-semibold transition-colors duration-200',
                      active ? 'text-blue-600' : 'text-ink-strong hover:text-blue-600',
                    )}
                  >
                    {item.label}
                    {hasMega && (
                      <Icon
                        name="chevron-down"
                        size={15}
                        className={cx(
                          'transition-transform duration-200',
                          megaOpen && 'rotate-180',
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
      {megaOpen && pillar && (
        <div
          ref={megaRef}
          onMouseEnter={openMega}
          onMouseLeave={closeMega}
          onBlur={handleMegaBlur}
          className="absolute inset-x-0 top-full hidden lg:block"
        >
          {/*
            A floating panel, not a full-bleed band.

            The band version had no edge: `bg-surface/97` is white, the page is
            white, and it ran the full width of the viewport, so the only thing
            separating a 530px menu from the hero was a hairline at the very
            bottom. Detaching it and giving it the pill's own material — white
            fill, `border-line` hairline, `shadow-bar` — is what makes it read
            as a surface sitting ABOVE the page rather than part of it. The
            shadow does the separating; on a white-on-white palette a border
            alone cannot.
          */}
          <div className="u-container flex justify-center pt-2">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              /* Glass, like the pill that opens it — this panel floats over
                 the hero, which is the navigation layer. The tab strip keeps a
                 solid `bg-band` fill: glass inside glass is the one thing
                 Apple's guidance rules out outright, because two stacked panes
                 read as a rendering artefact rather than as depth.

                 max-w-4xl, and the width is set by the TAB STRIP rather than by
                 the services below it — the pane below never needs this much.
                 This was max-w-5xl (1024px) because five full discipline titles
                 plus icons measured ~918px and overflowed an 896px box, and
                 `overflow-hidden` clips the last tab rather than wrapping
                 visibly. The tabs have since been tightened (13px labels, 15px
                 icons, px-2.5 seats, px-2.5 on the strip) to ~845px, which is
                 what buys the step down to 896px.

                 Measured headroom: ~50px of slack at 896px. That is real but it
                 is not much — a sixth discipline, a title longer than
                 "E-commerce & Marketplaces", or a step back up in tab font size
                 needs this re-measured; it will clip silently rather than
                 reflow. */
              className="u-glass w-full max-w-4xl overflow-hidden rounded-tile-lg shadow-bar"
            >
              {/* ── Tab strip: the five disciplines ───────────────────── */}
              {/* Deliberately NOT role="tablist". These are links that
                  navigate to the pillar page on click and only *preview* it on
                  hover/focus — the same behaviour the vertical rail had. A real
                  ARIA tab must not navigate away, so claiming the role here
                  would describe an interaction the component does not have.
                  They are styled as tabs; they stay semantically a nav list. */}
              <ul className="flex items-stretch gap-1 border-b border-line bg-band px-2.5 pt-1.5">
                {tabColumns.map((column) => {
                  const selected = column.slug === pillar.slug;
                  return (
                    /* flex-auto, not flex-1. `flex-1` is `flex: 1 1 0%`,
                       which makes every tab equal width and would clip
                       "E-commerce & Marketplaces" (236px) down to the 200px
                       even share. `flex-auto` grows from each tab's own
                       content width, so the five share the leftover space
                       proportionally and fill the strip exactly without any
                       of them dropping below its label. */
                    <li key={column.slug} className="flex flex-auto">
                      <Link
                        href={column.href}
                        onMouseEnter={() => setActivePillar(column.slug)}
                        onFocus={() => setActivePillar(column.slug)}
                        className={cx(
                          // `relative` for the indicator, `whitespace-nowrap`
                          // because a wrapped tab label makes the strip two
                          // rows tall and the panel jump on hover.
                          'relative flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-t-chip px-2.5 pb-2 pt-1.5 text-[13px] font-semibold transition-colors duration-150',
                          selected
                            ? 'text-blue-600'
                            : 'text-ink-strong hover:text-blue-600',
                        )}
                      >
                        <Icon
                          name={column.icon}
                          size={15}
                          className={cx(
                            'flex-none transition-colors',
                            selected ? 'text-blue-600' : 'text-ink-decorative',
                          )}
                        />
                        {column.title}

                        {/* Same lamp as the nav pill above, rotated to the
                            bottom edge where a tab indicator belongs, and
                            sliding between tabs on a shared layoutId so the
                            selection reads as one object moving rather than
                            five independently blinking. `-bottom-px` parks it
                            on the strip's own hairline instead of above it. */}
                        {selected && (
                          <motion.span
                            layoutId="header-mega-tab"
                            className="absolute inset-x-2 -bottom-px h-0.5 rounded-t-full bg-blue-600"
                            initial={false}
                            transition={
                              reduceMotion
                                ? { duration: 0 }
                                : { type: 'spring', stiffness: 300, damping: 30 }
                            }
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* ── Services for the selected discipline ──────────────── */}
              {/* min-h pins the panel body, and the number is measured rather
                  than guessed. The disciplines carry 2 to 6 services — one row
                  in this grid for four of them, two for Software & AI — so
                  without a floor the panel changed height the moment the
                  pointer moved along the strip, resizing under the cursor
                  mid-gesture. The floor is the two-row case, so every tab
                  renders at the same height. Re-measure if the column count or
                  any pillar's service count changes.

                  It is a floor and not a fixed height, so erring low costs a
                  jump between tabs, not a clip. 132px is the two-row case plus
                  the "All …" link at p-4, with a few px to spare. */}
              <div className="flex min-h-[132px] flex-col p-4">
                <ul className="grid grid-cols-4 gap-x-3 gap-y-0.5">
                  {pillar.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        /* These have to read as links AT REST, not only under
                           the pointer. Previously the only affordances — a
                           tinted pill and a colour shift — were both
                           hover-only, so a stationary cursor saw two columns of
                           plain grey text.

                           So: an underline that is always present (the one
                           unambiguous link signal) and ink-strong rather than
                           ink-body for deliberateness. rounded-pill on the
                           hover fill still matches the nav pill's active seat
                           above.

                           inline-flex, not flex: the row is a grid cell ~236px
                           wide and a block-level link fills all of it, so the
                           hover fill ran far past a short label. Shrink-to-fit
                           keeps the pill on the words. */
                        className="inline-flex items-center rounded-pill px-2.5 py-1.5 text-[13.5px] font-medium text-ink-strong underline decoration-silver-300 decoration-1 underline-offset-[5px] transition-colors hover:bg-blue-50 hover:text-blue-600 hover:decoration-blue-600"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link href={pillar.href} className="u-arrow-link mt-auto pt-3 text-[13px]">
                  All {pillar.title}
                </Link>
              </div>
            </motion.div>
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
            {/* Services get accordions so all 18 stay reachable without an
                endless scroll. Native <details> — no JS, no state. */}
            <div className="flex flex-col gap-2">
              {nav.columns.map((column) => (
                <details key={column.slug} className="group u-tile px-4 py-3">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                    {/* Numbers dropped here too, so the mobile sheet and the
                        desktop menu label the disciplines the same way. */}
                    <span className="flex items-center gap-2.5">
                      <Icon name={column.icon} size={17} className="flex-none text-ink-decorative" />
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
                  <ul className="mt-3 flex flex-col gap-0.5 border-t border-line pt-3">
                    {column.links.map((link) => (
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
                </details>
              ))}
            </div>

            <nav aria-label="Primary mobile" className="flex flex-col gap-1">
              {nav.primary.filter((i) => i.href !== '/services').map((item) => (
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
