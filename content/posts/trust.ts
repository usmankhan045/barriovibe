import type { Post } from './types';

/**
 * Category 5 of research/CATALOGUE.md: making it trustworthy.
 *
 * 508 RAG queries plus 2,467 on operations. What makes this category unusual
 * is that the evidence of demand and the evidence of no answer are the same
 * artifact: public questions about evaluating and monitoring agents that sit
 * at zero replies, in a query space saturated with observability vendors.
 *
 * It is also the category closest to what we actually sell, which is why every
 * post here carries a real account of how the work is done rather than a
 * generic invitation at the foot.
 */
export const TRUST_POSTS: Post[] = [
  {
    slug: 'why-your-rag-returns-wrong-answers',
    cluster: 'trust',
    title: 'Why Your RAG System Returns Wrong Answers, by Failure Type',
    navLabel: 'Why RAG returns wrong answers',
    card: 'Four different failures produce the same symptom, and each has a different fix. Three of them are not the model.',

    answer:
      'A wrong answer from a retrieval system has four distinct causes and they need different repairs: the right passage was never retrieved, it was retrieved but ranked below noise, it was retrieved and the model ignored it, or irrelevant context derailed an answerable question. Only the third is a model problem. Published evaluation metrics separate them, so this is measurable rather than a matter of opinion, and teams without those numbers are usually fixing the wrong one.',

    sections: [
      {
        kind: 'prose',
        heading: 'The symptom is identical, the cause is not',
        body: [
          'Someone asks your system a question, gets a confident answer, and the answer is wrong. That is one symptom with at least four mechanisms behind it, and the expensive mistake is assuming the model is at fault.',
          'In most retrieval systems we are asked to fix, the model is the last thing that went wrong. Something upstream failed first, and the model then did exactly what it was asked to do with material that was already inadequate.',
        ],
      },
      {
        kind: 'table',
        heading: 'The four failures',
        intro:
          'Each one is separately measurable, and the metric names are the standard ones from the Ragas framework so you can look them up directly.',
        columns: ['What went wrong', 'What it is called', 'Where the fix is'],
        rows: [
          ['The passage was never retrieved', 'Context recall', 'Ingestion: chunking, coverage, what got indexed'],
          ['Retrieved but buried below noise', 'Context precision', 'Ranking: embeddings, reranking, how many you pass'],
          ['Retrieved and the answer ignored it', 'Faithfulness', 'Generation: the prompt, the model'],
          ['Irrelevant context derailed it', 'Noise sensitivity', 'Filtering, and knowing when to abstain'],
        ],
      },
      {
        kind: 'prose',
        heading: 'Failure one: it was never there',
        body: [
          'Context recall "measures how many of the relevant documents (or pieces of information) were successfully retrieved. It focuses on not missing important results."',
          'If recall is low, the answer was never available to the model. No prompt engineering fixes this and no larger model fixes it either, because you cannot reason from material that was not supplied. A better model will simply produce a more fluent wrong answer.',
          'The usual causes are upstream and dull: a chunking strategy that split a table across two chunks so neither makes sense alone, documents that never got indexed because the pipeline silently skipped a file type, or a corpus that genuinely does not contain the answer, which is worth discovering early.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Failure two: it was there and you did not see it',
        body: [
          'Context precision "evaluates the retriever\'s ability to rank relevant chunks higher than irrelevant ones for a given query", calculated as the mean of precision at each rank.',
          'Low precision with acceptable recall is the happiest diagnosis on this list, because it means the answer is in your index and the problem is ordering. That is often the cheapest thing to improve: a reranking pass over the top candidates, or simply passing fewer chunks so the relevant one is not competing with twenty near-misses.',
          'It is also the failure most likely to be mistaken for a model problem, because the output looks like the model ignoring good context. It did not ignore it. The good context was at position eighteen.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Failure three: the answer ignored what it was given',
        body: [
          'Faithfulness "measures how factually consistent a response is with the retrieved context", scored 0 to 1, where "a response is considered faithful if all its claims can be supported by the retrieved context". It is computed by splitting the answer into claims and checking each against what was retrieved.',
          'This is the only one of the four that is genuinely a generation problem, and it is the least common in the systems we see.',
          'The critical thing to understand is what it does not measure. Faithfulness asks whether the answer follows from what was retrieved, not whether it is true. A system can score a perfect 1.0 while being completely wrong, if retrieval confidently returned the wrong document and the model summarised it accurately.',
          'High faithfulness with low recall is therefore not a good result. It is a system reliably telling you what the wrong document said, which is worse than an obvious error because it is harder to catch.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Failure four: the noise won',
        body: [
          'Noise sensitivity "measures how often a system makes errors by providing incorrect responses when utilizing either relevant or irrelevant retrieved documents", scored 0 to 1 where lower is better.',
          'This catches the case where retrieval technically succeeded, the right passage was in there, and the surrounding material pulled the answer off course anyway. It is common in corpora with near-duplicate documents: three versions of a policy, two of them superseded, all of them plausible.',
          'The fix is usually not in the model either. It is in the corpus: removing superseded documents, adding metadata that lets the retriever filter by date or status, and being willing to return nothing when nothing current matches.',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'About the percentages you have read',
        body:
          'Figures circulate claiming a specific share of RAG failures trace to chunking, or that retrieval fails some specific percentage of the time. We looked for the studies behind the most common ones and could not trace any of them to a named piece of research with a disclosed method. They are not in this post. The useful part of those claims is their shape, that failures concentrate upstream of the model rather than in it, and the honest way to hold that is as a hypothesis your own evaluation set can test on your own corpus.',
      },
      {
        kind: 'steps',
        heading: 'Diagnosing a real system',
        intro:
          'This is the order we work in, and the first step is the one people want to skip because it produces no immediate improvement.',
        steps: [
          {
            title: 'Collect the failures rather than fixing them',
            body:
              'Twenty real wrong answers, with the question, the answer and what was retrieved. Resist the urge to fix the first one. A single failure tells you almost nothing about which of the four you have.',
          },
          {
            title: 'For each, check whether the answer was in the retrieved set',
            body:
              'This one manual check splits the problem in half immediately. If the passage was not there, you have a recall problem and everything downstream is irrelevant. If it was there, the failure is precision, faithfulness or noise.',
          },
          {
            title: 'Score the set rather than trusting the impression',
            body:
              'Once you know roughly where the failures sit, measure it properly across a larger set so you have a baseline. Without one you cannot tell whether the next change helped, and reindexing changes things in both directions at once.',
          },
          {
            title: 'Fix the earliest stage first',
            body:
              'Recall before precision, precision before generation. Fixing generation while recall is broken produces a system that is confidently wrong in a more polished way, which is the worst outcome available.',
          },
          {
            title: 'Re-score after every corpus change',
            body:
              'A reindex is a change to the system even when no code changed. Corpora drift, documents get added and superseded, and a system that scored well at launch and was never measured again is the standard way a trusted tool quietly stops being trustworthy.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'How we work through this',
        body: [
          'We build retrieval systems, and the diagnostic above is the first week of most rescue engagements rather than a theoretical framework.',
          'The pattern that recurs is that the team has already tried the model. They have swapped to a larger one, rewritten the prompt several times, and the system is still wrong in the same way, which is exactly what you would expect if the failure is upstream. Nobody has checked whether the answer was in the retrieved set, because that check is manual and unglamorous and nobody enjoys doing it twenty times.',
          'The second pattern is that there is no evaluation set, so every change has been judged by trying a handful of questions someone remembers. That makes improvement unfalsifiable: it feels better, and there is no way to tell whether it is.',
          'We build the evaluation set from your team\'s own questions and report the scores, so quality becomes a number you can check rather than an impression we assert. That is also the honest way to hand a system over: you should be able to tell whether it is still working after we have gone.',
        ],
      },
    ],

    faqs: [
      {
        question: 'Why does my RAG system give wrong answers?',
        answer:
          'There are four distinct causes with different fixes: the passage was never retrieved, it was retrieved but ranked too low, it was retrieved and the model ignored it, or irrelevant context derailed the answer. Only the third is a model problem, and in practice it is the least common.',
      },
      {
        question: 'Should I use a better model to fix retrieval problems?',
        answer:
          'Usually not, and it is the most common wasted effort. If the passage that answers the question was never retrieved, no model can answer correctly and a larger one will be wrong more fluently. Measure context recall first, because it tells you whether the answer was even available.',
      },
      {
        question: 'What is a good faithfulness score?',
        answer:
          'There is no universal threshold, and anyone quoting one without knowing your corpus is guessing. What matters is your own baseline and whether changes move it. Note also that high faithfulness with low recall is a bad result: it means the system is reliably reporting the wrong document.',
      },
      {
        question: 'How do I improve retrieval accuracy?',
        answer:
          'Diagnose before changing anything. Low recall points at ingestion: chunking, coverage, what actually got indexed. Low precision points at ranking, where a reranking pass or passing fewer chunks often helps quickly. Changing both at once means you will not know which worked.',
      },
      {
        question: 'Why did my system get worse after reindexing?',
        answer:
          'Because a reindex changes retrieval behaviour even when no code changed, and without an evaluation set there is no way to see it happen. This is the strongest practical argument for building one early: it converts a vague sense that things got worse into a score that moved.',
      },
    ],

    publishedAt: '2026-10-19T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'Ragas documentation, Faithfulness',
        url: 'https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/faithfulness/',
        readOn: '2026-09-12',
        supports: 'The definition of faithfulness and that it measures consistency with retrieved context rather than truth.',
      },
      {
        label: 'Ragas documentation, Context Precision',
        url: 'https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/context_precision/',
        readOn: '2026-09-12',
        supports: 'The ranking measure and its precision-at-k calculation.',
      },
      {
        label: 'Ragas documentation, Context Recall',
        url: 'https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/context_recall/',
        readOn: '2026-09-12',
        supports: 'The retrieval-coverage measure.',
      },
      {
        label: 'Ragas documentation, Noise Sensitivity',
        url: 'https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/noise_sensitivity/',
        readOn: '2026-09-12',
        supports: 'The measure of errors induced by relevant and irrelevant retrieved documents.',
      },
    ],

    limits: [
      'These are framework definitions, not empirical claims about how often each failure occurs. How your system fails is a question about your corpus that only your own evaluation set can answer.',
      'No failure-rate percentages appear here. The circulating ones could not be traced to any named study and are deliberately absent rather than accidentally omitted.',
      'Ragas is used because it publishes precise definitions and formulas. It is not the only framework and this is not a recommendation of one tool over another.',
      'Evaluation tells you where a system fails, not how to fix it. The repair is specific to the corpus, the chunking and the domain.',
    ],

    cta: {
      heading: 'Have a retrieval system nobody quite trusts?',
      body: 'The first week of this work is usually diagnosis rather than repair: twenty real failures, checked one at a time for whether the answer was even retrieved. It is unglamorous and it is what tells you which of the four problems you actually have.',
      buttonLabel: 'Get it diagnosed',
      href: '/contact?service=rag-development',
    },

    related: ['how-to-evaluate-an-agent'],

    seo: {
      title: 'Why Your RAG System Returns Wrong Answers, by Failure Type',
      description:
        'Four failures produce the same symptom and need different fixes. Only one is the model. How to tell which you have before changing anything.',
    },
  },

  {
    slug: 'how-to-evaluate-an-agent',
    cluster: 'trust',
    title: 'How to Evaluate an AI Agent Before You Trust It',
    navLabel: 'How to evaluate an agent',
    card: 'People ask this publicly and get no answers, into a space full of vendors selling dashboards. The answer is four measurable things.',

    answer:
      'Agent evaluation asks a different question from RAG evaluation: not whether the answer was grounded, but whether the agent did the right things. Four measurable dimensions cover it: did it call the correct tools with the correct arguments, in the correct order where order matters, did it achieve the user\'s actual goal, and did it stay within the domain it was given. Each is separately scoreable, and which one you should care about depends on whether you are judging the method or the outcome.',

    sections: [
      {
        kind: 'prose',
        heading: 'This question gets asked into a void',
        body: [
          'Go looking for how practitioners evaluate agents in production and a pattern emerges quickly. "What eval harness holds up in practice, and what is still missing?" attracted one reply. "How do I reliably eval my AI models", zero. "How do you integration-test AI and LLMs?", asked twice, zero replies each time. "What observability stack are you using for AI agents in production?", zero.',
          'Meanwhile the same search space is full of product launches selling observability platforms. So the question is being asked, repeatedly, by people running real systems, and what comes back is either silence or a sales pitch.',
          'The gap is not that answers do not exist. It is that they are unglamorous and specific to what your agent does, which makes them bad marketing and good engineering.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Why RAG metrics do not cover this',
        body: [
          'If you have read about evaluating retrieval systems, you have met faithfulness, context precision and context recall. Those measure whether an answer was grounded in the right material.',
          'An agent does things. It calls tools, takes actions, changes state. An agent can produce a perfectly grounded sentence describing a booking it failed to make, and every retrieval metric will score it well, because the sentence is faithful to the context. The failure is in the doing rather than the saying.',
          'So agent evaluation needs its own dimensions, and the useful ones are about actions rather than text.',
        ],
      },
      {
        kind: 'table',
        heading: 'The four dimensions, and when each is the right one',
        intro:
          'These are the standard agent metrics in the Ragas framework. The selection rule in the last column is the part that matters, because measuring the wrong one produces confident nonsense.',
        columns: ['Dimension', 'What it scores', 'Use it when'],
        rows: [
          ['Tool call accuracy', 'Right tools, right arguments, right order', 'The method matters, not just the result'],
          ['Tool call F1', 'Precision and recall over tool calls, unordered', 'You want partial credit while iterating'],
          ['Agent goal accuracy', 'Binary: did it achieve what the user wanted', 'You care about outcome, not route'],
          ['Topic adherence', 'Did it stay inside its domain', 'The agent must refuse things'],
        ],
      },
      {
        kind: 'prose',
        heading: 'Tool call accuracy, and the ordering trap',
        body: [
          'Tool call accuracy "measures how accurately an LLM agent invokes tools compared to expected tool calls. It evaluates both the sequence of tool calls and the accuracy of their arguments."',
          'The scoring rule is worth knowing before you use it, because it is unforgiving by default: "Final score = (argument accuracy) x (sequence aligned ? 1 : 0)". In strict mode, an agent that calls exactly the right tools with exactly the right arguments in the wrong order scores zero.',
          'That is correct behaviour for a workflow where order is load-bearing, such as one that must search before it filters. It is wrong for parallel work, such as fetching weather for three cities, where the framework offers a flexible-order mode instead.',
          'Choosing the wrong mode is the most common way to get a meaningless number out of this metric. A score of zero on a parallel workflow tells you nothing except that you configured the metric badly.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Goal accuracy, which is usually what you actually care about',
        body: [
          'Agent goal accuracy is "a binary metric, with 1 indicating that the AI has achieved the goal and 0 indicating that the AI has not achieved the goal." It can be scored against a reference outcome you supply, or by inferring the goal from the conversation.',
          'The documentation gives the selection rule plainly: for "Book me a flight to Paris", if you only care that the booking succeeds rather than which intermediate tools were called, use goal accuracy rather than tool accuracy.',
          'This matters more than it sounds. Teams frequently instrument tool calls because tool calls are easy to log, then optimise the agent towards a particular route through the tools, and end up with a system that follows the expected path and does not book the flight. Measuring the method is only useful when the method is the thing you care about.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Topic adherence, and the half of it people forget',
        body: [
          'Topic adherence "evaluates the ability of the AI to stay on predefined domains during the interactions", and it matters in any system where the agent is supposed to decline things.',
          'The useful subtlety is in how recall is defined. It counts against you for "queries that were refused and should have been answered", which means the metric penalises over-refusal as well as under-refusal.',
          'That is the failure mode nobody instruments. It is easy to make an agent safe by making it useless, and a system that refuses too much looks perfect on every measure that only counts bad outputs. Measuring both directions is what stops guardrails quietly eating the product.',
        ],
      },
      {
        kind: 'note',
        tone: 'info',
        heading: 'The metrics need a reference, which is the actual work',
        body:
          'Three of these four require you to supply the expected answer: the expected tool calls, the reference outcome, or the list of permitted topics. That is not a limitation of the framework, it is the job. Deciding what the agent should have done, for fifty real cases, is the part that takes a week and the part that cannot be bought. Any product promising agent evaluation without you defining correct behaviour is measuring something other than correctness.',
      },
      {
        kind: 'steps',
        heading: 'Building an evaluation set that survives contact with production',
        intro:
          'Same discipline as for retrieval systems, adapted to actions. The fifth step is the one that decides whether any of it lasts.',
        steps: [
          {
            title: 'Take real requests, in the words people used',
            body:
              'Not the demo cases. The ambiguous ones, the badly phrased ones, the ones with a typo in the account number. Fifty real requests beat five hundred synthetic ones, because synthetic cases inherit your assumptions about how people will ask.',
          },
          {
            title: 'Write down what should have happened',
            body:
              'For each: which tools, with what arguments, and what the end state should be. This is where disagreement surfaces inside your own team, which is valuable and is much cheaper now than after launch.',
          },
          {
            title: 'Include things it should refuse',
            body:
              'Requests outside the domain, requests that need a human, requests that are ambiguous enough that asking a clarifying question is the correct behaviour. An agent that never refuses has not been tested on refusal.',
          },
          {
            title: 'Decide whether you are scoring method or outcome',
            body:
              'Both is fine, but they answer different questions and they can disagree. An agent that reached the right outcome by an unexpected route is a pass on one and a fail on the other, and knowing which you meant is the difference between a useful signal and noise.',
          },
          {
            title: 'Run it on a schedule, not on suspicion',
            body:
              'Model versions change under you, tools change, the corpus drifts. A suite that only runs when someone is worried is a suite that tells you about a problem after it has been happening for a month.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'What we do with this',
        body: [
          'We build agentic systems, and the evaluation set is the deliverable clients most often question and most often thank us for later.',
          'The objection is reasonable: it is work that produces no visible feature, and at the point it is being scoped the agent appears to work. The honest answer is that it appears to work on the cases someone chose, and the set exists to tell you about the ones nobody chose.',
          'What changes the conversation is usually the refusal cases. Once a team sits down to write out what the agent should decline, they discover they disagree with each other about it, and that discovery is worth the entire exercise regardless of what the scores say afterwards.',
          'We also hand the set over. A system you cannot evaluate after the builder leaves is a system you are renting rather than owning, and the score is the only thing that tells you whether it still works in March.',
        ],
      },
    ],

    faqs: [
      {
        question: 'How do I evaluate an AI agent?',
        answer:
          'Across four measurable dimensions: whether it called the right tools with the right arguments, whether it achieved the user\'s goal, and whether it stayed inside its permitted domain, plus a softer precision and recall measure over tool calls for partial credit while iterating. Which matters depends on whether you care about method or outcome.',
      },
      {
        question: 'What is the difference between agent evaluation and RAG evaluation?',
        answer:
          'RAG metrics score whether an answer was grounded in retrieved material. Agent metrics score whether the agent did the right things. An agent can produce a perfectly grounded sentence describing a booking it never made, and every retrieval metric will pass it.',
      },
      {
        question: 'Why does my tool call accuracy score zero?',
        answer:
          'Most likely because the metric is in strict-order mode and your workflow runs tools in parallel. The scoring multiplies argument accuracy by whether the sequence aligned, so correct tools in an unexpected order score zero. Use flexible-order mode where order genuinely does not matter.',
      },
      {
        question: 'Do I need a reference answer for every test case?',
        answer:
          'For three of the four dimensions, yes: expected tool calls, a reference outcome, or a list of permitted topics. That is the real work of evaluation, and any product offering agent evaluation without you defining correct behaviour is measuring something other than correctness.',
      },
      {
        question: 'How many test cases do I need?',
        answer:
          'Fewer than people expect, if they are real. Fifty genuine requests including the ambiguous and the refusable ones are worth more than several hundred synthetic cases, because synthetic cases inherit your own assumptions about how users will ask.',
      },
    ],

    publishedAt: '2026-10-20T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'Ragas documentation, agentic and tool use metrics',
        url: 'https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/agents/',
        readOn: '2026-09-12',
        supports:
          'Definitions and scoring rules for topic adherence, tool call accuracy, tool call F1 and agent goal accuracy, including the strict and flexible ordering modes and the selection rule between them.',
      },
    ],

    limits: [
      'These are framework definitions rather than empirical claims. They tell you what can be measured, not how often agents fail on each dimension.',
      'Ragas is used because it publishes precise definitions and formulas. It is not the only framework and this is not a recommendation of one over another.',
      'The quoted public threads evidence that the question is asked and goes unanswered. They are not a sample of practitioner opinion.',
      'Evaluation tells you whether behaviour changed, not why. Diagnosis is a separate step and usually a manual one.',
    ],

    cta: {
      heading: 'Want quality to be a number rather than an impression?',
      body: 'We build the evaluation set from your team\'s own requests, including the ones the agent should refuse, and hand it over with the system. A system you cannot evaluate after the builder leaves is one you are renting.',
      buttonLabel: 'Talk about evaluation',
      href: '/contact?service=agentic-ai-development',
    },

    related: ['why-your-rag-returns-wrong-answers'],

    seo: {
      title: 'How to Evaluate an AI Agent Before You Trust It',
      description:
        'Four measurable dimensions: tool accuracy, goal accuracy, topic adherence and tool call F1. Which to use depends on whether you care about method or outcome.',
    },
  },

  {
    slug: 'how-to-stop-ai-making-things-up',
    cluster: 'trust',
    title: 'You Cannot Stop AI Making Things Up. You Can Make It Detectable.',
    navLabel: 'Stopping hallucination',
    card: 'Every technique sold as a hallucination fix is really a detection or containment measure. That distinction is the whole engineering problem.',

    answer:
      'There is no setting that stops a language model producing confident false statements, and the techniques sold as fixes do something else: they make wrongness detectable, or they limit what a wrong answer can do. Retrieval narrows what the model draws on, citations let a reader check, faithfulness scoring makes it measurable, and abstention gives the system somewhere to go when it does not know. None of them is a guarantee, and a vendor promising one is describing a product that does not exist.',

    sections: [
      {
        kind: 'prose',
        heading: 'The question people ask, and the honest answer',
        body: [
          '"How do I stop the AI hallucinating" is one of the most common questions we get, and the honest answer disappoints everyone the first time they hear it: you do not.',
          'A language model produces plausible continuations. Plausible and true overlap heavily, which is why the technology is useful, and they are not the same thing, which is why this problem does not go away with a better model or a better prompt.',
          'What you can do is build a system where wrongness shows up rather than passing silently, and where a wrong answer cannot do much damage before it does. That is an engineering problem with real answers, and it is a different problem from the one people think they are asking about.',
        ],
      },
      {
        kind: 'table',
        heading: 'What each technique actually does',
        intro:
          'The middle column is the one that gets misdescribed in sales material. None of these eliminates the failure.',
        columns: ['Technique', 'What it really does', 'What it does not do'],
        rows: [
          ['Retrieval (RAG)', 'Narrows what the model draws on', 'Stop it going beyond that material'],
          ['Citations per claim', 'Makes checking cheap for a reader', 'Make the claim true'],
          ['Faithfulness scoring', 'Makes grounding measurable', 'Tell you if the source was right'],
          ['Abstention on empty retrieval', 'Gives the system an honest exit', 'Help when retrieval returns the wrong thing'],
          ['Human review', 'Catches what the reviewer notices', 'Survive a long run of correct outputs'],
        ],
      },
      {
        kind: 'prose',
        heading: 'Retrieval helps, and it relocates the problem',
        body: [
          'Grounding a model in your own documents is the single most effective measure available, and it is worth understanding what it changes.',
          'It narrows the material the model works from, which removes a large class of invented facts. What it introduces is a dependency on retrieval being right, and a new failure that is harder to spot: an answer that is faithfully derived from the wrong document.',
          'That system is not hallucinating. It is accurately reporting a superseded policy, and it will do so confidently and with a citation. Retrieval converts a model problem into a corpus problem, which is a good trade because corpus problems are fixable, but it is a trade rather than a solution.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Measurement is the part that is usually skipped',
        body: [
          'Faithfulness "measures how factually consistent a response is with the retrieved context. It ranges from 0 to 1... A response is considered faithful if all its claims can be supported by the retrieved context." It works by splitting the answer into claims and checking each one against what was retrieved.',
          'That gives you a number rather than an impression, which is the first honest thing anyone can say about a system like this.',
          'And it carries a limit worth repeating because it is the most misunderstood point in the field: faithfulness measures whether the answer follows from what was retrieved, not whether it is true. A system can score 1.0 and be completely wrong if retrieval returned the wrong document. It has to be read alongside a retrieval measure, or it will reassure you about exactly the failure it cannot see.',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'The failure that is worse than an obvious mistake',
        body:
          'A pre-registered field experiment with 758 consultants found that on a task deliberately chosen to sit beyond the model\'s capability, people using AI were 19 percentage points LESS likely to reach a correct answer than people without it. The paper describes a jagged frontier: the boundary between what the model does well and badly is irregular, and the two look identical in apparent difficulty. It also notes that AI made wrong answers more persuasive and coherent. Disclosure that matters: the study was run with a consulting firm that sells AI services, on its own consultants, though it is peer reviewed.',
      },
      {
        kind: 'prose',
        heading: 'Abstention is a feature and it is usually missing',
        body: [
          'The behaviour that most improves trust is the one demos leave out: saying it does not know.',
          'When retrieval returns nothing relevant, the correct output is to say so. Most systems will instead answer from whatever came back, because the prompt asked for an answer and producing one is what the model does.',
          'Building abstention properly means deciding a threshold, testing it on questions the corpus genuinely cannot answer, and accepting that the system will sometimes decline things it could have handled. That trade is worth making. A system that occasionally says it does not know is one people check less, because its confidence carries information.',
          'The measurement caveat here is real: a topic adherence score penalises "queries that were refused and should have been answered", so over-refusal is a failure too. You are tuning, not maximising.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Why human review decays',
        body: [
          'The instinct is to put a person in front of the output, and it works at first.',
          'It degrades for a documented reason. Bainbridge observed in 1983 that a classic way to enforce attention is to require an operator to keep a log, and noted the problem: "people can write down numbers without noticing what they are." A reviewer approving a long run of correct outputs is doing exactly that, and the run of correct outputs is what a working system produces.',
          'So review has to be designed rather than assumed. Sample rather than approve everything, mix in cases with known-wrong answers so attention has something to catch, and rotate the work so the reviewer still practises the underlying task. Otherwise the review is a formality that produces an audit trail and no safety.',
        ],
      },
      {
        kind: 'steps',
        heading: 'What to build instead of a fix',
        intro:
          'In order of how much they reduce risk per unit of effort. The first two are cheap and almost always skipped.',
        steps: [
          {
            title: 'Show the source next to every claim',
            body:
              'One click from an assertion to the passage it came from. This is the highest-value thing on the list because it makes checking cheap, and claims that are cheap to check get checked.',
          },
          {
            title: 'Make "I do not know" a first-class output',
            body:
              'Decide what happens when retrieval comes back empty, test it against questions your corpus cannot answer, and treat a refusal as a correct response rather than a failure.',
          },
          {
            title: 'Score faithfulness against a real set',
            body:
              'With a retrieval measure beside it, always. Faithfulness alone will tell you a system is well grounded in the wrong document.',
          },
          {
            title: 'Limit what a wrong answer can do',
            body:
              'If the output triggers an action, the containment matters more than the accuracy. Read-only where possible, confirmation before anything irreversible, and idempotency on anything that can be retried.',
          },
          {
            title: 'Design the review rather than assuming it',
            body:
              'Sampling, seeded known-bad cases, rotation. A reviewer who has approved four hundred correct outputs in a row is not reviewing.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'What we tell clients who ask for a guarantee',
        body: [
          'We build retrieval and agentic systems, and this request comes up in most first conversations, usually phrased as wanting the system to be right every time.',
          'What we say is that we cannot sell that and nor can anyone else, and that the useful version of the request is a system where being wrong is visible and survivable. Then we talk about what a wrong answer would actually cost in their case, because that decides how much of the list above is worth building.',
          'For an internal knowledge tool where a wrong answer means somebody looks it up properly, citations and abstention are probably enough. For something that touches money or a customer commitment, the containment work matters more than the accuracy work, and we would rather scope that in at the start than have the other conversation later.',
          'Clients who want the guarantee sometimes go elsewhere and get one. It is not a promise anyone can keep, and we would rather lose the work than make it.',
        ],
      },
    ],

    faqs: [
      {
        question: 'How do I stop AI hallucinations?',
        answer:
          'You cannot eliminate them. What works is making wrongness detectable and survivable: ground the model in your own documents, show the source beside every claim, score how well answers are supported, build a genuine "I do not know" path, and limit what a wrong answer can trigger.',
      },
      {
        question: 'Does RAG stop hallucination?',
        answer:
          'It reduces one class of it by narrowing what the model draws on, and introduces another: an answer faithfully derived from the wrong retrieved document. That system is not hallucinating, it is accurately reporting the wrong source, and it will do so with a citation.',
      },
      {
        question: 'Can I just add a fact-checking step?',
        answer:
          'A second model checking the first helps with some failures and shares blind spots with it, since both are drawing on similar training. It is worth doing and it is not a guarantee. Checking against a source of truth beats checking against another model.',
      },
      {
        question: 'Is a bigger model less likely to make things up?',
        answer:
          'Somewhat, and not reliably, and the improvement can work against you. A field experiment found that on tasks beyond the model\'s capability, people using AI did worse than people without it, partly because wrong answers were more persuasive and coherent.',
      },
      {
        question: 'How do I know if my system is making things up right now?',
        answer:
          'Faithfulness scoring on an evaluation set with known answers, read alongside a retrieval measure. Without a set you are relying on someone noticing, and the failures that matter are the ones designed by their nature not to be noticed.',
      },
    ],

    publishedAt: '2026-10-21T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'Ragas documentation, Faithfulness',
        url: 'https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/faithfulness/',
        readOn: '2026-09-12',
        supports: 'The definition of faithfulness and how the score is computed.',
      },
      {
        label: 'Ragas documentation, agentic metrics including topic adherence',
        url: 'https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/agents/',
        readOn: '2026-09-12',
        supports: 'That topic adherence recall penalises queries that were refused and should have been answered.',
      },
      {
        label: 'Dell\'Acqua et al., Navigating the Jagged Technological Frontier, Organization Science 37(2), 2026',
        url: 'https://pubsonline.informs.org/doi/10.1287/orsc.2025.21838',
        readOn: '2026-09-11',
        supports: 'The 19 percentage point result on tasks beyond the model\'s capability, and that AI made wrong answers more persuasive.',
      },
      {
        label: 'Bainbridge, Ironies of Automation, Automatica 19(6), 1983',
        url: 'https://ckrybus.com/static/papers/Bainbridge_1983_Automatica.pdf',
        readOn: '2026-09-11',
        supports: 'That people can log numbers without noticing what they are, and the vigilance problem in monitoring.',
      },
    ],

    limits: [
      'The consulting field experiment was run in collaboration with a firm that sells AI consulting, on its own consultants. It is peer reviewed and pre-registered, and the conflict is real and disclosed here.',
      'No hallucination-rate figures appear in this post. The circulating ones could not be traced to named studies with disclosed methods.',
      'This covers making wrongness detectable and survivable. Reducing the base rate through fine-tuning or model choice is a different question and is not covered.',
      'We sell retrieval and agentic systems, so read the section on what we tell clients with that in mind. The techniques listed are public and you can apply them without us.',
    ],

    cta: {
      heading: 'Deciding how much of this your case actually needs?',
      body: 'It turns on what a wrong answer costs you. An internal knowledge tool needs citations and an honest refusal path; anything touching money or a customer commitment needs the containment work scoped in from the start.',
      buttonLabel: 'Talk it through',
      href: '/contact?service=rag-development',
    },

    related: ['why-your-rag-returns-wrong-answers', 'how-to-evaluate-an-agent'],

    seo: {
      title: 'You Cannot Stop AI Making Things Up, Only Detect It',
      description:
        'Every technique sold as a hallucination fix is really detection or containment. What each actually does, what none of them does, and what to build instead.',
    },
  },
];
