import type { Post } from './types';

/**
 * Category 3 of research/CATALOGUE.md: automate or hire.
 *
 * 1,116 queries on automation, plus a small but sharp cluster on spreadsheet
 * pain. What makes this category winnable is that it has peer-reviewed
 * economics behind it, and the findings are genuinely contrarian: the sales
 * pitch says automation replaces expensive people, and the best available
 * evidence says the measured gains land on the newest ones.
 *
 * Note the scepticism demand: "why is automation bad" at 26 hits and "bad
 * things about automation" at 24. Nobody is serving that reader.
 */
export const AUTOMATE_OR_HIRE_POSTS: Post[] = [
  {
    slug: 'when-automation-actually-pays',
    cluster: 'automate-or-hire',
    title: 'When Automation Actually Pays, and When It Quietly Loses Money',
    navLabel: 'When automation pays',
    card: 'The economics say automating a task your staff do well and cheaply is the textbook way to lose money on it.',

    answer:
      'Automation pays in proportion to the cost it saves, not to how impressive it is. The peer-reviewed version of this is blunt: the technologies that damage employment and productivity are not the brilliant ones but the mediocre ones, because a small productivity gain does not offset the displacement. The practical test is whether your people are expensive relative to how good they are at the specific task, and whether the machine is good relative to what it costs.',

    sections: [
      {
        kind: 'prose',
        heading: 'The question is not what can be automated',
        body: [
          'Almost anything can be automated badly. The question is which automation returns more than it costs, and that has a real answer in the economics literature rather than in a vendor\'s readiness quiz.',
          'The framework worth knowing comes from Acemoglu and Restrepo, and it starts by splitting the effect of automation into two parts that pull in opposite directions.',
        ],
      },
      {
        kind: 'note',
        tone: 'info',
        heading: 'The decomposition, in the authors\' words',
        body:
          '"Effect of automation on labor demand = Productivity effect + Displacement effect." And the consequence they draw from it: "Automation therefore increases the size of the pie, but labor gets a smaller slice. There is no guarantee that the productivity effect is greater than the displacement effect; some automation technologies can reduce labor demand even as they raise productivity."',
      },
      {
        kind: 'prose',
        heading: 'So-so technology is the trap, and it is the common case',
        body: [
          'The counterintuitive result follows directly: "contrary to a common presumption in popular debates, it is not the brilliant automation technologies that threaten employment and wages, but so-so technologies that generate small productivity improvements."',
          'A brilliant automation does the task far better or far cheaper, so the productivity gain is large enough to be worth the disruption. A so-so automation does the task slightly worse for slightly less, and the displacement happens anyway. The named example in the paper is automated customer service, which displaced people while being "generally deemed to be low quality and thus unlikely to have generated large productivity gains".',
          'That is most business automation. Not because the tools are bad, but because the tasks chosen are usually the ones that look automatable rather than the ones where the cost saving is large.',
        ],
      },
      {
        kind: 'prose',
        heading: 'The mechanism gives you a test',
        body: [
          'The paper states where the gain actually comes from: "The productivity effect of automation is therefore proportional to cost-savings obtained from such substitution. The greater is the productivity of labor in tasks being automated relative to its wage and the smaller is the productivity of capital in these tasks relative to the rental rate of capital, the more limited the productivity gains from automation will be."',
          'Unpacked into something you can apply: automation pays when your people are NOT especially good at this specific task relative to what you pay them, and when the machine IS good relative to what it costs.',
          'Which means the losing case is precise and easy to walk into. You take a task your experienced staff do quickly and accurately, replace it with a tool that does it adequately, and pay for the tool, the integration and the exception handling. Nobody set out to do that. It is what happens when the task is chosen because it is visible rather than because it is expensive.',
        ],
      },
      {
        kind: 'table',
        heading: 'The four cases, and which one you are in',
        intro:
          'The columns are the two variables from the mechanism above. Most failed automation sits in the bottom right.',
        columns: ['', 'Machine is good at it', 'Machine is adequate at it'],
        rows: [
          ['People are slow or error-prone at it', 'Automate. Largest gain available', 'Probably worth it. Measure first'],
          ['People are fast and accurate at it', 'Marginal. Check the real time saved', 'The losing case. Do not'],
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'The result that surprises people most',
        body:
          'The same paper: "When wages are high and labor is scarce, automation will generate a strong productivity effect and will tend to raise labor demand. When wages are low and labor is abundant, automation will bring modest productivity benefits and could end up reducing labor demand." The same tool is a good purchase for a business that cannot hire and a poor one for a business with cheap labour available. This cuts against how automation is usually sold in lower-wage markets, and it is worth sitting with if that is where you operate.',
      },
      {
        kind: 'prose',
        heading: 'What this does not say',
        body: [
          'It does not say automation is bad, and the paper is explicit that automation raises total output. The argument is about distribution and about which specific automations are worth doing.',
          'It also does not say you should only automate where people are bad. Plenty of automation is worth doing for reliability, auditability or because the work happens at 3am, and none of that is a cost-saving argument. Just be clear which argument you are making, because the cost-saving one has a test and the others do not.',
          'And it is a framework rather than a forecast. It tells you which direction the effect runs, not how large it will be in your business. That part you have to measure.',
        ],
      },
      {
        kind: 'prose',
        heading: 'What this looks like in the work',
        body: [
          'We build workflow automation, so we see which proposals arrive already in the losing quadrant, and there is a pattern to it.',
          'The task is almost always chosen because it is visible rather than because it is expensive. Somebody watches a colleague copy data between two systems and thinks that should be automated, which it probably should. But the copying takes four minutes a day and the integration takes three weeks, and nobody multiplied before deciding.',
          'The tasks that actually pay are usually duller and less visible: the reconciliation nobody mentions because it happens at month end, the report that takes a morning because the data comes from four places. Those have volume, they are error-prone under time pressure, and they are exactly what the mechanism above predicts.',
          'This is why the first thing we ask for is not a description of the process but a number: how long it takes and how often it happens. It settles more of these conversations than anything either side could argue.',
        ],
      },
      {
        kind: 'steps',
        heading: 'Applying this to a real decision',
        intro:
          'Four steps, and the first one eliminates most candidates before you look at a single tool.',
        steps: [
          {
            title: 'Price the task as it is done now',
            body:
              'Time per item times loaded hourly cost, times volume. Not the time someone guesses it takes: the time it takes. Most automation proposals die honestly at this step, because the task turns out to cost far less than the tool.',
          },
          {
            title: 'Ask how good your people are at it',
            body:
              'If the answer is very good, the productivity effect is small by construction, whatever the tool does. If the answer is that it is error-prone, slow or hated, the gain is real.',
          },
          {
            title: 'Price the machine honestly, including the residue',
            body:
              'Licence plus build plus integration plus the exceptions, which are the part that is always underestimated and never goes away.',
          },
          {
            title: 'Decide which argument you are actually making',
            body:
              'Cost saving, reliability, or capacity you cannot hire for. All three are legitimate. Only the first is settled by the arithmetic above, and conflating them is how a project gets approved on one basis and judged on another.',
          },
        ],
      },
    ],

    faqs: [
      {
        question: 'When is automation worth the money?',
        answer:
          'When the cost saved is large, which happens when your people are not especially good at the task relative to their wage and the tool is genuinely good relative to its cost. The economics literature states this directly: the productivity effect is proportional to the cost saving from substitution.',
      },
      {
        question: 'What is so-so automation?',
        answer:
          'A technology that does a task slightly worse for slightly less. Acemoglu and Restrepo argue these are the damaging ones, not the impressive ones, because the small productivity gain does not offset the displacement. Their named example is automated customer service.',
      },
      {
        question: 'Does automation always reduce headcount?',
        answer:
          'No, and the direction depends on labour market conditions. The same paper finds that where wages are high and labour scarce, automation tends to raise labour demand, while where labour is cheap and abundant it can reduce it. Official statistics currently show little measured employment effect from AI either way.',
      },
      {
        question: 'Should I automate a task my team is good at?',
        answer:
          'Usually not on cost grounds, because the productivity gain is small by construction when people are already fast and accurate. There can be good reasons anyway, such as reliability, audit trails or work that happens overnight, but those are different arguments and should be made as such.',
      },
      {
        question: 'How do I know if the tool is actually better?',
        answer:
          'Measure both on the same real work. Time per item and error rate for the current process, then the same two numbers for the tool on unchosen inputs including the awkward cases. A demo on selected examples tells you nothing about the comparison that matters.',
      },
    ],

    publishedAt: '2026-10-14T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'Acemoglu and Restrepo, Automation and New Tasks, Journal of Economic Perspectives 33(2), 2019',
        url: 'https://www.aeaweb.org/articles?id=10.1257%2Fjep.33.2.3',
        readOn: '2026-09-11',
        supports:
          'The productivity and displacement decomposition, the so-so technology passage, the cost-saving mechanism and the wage-scarcity result.',
      },
    ],

    limits: [
      'This is a framework for which direction the effect runs, not a forecast of its size in your business. The size you have to measure.',
      'It covers the cost-saving case only. Automation for reliability, compliance or out-of-hours capacity is legitimate and is not settled by this arithmetic.',
      'The paper is about automation generally rather than about AI specifically, which is a strength for the mechanism and a caveat for the examples.',
      'We sell automation, so read the losing case above with that in mind. The citation is public and the test is one you can apply without us.',
    ],

    cta: {
      heading: 'Want the arithmetic run before you commit?',
      body: 'Pricing the task as it is currently done is usually a short piece of work and it settles most of these decisions. We would rather tell you a workflow is not worth automating than build it and have you find out.',
      buttonLabel: 'Get it priced',
      href: '/contact?service=workflow-automation',
    },

    related: ['nobody-knows-how-often-automation-fails', 'when-your-spreadsheet-becomes-a-system'],

    seo: {
      title: 'When Automation Actually Pays, and When It Loses Money',
      description:
        'The economics say mediocre automation is the damaging kind, and automating a task your staff already do well is the textbook losing case. The test, and how to apply it.',
    },
  },

  {
    slug: 'nobody-knows-how-often-automation-fails',
    cluster: 'automate-or-hire',
    title: 'Nobody Can Tell You How Often Automation Projects Fail',
    navLabel: 'The failure rate nobody has',
    card: 'The most quoted figure traces to a marketing brochure, and reached a peer-reviewed journal on the way.',

    answer:
      'Every widely repeated automation failure rate fails when you trace it. "30 to 50% of RPA projects fail" originates in a 2016 consultancy brochure whose stated basis is "our practical experience", with no sample and no definition of failure. It then travelled through a vendor blog and trade press into a peer-reviewed paper, which gave it a citation it never earned. And a systematic review of 63 papers states the underlying problem plainly: the literature studies only successful projects.',

    sections: [
      {
        kind: 'prose',
        heading: 'Where the number comes from',
        body: [
          'If you have read anything about automation failure, you have met the figure: somewhere between 30 and 50 percent of projects fail, usually attributed to a Big Four consultancy.',
          'The original is a nine-page marketing brochure published in 2016, advertising that firm\'s own service for rescuing failed automation projects. The relevant sentence says the firm has "seen as many as 30 to 50% of initial RPA projects fail".',
          'There is no sample size, no definition of failure, and no methodology section. The stated basis is practical experience. To the firm\'s credit, it never claimed otherwise: the brochure is honest about being an impression.',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'Two biases, both structural',
        body:
          'The firm is describing the projects it was called in to rescue, which is a sample selected on the outcome being measured. And it sells the remediation that the number justifies. Neither of those is hidden or improper in a marketing document. Both make the figure useless as evidence about projects in general, which is the only way anyone ever uses it.',
      },
      {
        kind: 'prose',
        heading: 'How an impression acquires a citation',
        body: [
          'This is the part worth learning as a pattern, because it recurs across fields.',
          'The brochure appeared in 2016. A vendor blog cited it in October 2017. Trade press repeated it. A journal paper cited the trade coverage in 2019. And by 2022 a peer-reviewed paper in a Springer journal stated that "up to 50% of initial RPA implementations are estimated to fail", citing the 2019 paper.',
          'At that point the number has a journal citation. Anyone who checks finds a real peer-reviewed article, which is what checking is supposed to establish. Following it further leads to a marketing brochure, and almost nobody follows it further.',
          'Peer review did not validate the figure. It relocated it.',
        ],
      },
      {
        kind: 'table',
        heading: 'The other candidates, and why each one fails',
        intro:
          'These are the figures that get offered when the first one is challenged. None of them is a failure rate.',
        columns: ['The claim', 'What it actually is'],
        rows: [
          ['A consultancy: 30 to 50% fail', 'An impression from rescue work, no method, sells the remedy'],
          ['Another: only 3 to 8% scale', 'A measure of SCALE among self-selected survey clients, not failure'],
          ['An analyst: 25,000 hours saved', 'Arithmetic from an assumed input, and a savings claim rather than a failure one'],
          ['Vendor ROI studies', 'Commissioned composites whose own authors disclaim generalisation'],
          ['The general IT benchmark', 'Discredited in peer-reviewed work for undisclosed design and definitions'],
        ],
      },
      {
        kind: 'prose',
        heading: 'The reason the gap exists is structural',
        body: [
          'You might expect the academic literature to settle this. It cannot, and it says so.',
          'A systematic review of 63 RPA publications states: "the literature covers only successful RPA projects, leaving room for further research on failed projects." It adds that "the positive effects are widely discussed in literature. Only a minority is critical."',
          'That is a survivorship problem the reviewers name themselves. A body of research that studies only successes cannot produce a failure rate, so anyone quoting one from this field is quoting a number the evidence base is structurally incapable of generating.',
          'Behind that sits a simpler problem: nobody positioned to measure it has a reason to publish. Consultancies sell remediation, vendors sell licences, and organisations whose projects failed do not volunteer the fact. There is also no agreed definition of failure. Abandoned, over budget, delivered but unused and delivered but hated are four different things, and a rate that does not say which it means is not comparable with anything.',
        ],
      },
      {
        kind: 'prose',
        heading: 'What to say instead, if you need to say something',
        body: [
          'If a figure is genuinely required, quote the source honestly and let the reader weigh it. "A consultancy that sells automation remediation has said it has seen 30 to 50% of initial projects fail, an estimate from its own experience rather than a study" is a sentence you can defend. The bare percentage is not.',
          'Better, replace the question. Nobody needs a population failure rate to make a decision about one project. What they need is whether THIS task has the properties that predict success, and that has a real literature behind it: high volume, clear rules, few exceptions, a stable process and structured data.',
          'Two independent academic groups converge on that list, which is worth more than any percentage, though it comes with its own honest caveat: the criteria were derived from what the literature asserts and demonstrated on case studies, not validated against a population including failures. For the reason given above, that population does not exist in the research.',
        ],
      },
      {
        kind: 'note',
        tone: 'info',
        heading: 'Why we are telling you this',
        body:
          'We sell automation. A high published failure rate is bad for us and a low one is good for us, and we are telling you that nobody has either. The reason is narrow self-interest of a slower kind: an industry that argues with invented statistics produces buyers who cannot tell a real claim from a marketed one, and we would rather compete on the claims we can evidence.',
      },
    ],

    faqs: [
      {
        question: 'What percentage of automation projects fail?',
        answer:
          'Nobody has a defensible figure. Every widely repeated number traces to a consultancy impression, a measure of something else such as scaling, a savings model, or a vendor-commissioned study. The academic literature cannot supply one either, because by its own reviewers\' account it studies only successful projects.',
      },
      {
        question: 'Where does the 30 to 50% RPA failure figure come from?',
        answer:
          'A 2016 nine-page marketing brochure for a consultancy\'s automation remediation practice. Its stated basis is the firm\'s practical experience, with no sample and no definition of failure, and the firm is describing projects it was called in to rescue.',
      },
      {
        question: 'But it is cited in a peer-reviewed paper, so is it not validated?',
        answer:
          'No. Following the citation chain back leads from the peer-reviewed paper to an earlier paper, to trade coverage, to a vendor blog, to the brochure. Peer review relocated the number rather than testing it, which is a general hazard with statistics that enter the literature by citation.',
      },
      {
        question: 'Is the Standish CHAOS report a better source?',
        answer:
          'No. It is discredited in peer-reviewed work for undisclosed study design, unstated project selection and unstated definitions of success and failure. One analysis showed that a mirror-image bias flips a single company from 6% to 94% success.',
      },
      {
        question: 'What should I use instead of a failure rate?',
        answer:
          'The task properties that predict whether automation works: volume, rule clarity, exception rate, process stability and structured data. Two independent academic groups converge on that list, and unlike a percentage it tells you something actionable about your specific case.',
      },
    ],

    publishedAt: '2026-10-15T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'Wewerka and Reichert, Robotic Process Automation: A Systematic Literature Review and Assessment Framework',
        url: 'https://arxiv.org/abs/2012.11951',
        readOn: '2026-09-11',
        supports: 'That the literature covers only successful RPA projects, and that criticism is a minority.',
      },
      {
        label: 'Wellmann et al., A framework to evaluate the viability of robotic process automation, BPM 2020',
        url: 'https://arxiv.org/abs/2007.10900',
        readOn: '2026-09-11',
        supports: 'The task criteria offered as a replacement for a failure rate.',
      },
      {
        label: 'Eveleens and Verhoef, The Rise and Fall of the Chaos Report Figures, IEEE Software, 2010',
        url: 'https://ieeexplore.ieee.org/document/5232595',
        readOn: '2026-09-11',
        supports: 'The peer-reviewed critique of the CHAOS figures and the mirror-image bias demonstration.',
      },
    ],

    limits: [
      'This post establishes that the circulating figures are not citable. It does not establish that automation usually succeeds, which would need the same quality of evidence we are saying does not exist.',
      'The consultancy brochure and the citation chain were traced by research rather than read end to end by the author of this post in every link.',
      'The task criteria offered as a replacement are documented consensus rather than validated predictors, for the survivorship reason the post explains.',
      'We sell automation, which gives us an interest in this question. The sources are public and the tracing is reproducible.',
    ],

    cta: {
      heading: 'Want to know if your process is a good candidate?',
      body: 'The criteria in this post are checkable against a real workflow in an afternoon: volume, exception rate, how stable the process is and whether the data is structured. That is a more useful answer than any percentage.',
      buttonLabel: 'Have it checked',
      href: '/contact?service=workflow-automation',
    },

    related: ['when-automation-actually-pays', 'ai-helps-your-newest-staff-most'],

    seo: {
      title: 'Nobody Can Tell You How Often Automation Projects Fail',
      description:
        'The 30 to 50% figure traces to a 2016 marketing brochure and reached a peer-reviewed journal by citation. What the literature can and cannot support.',
    },
  },

  {
    slug: 'ai-helps-your-newest-staff-most',
    cluster: 'automate-or-hire',
    title: 'AI Helps Your Newest Staff Most, Which Changes What You Buy It For',
    navLabel: 'Who AI actually helps',
    card: 'The best study available found 34% gains for novices and close to nothing for experts. That inverts the usual pitch.',

    answer:
      'The strongest evidence on generative AI at work, a study of 5,179 customer support agents published in the Quarterly Journal of Economics, found a 14% average gain in issues resolved per hour, 34% for novice and low-skilled workers, and a minimal near-zero effect for experienced and highly skilled ones. The mechanism was that the AI spread the tacit practices of the best agents to everyone else. That makes it a training technology, and the return depends on how junior your team is.',

    sections: [
      {
        kind: 'prose',
        heading: 'The usual pitch has this backwards',
        body: [
          'AI is generally sold as a way to need fewer expensive people. The best available evidence says the gains land somewhere else entirely, and the difference changes what the tool is worth to you.',
          'The study is Brynjolfsson, Li and Raymond, published in the Quarterly Journal of Economics in 2025. It covers 5,179 customer support agents at a software firm, identified through a staggered rollout of a generative AI assistant, which lets the authors compare agents who had it against agents who did not at the same moment.',
        ],
      },
      {
        kind: 'table',
        heading: 'What the study found',
        intro:
          'Issues resolved per hour, against agents without access, in the same period.',
        columns: ['Group', 'Change in issues resolved per hour'],
        rows: [
          ['All agents', 'Up 14%'],
          ['Novice and low-skilled agents', 'Up 34%'],
          ['Experienced and highly skilled agents', 'Minimal, close to zero'],
        ],
      },
      {
        kind: 'prose',
        heading: 'Why the gains concentrate there',
        body: [
          'The mechanism the authors identify is the interesting part. The assistant was trained on the firm\'s own resolved conversations, so what it surfaced to a new agent was how the firm\'s best agents handled that situation.',
          'For a new agent, that is a substantial upgrade: it is the knowledge that normally takes a year of sitting near someone good. For an experienced agent, it is what they already do, which is why the measured effect is close to zero.',
          'The study also found improved customer sentiment, higher employee retention and evidence that agents learned from the assistant rather than merely leaning on it. The last point matters: the benefit was partly permanent rather than purely a crutch.',
        ],
      },
      {
        kind: 'note',
        tone: 'info',
        heading: 'A second study points the same way',
        body:
          'Noy and Zhang, in Science, ran a true randomised controlled trial with 453 college-educated professionals on occupation-specific writing tasks. Time taken fell 40% and output quality rose 18%, and the inequality between workers narrowed because lower-ability workers gained most. Different method, different task, same direction. The caveat is that these were short self-contained tasks done by individuals, not sustained work inside a firm.',
      },
      {
        kind: 'prose',
        heading: 'What this means for what you buy',
        body: [
          'If your team is experienced and stable, the measured productivity case for a generative assistant is weak. That is not an argument against having one, but it is an argument against expecting a large measured gain, and a strong argument against promising one to a board.',
          'If you hire regularly, or you have high turnover, or your work has a long apprenticeship, the case is much stronger and it is a different case: faster time to competence rather than fewer people. That is worth money, it is measurable, and it is not what the tool is usually sold as.',
          'It also suggests where to look first. The function with the newest people and the most tacit knowledge locked in a few heads is where the evidence says the gain is largest.',
        ],
      },
      {
        kind: 'prose',
        heading: 'The uncomfortable version',
        body: [
          'There is a reading of this that people find harder, and it is worth stating rather than leaving implied.',
          'If the tool works by spreading your best people\'s practices to everyone else, then the value it creates comes out of the scarcity of being good at the job. The senior agent whose judgement is now available to every new hire has not been made more productive, and the study says so: their gain was close to zero.',
          'What you do with that is a management question rather than a technical one. But a firm that captures a senior person\'s expertise into a tool and then treats them as the group that gained least from it should not be surprised by the reaction.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Where we see this land',
        body: [
          'We build agentic AI and retrieval systems, and the pattern in this research matches what the successful deployments have in common.',
          'The ones that work are usually built on a corpus of the organisation\'s own resolved work: past tickets, previous advice, the documents that record how things were actually decided here. That is the same mechanism the study identifies, which is why it helps new people most. The system is not being clever, it is making institutional knowledge reachable.',
          'The ones that disappoint are usually built on generic capability for an experienced team, where the honest answer was always that they already knew this. We have said so before building, and it is a better conversation than the one that happens six months later.',
          'It also changes what we ask for at the start. If the corpus of past work does not exist, or is scattered across inboxes, that is the project before the project, and pretending otherwise produces a system with nothing to retrieve.',
        ],
      },
      {
        kind: 'prose',
        heading: 'What the evidence does not cover',
        body: [
          'Both studies are about assistive tools used by a person doing a task, not about agents acting autonomously. The economics of the second are different and much less well measured.',
          'The support study is quasi-experimental rather than a randomised trial: the authors use a staggered rollout, which is strong but not the same as random assignment. And it is one firm in one domain, where the corpus of past resolutions was unusually well suited to the method.',
          'And a 14% average gain in issues resolved per hour is not a 14% cost reduction. It becomes one only if the volume of work is fixed, which in support it usually is not.',
        ],
      },
      {
        kind: 'steps',
        heading: 'How to test this in your own business',
        intro:
          'The study design is worth copying, and it is cheaper than it sounds.',
        steps: [
          {
            title: 'Pick a measurable task with a real throughput number',
            body:
              'Tickets resolved, documents processed, calls handled. Something that was already counted before anyone mentioned AI, so the baseline is not constructed after the fact.',
          },
          {
            title: 'Roll out to part of the team, not all of it',
            body:
              'A staggered rollout gives you a comparison group at the same moment, which removes seasonality and the general improvement that happens when people know they are being watched.',
          },
          {
            title: 'Split the result by tenure',
            body:
              'This is the step that matters and it is the one usually skipped. An average across a mixed team hides the finding: it will understate the effect on your newest people and overstate it on everyone else.',
          },
          {
            title: 'Look at quality alongside throughput',
            body:
              'Resolution rate, reopen rate, customer sentiment. Faster and worse is easy to achieve and easy to miss if you only count volume.',
          },
        ],
      },
    ],

    faqs: [
      {
        question: 'Does AI make workers more productive?',
        answer:
          'On the best available evidence, it depends heavily on who. A study of 5,179 support agents found a 14% average gain, 34% for novices and close to zero for experienced workers. An average figure conceals that split, which is why averages are misleading here.',
      },
      {
        question: 'Why do experienced staff gain less from AI?',
        answer:
          'Because the tool works by surfacing the practices of the best performers, which experienced staff already have. The authors found the assistant disseminated tacit knowledge from top agents to everyone else, so the people it is copying gain the least.',
      },
      {
        question: 'Is AI a replacement for training?',
        answer:
          'The evidence points to it being a form of training rather than a replacement for one. The support study found agents learned from the assistant rather than only depending on it, which means part of the gain persisted. That is a stronger argument for it than the headcount one.',
      },
      {
        question: 'Does a 14% productivity gain mean 14% fewer staff?',
        answer:
          'No. It means more issues resolved per hour, which converts to reduced headcount only if the volume of work is fixed. In customer support it usually is not, and official statistics show little measured employment effect from AI so far.',
      },
      {
        question: 'How do I measure this in my own business?',
        answer:
          'Copy the study design. Take a task with an existing throughput measure, roll the tool out to part of the team, compare against the rest over the same period, and split the result by tenure. The tenure split is the part that is usually skipped and the part that contains the finding.',
      },
    ],

    publishedAt: '2026-10-16T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'Brynjolfsson, Li and Raymond, Generative AI at Work, Quarterly Journal of Economics 140(2), 2025',
        url: 'https://www.nber.org/papers/w31161',
        readOn: '2026-09-11',
        supports: 'The 5,179-agent sample, the 14% average, the 34% novice effect, the near-zero expert effect and the dissemination mechanism.',
      },
      {
        label: 'Noy and Zhang, Experimental evidence on the productivity effects of generative artificial intelligence, Science 381(6654), 2023',
        url: 'https://www.science.org/doi/10.1126/science.adh2586',
        readOn: '2026-09-11',
        supports: 'The randomised trial of 453 professionals, the 40% time reduction, the 18% quality gain and the narrowing of inequality between workers.',
      },
    ],

    limits: [
      'The support study is quasi-experimental, using a staggered rollout rather than random assignment, and covers one firm in one domain with an unusually good corpus of past resolutions.',
      'Both studies cover assistive tools used by a person, not autonomous agents. The economics of autonomous systems are different and far less well measured.',
      'The writing trial used short self-contained tasks by individuals, not sustained work inside an organisation with clients and consequences.',
      'A throughput gain is not a cost reduction unless the volume of work is fixed, which it frequently is not.',
    ],

    cta: {
      heading: 'Wondering where a tool like this would actually pay off?',
      body: 'The evidence says look at the function with the newest people and the most knowledge locked in a few heads. Working out whether that is true in your case takes a conversation and a look at what you already measure.',
      buttonLabel: 'Talk it through',
      href: '/contact?service=agentic-ai-development',
    },

    related: ['when-automation-actually-pays', 'what-automates-badly'],

    seo: {
      title: 'AI Helps Your Newest Staff Most, Not Your Most Expensive',
      description:
        'A study of 5,179 support agents found 34% gains for novices and close to zero for experts. Why that inverts the usual pitch, and how to test it yourself.',
    },
  },

  {
    slug: 'when-your-spreadsheet-becomes-a-system',
    cluster: 'automate-or-hire',
    title: 'When Your Spreadsheet Stops Being a Spreadsheet',
    navLabel: 'The spreadsheet threshold',
    card: 'Too many rows is a symptom. The question is whether the process underneath is ready to be automated at all.',

    answer:
      'A spreadsheet that has become slow, fragile or too large is usually not a spreadsheet problem. It is a process that outgrew the tool, and the decision is not which software to buy but whether the process is stable enough to automate yet. Automating an unstable process entrenches it, which is the oldest finding in this field and still the most ignored.',

    sections: [
      {
        kind: 'prose',
        heading: 'The moment this question arrives',
        body: [
          'Nobody researches business process automation for fun. They search because a file has become slow, or a formula broke, or the one person who understands the sheet went on holiday and something stopped.',
          'That moment is a good time to make a decision and a bad time to make a purchase, because the pressure pushes towards replacing the tool when the useful question is about the process it encodes.',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'The thing not to do, stated in 1990 and still true',
        body:
          'Michael Hammer, in Harvard Business Review: "heavy investments in information technology have delivered disappointing results, largely because companies tend to use technology to mechanize old ways of doing business. They leave the existing processes intact and use computers simply to speed them up." His line for it has survived thirty-six years: "It is time to stop paving the cow paths." If the spreadsheet grew organically around exceptions and workarounds, automating it faithfully preserves every one of them in software, where they are harder to see and more expensive to change.',
      },
      {
        kind: 'prose',
        heading: 'The five properties that decide whether this automates',
        body: [
          'Two independent academic groups, working from different literatures, converge on the same short list of task properties that predict whether automation works. They are worth checking before looking at any tool.',
          'Volume: is this frequent enough that the effort pays back. Rule clarity, which the research calls determinism: can the steps be stated without judgement calls. Exception rate: what proportion of cases need a human decision. Stability, or maturity: how often does the process itself change. And data structure: is the input structured enough for software to read without interpretation.',
          'The one that decides most spreadsheet cases is the exception rate. A sheet with heavy conditional formatting, colour-coded rows and comment threads is usually a process where a person is applying judgement every day, and that is not an automation candidate yet. It might be a candidate for a better-structured tool, which is a different and smaller project.',
        ],
      },
      {
        kind: 'table',
        heading: 'What the symptom usually means',
        intro:
          'The complaint people search for, and the underlying condition worth checking.',
        columns: ['The symptom', 'What it usually indicates', 'The useful next step'],
        rows: [
          ['Too many rows, file is slow', 'Data volume outgrew a document', 'A database, not necessarily automation'],
          ['Too many sheets to navigate', 'Several processes in one file', 'Separate them before automating any'],
          ['Formulas keep breaking', 'Logic complexity outgrew the medium', 'Write the rules down as rules'],
          ['Only one person can maintain it', 'Undocumented process, key-person risk', 'Documentation first, tooling second'],
          ['Constant manual corrections', 'High exception rate', 'Not ready to automate. Fix the inputs'],
        ],
      },
      {
        kind: 'prose',
        heading: 'The honest caveat on those criteria',
        body: [
          'Because this is a site that says where its evidence stops: the five properties are documented consensus rather than validated predictors.',
          'Two academic groups agree on them, which is meaningful. But the criteria were derived by aggregating what prior literature asserts and then demonstrated on case studies, not tested against a population of projects including the failed ones. The reason is structural, and the reviewers say it themselves: the literature covers only successful projects.',
          'So treat the list as a well-documented checklist that will catch obvious mistakes, not as a scoring system that predicts outcomes. It is still considerably better than the alternative on offer, which is a vendor readiness quiz designed to conclude that you are ready.',
        ],
      },
      {
        kind: 'steps',
        heading: 'What to do before buying anything',
        intro:
          'Four steps, none of which requires software, and the first two usually resolve the question.',
        steps: [
          {
            title: 'Write the process down as it actually runs',
            body:
              'Not as it is supposed to run. Every step, including the ones that exist because a system upstream is wrong. Most spreadsheet pain becomes legible at this step, and some of it disappears without any tooling.',
          },
          {
            title: 'Count the exceptions over a real week',
            body:
              'How many items needed someone to decide something, and what did they decide. A high rate is the clearest signal that automation is premature, and it is knowable in days rather than months.',
          },
          {
            title: 'Separate the data problem from the process problem',
            body:
              'A file that is slow because it holds too much data needs somewhere better to keep data. That is not the same project as automating the work, it is usually smaller, and doing it first often relieves the pressure that prompted the search.',
          },
          {
            title: 'Fix the process before encoding it',
            body:
              'If the steps only make sense historically, automating them makes the history permanent. This is the point of Hammer\'s argument and it is the step under the most time pressure to skip.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'What we usually find',
        body: [
          'We build workflow automation, and spreadsheet rescues are a recurring request. The most common outcome is not the one the client expected when they got in touch.',
          'Frequently the file is holding two or three unrelated processes that grew into one workbook because that is where the data already was. Separating them is most of the fix, and it is a smaller job than automating the whole thing would have been.',
          'The second most common finding is that the manual work everyone complains about is not in the spreadsheet at all. It is upstream, in how the data arrives: a form that permits free text where it should offer four options, an export that has to be reshaped every time. Fixing the input removes the work rather than automating it, which is cheaper and does not leave anything to maintain.',
          'Both of those are worse business for us than building an automation would be. They are also what we would want told to us, which is the standard we try to hold.',
        ],
      },
      {
        kind: 'prose',
        heading: 'When the spreadsheet is fine',
        body: [
          'Worth saying, because we sell the alternative: a spreadsheet that is slow but correct, maintained by someone who understands it, holding a process that changes regularly, is frequently the right tool and should be left alone.',
          'Spreadsheets are flexible in exactly the way early processes need. The cost of moving to a system is paid in flexibility, and if the process is still changing every quarter you will pay it repeatedly.',
          'The signals that genuinely warrant moving are narrower than the pain suggests: the data has outgrown a document, several people need to work in it at once, an audit trail is required, or the key-person risk is unacceptable. Slowness and size on their own are a database question rather than an automation one.',
        ],
      },
    ],

    faqs: [
      {
        question: 'How many rows is too many for Excel?',
        answer:
          'The useful answer is not a row count. A file becomes untenable when it is slow enough to change behaviour, when several people need it simultaneously, or when nobody but one person can maintain it. Any of those can happen well below the technical limits, and none of them is fixed by automation on its own.',
      },
      {
        question: 'Should I automate my spreadsheet process?',
        answer:
          'Check five properties first: volume, how clearly the rules can be stated, the exception rate, how stable the process is and whether the data is structured. The exception rate decides most cases. If a person makes judgement calls on many items, the process is not ready yet.',
      },
      {
        question: 'What is wrong with automating the process I already have?',
        answer:
          'If it grew around workarounds, automating it faithfully preserves them in software where they are harder to see and more costly to change. Hammer made this argument in 1990 and it has not aged: technology used to mechanise old ways of working tends to disappoint.',
      },
      {
        question: 'Do I need a database or an automation?',
        answer:
          'They are different problems and it is worth separating them. Slowness and size are usually a data-storage question. Repetitive manual steps are an automation question. Solving the storage problem first often relieves enough pressure to make the second decision calmly.',
      },
      {
        question: 'Is it ever right to leave the spreadsheet alone?',
        answer:
          'Often. A spreadsheet that is correct, understood, and holding a process that still changes regularly is usually the right tool, because flexibility is what an unsettled process needs. Moving to a system costs flexibility, and you pay that cost again each time the process changes.',
      },
    ],

    publishedAt: '2026-10-17T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'Wellmann et al., A framework to evaluate the viability of robotic process automation, BPM 2020',
        url: 'https://arxiv.org/abs/2007.10900',
        readOn: '2026-09-11',
        supports: 'The five task criteria: volume, determinism, exception rate, maturity and data structure.',
      },
      {
        label: 'Wewerka and Reichert, Robotic Process Automation: A Systematic Literature Review',
        url: 'https://arxiv.org/abs/2012.11951',
        readOn: '2026-09-11',
        supports: 'The independent convergence on the same criteria, and that the literature covers only successful projects.',
      },
      {
        label: 'Hammer, Reengineering Work: Don\'t Automate, Obliterate, Harvard Business Review, July-August 1990',
        url: 'https://hbr.org/1990/07/reengineering-work-dont-automate-obliterate',
        readOn: '2026-09-11',
        supports: 'That technology used to mechanise existing ways of working disappoints, and the cow paths line.',
      },
    ],

    limits: [
      'The task criteria are documented consensus rather than validated predictors, because the literature they come from studies only successful projects.',
      'Hammer is an editorially reviewed management article rather than peer-reviewed research, and the author ran a consultancy selling the method it prescribes. It is quoted as the origin of an idea, not as evidence.',
      'No row count or exception-rate threshold is given, because the credible sources do not publish one and the circulating figures are vendor-produced.',
      'We sell automation, so the section arguing that your spreadsheet may be fine is the one to weigh most sceptically. The criteria are public and you can apply them without us.',
    ],

    cta: {
      heading: 'Not sure whether this is a data problem or a process problem?',
      body: 'It is usually answerable in one conversation and a look at a week of exceptions. We would rather tell you to buy a database, or nothing, than build an automation over a process that is still moving.',
      buttonLabel: 'Talk it through',
      href: '/contact?service=workflow-automation',
    },

    related: ['when-automation-actually-pays', 'nobody-knows-how-often-automation-fails'],

    seo: {
      title: 'When Your Spreadsheet Stops Being a Spreadsheet',
      description:
        'Too many rows is a symptom. The real question is whether the process underneath is stable enough to automate, and five documented properties that decide it.',
    },
  },

  {
    slug: 'what-automates-badly',
    cluster: 'automate-or-hire',
    title: 'What Automates Badly, and Why It Is Not the Technology\'s Fault',
    navLabel: 'What automates badly',
    card: 'A 1983 paper on industrial control describes modern AI deployment exactly, and its warnings have got worse rather than better.',

    answer:
      'Automation takes the easy cases and leaves people the hard ones. Their skill at those cases then decays because they no longer practise, and the moment they are needed is the moment something has gone wrong and more skill is required than average. Lisanne Bainbridge published this in 1983 about industrial control rooms. A peer-reviewed revisit in 2023 concludes it applies to AI more sharply, because AI automates judgement rather than motion.',

    sections: [
      {
        kind: 'prose',
        heading: 'The paper that predicted this',
        body: [
          'In 1983, in the journal Automatica, Lisanne Bainbridge published a five-page paper called "Ironies of Automation". It is about process control rooms and aircraft flight decks, and it describes what happens to people when the systems they supervise become competent.',
          'It maps onto AI agents with no translation required, which is either remarkable or unsurprising depending on how much you think the underlying problem is about technology.',
        ],
      },
      {
        kind: 'note',
        tone: 'info',
        heading: 'The second irony, in the original words',
        body:
          '"The designer who tries to eliminate the operator still leaves the operator to do the tasks which the designer cannot think how to automate. It is this approach which causes the problems to be discussed here, as it means that the operator can be left with an arbitrary collection of tasks, and little thought may have been given to providing support for them." Note the precise phrasing: the tasks the designer "cannot think how to automate", which is not the same as tasks that are unimportant. It is a residue defined by the limits of the designer rather than by the needs of the work.',
      },
      {
        kind: 'prose',
        heading: 'What the residue is made of',
        body: [
          'This is the part that gets underestimated in every automation business case, because the residue is not a smaller version of the original job.',
          'Automation absorbs the cases that are regular, predictable and well specified, because those are the ones anybody knows how to automate. What is left is the irregular, the ambiguous and the exceptional. The volume drops and the average difficulty rises, sometimes sharply.',
          'So the person who was handling a mixed workload is now handling a distilled one, and the business case that predicted a proportional reduction in effort has usually assumed the remaining work has the same character as the work that left. It does not.',
        ],
      },
      {
        kind: 'prose',
        heading: 'And their skill at it decays',
        body: [
          'Bainbridge is direct about the consequence: "physical skills deteriorate when they are not used, particularly the refinements of gain and timing. This means that a formerly experienced operator who has been monitoring an automated process may now be an inexperienced one."',
          'Translated to a modern setting: the person who used to write the reports now reviews generated ones. Reviewing is a different skill from writing, and it decays differently. After a year, their ability to notice that a report is subtly wrong is not what it was, because noticing depends on having recently done the thing.',
          'Then comes the sentence that should be in every automation proposal: "When manual take-over is needed there is likely to be something wrong with the process, so that unusual actions will be needed to control it, and one can argue that the operator needs to be more rather than less skilled, and less rather than more loaded, than average."',
          'The moment you need the human is the worst moment, and it is the moment their practice has been lowest.',
        ],
      },
      {
        kind: 'table',
        heading: 'The 1983 problem and its 2026 form',
        intro:
          'The left column is Bainbridge\'s subject matter. The right is what it looks like now.',
        columns: ['Control room, 1983', 'AI deployment, 2026'],
        rows: [
          ['Operator monitors an automated plant', 'Reviewer approves generated output'],
          ['Automation handles normal operation', 'Model handles the routine cases'],
          ['Human gets abnormal conditions', 'Human gets the ambiguous and adversarial ones'],
          ['Manual skill decays through disuse', 'Judgement decays through not exercising it'],
          ['Vigilance fails on rare events', 'Approval becomes a formality after a good month'],
        ],
      },
      {
        kind: 'prose',
        heading: 'The empirical version, from aviation',
        body: [
          'Bainbridge argued it. A NASA study of line pilots measured it.',
          'Wiener\'s 1989 research on early glass-cockpit aircraft found: "Workload was not universally reduced. In fact it appeared that a paradox existed: workload seemed to be reduced when it was not heavy or critical, and may be increased by automation when it was already heavy or critical."',
          'A pilot in the same study put it more plainly: "Systems that relieve workload in one area tend to increase the workload in new areas."',
          'That is the finding to carry into any automation decision. The help arrives when you least need it, and the additional burden arrives when you most do.',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'The 2023 revisit says it got worse',
        body:
          'Endsley, in Ergonomics for the paper\'s fortieth anniversary, concludes: "Not only are Bainbridge\'s original warnings still pertinent for AI, but AI\'s very nature and focus on cognitive tasks has introduced many new challenges for people who interact with it", including "opaqueness in AI limitations and biases that can drive human decision biases", and "difficulties in understanding the AI reliability, despite the fact that AI remains insufficiently intelligent for many of its intended applications." We read the published abstract rather than the full paper, which is paywalled, and this is flagged below.',
      },
      {
        kind: 'steps',
        heading: 'Designing around the ironies rather than into them',
        intro:
          'None of this means do not automate. It means the human side of the design is part of the project rather than something that happens afterwards.',
        steps: [
          {
            title: 'Scope the residue explicitly',
            body:
              'Before approving anything, describe what work remains and who does it. If the answer is "the hard cases, by the same team, alongside their other duties", the business case has not been made yet.',
          },
          {
            title: 'Keep people practising the thing they supervise',
            body:
              'Rotate a proportion of work back to humans deliberately, not because the system failed but so that reviewing does not become the only thing anyone does. This costs efficiency and buys the ability to catch errors.',
          },
          {
            title: 'Make review active rather than passive',
            body:
              'Bainbridge notes that people can log numbers without noticing what they are. A reviewer who clicks approve on a long run of correct outputs is doing exactly that. Sampling with known-bad cases mixed in keeps attention real.',
          },
          {
            title: 'Treat the takeover moment as a design problem',
            body:
              'When the system hands over, the person needs context it has not given them: what it did, what it was uncertain about, what it already tried. Handing over a failure with no state is how the irony bites hardest.',
          },
          {
            title: 'Expect the workload to move, not to disappear',
            body:
              'Wiener\'s finding is that it relocates. Plan for where it lands, which is usually onto fewer people at more difficult moments, and staff for that rather than for the average.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'How this changes a build',
        body: [
          'We build workflow automation, and the residue is the part of the scope that gets negotiated hardest, because it is the part that looks like it should be free.',
          'The automation itself is legible: these steps, that system, this trigger. The residue is a question about people, and it usually arrives as an assumption rather than a requirement. The exceptions will just go to the team, and the team will cope.',
          'They will, for a while. What Bainbridge describes is what happens next, and it is slow enough that nobody attributes it to the automation: the team gets less practised at the cases that now only reach them when something has gone wrong.',
          'So the questions we push on are unglamorous ones. Who sees the exceptions, what do they see when they do, how will they still be good at handling them in a year, and what does the system tell them about what it already tried. A handover with no state is the single most common way a well-built automation becomes a burden.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Bainbridge\'s own conclusion',
        body: [
          'She does not argue against automation, and it is worth ending on what she actually says: "I hope this paper has made clear both the irony that one is not by automating necessarily removing the difficulties, and also the possibility that resolving them will require even greater technological ingenuity than does classic automation."',
          'Forty-three years on, that is still the honest position. The difficulties are not removed by automating, they are moved, and moving them well is harder engineering than the automation itself.',
        ],
      },
    ],

    faqs: [
      {
        question: 'What are the ironies of automation?',
        answer:
          'From Bainbridge\'s 1983 paper: the designer who tries to remove the operator leaves them the tasks nobody knew how to automate, those tasks are the hardest ones, the operator\'s skill at them decays through disuse, and the moment they are needed is the moment more skill than average is required.',
      },
      {
        question: 'Does this apply to AI or only to industrial automation?',
        answer:
          'A peer-reviewed revisit in 2023 concludes it applies more sharply to AI, because AI automates cognitive rather than manual work and adds new problems: opacity about its own limitations, and difficulty judging its reliability.',
      },
      {
        question: 'Why does automation increase workload sometimes?',
        answer:
          'A NASA study of line pilots found the paradox directly: workload was reduced when it was not heavy or critical, and could increase when it already was. Automation tends to help during normal operation and add burden during abnormal operation, which is the opposite of what is needed.',
      },
      {
        question: 'How do I stop reviewers rubber-stamping AI output?',
        answer:
          'Make the review active rather than passive. Bainbridge notes people can log numbers without noticing them, and a reviewer approving a long run of correct outputs is doing the same. Sampling, mixing in known-bad cases, and rotating real work back to people all help.',
      },
      {
        question: 'Does this mean automation is a bad idea?',
        answer:
          'No, and Bainbridge does not argue that. Her conclusion is that automating does not necessarily remove the difficulties and that resolving them may require greater ingenuity than the automation itself. The human side of the design is part of the project, not an afterthought.',
      },
    ],

    publishedAt: '2026-10-18T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'Bainbridge, Ironies of Automation, Automatica 19(6), 1983, pp.775-779',
        url: 'https://ckrybus.com/static/papers/Bainbridge_1983_Automatica.pdf',
        readOn: '2026-09-11',
        supports: 'The second irony, the skill degradation passage, the takeover argument, the logging observation and the conclusion.',
      },
      {
        label: 'Wiener, Human Factors of Advanced Technology Transport Aircraft, NASA CR-177528, 1989',
        url: 'https://ntrs.nasa.gov/citations/19890016609',
        readOn: '2026-09-11',
        supports: 'The workload paradox finding and the quoted pilot observation.',
      },
      {
        label: 'Endsley, Ironies of artificial intelligence, Ergonomics 66(11), 2023',
        url: 'https://pubmed.ncbi.nlm.nih.gov/37534468/',
        readOn: '2026-09-11',
        supports: 'That the original warnings remain pertinent for AI and that cognitive automation adds new challenges.',
      },
    ],

    limits: [
      'The Endsley paper is paywalled and we read only the published abstract, quoted from the PubMed record. The conclusion is the authors\', the detail behind it we have not seen.',
      'Bainbridge and Wiener are about industrial and aviation settings. The mapping to AI deployment is ours, supported by the 2023 revisit but not identical to it.',
      'This is a design argument rather than a measurement. It tells you which failure modes to expect, not how often they occur in your setting.',
      'No claim is made here that automation reduces safety or performance overall. Both papers are about where difficulty relocates, not about whether to automate.',
    ],

    cta: {
      heading: 'Designing a system with a human in the loop?',
      body: 'The residue is the part that decides whether it works: what is left over, who handles it, and whether they are still practised enough to catch what the system misses. That is worth working out before the build rather than after.',
      buttonLabel: 'Talk about the design',
      href: '/contact?service=workflow-automation',
    },

    related: ['when-automation-actually-pays', 'ai-helps-your-newest-staff-most'],

    seo: {
      title: 'What Automates Badly, and Why It Is Not the Technology',
      description:
        'A 1983 paper describes AI deployment exactly: automation takes the easy cases, skill at the hard ones decays, and people are needed when least practised.',
    },
  },

  {
    slug: 'what-to-automate-first',
    cluster: 'automate-or-hire',
    title: 'What to Automate First, and How to Tell',
    navLabel: 'What to automate first',
    card: 'Five documented properties predict whether a task automates well. The exception rate decides most cases.',

    answer:
      'You have decided to automate something. The research converges on five properties that predict whether a given task is a good candidate: volume, how clearly the rules can be stated, the exception rate, how stable the process is, and whether the data is structured. Two independent academic groups arrive at the same list. The exception rate decides most real cases, and it is measurable in a week.',

    sections: [
      {
        kind: 'prose',
        heading: 'The question after you have decided',
        body: [
          'This post assumes the prior question is settled and you are choosing between candidates. That is a different problem from whether to automate at all, and it has a more tractable answer.',
          'The useful thing is that the criteria are documented rather than folkloric. Two academic groups working from different literatures arrive at substantially the same list, which is worth more than any vendor readiness assessment.',
        ],
      },
      {
        kind: 'table',
        heading: 'The five properties',
        intro:
          'A candidate scoring badly on the third row is usually the wrong candidate, whatever it scores on the others.',
        columns: ['Property', 'What it means', 'How to measure it this week'],
        rows: [
          ['Volume', 'Frequent enough to repay the effort', 'Count occurrences over a month'],
          ['Rule clarity', 'Steps statable without judgement', 'Try writing them down'],
          ['Exception rate', 'Cases needing a human decision', 'Count them over a real week'],
          ['Stability', 'How often the process changes', 'How many times in the last year'],
          ['Data structure', 'Readable without interpretation', 'Look at the actual inputs'],
        ],
      },
      {
        kind: 'prose',
        heading: 'Rule clarity, stated precisely',
        body: [
          'The research calls this determinism and is direct about its weight: "Determinism is one of the most distinctive criteria to assess the viability of RPA. Deterministic activities consist of logical execution steps without any form of cognitive assessment."',
          'The test is practical rather than philosophical. Try to write the steps down such that somebody new could follow them without asking questions. Where you find yourself writing "use judgement" or "depending on the situation", you have found the part that does not automate.',
          'That does not disqualify the task. It locates the boundary, and the boundary is where the human belongs.',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'The exception rate is the one that decides',
        body:
          'The same research states that candidate processes "show little or no amount of exceptions when tasks are being executed", and names the failure mechanism directly: "A high failure rate might correspond to poor standardization, maturity or determinism as the causes for exceptions." If a meaningful share of cases needs a human, you are not scoping automation. You are scoping a triage system with a queue, a rota and an interface for the person handling the residue, which is a larger project than the one usually approved.',
      },
      {
        kind: 'prose',
        heading: 'Stability, and the process that eats itself',
        body: [
          'The research defines maturity as how often the logical flow of the process changes, and requires that a candidate be "specified and predictable over a period in time".',
          'This is where enthusiasm most often goes wrong. The process people most want to automate is frequently the newest one, because it is the one currently causing pain. A new process is also the one most likely to change next quarter, which means automating it now buys you the work of rebuilding it.',
          'The better candidate is usually the boring one that has run unchanged for two years and that nobody mentions because it works, slowly, and costs somebody a morning a week.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Data structure, which is where projects quietly die',
        body: [
          'The criterion is explicit: "Unstructured and hardly accessible data impedes RPA."',
          'In practice this is the form that permits free text where four options would do, the supplier who sends the same information in a different shape each month, the spreadsheet where the date column contains four date formats.',
          'The useful move is frequently upstream. Fixing the input form removes the work rather than automating it, which is cheaper and leaves nothing to maintain. If you can constrain the input, do that before automating the processing of unconstrained input.',
        ],
      },
      {
        kind: 'prose',
        heading: 'The honest limit of this list',
        body: [
          'These criteria are well documented and they are not validated predictors, and the distinction matters.',
          'They were derived by aggregating what prior literature asserts and then demonstrating them on case studies, rather than by testing them against a population of projects that includes failures. The reason is structural, and a systematic review of 63 papers states it: the literature covers only successful projects.',
          'So this is a checklist that catches obvious mistakes, not a score that predicts outcomes. The reviews also record a genuine disagreement between papers about whether unpredictable volume peaks suit automation, which is worth knowing rather than smoothing over.',
        ],
      },
      {
        kind: 'steps',
        heading: 'Choosing between candidates',
        intro:
          'A week of counting beats a month of discussion, and the counting is the part that usually changes the answer.',
        steps: [
          {
            title: 'List the candidates and count how often each happens',
            body:
              'Actual occurrences over a month. Frequency is the easiest property to establish and it eliminates candidates quickly, because a task that happens twice a month rarely repays the build.',
          },
          {
            title: 'Time one instance properly',
            body:
              'Not the estimate somebody gives you. Watch it once. The gap between the remembered duration and the real one is usually large and runs in both directions.',
          },
          {
            title: 'Count exceptions over a real week',
            body:
              'How many cases needed a decision, and what the decision was. This is the highest-value measurement on the list and it is the one people skip because it takes a week.',
          },
          {
            title: 'Ask when the process last changed',
            body:
              'If the answer is within the last quarter, it will probably change again. Prefer the stable candidate even if it is less painful today.',
          },
          {
            title: 'Look at the raw inputs before deciding',
            body:
              'Open the actual emails, forms and spreadsheets. If the input is unconstrained, consider fixing the input first, which frequently removes the need for the automation entirely.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'What we ask for before scoping',
        body: [
          'We build workflow automation, and the first thing we ask for is not a description of the process. It is two numbers: how often it happens, and how long it takes.',
          'That settles more candidates than any discussion. A task taking four minutes a day is twenty minutes a week, and an integration costing three weeks of work will not repay it however irritating the four minutes feel.',
          'The second thing we ask for is a week of exception counting, and clients resist it because it delays the start. It is the measurement that most often changes the shape of the project, usually from automation to a human-in-the-loop workflow that we would rather scope correctly than discover halfway through.',
          'And the recommendation that costs us the most work is fixing the input. Where a process exists to reshape badly structured data, constraining the form upstream removes the work instead of automating it. It is a smaller job, it leaves nothing to maintain, and it is the right answer often enough that we ask about it every time.',
        ],
      },
    ],

    faqs: [
      {
        question: 'What should I automate first?',
        answer:
          'The candidate that scores well on five documented properties: high volume, rules statable without judgement, few exceptions, a stable process, and structured data. In practice the exception rate decides most cases, and it is measurable in a week.',
      },
      {
        question: 'What exception rate is too high?',
        answer:
          'There is no published threshold worth quoting, and the research base cannot produce one because it studies only successful projects. What matters is measuring your own rate on real cases, because a high one means you are scoping a triage system rather than automation.',
      },
      {
        question: 'Should I automate the process causing the most pain?',
        answer:
          'Often not, because the most painful process is frequently the newest, and new processes change. Automating something that will be redesigned next quarter buys you the work of rebuilding it. The stable, boring, slow process is usually the better candidate.',
      },
      {
        question: 'What if the data is messy?',
        answer:
          'Look upstream first. Where a process exists to reshape badly structured input, constraining the input form removes the work rather than automating it, which is cheaper and leaves nothing to maintain. Unstructured data is explicitly identified as impeding automation.',
      },
      {
        question: 'Are these criteria reliable?',
        answer:
          'They are documented consensus rather than validated predictors. Two independent academic groups converge on them, but they were derived from prior literature and demonstrated on case studies rather than tested against failures, because the literature covers only successful projects.',
      },
    ],

    publishedAt: '2026-11-10T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'Wellmann et al., A framework to evaluate the viability of robotic process automation, BPM 2020',
        url: 'https://arxiv.org/abs/2007.10900',
        readOn: '2026-09-11',
        supports: 'The five criteria, the determinism definition, the exception rate requirement and the statement that unstructured data impedes automation.',
      },
      {
        label: 'Wewerka and Reichert, Robotic Process Automation: A Systematic Literature Review',
        url: 'https://arxiv.org/abs/2012.11951',
        readOn: '2026-09-11',
        supports: 'The independent convergence on the same criteria, and that the literature covers only successful projects.',
      },
    ],

    limits: [
      'The criteria are documented consensus rather than validated predictors, for the survivorship reason the post explains.',
      'No thresholds are given for any property, because the credible sources do not publish them and the circulating figures are vendor-produced.',
      'The literature reviewed concerns robotic process automation specifically. The properties generalise well to other automation, and that generalisation is ours.',
      'We sell automation, and the recommendation to fix the input upstream is the one that most often reduces the work we are paid for.',
    ],

    cta: {
      heading: 'Have several candidates and no way to choose?',
      body: 'Two numbers settle most of it: how often it happens and how long it takes. A week of counting exceptions settles the rest, and it frequently changes what the project should be before anyone has built anything.',
      buttonLabel: 'Talk through the candidates',
      href: '/contact?service=workflow-automation',
    },

    related: ['when-automation-actually-pays', 'when-your-spreadsheet-becomes-a-system'],

    seo: {
      title: 'What to Automate First, and How to Tell',
      description:
        'Five documented properties predict whether a task automates well: volume, rule clarity, exception rate, stability and data structure. The exception rate decides most cases.',
    },
  },
];
