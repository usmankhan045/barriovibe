import type { Service } from '../types';

/**
 * Pillar 01 — Software & AI.
 *
 * The six offerings the client originally listed on a single line. They are
 * split into six pages because each has a different buyer and a different
 * search term — and because bundling them would hide five of them.
 */
export const SOFTWARE_SERVICES: Service[] = [
  {
    slug: 'web-development',
    pillar: 'software-ai',
    title: 'Full-Stack Web Development',
    navLabel: 'Full-Stack Web Dev',
    oneLiner:
      'Marketing sites and full-stack web applications, frontend and backend, built to load fast, rank well, and hand over with the source code.',
    intro:
      'We build websites the way this one was built: statically rendered where possible, no unnecessary JavaScript, accessible by default, and measured against real performance budgets rather than a vague promise of speed. Marketing sites, web applications with a database and an API behind them, and internal tools, engineered end to end by one team rather than handed between a frontend shop and a backend contractor.',
    icon: 'code',
    included: [
      'UI design and responsive build from mobile up',
      'Next.js or equivalent modern stack, statically rendered where possible',
      'Backend, database and API where the product needs one, not just a static page',
      'CMS integration so your team edits content without a developer',
      'Technical SEO: metadata, structured data, sitemaps, semantic markup',
      'Core Web Vitals optimisation against a written performance budget',
      'Deployment, domain and SSL setup, plus analytics configuration',
    ],
    audience: ['Businesses replacing a slow site', 'Startups launching a product', 'Companies needing a web app'],
    steps: [
      {
        title: 'Scope',
        description:
          'Pages, features, integrations and content requirements agreed in writing, with a fixed scope and a fixed date attached.',
        duration: '3–7 days',
      },
      {
        title: 'Design',
        description:
          'Layouts designed and approved before any code is written, so changes happen in the cheap phase.',
        duration: '1–2 weeks',
      },
      {
        title: 'Build',
        description:
          'Development against the approved design, with a staging URL you can review at any point rather than a reveal at the end.',
        duration: '2–6 weeks',
      },
      {
        title: 'Launch',
        description:
          'Performance and accessibility audited, content migrated, DNS cut over, and the repository handed to you.',
        duration: '3–5 days',
      },
    ],
    deliverables: [
      'A live website on your own domain and hosting',
      'Full source code in a repository you own',
      'A CMS your team can operate, with a written guide',
      'Lighthouse and Core Web Vitals report against the agreed budget',
      'A 30-day post-launch fix window',
    ],
    documents: [],
    turnaround: '4–10 weeks depending on scope',
    related: ['app-development', 'workflow-automation', 'shopify-store-development'],
    faqs: [
      {
        question: 'Do I own the code?',
        answer:
          'Entirely. The repository is transferred to your account at handover, along with all hosting and domain credentials. There is no licence, no retainer requirement, and nothing that stops another developer picking it up.',
      },
      {
        question: 'WordPress or a custom build?',
        answer:
          'WordPress is the right answer when you need a large content operation with many editors and off-the-shelf plugins. A modern static build is the right answer when speed, security and Core Web Vitals matter more. We recommend based on your case and explain the trade-off rather than defaulting to whichever we prefer.',
      },
      {
        question: 'What happens after launch?',
        answer:
          'Thirty days of fixes for anything that does not work as specified, included. After that you can take it in-house, use another developer, or put us on a maintenance retainer. There is no lock-in either way.',
      },
    ],
    seo: {
      title: 'Full-Stack Web Development Services',
      description:
        'Custom website and full-stack web application development with static rendering, technical SEO, Core Web Vitals optimisation and full code handover.',
    },
  },

  {
    slug: 'app-development',
    pillar: 'software-ai',
    title: 'App Development',
    navLabel: 'App Development',
    oneLiner:
      'iOS and Android apps engineered from a single codebase, taken through store review, and shipped with the backend they run on.',
    intro:
      'We build cross-platform mobile apps with React Native or Flutter: one codebase, both stores, roughly half the cost of building twice. Design, backend, API, store submission and post-launch updates, with the store review handled end to end rather than handed back to you.',
    icon: 'phone',
    included: [
      'Cross-platform build for iOS and Android from a single codebase',
      'UI/UX design following each platform’s human interface guidelines',
      'Backend API, database and authentication',
      'Push notifications, deep linking and in-app analytics',
      'App Store and Play Store submission, including review responses',
      'Crash reporting, monitoring and post-launch update releases',
    ],
    audience: ['Startups shipping an MVP', 'Businesses digitising a service', 'Brands needing a customer app'],
    steps: [
      {
        title: 'Define',
        description:
          'Feature set, user flows and platform requirements documented, with anything out of scope named explicitly so version one actually ships.',
        duration: '1–2 weeks',
      },
      {
        title: 'Design',
        description:
          'Screen designs and an interactive prototype you can tap through and approve before development starts.',
        duration: '2–3 weeks',
      },
      {
        title: 'Build',
        description:
          'Development in two-week sprints with a testable build at the end of each, distributed to you via TestFlight and Play internal testing.',
        duration: '6–14 weeks',
      },
      {
        title: 'Ship',
        description:
          'Store listings prepared, submissions made, review feedback handled, and the app published.',
        duration: '1–3 weeks',
      },
    ],
    deliverables: [
      'Published iOS and Android apps under your developer accounts',
      'Full source code and backend repository',
      'Design files and an interactive prototype',
      'API documentation',
      'Crash reporting and analytics dashboards',
    ],
    documents: [],
    turnaround: '3–6 months for a first version',
    related: ['web-development', 'agentic-ai-development', 'performance-marketing'],
    faqs: [
      {
        question: 'React Native or Flutter?',
        answer:
          'React Native when the app shares logic with a web product or your team already knows JavaScript. Flutter when the interface is highly custom and animation-heavy. Both produce genuinely native performance for the overwhelming majority of apps, and this is rarely the decision that determines success.',
      },
      {
        question: 'Do I need my own developer accounts?',
        answer:
          'Yes, and you should insist on it. Apple charges an annual developer fee and Google a one-time fee. The accounts must be in your business name so you own the listings, the reviews and the users. We publish into your accounts as a delegated member.',
      },
      {
        question: 'What if Apple rejects the app?',
        answer:
          'Common, and usually procedural: missing privacy disclosures, incomplete metadata, or a guideline interpretation. We handle the review correspondence and resubmission as part of the project. Rejections cost days, not weeks, when someone who has seen them before is answering.',
      },
    ],
    seo: {
      title: 'Cross-Platform Mobile App Development: iOS & Android',
      description:
        'Cross-platform mobile app development with React Native or Flutter, including backend, store submission and post-launch support.',
    },
  },

  {
    slug: 'agentic-ai-development',
    pillar: 'software-ai',
    title: 'Agentic AI Development',
    navLabel: 'Agentic AI',
    oneLiner:
      'AI agents that plan, act and complete real multi-step work across your tools and data, with guardrails and a human check where it matters.',
    intro:
      'An agent is different from a chatbot: it takes an objective, plans, calls your systems, and completes a task. We build agents that do genuine work such as triaging tickets, reconciling records, researching and drafting, scoped to a specific job, with evaluation and human approval engineered in rather than bolted on.',
    icon: 'sparkles',
    included: [
      'Use-case scoping with an honest assessment of what an agent can and cannot reliably do',
      'Agent architecture: tool design, memory, planning and retry behaviour',
      'Integration with your existing systems, APIs and data sources',
      'Retrieval over your own documents and knowledge base',
      'Guardrails, human-in-the-loop approval, and audit logging of every action',
      'An evaluation suite measuring accuracy before and after every change',
    ],
    audience: ['Teams drowning in repetitive work', 'Companies with unstructured data', 'Businesses piloting AI properly'],
    steps: [
      {
        title: 'Feasibility',
        description:
          'We assess the task honestly and tell you if a script or a rules engine would do the job better and cheaper. Not everything should be an agent.',
        duration: '3–5 days',
      },
      {
        title: 'Prototype',
        description:
          'A working agent on a narrow slice of the real task, measured against a labelled evaluation set so quality is a number, not a feeling.',
        duration: '2–4 weeks',
      },
      {
        title: 'Harden',
        description:
          'Guardrails, error handling, cost controls, approval steps and full action logging added before anything touches production.',
        duration: '2–4 weeks',
      },
      {
        title: 'Deploy & monitor',
        description:
          'Rolled out with monitoring on accuracy, cost per run and failure modes, plus a documented rollback path.',
        duration: 'Ongoing',
      },
    ],
    deliverables: [
      'A deployed agent integrated with your systems',
      'An evaluation suite with a documented accuracy baseline',
      'Audit logs of every action the agent takes',
      'Source code and infrastructure configuration',
      'An operating runbook covering failure modes and escalation',
    ],
    documents: [],
    turnaround: '6–12 weeks from scope to production',
    related: ['digital-fte', 'workflow-automation', 'chatbot-development', 'ecommerce-management'],
    faqs: [
      {
        question: 'How is an agent different from a chatbot?',
        answer:
          'A chatbot answers. An agent acts. A chatbot tells a customer their refund policy; an agent checks the order, verifies eligibility against the policy, issues the refund in your system, and logs it. Agents need tool access, guardrails and audit trails precisely because they change real state.',
      },
      {
        question: 'What about hallucinations and mistakes?',
        answer:
          'They are a design constraint, not a solved problem, and anyone claiming otherwise is overselling. We manage it by grounding responses in your actual data, constraining what tools the agent can call, requiring human approval for irreversible actions, and measuring accuracy against a labelled evaluation set on every change.',
      },
      {
        question: 'Which AI models do you build on?',
        answer:
          'Whatever fits the task and your constraints on cost, latency and data residency. Claude, GPT and open models all have cases where they are the right answer. We build the integration layer so the model can be swapped without rewriting the agent.',
      },
      {
        question: 'Will our data be used to train models?',
        answer:
          'Not under the enterprise API terms we build on, which exclude your data from training by default. If you have residency or confidentiality requirements that rule out hosted models entirely, we can architect around self-hosted open models instead.',
      },
    ],
    seo: {
      title: 'Agentic AI Development: Custom AI Agents',
      description:
        'Custom AI agents integrated with your systems, with retrieval, guardrails, human-in-the-loop approval and measured evaluation.',
    },
  },

  {
    slug: 'digital-fte',
    pillar: 'software-ai',
    title: 'Digital FTE Development',
    navLabel: 'Digital FTE',
    oneLiner:
      'A named AI built around one specific person, trained on their judgement and voice, to run a defined slice of their work or their life.',
    intro:
      'Most "AI assistants" are generic. A Digital FTE is not: it is modelled on one person, a coach, a founder, an advisor, and built to carry a defined part of their role the way they would carry it themselves. We interview the person, capture how they actually decide and write, then build an AI that runs that slice of work on their own tools, in their own voice, with a clear line for anything it should not decide alone.',
    icon: 'users',
    included: [
      'A structured persona interview: tone, standing decisions, and the calls that are never delegated',
      'One clearly scoped domain, a role or a section of life, agreed in writing before anything is built',
      'Integration with the calendar, inbox, CRM or messaging tools that domain actually runs on',
      'A knowledge base built from the person’s own past messages, notes and decisions, not generic training data',
      'Guardrails and an approval gate on anything the real person would not sign off automatically',
      'Monthly tuning as their priorities and judgement shift',
    ],
    audience: [
      'Coaches and consultants who are the entire client experience',
      'Founders who are the bottleneck in their own inbox and calendar',
      'Advisors and experts whose time is the product being sold',
    ],
    steps: [
      {
        title: 'Scope the role',
        description:
          'The exact slice of work or life this covers is agreed in writing, and what stays with the person is named just as clearly as what does not.',
        duration: '1 week',
      },
      {
        title: 'Capture the person',
        description:
          'A structured interview and a review of their own past messages, decisions and material build the persona this runs on, not a generic AI voice.',
        duration: '1–2 weeks',
      },
      {
        title: 'Build & rehearse',
        description:
          'The Digital FTE is built and tested against real scenarios from the person’s own history, refined until its calls match theirs.',
        duration: '3–5 weeks',
      },
      {
        title: 'Deploy & supervise',
        description:
          'Launched on the agreed channels with approval gates in place, then supervised closely before its authority is widened.',
        duration: 'Ongoing',
      },
    ],
    deliverables: [
      'A deployed Digital FTE, live on the channels that role actually uses',
      'A written persona and decision playbook, not just a model nobody can inspect',
      'A named escalation path for anything outside its authority',
      'Monthly usage and accuracy reporting',
    ],
    documents: [],
    turnaround: '6–10 weeks from persona interview to supervised launch',
    related: ['agentic-ai-development', 'chatbot-development', 'social-media-management'],
    faqs: [
      {
        question: 'How is this different from the agentic AI you build?',
        answer:
          'Agentic AI is scoped to a task: it completes a process using your tools. A Digital FTE is scoped to a person: it is built around one individual’s judgement, voice and standing decisions, and carries a whole slice of their role rather than a single workflow. Most Digital FTEs use agentic AI underneath; the difference is what the system is modelled on.',
      },
      {
        question: 'Does it actually sound like the person, or like a generic AI?',
        answer:
          'It is built from their own writing, decisions and material, not a personality prompt. Where their past communication does not cover a situation, it says so and escalates rather than guessing at a voice.',
      },
      {
        question: 'What happens when it hits something outside its authority?',
        answer:
          'It stops and hands over, the same rule as every agent we build. The scoping step names exactly what "outside its authority" means for this person before anything goes live, so the line is written down rather than left to a judgement call at the worst moment.',
      },
      {
        question: 'Can it replace the person entirely?',
        answer:
          'No, and anyone promising that is overselling. It takes on the definable, repeatable part of a role: the messages, the scheduling, the first-draft decisions. The parts that need the person’s own relationships or judgement stay with them. We scope it that way on purpose.',
      },
    ],
    seo: {
      title: 'Digital FTE Development: AI Built Around One Person',
      description:
        'A persona-matched AI modelled on one person, coach, founder or advisor, built to run a defined slice of their work with guardrails and a clear escalation path.',
    },
  },

  {
    slug: 'workflow-automation',
    pillar: 'software-ai',
    title: 'Workflow Automation',
    navLabel: 'Workflow Automation',
    oneLiner:
      'The repetitive manual work between your tools, the copying, chasing and reporting, mapped and automated end to end.',
    intro:
      'Most businesses lose hours every week to moving data between systems by hand: re-keying orders, chasing approvals, assembling the same report. We map those processes, automate them properly with monitoring and error handling, and document what happens when something fails.',
    icon: 'workflow',
    included: [
      'Process mapping with the time cost of each manual step quantified',
      'Automation built on n8n, Make, Zapier or custom code, whichever fits',
      'Integration between your CRM, accounting, email, storage and messaging tools',
      'Automated reporting and scheduled data syncs',
      'Error handling, retries and failure alerting so silent breakage cannot happen',
      'Documentation and team training on the new process',
    ],
    audience: ['Teams re-keying data by hand', 'Ops-heavy businesses', 'Companies with disconnected tools'],
    steps: [
      {
        title: 'Map',
        description:
          'Current processes documented step by step with time and error cost attached, so we automate the expensive ones first.',
        duration: '3–7 days',
      },
      {
        title: 'Prioritise',
        description:
          'Automations ranked by hours saved against build effort. We start with the highest return, not the most interesting.',
        duration: '2–3 days',
      },
      {
        title: 'Build',
        description:
          'Workflows built and tested against real data, with error paths deliberately triggered to confirm they behave.',
        duration: '1–4 weeks',
      },
      {
        title: 'Handover',
        description:
          'Team trained, documentation delivered, and monitoring configured to alert a named person when something fails.',
        duration: '3–5 days',
      },
    ],
    deliverables: [
      'Live automations running in your own accounts',
      'Process documentation covering before and after',
      'Failure alerting routed to a named owner',
      'A team training session and written runbook',
      'An estimate of hours saved per month, measured not guessed',
    ],
    documents: [],
    turnaround: '2–6 weeks depending on the number of processes',
    related: ['agentic-ai-development', 'chatbot-development', 'bookkeeping'],
    faqs: [
      {
        question: 'Which automation platform do you use?',
        answer:
          'n8n when you want self-hosting, Make for visual complexity, Zapier for simple widely-supported connections, and custom code when the logic outgrows all three. The platform is chosen after the process is mapped, not before.',
      },
      {
        question: 'What happens when an automation breaks?',
        answer:
          'It alerts a named person immediately rather than failing quietly, which is the actual danger with automation. Every workflow we build has explicit error handling, retry logic and a documented manual fallback so work continues while it is fixed.',
      },
      {
        question: 'Will this replace jobs?',
        answer:
          'In practice it removes the parts of jobs nobody wanted: copy-pasting between systems, chasing status, rebuilding the same report. Teams typically redeploy that time rather than shrink. We are happy to be honest with you about which of the two your case looks like.',
      },
    ],
    seo: {
      title: 'Workflow Automation Services',
      description:
        'Business process automation with n8n, Make, Zapier and custom code, covering integrations, automated reporting, error handling and training.',
    },
  },

  {
    slug: 'chatbot-development',
    pillar: 'software-ai',
    title: 'Chatbot Development',
    navLabel: 'Chatbot Development',
    oneLiner:
      'Support and sales chatbots for WhatsApp, your website and Instagram that answer from your real content and escalate cleanly.',
    intro:
      'We build chatbots that answer from your actual documentation and product data rather than improvising, and hand over to a human the moment they are out of depth. Deployed on WhatsApp Business, your website, Messenger or Instagram, with the conversation history feeding back into what to fix.',
    icon: 'chat',
    included: [
      'Conversation design mapped to the questions you genuinely receive',
      'Retrieval over your own documents, product data and policies',
      'Deployment to WhatsApp Business API, website widget, Messenger or Instagram',
      'Clean human handover with full conversation context passed across',
      'CRM and helpdesk integration so conversations do not live in a silo',
      'Analytics on resolution rate, escalation rate and unanswered questions',
    ],
    audience: ['High-volume support teams', 'E-commerce brands on WhatsApp', 'Businesses answering the same questions'],
    steps: [
      {
        title: 'Analyse',
        description:
          'Your real conversation history reviewed to find the questions that actually account for the volume.',
        duration: '3–5 days',
      },
      {
        title: 'Design & build',
        description:
          'Conversation flows designed, your knowledge base connected, and the bot built and tested against real historic questions.',
        duration: '2–4 weeks',
      },
      {
        title: 'Pilot',
        description:
          'Launched to a slice of traffic with every conversation reviewed, so errors are caught before they scale.',
        duration: '1–2 weeks',
      },
      {
        title: 'Roll out & tune',
        description:
          'Full deployment, with unanswered questions reviewed monthly and folded back into the knowledge base.',
        duration: 'Ongoing',
      },
    ],
    deliverables: [
      'A deployed chatbot on every agreed channel',
      'Connected knowledge base you can update yourself',
      'Human handover configured into your existing support tool',
      'An analytics dashboard for resolution and escalation rates',
      'A monthly report of questions the bot could not answer',
    ],
    documents: [],
    turnaround: '3–6 weeks to pilot',
    related: ['agentic-ai-development', 'workflow-automation', 'social-media-management'],
    faqs: [
      {
        question: 'Will it frustrate my customers?',
        answer:
          'Badly built ones do, specifically the ones that trap people in loops with no way out. Ours are built to escalate early rather than guess, and every conversation offers a route to a human. A bot that resolves 60% cleanly and hands over the rest beats one that claims 90% and infuriates the remainder.',
      },
      {
        question: 'Can it handle WhatsApp?',
        answer:
          'Yes, through the official WhatsApp Business API. That requires a verified business account and Meta approval, which we handle as part of setup. Note that Meta charges per conversation, separately and directly to you.',
      },
      {
        question: 'How does it know about my products and policies?',
        answer:
          'We connect it to your actual content, meaning your product catalogue, policy pages, documentation and past support answers, and it retrieves from those rather than inventing. When your content changes, the bot follows. When your content is wrong or missing, the bot exposes that, which is often the more useful finding.',
      },
    ],
    seo: {
      title: 'Chatbot Development: WhatsApp, Web & Instagram',
      description:
        'AI chatbots grounded in your own content, deployed to WhatsApp Business, website, Messenger and Instagram with clean human handover.',
    },
  },

  {
    slug: 'ai-prompt-engineering',
    pillar: 'software-ai',
    title: 'AI Prompt Engineering',
    navLabel: 'AI Prompt Engineering',
    oneLiner:
      'Prompt systems, templates and internal guidelines that make your team’s AI output consistent instead of a lottery.',
    intro:
      'Most teams using AI get wildly inconsistent results because everyone prompts differently and nobody measures anything. We build tested prompt libraries for your recurring tasks, document what works, and train your team, so quality stops depending on who happened to write the prompt.',
    icon: 'prompt',
    included: [
      'Audit of how your team currently uses AI and where output quality breaks down',
      'A prompt library for your recurring tasks, versioned and documented',
      'System prompts and reusable templates for your tools and products',
      'Evaluation sets so prompt changes are measured rather than guessed at',
      'Model selection advice balancing cost, speed and quality',
      'Team training and written usage guidelines',
    ],
    audience: ['Teams with inconsistent AI output', 'Content and support operations', 'Product teams shipping AI features'],
    steps: [
      {
        title: 'Audit',
        description:
          'Current usage and outputs reviewed to identify where results are unreliable and what that costs in rework.',
        duration: '3–5 days',
      },
      {
        title: 'Build',
        description:
          'Prompts written, structured and tested against real examples from your own work, not synthetic ones.',
        duration: '1–3 weeks',
      },
      {
        title: 'Evaluate',
        description:
          'Outputs scored against a defined rubric so improvement is demonstrable rather than asserted.',
        duration: '1 week',
      },
      {
        title: 'Train & document',
        description:
          'Team trained on the library and the guidelines, with a maintenance owner named so it does not rot.',
        duration: '3–5 days',
      },
    ],
    deliverables: [
      'A documented, versioned prompt library',
      'System prompts and templates ready to use',
      'An evaluation set with scored baseline results',
      'Written AI usage guidelines for your team',
      'A recorded training session',
    ],
    documents: [],
    turnaround: '2–4 weeks',
    related: ['agentic-ai-development', 'workflow-automation', 'social-media-management'],
    faqs: [
      {
        question: 'Is prompt engineering still a real discipline?',
        answer:
          'The parlour tricks are gone, and models no longer need coaxing with magic phrases. What remains and matters more is structuring context, giving clear task specifications, and building evaluations so you know whether a change helped. That work has become more valuable as models improved, not less.',
      },
      {
        question: 'Can you not just tell us the prompts?',
        answer:
          'A prompt without an evaluation set is a guess that happened to work once. The deliverable is the system: a library tied to your real tasks, scored against your own examples, with guidelines for extending it. Handing over a list of prompts would be the cheap version that stops working the moment your task shifts slightly.',
      },
      {
        question: 'Which models does this cover?',
        answer:
          'Whichever your team uses, whether Claude, ChatGPT, Gemini or a model inside your own product. Structure transfers across models better than specific phrasing does, which is exactly why we document the structure and the evaluation rather than just the text.',
      },
    ],
    seo: {
      title: 'AI Prompt Engineering & Team Training',
      description:
        'Tested prompt libraries, system prompts, evaluation sets and team training that make AI output consistent and measurable.',
    },
  },
];
