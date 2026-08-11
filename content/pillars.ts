import type { Pillar } from './types';

/**
 * The seven disciplines. These organise the 32 services for navigation, but
 * note that disciplines also *hide* detail, which is why the services hub
 * lists every service by name with nothing collapsed.
 *
 * ── Order is derived, not chosen here ──
 *
 * This array used to be the site's only ranking. It is not any more.
 * `content/practices.ts` ranks the three practices, and each practice lists
 * its disciplines in order; THIS ARRAY MUST BE SORTED TO AGREE WITH THAT, and
 * `pnpm check:content` fails the build if it drifts.
 *
 * The order still ranks the disciplines everywhere at once: the services hub,
 * the footer columns, the About grid, the 404 cards, the contact form's
 * dropdown and sitemap.xml. Reordering this array is the whole edit; the
 * disciplines are not numbered on the site.
 *
 * Software & AI leads on the client's instruction that it is the lead
 * offering. Finance & Tax was second when the site was built and now sits
 * fourth: it did not move down in importance, its practice did not lead. If
 * that ever changes, move the practice in content/practices.ts and resort this
 * file to match. Do not reorder this file alone.
 *
 * Every badge is `chrome`. An earlier version alternated blue → chrome down
 * the list; the client's call is one silver treatment throughout, matching the
 * chrome button, so the icons read as one set rather than as two categories of
 * discipline. Keep any new discipline on `chrome` — a lone blue badge would
 * look like the odd one out, not like emphasis.
 */
export const PILLARS: Pillar[] = [
  /* ── Practice 01 · Software & AI ──────────────────────────────────────── */
  {
    slug: 'software-ai',
    title: 'Software & AI',
    shortTitle: 'Software',
    headline: { lines: ['We build the software'], accent: 'your business runs on' },
    servicesHeadline: { lines: ['Take one build,'], accent: 'or the whole stack' },
    blurb:
      'Websites, apps, AI agents, RAG systems, digital employees, chatbots and automations built to a spec, shipped on a date, and handed over with the source.',
    intro:
      'We design and build the software your business runs on: marketing sites, full-stack web applications, mobile apps, AI agents, retrieval systems that answer from your own documents, Digital FTEs modelled on one specific person, chatbots and workflow automations. The scope and the date are fixed before we start, and the repository is transferred to you at handover, so nothing here locks you into working with us again.',
    icon: 'code',
    badge: 'chrome',
    highlights: ['Web', 'Apps', 'AI Agents', 'RAG', 'Digital FTE', 'Automation'],
  },

  /* ── Practice 02 · Performance Marketing & E-commerce ─────────────────── */
  {
    slug: 'growth-marketing',
    title: 'Growth & Marketing',
    shortTitle: 'Growth',
    headline: { lines: ['Paid and organic demand,'], accent: 'reported against revenue' },
    servicesHeadline: { lines: ['Where your next'], accent: 'customer comes from' },
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
    title: 'E-commerce & Marketplaces',
    shortTitle: 'E-commerce',
    headline: { lines: ['Stores built to sell,'], accent: 'then run every day' },
    servicesHeadline: { lines: ['The storefront, and'], accent: 'the work behind it' },
    blurb:
      'Stores that convert and marketplace channels that stay healthy: built, launched, then operated order by order.',
    intro:
      'We build the commercial front end and then keep it running. Shopify stores developed around your catalogue and configured for the payment methods your customers actually use, and the daily operation behind them: listings, inventory, orders, returns and reporting across Shopify, Daraz and Amazon.',
    icon: 'cart',
    badge: 'chrome',
    highlights: ['Shopify', 'Marketplaces', 'Store Ops'],
  },

  /* ── Practice 03 · Corporate & Advisory ───────────────────────────────── */
  {
    slug: 'finance-tax',
    title: 'Finance & Tax',
    shortTitle: 'Finance & Tax',
    headline: { lines: ['Books kept clean and'], accent: 'returns filed on time' },
    servicesHeadline: { lines: ['Your numbers, ready'], accent: 'when someone asks' },
    blurb:
      'Books kept clean, returns filed on time and your statutory audit run on a calendar, so your numbers are always ready for a bank, an investor or the FBR.',
    intro:
      'Everything else in this practice depends on the books being accurate and the filings being correct. We keep your accounts current and reconcile them monthly, file every income and sales tax return through FBR IRIS before its deadline, and get the books audit-ready for the independent auditor the Companies Act 2017 requires, with the working papers behind every figure. When the question moves past compliance to whether a plan actually holds, the advisory work sits here too.',
    icon: 'calculator',
    badge: 'chrome',
    highlights: ['Accounting', 'Bookkeeping', 'Tax Filing', 'Audit', 'Advisory'],
  },
  {
    slug: 'corporate-legal',
    title: 'Corporate & Legal',
    shortTitle: 'Corporate',
    headline: { lines: ['Companies registered,'], accent: 'and kept compliant' },
    servicesHeadline: { lines: ['Everything the company'], accent: 'has to file and sign' },
    blurb:
      'Company registration and every filing, licence and agreement that follows: SECP returns, PSEB and chamber membership, import licences and drafted contracts.',
    intro:
      'Registering is the short half of the job. Staying compliant runs for the life of the company, and it is where most businesses fall behind. We incorporate with SECP, licence a not-for-profit under section 42, register you with PSEB and your chamber of commerce, get your import and export licence live on PSW, draft the agreements your business actually signs, and then hold the compliance calendar so a deadline is never a surprise.',
    icon: 'building',
    badge: 'chrome',
    highlights: ['Company Setup', 'SECP Compliance', 'PSEB', 'Contracts'],
  },
  {
    slug: 'intellectual-property',
    title: 'Intellectual Property',
    shortTitle: 'IP',
    headline: { lines: ['Trademarks, copyrights'], accent: 'and patents, registered' },
    servicesHeadline: { lines: ['Your name and your work,'], accent: 'registered to you' },
    blurb:
      'Trademarks, copyrights and patents filed with IPO Pakistan and prosecuted through to a certificate you can actually enforce.',
    intro:
      'An unregistered brand is one somebody else can register. We search the register before you commit to a name, file in the right Nice classes with the Intellectual Property Organization of Pakistan, answer the examiner, handle objections and oppositions, and take the application through publication to a granted certificate. The same team covers the copyright in what you create and the patent in what you invent.',
    icon: 'trademark',
    badge: 'chrome',
    highlights: ['Trademarks', 'Copyright', 'Patents'],
  },
  {
    slug: 'international-expansion',
    title: 'International Expansion',
    shortTitle: 'International',
    headline: { lines: ['Companies set up abroad,'], accent: 'and kept filing there' },
    servicesHeadline: { lines: ['Set up where'], accent: 'you want to trade' },
    blurb:
      'Companies set up and kept filing outside Pakistan: Saudi Arabia, the United Arab Emirates and the United Kingdom.',
    intro:
      'Opening in another country is two jobs, and most firms sell only the first. We register the entity, through MISA and the Saudi Business Center in Saudi Arabia, with the licensing authority and the Federal Tax Authority in the UAE, and with Companies House and HMRC in the UK. Then we run what follows: corporate tax, VAT, and books kept to the standard that jurisdiction expects to inspect.',
    icon: 'globe-arrows',
    badge: 'chrome',
    highlights: ['Saudi Arabia', 'UAE', 'United Kingdom'],
  },
];

export const PILLAR_BY_SLUG = Object.fromEntries(
  PILLARS.map((p) => [p.slug, p]),
) as Record<Pillar['slug'], Pillar>;
