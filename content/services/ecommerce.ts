import type { Service } from '../types';

/**
 * Pillar 05 — E-commerce & Marketplaces.
 *
 * Split out of Growth & Marketing: building and running a storefront is an
 * operations discipline (catalogue, stock, orders, returns), not a demand one.
 * Copy here stays concrete about what the client ends up owning, because the
 * common fear with an agency-built store is being locked out of it later.
 */
export const ECOMMERCE_SERVICES: Service[] = [
  {
    slug: 'shopify-store-development',
    pillar: 'ecommerce',
    title: 'Shopify Store Development',
    navLabel: 'Shopify Development',
    oneLiner:
      'A fast, conversion-focused Shopify store built, launched and maintained, including the apps, payments and shipping setup.',
    intro:
      'We build Shopify stores that load quickly and convert, not just ones that look finished. That means a theme built or customised around your catalogue, a checkout configured for the payment methods your customers actually use, and product pages structured to answer objections before they cost you the sale.',
    icon: 'shopping-bag',
    included: [
      'Theme development or deep customisation, built mobile-first',
      'Product catalogue setup with variants, collections and metafields',
      'Payment gateway integration for local and international methods',
      'Shipping zones, rates and courier integration',
      'Conversion-focused product and cart pages with reviews and trust signals',
      'Speed optimisation, app audit, and analytics and pixel configuration',
    ],
    audience: ['New D2C brands launching', 'Retailers moving online', 'Stores that load slowly'],
    steps: [
      {
        title: 'Plan',
        description:
          'Catalogue structure, customer journey and required integrations mapped, so the build has a spec rather than a mood board.',
        duration: '3–5 days',
      },
      {
        title: 'Build',
        description:
          'Theme developed, products loaded, and payments, shipping and taxes configured on a password-protected store.',
        duration: '2–4 weeks',
      },
      {
        title: 'Test & launch',
        description:
          'Full checkout tested on real devices, speed audited, tracking verified end to end, then the store goes live.',
        duration: '3–5 days',
      },
      {
        title: 'Optimise',
        description:
          'Post-launch monitoring of conversion rate, drop-off points and page speed, with fixes prioritised by revenue impact.',
        duration: 'Ongoing',
      },
    ],
    deliverables: [
      'A live Shopify store you own outright',
      'Configured payments, shipping and tax rules',
      'Analytics, Meta pixel and Google tags verified with test events',
      'A written admin handover guide for your team',
      'A 30-day post-launch support window',
    ],
    documents: [],
    turnaround: '3–6 weeks from brief to launch',
    related: ['ecommerce-management', 'performance-marketing', 'sales-tax-registration-filing'],
    faqs: [
      {
        question: 'Do you use a paid theme or build custom?',
        answer:
          'Usually a well-chosen premium theme, customised. A fully custom theme is a much larger build and rarely converts better. We recommend custom only when your catalogue or merchandising genuinely does not fit any existing theme, and we will tell you honestly when it does fit.',
      },
      {
        question: 'Which payment gateways work in Pakistan?',
        answer:
          'Shopify Payments is not available in Pakistan. Local options include PayFast, Safepay and bank-integrated gateways; cash on delivery remains significant for the domestic market. For international sales, 2Checkout and Paddle are the usual routes. We configure what fits where you actually sell.',
      },
      {
        question: 'Who owns the store afterwards?',
        answer:
          'You do, completely. The Shopify account is in your name from day one and we work as a staff user on it. If you stop working with us, you change one password and nothing about your store is affected.',
      },
    ],
    seo: {
      title: 'Shopify Store Development & Setup',
      description:
        'Conversion-focused Shopify stores: theme build, catalogue setup, payment and shipping configuration, speed optimisation and analytics.',
    },
  },

  {
    slug: 'ecommerce-management',
    pillar: 'ecommerce',
    title: 'E-commerce Management',
    navLabel: 'E-commerce Management',
    oneLiner:
      'Day-to-day running of your online store and marketplace channels: listings, inventory, orders, returns and reporting.',
    intro:
      'Once a store is live, the work becomes operational: listings kept current, stock synchronised across channels, orders shipped, returns processed, and someone actually watching the numbers. We run that operation across Shopify, Daraz, Amazon and marketplace channels so you can focus on product and supply.',
    icon: 'cart',
    included: [
      'Product listing creation and optimisation across every sales channel',
      'Inventory synchronisation and low-stock alerting',
      'Order processing, fulfilment coordination and courier management',
      'Returns, refunds and customer query handling',
      'Marketplace account health monitoring across Daraz and Amazon metrics',
      'Weekly reporting on revenue, margin, best sellers and dead stock',
    ],
    audience: ['Multi-channel sellers', 'Brands without an ops team', 'Stores losing money to stockouts'],
    steps: [
      {
        title: 'Audit',
        description:
          'Current listings, pricing, stock accuracy and account health reviewed, with the revenue leaks identified and quantified.',
        duration: '3–5 days',
      },
      {
        title: 'Clean-up',
        description:
          'Listings corrected and enriched, inventory reconciled to physical stock, and channel settings fixed.',
        duration: '1–2 weeks',
      },
      {
        title: 'Run',
        description:
          'Daily order processing, stock updates, customer responses and channel monitoring.',
        duration: 'Daily',
      },
      {
        title: 'Report & improve',
        description:
          'Weekly numbers reviewed with you, and next actions agreed on pricing, promotions, delisting or restocking.',
        duration: 'Weekly',
      },
    ],
    deliverables: [
      'Optimised listings across every active channel',
      'A reconciled, synchronised inventory position',
      'Weekly performance report: revenue, margin, movers, dead stock',
      'Documented fulfilment and returns process your team can follow',
    ],
    documents: [],
    turnaround: 'Ongoing, with daily order handling',
    related: ['shopify-store-development', 'performance-marketing', 'bookkeeping'],
    faqs: [
      {
        question: 'Which platforms do you manage?',
        answer:
          'Shopify, WooCommerce, Daraz and Amazon most often, plus Instagram and Facebook Shops. If you sell somewhere else, tell us. If we have not run it before we will say so rather than learn on your account.',
      },
      {
        question: 'Do you handle warehousing and shipping physically?',
        answer:
          'No. We manage the digital operation and coordinate with your warehouse or 3PL and couriers. Physical storage and delivery stay with your existing partners, or we can help you select one.',
      },
      {
        question: 'How is this different from Shopify development?',
        answer:
          'Development builds the store once. Management runs it every day afterwards. Most brands need the build first and then ongoing management, but plenty of businesses already have a store and only need the second.',
      },
    ],
    seo: {
      title: 'E-commerce Management Services',
      description:
        'Daily management of online stores and marketplaces: listings, inventory sync, order processing, returns and weekly revenue reporting.',
    },
  },
];
