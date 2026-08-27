import { PRACTICE_GROUPS, practiceHref } from './services';

/**
 * Navigation trees, derived from `services.ts` so a new service appears in the
 * mega-menu and footer without anyone remembering to add it.
 */

export interface NavLink {
  label: string;
  href: string;
  /**
   * Set on the single "Services" item only. It is what opens the mega-menu
   * panel; the panel itself carries an internal tab strip (built from
   * `MEGA_MENU_COLUMNS`) for switching between the three practices, so this
   * flag does not need to name which one.
   */
  mega?: boolean;
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
 * ONE "Services" ITEM HOLDS ALL THREE PRACTICES.
 *
 * This used to put the three practices directly in the pill, each opening its
 * own panel, on the theory that the site's core distinction should be visible
 * before anyone touches the nav. The client's later instruction reversed that:
 * one "Services" tab, with the three practices as an internal tab strip inside
 * the single panel it opens. The panel's per-practice content (the discipline
 * columns and their links) is unchanged; only the outer trigger and the way
 * you pick a practice moved. See the mega-menu render in
 * components/layout/HeaderClient.tsx.
 *
 * The complete catalogue has not gone anywhere: /services is still the hub,
 * the "Services" item links there directly, and the panel ends with a link to
 * it too.
 *
 * Home and Blog bracket the pill on the client's instruction: Home leftmost,
 * Blog rightmost, with the existing Contact/About order kept between them.
 * Blog links to `/blog`, which currently renders an honest "nothing published
 * yet" state — see app/blog/page.tsx — rather than being left unlinked or
 * pointed at a page that does not exist.
 *
 * ── What is NOT in the pill ──
 *
 * Work. It is still a page and still linked from the footer through
 * COMPANY_LINKS; it is out of the top nav because it is the one a visitor is
 * least likely to be hunting for by name.
 */
export const PRIMARY_NAV: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services', mega: true },
  { label: 'Contact', href: '/contact' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
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
