import type { Post } from './types';

/**
 * Cluster 12 in research/POSTS.md: Shopify and e-commerce.
 *
 * DEMAND.md records the sharpest gap found in any cluster here: unresolved
 * Shopify Community threads currently rank page one for Pakistani payment
 * queries. A forum question with no accepted answer ranking first means no page
 * is satisfying the query at all.
 *
 * The answer turned out to be a sourced negative, which is why nobody has
 * written it: Shopify Payments does not operate in Pakistan, and everything
 * merchants run into follows from that one fact.
 */
export const ECOMMERCE_POSTS: Post[] = [
  {
    slug: 'shopify-payments-pakistan',
    cluster: 'ecommerce',
    title: 'Accepting Payments on Shopify in Pakistan',
    navLabel: 'Shopify payments in Pakistan',
    card: 'Shopify Payments does not operate in Pakistan. What that actually means for your store, and what the workarounds cost.',

    answer:
      'Shopify Payments is unavailable to Pakistani merchants: Shopify lists 39 supported countries and Pakistan is not one of them. That single fact causes everything else. You must use a third-party gateway, Shopify charges a third-party transaction fee it waives only for stores running Shopify Payments, and Shopify\'s own gateway directory for Pakistan lists no Pakistani provider. Cash on delivery and manual bank transfer remain available and carry no Shopify transaction fee.',

    sections: [
      {
        kind: 'prose',
        heading: 'Why nobody has answered this properly',
        body: [
          'Search for how to take payments on Shopify in Pakistan and the top results include Shopify Community threads where a merchant asked exactly this and nobody answered. When an unresolved forum question outranks every published article, it is a reliable sign that the real answer is inconvenient.',
          'It is. The answer is mostly a "no", and a "no" is difficult to build a page around if you are selling a course or an agency service. So here it is plainly, sourced to Shopify\'s own documentation.',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'The fact everything else follows from',
        body:
          'Shopify\'s "Supported countries for Shopify Payments" page lists every country where the product operates. There are 39 of them. Pakistan is not among them, and neither is India or Bangladesh. The page states: "If your country isn\'t listed, or if Shopify Payments doesn\'t support your business category, then you need to use a third-party payment provider." This is not a gap in your setup or a verification you have failed. The product does not operate here.',
      },
      {
        kind: 'prose',
        heading: 'What this costs you, specifically',
        body: [
          'Shopify charges a third-party transaction fee on every order processed through a gateway other than Shopify Payments. Its documentation states these fees "apply on all third-party and alternate payment gateways", and that if you have Shopify Payments activated, PayPal and manual payments are excluded from them.',
          'Read that exclusion carefully, because it is the whole problem. The waiver is conditional on having Shopify Payments active. A Pakistani merchant cannot activate Shopify Payments, so the exclusion is permanently out of reach. The fee is not a choice you are making badly; it is structural.',
          'The rate itself depends on your Shopify plan, and Shopify does not publish it on either its global or its Pakistan pricing page, saying only that it varies. We are not going to quote a percentage we cannot source. Check it against your own plan in your admin before you model your margins, and treat any article that states a single confident number without a source with suspicion.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Which gateways can you actually use',
        body: [
          'Here the evidence gets thinner and we will be honest about the limits of it. Shopify serves a payment-gateway directory on its Pakistan locale. Searching that directory for PayFast, JazzCash, Easypaisa, Keenu, PayPro and Bank Alfalah returns no matches for any of them.',
          'A caution on how to read that, because we nearly got it wrong ourselves: searching that page for "Safepay" appears to return eight results. Every one is MultiSafepay, a Dutch provider with no connection to the Pakistani company of a similar name. A keyword match is not a listing.',
          'What that evidence supports is a narrow claim: Shopify does not list a Pakistani gateway in its own directory. It does not support the stronger claim that no integration exists. A provider can be connected through a custom app or a payments partnership without appearing there, and providers do launch. Ask a gateway directly whether they have a current Shopify integration, and ask for a live merchant store using it rather than a marketing page.',
        ],
      },
      {
        kind: 'list',
        heading: 'What reliably works today',
        intro:
          'These are the routes that do not depend on a gateway integration existing.',
        items: [
          'Cash on delivery, set up as a manual payment method. It carries no Shopify transaction fee, and it remains how a large share of Pakistani e-commerce is actually paid for.',
          'Bank deposit or transfer, also a manual method, with the order confirmed once payment lands. Free of Shopify fees, and manual to reconcile.',
          'A third-party gateway that does have a working integration, accepting that the third-party transaction fee applies on top of the gateway\'s own cut.',
          'Selling internationally through a merchant of record, which changes who is selling and so sidesteps the gateway question entirely. It also changes your tax position, so take advice before choosing it.',
        ],
      },
      {
        kind: 'note',
        tone: 'info',
        heading: 'Manual methods are underrated here',
        body:
          'Cash on delivery is usually presented as a limitation of Pakistani e-commerce. On Shopify specifically it has one genuine advantage: as a manual payment method it attracts no Shopify transaction fee at all, while every card order through a third-party gateway does. The trade is real, because COD brings return-to-origin costs that a prepaid order does not, but the fee arithmetic runs the opposite way to how it is usually described.',
      },
      {
        kind: 'prose',
        heading: 'If you are selling to customers abroad',
        body: [
          'This is the case where the constraint loosens, and it is worth separating from domestic selling because the answer is different.',
          'Receiving money from foreign customers is a different problem from accepting a domestic card payment, and it interacts with Pakistani exchange control rather than with Shopify. Export proceeds have rules about how they come home, and the right structure depends on whether you are registered, what you are selling and how you are paid.',
          'We have written about the tax and State Bank side of getting paid from abroad in the guides, which is where that belongs. The Shopify-specific point is narrow: the platform will happily sell to anyone; the constraint sits at the payment layer and at the banking layer, not in your store settings.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Is Shopify the wrong platform for Pakistan',
        body: [
          'Not necessarily, and the honest answer depends on something other than payments.',
          'The case against is real: you pay a subscription in dollars, you pay a third-party transaction fee you can never have waived, and you pay a gateway on top. WooCommerce removes the first two of those, at the cost of running and securing the thing yourself.',
          'The case for is that Shopify\'s checkout, hosting and operational reliability are genuinely better than what most small teams build or maintain, and a checkout that converts is worth more than a fee that is saved. If you are doing meaningful volume and have nobody to run a server, the fees can be the cheaper option.',
          'What you should not do is choose it without knowing that Shopify Payments is unavailable, and then discover the fee stack after launch. That is the outcome this post exists to prevent.',
        ],
      },
    ],

    faqs: [
      {
        question: 'Is Shopify Payments available in Pakistan?',
        answer:
          'No. Shopify\'s supported-countries page lists 39 countries where Shopify Payments operates and Pakistan is not among them. Merchants in Pakistan must use a third-party payment provider, which is what Shopify\'s own documentation directs unsupported countries to do.',
      },
      {
        question: 'Will Shopify waive the third-party transaction fee for Pakistani stores?',
        answer:
          'Not through the ordinary route. Shopify excludes PayPal and manual payments from third-party fees only for stores that have Shopify Payments activated, and Pakistani stores cannot activate it. Shopify Plus stores may have fees waived depending on location, which is worth asking about if you are at that scale.',
      },
      {
        question: 'Can I use Easypaisa or JazzCash on Shopify?',
        answer:
          'Neither appears in Shopify\'s payment-gateway directory served on its Pakistan locale, and App Store searches for them return unrelated apps. That means Shopify does not list them, not that no integration can exist. Ask the provider directly for a current Shopify integration and a live store using it.',
      },
      {
        question: 'Does cash on delivery cost anything on Shopify?',
        answer:
          'No Shopify transaction fee, because it is a manual payment method rather than a gateway. Your real costs are operational: return to origin on refused deliveries, cash handling, and the working capital tied up between dispatch and collection.',
      },
      {
        question: 'Is WooCommerce better for Pakistan?',
        answer:
          'It removes the Shopify subscription and the third-party transaction fee, and it leaves you responsible for hosting, security, updates and checkout performance. It is cheaper in fees and more expensive in attention. Which is better depends on whether you have someone to look after it.',
      },
    ],

    publishedAt: '2026-09-12T03:00:00Z',

    sources: [
      {
        label: 'Shopify: supported countries for Shopify Payments',
        url: 'https://help.shopify.com/en/manual/payments/shopify-payments/supported-countries',
        readOn: '2026-09-11',
        supports: 'The 39-country list, and the absence of Pakistan from it.',
      },
      {
        label: 'Shopify: third-party payment providers',
        url: 'https://help.shopify.com/en/manual/payments/third-party-providers/third-party-payment-providers',
        readOn: '2026-09-11',
        supports: 'That third-party transaction fees apply, and the conditional PayPal and manual payment exclusion.',
      },
      {
        label: 'Shopify pricing FAQ',
        url: 'https://www.shopify.com/pricing',
        readOn: '2026-09-11',
        supports: 'That the third-party fee rate varies by plan and is not published globally.',
      },
      {
        label: 'Shopify payment gateway directory, Pakistan locale',
        url: 'https://www.shopify.com/pk/payment-gateways',
        readOn: '2026-09-11',
        supports: 'That no Pakistani payment provider is listed in Shopify\'s own directory.',
      },
    ],

    limits: [
      'The third-party transaction fee percentage is not published by Shopify for Pakistan, so this post does not state one. Check your own plan in your admin.',
      'The gateway finding is "not listed in Shopify\'s directory", which is weaker than "does not exist". Integrations can exist outside that directory and providers do launch.',
      'Country availability changes. Everything here was read on 11 September 2026 and the supported-countries page is the thing to re-check.',
      'The cross-border section is deliberately brief: the tax and State Bank rules are covered in the guides, where they can be maintained against the statute.',
    ],

    cta: {
      heading: 'Building or fixing a Pakistani store?',
      body: 'We build Shopify and WooCommerce stores from Pakistan and deal with this payment stack routinely. If you are choosing a platform, or already launched and found the fees, that is a short conversation worth having before the next build.',
      buttonLabel: 'Talk about your store',
      href: '/contact?service=shopify',
    },

    seo: {
      title: 'Shopify Payments in Pakistan: What Actually Works',
      description:
        'Shopify Payments does not operate in Pakistan, so its third-party transaction fee cannot be waived. What that costs and which gateways Shopify actually lists.',
    },
  },
];
