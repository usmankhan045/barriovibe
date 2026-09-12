import type { Post } from './types';

/**
 * Category 2 of research/CATALOGUE.md: what it costs.
 *
 * 733 queries on what a website or app costs to build, and the catalogue had
 * nothing against it until this cluster. That was the largest single gap found
 * in the whole harvest.
 *
 * What makes these writable rather than another range-quoting page is the
 * software estimation literature, which is genuinely counterintuitive and
 * unflattering to every party including us.
 */
export const BUILD_COST_POSTS: Post[] = [
  {
    slug: 'what-a-website-costs-by-scope-decision',
    cluster: 'build-cost',
    title: 'What a Website Actually Costs, Organised by the Decisions That Move It',
    navLabel: 'What a website costs',
    card: 'Published ranges span a hundredfold and explain nothing. Here are the six decisions that account for most of the spread.',

    answer:
      'The hundredfold range you have seen quoted is real and it is not useful, because it describes a market rather than your project. Six decisions account for most of the spread: whether content is editable by you, whether anyone signs in, whether it takes payments, whether it connects to another system, how much bespoke design there is, and who maintains it afterwards. Each one is answerable before you talk to anybody.',

    sections: [
      {
        kind: 'prose',
        heading: 'Why the ranges are useless',
        body: [
          'Search for what a website costs and you get a range spanning two orders of magnitude, usually with tiers labelled basic, professional and enterprise. Nobody is lying. The range is real.',
          'It is useless because it is a fact about the market rather than about your project, and the tier labels describe price points rather than decisions. Knowing that websites cost between very little and a great deal does not help you predict where yours lands.',
          'What determines the number is a small set of choices, and you can answer all of them yourself before speaking to anyone.',
        ],
      },
      {
        kind: 'table',
        heading: 'The six decisions',
        intro:
          'Roughly in order of how much each one moves the number. The first two account for more of the spread than the other four together.',
        columns: ['Decision', 'What it adds', 'The question to ask yourself'],
        rows: [
          ['Can you edit the content?', 'A content model and an editing interface', 'How often does this change, and who changes it?'],
          ['Does anyone sign in?', 'Accounts, sessions, permissions, recovery', 'Is there anything only some people should see?'],
          ['Does it take money?', 'Payments, tax, refunds, reconciliation', 'Are you selling, or asking people to enquire?'],
          ['Does it connect to something?', 'Integration, and somebody else\'s uptime', 'Does data need to arrive somewhere automatically?'],
          ['How bespoke is the design?', 'Design time, then build time against it', 'Does it need to look like you, or look professional?'],
          ['Who maintains it?', 'Ongoing cost either way', 'Who fixes it at 9pm on a Friday?'],
        ],
      },
      {
        kind: 'prose',
        heading: 'The first question is the one people answer wrong',
        body: [
          'Almost everyone says they want to edit their own content, and most of them then never edit it.',
          'It is worth being honest about, because editability is not free. It means a content model, an editing interface, a preview mechanism, and a set of guard rails so that editing does not break the layout. On a small site that work can be a meaningful share of the build.',
          'The useful test is what actually changed on your current site in the last year. If the answer is nothing, or one phone number, you may be buying a capability you will not use. If the answer is a blog, a menu, a price list or a team page, you need it and should say so clearly.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Sign-in is a threshold, not a feature',
        body: [
          'The jump from a site with no accounts to a site with accounts is the single largest step in this list, and it is frequently described as though it were a page.',
          'Accounts bring registration, sign-in, password reset, email delivery, session handling, permissions, account deletion, and a set of obligations about the data you now hold. Each is small. Together they are a project.',
          'It is often worth asking whether you need accounts or whether you need a link. A unique link emailed to someone, with no password, covers a surprising number of cases where accounts were the assumed answer, and it removes all of the above.',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'The number you are quoted is a forecast, not a price',
        body:
          'This is the part most quotes do not say, and the research is unambiguous. A review of ten surveys of software effort estimation found that most projects, 60 to 80 percent, encounter effort or schedule overruns, and that the typical overrun runs around 30 to 40 percent. That is the industry you are buying from, and it includes us. A fixed price does not remove that risk, it prices it: somebody has added a margin for it, and you are paying that margin whether or not it is needed.',
      },
      {
        kind: 'prose',
        heading: 'Where the money actually goes',
        body: [
          'A useful corrective, because the intuition is usually wrong.',
          'Design and build are the visible parts and rarely the dominant ones on anything beyond a brochure site. The larger costs tend to be integration, which involves somebody else\'s system behaving unpredictably, content, which is nearly always late and nearly always underestimated, and the long tail of edge cases that only appear once real people use the thing.',
          'Content deserves particular mention. On a great many projects the build finishes before the copy does, and the launch date slips for reasons that have nothing to do with engineering. If you are commissioning a site, the fastest thing you can do to control cost is have the content ready.',
        ],
      },
      {
        kind: 'prose',
        heading: 'What the platform choice actually decides',
        body: [
          'Whether to use a website builder, a content management system or a custom build is usually framed as a cost question, and it is better understood as a question about where the constraint sits.',
          'A builder is cheapest and constrains you to what it does. That is a real advantage as well as a limitation: constraints prevent expensive decisions. A content management system is more flexible and brings maintenance, plugins and their update cycle. A custom build removes the constraints and hands you responsibility for everything the other options were handling.',
          'The honest guidance is that if a builder does what you need, the fact that it is cheaper is a benefit rather than a compromise. The reason to leave is that you need something it cannot do, and being able to name that thing is the test.',
        ],
      },
      {
        kind: 'steps',
        heading: 'Getting a quote you can compare',
        intro:
          'The point is to make two quotes comparable, which they usually are not, because they answer different questions.',
        steps: [
          {
            title: 'Answer the six decisions in writing first',
            body:
              'Before contacting anyone. Two quotes for the same six answers are comparable; two quotes for a vague brief are two different projects with two different prices.',
          },
          {
            title: 'Ask what is excluded, specifically',
            body:
              'Content, hosting, domain, email, SSL, ongoing maintenance, third-party licences, and who pays for changes after sign-off. Exclusions are where quotes differ most and where they are least explicit.',
          },
          {
            title: 'Ask who owns the code and the accounts',
            body:
              'The default in both US and UK law is that the contractor owns copyright in commissioned work absent a written assignment. Ask for the assignment in writing, and ask whose name the hosting and domain accounts are in.',
          },
          {
            title: 'Ask what happens when it overruns',
            body:
              'Not whether it will. The research says most projects do. A supplier with a clear answer about how overruns are handled is telling you something useful; one who says it will not happen is telling you something else.',
          },
          {
            title: 'Price year two before you sign',
            body:
              'Hosting, maintenance, updates, and the changes you will want in month four. A build price without a running cost beside it is half the number.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'How we quote, and what we get wrong',
        body: [
          'We build websites, so read this section with that in mind.',
          'We quote against the six decisions above rather than against a tier, which makes our numbers comparable with anyone else answering the same questions. Where we are uncertain we say so rather than padding quietly, because a padded fixed price is a risk premium the client pays whether or not the risk occurs.',
          'The thing we get wrong most often is content. We have learned to ask who is writing it and when, and to put a date on it, because the project that slips is nearly always the one where the copy arrived in week nine.',
          'The other recurring correction we make is talking people out of accounts. A sign-in wall is frequently the assumed solution to a problem that a unique link or a simple form solves, and removing it takes a meaningful amount out of a quote. That is a smaller job for us and the right answer often enough that it is worth asking every time.',
        ],
      },
    ],

    faqs: [
      {
        question: 'How much should a website cost?',
        answer:
          'There is no useful single figure, and the ranges you have read describe the market rather than your project. The number is set by six decisions: content editability, whether anyone signs in, payments, integrations, how bespoke the design is, and who maintains it. Answer those and quotes become comparable.',
      },
      {
        question: 'Why do website quotes vary so much?',
        answer:
          'Mostly because they are answering different questions. A quote for a brochure site and a quote for a site with accounts and payments are quotes for different projects, and a vague brief lets each supplier assume a different one. Specifying the six decisions removes most of the variation.',
      },
      {
        question: 'Is a custom website worth it over a builder?',
        answer:
          'Only if you can name something the builder cannot do. Its constraints prevent expensive decisions as well as limiting you, so being cheaper is a benefit rather than a compromise when it fits. The reason to leave is a specific requirement, not a general sense of wanting more control.',
      },
      {
        question: 'Should I expect the project to go over budget?',
        answer:
          'The research says most do. A review of ten surveys found 60 to 80 percent of projects encounter effort or schedule overruns, typically by around 30 to 40 percent. Ask a supplier how overruns are handled rather than whether they happen.',
      },
      {
        question: 'What is usually excluded from a website quote?',
        answer:
          'Content, hosting, domain and email, ongoing maintenance, third-party licences, and changes after sign-off. Exclusions vary more between quotes than inclusions do, which is why two similar-looking numbers can mean very different commitments.',
      },
    ],

    publishedAt: '2026-10-29T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'Molokken-Ostvold and Jorgensen, A Review of Surveys on Software Effort Estimation, ISESE 2003',
        url: 'https://www.simula.no/publications/review-surveys-software-effort-estimation',
        readOn: '2026-09-11',
        supports: 'That most projects, 60 to 80 percent, encounter effort or schedule overruns, typically around 30 to 40 percent.',
      },
      {
        label: 'US Copyright Office, Circular 30 on works made for hire',
        url: 'https://www.copyright.gov/circs/circ30.pdf',
        readOn: '2026-09-11',
        supports: 'That commissioned software is not among the work-made-for-hire categories, so an assignment is required.',
      },
    ],

    limits: [
      'No price figures appear in this post. Rates vary by market and by year, and a number would be obsolete faster than the decisions that drive it.',
      'The estimation research covers software projects generally rather than websites specifically. The direction is well established; the precise overrun for your project is not predictable.',
      'This covers what moves the cost. Whether a given supplier is worth their rate is a different question and this post does not help with it.',
      'We build websites, so we are quoting against the framework we recommend. The framework is public and you can use it to compare us with anyone else.',
    ],

    cta: {
      heading: 'Want a quote you can actually compare?',
      body: 'Answer the six decisions in writing and send the same document to everyone you are considering, us included. Comparable quotes are worth more to you than a cheaper one, and they take an afternoon to make possible.',
      buttonLabel: 'Send us the six answers',
      href: '/contact?service=web-development',
    },

    related: ['why-software-estimates-are-wrong'],

    seo: {
      title: 'What a Website Actually Costs, by Scope Decision',
      description:
        'Published ranges span a hundredfold and explain nothing. The six decisions that account for the spread, and how to make two quotes comparable.',
    },
  },

  {
    slug: 'why-software-estimates-are-wrong',
    cluster: 'build-cost',
    title: 'Why Software Estimates Are Wrong, and What the Research Actually Says',
    navLabel: 'Why estimates are wrong',
    card: 'The cone of uncertainty does not narrow. That finding comes from 570 real projects and it inverts how estimation is taught.',

    answer:
      'Most projects overrun: a review of ten surveys puts it at 60 to 80 percent of projects, typically by 30 to 40 percent. The more surprising finding is that estimates do not reliably improve as a project proceeds. A study of 570 real projects found no narrowing of the uncertainty over time, which is the opposite of what the standard cone-of-uncertainty model assumes. And the most-cited statistic in this field, the CHAOS report, is discredited in peer-reviewed work.',

    sections: [
      {
        kind: 'prose',
        heading: 'You are holding a quote you do not trust',
        body: [
          'That instinct is well founded and the research supports it, though not always in the direction people expect.',
          'This post is about what is actually known: how often projects overrun, by how much, whether estimates improve with time, and which of the famous numbers you should not repeat.',
        ],
      },
      {
        kind: 'prose',
        heading: 'How often, and by how much',
        body: [
          'The most reliable general finding comes from a review of ten separate surveys of software effort estimation. It reports that most projects, in the region of 60 to 80 percent, encounter effort or schedule overruns, and that the typical overrun is around 30 to 40 percent.',
          'Two things follow. A project overrunning is the normal case rather than a failure of the supplier, and a 30 to 40 percent contingency is a defensible planning assumption rather than pessimism.',
          'It also means that a supplier promising no overrun is either pricing the risk into the quote, which is legitimate and should be visible, or has not encountered enough projects.',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'The finding that inverts the standard model',
        body:
          'Estimation is usually taught with the cone of uncertainty: wide at the start, narrowing as the project proceeds and more is known. Todd Little tested that against 570 real projects at a software company and found no such narrowing. Uncertainty did not reliably reduce as work progressed. If that is right, the intuition that a mid-project estimate is much better than an initial one is not supported, and re-estimating at the halfway point does not give you the confidence it appears to.',
      },
      {
        kind: 'prose',
        heading: 'The fat tail matters more than the average',
        body: [
          'An average overrun of 30 to 40 percent sounds manageable, and the distribution is what should worry you rather than the mean.',
          'Flyvbjerg and Budzier examined 1,471 IT projects and found an average cost overrun of 27 percent, which is in line with the surveys. The finding that matters is what sits in the tail: one in six projects was a black swan running around 200 percent over.',
          'A one in six chance of a project costing three times the estimate is a materially different risk from an average overrun of a quarter. It is also why a portfolio of small projects is safer than one large one, since the tail is what kills you and large projects have more of it.',
          'Worth stating the caveat: that sample is heavily weighted towards public-sector projects, which are larger and more procurement-bound than most commercial work.',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'Do not cite the CHAOS report',
        body:
          'The most quoted statistics in this field come from the Standish Group CHAOS reports, and they are discredited in peer-reviewed work. Eveleens and Verhoef, using 5,457 forecasts of 1,211 real projects, describe the definitions as "misleading, one-sided" and demonstrate that a mirror-image bias flips a single company from 6 percent to 94 percent success. Standish\'s own chairman reportedly told them the data "should be considered Standish opinion", a disclaimer that never appears in the reports. Separately, the original 1994 sample was recruited by asking executives to share failure stories. If you have seen a figure about software project failure, there is a good chance it traces here.',
      },
      {
        kind: 'prose',
        heading: 'Why estimates are wrong, mechanically',
        body: [
          'Three causes, and only one of them is about optimism.',
          'The first is that estimating requires knowing what you are building, and most of what is discovered during a project is discovered by building it. An estimate is a forecast about work whose shape is not yet visible.',
          'The second is that the units are wrong. Effort is estimated for the construction and the schedule is consumed by the things around it: waiting for content, waiting for access, waiting for a decision, waiting for someone else\'s API to behave.',
          'The third is incentive. In a competitive bid the optimistic estimate wins the work, which selects for optimism across the market rather than within any one supplier. That is a structural effect and it operates whether or not anyone intends it.',
        ],
      },
      {
        kind: 'prose',
        heading: 'What to do about it as a buyer',
        body: [
          'The useful response is not to demand better estimates, because the research suggests that lever is weaker than it appears.',
          'It is to reduce the size of what you are estimating. A project broken into pieces that each deliver something usable converts one large forecast into several small ones, and the small ones are both more accurate and less damaging when wrong.',
          'The second move is to ask what happens when it overruns rather than whether it will. A supplier with a clear answer, about how change is handled and who absorbs what, is giving you the information that matters. The answer that it will not happen is not reassurance, it is a forecast contradicted by the literature.',
          'The third is to notice which risks you have actually transferred. A fixed price looks like it moves the risk to the supplier, and the evidence on that is more complicated than it looks.',
        ],
      },
      {
        kind: 'prose',
        heading: 'How this changes what we do',
        body: [
          'We quote software work, so the research above is about us as much as anyone.',
          'What we have taken from it is to break work into smaller pieces than clients usually ask for, because the estimate on a two-week piece is worth something and the estimate on a six-month piece is a genre of writing. That means more frequent conversations about scope, which is less comfortable and more honest.',
          'Where we are uncertain about a piece, we say which piece and why, rather than adding a quiet margin across the whole number. A padded fixed price transfers nothing: the client pays the contingency whether or not the risk occurs, and never learns where the risk actually was.',
          'And we have stopped promising that estimates improve as we go, because the evidence does not support it. What improves is what we know about the product, which is different and more valuable.',
        ],
      },
    ],

    faqs: [
      {
        question: 'How often do software projects go over budget?',
        answer:
          'A review of ten surveys found that most projects, roughly 60 to 80 percent, encounter effort or schedule overruns, typically by around 30 to 40 percent. A separate study of 1,471 IT projects found a 27 percent average cost overrun, with one in six running about 200 percent over.',
      },
      {
        question: 'Do estimates get more accurate as a project progresses?',
        answer:
          'Not reliably, on the best available evidence. A study of 570 real projects found no narrowing of estimation uncertainty over time, which contradicts the cone-of-uncertainty model that most estimation practice assumes.',
      },
      {
        question: 'Is the Standish CHAOS report a good source?',
        answer:
          'No. Peer-reviewed analysis using 5,457 forecasts of 1,211 projects describes its definitions as misleading and one-sided, and shows a mirror-image bias flipping one company from 6 percent to 94 percent success. Its 1994 sample was recruited by asking executives for failure stories.',
      },
      {
        question: 'How much contingency should I hold?',
        answer:
          'The research supports 30 to 40 percent as a defensible planning assumption for the typical case. The more important point is the tail: roughly one in six projects runs far higher, so the question is not only what you expect but what you can survive.',
      },
      {
        question: 'How do I get a more accurate estimate?',
        answer:
          'Mostly by estimating something smaller. Breaking work into pieces that each deliver something usable converts one large forecast into several small ones, which are both more accurate and less damaging when wrong. Demanding more precision on a large estimate does not produce it.',
      },
    ],

    publishedAt: '2026-10-30T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'Molokken-Ostvold and Jorgensen, A Review of Surveys on Software Effort Estimation, ISESE 2003',
        url: 'https://www.simula.no/publications/review-surveys-software-effort-estimation',
        readOn: '2026-09-11',
        supports: 'That 60 to 80 percent of projects encounter overruns, typically 30 to 40 percent.',
      },
      {
        label: 'Little, Schedule estimation and uncertainty surrounding the cone of uncertainty, IEEE Software 23(3), 2006',
        url: 'https://ieeexplore.ieee.org/document/1628884',
        readOn: '2026-09-11',
        supports: 'The finding across 570 projects that estimation uncertainty did not narrow as projects progressed.',
      },
      {
        label: 'Flyvbjerg and Budzier, Why Your IT Project May Be Riskier Than You Think, Harvard Business Review, September 2011',
        url: 'https://hbr.org/2011/09/why-your-it-project-may-be-riskier-than-you-think',
        readOn: '2026-09-11',
        supports: 'The 1,471-project sample, the 27 percent average overrun and the one in six black swan finding.',
      },
      {
        label: 'Eveleens and Verhoef, The Rise and Fall of the Chaos Report Figures, IEEE Software, 2010',
        url: 'https://ieeexplore.ieee.org/document/5232595',
        readOn: '2026-09-11',
        supports: 'The peer-reviewed critique of the CHAOS figures and the mirror-image bias demonstration.',
      },
    ],

    limits: [
      'The Flyvbjerg sample is weighted towards public-sector projects, which are larger and more procurement-bound than most commercial work.',
      'The cone-of-uncertainty finding comes from one company\'s project history. It is strong evidence against the universal claim and is not a measurement of your context.',
      'These are aggregate findings. They tell you what to expect across many projects, not what will happen to yours.',
      'We quote software work, so this research is about us too. It is cited rather than summarised precisely so you can check it against what any supplier tells you.',
    ],

    cta: {
      heading: 'Holding a quote you are not sure about?',
      body: 'The most useful question is not whether the number is right but how overruns are handled and what is excluded. If you want a second read on a proposal, that is a short conversation and we will tell you when it looks reasonable.',
      buttonLabel: 'Get a second read',
      href: '/contact?service=web-development',
    },

    related: ['what-a-website-costs-by-scope-decision', 'fixed-price-or-time-and-materials'],

    seo: {
      title: 'Why Software Estimates Are Wrong: What Research Says',
      description:
        'Most projects overrun by 30 to 40 percent, and the cone of uncertainty does not narrow. What 570 projects showed, and why not to cite the CHAOS report.',
    },
  },

  {
    slug: 'why-your-ai-bill-exceeded-the-estimate',
    cluster: 'build-cost',
    title: 'Why Your AI Bill Came In Higher Than the Estimate',
    navLabel: 'Why the AI bill overran',
    card: 'It is rarely the per-token price. It is the context you pay for repeatedly, the retries, and the work that happened twice.',

    answer:
      'Per-token prices are published and easy to multiply, which is why estimates built on them look precise and come in low. The three things that actually move an AI bill are not in that arithmetic: context is re-sent and re-charged on every turn, failures and retries consume tokens without producing output, and duplicate execution does real work twice. The fix is architectural rather than a cheaper model.',

    sections: [
      {
        kind: 'prose',
        heading: 'The estimate was probably arithmetically correct',
        body: [
          'Somebody took the published price per million tokens, estimated a typical request and response, multiplied by expected volume, and got a number. That calculation is not wrong, it is incomplete, and the gap between it and the invoice is systematic rather than random.',
          'It also explains why the overrun feels mysterious. Nothing failed, usage was roughly as predicted, and the bill is several times the estimate.',
        ],
      },
      {
        kind: 'table',
        heading: 'Where the difference comes from',
        intro:
          'Roughly in order of how much each contributes on a typical agentic workload.',
        columns: ['Cause', 'Why the estimate missed it'],
        rows: [
          ['Context re-sent every turn', 'The estimate counted one request, not the conversation'],
          ['Verbose tool output', 'A tool result is charged on every later turn too'],
          ['Retries and failures', 'Failed attempts consume tokens and produce nothing'],
          ['Duplicate execution', 'The same work billed twice, with no error logged'],
          ['Output tokens', 'Priced at around five times input on most models'],
        ],
      },
      {
        kind: 'prose',
        heading: 'The one that dominates: you pay for the conversation, repeatedly',
        body: [
          'This is the structural fact that makes agent costs behave unlike API costs generally.',
          'A model has no memory between calls. Every turn re-sends the whole conversation so far: the system prompt, the tool definitions, the earlier exchanges, and every tool result already returned.',
          'So a twelve-turn agent run does not cost twelve times one turn. The fixed prefix at the front is paid for twelve times, and each tool result is paid for on every turn after it arrives.',
          'An estimate built on one request and one response has counted a fraction of what the run will actually consume, and the ratio gets worse as the conversation gets longer.',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'The saving that is usually left on the table',
        body:
          'Because that fixed prefix repeats, caching it is the largest single reduction available. Cached input is priced far below fresh input across vendors: on Anthropic\'s models, cache reads run at a fraction of the input rate, and on OpenAI\'s models cached input is around a tenth of the standard rate. A cache write costs more than an ordinary read, so caching loses money on a prefix used once and wins substantially on one reused across turns. The break-even arrives at roughly the third read, which is why this is an agent optimisation specifically and does nothing for one-shot calls.',
      },
      {
        kind: 'prose',
        heading: 'Verbose tools cost more than they look',
        body: [
          'A tool that returns a whole record when the agent needed one field seems harmless. It is charged once on arrival and then on every subsequent turn for the rest of the run, because it stays in the context.',
          'On a long run, a handful of chatty tools can contribute more than the model choice does. Trimming tool output to what the agent actually uses is usually the second largest saving after caching, and it typically takes an afternoon.',
          'It is also the least likely thing to be in an estimate, because the estimate was made before anyone knew what the tools would return.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Failures cost money and produce nothing',
        body: [
          'Estimates are built on the successful path. Production is not only the successful path.',
          'A run that loops burns tokens without producing output, and it does not error while doing so. A tool call that times out and is re-dispatched can complete twice, both times successfully, with no error logged and twice the cost. Documented cases exist of this mechanism producing bills in the thousands within a day, with every individual action reporting success.',
          'This is why a monthly cap is a poor control and a per-run budget is a good one: only a per-run limit acts inside the window where the damage happens.',
        ],
      },
      {
        kind: 'prose',
        heading: 'And output is priced higher than input',
        body: [
          'Worth checking against your own estimate, because it is easy to average the two by accident.',
          'Across the major vendors, output tokens are typically priced at around five times input. A workload that generates long responses is therefore more expensive than the same token volume would suggest if you assumed one rate.',
          'One promotional caveat to note: at least one vendor is currently running a temporary price on a flagship model with a published end date. Any estimate resting on a promotional rate has an expiry attached, which is worth knowing before you build a business case on it.',
        ],
      },
      {
        kind: 'steps',
        heading: 'Estimating properly, before you build',
        intro:
          'Four steps. They take an hour and produce a number that survives contact with production.',
        steps: [
          {
            title: 'Count the fixed prefix',
            body:
              'System prompt plus tool definitions, in tokens. This is re-sent every turn and it is usually larger than people expect once there are eight or ten tools defined with proper descriptions.',
          },
          {
            title: 'Estimate turns per task, generously',
            body:
              'Not the happy path. A lookup agent may be two or three turns, a multi-step operational one ten to twenty, and a stuck one considerably more. The distribution matters more than the average.',
          },
          {
            title: 'Add the accumulation, not just the prefix',
            body:
              'Each tool result persists in context for every later turn. Estimate what your tools return and multiply by the turns that follow, because that term is frequently larger than the prefix.',
          },
          {
            title: 'Apply caching and then add a failure allowance',
            body:
              'Move the prefix to the cached rate with one write per run. Then add something for retries and loops, because the successful path is not the whole bill and the failure cases are the expensive ones.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'What we do differently now',
        body: [
          'We build agentic systems, and we have been on the wrong side of this: our early estimates were built on the successful path and the prefix, and they were low for exactly the reasons above.',
          'What changed is that we now instrument tokens per completed task from the first day rather than total spend, because the ratio is what tells you something is wrong while it is still cheap. Total spend moves with volume and hides the problem inside growth.',
          'We also design tool outputs deliberately, which sounds fussy and is where a surprising amount of the money is. A tool returning three fields instead of thirty changes the cost of every subsequent turn in the run.',
          'And we quote running costs as a range with the failure allowance stated separately, rather than as a single number from the happy path. It makes our estimates look less precise than competitors who quote from the per-token price, and it makes them closer to the invoice.',
        ],
      },
    ],

    faqs: [
      {
        question: 'Why is my AI agent more expensive than the token price suggests?',
        answer:
          'Because the model has no memory between calls, so every turn re-sends the whole conversation. The fixed prefix is paid for on every turn, and each tool result is charged again on every turn after it arrives. An estimate built on one request and response counts a fraction of the run.',
      },
      {
        question: 'What is the biggest saving available?',
        answer:
          'Prompt caching on the fixed prefix. Cached input is priced well below fresh input, and since the prefix repeats every turn the saving compounds across the run. A cache write costs more than an ordinary read, so it pays from roughly the third read onward.',
      },
      {
        question: 'Does a cheaper model fix a cost overrun?',
        answer:
          'Usually not first. Model choice typically moves the bill by a factor of two to five; caching and context discipline move it by more, and a cheaper model that needs more turns can cost more overall while producing worse output.',
      },
      {
        question: 'How do retries affect the bill?',
        answer:
          'They consume tokens and produce nothing, and they do not error while doing it. A tool that times out can be re-dispatched and complete twice, both successfully, with no error logged. Documented cases have produced bills in the thousands within a day this way.',
      },
      {
        question: 'How should I budget for this?',
        answer:
          'Count the fixed prefix, estimate turns generously, add the accumulating tool output, apply caching, then add an explicit allowance for failures. And set a spend ceiling per run rather than per month, because only a per-run control acts while the overrun is still small.',
      },
    ],

    publishedAt: '2026-11-02T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'Anthropic pricing, including prompt caching read and write rates',
        url: 'https://www.anthropic.com/pricing',
        readOn: '2026-09-12',
        supports: 'That cached reads are priced well below input, that cache writes cost more than an ordinary read, and that output is priced above input.',
      },
      {
        label: 'OpenAI API pricing',
        url: 'https://openai.com/api/pricing/',
        readOn: '2026-09-12',
        supports: 'Cached input pricing relative to standard input, output pricing, and the promotional rate with a published end date.',
      },
      {
        label: 'LangGraph issue: duplicate tool dispatch after timeout',
        url: 'https://github.com/langchain-ai/langgraph/issues',
        readOn: '2026-09-11',
        supports: 'That a long-running tool call can be re-dispatched with both executions completing successfully and no error logged.',
      },
    ],

    limits: [
      'No absolute price figures appear in this post, because they change frequently. The structural relationships, that context repeats and cached input is cheaper, are stable; the rates are not.',
      'At least one vendor is running promotional pricing with a published end date, so any business case resting on current rates should note which ones are temporary.',
      'This covers running cost. Build cost, which usually dominates the first year, is a separate question.',
      'We build agentic systems and our own early estimates were low for the reasons described here. The method is given so you can apply it to any supplier including us.',
    ],

    cta: {
      heading: 'Want the running cost estimated before you commit?',
      body: 'It takes about an hour: count the fixed prefix, estimate turns, add what the tools return, apply caching, then add a failure allowance. We will do it with you and tell you plainly if the running cost is not the thing to worry about.',
      buttonLabel: 'Get it estimated',
      href: '/contact?service=agentic-ai-development',
    },

    related: ['what-a-chatbot-costs-by-what-it-does'],

    seo: {
      title: 'Why Your AI Bill Came In Higher Than the Estimate',
      description:
        'Rarely the token price. Context is re-charged every turn, verbose tools compound, retries produce nothing, and duplicate execution bills twice with no error.',
    },
  },

  {
    slug: 'what-a-chatbot-costs-by-what-it-does',
    cluster: 'build-cost',
    title: 'What a Chatbot Costs, by What You Actually Want It to Do',
    navLabel: 'What a chatbot costs',
    card: 'The free tier is real and the ceiling is low. Three different products get called a chatbot and they cost very differently.',

    answer:
      'What people call a chatbot is three different products with three different cost shapes. A scripted bot answering fixed questions is nearly free to run. A bot answering from your documents costs per conversation and the cost is dominated by how much context it reads. A bot that takes actions is an agent, and it carries evaluation, monitoring and idempotency work that the other two do not. The channel adds its own cost, and on WhatsApp a bot that replies to customers is free while one that contacts them is not.',

    sections: [
      {
        kind: 'prose',
        heading: 'Three products, one word',
        body: [
          'The word chatbot covers a scripted menu, a question answering system over documents, and an agent that books appointments and issues refunds. They share an interface and almost nothing else, including cost.',
          'Most confused quotes trace to this. A supplier quotes for one and the client is imagining another, and the gap is not a margin dispute, it is two different projects.',
        ],
      },
      {
        kind: 'table',
        heading: 'The three, and where the money goes',
        intro:
          'Build cost dominates the first year in all three cases. Running cost is what diverges afterwards.',
        columns: ['Type', 'Running cost driver', 'The operational surface'],
        rows: [
          ['Scripted', 'Channel fees only', 'Almost none'],
          ['Answers from documents', 'Tokens per conversation', 'Evaluation set, corpus upkeep'],
          ['Takes actions', 'Tokens plus retries', 'Evaluation, monitoring, idempotency, permissions'],
        ],
      },
      {
        kind: 'prose',
        heading: 'The scripted bot, which is underrated',
        body: [
          'A decision tree with buttons has no model behind it, so it has no token cost and no risk of inventing an answer. It handles the top few questions that make up most volume, and hands everything else to a person.',
          'It is unfashionable and it is frequently the right answer. If your enquiries are dominated by opening hours, order status and how to book, a scripted bot resolves them at nearly zero marginal cost and cannot be wrong.',
          'The honest limitation is that it fails ungracefully on anything unanticipated, so the escalation path matters more than the tree. A scripted bot with a good handover is a good product; one that traps people in a menu is the thing that gave chatbots their reputation.',
        ],
      },
      {
        kind: 'prose',
        heading: 'The document bot, where cost follows context',
        body: [
          'Once the bot answers from your own material, the cost per conversation is set by how much it reads rather than by how much it says.',
          'Each question retrieves passages and sends them to the model along with the system prompt and the conversation so far. A system that retrieves generously, passing twenty chunks when three would do, costs several times one that retrieves precisely, and the answers are often worse because the relevant passage is competing with noise.',
          'Which means retrieval quality and cost point the same way here, unusually. Better precision is cheaper and more accurate at once, and it is the first thing to look at if a bot is costing more than expected.',
          'The other structural cost is the conversation itself: a multi-turn exchange re-sends everything said so far on each turn, so long conversations cost more per turn as they proceed.',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'The channel is a separate bill, and on WhatsApp it dominates',
        body:
          'Meta charges per delivered template message and prices by country. For a Pakistani recipient the marketing rate is several times the utility rate, and replies to a customer inside the 24-hour service window are free. So a support bot that answers people who messaged first has a Meta bill close to zero however much it says, and a marketing bot that initiates conversations pays on every message. That is the single biggest fork in a WhatsApp chatbot budget and it is decided by what the bot is for rather than by how it is built.',
      },
      {
        kind: 'prose',
        heading: 'Where the free tier ends',
        body: [
          'A common search is for a free chatbot for a website, and the free tiers are real rather than a trick. They are usually limited by conversations per month, by whether you can remove branding, and by whether you can connect your own documents.',
          'The ceiling arrives in a predictable order. First you want your own content in it rather than a generic assistant. Then you want it on a channel the free tier does not cover. Then somebody asks for a report on what people are asking, which is the point at which the free product stops being the cheap option and starts being the one without data.',
          'Nothing about that is dishonest. It is worth knowing the sequence so you can judge where you are on it, because the migration is the expensive part rather than the subscription.',
        ],
      },
      {
        kind: 'prose',
        heading: 'The costs that are not per message',
        body: [
          'For anything beyond scripted, three costs recur and none is in a per-message price.',
          'The corpus. A document bot is only as good as what it can retrieve, so somebody has to assemble, clean and keep the material current. This is usually the largest hidden cost and it does not stop.',
          'The evaluation set. Without one, nobody can tell whether a change improved things, and model versions change underneath you. For a bot answering customers this is the difference between knowing it works and hoping.',
          'The escalation path. Every bot needs a route to a human, and that route needs staffing. A bot that resolves 60 percent of enquiries has not removed the other 40 percent, and the residue is usually the harder half.',
        ],
      },
      {
        kind: 'steps',
        heading: 'Working out which one you need',
        intro:
          'In order. Most businesses stop at step two and are right to.',
        steps: [
          {
            title: 'Look at what people actually ask',
            body:
              'Pull the last two hundred enquiries and count them. If the top five questions are most of the volume, a scripted bot handles your problem at almost no running cost.',
          },
          {
            title: 'Check whether the answers exist in writing',
            body:
              'A document bot needs documents. If the answers live in people\'s heads or in a shared inbox, the project before the project is writing them down, and that is worth doing regardless of whether a bot follows.',
          },
          {
            title: 'Decide whether it needs to do anything',
            body:
              'Answering is one product; booking, refunding and updating records is another. Taking actions brings evaluation, monitoring, idempotency and permissions, which is a different scope and a different budget.',
          },
          {
            title: 'Price the channel separately from the brain',
            body:
              'They are independent. The same bot costs differently on your website, on WhatsApp answering inbound, and on WhatsApp sending outbound, and the third is where the numbers get large.',
          },
          {
            title: 'Budget the corpus and the escalation, not just the build',
            body:
              'Keeping the material current and staffing the handover are ongoing, and they are what decides whether the thing still works in a year.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'What we ask before quoting',
        body: [
          'We build chatbots, and the first question we ask is not technical. It is whether this bot is answering people or contacting them, because that decides most of the cost before anything is designed.',
          'The second is whether the answers exist in writing. If they do not, we say so and usually suggest fixing that first, which is a smaller job for us and frequently reduces enquiry volume on its own. A business that publishes clear answers to its top ten questions sometimes discovers it no longer needs the bot.',
          'The third is what happens when the bot cannot help. Teams underestimate this consistently: the bot takes the easy enquiries and leaves your staff a concentrated stream of the difficult ones, which is more demanding work than the mix they handled before. Planning for that is part of the project rather than an afterthought.',
          'And we will quote a scripted bot when a scripted bot is the answer. It is less interesting work and it is cheaper to run, and a client who gets what they needed rather than what was fashionable comes back.',
        ],
      },
    ],

    faqs: [
      {
        question: 'How much does a chatbot cost to run?',
        answer:
          'It depends which of three products you mean. A scripted bot costs channel fees only. A bot answering from your documents costs per conversation, driven by how much context it reads. A bot that takes actions adds evaluation, monitoring and idempotency work that the others do not need.',
      },
      {
        question: 'Are free website chatbots any good?',
        answer:
          'For a scripted bot handling common questions, often yes. The ceiling arrives when you want your own content in it, then a channel the free tier does not cover, then reporting on what people ask. Knowing that sequence helps you judge where you are on it.',
      },
      {
        question: 'Why is my chatbot bill higher than expected?',
        answer:
          'Usually retrieval volume and conversation length. Passing twenty chunks when three would do costs several times more and often answers worse, and every turn re-sends the conversation so far. Retrieval precision is the rare change that is cheaper and more accurate at once.',
      },
      {
        question: 'Does a WhatsApp bot cost more than a website bot?',
        answer:
          'It depends entirely on direction. Replies inside the 24-hour service window after a customer messages you are free, so an inbound support bot has a near-zero channel bill. Outbound template messages are charged per message and priced by country, which is where WhatsApp budgets get large.',
      },
      {
        question: 'What gets forgotten in a chatbot budget?',
        answer:
          'The corpus, the evaluation set and the escalation path. Keeping source material current is ongoing and usually the largest hidden cost, and the enquiries the bot cannot handle are the harder ones, which makes the remaining human work more demanding rather than less.',
      },
    ],

    publishedAt: '2026-11-04T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'Meta, WhatsApp Business Platform pricing',
        url: 'https://developers.facebook.com/docs/whatsapp/pricing',
        readOn: '2026-09-11',
        supports: 'Per-message template pricing by country and category, and that replies inside the 24-hour customer service window are free.',
      },
      {
        label: 'Anthropic pricing',
        url: 'https://www.anthropic.com/pricing',
        readOn: '2026-09-12',
        supports: 'Input, output and cached input rates, which set the per-conversation cost of a document bot.',
      },
      {
        label: 'Ragas documentation, agentic and tool use metrics',
        url: 'https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/agents/',
        readOn: '2026-09-12',
        supports: 'That evaluating an action-taking bot requires defining expected tool calls and outcomes, which is the operational surface a scripted bot avoids.',
      },
    ],

    limits: [
      'No total price is given, because the three products differ by more than an order of magnitude and the build usually dominates the first year.',
      'Channel rates change and are country-specific. The WhatsApp figures referenced were read in September 2026 and Meta revises them.',
      'This covers cost shape rather than vendor comparison. Which platform to build on is a separate question.',
      'We build chatbots of all three kinds, including the scripted ones that are cheapest for us to deliver and cheapest for you to run.',
    ],

    cta: {
      heading: 'Not sure which of the three you need?',
      body: 'Pull your last two hundred enquiries and count them. If five questions are most of the volume, the answer is probably simpler and cheaper than what you were about to buy, and we would rather tell you that now.',
      buttonLabel: 'Talk it through',
      href: '/contact?service=chatbot-development',
    },

    related: ['why-your-ai-bill-exceeded-the-estimate'],

    seo: {
      title: 'What a Chatbot Costs, by What You Want It to Do',
      description:
        'Three products get called a chatbot and they cost very differently. Scripted is nearly free, document bots cost per conversation, and action-taking bots add real overhead.',
    },
  },
];
