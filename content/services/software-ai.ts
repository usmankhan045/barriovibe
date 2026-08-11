import type { Service } from '../types';

/**
 * Discipline 01: Software & AI.
 *
 * The client originally listed these on a single line. They are separate pages
 * because each one has a different buyer and a different search term, and
 * because bundling them would hide all but the first.
 *
 * The four AI pages sit next to each other and are easy to blur together, so
 * each is scoped against its neighbours: an AGENT does things, a CHATBOT talks
 * to customers, a RAG SYSTEM is the retrieval layer both of them stand on, and
 * a DIGITAL FTE is modelled on one named person rather than on a task. If a
 * page starts describing its neighbour's job, the boundary has slipped.
 */
export const SOFTWARE_SERVICES: Service[] = [
  {
    slug: 'web-development',
    pillar: 'software-ai',
    title: 'Full-Stack Web Development',
    navLabel: 'Full-Stack Web Dev',
    oneLiner:
      'Marketing sites and full-stack web applications, front end and back end, built to load fast and handed over with the source code.',
    intro:
      'We build websites the way this one was built. Pages are rendered ahead of time wherever the page allows it, they ship as little JavaScript as the job needs, and performance is measured against Google’s Core Web Vitals instead of a general promise of speed. That covers marketing sites, web applications with a database and an API behind them, and internal tools. The same team writes the front end and the back end, so nothing falls into the gap between a design shop and a backend contractor.',
    icon: 'code',
    included: [
      'Interface design and a responsive build, starting from the phone layout',
      'Next.js or a comparable modern stack, rendered ahead of time where the page allows it',
      'Back end, database and API where the product needs one',
      'CMS integration so your team can edit content without a developer',
      'Technical SEO: metadata, structured data, sitemaps and semantic markup',
      'Core Web Vitals work against the thresholds Google grades on: LCP under 2.5 seconds, INP under 200 milliseconds, CLS under 0.1',
      'Deployment, domain and SSL setup, and analytics configured before launch',
    ],
    audience: ['Businesses replacing a slow site', 'Startups launching a product', 'Companies needing a web app'],
    steps: [
      {
        title: 'Scope',
        description:
          'Pages, features, integrations and content requirements agreed in writing, with the scope and the date fixed at the same time.',
      },
      {
        title: 'Design',
        description:
          'Layouts designed and signed off before any code is written, so changes happen while they are still cheap to make.',
      },
      {
        title: 'Build',
        description:
          'Development against the approved design on a staging URL you can open at any point. There is no reveal at the end.',
      },
      {
        title: 'Launch',
        description:
          'Performance and accessibility audited, content migrated, DNS cut over, and the repository transferred to you.',
      },
    ],
    deliverables: [
      'A live website on your own domain and hosting',
      'Full source code in a repository you own',
      'A CMS your team can operate, with a written guide',
      'A Lighthouse report and Core Web Vitals figures measured against those thresholds',
      'A 30-day post-launch fix window',
    ],
    documents: [],
    related: ['app-development', 'workflow-automation', 'shopify-store-development'],
    faqs: [
      {
        question: 'Do I own the code?',
        answer:
          'Entirely. The repository is transferred to your account at handover, along with the hosting and domain credentials. There is no licence, no retainer requirement, and nothing that stops another developer picking it up.',
      },
      {
        question: 'WordPress or a custom build?',
        answer:
          'WordPress suits a large content operation with many editors and off-the-shelf plugins. A modern static build suits a site where speed and security matter more than plugin choice. We recommend based on your case and explain what each one costs you later, instead of defaulting to whichever we prefer building.',
      },
      {
        question: 'What are Core Web Vitals, and do they affect my ranking?',
        answer:
          'They are the three metrics Google uses to grade page experience: Largest Contentful Paint for loading, Interaction to Next Paint for responsiveness, and Cumulative Layout Shift for visual stability. Google reads them at the 75th percentile of your real visitors over a rolling 28-day window in the Chrome User Experience Report, so a fast load on your own laptop proves nothing. Interaction to Next Paint replaced First Input Delay in March 2024 and is the harder of the two to pass, because it measures every interaction on the page rather than only the first.',
      },
      {
        question: 'What happens after launch?',
        answer:
          'Thirty days of fixes for anything that does not work as specified, included. After that you can take it in-house, use another developer, or put us on a maintenance retainer. Nothing about the build locks you in either way.',
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
      'iOS and Android apps built from a single codebase, taken through store review, and shipped with the backend they run on.',
    intro:
      'We build cross-platform mobile apps in React Native or Flutter, so one codebase serves both stores instead of two teams building the same product twice. The engagement covers design, the backend and API, store submission and post-launch updates. We handle the store review correspondence ourselves, because that is the stage where a project without an experienced hand on it tends to stall.',
    icon: 'phone',
    included: [
      'Cross-platform build for iOS and Android from a single codebase',
      'Interface design following each platform’s own human interface guidelines',
      'Backend API, database and authentication',
      'Push notifications, deep linking and in-app analytics',
      'App Store and Play Store submission, including answering review rejections',
      'Crash reporting, monitoring and post-launch update releases',
    ],
    audience: ['Startups shipping an MVP', 'Businesses digitising a service', 'Brands needing a customer app'],
    steps: [
      {
        title: 'Define',
        description:
          'Feature set, user flows and platform requirements documented, with anything out of scope named explicitly so version one actually ships.',
      },
      {
        title: 'Design',
        description:
          'Screen designs and an interactive prototype you can tap through and sign off before development starts.',
      },
      {
        title: 'Build',
        description:
          'Development in sprints, each ending in a build you can install and use, distributed through TestFlight on iOS and internal testing on Play.',
      },
      {
        title: 'Ship',
        description:
          'Store listings prepared, submissions made, review feedback answered, and the app published.',
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
    related: ['web-development', 'agentic-ai-development', 'performance-marketing'],
    faqs: [
      {
        question: 'React Native or Flutter?',
        answer:
          'React Native when the app shares logic with a web product, or when your team already writes JavaScript. Flutter when the interface is heavily custom and animation-led. Both perform well enough for almost any app that is not a game or a video editor, and the choice between them is rarely what decides whether the product works.',
      },
      {
        question: 'Do I need my own developer accounts?',
        answer:
          'Yes, and you should insist on it whoever builds your app. The Apple Developer Program is 99 US dollars a year and a Google Play Console account is a one-time 25 US dollars. Both must be registered in your business name so you own the listings, the reviews and the users. We publish into your accounts as an invited member and hand the access back at the end.',
      },
      {
        question: 'Why does Android take longer to launch than iOS?',
        answer:
          'Because of a Play Console rule that catches most first-time publishers. A newly created personal developer account has to run a closed test with at least 12 testers who stay opted in for 14 consecutive days before Google will grant access to production. It is not a queue you can pay to skip, so we start recruiting testers during the build rather than after it.',
      },
      {
        question: 'What if Apple rejects the app?',
        answer:
          'It happens, and it is usually procedural: a missing privacy disclosure, incomplete metadata, or a guideline read differently than you read it. We answer the review correspondence and resubmit as part of the project. A rejection costs days rather than weeks when the person replying has seen that guideline before.',
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
      'AI agents that take an objective, work through the steps across your own tools and data, and stop for a human where the action cannot be undone.',
    intro:
      'An agent takes an objective, plans a route to it, calls your systems, and finishes the task. That is a different thing from a chatbot, which answers and stops. We build agents scoped to one specific job, such as triaging tickets, reconciling records or researching and drafting, with the evaluation set and the approval gates designed in from the start rather than added after a demo goes wrong.',
    icon: 'sparkles',
    included: [
      'Use-case scoping, including a straight answer on what an agent will not do reliably',
      'Agent architecture: tool design, memory, planning and retry behaviour',
      'Integration with your existing systems, APIs and data sources',
      'Retrieval over your own documents and knowledge base',
      'Guardrails, human approval on irreversible actions, and an audit log of every call the agent makes',
      'An evaluation suite that measures accuracy before and after every change',
    ],
    audience: ['Teams drowning in repetitive work', 'Companies with unstructured data', 'Businesses piloting AI properly'],
    steps: [
      {
        title: 'Feasibility',
        description:
          'We look at the task and tell you if an ordinary script or a rules engine would do it better and cheaper. Plenty of work does not need an agent.',
      },
      {
        title: 'Prototype',
        description:
          'A working agent on a narrow slice of the real task, scored against a labelled evaluation set so quality is a number rather than an impression.',
      },
      {
        title: 'Guardrails',
        description:
          'Error handling, cost limits, approval steps and full action logging added before the agent touches anything in production.',
      },
      {
        title: 'Deploy and monitor',
        description:
          'Rolled out with monitoring on accuracy, cost per run and failure modes, and a rollback path written down before it is needed.',
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
    related: ['rag-development', 'digital-fte', 'workflow-automation', 'ecommerce-management'],
    faqs: [
      {
        question: 'How is an agent different from a chatbot?',
        answer:
          'A chatbot tells a customer what your refund policy says. An agent opens the order, checks it against that policy, issues the refund in your system and writes the action to a log. Because an agent changes real records rather than describing them, it needs tool access, guardrails and an audit trail, none of which a chatbot needs.',
      },
      {
        question: 'What about hallucinations and mistakes?',
        answer:
          'They are a design constraint rather than a solved problem, and anyone telling you otherwise is selling. We manage them by grounding answers in your own data, limiting which tools the agent is allowed to call, requiring a human to approve anything irreversible, and re-scoring accuracy against a labelled evaluation set every time the system changes.',
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

  /* Scoped narrowly on purpose. An agent DOES things and a chatbot TALKS to
     customers; this is neither, it is the retrieval layer both of them stand
     on, sold on its own because plenty of businesses want grounded answers
     over their own documents without an agent or a public bot attached. Keep
     the boundary: if a page here starts describing tool use or a WhatsApp
     channel, it belongs on one of its neighbours instead. */
  {
    slug: 'rag-development',
    pillar: 'software-ai',
    title: 'RAG Systems Development',
    navLabel: 'RAG Systems',
    oneLiner:
      'An AI that answers from your own documents and cites the passage it used, so every answer can be checked rather than trusted.',
    intro:
      'A general model has read the internet and none of your contracts, SOPs or product manuals. Retrieval-augmented generation closes that gap by finding the relevant passages in your own material first and making the model answer from them. We build the pipeline end to end: ingestion and chunking, embeddings and a vector store, hybrid search with a re-ranking pass, and answers that carry a citation back to the passage they came from. The evaluation set comes with it, because otherwise nobody can tell whether retrieval is working.',
    icon: 'database',
    included: [
      'Ingestion of your own sources: documents, PDFs, wikis, tickets, transcripts and database records',
      'Chunking and metadata design tuned to how your material is actually structured',
      'Embeddings and a vector store, hosted or self-hosted depending on your data residency rules',
      'Hybrid retrieval combining semantic and keyword search, with a cross-encoder re-ranking pass',
      'Grounded answers with citations back to the source passage, and a refusal path when nothing relevant is found',
      'An evaluation set measuring retrieval and answer quality, plus a refresh pipeline so the index does not go stale',
    ],
    audience: [
      'Teams with large internal document sets',
      'Support functions answering the same questions repeatedly',
      'Regulated businesses that need a citable answer',
    ],
    steps: [
      {
        title: 'Corpus review',
        description:
          'We look at what you actually have, in what formats and in what state, and tell you honestly whether it is good enough to retrieve from before anything is built.',
      },
      {
        title: 'Pipeline build',
        description:
          'Ingestion, chunking, embedding and the vector store stood up, with hybrid search and re-ranking wired in and tuned against your material.',
      },
      {
        title: 'Evaluation',
        description:
          'A question set built from real queries your team asks, scored for whether the right passage was retrieved and whether the answer was faithful to it.',
      },
      {
        title: 'Deploy and refresh',
        description:
          'Shipped behind your own authentication, with a re-indexing job so new and changed documents reach the index without anyone rebuilding it by hand.',
      },
    ],
    deliverables: [
      'The retrieval pipeline and its vector store, deployed in your own infrastructure',
      'A query interface, or an API your existing product can call',
      'The evaluation set and its scores, so quality is a number rather than an impression',
      'A re-indexing job that keeps the corpus current',
      'Source code and documentation, yours at handover',
    ],
    documents: [
      'A representative sample of the documents to be indexed',
      'Access to the systems the content lives in, or an export from them',
      'Any confidentiality or data residency requirements that constrain where it can be hosted',
      'A list of real questions the system is expected to answer',
    ],
    related: ['agentic-ai-development', 'chatbot-development', 'contract-drafting'],
    faqs: [
      {
        question: 'Why not just paste the documents into the chat window?',
        answer:
          'That works until the material outgrows the context window, which happens quickly, and it puts the whole corpus in front of the model on every question whether it is relevant or not. Retrieval finds the few passages that matter for that specific question, which is both cheaper and measurably more accurate than flooding the prompt.',
      },
      {
        question: 'How do I know it is not making things up?',
        answer:
          'Every answer carries the passage it came from, so you can check it in one click. We also build an evaluation set from your team’s own questions and score faithfulness on it, meaning whether the answer is actually supported by the text that was retrieved. That is a number we report to you rather than a claim we make. The system is also built to say it does not know when retrieval comes back empty, which is the behaviour most demos quietly leave out.',
      },
      {
        question: 'Does my data get sent to a model provider?',
        answer:
          'Retrieved passages are sent to whichever model generates the answer, under enterprise terms that exclude your content from training. Where that is not acceptable, the same architecture runs against a self-hosted open model with nothing leaving your infrastructure. We settle that at the corpus review stage, before anything is indexed.',
      },
      {
        question: 'What happens when the documents change?',
        answer:
          'The refresh pipeline re-indexes changed and new documents on a schedule or on an event from the source system, so the index tracks the corpus. A stale index is the most common reason a retrieval system that worked at launch stops being trusted six months later, which is why it is in scope rather than left as an exercise.',
      },
    ],
    seo: {
      title: 'RAG Development: AI That Answers From Your Documents',
      description:
        'Retrieval-augmented generation systems built end to end: ingestion, embeddings, hybrid search with re-ranking, cited answers and measured retrieval quality.',
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
      'A Digital FTE is modelled on one individual, usually a coach, a founder or an advisor, and built to carry a defined part of that person’s role the way they would carry it themselves. That is what separates it from a generic assistant. We interview the person, capture how they actually decide and how they actually write, then build an AI that runs that slice of work on their own tools and in their own voice, with a line drawn around anything it should never decide alone.',
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
      },
      {
        title: 'Capture the person',
        description:
          'A structured interview and a review of their own past messages, decisions and material build the persona this runs on, not a generic AI voice.',
      },
      {
        title: 'Build and rehearse',
        description:
          'The Digital FTE is built and tested against real scenarios from the person’s own history, refined until its calls match theirs.',
      },
      {
        title: 'Deploy and supervise',
        description:
          'Launched on the agreed channels with approval gates in place, then supervised closely before its authority is widened.',
      },
    ],
    deliverables: [
      'A deployed Digital FTE, live on the channels that role actually uses',
      'A written persona and decision playbook, not just a model nobody can inspect',
      'A named escalation path for anything outside its authority',
      'Monthly usage and accuracy reporting',
    ],
    documents: [],
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
      'The manual work that happens between your tools, the copying and chasing and re-keying, mapped and then automated.',
    intro:
      'Most businesses lose hours every week moving data between systems by hand: re-keying orders, chasing approvals, rebuilding the same report someone already built last month. We map those processes, automate them with proper error handling and monitoring, and write down what to do when one of them fails, because eventually one will.',
    icon: 'workflow',
    included: [
      'Process mapping with the time cost of each manual step written down',
      'Automation built on n8n, Make, Zapier or custom code, whichever suits the process',
      'Integration between your CRM, accounting, email, storage and messaging tools',
      'Automated reporting and scheduled data syncs',
      'Error handling, retries and failure alerts, so a broken workflow cannot fail silently',
      'Documentation and a training session for the team who will live with it',
    ],
    audience: ['Teams re-keying data by hand', 'Ops-heavy businesses', 'Companies with disconnected tools'],
    steps: [
      {
        title: 'Map',
        description:
          'Current processes documented step by step with time and error cost attached, so we automate the expensive ones first.',
      },
      {
        title: 'Prioritise',
        description:
          'Automations ranked by hours saved against build effort. We start with the highest return, not the most interesting.',
      },
      {
        title: 'Build',
        description:
          'Workflows built and tested against real data, with error paths deliberately triggered to confirm they behave.',
      },
      {
        title: 'Handover',
        description:
          'Team trained, documentation delivered, and monitoring configured to alert a named person when something fails.',
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
    related: ['agentic-ai-development', 'chatbot-development', 'bookkeeping'],
    faqs: [
      {
        question: 'Which automation platform do you use?',
        answer:
          'It depends on the process, and we choose after mapping it rather than before. Zapier has the largest library of ready-made connections and the shallowest learning curve for a non-technical team. Make handles branching logic and loops more comfortably and costs less at the same volume. n8n is the only one of the three that can be self-hosted, so it is the answer when your data cannot leave your own servers, and it bills per workflow run rather than per step, which matters once a long workflow runs thousands of times a month. When the logic outgrows all three, we write code.',
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
      'Support and sales chatbots for WhatsApp, your website and Instagram that answer from your own content and hand over to a person cleanly.',
    intro:
      'We build chatbots that answer from your own documentation and product data instead of improvising, and that hand over to a person as soon as they are out of depth. They run on the WhatsApp Business Platform, a website widget, Messenger or Instagram. The conversation history is part of the deliverable, because the questions the bot could not answer are usually a list of gaps in your own content.',
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
      },
      {
        title: 'Design and build',
        description:
          'Conversation flows designed, your knowledge base connected, and the bot tested against questions real customers have already asked you.',
      },
      {
        title: 'Pilot',
        description:
          'Launched to a slice of traffic with every conversation read by a person, so mistakes are caught while they are still cheap.',
      },
      {
        title: 'Roll out and tune',
        description:
          'Full deployment, with the unanswered questions reviewed each month and folded back into the knowledge base.',
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
    related: ['rag-development', 'agentic-ai-development', 'social-media-management'],
    faqs: [
      {
        question: 'Will it frustrate my customers?',
        answer:
          'Badly built ones do, particularly the ones that trap people in a loop with no way out. Ours escalate early instead of guessing, and every conversation has a visible route to a person. A bot that resolves six questions in ten cleanly and hands over the rest is worth more than one that claims nine and infuriates the tenth.',
      },
      {
        question: 'What does WhatsApp actually cost to run?',
        answer:
          'It runs on the official WhatsApp Business Platform, which needs a verified business account and Meta approval. We handle that in setup. Meta bills you directly, and since July 2025 it charges per message rather than per conversation, priced by template category and by the recipient’s country code. Service messages, meaning your replies inside the 24-hour window after a customer writes to you, are free. Utility templates such as order and delivery updates are cheap and can be free inside that same window. Marketing templates are the expensive category and are charged whether or not the window is open. If a provider is reselling you access, their markup sits on top of Meta’s rate.',
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
      'Prompt libraries, system prompts and written guidelines that make your team’s AI output consistent instead of a lottery.',
    intro:
      'Teams that adopt AI without a system get inconsistent results, because everybody prompts differently and nobody measures the difference. We build tested prompt libraries for the tasks you actually repeat, score them against your own examples, and train the team on them. Output quality stops depending on who happened to write the prompt that day.',
    icon: 'prompt',
    included: [
      'An audit of how your team uses AI today and where the output breaks down',
      'A prompt library for your recurring tasks, versioned and documented',
      'System prompts and reusable templates for your own tools and products',
      'Evaluation sets, so a prompt change is measured rather than argued about',
      'Model selection advice weighed against cost, speed and quality',
      'Team training and written usage guidelines',
    ],
    audience: ['Teams with inconsistent AI output', 'Content and support operations', 'Product teams shipping AI features'],
    steps: [
      {
        title: 'Audit',
        description:
          'Current usage and outputs reviewed to identify where results are unreliable and what that costs in rework.',
      },
      {
        title: 'Build',
        description:
          'Prompts written, structured and tested against real examples from your own work, not synthetic ones.',
      },
      {
        title: 'Evaluate',
        description:
          'Outputs scored against a written rubric, so an improvement can be shown rather than claimed.',
      },
      {
        title: 'Train and document',
        description:
          'The team trained on the library and the guidelines, with one named person responsible for keeping it current.',
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
    related: ['agentic-ai-development', 'workflow-automation', 'social-media-management'],
    faqs: [
      {
        question: 'Is prompt engineering still a real discipline?',
        answer:
          'The parlour tricks are gone. Current models do not need coaxing with magic phrases, and anyone still selling those is behind. What is left is the part that always mattered more: giving the model the right context, specifying the task precisely, and building an evaluation so you can tell whether a change actually helped. Better models made that work more valuable rather than less.',
      },
      {
        question: 'Can you not just tell us the prompts?',
        answer:
          'A prompt with no evaluation set behind it is a guess that happened to work once. What you are buying is the system around it: a library tied to your real tasks, scored against your own examples, with guidelines for extending it when the task changes. A list of prompts on its own stops working the moment the task shifts slightly, and you would have no way of noticing.',
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
