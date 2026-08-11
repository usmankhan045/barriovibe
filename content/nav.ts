import { PRACTICE_GROUPS, practiceHref } from './services';

/**
 * Navigation trees, derived from `services.ts` so a new service appears in the
 * mega-menu and footer without anyone remembering to add it.
 */

export interface NavLink {
  label: string;
  href: string;
  /**
   * Set on the three practice items only. It names the MEGA_MENU_COLUMNS entry
   * this link opens, which is what gives each practice its own panel instead
   * of one shared "Services" menu with the practices as tabs inside it.
   */
  practice?: string;
}

/**
 * The mega-menu and the footer, both shaped as practice → discipline →
 * services. Every service is listed under exactly one practice.
 *
 * A practice trigger links to the practice's own page, which lists every
 * service under it grouped by discipline. It used to link to the first
 * discipline instead, on the theory that a practice needed no page: that made
 * the "Marketing & E-commerce" tab open a page headed "Growth" with no mention
 * of E-commerce, and hid ten of the thirteen services behind "Corporate &
 * Advisory". `practiceHref` resolves to the discipline only where the practice
 * holds exactly one. See the note in content/practices.ts.
 */
export const MEGA_MENU_COLUMNS = PRACTICE_GROUPS.map(({ practice, groups }) => ({
  practice,
  href: practiceHref(practice.slug),
  groups: groups.map(({ pillar, services }) => ({
    pillar,
    href: `/services/${pillar.slug}`,
    links: services.map((s) => ({
      label: s.navLabel,
      href: `/services/${s.pillar}/${s.slug}`,
      oneLiner: s.oneLiner,
    })),
  })),
}));

/**
 * THE THREE PRACTICES ARE THE NAVIGATION, not one "Services" item that hides
 * them.
 *
 * This used to be a single Services link opening one panel with the practices
 * as a tab strip inside it. That made the top-level offering invisible until
 * you hovered, and it put the site's most important distinction one
 * interaction deeper than it needed to be. Now the practices ARE the top-level
 * items and each opens its own panel, so a visitor reads "Software & AI /
 * Marketing & E-commerce / Corporate & Advisory" before touching anything.
 *
 * The complete catalogue has not gone anywhere: /services is still the hub and
 * every panel ends with a link to it.
 *
 * Derived, not typed out. A fourth practice appears in the navbar with no edit
 * here, which also means the pill's width is content-driven and worth
 * re-measuring if one is ever added. See the note on the nav pill in
 * components/layout/HeaderClient.tsx.
 *
 * ── What is NOT in the pill ──
 *
 * Work. It is still a page and still linked from the footer through
 * COMPANY_LINKS; it is out of the top nav because six items with three long
 * practice names was more than the pill could hold at 1024px, and of the
 * non-practice items it is the one a visitor is least likely to be hunting for
 * by name.
 *
 * About is last, on the client's instruction that it sits in the right-hand
 * corner of the nav rather than in the middle of it.
 */
export const PRIMARY_NAV: NavLink[] = [
  ...MEGA_MENU_COLUMNS.map((column) => ({
    label: column.practice.shortTitle,
    href: column.href,
    practice: column.practice.slug,
  })),
  { label: 'Contact', href: '/contact' },
  { label: 'About', href: '/about' },
];

export const COMPANY_LINKS: NavLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Contact', href: '/contact' },
];

export const LEGAL_LINKS: NavLink[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];
