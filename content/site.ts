import { SERVICE_COUNT_WORD } from './services';

/**
 * Site-wide constants.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  RENAMING THE AGENCY IS A THREE-LINE EDIT — right here.               │
 * │  Nothing else in the codebase hardcodes the brand name.               │
 * └──────────────────────────────────────────────────────────────────────┘
 *
 * Every value marked TODO is a placeholder awaiting real data. They render as
 * visible em-dashes rather than plausible-looking fake values, so an
 * unfinished field is obvious on the page instead of quietly shipping a lie.
 */

export const BRAND = {
  /** TODO: final agency name. */
  name: 'Northbound',
  /** TODO: registered legal entity, e.g. "Northbound (Private) Limited". */
  legalName: 'Northbound Advisory',
  /** TODO: production domain. Drives canonical URLs and absolute OG paths. */
  domain: 'https://example.com',
  /** Used in the footer and the wordmark's secondary line. */
  descriptor: 'Business · Digital · Technology',
} as const;

export const CONTACT = {
  /** TODO: real number, international format. */
  phone: '+92 000 0000000',
  /** Digits only, no +, no spaces — this is what wa.me expects. */
  whatsapp: '920000000000',
  /** TODO: real inbox. */
  email: 'hello@example.com',
  address: {
    /** TODO: real office address. */
    line1: '-',
    city: 'Karachi',
    country: 'Pakistan',
  },
  /** Displayed on the contact page so nobody wonders when they'll hear back. */
  hours: 'Mon–Sat, 10:00–19:00 PKT',
  responseTime: 'We reply to every enquiry within one working day.',
} as const;

export const SOCIALS = [
  { label: 'LinkedIn', href: '#', handle: '@' },
  { label: 'Instagram', href: '#', handle: '@' },
  { label: 'Facebook', href: '#', handle: '@' },
  { label: 'X', href: '#', handle: '@' },
] as const;

/**
 * The positioning line. Used as the metadata description default and in the
 * footer.
 *
 * It names the DISCIPLINES rather than the three practices. A practice name is
 * a category, and someone who reads only this sentence in a search result
 * should come away knowing what the firm actually does.
 */
export const TAGLINE =
  `Web, apps and AI. Marketing, e-commerce and monetization. Accounting, tax, company registration, IP and overseas setup. ${SERVICE_COUNT_WORD} services, one accountable team.`;

export const SHORT_TAGLINE =
  'One agency for software and AI, performance marketing and e-commerce, and corporate and advisory.';

/**
 * The hero subhead. Separate from TAGLINE, which it used to reuse.
 *
 * TAGLINE is written for a search result: a dense, comma-separated list of
 * what the firm sells, because that is what a snippet has to do in 160
 * characters with no page around it. Under a headline it read as a list rather
 * than as a sentence, and the hero is the one place on the site with a
 * visitor's full attention.
 *
 * So this one makes the argument instead of listing the inventory: what the
 * firm covers, and the reason that breadth is worth anything, which is that it
 * comes under one contract with one team answerable for it. The list is one
 * scroll below in the coverflow, and the full catalogue is a click away.
 */
export const HERO_SUBHEAD =
  `Software and AI, performance marketing and e-commerce, and the corporate, tax and legal work behind them. ${SERVICE_COUNT_WORD} services, one contract, and one team that cannot point at another vendor when something goes wrong.`;
