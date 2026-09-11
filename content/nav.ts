import { PRACTICE_GROUPS, practiceHref } from './services';
import { TOOL_GROUPS, toolHref } from './tools';

/**
 * Navigation trees, derived from `services.ts` so a new service appears in the
 * mega-menu and footer without anyone remembering to add it.
 */

export interface NavLink {
  label: string;
  href: string;
  /**
   * Names which mega-menu panel this item opens, or is absent on the items
   * that are plain links.
   *
   * Two items carry one: "Services" opens the practice panel built from
   * `MEGA_MENU_COLUMNS`, and "Tools" opens the calculator panel built from
   * `TOOLS_MENU_COLUMNS`. Each panel carries its own internal tab strip, so
   * the flag names the panel rather than the tab: which tab is showing is
   * runtime state in the header, not part of the nav tree.
   *
   * It used to be a boolean, when Services was the only item with a panel. A
   * boolean cannot say WHICH panel once there are two, and the header keys
   * its open state on this string.
   */
  mega?: MegaMenuId;
}

/** The panels the header can open. See `mega` above. */
export type MegaMenuId = 'services' | 'tools';

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
 * The Tools panel, shaped as group → calculators.
 *
 * Deliberately one level shallower than `MEGA_MENU_COLUMNS`. A practice holds
 * disciplines which hold services; a tool group holds calculators directly.
 * That extra level is why Services needs a tab strip and Tools does not: three
 * practices holding forty-four services cannot be shown at once, six groups
 * holding twenty-two calculators can. The panel shows all six side by side,
 * each under its own heading. See the tab strip's note in HeaderClient.
 *
 * Header.tsx is what turns this list into the panel's single column, so the
 * shape the client renders stays identical for both menus.
 *
 * Derived from `TOOL_GROUPS` for the same reason the services tree is derived
 * from `PRACTICE_GROUPS`: a new calculator appears in the menu by being added
 * to its group, and nobody has to remember a second list.
 */
export const TOOLS_MENU_COLUMNS = TOOL_GROUPS.map((group) => ({
  slug: group.slug,
  /* The group's own heading in the panel, not the hub's split title. See the
     note on `navLabel` in content/tools.ts. */
  title: group.navLabel,
  icon: group.icon,
  /* The group's own section on the hub, not a page of its own: the groups are
     headings on /tools, and each one carries `scroll-mt-28` and an id there so
     the fragment lands under the sticky header. */
  href: `/tools#${group.slug}`,
  tools: group.tools.map((tool) => ({
    label: tool.navLabel,
    href: toolHref(tool),
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
 * Blog links to `/blog`, which lists the published posts by cluster. It keeps
 * the honest "nothing published yet" state it used to render unconditionally,
 * now triggered by the date gate actually having published nothing rather than
 * by a hand-flipped flag. See app/blog/page.tsx.
 *
 * ── Tools ──
 *
 * Added next to Services because it is the same kind of item: a hub over a
 * growing set of pages, listed in content/tools.ts.
 *
 * It carried no panel at first, on the reasoning that a handful of
 * calculators could be chosen from a page and a panel for them would be a
 * near-empty copy of the Services one sitting next to the full one. That
 * reasoning expired with the count: `TOOL_GROUPS` now holds twenty-two
 * calculators in six groups, which is a hub, not a handful, and the argument
 * that forty-four services cannot be chosen from a dropdown applies to them
 * for the same reason. So Tools opens its own panel, with the six groups as
 * its tab strip, exactly as the practices are the Services tab strip.
 *
 * It sits before Contact rather than after Blog: it is a reason to visit the
 * site, not an afterword, and the two hub items reading together keeps the
 * pill's ordering honest about what the site is.
 *
 * ── What is NOT in the pill ──
 *
 * Work. It is still a page and still linked from the footer through
 * COMPANY_LINKS; it is out of the top nav because it is the one a visitor is
 * least likely to be hunting for by name.
 */
export const PRIMARY_NAV: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services', mega: 'services' },
  { label: 'Tools', href: '/tools', mega: 'tools' },
  /* Guides sits beside Tools because the two work as a pair: a calculator
     answers "what is the number" and a guide answers "why is it that number",
     and each links to the other. Placed before Contact so the reference
     material reads as one group.

     NOTE: this takes the header to seven items. Blog still points at a page
     that says nothing is published yet, which is an honest empty state but a
     weak signal on every page of the site. Moving Blog to the footer until it
     has posts is worth considering; left in place because that is the owner's
     call, not a technical one. */
  { label: 'Guides', href: '/guides' },
  { label: 'Contact', href: '/contact' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
];

/**
 * The footer's second column.
 *
 * "Tools" sits with these rather than in the services columns because the
 * calculators are not services: they are free, they are the pages here a
 * visitor might arrive at without wanting to hire anybody, and listing them
 * among the forty-four purchasable things would misrepresent them in both
 * directions.
 *
 * This used to link `/tools/salary-tax` directly, because the calculator was
 * the only tool and the footer was the only site-wide link it had. It now
 * points at the hub, which is in the top nav too: a footer that named one
 * calculator would go stale the moment a second one shipped, and the hub is
 * one click from every tool.
 */
export const COMPANY_LINKS: NavLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Tools', href: '/tools' },
  { label: 'Contact', href: '/contact' },
];

export const LEGAL_LINKS: NavLink[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];
