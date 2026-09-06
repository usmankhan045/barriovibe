import { HeaderClient, type NavData } from './HeaderClient';
import { PRIMARY_NAV, MEGA_MENU_COLUMNS, TOOLS_MENU_COLUMNS } from '@/content/nav';

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
 *
 * The same reduction is done for the Tools panel, which is a second menu of
 * the same shape over content/tools.ts. That file is the larger of the two by
 * some way, since every calculator carries its own FAQ set, so keeping it out
 * of the client bundle matters more here, not less.
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
    /* The Tools panel, in the same shape as the practices above so the header
       renders both through one component.

       ONE column, holding all six groups, where Services has one column per
       practice. That difference is the whole reason the Tools panel has no tab
       strip: a tab strip is a control for picking between columns, and there
       is nothing here to pick between. Twenty-two calculators fit on screen
       together; forty-four services do not. The header derives that from the
       column count rather than from the menu's name, so this shape is what
       decides it. See the tab strip's note in HeaderClient.

       The groups keep their own titles, which become the column headings that
       tell the six apart. */
    tools: [
      {
        slug: 'tools',
        /* Neither is rendered: an untabbed panel draws no tab, and the tab is
           the only thing that uses a column's own title and icon. They are
           here because the shape is shared with the practices above, where
           both are drawn. Kept honest rather than left blank so that a Tools
           panel that ever does grow a second column has them already. */
        title: 'Tools',
        href: '/tools',
        icon: 'calculator' as const,
        groups: TOOLS_MENU_COLUMNS.map((group) => ({
          slug: group.slug,
          title: group.title,
          href: group.href,
          links: group.tools,
        })),
      },
    ],
  };

  return <HeaderClient nav={nav} />;
}
