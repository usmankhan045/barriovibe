import type { Practice } from './types';

/**
 * The three practices. This is the top of the tree: practice → discipline →
 * service.
 *
 * ── Why this layer exists ──
 *
 * The site used to put all five disciplines in one row of mega-menu tabs and
 * leave it at that. That worked at 23 services across 5 disciplines. It does
 * not work at 32 across 7, and it never told a visitor the thing they most
 * need to know first, which is that this firm sells three quite different
 * things: software, demand, and the corporate and financial back office. A
 * visitor looking for a Shopify store and a visitor looking for a sales tax
 * return have almost nothing in common, and a flat list of tabs asked both of
 * them to read past the other's work.
 *
 * So the practices carry the top of the navigation: the mega-menu tab strip,
 * the home page's structure section, the services hub and the footer columns.
 * The disciplines are still where the pages live.
 *
 * ── A practice with two or more disciplines IS a route ──
 *
 * `/services/{practice}` exists for Marketing & E-commerce and Corporate &
 * Advisory, and lists every service in the practice grouped by discipline.
 * This file used to argue the opposite, on the grounds that another index
 * between the home page and a service is a near-duplicate list of the same
 * links. What that reasoning missed is that the navbar tab had to point
 * somewhere regardless, and pointing it at the first discipline is not a
 * neutral compromise: "Marketing & E-commerce" opened a page headed "Growth"
 * with E-commerce nowhere on it. The index is not a duplicate, it is the only
 * page that answers the promise the tab makes.
 *
 * Software & AI holds one discipline and gets no separate page: `/services/
 * software-ai` is that discipline's page, which already lists the practice in
 * full, and the practice and the discipline share the slug in any case.
 *
 * `pillars` below is the only record of which discipline belongs to which
 * practice, and `pnpm check:content` fails the build if a discipline is listed
 * twice or left out.
 *
 * ── Order is the priority statement ──
 *
 * Array order ranks the practices everywhere at once, and `content/pillars.ts`
 * is now sorted to agree with it: pillar order follows practice order, then
 * the order inside `pillars` here. Reordering is the whole edit; there is no
 * separate display numeral to keep in step with it any more.
 *
 * Software & AI leads on the client's instruction that it is the lead
 * offering. That is why Finance & Tax, which used to be the second discipline
 * on the site, now sits fourth: it did not move down in importance, its
 * practice did not lead. Do not "fix" that by reordering pillars.ts alone.
 *
 * Every badge is `chrome`, matching the disciplines. See the note in
 * content/pillars.ts: one silver treatment throughout, so a lone blue badge
 * reads as the odd one out rather than as emphasis.
 */
export const PRACTICES: Practice[] = [
  {
    slug: 'software-ai',
    title: 'Software & AI',
    shortTitle: 'Software & AI',
    blurb:
      'The software your business runs on, and the AI layer on top of it: websites, apps, agents, retrieval systems, chatbots and automations.',
    intro:
      'Everything we build and hand over with the source. Marketing sites and full-stack web applications, mobile apps, AI agents, RAG systems answering from your own documents, chatbots and the workflow automation that removes the work nobody should still be doing by hand. Fixed scope, fixed date, and the repository is yours at handover.',
    icon: 'code',
    badge: 'chrome',
    /* The knight is the only piece that does not move in a straight line and the
       only one that jumps what is in its way, which is the closest the board
       gets to what this practice sells. */
    mark: 'knight',
    pillars: ['software-ai'],
  },
  {
    slug: 'marketing-ecommerce',
    title: 'Performance Marketing & E-commerce',
    shortTitle: 'Marketing & E-commerce',
    headline: { lines: ['We bring the demand,'], accent: 'and the store it lands on' },
    blurb:
      'The revenue side: paid campaigns, organic social and monetization, plus the stores and marketplace channels that take the order.',
    intro:
      'We run the demand side of your business and the storefront it lands on. Paid campaigns across Meta, Google, TikTok and LinkedIn reported against cost per acquisition, social produced and published on a cadence, platform monetization taken to approval, Shopify stores built around your catalogue, and the daily operation behind them across Shopify, Daraz and Amazon.',
    icon: 'megaphone',
    badge: 'chrome',
    /* The bishop works the long diagonals: reach across the whole board from
       one square, which is demand and distribution. */
    mark: 'bishop',
    pillars: ['growth-marketing', 'ecommerce'],
  },
  {
    slug: 'corporate-advisory',
    title: 'Corporate & Advisory',
    shortTitle: 'Corporate & Advisory',
    headline: { lines: ['The back office a regulator,'], accent: 'a bank or a buyer will accept' },
    blurb:
      'The regulated back office: accounts and tax, company registration and compliance, intellectual property, contracts, and setting up abroad.',
    intro:
      'The part of a business that is judged by a regulator, a bank or a buyer rather than by a customer. Books kept clean and returns filed before the deadline, companies registered and kept compliant with SECP, trademarks and patents secured through IPO Pakistan, agreements drafted properly the first time, and entities set up and filing in Saudi Arabia, the UAE and the United Kingdom.',
    icon: 'shield',
    badge: 'chrome',
    /* The rook is the piece you castle behind. A regulated back office is the
       same trade: it does not win the game, it is what stops you losing it. */
    mark: 'rook',
    pillars: [
      'finance-tax',
      'corporate-legal',
      'intellectual-property',
      'international-expansion',
    ],
  },
];

export const PRACTICE_BY_SLUG = Object.fromEntries(
  PRACTICES.map((p) => [p.slug, p]),
) as Record<Practice['slug'], Practice>;

/** Which practice a discipline sits under. Built from `pillars`, never by hand. */
export const PRACTICE_OF_PILLAR = Object.fromEntries(
  PRACTICES.flatMap((practice) => practice.pillars.map((pillar) => [pillar, practice])),
) as Record<string, Practice>;
