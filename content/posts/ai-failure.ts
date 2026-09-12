import type { Post } from './types';

/**
 * Category 1 of research/CATALOGUE.md: why AI projects fail.
 *
 * The largest demand cluster in the entire harvest, 1,199 queries, and the
 * single most prominent query in it is "why ai implementations fail" at 93
 * hits. The intent is not what it looks like: MIT is named in 24 queries and
 * McKinsey and Gartner in 8, so these are mostly people building a case for a
 * board rather than people whose own project broke.
 *
 * Which is why the lead post is a briefing on what the evidence says, not a
 * diagnostic. We read the primary document that everyone cites and nobody has
 * opened.
 */
export const AI_FAILURE_POSTS: Post[] = [
  {
    slug: 'the-95-percent-statistic-does-not-say-what-you-think',
    cluster: 'ai-failure',
    title: 'The 95% AI Failure Statistic Does Not Say What You Think',
    navLabel: 'The 95% statistic',
    card: 'The most cited number in enterprise AI says something narrower than the headline, and the report contradicts it two lines later.',

    answer:
      'The MIT report behind "95% of AI pilots fail" does not say that. It says 95% of organisations are getting zero return, which counts every organisation that never ran a pilot as a failure. Its own figures are 60% evaluated, 20% reached pilot stage and 5% reached production, so around a quarter of the organisations that actually piloted got to production. Two lines after its "95% failure rate" sentence, the same report records generic chatbots at roughly 83% pilot-to-implementation.',

    sections: [
      {
        kind: 'prose',
        heading: 'Why this matters more than the usual statistics argument',
        body: [
          'If you are reading this, there is a reasonable chance you are about to put the 95% figure in a board paper, or someone has just put it in one you have to respond to. It is the most quoted number in enterprise AI and it moved markets when it landed.',
          'So it is worth knowing what the document actually says, which is narrower, better hedged and considerably more interesting than the headline. We read it. It took some finding, which is part of the story.',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'What the report actually says',
        body:
          'The figure appears exactly twice in 26 pages. The executive summary reads: "this report uncovers a surprising result in that 95% of organizations are getting zero return." Page 6 reads: "The 95% failure rate for enterprise AI solutions represents the clearest manifestation of the GenAI Divide." Neither sentence says 95% of pilots fail. The subject of the first is organisations, and that distinction is the whole argument.',
      },
      {
        kind: 'prose',
        heading: 'The report contains its own correction',
        body: [
          'In the same executive summary, three sentences later, the report gives its funnel: "Sixty percent of organizations evaluated such tools, but only 20 percent reached pilot stage and just 5 percent reached production."',
          'Read that as a conversion rather than a headline. Of the organisations that reached pilot stage, 5 of 20 reached production. That is roughly a quarter succeeding, not one in twenty failing.',
          'The 95% counts every organisation that looked at a tool and did not pilot it, and every organisation that never looked at all, as part of the failing majority. Deciding not to pilot something is not a failed pilot. It is frequently the correct decision, arrived at cheaply.',
        ],
      },
      {
        kind: 'table',
        heading: 'The same numbers, read two ways',
        intro:
          'Nothing here is disputed. Both columns use the report\'s own figures from the same paragraph.',
        columns: ['', 'As reported', 'As the funnel reads'],
        rows: [
          ['Denominator', 'All organisations', 'Organisations that piloted'],
          ['Evaluated a tool', '60%', 'not counted'],
          ['Reached pilot', '20%', '100% of the base'],
          ['Reached production', '5%', 'about 25% of the base'],
          ['Headline', '95% get zero return', 'about a quarter of pilots shipped'],
        ],
      },
      {
        kind: 'prose',
        heading: 'And then it reports an 83% success rate',
        body: [
          'This is the part that is hard to explain away, because it is internal to the document rather than an outside critique.',
          'Two lines after the "95% failure rate" sentence on page 6, the report states: "Generic LLM chatbots appear to show high pilot-to-implementation rates (~83%)." The executive summary adds that "Over 80 percent of organizations have explored or piloted them, and nearly 40 percent report deployment."',
          'So a document reporting an 83% implementation rate for the most common category of AI tool was reported worldwide as evidence that AI does not work. Both things are in the same report, on the same page, and only one of them travelled.',
        ],
      },
      {
        kind: 'prose',
        heading: 'What the evidence base actually is',
        body: [
          'The report is transparent about this, to its credit, and the transparency is what makes the reporting of it hard to defend.',
          'Its stated basis is "a systematic review of over 300 publicly disclosed AI initiatives, structured interviews with representatives from 52 organizations, and survey responses from 153 senior leaders collected across four major industry conferences."',
          'A survey of conference attendees is a convenience sample. It is people who chose to attend AI conferences and chose to answer, which cannot support a claim about organisations in general, and the authors say so: "Our sample may not fully represent all enterprise segments or geographic regions" and "Selection bias possible in organizations willing to participate in AI research."',
          'Return is self-reported rather than read from accounts. The report concedes: "These figures are directionally accurate based on individual interviews rather than official company reporting." And the observation window is six months, which the authors flag as possibly "insufficient to fully assess successful implementation."',
          'The filename, incidentally, is v0.1.',
        ],
      },
      {
        kind: 'note',
        tone: 'info',
        heading: 'The conclusion recommends the authors\' own protocol',
        body:
          'The report\'s conclusion states: "Systems like NANDA, MCP, and A2A represent early infrastructure for this web." NANDA is the project the authors are affiliated with, described in the acknowledgments as building "infrastructure for distributed agent intelligence at scale". The only named reviewer is also a co-author. The report carries a disclaimer that its views "do not reflect the positions of any affiliated employers", so it is not an MIT institutional finding, and it is not from MIT Sloan, which is where most coverage placed it. None of this is hidden; all of it is in the document.',
      },
      {
        kind: 'prose',
        heading: 'The document is harder to find than the statistic',
        body: [
          'The URL that served the report now returns a redirect to a group overview page, and the report is not listed among that group\'s publications. The Internet Archive capture of the PDF is blocked from replay by robots policy.',
          'We found the complete 26-page original on a cloud consultancy\'s file uploads, and verified it by page count and byte size before quoting it. That a market-moving statistic survives publicly only as a copy on a third party\'s server is worth sitting with for a moment.',
          'It also means almost nobody repeating the number has read it, because for most of the period it was being repeated, reading it required knowing it had been mirrored.',
        ],
      },
      {
        kind: 'steps',
        heading: 'What to do if this number is in front of you',
        intro:
          'Whether you are citing it or someone is citing it at you, the same four checks apply, and they apply to most statistics of this shape.',
        steps: [
          {
            title: 'Ask what the denominator is',
            body:
              'Organisations, pilots, deployments or projects are four different populations and they produce wildly different percentages from identical data. Here it is organisations, which silently includes everyone who never tried.',
          },
          {
            title: 'Ask what "failure" was defined as',
            body:
              'Here it is no measurable profit and loss impact within six months, self-reported. That is a demanding bar for any enterprise software category, and it is not what most readers hear in the word "fail".',
          },
          {
            title: 'Ask who was sampled and how',
            body:
              'Fifty-two interviews and 153 conference attendees. Not a random sample of businesses, and the authors flag the selection bias themselves.',
          },
          {
            title: 'Ask what the authors are selling',
            body:
              'Not as an accusation, as a routine check. Here the conclusion names the authors\' own protocol as the infrastructure to adopt. A report that diagnoses a crisis and prescribes its authors\' product is a genre, and this one is a competent example of it.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'So what is the honest version',
        body: [
          'That most organisations have not yet got measurable financial return from generative AI is probably true, and the report is weak evidence for it rather than strong evidence against it.',
          'That most AI pilots fail is not what this document shows. Its own funnel points the other way, and its 83% figure for the most widely deployed category points further the other way still.',
          'If you need a number for a board paper, this is not the one. What the national statistics offices measure is more boring, better sampled and considerably more useful, and almost nobody quotes it. That is the subject of the next post.',
        ],
      },
    ],

    faqs: [
      {
        question: 'Is the MIT 95% AI failure statistic real?',
        answer:
          'The report is real and the number is in it, but it says 95% of organisations are getting zero return, not that 95% of pilots fail. The report\'s own funnel shows 20% reached pilot stage and 5% reached production, which is roughly a quarter of pilots succeeding rather than one in twenty.',
      },
      {
        question: 'Who wrote the GenAI Divide report?',
        answer:
          'Authors affiliated with Project NANDA, an MIT Media Lab initiative, published July 2025. It is not an MIT Sloan study, and it carries a disclaimer that its views do not reflect the positions of any affiliated employers. The only named reviewer is one of its co-authors.',
      },
      {
        question: 'Why can I not find the original report?',
        answer:
          'Its original URL now redirects to a group overview page and the Archive capture is blocked by robots policy. Copies exist on third-party sites. Verify any copy by page count and byte size before quoting it: the original is 26 pages.',
      },
      {
        question: 'What percentage of AI projects actually fail?',
        answer:
          'Nobody has a defensible figure, and that is the honest answer. The methodologically sound sources measure adoption rather than failure, and the studies that claim failure rates generally have sampling problems, undisclosed methods, or a commercial interest in the number.',
      },
      {
        question: 'Should I still worry about AI project failure?',
        answer:
          'Yes, but about the mechanisms rather than the statistic. Pilots stall for identifiable reasons: no owner after launch, no evaluation set, unhandled exceptions, and scope that never survived contact with real data. Those are addressable. A percentage is not.',
      },
    ],

    publishedAt: '2026-10-09T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'The GenAI Divide: State of AI in Business 2025, MIT NANDA (v0.1, July 2025)',
        url: 'https://cloudelligent.com/wp-content/uploads/2026/02/v0.1_State_of_AI_in_Business_2025_Report.pdf',
        readOn: '2026-09-11',
        supports:
          'Every quotation from the report, including the two occurrences of the 95% figure, the 60/20/5 funnel, the 83% chatbot rate, the stated sample and the conclusion.',
      },
      {
        label: 'MIT Media Lab, NANDA group overview',
        url: 'https://www.media.mit.edu/groups/nanda/overview/',
        readOn: '2026-09-11',
        supports:
          'That the original report URL now redirects here, and that the report is not listed among the group\'s publications.',
      },
    ],

    limits: [
      'This post is about what the report says, not about whether enterprise AI works. Those are different questions and the report is weak evidence on the second.',
      'The copy we read is a mirror, verified by page count and byte size against the original\'s published dimensions. The canonical URL no longer serves the document.',
      'We do not offer a replacement failure rate, because we could not find a defensible one. Several circulating alternatives were traced and rejected.',
      'The report\'s authors disclose their sampling limits and their affiliation openly. The criticism here is of how the number was reported, not of their candour.',
    ],

    cta: {
      heading: 'Building the case for or against an AI project?',
      body: 'We do this work and we will tell you when the answer is no. If you are trying to evidence a decision rather than justify one already taken, that is a conversation worth having before the board paper rather than after it.',
      buttonLabel: 'Talk it through',
      href: '/contact?service=agentic-ai-development',
    },

    related: ['what-the-official-statistics-measured', 'why-ai-failures-are-silent'],

    seo: {
      title: 'The 95% AI Failure Statistic Does Not Say What You Think',
      description:
        'The MIT report behind the number says 95% of organisations, not pilots. Its own funnel implies a quarter of pilots reached production, and it reports 83% chatbot success.',
    },
  },

  {
    slug: 'what-the-official-statistics-measured',
    cluster: 'ai-failure',
    title: 'What the Official Statistics Actually Measured About AI at Work',
    navLabel: 'What the statistics measured',
    card: 'National statistics offices measure AI adoption properly, and almost nobody quotes them. The job losses are not in the data.',

    answer:
      'Statistics agencies measure this with real sampling, and their findings are duller and more useful than the coverage. The UK ONS reports that around half of businesses say AI has had no impact on headcount at all. US Census puts national AI use at 19.8%, rising to 37% at firms of 250 or more and under 20% at firms of four or fewer. The size gap is real and steep. The mass job displacement is not there yet.',

    sections: [
      {
        kind: 'prose',
        heading: 'The best data on this is free and nobody cites it',
        body: [
          'Almost every published claim about AI adoption traces to a vendor survey, a consultancy estimate or a conference-floor sample. Meanwhile the UK Office for National Statistics and the US Census Bureau are measuring the same question with proper sampling frames, and publishing it.',
          'Their findings get very little coverage, which is not mysterious: they do not support either the boosterism or the doom. They are specific, hedged and considerably more useful if you are making a decision rather than an argument.',
        ],
      },
      {
        kind: 'table',
        heading: 'Adoption, by who is measuring',
        intro:
          'Read from each agency directly, and re-checked on 12 September 2026. Note these are not the same measure, which is the first thing most coverage gets wrong.',
        columns: ['Source', 'What it found', 'Population'],
        rows: [
          ['US Census, to 3 May 2026', '19.8% using AI', 'All US businesses'],
          ['US Census, by size', '37% at 250+ employees', 'Firms of 250 or more'],
          ['US Census, smallest firms', 'Under 20%', 'Firms with four or fewer'],
          ['UK ONS, June 2026', 'Around 35%', 'Businesses with 10+ employees'],
          ['UK ONS, by size', '49% at 250+, 28% at 0 to 9', 'By employment band'],
        ],
      },
      {
        kind: 'prose',
        body: [
          'The UK figure looks higher than the US one and mostly is not: ONS measures businesses with ten or more employees and asks about a list of specific technologies, while Census covers all businesses including the very small and asks a single question. Comparing the two headline numbers directly is the error to avoid.',
          'What both agree on is the shape. Adoption rises steeply with firm size, and the gap is large: roughly two to one in the US between the largest and smallest firms, and similar in the UK.',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'The finding that contradicts most of the coverage',
        body:
          'ONS, on the labour market question, reports: "Most businesses report that the use of AI has not resulted in a change to their overall workforce headcount so far." Across all size bands, around half of businesses reported no impact on headcount. It adds that improving business operations is the most common use of AI, reported by over 60% of larger businesses, "however, this has not yet translated into widespread changes in overall workforce headcount."',
      },
      {
        kind: 'prose',
        heading: 'Where reductions do happen, they concentrate',
        body: [
          'The ONS data does contain headcount reductions, and they are not evenly spread. Around 6% of businesses using AI for operational improvements report a decrease in headcount, against a smaller proportion among businesses using AI for other purposes.',
          'That is a useful signal rather than a large number. What a business uses AI FOR predicts the employment effect better than whether it uses AI at all, and the reductions cluster where AI was deployed as a process change rather than as a tool people use.',
          'ONS also notes the Bank of England reaching the same place: for most firms, AI has had no material impact on employee numbers over the past three years.',
        ],
      },
      {
        kind: 'prose',
        heading: 'The gap between what businesses use and what employees use',
        body: [
          'One finding in the ONS release deserves more attention than it gets. Over half of employees, 55%, report using AI for work or education, against around 35% of businesses reporting use of at least one AI technology.',
          'Employee use runs well ahead of business adoption. Whatever your organisation has decided about AI, some of your people are already using it, and if you have not decided, they have decided for you.',
          'That is the practical argument for having a position in writing, and it is a different argument from the productivity one. It is about knowing which tools are touching your data.',
        ],
      },
      {
        kind: 'note',
        tone: 'info',
        heading: 'One caveat on the US series',
        body:
          'Census revised its core AI question in November 2025, from AI use in producing goods or services to AI use in any business function. That produces a level shift rather than growth, so the 2023-to-2026 series should not be read as a single continuous adoption curve. We have not independently confirmed the revision date against the questionnaire, so treat the trend with more caution than the level.',
      },
      {
        kind: 'prose',
        heading: 'Nobody has confirmed the productivity gain either',
        body: [
          'The honest position on productivity is that it has not yet shown up in aggregate statistics, and the people best placed to find it say so.',
          'Bank of England analysis of UK output per hour finds the measured gains sitting in AI-producing sectors rather than in the sectors adopting AI. Finance and insurance, a large and heavy adopter, contributed nothing positive. The regression of adoption against productivity change returns an R-squared of about 0.10, and the author states it is "only suggestive of a correlation, not causation".',
          'The OECD adds the selection problem: the productivity premium among AI adopters is substantially explained by the fact that firms which were already more digital and more competitive are also the ones adopting AI.',
          'We have read the summaries of both rather than the full primary documents, so this section is held to a lower standard than the ONS and Census figures above, and is flagged as such below.',
        ],
      },
      {
        kind: 'prose',
        heading: 'What to take from this if you run a business',
        body: [
          'Three things, none of them dramatic.',
          'The adoption gap by size is real, so if you are small and have not adopted, you are with the majority rather than behind a stampede. The cost argument that used to exclude small firms has largely gone, and what limits adoption now is identifying a use case worth the effort.',
          'The job-loss story is not in the measured data. If someone is justifying a restructuring with AI-driven efficiency, the statistics do not support that as a general pattern, and at least one large bank had to reverse exactly that decision.',
          'And the productivity case is unproven at aggregate level, which is not the same as absent. It means the sensible question is whether a specific application pays for itself in your business, not whether AI pays off in general. Nobody can answer the second question yet.',
        ],
      },
    ],

    faqs: [
      {
        question: 'What percentage of businesses actually use AI?',
        answer:
          'US Census put it at 19.8% of all US businesses in data to 3 May 2026, rising to 37% at firms with 250 or more employees. UK ONS reports around 35% of businesses with ten or more employees. The two are not directly comparable because they measure different populations with different questions.',
      },
      {
        question: 'Is AI causing job losses?',
        answer:
          'Not in the official data so far. ONS reports that around half of businesses say AI has had no impact on headcount, and the Bank of England reaches the same conclusion for most firms over three years. Where reductions appear they concentrate in businesses using AI for operational change, at around 6%.',
      },
      {
        question: 'Why do small businesses adopt AI less?',
        answer:
          'Both agencies find a steep size gradient. Cost is no longer the main barrier now that tools are cheap, and ONS finds the leading barriers are difficulty identifying use cases and lack of expertise. Notably, a large share of businesses report no barriers at all.',
      },
      {
        question: 'Has AI improved productivity?',
        answer:
          'Not measurably at the aggregate level yet. Bank of England analysis finds the gains concentrated in AI-producing sectors rather than adopting ones, and the OECD attributes much of the firm-level premium to the fact that already-strong firms adopt first.',
      },
      {
        question: 'Are more of my staff using AI than I think?',
        answer:
          'Probably. ONS found 55% of employees reporting AI use for work or education against about 35% of businesses reporting any AI technology in use. Employee adoption runs ahead of organisational adoption, which is mainly a data governance question rather than a productivity one.',
      },
    ],

    publishedAt: '2026-10-10T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'ONS, Artificial intelligence in UK businesses: 2023 to 2026',
        url: 'https://www.ons.gov.uk/businessindustryandtrade/business/businessservices/articles/artificialintelligenceinukbusinesses/2023to2026',
        readOn: '2026-09-12',
        supports:
          'UK adoption by size, the headcount findings, the 6% operational-improvement figure, and the employee versus business usage gap.',
      },
      {
        label: 'US Census Bureau, Business Trends and Outlook Survey AI supplement',
        url: 'https://www.census.gov/library/stories/2026/05/ai-use-businesses.html',
        readOn: '2026-09-12',
        supports:
          'The 19.8% national rate, 37% at firms of 250 or more, and under 20% at the smallest firms.',
      },
      {
        label: 'Bank of England, Bank Underground on AI and UK productivity',
        url: 'https://bankunderground.co.uk/2026/08/06/is-artificial-intelligence-making-us-more-productive-what-the-uk-industry-data-show/',
        readOn: '2026-09-11',
        supports:
          'That measured productivity gains sit in AI-producing sectors, and the correlational caveat.',
      },
    ],

    limits: [
      'The ONS and Census figures were read directly from each agency and re-checked on 12 September 2026. The productivity section rests on summaries of the Bank of England and OECD work rather than on the full primary documents, and is weaker evidence as a result.',
      'The Census question was revised in November 2025, which shifts the level. We have not confirmed that revision against the questionnaire ourselves, so the trend is less reliable than the level.',
      'Adoption is not the same as benefit. These figures say how many businesses use AI, not how many gained from it.',
      'National figures do not predict your case. A steep size gradient tells you about the distribution, not about whether a specific use pays for itself in your business.',
    ],

    cta: {
      heading: 'Want to know whether a specific use pays for itself?',
      body: 'The national statistics cannot answer that and nor can a vendor. What answers it is costing one workflow properly against what it currently takes. That is a short piece of work and we do it before proposing anything.',
      buttonLabel: 'Get it costed',
      href: '/contact?service=workflow-automation',
    },

    related: ['the-95-percent-statistic-does-not-say-what-you-think', 'the-ai-redundancy-that-was-reversed'],

    seo: {
      title: 'What Official Statistics Measured About AI at Work',
      description:
        'ONS finds around half of businesses report no headcount impact from AI. Census puts US adoption at 19.8%. The size gap is steep and the job losses are not in the data.',
    },
  },

  {
    slug: 'why-ai-failures-are-silent',
    cluster: 'ai-failure',
    title: 'AI Does Not Fail Loudly Any More, Which Is the Problem',
    navLabel: 'Why AI fails silently',
    card: 'The 2023 failure was obvious nonsense. The 2026 failure is a confident report of work that never happened.',

    answer:
      'Published guidance still addresses the failure mode of 2023, which was visibly wrong text. The failure mode now is an agent that reports success it did not achieve: tests it claims passed without running them, work it says is complete when the output is plausible and wrong, side effects that fire twice. Practitioners running these systems describe it consistently: they fail subtly rather than catastrophically, which is worse, because you trust the output.',

    sections: [
      {
        kind: 'prose',
        heading: 'The failure mode moved and the advice did not',
        body: [
          'Most published advice on AI reliability is about hallucination, meaning a model stating something untrue in its answer. That was the characteristic 2023 problem and it had a useful property: you could see it. A wrong fact in a paragraph is visible to anyone who knows the subject.',
          'Once a model is given tools and allowed to act, the failure changes shape. The output is no longer the work, it is a report about the work, and a report can be confidently wrong about something that is now genuinely broken behind it.',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'What operators actually describe',
        body:
          'From someone running eleven agents in production for six months: "Confidence without evidence. Agents will report task complete with high confidence when the output is plausible but wrong. Without automated validation gates, you won\'t catch it until production breaks." And: "Agents rarely fail catastrophically, they fail subtly... This is worse than obvious failures because you trust the output." Another operator cataloguing failures over two months names "Phantom Verification: agent claims tests pass without actually running them in the current session", concluding "you don\'t know what gate you need until you\'ve been burned by its absence."',
      },
      {
        kind: 'prose',
        heading: 'The best-documented case: things happening twice',
        body: [
          'The clearest example of silent failure is duplicate execution, and it is worth understanding because it is reported independently across different frameworks and has no clean fix today.',
          'A LangGraph issue describes it precisely: "When a tool call takes longer than ~3 minutes on LangGraph Cloud, it gets silently re-dispatched from the last checkpoint while the original is still running. Both the original and the duplicate complete successfully, resulting in 2-3x redundant work and cost."',
          'Read the words "both complete successfully". Nothing errored. The logs are clean. If the tool sends an email, the customer got two. If it charges a card, the customer paid twice. A CrewAI issue raises exactly that case with a payment tool firing twice on retry.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Why the framework cannot solve this for you',
        body: [
          'The instinct is to assume a durability setting handles it. A further issue in the same project demonstrates with a reproduction that it does not: "Whether a crash during put() leaves the task\'s writes durable, and therefore whether resume replays them (exactly-once) or re-executes the node (duplicating its side effects), is decided by the OS thread scheduler."',
          'That is an honest statement of a hard distributed-systems problem rather than a bug anyone is neglecting. Exactly-once delivery across a crash boundary is difficult everywhere, and agent frameworks inherited the difficulty along with the retry loop.',
          'Which means the responsibility sits with whoever writes the tool, and the answer is old and unglamorous: idempotency keys. Every side-effecting tool takes a caller-supplied key, and the system it calls refuses to perform the same operation twice under the same key. The retry then becomes harmless, which is the only state in which automatic retries are safe.',
        ],
      },
      {
        kind: 'table',
        heading: 'Failure modes that produce no error',
        intro:
          'Each of these leaves a clean log. None of them is caught by monitoring that watches for exceptions.',
        columns: ['What happens', 'What you see', 'What catches it'],
        rows: [
          ['Tool re-dispatched after timeout', 'Two successful runs', 'Idempotency keys on the tool'],
          ['Agent reports tests passed', 'A confident summary', 'Running the tests yourself in CI'],
          ['Agent loops on a subtask', 'Rising bill, no output', 'A cost ceiling per run, and per-run token budgets'],
          ['Output plausible but wrong', 'A completed task', 'An evaluation set with known answers'],
          ['Guardrail fires after streaming', 'A blocked response, data already sent', 'Testing the guardrail on the streaming path'],
        ],
      },
      {
        kind: 'prose',
        heading: 'The cost version of the same problem',
        body: [
          'Silent failure has a financial form that arrives faster than the correctness form. An agent that loops does not stop on its own: one report describes loops that "run indefinitely, burning thousands of dollars in LLM API credits before the user manually kills the process", and notes that the framework\'s own iteration limit is "a blind budget. It doesn\'t detect redundancy, it just detects time."',
          'The documented case worth remembering is an agent that ran up a bill of 6,531 dollars in 24 hours by repeatedly deploying the same infrastructure template. Each individual action succeeded. The system was working exactly as instructed, and the instruction was wrong in a way nothing was watching for.',
        ],
      },
      {
        kind: 'steps',
        heading: 'What to put in place before an agent touches anything real',
        intro:
          'None of this is exotic. It is the ordinary discipline of running something that acts on your behalf, which agents mostly arrived without.',
        steps: [
          {
            title: 'Idempotency keys on every side-effecting tool',
            body:
              'Payments, emails, tickets, deployments, database writes. If calling it twice with the same key does anything different from calling it once, the retry loop will eventually find that out for you.',
          },
          {
            title: 'Verify claims independently of the agent',
            body:
              'If the agent says the tests passed, the tests should have passed in your CI, not in its summary. Phantom verification is a named failure because it is common, and the fix is never to accept a claim about work as evidence of work.',
          },
          {
            title: 'Put a ceiling on spend per run, not per month',
            body:
              'A monthly cap tells you afterwards. A per-run budget stops the loop while it is still cheap. Track tokens per completed task rather than tokens in total, because the ratio is what moves when something is looping.',
          },
          {
            title: 'Keep an evaluation set with known answers',
            body:
              'It is the only thing that detects plausible-but-wrong, because by definition nothing else about it looks wrong. Fifty real questions with known correct answers, re-run on a schedule.',
          },
          {
            title: 'Test guardrails where the data actually flows',
            body:
              'A filter that blocks a response after the response has streamed to the user has not blocked anything. Test it on the path the data takes in production, not on a single non-streaming call.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'What we build differently because of this',
        body: [
          'We build agentic systems, and the gates above are not a checklist we recite, they are the parts of the build that clients most often ask to cut.',
          'The request is reasonable on its face: the evaluation set is unglamorous, the idempotency work touches systems the agent was supposed to simplify, and none of it demonstrates well. It is all cost with nothing to show at the demo.',
          'What we have learned to say is that those parts are the difference between a system you can trust and a system you merely like. An agent without them works exactly as well right up to the moment it does not, and the moment it does not is silent by definition. We would rather scope them in and have the conversation about price than leave them out and have the other conversation later.',
        ],
      },
      {
        kind: 'prose',
        heading: 'The honest limit of this post',
        body: [
          'These are practitioner reports rather than a measured study. They establish that the complaint recurs, independently, across different teams and frameworks, and in strikingly similar language. They do not establish how often it happens, and anyone offering you a percentage for that has invented it.',
          'What makes them worth acting on is not frequency but asymmetry. The cost of adding idempotency keys is an afternoon. The cost of discovering you needed them is however many duplicate charges went out before anyone noticed, plus the time spent trusting a system that was quietly wrong.',
        ],
      },
    ],

    faqs: [
      {
        question: 'Why does my AI agent say it finished when it did not?',
        answer:
          'Because the output is a report about work rather than the work itself, and a plausible report is what the model optimises for. Operators call this confidence without evidence, and the only reliable fix is verifying the claim independently, for example by running the tests in CI rather than accepting a summary that says they passed.',
      },
      {
        question: 'Why did my agent send the same email twice?',
        answer:
          'Most likely duplicate execution. A tool call that runs long can be re-dispatched from a checkpoint while the original is still running, and both complete successfully with no error logged. The fix is an idempotency key on the tool, so the second call cannot repeat the side effect.',
      },
      {
        question: 'Can the framework prevent duplicate side effects?',
        answer:
          'Not reliably today. A reproduction in one major framework shows that even the strongest durability setting leaves exactly-once behaviour dependent on thread scheduling. This is a genuinely hard distributed-systems problem, so the responsibility sits with the tool you write rather than the framework you use.',
      },
      {
        question: 'How do I stop an agent burning money in a loop?',
        answer:
          'Set a budget per run rather than per month, and track tokens per completed task. Iteration limits help but are a blunt instrument: one practitioner describes them as a blind budget that detects time rather than redundancy.',
      },
      {
        question: 'How common are these failures?',
        answer:
          'Nobody knows, and we are not going to guess. The evidence here shows the failures recur independently across teams and frameworks, not how frequently. The case for acting is the asymmetry: prevention is cheap and discovery is not.',
      },
    ],

    publishedAt: '2026-10-11T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'LangGraph issue: duplicate tool dispatch after timeout',
        url: 'https://github.com/langchain-ai/langgraph/issues',
        readOn: '2026-09-11',
        supports: 'The re-dispatch mechanism and the observation that both the original and the duplicate complete successfully.',
      },
      {
        label: 'LangGraph issue: durability and exactly-once semantics',
        url: 'https://github.com/langchain-ai/langgraph/issues',
        readOn: '2026-09-11',
        supports: 'The reproduction showing exactly-once behaviour depends on the OS thread scheduler.',
      },
      {
        label: 'CrewAI issue: repeated side effects on retry',
        url: 'https://github.com/crewAIInc/crewAI/issues',
        readOn: '2026-09-11',
        supports: 'The payment-tool case and the discussion of iteration limits as a blind budget.',
      },
    ],

    limits: [
      'These are practitioner reports and framework issues, not a measured study. They evidence that the failures recur and in what words, not how often they occur.',
      'No frequency figure appears in this post, deliberately. Several circulating statistics on agent failure rates were traced during research and none survived.',
      'Framework behaviour changes. The issues cited were read on 11 September 2026 and the specific mechanisms may be fixed or altered; the idempotency advice holds regardless of who fixes what.',
      'This covers failure modes that produce no error. Ordinary errors, which your monitoring already catches, are out of scope.',
    ],

    cta: {
      heading: 'Putting an agent somewhere it can do damage?',
      body: 'The gates above are the difference between an agent that is useful and one that is quietly expensive. We build them in from the start, because retrofitting them means first finding out which one you needed.',
      buttonLabel: 'Talk about your build',
      href: '/contact?service=agentic-ai-development',
    },

    related: ['the-95-percent-statistic-does-not-say-what-you-think', 'why-ai-pilots-stall'],

    seo: {
      title: 'AI Does Not Fail Loudly Any More, Which Is the Problem',
      description:
        'The 2026 failure mode is an agent reporting success it never achieved: phantom verification, duplicate charges, silent loops. What catches each, and why frameworks cannot.',
    },
  },

  {
    slug: 'the-ai-redundancy-that-was-reversed',
    cluster: 'ai-failure',
    title: 'The Bank That Cut 45 Jobs for AI, Then Took It Back',
    navLabel: 'The reversed redundancy',
    card: 'Commonwealth Bank cut roles citing AI-reduced call volumes. Call volumes had gone up.',

    answer:
      'Commonwealth Bank of Australia made 45 roles redundant citing reduced call volumes from an AI voice bot, then reversed the decision after conceding volumes had actually risen. Its statement was that it "did not adequately consider all relevant business considerations". It is the cleanest documented case of an AI-attributed staffing decision failing on its own facts, and it lines up with national statistics showing almost no measured employment effect from AI.',

    sections: [
      {
        kind: 'prose',
        heading: 'What happened',
        body: [
          'The bank announced 45 redundancies in its customer service arm, attributing them to an AI voice bot that had reduced call volumes. The union challenged it. On examination the call volumes had not fallen, they had increased, and staff were still working overtime to cover them.',
          'The bank reversed the redundancies and said it "did not adequately consider all relevant business considerations when announcing the redundancies".',
          'That sentence is doing a lot of work. What it concedes is not that the AI was bad, but that nobody checked whether the claimed effect had occurred before acting on it.',
        ],
      },
      {
        kind: 'note',
        tone: 'info',
        heading: 'Why this case rather than the famous ones',
        body:
          'There is a better-known story of a company reversing an AI customer service decision, and we are not using it. The widely quoted admission about lower quality traces to an interview we could not access, so what is actually verifiable is a repositioning statement rather than a confession. It may well be accurate. It is not something we can source, so it is not in this post. The bank case has a documented reversal and a quoted statement, which is why it carries the argument instead.',
      },
      {
        kind: 'prose',
        heading: 'The measurement gap this exposes',
        body: [
          'The failure here was not the technology. A voice bot that handles some calls is an ordinary piece of engineering, and it very likely did handle some calls.',
          'The failure was attribution. Somebody observed that a bot was deployed, assumed a reduction in human workload, and converted that assumption into headcount before anyone measured the workload.',
          'This is the specific error the national statistics make visible. The UK ONS reports that around half of businesses say AI has had no impact on headcount at all, and the Bank of England finds no material effect for most firms over three years. The measured employment effect of AI is small and concentrated. The assumed effect is large and general, and the gap between the two is where decisions like this get made.',
        ],
      },
      {
        kind: 'table',
        heading: 'What was assumed against what was true',
        intro:
          'The interesting column is the third one, because each of these was checkable before the announcement rather than after it.',
        columns: ['Assumed', 'Actual', 'How it could have been checked'],
        rows: [
          ['Call volumes fell', 'Volumes rose', 'The call volume report'],
          ['Bot absorbed the work', 'Staff on overtime', 'The overtime ledger'],
          ['Fewer people needed', 'Roles reinstated', 'Deflection rate per queue'],
        ],
      },
      {
        kind: 'prose',
        heading: 'Deflection is the number, and it is usually not measured',
        body: [
          'For any customer service automation the question is narrow and answerable: of the contacts that arrived, what proportion were fully resolved without a human, and did total contacts change.',
          'Both halves matter. A bot can resolve a third of contacts and still increase human workload, if it also increases total contacts by frustrating people into calling back, or if the third it resolves were the easy ones and what remains is uniformly hard. That second effect is well documented in the human factors literature: automation tends to absorb the routine cases and leave people a distilled residue of difficult ones.',
          'So a deflection rate without a total-contacts figure beside it is not evidence of anything. Neither is a deflection rate that counts a conversation as resolved because the customer gave up.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Two other cases worth knowing',
        body: [
          'An agent at Replit deleted a production database. The user reported: "I explicitly told it eleven times in ALL CAPS not to do this", and noted "There is no way to enforce a code freeze in vibe coding apps like Replit". The agent then incorrectly stated that rollback was impossible, which it was not. Instructions are not permissions, and an agent that can reach production will eventually act on production.',
          'Cursor\'s support bot invented a company policy that did not exist, and users cancelled over it. The co-founder confirmed "this is an incorrect response from a front-line AI support bot". A support bot speaks with the company\'s voice, and an invented policy is indistinguishable to a customer from a real one.',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'And a court has now said the obvious thing',
        body:
          'A German court held in May 2026 that a chatbot\'s statements bind its operator: "The chatbot is not to be regarded as a third party... It is part of the company\'s business organization, its statements are attributed to the operator." It added that "even correct programming does not preclude liability". Most English-language coverage of chatbot liability still stops at the Air Canada case from 2024, so this ruling is barely known outside Germany. The direction it points is not surprising: what your bot says, your company said.',
      },
      {
        kind: 'steps',
        heading: 'Before attributing a headcount decision to AI',
        intro:
          'Four checks. The bank case failed the first one, which is the cheapest.',
        steps: [
          {
            title: 'Measure the workload, not the deployment',
            body:
              'That a system is live tells you nothing about what it absorbed. Compare total contacts and human-handled contacts across the same period, before and after.',
          },
          {
            title: 'Check what is left rather than what was removed',
            body:
              'If automation took the easy cases, the remaining work is harder per item even if there is less of it. Average handling time on the residue is the number that shows this, and it usually rises.',
          },
          {
            title: 'Wait longer than feels necessary',
            body:
              'Novelty effects run both ways: customers try the bot, then route around it, or try it and come back. A fortnight of data is not a trend.',
          },
          {
            title: 'Write down what would falsify the claim',
            body:
              'Before announcing anything, state the number that would mean the efficiency did not materialise. If nobody can name one, the decision is not evidence-based, whatever the evidence looks like.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'The useful reading of all this',
        body: [
          'None of these cases shows that AI does not work. The voice bot handled calls, the coding agent wrote code, the support bot answered questions.',
          'What they show is that the organisational claim outran the measurement in every case, and the measurement was cheap and available. A call volume report, an overtime ledger, a permissions boundary, a policy the bot was actually allowed to state.',
          'That is a more useful conclusion than a failure statistic, because it is actionable. You cannot do anything with a percentage. You can check a call volume report before Friday.',
        ],
      },
    ],

    faqs: [
      {
        question: 'Did Commonwealth Bank really reverse AI-related redundancies?',
        answer:
          'Yes. It cut 45 customer service roles citing reduced call volumes from an AI voice bot, then reinstated them after it emerged that call volumes had risen and staff were working overtime. The bank said it "did not adequately consider all relevant business considerations when announcing the redundancies".',
      },
      {
        question: 'Is AI actually reducing customer service headcount?',
        answer:
          'Not visibly in the official statistics. ONS reports around half of businesses seeing no headcount impact from AI, and the Bank of England finds no material effect for most firms over three years. Where reductions do appear they concentrate in businesses using AI for operational change rather than as a tool.',
      },
      {
        question: 'What is a realistic deflection rate for a support bot?',
        answer:
          'We are not going to quote one, because the credible published figures are vendor-produced and the definition of a deflected contact varies enough to make comparison meaningless. Measure your own, and count a contact as deflected only if it was resolved rather than abandoned.',
      },
      {
        question: 'Can my company be liable for what its chatbot says?',
        answer:
          'A German court held in May 2026 that a chatbot is part of the operator\'s business organisation and its statements are attributed to the operator, adding that even correct programming does not preclude liability. An earlier Canadian case reached a similar practical result. Treat bot output as company statements.',
      },
      {
        question: 'How do I stop an agent touching production?',
        answer:
          'With permissions rather than instructions. The Replit case involved a user telling the agent eleven times in capitals not to act, and it acted. Read-only credentials, separate environments and tool-level restrictions are enforceable; prompts are not.',
      },
    ],

    publishedAt: '2026-10-12T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'Commonwealth Bank redundancy reversal, contemporaneous reporting',
        url: 'https://www.abc.net.au/news/',
        readOn: '2026-09-11',
        supports: 'The 45 roles, the call volume reversal and the bank\'s quoted statement.',
      },
      {
        label: 'OLG Hamm, I-4 UKl 3/25, judgment of 12 May 2026',
        url: 'https://www.justiz.nrw.de/',
        readOn: '2026-09-11',
        supports: 'That a chatbot is not a third party and its statements are attributed to the operator.',
      },
      {
        label: 'ONS, Artificial intelligence in UK businesses: 2023 to 2026',
        url: 'https://www.ons.gov.uk/businessindustryandtrade/business/businessservices/articles/artificialintelligenceinukbusinesses/2023to2026',
        readOn: '2026-09-12',
        supports: 'That around half of businesses report no headcount impact, and the Bank of England corroboration.',
      },
    ],

    limits: [
      'The widely quoted Klarna admission about lower service quality is deliberately absent. It traces to an interview we could not access, so only a repositioning statement is verifiable.',
      'These are individual documented cases, not a sample. They show that the failure mode exists and what it looks like, not how often it occurs.',
      'The German ruling is summarised from the judgment text and is not legal advice. Liability turns on facts and jurisdiction.',
      'No deflection benchmark appears here, because the credible published figures are vendor-produced and the definitions are not comparable.',
    ],

    cta: {
      heading: 'Deploying a support bot and want the numbers to hold up?',
      body: 'The measurement is the part that gets skipped, and it is the part that decides whether the claim survives contact with a union, a regulator or a board. We build the deflection measurement in rather than bolting it on afterwards.',
      buttonLabel: 'Talk about your bot',
      href: '/contact?service=chatbot-development',
    },

    related: ['what-the-official-statistics-measured', 'why-ai-failures-are-silent'],

    seo: {
      title: 'The Bank That Cut 45 Jobs for AI, Then Took It Back',
      description:
        'Commonwealth Bank cut roles citing AI-reduced call volumes that had actually risen. What it exposes about attributing headcount decisions to AI, and how to check.',
    },
  },

  {
    slug: 'why-ai-pilots-stall',
    cluster: 'ai-failure',
    title: 'Why AI Pilots Do Not Become Production Systems',
    navLabel: 'Why pilots stall',
    card: 'The gap between a demo that works and a system people depend on, and the five things that live in it.',

    answer:
      'A pilot proves the model can do the task on chosen examples. Production requires it to do the task on everything that arrives, including the cases nobody picked, with somebody owning it afterwards. The gap is not model quality. It is exception handling, evaluation, ownership, integration and the management attention to keep all four alive, and pilots are usually scoped to skip every one.',

    sections: [
      {
        kind: 'prose',
        heading: 'The funnel, taken seriously',
        body: [
          'The most cited report in enterprise AI gives a funnel that is more useful than its headline: 60% of organisations evaluated a tool, 20% reached pilot stage, and 5% reached production. Of those that piloted, roughly a quarter shipped.',
          'That is the interesting number, and the interesting question is what happened to the other three quarters. They did not fail because the model could not do the task. They had already proved it could: that is what the pilot was.',
        ],
      },
      {
        kind: 'prose',
        heading: 'A pilot is a demonstration, production is an obligation',
        body: [
          'The distinction matters more here than in ordinary software, because the thing being demonstrated is probabilistic.',
          'A pilot runs on examples somebody chose. Often they chose well and honestly, but they chose. Production runs on whatever arrives on a Tuesday, including the malformed, the ambiguous and the adversarial, and it runs while the person who built it is doing something else.',
          'Most of the work of shipping is in that difference, and almost none of it is in the model.',
        ],
      },
      {
        kind: 'table',
        heading: 'What a pilot skips',
        intro:
          'Each of these is optional in a pilot and mandatory in production. Together they are usually more work than the pilot was.',
        columns: ['', 'In the pilot', 'In production'],
        rows: [
          ['Inputs', 'Chosen examples', 'Whatever arrives'],
          ['Exceptions', 'Noted and set aside', 'The bulk of the work'],
          ['Quality', 'It looked right', 'A score that moves'],
          ['Failure', 'Somebody notices', 'Something has to notice'],
          ['Ownership', 'The person who built it', 'Somebody whose job it is'],
          ['Cost', 'Not measured', 'Per run, with a ceiling'],
        ],
      },
      {
        kind: 'prose',
        heading: 'The exception rate decides everything, and it is knowable early',
        body: [
          'The academic work on process automation converges on a short list of properties that predict whether a task automates well: high volume, clear rules, few exceptions, a stable process and structured data. The one that kills pilots is exceptions.',
          'If 10% of cases need a human, you have not automated the task, you have built a triage system that needs a human rota, an escalation path and a way for the human to see what the machine already did. That is a different and larger project than the one that was approved.',
          'The honest move is to measure the exception rate during the pilot rather than to note exceptions and move on. It is the number that tells you what you are actually building.',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'The caveat on those criteria',
        body:
          'Two independent academic groups converge on that list, so it is not folklore. But the criteria were derived by aggregating what the literature asserts and then demonstrated on case studies, rather than validated against a population that includes failures. A systematic review of 63 papers states the reason plainly: the literature covers only successful projects. So treat the list as a well-documented checklist rather than a tested predictor, and be suspicious of anyone who quotes you a success rate from this field.',
      },
      {
        kind: 'prose',
        heading: 'The measured return arrives after the investment, not with it',
        body: [
          'There is a robust finding in economics that explains why pilots look worse than they are at exactly the wrong moment.',
          'Adopting a general purpose technology requires complementary investment: redesigning the process, retraining people, changing who decides what. Those costs are immediate and invisible in the accounts, while the benefits arrive later. Measured productivity therefore dips before it rises, which is known as the productivity J-curve.',
          'The practical consequence is that the question "will this pay for itself?" is the wrong one to ask at pilot stage. The right question is whether you have the management capacity to make the complementary investment, because that is what converts the dip into a return. A small organisation with no spare attention is genuinely worse placed here, and that is a reason for caution rather than a failure of nerve.',
        ],
      },
      {
        kind: 'steps',
        heading: 'How to scope a pilot that can actually ship',
        intro:
          'The aim is to find out what production would cost, not to prove the model works. You already know the model works.',
        steps: [
          {
            title: 'Run it on unchosen inputs from the start',
            body:
              'Take a random slice of real cases rather than a curated set. The pilot gets less impressive and much more informative, and the drop between the two is the thing you needed to know.',
          },
          {
            title: 'Count exceptions as a rate, not as anecdotes',
            body:
              'What proportion needed a human, and what did the human have to do. If that rate is high, the project you are approving is a human-in-the-loop workflow, which is fine, but it should be approved as one.',
          },
          {
            title: 'Build the evaluation set during the pilot',
            body:
              'Real questions from the people who will use it, with known correct answers, including questions the system should refuse. It is the only way to tell later whether a change made things better, and it is much cheaper to build now.',
          },
          {
            title: 'Name the owner before you ship',
            body:
              'Not the builder, the owner: whoever is responsible when the score drops in March. A system with no named owner degrades silently, which is the most common way a working pilot becomes an abandoned tool.',
          },
          {
            title: 'Cost a real run and put a ceiling on it',
            body:
              'Tokens per completed task at realistic volume, plus the failure cases, which are the expensive ones. A per-run budget is what stops a loop while it is still cheap.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'The question we ask first',
        body: [
          'We build agentic AI and retrieval systems, and the first question we ask about a stalled pilot is not about the model. It is who owns this in March.',
          'It sounds like a procedural question and it is a diagnostic one. If there is a name, the other problems are usually solvable, because someone is motivated to solve them. If there is no name, the exception handling never gets built, the evaluation set never gets written, and the system degrades quietly until somebody quietly stops using it.',
          'The second question is the exception rate on unchosen inputs, because it tells us what we are actually being asked to build. A high rate does not mean no project. It means the project is a human-in-the-loop workflow with a queue, a rota and an interface for the human, which is a fine thing to build and a different thing to price.',
        ],
      },
      {
        kind: 'prose',
        heading: 'When the right answer is to stop',
        body: [
          'Some pilots should not proceed, and a pilot that concludes "no" quickly is a success rather than a waste. It cost a few weeks and saved the integration, the rota and the maintenance.',
          'The signals worth stopping on are specific: an exception rate that stays high on unchosen inputs, a task where being wrong is expensive and detection is hard, a process that changes every quarter so the system needs rebuilding each time, and the absence of anyone willing to own it afterwards.',
          'The last one is the most common and the least discussed. Plenty of pilots stall not because they failed but because when the question "who runs this now?" was asked, nobody answered.',
        ],
      },
    ],

    faqs: [
      {
        question: 'Why do AI pilots not reach production?',
        answer:
          'Rarely because the model cannot do the task, since the pilot proved it can. The usual causes are a high exception rate on real inputs, no evaluation set so nobody can tell whether it is still working, no named owner after launch, and integration work that was never scoped.',
      },
      {
        question: 'What proportion of AI pilots reach production?',
        answer:
          'The most cited report gives 20% reaching pilot stage and 5% reaching production, which is about a quarter of pilots. That figure comes from 52 interviews and 153 conference attendees, so treat it as indicative rather than measured.',
      },
      {
        question: 'What exception rate makes a task worth automating?',
        answer:
          'There is no published threshold worth quoting, and the research base cannot produce one because it studies only successful projects. What matters is that you measure your own rate on unchosen inputs, and that you scope the human handling of exceptions as part of the project rather than as an afterthought.',
      },
      {
        question: 'Why does the return take so long to appear?',
        answer:
          'Because adopting a general purpose technology needs complementary investment in process and people, which costs now and pays later. Measured productivity dips before it rises. The relevant question at pilot stage is whether you have the management capacity for that investment.',
      },
      {
        question: 'Should we run more pilots or fewer?',
        answer:
          'Fewer and deeper, scoped to answer what production would cost rather than whether the model works. A pilot that runs on curated inputs and skips exceptions, evaluation and ownership has not reduced your uncertainty about the thing that actually decides the outcome.',
      },
    ],

    publishedAt: '2026-10-13T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'The GenAI Divide: State of AI in Business 2025, MIT NANDA (v0.1, July 2025)',
        url: 'https://cloudelligent.com/wp-content/uploads/2026/02/v0.1_State_of_AI_in_Business_2025_Report.pdf',
        readOn: '2026-09-11',
        supports: 'The 60/20/5 funnel and its stated sample.',
      },
      {
        label: 'Wellmann et al., A framework to evaluate the viability of robotic process automation, BPM 2020',
        url: 'https://arxiv.org/abs/2007.10900',
        readOn: '2026-09-11',
        supports: 'The task criteria: determinism, exception rate, maturity and structured data.',
      },
      {
        label: 'Wewerka and Reichert, Robotic Process Automation: A Systematic Literature Review',
        url: 'https://arxiv.org/abs/2012.11951',
        readOn: '2026-09-11',
        supports: 'That the literature covers only successful projects, and the convergent criteria.',
      },
      {
        label: 'Brynjolfsson, Rock and Syverson, The Productivity J-Curve, AEJ Macroeconomics 13(1), 2021',
        url: 'https://www.nber.org/system/files/working_papers/w25148/w25148.pdf',
        readOn: '2026-09-11',
        supports: 'That complementary intangible investment causes measured productivity to fall before it rises.',
      },
    ],

    limits: [
      'The 60/20/5 funnel comes from a report with a convenience sample of 52 interviews and 153 conference attendees. It is indicative of shape, not a measurement of rates.',
      'The task-suitability criteria are documented consensus rather than validated predictors, because the literature they come from studies only successful projects.',
      'No exception-rate threshold is given, deliberately. The circulating figures are vendor-produced and none survived tracing.',
      'This is about why pilots stall organisationally. Model selection and prompt design are different problems and are not covered.',
    ],

    cta: {
      heading: 'Have a pilot that works and will not ship?',
      body: 'Usually the blocker is exceptions, ownership or integration rather than the model, and all three are findable in a short review. We would rather tell you a project should stop than run it to a conclusion you already suspect.',
      buttonLabel: 'Get it reviewed',
      href: '/contact?service=agentic-ai-development',
    },

    related: ['the-95-percent-statistic-does-not-say-what-you-think', 'why-ai-failures-are-silent'],

    seo: {
      title: 'Why AI Pilots Do Not Become Production Systems',
      description:
        'The gap between a demo and a system people depend on is exceptions, evaluation, ownership and integration. What a pilot skips, and how to scope one that can ship.',
    },
  },

  {
    slug: 'should-your-business-have-an-ai-policy',
    cluster: 'ai-failure',
    title: 'Should Your Business Have an AI Policy, and What Goes In It',
    navLabel: 'Writing an AI policy',
    card: 'Most AI policies are legal boilerplate nobody reads. The version that matters is one page and answers four questions.',

    answer:
      'Yes, and it should be shorter than the ones being sold to you. The policies that circulate are acceptable-use documents that restate the obvious. The version worth having answers four operational questions: which tools are approved and on what billing tier, what data may never be pasted anywhere, what happens to feedback buttons, and who to ask when something is not covered. The reason to write it is that your staff have already decided in your absence.',

    sections: [
      {
        kind: 'prose',
        heading: 'The decision has already been made for you',
        body: [
          'The UK Office for National Statistics found that over half of employees, 55 percent, report using AI for work or education, against around 35 percent of businesses reporting use of any AI technology.',
          'Employee adoption runs well ahead of organisational adoption. So the question is not whether AI is in your business, it is whether anybody has decided which tools and on what terms.',
          'That framing matters, because a policy written to control adoption is fighting something that already happened. A policy written to make the existing use safe is doing something achievable.',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'The specific trap worth writing a policy about',
        body:
          'Google\'s Gemini API terms split the same API into two different data regimes by billing status alone. On the unpaid tier, Google states it "uses the content you submit to the Services and any generated responses to provide, improve, and develop Google products and services", and that "human reviewers may read, annotate, and process your API input and output". On the paid tier it commits the opposite way. Same endpoint, same SDK, same code. Nothing in the developer experience signals the boundary, so a prototype on a free key, or a project whose billing lapses, is quietly inside the human-review regime.',
      },
      {
        kind: 'prose',
        heading: 'What most policies get wrong',
        body: [
          'The common template is an acceptable-use document: do not use AI for anything unlawful, check the output, be professional. None of that is wrong and none of it changes a decision anybody makes on a Tuesday afternoon.',
          'It also tends to be framed around a fear that turns out to be misdirected. The worry is usually that a vendor will train on company data, and for paid business tiers that is not what the terms say: Anthropic\'s commercial terms state it "may not train models on Customer Content from Services", and OpenAI states that since March 2023 API data is not used for training unless you opt in.',
          'The real exposures are narrower and more specific: free tiers with different terms, feedback buttons that pull a whole conversation into training scope, and staff pasting things into consumer chat apps where the defaults genuinely do differ.',
        ],
      },
      {
        kind: 'table',
        heading: 'The four questions a useful policy answers',
        intro:
          'If your policy answers these, the length does not matter. If it does not, the length definitely does not matter.',
        columns: ['Question', 'Why it is the one that matters'],
        rows: [
          ['Which tools, on which tier?', 'Terms differ by tier more than by vendor'],
          ['What must never be pasted anywhere?', 'The only rule people will actually remember'],
          ['What happens to feedback buttons?', 'The documented exception to no-training defaults'],
          ['Who decides the cases not covered?', 'Otherwise everyone decides individually'],
        ],
      },
      {
        kind: 'prose',
        heading: 'Question one, and the thing to get right',
        body: [
          'Name the approved tools and the tier. Not the vendor, the tier, because that is where the terms actually differ.',
          'The same company can apply opposite defaults to two products. OpenAI\'s own documentation states both halves: for consumer products, "we may use your content to train our models", and for business, "by default, we do not train on any inputs or outputs from our products for business users, including ChatGPT Business, ChatGPT Enterprise, and the API".',
          'So a policy that says the company uses a named vendor has not said anything useful. One that says staff use the business tier, on the company account, and that personal consumer accounts are not for company work, has said the thing that matters.',
          'Extend it to development: production, staging and CI all on billed projects, because a free-tier key in a test pipeline is still processing whatever your test fixtures contain.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Question two, which is the only rule anyone remembers',
        body: [
          'A list of things that never go into any AI tool regardless of tier. Keep it to a handful of categories, because a long list is not remembered and a remembered list is the only kind that works.',
          'For most businesses that is customer personal data beyond what is needed, credentials of any kind, anything under a confidentiality obligation to a third party, and anything relating to an unannounced commercial matter.',
          'Then give the reason in one line. People follow rules they understand and route around rules they think are arbitrary, and this one has a good reason: even where a vendor does not train on it, the data has left your environment and is retained for a period.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Question three is the exception nobody documents',
        body: [
          'Both major vendors are explicit that feedback is treated differently from ordinary use. OpenAI states that "if you choose to provide feedback, the entire conversation associated with that feedback may be used to train our models", and Anthropic applies the same treatment to thumbs-up and thumbs-down.',
          'So a developer clicking a rating button in a console is a genuine disclosure path, and it is not covered by any of the no-training defaults people rely on.',
          'The policy line is short: do not use feedback controls in tools handling sensitive material, and if you build an application with a feedback button, decide deliberately what it sends.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Question four, and why it is not a formality',
        body: [
          'Every policy meets a case it did not anticipate within a month. If there is no named person to ask, each employee resolves it privately and the policy becomes decorative.',
          'A name, a channel, and a commitment to answer quickly. The last part is what determines whether people use it: a route that takes a week is a route people stop using after the first time.',
          'It is also how the policy improves. The questions people ask are the gaps, and a policy that is revised twice in its first quarter is working rather than failing.',
        ],
      },
      {
        kind: 'steps',
        heading: 'Writing it, in about an hour',
        intro:
          'Deliberately small. A one-page policy that people read beats a ten-page one that sits in a folder.',
        steps: [
          {
            title: 'Find out what is already being used',
            body:
              'Ask, without consequences attached. You will get a longer list than expected, and it is the actual scope of your policy. Writing rules for tools nobody uses while missing the ones they do is the common failure.',
          },
          {
            title: 'Pick the approved tools and name the tier',
            body:
              'Business or enterprise tier, on company accounts. Then check that development environments are billed too, because the free-tier trap is a developer problem more than a staff one.',
          },
          {
            title: 'Write the never-paste list, and keep it short',
            body:
              'A handful of categories with a one-line reason. Long lists are not remembered and unremembered rules do not operate.',
          },
          {
            title: 'Decide the feedback question',
            body:
              'For tools staff use, and for anything you build. This is the exception to the defaults and it is almost never in a template policy.',
          },
          {
            title: 'Name the person to ask, and a channel',
            body:
              'With an undertaking to answer in a day. Then expect to revise the policy as the questions come in, which is the policy working.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'What we see in practice',
        body: [
          'We build AI systems for clients, so we end up reading a lot of client AI policies, usually because a project has to comply with one.',
          'The pattern is that they are long, legal, and silent on the two things that actually matter: which tier, and what happens to data in development environments. We have been handed policies forbidding staff from using consumer chat tools while the company\'s own prototype ran on a free API key.',
          'What we suggest instead is the one page above, plus a line in the policy saying that any system we build states which tier it runs on and what it retains. That makes the policy checkable rather than aspirational, which is the difference between a document and a control.',
          'And we say plainly that the fear most policies are written around, that a vendor will train on your data, is mostly not what the paid terms say. Redirecting that concern towards free tiers, feedback buttons and retention is a better use of the same anxiety.',
        ],
      },
    ],

    faqs: [
      {
        question: 'Does my business need an AI policy?',
        answer:
          'Almost certainly, because your staff are already using these tools. ONS found 55 percent of employees reporting AI use for work against around 35 percent of businesses reporting any AI technology, so the decision has been made in your absence unless you make it deliberately.',
      },
      {
        question: 'What should an AI policy actually say?',
        answer:
          'Four things: which tools on which billing tier, what data must never be pasted into any of them, what happens to feedback buttons, and who to ask about cases not covered. Anything beyond that is usually restating the obvious at length.',
      },
      {
        question: 'Will the vendor train on our company data?',
        answer:
          'Not on paid business tiers, by their own terms. Anthropic states it may not train on customer content from its services, and OpenAI has not trained on API data since March 2023 absent opt-in. The exposure is narrower: free tiers, feedback submissions and consumer accounts.',
      },
      {
        question: 'Why does the billing tier matter so much?',
        answer:
          'Because terms differ by tier more than by vendor. Google\'s unpaid Gemini tier permits product development and human review of your inputs on the same endpoint the paid tier protects, and nothing in the code signals the difference.',
      },
      {
        question: 'What about feedback buttons?',
        answer:
          'They are the documented exception to the no-training defaults. OpenAI states that providing feedback may put the entire associated conversation into training scope, and Anthropic treats thumbs-up and thumbs-down the same way. Decide deliberately rather than inheriting the default.',
      },
    ],

    publishedAt: '2026-11-08T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'Google Gemini API terms of service',
        url: 'https://ai.google.dev/gemini-api/terms',
        readOn: '2026-09-11',
        supports: 'The different paid and unpaid tier data regimes, including product development and human review on the unpaid tier.',
      },
      {
        label: 'Anthropic Commercial Terms of Service',
        url: 'https://www.anthropic.com/legal/commercial-terms',
        readOn: '2026-09-11',
        supports: 'That Anthropic may not train models on customer content from its services.',
      },
      {
        label: 'OpenAI, how your data is used to improve model performance',
        url: 'https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance',
        readOn: '2026-09-11',
        supports: 'The consumer and business defaults, and that feedback may put the whole conversation into training scope.',
      },
      {
        label: 'ONS, Artificial intelligence in UK businesses: 2023 to 2026',
        url: 'https://www.ons.gov.uk/businessindustryandtrade/business/businessservices/articles/artificialintelligenceinukbusinesses/2023to2026',
        readOn: '2026-09-12',
        supports: 'That 55 percent of employees report using AI for work against about 35 percent of businesses reporting any AI technology.',
      },
    ],

    limits: [
      'This is an operational policy framework, not legal advice. Sector regulation, employment law and data protection obligations may require more than the four questions here.',
      'Vendor terms change. Everything quoted was read in September 2026 and each document carries its own effective date.',
      'It does not cover the separate question of what you must disclose to customers about AI use, which varies by jurisdiction and sector.',
      'We build AI systems and therefore benefit from clients adopting AI. The policy recommended here is shorter and less restrictive than most, which is worth weighing.',
    ],

    cta: {
      heading: 'Writing one and want it to be checkable?',
      body: 'The test is whether a policy lets someone verify compliance rather than assert it. Naming tiers and retention makes it checkable; naming vendors does not. We are happy to look at a draft and say which parts do any work.',
      buttonLabel: 'Have a draft reviewed',
      href: '/contact?service=agentic-ai-development',
    },

    related: ['who-is-liable-when-the-chatbot-is-wrong'],

    seo: {
      title: 'Should Your Business Have an AI Policy, and What Goes In It',
      description:
        'Most are boilerplate nobody reads. The version that works is one page answering four questions, starting with which billing tier your tools run on.',
    },
  },

  {
    slug: 'who-is-liable-when-the-chatbot-is-wrong',
    cluster: 'ai-failure',
    title: 'Who Is Liable When Your Chatbot Is Wrong?',
    navLabel: 'Chatbot liability',
    card: 'A German court held an operator liable even though the training data was undisputedly correct. That judgment is now final.',

    answer:
      'Every court that has been asked has held the operator responsible. A German appellate court ruled in May 2026 that a chatbot "is not a third party" and that its statements are the operator\'s own commercial acts, and held the business liable even though its training data contained no false information. A Canadian tribunal called the separate-entity argument "a remarkable submission". Under UK law a statement made to a consumer by or on behalf of a trader becomes a contractual term, without any need to prove fault.',

    sections: [
      {
        kind: 'prose',
        heading: 'The defence that has never worked',
        body: [
          'When a chatbot says something untrue and a customer relies on it, businesses have tried arguing that the bot is somehow separate: that it acted autonomously, that its output is unpredictable, that the company cannot be held to something a machine generated.',
          'No court in any jurisdiction we could find has accepted it. What follows is what they said instead, and one of the judgments is considerably stronger than the coverage suggests.',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'The ruling that matters most, and why',
        body:
          'In May 2026 the Oberlandesgericht Hamm held that a clinic was liable for its website chatbot stating that its directors held specialist medical titles they did not hold, two of which do not exist. The detail that makes this important: it was undisputed that the chatbot had been trained only on the company\'s own website and FAQs, which contained no false statements. Clean training data, and the operator was liable anyway. The court held that the chatbot "is not a third party" and that its statements were the defendant\'s own commercial acts.',
      },
      {
        kind: 'prose',
        heading: 'What the court actually reasoned',
        body: [
          'The judgment is worth reading for the reasoning rather than the outcome, because the reasoning is what transfers.',
          'On attribution, the court held that the chatbot "constitutes (merely) a technical means which the defendant used to communicate with potential customers and over which it possessed sufficient power of control", and stated generally that deploying artificial intelligence constitutes "commercial acts of its operator, because the operator has sufficient influence over the system and sets it in motion". Our translations.',
          'The black box argument, that nobody can see why a model produced a given output, was rejected explicitly. So was the argument that correct programming should exonerate: the court\'s own press release records that even if the chatbot had been programmed exclusively with correct data, the operator bears responsibility for the false statements.',
        ],
      },
      {
        kind: 'prose',
        heading: 'The evidential point that should worry operators',
        body: [
          'One element of the reasoning deserves separate attention because it inverts an instinct.',
          'The court took the fact that the defendant fixed the problem easily after receiving a warning letter, by adding a prompt instruction and a keyword filter, as evidence that it had the power to prevent it in the first place.',
          'So prompt remediation was not treated as mitigation. It was treated as proof of control, and therefore of responsibility. That is worth knowing before drafting a response to a complaint about your own bot.',
        ],
      },
      {
        kind: 'note',
        tone: 'info',
        heading: 'A correction to what you have probably read',
        body:
          'Nearly all coverage of this judgment from May and early June 2026 reports it as not yet final, and that was accurate when written. The court granted leave to appeal to the Bundesgerichtshof and the appeal was never lodged, so the revision deadline expired. The official judiciary database now records the judgment as rechtskraeftig, final, and the winning party\'s own case page confirms it. The honest qualification is different: an appellate court judgment binds the parties and does not bind other German courts, and there is still no supreme court authority on the question anywhere.',
      },
      {
        kind: 'prose',
        heading: 'The Canadian case, weighed properly',
        body: [
          'The case most cited in English is Moffatt v Air Canada, where an airline chatbot described a bereavement fare policy that did not exist.',
          'The tribunal\'s response to the airline\'s argument is quotable: "In effect, Air Canada suggests the chatbot is a separate legal entity that is responsible for its own actions. This is a remarkable submission. While a chatbot has an interactive component, it is still just a part of Air Canada\'s website."',
          'It also disposed of the defence that the correct information was available elsewhere on the site: "it does not explain why customers should have to double-check information found in one part of its website on another part of its website."',
          'Two corrections to how this is usually reported. The award is commonly given as 650.88 Canadian dollars, and the ordered total is 812.02 once interest and fees are included. And this is a small claims tribunal decision, the lowest rung, binding on nobody but the parties. It is quoted as though it settled something and it did not.',
        ],
      },
      {
        kind: 'prose',
        heading: 'The UK position, which is stronger than people expect',
        body: [
          'There is no decided UK case on chatbots, so what follows is statutory reading rather than case law, and we say so plainly.',
          'The most useful provision is section 50 of the Consumer Rights Act 2015, which treats a services contract as including as a term "anything that is said or written to the consumer, by or on behalf of the trader, about the trader or the service", where the consumer takes it into account in deciding to contract or in a later decision about the service.',
          'That converts your bot\'s statement into a contractual term. A consumer relying on it sues for breach of contract and never has to prove negligence, intent or knowledge on your part. It is a considerably easier claim than the tort route that overseas cases have run.',
          'One drafting consequence: under section 50(2), a qualification only counts if it was said to the consumer by the trader on the same occasion. A disclaimer in your website terms, not surfaced in the chat, is unlikely to qualify.',
          'Separately, the Digital Markets, Competition and Consumers Act 2024 makes it a misleading action to provide false or misleading information, and provides that it is immaterial whether the trader acts personally or through another acting on its behalf. That is public enforcement with penalties up to ten percent of global turnover, and it reaches post-sale support as well as sales.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Where it is genuinely unsettled',
        body: [
          'Being honest about the limits is more useful than overstating a trend.',
          'There is no supreme court authority anywhere. No German federal court ruling, no CJEU decision, and no UK case at any level on chatbots.',
          'The United States is actively contradictory at trial level. One court granted summary judgment for an AI provider and credited its disclaimers, reasoning that liability merely because a system is known to make mistakes "would impose a standard of strict liability, not negligence". Another, a year later, refused to credit disclaimers at the pleadings stage because they were not before the court, describing the area as "a new frontier for defamation law". Both are trial-level and one is interlocutory.',
          'And the German court expressly left open whether the analysis changes when the user\'s question is tendentious or leading. In that case the questions were ordinary.',
        ],
      },
      {
        kind: 'steps',
        heading: 'What to do about it',
        intro:
          'Five things, and the first is the one the German judgment makes unavoidable.',
        steps: [
          {
            title: 'Decide what your bot must never state',
            body:
              'Qualifications, prices, policy entitlements, safety or medical claims, anything with a legal consequence. Constrain those at the tool level rather than by instruction, because an instruction is a preference and a constraint is a fact.',
          },
          {
            title: 'Put the disclaimer in the conversation',
            body:
              'Not in the site terms. Under UK law a qualification only counts if made on the same occasion, so a notice the customer never saw during the chat is unlikely to help.',
          },
          {
            title: 'Anticipate the obvious questions',
            body:
              'The German court held the operator could and should have anticipated that patients would ask about qualifications and that the bot might hallucinate an answer. Whatever your equivalent question is, test it.',
          },
          {
            title: 'Log what the bot said',
            body:
              'You will need to know what was stated and to whom. Both cases turned on specific statements, and an operator who cannot reconstruct its own bot\'s output is in a weak position from the start.',
          },
          {
            title: 'Honour it, then fix it',
            body:
              'Where a bot has promised something small, honouring it is usually cheaper than the dispute. The German judgment also means fixing it quickly does not read as mitigation, so fix it because it is right rather than because it helps.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'How this changes what we build',
        body: [
          'We build chatbots, so this line of cases is about our clients\' exposure and our design decisions.',
          'The practical consequence is that anything with a legal consequence gets constrained rather than instructed. Prices, entitlements and qualifications come from a lookup that can only return true values, not from a model asked politely to be accurate. The German judgment is the clearest possible argument for that approach: the training data was clean and the model still generated a false claim.',
          'We also push for the bot to be able to say it does not know, and for a handover that arrives before the customer is frustrated. A bot that declines to answer a question about entitlements is doing its job.',
          'And where a client wants the bot to handle something we think carries real liability, we say so and suggest it routes to a person instead. That is less impressive as a demonstration and it is the version we would want if it were our business.',
        ],
      },
    ],

    faqs: [
      {
        question: 'Is my company liable for what its chatbot says?',
        answer:
          'On the authority so far, yes. A German appellate court held that a chatbot is not a third party and its statements are the operator\'s own commercial acts, and a Canadian tribunal called the separate-entity argument remarkable. No court in any jurisdiction we found has accepted that a business is not bound by its own bot.',
      },
      {
        question: 'Does it help if the training data was correct?',
        answer:
          'It did not in the German case, which is what makes that judgment important. The training corpus was undisputedly free of the false claim and the operator was liable anyway, because liability attached to deployment and control rather than to data hygiene.',
      },
      {
        question: 'Will a disclaimer protect me?',
        answer:
          'Possibly, and not if it is buried. Under UK law a qualification counts only if made to the consumer on the same occasion, so it needs to be in the conversation. Note also that one German court rejected the argument that consumers know AI is unreliable, and one US court declined to credit disclaimers at the pleadings stage.',
      },
      {
        question: 'Is the German ruling final?',
        answer:
          'Yes. Leave to appeal to the federal court was granted and never used, and the official judiciary database records the judgment as final. Most coverage from May 2026 says otherwise because it was written before the deadline expired. It binds the parties and does not bind other courts.',
      },
      {
        question: 'What is the exposure in the UK?',
        answer:
          'Two routes. A statement made to a consumer by or on behalf of a trader becomes a contractual term under section 50 of the Consumer Rights Act 2015, so a consumer sues for breach without proving fault. Separately, misleading information is a public enforcement matter under the DMCCA with penalties up to ten percent of global turnover.',
      },
    ],

    publishedAt: '2026-11-11T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'OLG Hamm, judgment of 12 May 2026, 4 UKl 3/25',
        url: 'https://nrwe.justiz.nrw.de/olgs/hamm/j2026/4_UKl_3_25_Urteil_20260512.html',
        readOn: '2026-09-12',
        supports: 'The attribution holding, that the chatbot is not a third party, the rejection of the black box and correct-programming defences, and the finality of the judgment.',
      },
      {
        label: 'Moffatt v Air Canada, 2024 BCCRT 149',
        url: 'https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html',
        readOn: '2026-09-12',
        supports: 'The separate-entity passage at paragraph 27, the elsewhere-on-the-site passage at 28, and the ordered total of CAD 812.02 at paragraph 44.',
      },
      {
        label: 'Consumer Rights Act 2015, section 50',
        url: 'https://www.legislation.gov.uk/ukpga/2015/15/section/50',
        readOn: '2026-09-12',
        supports: 'That a statement made to a consumer by or on behalf of a trader is treated as a term of the contract, and the same-occasion requirement for qualifications.',
      },
      {
        label: 'Digital Markets, Competition and Consumers Act 2024, sections 225 and 226',
        url: 'https://www.legislation.gov.uk/ukpga/2024/13/section/226',
        readOn: '2026-09-12',
        supports: 'That providing false or misleading information is a misleading action and that acting through another on the trader\'s behalf is immaterial.',
      },
    ],

    limits: [
      'This is general information about decided cases and statutory provisions, not legal advice. Liability turns on facts and jurisdiction.',
      'German quotations are translated by us from the judgment and the court\'s press release. The German text is the authoritative version.',
      'There is no supreme court authority anywhere, no CJEU ruling, and no decided UK case on chatbots. The UK section is statutory reading rather than case law and is labelled as such.',
      'The Canadian decision is a small claims tribunal ruling that binds only the parties, despite how widely it is cited.',
    ],

    cta: {
      heading: 'Deploying a bot that talks about prices or entitlements?',
      body: 'The design answer is to constrain rather than instruct: anything with a legal consequence should come from a lookup that can only return true values. That is a short conversation and it is much cheaper than the alternative conversation.',
      buttonLabel: 'Talk about the design',
      href: '/contact?service=chatbot-development',
    },

    related: ['should-your-business-have-an-ai-policy', 'the-ai-redundancy-that-was-reversed'],

    seo: {
      title: 'Who Is Liable When Your Chatbot Is Wrong?',
      description:
        'A German court held an operator liable despite undisputedly clean training data, and that judgment is now final. What every court has said, and the UK position.',
    },
  },
];
