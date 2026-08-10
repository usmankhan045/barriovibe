import type { Pillar } from './types';

/**
 * The five disciplines. These organise the 18 services for navigation — but
 * note that pillars also *hide* detail, which is why the home page carries a
 * separate section listing all 18 services by name with nothing collapsed.
 *
 * ── Order is the priority statement ──
 *
 * ARRAY ORDER IS THE ONLY THING THAT RANKS THE DISCIPLINES, and it ranks them
 * everywhere at once: the home page list, the mega-menu tab strip (whose first
 * tab is also the one open by default), the services hub, the footer columns,
 * the About grid, the 404 cards, the contact form's dropdown and sitemap.xml.
 * The `number` field is a label for display, not the sort key — keep it in sync
 * by hand when reordering, because nothing derives one from the other.
 *
 * Software & AI leads on the client's instruction that it is the lead offering.
 * Finance & Tax was first when the site was built and is now second; if that
 * ever changes back, move the object and renumber, do not renumber alone.
 *
 * Every badge is `chrome`. An earlier version alternated blue → chrome down
 * the list; the client's call is one silver treatment throughout, matching the
 * chrome button, so the icons read as one set rather than as two categories of
 * discipline. Keep any new pillar on `chrome` — a lone blue badge would look
 * like the odd one out, not like emphasis.
 */
export const PILLARS: Pillar[] = [
  {
    slug: 'software-ai',
    number: '01',
    title: 'Software & AI',
    shortTitle: 'Software',
    headline: { lines: ['Shipped to spec.'], accent: 'Owned by you' },
    blurb:
      'Websites, apps, AI agents, digital employees, chatbots and automations built to a spec, shipped on a date, and handed over with the source.',
    intro:
      'We design and build the software your business runs on: marketing sites, full-stack web applications, mobile apps, AI agents, Digital FTEs modelled on one specific person, chatbots and workflow automations. Fixed scope, fixed date, and you own the repository at handover. No lock-in, no black boxes.',
    icon: 'code',
    badge: 'chrome',
    highlights: ['Web', 'Apps', 'AI Agents', 'Digital FTE', 'Automation', 'Chatbots'],
  },
  {
    slug: 'finance-tax',
    number: '02',
    title: 'Finance & Tax',
    shortTitle: 'Finance & Tax',
    headline: { lines: ['Clean books.'], accent: 'Correct filings' },
    blurb:
      'Books kept clean and returns filed on time, so your numbers are always ready for a bank, an investor or the FBR.',
    intro:
      'Accurate books and correct filings are the floor everything else stands on. We keep your accounts current, reconcile them monthly, and file every income and sales tax return through FBR IRIS before the deadline, with the working papers to back up every figure.',
    icon: 'calculator',
    badge: 'chrome',
    highlights: ['Accounting', 'Bookkeeping', 'Income Tax', 'Sales Tax'],
  },
  {
    slug: 'corporate-compliance',
    number: '03',
    title: 'Corporate & Compliance',
    shortTitle: 'Corporate',
    headline: { lines: ['Registered.'], accent: 'And kept compliant' },
    blurb:
      'Registrations, licenses and statutory filings handled end to end, from trademark to import licence to annual SECP returns.',
    intro:
      'Getting registered is the easy half; staying compliant is where most businesses slip. We handle SECP incorporation and annual filings, register your trademark with IPO Pakistan, and get your import–export licence live on PSW, then keep the calendar so no deadline is ever a surprise.',
    icon: 'shield',
    badge: 'chrome',
    highlights: ['Trademark', 'Import/Export', 'Compliance'],
  },
  {
    slug: 'growth-marketing',
    number: '04',
    title: 'Growth & Marketing',
    shortTitle: 'Growth',
    headline: { lines: ['Demand built.'], accent: 'Measured on revenue' },
    blurb:
      'Campaigns that pay back, social that is actually run, and channels monetized, measured against revenue rather than impressions.',
    intro:
      'We run the demand side of your business: paid campaigns across Meta, Google, TikTok and LinkedIn, organic social produced and published on a cadence, and platform monetization taken to approval. Every engagement is reported against revenue and cost per acquisition, never against vanity metrics.',
    icon: 'megaphone',
    badge: 'chrome',
    highlights: ['Social', 'Paid Ads', 'Monetization'],
  },
  {
    slug: 'ecommerce',
    number: '05',
    title: 'E-commerce & Marketplaces',
    shortTitle: 'E-commerce',
    headline: { lines: ['Built to sell.'], accent: 'Run every day' },
    blurb:
      'Stores that convert and marketplace channels that stay healthy: built, launched, then operated order by order.',
    intro:
      'We build the commercial front end and then keep it running. Shopify stores developed around your catalogue and configured for the payment methods your customers actually use, and the daily operation behind them: listings, inventory, orders, returns and reporting across Shopify, Daraz and Amazon.',
    icon: 'cart',
    badge: 'chrome',
    highlights: ['Shopify', 'Marketplaces', 'Store Ops'],
  },
];

export const PILLAR_BY_SLUG = Object.fromEntries(
  PILLARS.map((p) => [p.slug, p]),
) as Record<Pillar['slug'], Pillar>;
