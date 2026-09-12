import type { Post } from './types';

/**
 * Cluster 10 in research/POSTS.md: automation platforms.
 *
 * The research note that produced this cluster is worth repeating, because it
 * is the whole editorial brief: the comparison SERP is saturated but shallow,
 * every post recycles the same three facts (Zapier's app count, Make's app
 * count, n8n's self-hosting), and nobody prices at real volume.
 *
 * So these do not compare features. They compare bills.
 */
export const AUTOMATION_POSTS: Post[] = [
  {
    slug: 'n8n-zapier-make-real-cost',
    cluster: 'automation',
    title: 'n8n vs Zapier vs Make, Priced at Real Volume',
    navLabel: 'Priced at real volume',
    card: 'The same workflow, ten thousand runs a month, costed on all three platforms from their own pricing pages.',

    answer:
      'For a five-step workflow run 10,000 times a month, the published list prices on 11 September 2026 are 50 dollars on n8n, 55 dollars on Make and 289 dollars on Zapier, all at annual billing. Zapier is 5.8 times n8n for identical work. Almost none of that gap is features. It is that the three platforms count different things: n8n charges per workflow run, Zapier and Make charge per step inside it.',

    sections: [
      {
        kind: 'prose',
        heading: 'The thing that actually decides your bill',
        body: [
          'Every comparison of these platforms opens with app counts and ends in "it depends on your needs". That is not useless, but it buries the one difference that changes the invoice by a multiple rather than a percentage, and it is a difference you commit to on day one and discover in month six.',
          'The three platforms bill on three different units. n8n counts a workflow execution: one run of the whole workflow, whatever is inside it. Zapier counts a task: one for each step that does something. Make counts a credit, which it used to call an operation: roughly one per module run.',
          'For a one-step workflow the three units mean the same thing. For a five-step workflow, one run is one n8n execution and five Zapier tasks. Your workflow does not get more expensive on n8n as it gets more complicated. On the other two, it does.',
        ],
      },
      {
        kind: 'table',
        heading: 'What each platform is counting',
        intro:
          'The vendors state these plainly, which is worth noting: none of this is hidden. It is simply never the thing a comparison post leads with.',
        columns: ['Platform', 'Unit', 'What one unit is'],
        rows: [
          ['n8n', 'Execution', 'One run of an entire workflow, regardless of how many steps it has'],
          ['Zapier', 'Task', 'One step that successfully does something. Triggers and polling are free'],
          ['Make', 'Credit', 'Roughly one module run. Routers and error handlers are free'],
        ],
      },
      {
        kind: 'note',
        tone: 'info',
        heading: 'Make renamed this recently, and most published comparisons have not caught up',
        body:
          'Make now bills in credits. Its help centre states that "credits replaced operations as the term for make\'s billing unit", with plan and pricing unchanged and one operation equal to one credit for non-AI apps. Any comparison still calling Make\'s unit an operation was written before the change or copied from something that was, which is a quick way to date the page you are reading. We got this wrong ourselves while researching this post and were corrected by the vendor documentation.',
      },
      {
        kind: 'prose',
        heading: 'The same job, costed three ways',
        body: [
          'Take a workflow with five acting steps. A webhook arrives, you look the record up, you branch on a condition, you write to a database, you post a notification. Run it 10,000 times a month, which is roughly one every four minutes during business hours.',
          'That is 10,000 executions on n8n, and 50,000 tasks on Zapier, and 50,000 credits on Make, for exactly the same work.',
        ],
      },
      {
        kind: 'table',
        heading: 'The bill, at list price',
        intro:
          'Monthly cost in US dollars at annual billing, read from each vendor\'s pricing page on 11 September 2026. The plan named is the cheapest one whose quota covers the volume.',
        columns: ['Platform', 'Units consumed', 'Plan needed', 'Per month'],
        rows: [
          ['n8n', '10,000 executions', 'Pro, 10,000 quota', '$50'],
          ['Make', '50,000 credits', 'Core, 80,000 tier', '$55'],
          ['Zapier', '50,000 tasks', 'Professional, 50,000 tier', '$289'],
        ],
      },
      {
        kind: 'prose',
        body: [
          'Zapier is 5.8 times n8n and 5.3 times Make Core for the same workload. The gap is not a premium for quality, and it is not really a pricing decision either. It is arithmetic: Zapier multiplies by your step count and n8n does not.',
          'Notice also that n8n and Make Core are within ten percent of each other here. The headline prices of these platforms are not far apart. The unit is what separates them.',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'Make has no 50,000 tier, and this costs you money',
        body:
          'Make\'s ladder runs 10,000, 20,000, 40,000, then 80,000 credits. A workload needing 50,000 buys the 80,000 tier at $55, so you pay for 30,000 credits you will not use. Check the ladder before you size a workflow: landing just above a tier boundary is the difference between $29 and $55, and shaving one module off a busy workflow can move you back down a rung.',
      },
      {
        kind: 'prose',
        heading: 'Where this arithmetic stops being true',
        body: [
          'The five-steps-equals-five-units assumption holds for a workflow whose steps each handle one item per run. It breaks in a specific and common case: Make counts operations by bundles processed, so a module that receives twenty items can generate twenty operations rather than one. Iterators and aggregators are where this bites. If your workflow fans out over a list, count the fan-out, not the modules on the canvas.',
          'The same caution applies less severely to Zapier, where a step acting on multiple items can consume multiple tasks. n8n is the one platform where the canvas is a reliable guide to the bill, which is the practical form of its billing advantage.',
          'And none of this prices the work of building and maintaining the thing, which for most businesses is the larger number. It prices the platform only.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Monthly billing is worse than the sticker, on every platform',
        body: [
          'The prices above are annual-billing rates, which is how all three vendors display by default. Paying monthly costs more: n8n Pro is $60 rather than $50, and Zapier at 50,000 tasks is $433.50 rather than $289.',
          'n8n advertises "Save 17%" for annual and the real figure is 16.7% at every tier, which is the kind of consistency that suggests the published numbers are what they claim to be. Zapier advertises 33%.',
          'If you are piloting something for two months, the monthly rate is the honest comparison and the gap between platforms widens, not narrows.',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'These pages are geo-priced, so check yours',
        body:
          'n8n\'s pricing page served us 20€/50€/667€ on one request and $20/$50/$800 on another, for the same three plans. Starter and Pro carry the same number in both currencies; Business does not, at 667€ against $800. Zapier\'s page carries a currency selector defaulting to USD. Read your own prices in your own currency before committing, and treat any comparison post that does not name a currency, this one included if we ever drop it, as incomplete.',
      },
      {
        kind: 'prose',
        heading: 'So which one should you actually use',
        body: [
          'If your workflows are multi-step and run at volume, n8n\'s unit is structurally cheaper and the gap grows with every step you add. That is the honest headline, and we say it while selling n8n work, so weigh it accordingly.',
          'Zapier earns its price in a specific case: breadth of integrations and a build experience non-technical staff can use without help. If the alternative to Zapier is a workflow nobody in the business can maintain, $289 is cheap. We have told clients to stay on Zapier for exactly this reason.',
          'Make sits between the two on price and ahead of both on visual clarity for branching logic. Its ladder is the thing to watch.',
          'The decision that is almost always wrong is choosing on the free tier and discovering the unit at volume. Price your real workflow at your real volume before you build it, using the numbers above and your own step count.',
        ],
      },
      {
        kind: 'prose',
        heading: 'A note on self-hosting n8n',
        body: [
          'n8n Community Edition is free to run yourself, and it is the reason the platform has the reputation it does. It is not open source in the OSI sense, and n8n does not claim it is: the README calls it "fair-code" and "Source Available", distributed under the Sustainable Use License.',
          'That licence permits use "only for your own internal business purposes or for non-commercial or personal use", and permits distribution to others "only if you do so free of charge for non-commercial purposes". For an agency running n8n on a client\'s behalf, that sentence deserves a read rather than an assumption.',
          'n8n publishes no execution limit for self-hosted Community, listing only absent features such as SSO and environments. That is not the same as the vendor saying it is unlimited, and we are not going to say it for them.',
        ],
      },
    ],

    faqs: [
      {
        question: 'Is n8n always cheaper than Zapier?',
        answer:
          'No. Below the paid threshold Zapier\'s free tier covers 100 tasks a month and n8n\'s cheapest paid plan is $20. The advantage appears once workflows are multi-step and running at volume, because that is when the per-step unit multiplies and the per-execution unit does not. At one step per run the two units are equivalent.',
      },
      {
        question: 'How many tasks does one Zap use?',
        answer:
          'One per step that successfully completes an action. Zapier states that "a task is counted whenever Zapier successfully completes a unit of work for you. Failed actions are not counted." Triggers, polling and its built-in data tools do not consume tasks, so a five-step Zap with one trigger and four actions is four or five tasks per run depending on how you count the final step.',
      },
      {
        question: 'Did Make get rid of operations?',
        answer:
          'It renamed them. Make\'s help centre states that credits replaced operations as the billing unit, with existing plans and pricing unchanged, and that one operation equals one credit for non-AI apps. AI provider features can consume more than one credit per operation.',
      },
      {
        question: 'Is self-hosted n8n free?',
        answer:
          'The software is free to download and run under the Sustainable Use License, and n8n publishes no execution cap for it. You still pay for the server, the monitoring, the backups and the person who restarts it, which is the cost comparisons leave out. It is free in the sense that PostgreSQL is free.',
      },
      {
        question: 'Why is my Make bill higher than my module count suggests?',
        answer:
          'Most likely because a module is processing multiple bundles. Make counts operations by bundles handled rather than by modules on the canvas, so an iterator over twenty records generates twenty operations at that step. Check any workflow that fans out over a list.',
      },
    ],

    publishedAt: '2026-09-11T03:00:00Z',
    reviewedOn: '2026-09-11',

    sources: [
      {
        label: 'n8n pricing',
        url: 'https://n8n.io/pricing/',
        readOn: '2026-09-11',
        supports: 'Plan prices, execution quotas, and the definition of an execution.',
      },
      {
        label: 'Zapier pricing',
        url: 'https://zapier.com/pricing',
        readOn: '2026-09-11',
        supports: 'Task tiers, Professional and Team prices, and the definition of a task.',
      },
      {
        label: 'Make pricing',
        url: 'https://www.make.com/en/pricing',
        readOn: '2026-09-11',
        supports: 'The credit tier ladder and the Core, Pro and Teams prices at each tier.',
      },
      {
        label: 'Make help centre, on credits and operations',
        url: 'https://help.make.com/credits',
        readOn: '2026-09-11',
        supports: 'The rename from operations to credits, and how operations are counted per bundle.',
      },
      {
        label: 'n8n Sustainable Use License',
        url: 'https://github.com/n8n-io/n8n/blob/master/LICENSE.md',
        readOn: '2026-09-11',
        supports: 'The licence terms quoted in the self-hosting section.',
      },
    ],

    limits: [
      'These are list prices. Negotiated and enterprise pricing is not public and is not reflected here.',
      'The arithmetic assumes each step processes one item per run. Workflows that fan out over lists cost more on Make and Zapier than the step count suggests, and the post says where.',
      'Platform cost only. Building, maintaining and fixing the workflow is usually the larger number and is not priced here.',
      'We build automation for a living, including on n8n. The figures come from the vendors and you can check every one, which is the appropriate response to that conflict.',
    ],

    cta: {
      heading: 'Want this costed against your actual workflows?',
      body: 'Send us the workflow you are running or planning and the volume you expect. We will price it on all three platforms with the same arithmetic used above, and tell you if the one you are on is already the right answer.',
      buttonLabel: 'Get it costed',
      href: '/contact?service=workflow-automation',
    },

    related: ['what-an-ai-agent-costs-to-run'],

    seo: {
      title: 'n8n vs Zapier vs Make: Real Cost at 10,000 Runs',
      description:
        'The same five-step workflow run 10,000 times a month costs $50 on n8n, $55 on Make and $289 on Zapier. The arithmetic, and the billing units behind it.',
    },
  },
];
