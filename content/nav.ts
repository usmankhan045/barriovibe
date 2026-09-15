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
 * ── Work ──
 *
 * Work was deliberately absent from the pill for most of this site's life, on
 * the reasoning that it was the item a visitor was least likely to hunt for by
 * name. That reasoning held only while the page was an empty state: an item
 * promising work and delivering an apology is worth less than no item.
 *
 * It now holds shipped systems with their source public, which makes it the
 * page that answers "can they actually build things", and that is the question
 * a prospective client arrives with. So it is in the pill.
 *
 * A PLAIN LINK, not a panel. It had one briefly: a mega-menu listing every
 * build, built to match Services and Tools. Those two earn their panels by
 * holding forty-four services and twenty-two calculators, which genuinely
 * cannot be chosen from a page. Work holds two products. A panel that opens
 * to reveal two links is a door in front of a door, and it made a portfolio
 * of two things look like a filing system.
 *
 * Placed directly after Services: the two read as a pair, one naming what we
 * sell and the next showing what we have built, which is the order the
 * question actually gets asked in. It stays in COMPANY_LINKS in the footer.
 */
export const PRIMARY_NAV: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services', mega: 'services' },
  { label: 'Work', href: '/work' },
  { label: 'Tools', href: '/tools', mega: 'tools' },
  /* Guides sits beside Tools because the two work as a pair: a calculator
     answers "what is the number" and a guide answers "why is it that number",
     and each links to the other. Guides and Blog then sit together as the two
     reading items, so the pill reads in four groups: where you are, what we
     sell and have built, what you can read, who we are. */
  { label: 'Guides', href: '/guides' },
  { label: 'Blog', href: '/blog' },
  /* About is LAST, and last is a position, not a leftover.

     Every professional services site of any size puts the company link at the
     far end of the bar: the visitor arrives asking what you do, not who you
     are, and the ones who do want to know who you are look at the end of the
     row because that is where the industry has trained them to look. It is
     also the natural handoff into the CTA that follows it, since "who are
     these people" is the last question before "talk to them".

     CONTACT IS NOT IN THE PILL. It used to sit between Guides and About,
     where it duplicated the "Start a project" button sitting a few pixels to
     its right. Two controls for one action, adjacent, is a dilution of the
     one that converts, and the weaker of the two was winning ties on
     proximity to the menu. Contact keeps its page, its footer link in
     COMPANY_LINKS, and the button, which is the loudest thing in the header.
     Removing it from the pill is what buys About its place at the end
     without taking the bar to eight items. */
  { label: 'About', href: '/about' },
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
