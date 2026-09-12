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
];
