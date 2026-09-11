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

    related: ['whatsapp-chatbot-real-cost-pakistan'],

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

  {
    slug: 'whatsapp-chatbot-real-cost-pakistan',
    cluster: 'ecommerce',
    title: 'What a WhatsApp Chatbot Actually Costs to Run in Pakistan',
    navLabel: 'WhatsApp chatbot costs',
    card: 'Meta charges per message now, the Pakistan rate is nearly double the US one, and replies to customers are free.',

    answer:
      'Meta charges per delivered template message, not per conversation, since 1 July 2025. For a Pakistani recipient that is $0.0473 for marketing, $0.0100 for utility and authentication, and nothing at all for replies inside the 24-hour customer service window. The old allowance of 1,000 free conversations a month no longer exists. A bot that answers inbound questions costs almost nothing to run; the bill comes entirely from outbound marketing.',

    sections: [
      {
        kind: 'prose',
        heading: 'Most published pricing for this is describing a dead model',
        body: [
          'Meta rebuilt WhatsApp Business pricing on 1 July 2025, moving from conversation-based billing to per-message billing. Its documentation now states it plainly: "Effective July 1, 2025, Meta charges on a per-message basis."',
          'Nearly everything written about WhatsApp chatbot costs describes the previous system, and the clearest tell is the 1,000 free conversations a month. That allowance belonged to the conversation model and does not exist any more. If an article or a vendor quotes it to you, they have not checked since 2025.',
          'The second tell is the Pakistan rate, which almost nobody quotes at all.',
        ],
      },
      {
        kind: 'note',
        tone: 'info',
        heading: 'What Meta actually charges for now',
        body:
          'Only delivered template messages. Meta states "you are only charged when a template message is delivered" and that "all non-template messages are free". The charge lands on delivery rather than on send. Templates come in three categories, marketing, utility and authentication, plus a separate and much more expensive authentication-international rate. Access to the Cloud API itself costs nothing.',
      },
      {
        kind: 'table',
        heading: 'Meta\'s rates for a Pakistani recipient',
        intro:
          'US dollars per delivered message, read from Meta\'s own rate card on 11 September 2026. Meta does not publish or bill Pakistan in rupees, so these are the figures and the currency it actually charges in.',
        columns: ['Category', 'Rate per message', 'What it is for'],
        rows: [
          ['Marketing', '$0.0473', 'Promotions, offers, re-engagement'],
          ['Utility', '$0.0100', 'Order updates, receipts, follow-ups to an action'],
          ['Authentication', '$0.0100', 'One-time passcodes and verification'],
          ['Authentication-international', '$0.0750', 'Verification to a number outside your own market'],
          ['Service replies', 'Free', 'Your replies inside the 24-hour window'],
        ],
      },
      {
        kind: 'prose',
        body: [
          'The marketing rate is the one worth pausing on. At $0.0473, sending a marketing template to a Pakistani number costs roughly 1.9 times what the same message costs to a US number, and about four times what it costs to an Indian one.',
          'So every article quoting the US rate understates the cost of Pakistani marketing by about half. Meta also records a rate increase for Pakistan effective 1 April 2026, so figures from before then are low as well as foreign.',
          'Volume tiers exist for utility and authentication, stepping down as you scale. Marketing has none.',
        ],
      },
      {
        kind: 'prose',
        heading: 'The part that makes a support bot nearly free',
        body: [
          'The 24-hour customer service window survived the pricing change, but its job changed. It no longer defines what you are billed for. It defines when you are allowed to send free-form messages.',
          'When a customer messages you, a 24-hour window opens. Inside it, your replies are not template messages, so they are free, however many you send. Meta also makes utility templates free inside an open window.',
          'That is the whole economics of a support chatbot. A bot that answers questions from customers who messaged first costs essentially nothing in Meta fees, no matter how much it talks. The cost arrives when you initiate.',
          'There is a second free route worth knowing: if a customer reaches you through a click-to-WhatsApp ad or a Facebook page button, a free entry point window opens for 72 hours, and inside it Meta states you can send any type of message at no charge, templates included.',
        ],
      },
      {
        kind: 'table',
        heading: 'What 10,000 marketing messages a month costs',
        intro:
          'To Pakistani numbers, at list rates. The provider column is where most published comparisons go wrong, because a provider\'s fee is separate from Meta\'s and takes different shapes.',
        columns: ['Route', 'Meta fees', 'Provider fees', 'Monthly total'],
        rows: [
          ['Direct with Meta', '$473', 'None', '$473'],
          ['Via Twilio', '$473', '$0.005 per message', '$523'],
          ['Via 360dialog', '$473', 'Flat monthly platform fee', 'About $526'],
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'Meta\'s charge and your provider\'s charge are different things',
        body:
          'This is the main error in published WhatsApp pricing content, and providers do not always make it easy. The fee takes at least three shapes: a flat per-message markup, a flat monthly platform fee regardless of volume, or a monthly fee plus marked-up per-message rates. The third is the one to watch, because the rate you are quoted is not Meta\'s rate. One provider we checked publishes Pakistan marketing at $0.0532 against Meta\'s $0.0473, with the markup varying by which plan you are on, which is how you can tell it is a markup rather than a pass-through. You can also onboard directly with Meta: a provider is optional, not mandatory.',
      },
      {
        kind: 'prose',
        heading: 'How to make this cheap',
        body: [
          'The arithmetic points somewhere specific, and it is not "send fewer messages".',
          'Get customers to message you first. Every reply inside that window is free, so a bot built around inbound support has a Meta bill close to zero. Put the WhatsApp link everywhere: the website, the invoice, the packaging, the email signature.',
          'Use click-to-WhatsApp ads where you would otherwise send a marketing template. You are paying Meta for the ad either way, and the resulting conversation is free for 72 hours rather than $0.0473 a message.',
          'Categorise templates honestly, and check how Meta categorised them. Utility is a fifth of the marketing rate, and an order update genuinely is a utility message. But categories are Meta\'s call, not yours, and a promotional message dressed as a receipt will be recategorised.',
          'Watch the authentication-international rate. At $0.0750 it is the most expensive thing on the card, and it is easy to trigger without meaning to if you are verifying users outside your own market.',
        ],
      },
      {
        kind: 'prose',
        heading: 'What this leaves out',
        body: [
          'The bot itself. Building something that answers your customers usefully, knows your catalogue and your policies, and hands over to a person when it should, is the actual project. These are the running costs of the channel, not the cost of the thing running on it.',
          'And if the bot is answering questions rather than following a script, there is a model bill underneath it too, which behaves quite differently and is worth understanding separately.',
        ],
      },
    ],

    faqs: [
      {
        question: 'Does WhatsApp still give 1,000 free conversations a month?',
        answer:
          'No. That allowance belonged to the conversation-based pricing Meta replaced on 1 July 2025. Under per-message pricing there is no free monthly tier. What is free instead is your replies inside the 24-hour customer service window, and those are unlimited.',
      },
      {
        question: 'What does one WhatsApp message cost in Pakistan?',
        answer:
          'From Meta, $0.0473 for a marketing template, $0.0100 for utility or authentication, and $0.0750 for authentication-international. Replies inside an open 24-hour window are free. Your provider may add a fee on top, which is separate from Meta\'s charge.',
      },
      {
        question: 'Is a WhatsApp chatbot expensive to run?',
        answer:
          'A support bot is very cheap, because answering someone who messaged you first is free under Meta\'s rules. A marketing bot is not, because every outbound template is charged and Pakistan has one of the higher marketing rates. The use case decides the bill far more than the volume does.',
      },
      {
        question: 'Do I need a provider like Twilio or can I go direct to Meta?',
        answer:
          'You can go direct. Meta states that access to the Cloud API is free and it hosts and maintains it. A provider buys you an easier setup, a dashboard and support, for either a per-message markup or a monthly fee. For a business with developers, direct is entirely workable.',
      },
      {
        question: 'Why is the Pakistan rate higher than the US rate?',
        answer:
          'Meta sets per-country rates and does not explain how it prices them. What matters practically is that Pakistan marketing at $0.0473 is roughly 1.9 times the US rate, so any budget built from a US figure is about half of what you will actually pay.',
      },
    ],

    publishedAt: '2026-10-08T03:00:00Z',

    sources: [
      {
        label: 'Meta, WhatsApp Business Platform pricing',
        url: 'https://developers.facebook.com/docs/whatsapp/pricing',
        readOn: '2026-09-11',
        supports: 'Per-message billing since 1 July 2025, the Pakistan rate card, the free customer service window and free entry points.',
      },
      {
        label: 'Meta, template category guidelines',
        url: 'https://developers.facebook.com/docs/whatsapp/updates-to-pricing/new-template-guidelines',
        readOn: '2026-09-11',
        supports: 'That every template is categorised as marketing, utility or authentication.',
      },
      {
        label: 'Twilio WhatsApp pricing',
        url: 'https://www.twilio.com/en-us/whatsapp/pricing',
        readOn: '2026-09-11',
        supports: 'Twilio\'s own per-message fee on top of Meta\'s rates.',
      },
    ],

    limits: [
      'Meta\'s rates are per country and change. These are Pakistan rates read on 11 September 2026, after an increase Meta records as effective 1 April 2026.',
      'Meta does not publish or bill Pakistan in rupees, so no rupee figure appears here. Converting introduces an exchange rate this post cannot stand behind.',
      'Provider pricing was checked for several providers and one could not be read at all, its rate card sitting behind a login. The comparison table names only those publishing their fees openly.',
      'These are channel costs. Building the chatbot, and any model costs behind it, are separate and usually larger.',
    ],

    cta: {
      heading: 'Thinking about a WhatsApp bot?',
      body: 'The first question worth answering is whether it is answering customers or contacting them, because that decides whether the running cost is near zero or the main line in the budget. We build both and will tell you which one you actually need.',
      buttonLabel: 'Talk about your bot',
      href: '/contact?service=chatbot-development',
    },

    related: ['shopify-payments-pakistan', 'what-an-ai-agent-costs-to-run'],

    seo: {
      title: 'What a WhatsApp Chatbot Costs to Run in Pakistan',
      description:
        'Meta charges per message now, not per conversation. Pakistan marketing is $0.0473, nearly double the US rate, and replies to customers are free.',
    },
  },
];
