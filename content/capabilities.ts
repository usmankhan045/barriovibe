import type { IconName, PillarSlug } from './types';

/**
 * The home page capability grid — the copy half.
 *
 * ── Why this section exists, and what it deliberately is NOT ──
 *
 * It replaced a section that listed all eighteen services by name with a
 * one-liner each. That version was honest but it was a directory: five columns
 * of small type, ~60 lines of copy, and nothing for the eye to hold. The full
 * catalogue lives on /services and in the mega-menu — both of which
 * `pnpm check:content` still enforces — so nothing is hidden by summarising it
 * here.
 *
 * Three sections on the home page talk about the offering, and they must not
 * repeat one another:
 *
 *   · Disciplines  — the five CATEGORIES. What the teams are called.
 *   · this section — the CAPABILITY. What the work actually consists of,
 *                    named systems and named platforms, one card per team.
 *   · WhyUs        — the COMMITMENTS. How we behave, checkably.
 *
 * So every line below is mechanism, not adjective and not promise: FBR IRIS,
 * Form A, PSW, cost per acquisition, the examination stage. If a card could be
 * rewritten as "we're great at X", it is wrong.
 *
 * ── The word budget is a layout constraint, not a style preference ──
 *
 * `title` is 2–5 words and `body` is ONE sentence of 16–22 words. The cards sit
 * in rows of equal height, so the longest body in a row sets the height of
 * every card in it — a 40-word body does not make one card taller, it makes the
 * whole row taller. The first version of this section ran to ~35 words a card
 * and the grid came out over 1,800px deep. Keep to the budget.
 *
 * `id` selects the mini-graphic in components/sections/Capabilities.tsx — a
 * card cannot be added here alone; the union forces a matching visual.
 */
export type CapabilityId =
  | 'one-contract'
  | 'deadlines'
  | 'registrations'
  | 'campaigns'
  | 'storefronts'
  | 'software';

export interface Capability {
  id: CapabilityId;
  icon: IconName;
  /**
   * The discipline this card is evidence of. Rendered as the small blue label
   * above the title, resolved through PILLARS so the wording cannot drift from
   * the pillar pages — which is also why it is a slug and not a string.
   *
   * `null` on the lead card only: that one is about all five at once.
   */
  pillar: PillarSlug | null;
  /** 2–5 words. */
  title: string;
  /** One sentence, 16–22 words. See the word-budget note above. */
  body: string;
  /**
   * Micro-label above the graphic. Only the two full-width cards render it —
   * on the compact cards it is a third line of type where there is room for
   * two, and their graphics label themselves.
   */
  panelLabel: string;
  /** Where the card goes. Always a real page, never an anchor. */
  href: string;
}

/** The lead card's label, standing in for a pillar name. */
export const ALL_DISCIPLINES_LABEL = 'All five disciplines';

export const CAPABILITIES: Capability[] = [
  {
    id: 'one-contract',
    icon: 'knight',
    pillar: null,
    title: 'Five disciplines, one contract',
    body: 'Finance, compliance, growth, commerce and software on a single agreement, a single invoice and one point of contact.',
    panelLabel: 'What the contract covers',
    href: '/services',
  },
  {
    id: 'deadlines',
    icon: 'calculator',
    pillar: 'finance-tax',
    title: 'Deadlines we watch',
    body: 'Monthly sales tax, income tax returns and the SECP annual return, filed through IRIS from books we reconcile ourselves.',
    panelLabel: 'On the calendar',
    href: '/services/finance-tax',
  },
  {
    id: 'registrations',
    icon: 'shield',
    pillar: 'corporate-compliance',
    title: 'Registered, not just filed',
    body: 'Trademarks, import–export licensing and SECP incorporation, carried through the examination stage rather than dropped at filing.',
    panelLabel: 'Filing to registration',
    href: '/services/corporate-compliance',
  },
  {
    id: 'campaigns',
    icon: 'chart',
    pillar: 'growth-marketing',
    title: 'Campaigns tied to sales',
    body: 'Meta, Google, TikTok and LinkedIn spend, with conversion tracking installed before the first rupee goes out.',
    panelLabel: 'Reported monthly',
    href: '/services/growth-marketing',
  },
  {
    id: 'storefronts',
    icon: 'cart',
    pillar: 'ecommerce',
    title: 'Storefronts built, then run',
    body: 'A Shopify store configured for how your customers actually pay, then listings, stock, orders and returns, daily.',
    panelLabel: 'Channels we run',
    href: '/services/ecommerce',
  },
  {
    id: 'software',
    icon: 'sparkles',
    pillar: 'software-ai',
    title: 'Software and AI you can put to work',
    body: 'Sites, platforms and mobile apps, plus agents and chatbots that use your own tools, with a human approval wherever money moves.',
    panelLabel: 'Inside one agent run',
    href: '/services/software-ai',
  },
];

/** The three statutory filings shown on the finance card's calendar. */
export const FILING_CALENDAR = [
  { label: 'Sales tax return', cadence: 'Monthly · by the 18th' },
  { label: 'Income tax return', cadence: 'Annual · FBR IRIS' },
  { label: 'Annual return', cadence: 'Annual · SECP Form A' },
] as const;

/**
 * The registration path, filing through to certificate.
 *
 * One word each: the stages render as a horizontal rail on the narrowest card
 * in the grid, and a two-word label there wraps under its own dot.
 */
export const REGISTRATION_STAGES = ['Filed', 'Examined', 'Registered'] as const;

/** The registries the stages above are filed with. Named, because "we handle
 *  registrations" is a claim and "IPO Pakistan, SECP, PSW" is a fact. */
export const REGISTRATION_AUTHORITIES = 'IPO Pakistan · SECP · PSW and WeBOC';

/**
 * Sales channels operated on the e-commerce card, each with what we actually
 * run on it — the channel names alone left that card two lines shorter than
 * the chart beside it, and a card with a hole in it undoes the row.
 */
export const COMMERCE_CHANNELS = [
  { name: 'Shopify', scope: 'Store, theme, checkout' },
  { name: 'Daraz', scope: 'Listings, stock' },
  { name: 'Amazon', scope: 'Orders, returns' },
] as const;

/**
 * One agent run, traced. Written as the steps of a real task rather than a
 * feature list, because "AI agents" means nothing until someone shows the
 * steps — and the last line is the point: it stops for a human.
 */
export const AGENT_TRACE = [
  { step: 'Order query arrives', tool: 'WhatsApp' },
  { step: 'Customer and order matched', tool: 'Your Shopify' },
  { step: 'Refund drafted, held for approval', tool: 'Human check' },
] as const;
