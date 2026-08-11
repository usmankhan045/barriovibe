import type { Service } from '../types';

/**
 * Discipline 03: E-commerce & Marketplaces.
 *
 * Split out of Growth & Marketing because building and running a storefront is
 * an operations job, meaning catalogue, stock, orders and returns, rather than
 * a demand one.
 *
 * Copy here stays concrete about what the client ends up owning. The usual
 * fear with an agency-built store is being locked out of it afterwards, and
 * every page in this file answers that directly rather than by implication.
 */
export const ECOMMERCE_SERVICES: Service[] = [
  {
    slug: 'shopify-store-development',
    pillar: 'ecommerce',
    title: 'Shopify Store Development',
    navLabel: 'Shopify Development',
    oneLiner:
      'A Shopify store built, launched and maintained, with the theme, catalogue, payments and shipping configured around how you actually sell.',
    intro:
      'A store that looks finished and a store that sells are different builds. We do the second one: a theme built or customised around your catalogue, a checkout configured for the payment methods your customers will actually use, and product pages written to answer the objection before it costs you the sale. Page speed is treated as a conversion problem rather than a technical one, because a slow store loses buyers before it ever gets to persuade them.',
    icon: 'shopping-bag',
    included: [
      'Theme development or deep customisation, designed from the phone layout first',
      'Product catalogue setup with variants, collections and metafields',
      'Payment gateway integration for both local and international methods',
      'Shipping zones, rates and courier integration',
      'Product and cart pages built around reviews, trust signals and the questions buyers ask',
      'Speed optimisation, an app audit, and analytics and pixels configured and tested',
    ],
    audience: ['New D2C brands launching', 'Retailers moving online', 'Stores that load slowly'],
    steps: [
      {
        title: 'Plan',
        description:
          'Catalogue structure, customer journey and integrations mapped, so the build starts from a specification rather than a mood board.',
      },
      {
        title: 'Build',
        description:
          'Theme developed, products loaded, and payments, shipping and taxes configured on a password-protected store.',
      },
      {
        title: 'Test and launch',
        description:
          'The whole checkout tested on real devices, speed audited, tracking verified from ad click to order confirmation, then the store goes live.',
      },
      {
        title: 'Optimise',
        description:
          'Conversion rate, drop-off points and page speed watched after launch, with fixes ordered by what they are worth in revenue.',
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
    related: ['ecommerce-management', 'performance-marketing', 'sales-tax-registration-filing'],
    faqs: [
      {
        question: 'Do you use a paid theme or build custom?',
        answer:
          'Usually a well-chosen premium theme, customised. A theme built from scratch is a far larger job and rarely converts any better. We recommend a custom build only where your catalogue or your merchandising genuinely will not fit an existing theme, and we will tell you when it fits.',
      },
      {
        question: 'Which payment gateways work in Pakistan?',
        answer:
          'Shopify Payments is not available to Pakistani merchants, so the checkout is built on a local gateway instead. Safepay and PayFast are the two most commonly used with Shopify here, and Safepay covers JazzCash, Easypaisa, bank transfer and local card schemes through a single integration, which matters because Shopify does not support the wallets natively. Cash on delivery is still a large share of domestic orders and gets configured alongside, not instead. If you also sell abroad, that usually needs a separate international route, which we scope against where your orders actually come from.',
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
      'Once a store is live the job turns operational. Listings have to stay current, stock has to match across channels, orders ship, returns get processed, and somebody has to be watching the numbers while all of it happens. We run that operation across Shopify, Daraz and Amazon so your attention goes to product and supply instead.',
    icon: 'cart',
    included: [
      'Product listings created and optimised on every channel you sell through',
      'Inventory kept in sync across channels, with low-stock alerts',
      'Order processing, fulfilment coordination and courier management',
      'Returns, refunds and customer queries handled',
      'Marketplace account health watched against Daraz and Amazon seller metrics',
      'A weekly report on revenue, margin, best sellers and dead stock',
    ],
    audience: ['Multi-channel sellers', 'Brands without an ops team', 'Stores losing money to stockouts'],
    steps: [
      {
        title: 'Audit',
        description:
          'Listings, pricing, stock accuracy and account health reviewed, and the revenue leaks written down with a number against each one.',
      },
      {
        title: 'Clean-up',
        description:
          'Listings corrected and filled out, inventory reconciled against physical stock, and channel settings fixed.',
      },
      {
        title: 'Run',
        description:
          'Daily order processing, stock updates, customer replies and channel monitoring.',
      },
      {
        title: 'Report and improve',
        description:
          'The weekly numbers reviewed with you, then decisions taken on pricing, promotions, delisting or restocking.',
      },
    ],
    deliverables: [
      'Optimised listings across every active channel',
      'A reconciled, synchronised inventory position',
      'Weekly performance report: revenue, margin, movers, dead stock',
      'Documented fulfilment and returns process your team can follow',
    ],
    documents: [],
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
          'No. We run the digital side and coordinate with your warehouse or third-party logistics provider and the couriers. Physical storage and delivery stay with your existing partners, and we can help you choose one if you do not have any yet.',
      },
      {
        question: 'How is this different from Shopify development?',
        answer:
          'Development builds the store once. Management runs it every day after that. Most brands want the build and then the running of it, but plenty already have a store and only need the second half.',
      },
    ],
    seo: {
      title: 'E-commerce Management Services',
      description:
        'Daily management of online stores and marketplaces: listings, inventory sync, order processing, returns and weekly revenue reporting.',
    },
  },
];
