import { HeaderClient, type NavData } from './HeaderClient';
import { PRIMARY_NAV, MEGA_MENU_COLUMNS } from '@/content/nav';

/**
 * SLOT — the client is supplying their own navbar. See components/ui/README.md.
 *
 * ── Why this is split into two files ──
 *
 * The header genuinely needs client JS: the scroll-triggered blur, the
 * mega-menu open state, and the mobile sheet. But it also needs the navigation
 * tree, which is derived from the content layer.
 *
 * When both lived in one `'use client'` file, importing the nav tree dragged
 * all eighteen services' full text — every intro, FAQ answer and step
 * description — into the browser bundle: 25KB gzipped, on every page, to
 * render a menu that uses a label and an href per link.
 *
 * So this Server Component reduces the content to the handful of strings the
 * menu actually renders, and hands them to the client component as props. The
 * interactivity is unchanged; the payload is not.
 *
 * The mega-menu lists ALL services rather than a curated subset, and
 * `pnpm check:content` fails the build if any service is missing from it —
 * that is what enforces the "nothing hidden" requirement at the navigation
 * level.
 */
export function Header() {
  const nav: NavData = {
    primary: PRIMARY_NAV.map(({ label, href }) => ({ label, href })),
    columns: MEGA_MENU_COLUMNS.map((column) => ({
      slug: column.pillar.slug,
      title: column.pillar.title,
      href: column.href,
      icon: column.pillar.icon,
      // Neither the services' `oneLiner` nor the pillars' `blurb` is passed.
      // The menu renders no prose at all now — just tab labels and link
      // labels — and eighteen sentences plus five paragraphs is exactly the
      // kind of thing that quietly ends up in a bundle unrendered.
      links: column.links.map(({ label, href }) => ({ label, href })),
    })),
  };

  return <HeaderClient nav={nav} />;
}
