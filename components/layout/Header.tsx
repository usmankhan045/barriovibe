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
 * every service's full text, every intro, FAQ answer and step description,
 * into the browser bundle: tens of kilobytes gzipped, on every page, to
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
    primary: PRIMARY_NAV.map(({ label, href, mega }) => ({ label, href, mega })),
    columns: MEGA_MENU_COLUMNS.map((column) => ({
      slug: column.practice.slug,
      title: column.practice.shortTitle,
      href: column.href,
      icon: column.practice.icon,
      // Neither the services' `oneLiner` nor the practices' and disciplines'
      // `blurb` is passed. The menu renders no prose at all, just tab labels,
      // discipline headings and link labels, and a sentence per service plus a
      // paragraph per group is exactly the kind of thing that quietly ends up
      // in a bundle unrendered.
      groups: column.groups.map((group) => ({
        slug: group.pillar.slug,
        title: group.pillar.title,
        href: group.href,
        links: group.links.map(({ label, href }) => ({ label, href })),
      })),
    })),
  };

  return <HeaderClient nav={nav} />;
}
