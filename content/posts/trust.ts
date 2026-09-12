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

  {
    slug: 'stopping-an-agent-burning-money',
    cluster: 'trust',
    title: 'Stopping an Agent From Burning Money in a Loop',
    navLabel: 'Agents burning money',
    card: 'A documented case ran up $6,531 in 24 hours. Every individual action succeeded, which is why nothing stopped it.',

    answer:
      'An agent that loops does not error. Each action succeeds, the logs stay clean, and the bill grows until somebody notices. The framework-level defences are weaker than they look: one practitioner describes a max-iteration limit as "a blind budget" because it detects time rather than redundancy. What actually works is a spend ceiling per run, tracking tokens per completed task rather than in total, and idempotency keys so that repeated work is at least harmless.',

    sections: [
      {
        kind: 'prose',
        heading: 'The shape of the problem',
        body: [
          'A looping agent is not a crash. It is a system doing what it was told, repeatedly, with each step returning success.',
          'The documented case worth remembering is an agent that ran up 6,531 dollars in 24 hours by repeatedly deploying the same infrastructure template. Nothing errored. No alert fired, because alerts watch for failure and there was none. The system was working exactly as instructed, and the instruction was wrong in a way nothing was watching for.',
          'A practitioner running agents in production describes the general case: loops that "run indefinitely, burning thousands of dollars in LLM API credits before the user manually kills the process".',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'Why the built-in limit does not save you',
        body:
          'Every agent framework has a maximum iteration setting, and it is the first thing people reach for. The same practitioner describes what it actually gives you: "A blind budget. It doesn\'t detect redundancy, it just detects time." Set it high and it does not stop the expensive case. Set it low and it kills legitimate long-running work. It is a timeout wearing the costume of a safety measure, and it cannot tell the difference between an agent making progress and an agent going round in circles.',
      },
      {
        kind: 'prose',
        heading: 'Three distinct ways money disappears',
        body: [
          'They need different defences, and treating them as one problem is why the usual response does not work.',
          'The first is the repeat loop: the agent tries something, does not recognise it already tried it, and tries again. Cost grows linearly and the output never improves.',
          'The second is context growth. Every turn re-sends the whole conversation, so a run that takes twenty turns pays for the early turns twenty times. A verbose tool result is not charged once, it is charged on every subsequent call for the rest of the run.',
          'The third is duplicate execution, which is the one with real-world consequences beyond cost. A tool call that runs long can be re-dispatched while the original is still running, and both complete successfully. If the tool sends an email, the customer got two.',
        ],
      },
      {
        kind: 'table',
        heading: 'What stops each one',
        intro:
          'The middle column is the signal that tells you it is happening, which matters because none of these produce an error.',
        columns: ['The failure', 'The signal', 'The defence'],
        rows: [
          ['Repeat loop', 'Tokens per completed task rising', 'Per-run spend ceiling, not per month'],
          ['Context growth', 'Cost per turn rising within a run', 'Terse tool output, prompt caching'],
          ['Duplicate execution', 'Two successful runs of one action', 'Idempotency keys on side-effecting tools'],
          ['Runaway overall', 'Spend with no matching output', 'Kill switch a human can reach'],
        ],
      },
      {
        kind: 'prose',
        heading: 'The metric that catches it early',
        body: [
          'Total spend is a lagging indicator and a monthly cap tells you afterwards. The number that moves first is tokens per completed task.',
          'It works because it holds volume constant. If your agent handled two hundred tasks last week and two hundred this week, and the tokens per task doubled, something is looping whether or not anyone has noticed a slowdown. Total spend would have shown the same rise and you would have wondered whether you were just busier.',
          'It also degrades gracefully as a definition of done. If you cannot cleanly define a completed task, tokens per user-visible outcome works nearly as well, and the discipline of having to name what completion means is useful in its own right.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Caching is the largest saving and it is architecture',
        body: [
          'Before adding controls, it is worth removing the cost that should not be there.',
          'An agent re-sends its system prompt and tool definitions on every turn, so that fixed prefix is the largest repeated charge in a run. Cached input is priced at a fraction of fresh input, so moving that prefix to cache is typically the single biggest reduction available, and it changes nothing about behaviour.',
          'The cache write costs more than an ordinary read, so caching is a small loss on a prefix used once and a large win on one reused across turns. The break-even arrives around the third read, which is why this is an agent optimisation specifically. One-shot calls do not benefit.',
          'The second largest is usually tool verbosity. A tool that returns a whole record when the agent needed one field costs you on every subsequent turn, because that output stays in the context for the rest of the run.',
        ],
      },
      {
        kind: 'steps',
        heading: 'Controls worth having before an agent runs unattended',
        intro:
          'Roughly in order of effort. The first two take an afternoon and prevent the expensive cases.',
        steps: [
          {
            title: 'Set a spend ceiling per run',
            body:
              'Not per month. A per-run budget stops a loop while it is still cheap, and it is the only control that acts within the window where the damage happens. Decide what a normal run costs, set the ceiling at a generous multiple, and have it halt rather than warn.',
          },
          {
            title: 'Put idempotency keys on every side-effecting tool',
            body:
              'Payments, emails, tickets, deployments, writes. This does not stop the loop, it makes the loop harmless, which is a different and in some ways more valuable property. It is also the only defence against duplicate execution, because the framework cannot reliably provide exactly-once semantics.',
          },
          {
            title: 'Track tokens per completed task',
            body:
              'The leading indicator. Alert on the ratio rather than the total, because the total moves with volume and the ratio does not.',
          },
          {
            title: 'Cache the fixed prefix and trim tool output',
            body:
              'The two largest cost reductions available, both architectural, both invisible to the user. Do these before deciding the model is too expensive.',
          },
          {
            title: 'Give someone a kill switch they can actually reach',
            body:
              'In the documented case, the process ran until a human killed it manually. That is the last line of defence and it should not require finding the right terminal. Somebody on call should be able to stop every agent from one place.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'What we build in by default',
        body: [
          'We build agentic systems, and the per-run budget and the idempotency work are in every scope we write, usually as the two line items clients ask about.',
          'The question is fair: neither produces a visible feature, and at the point of scoping the agent appears to work. What we say is that both are cheap now and neither is retrofittable under pressure. Adding idempotency after a duplicate charge means doing it while somebody is refunding customers.',
          'The honest asymmetry is the argument. Idempotency keys on a handful of tools are an afternoon. The alternative is however many duplicate actions went out before someone noticed, plus the credibility cost of having to explain it.',
          'We also set the per-run ceiling deliberately low at first and raise it once we know what a normal run costs. It is easier to relax a limit that fires than to explain a bill that did not.',
        ],
      },
    ],

    faqs: [
      {
        question: 'How do I stop an AI agent running up a huge bill?',
        answer:
          'Set a spend ceiling per run rather than per month, because only a per-run limit acts inside the window where the damage happens. Track tokens per completed task as the leading indicator, and make sure a human has a kill switch they can reach quickly.',
      },
      {
        question: 'Does max iterations protect me?',
        answer:
          'Only partially. One practitioner calls it "a blind budget" because it detects time rather than redundancy: it cannot distinguish an agent making progress from an agent going in circles. Set high it misses the expensive case, set low it kills legitimate work.',
      },
      {
        question: 'Why does my agent cost more than the model pricing suggests?',
        answer:
          'Usually context growth and retries. Every turn re-sends the whole conversation, so early turns are paid for repeatedly, and a verbose tool result is charged on every subsequent call. Caching the fixed prefix and trimming tool output are typically the two largest savings.',
      },
      {
        question: 'What is the single biggest cost saving available?',
        answer:
          'Prompt caching on the fixed prefix, because an agent re-sends its system prompt and tool definitions every turn and cached input is priced at a fraction of fresh input. It changes nothing about behaviour and breaks even around the third read.',
      },
      {
        question: 'How do I stop duplicate charges from a retrying agent?',
        answer:
          'Idempotency keys on the tool, not settings in the framework. A reproduction in a major framework shows that even the strongest durability setting leaves exactly-once behaviour dependent on thread scheduling, so the responsibility sits with the tool you write.',
      },
    ],

    publishedAt: '2026-10-22T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'CrewAI issue: runaway loops and iteration limits',
        url: 'https://github.com/crewAIInc/crewAI/issues',
        readOn: '2026-09-11',
        supports: 'The description of loops running indefinitely, and of max_iter as a blind budget that detects time rather than redundancy.',
      },
      {
        label: 'LangGraph issue: durability and exactly-once semantics',
        url: 'https://github.com/langchain-ai/langgraph/issues',
        readOn: '2026-09-11',
        supports: 'That exactly-once behaviour across a crash boundary depends on the OS thread scheduler.',
      },
      {
        label: 'Anthropic pricing, including prompt caching read and write rates',
        url: 'https://www.anthropic.com/pricing',
        readOn: '2026-09-11',
        supports: 'That cached input is priced well below fresh input, and that a cache write costs more than an ordinary read.',
      },
    ],

    limits: [
      'The cost incident and the loop reports are individual documented cases and practitioner accounts, not a measurement of how often this happens.',
      'Framework behaviour changes. The issues cited were read on 11 September 2026 and specific mechanisms may be fixed; the idempotency and budgeting advice holds regardless.',
      'Model prices change frequently. The caching argument is structural rather than dependent on a specific rate, but the arithmetic of any given saving is not.',
      'This covers cost and duplicate execution. Correctness failures are a separate problem and are covered elsewhere.',
    ],

    cta: {
      heading: 'About to let an agent run unattended?',
      body: 'The per-run budget and the idempotency work are an afternoon each and neither is retrofittable under pressure. Adding idempotency after a duplicate charge means doing it while somebody is refunding customers.',
      buttonLabel: 'Talk about your build',
      href: '/contact?service=agentic-ai-development',
    },

    related: ['what-to-monitor-once-an-agent-is-live'],

    seo: {
      title: 'Stopping an AI Agent From Burning Money in a Loop',
      description:
        'A documented case ran up $6,531 in 24 hours with every action succeeding. Why max-iteration limits do not help, and the four controls that do.',
    },
  },

  {
    slug: 'what-to-monitor-once-an-agent-is-live',
    cluster: 'trust',
    title: 'What to Monitor Once an AI Agent Is Live',
    navLabel: 'Monitoring a live agent',
    card: 'Your existing monitoring watches for errors. The failures that matter here do not produce one.',

    answer:
      'Conventional monitoring watches for exceptions, latency and error rates, and an agent\'s worst failures produce none of those: it reports success it did not achieve, repeats a side effect, or quietly starts refusing things it should handle. What you need instead is tokens per completed task, tool call outcomes separate from tool call counts, refusal rate in both directions, and a sampled correctness check. OpenTelemetry now has GenAI conventions covering this, though they are still at Development status.',

    sections: [
      {
        kind: 'prose',
        heading: 'Why the existing dashboard will not tell you',
        body: [
          'If you already run services in production you have monitoring, and it is watching the wrong things for this.',
          'Error rate, latency and uptime detect a system that has stopped working. An agent that has gone wrong usually has not stopped working. It is returning 200s, within normal latency, reporting task complete, and the thing it reported is not true.',
          'An operator running eleven agents in production for six months puts it directly: "Agents rarely fail catastrophically, they fail subtly... This is worse than obvious failures because you trust the output." Nothing in a conventional dashboard distinguishes that from success.',
        ],
      },
      {
        kind: 'table',
        heading: 'What to watch instead',
        intro:
          'Each row is a failure that produces no error. The signal column is what moves before anyone complains.',
        columns: ['What goes wrong', 'The signal', 'Why the usual dashboard misses it'],
        rows: [
          ['Agent loops', 'Tokens per completed task rising', 'Each call succeeds; totals move with volume'],
          ['Duplicate side effects', 'Tool successes exceeding tasks', 'Both executions return success'],
          ['Quality drift after a change', 'Sampled correctness falling', 'Output is still well-formed'],
          ['Over-refusal', 'Refusal rate rising', 'A refusal is a valid response'],
          ['Cost creep', 'Cache hit rate falling', 'Bill rises slowly, blamed on growth'],
        ],
      },
      {
        kind: 'prose',
        heading: 'Tokens per completed task, not tokens',
        body: [
          'The single most useful number, and it is a ratio rather than a total for a specific reason.',
          'Total spend moves with volume, so a rise is ambiguous: you were busier, or something is wrong. The ratio holds volume constant. Two hundred tasks last week, two hundred this week, and tokens per task doubled means something is looping whether or not anyone noticed a slowdown.',
          'It requires you to define a completed task, which people resist because it is fuzzy at the edges. It is worth doing anyway, and the argument that usually lands is that if you cannot say what completion means, you cannot tell whether the agent is achieving it, which is a larger problem than the metric.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Count tool outcomes, not tool calls',
        body: [
          'Most instrumentation counts how many times each tool was called. That number is nearly useless on its own, because the interesting failures show up as a mismatch between counts rather than in any single one.',
          'The comparison that matters is tool successes against tasks completed. If one task should send one email and your email tool is firing 1.3 times per task, you have duplicate execution, and every one of those calls returned success. Nothing errored, so nothing alerted.',
          'This is the case documented across agent frameworks: a tool call that runs long gets re-dispatched while the original is still running, and both complete successfully. Without the ratio it is invisible until a customer mentions receiving two of something.',
        ],
      },
      {
        kind: 'note',
        tone: 'info',
        heading: 'There is now a standard, and it is not finished',
        body:
          'OpenTelemetry has GenAI semantic conventions covering agent spans, tool execution and token usage, with attributes including gen_ai.operation.name, gen_ai.agent.id, gen_ai.conversation.id, gen_ai.usage.input_tokens and, usefully for cost work, gen_ai.usage.cache_read.input_tokens and gen_ai.usage.cache_write.input_tokens. Two things to know before adopting it. They MOVED out of the main semantic conventions repository into a dedicated one, so most published guidance now points at a page that says it is no longer maintained. And the agent spans carry Status: Development, with the schema URL still marked TODO. It is the right direction of travel and it is not a stable standard yet.',
      },
      {
        kind: 'prose',
        heading: 'Refusal rate, measured in both directions',
        body: [
          'An agent that starts refusing things it used to handle is broken, and it is the failure least likely to be reported, because a refusal looks like caution rather than a fault.',
          'It drifts for ordinary reasons: a model version changes, someone tightens a prompt after an incident, a guardrail gets a new rule. Each is individually sensible and the cumulative effect is a system quietly doing less.',
          'Worth measuring both ways. Evaluation frameworks handle this explicitly, penalising "queries that were refused and should have been answered" alongside the ones that should have been declined. A system that refuses everything scores perfectly on any measure that only counts bad outputs, which is why over-refusal has to be an alarm rather than a comfort.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Sampled correctness is the only thing that catches quality drift',
        body: [
          'Everything above is structural: it catches loops, duplicates and behavioural change without knowing whether any answer was right.',
          'For correctness there is no shortcut. Some proportion of live traffic has to be checked against known answers, which means running your evaluation set on a schedule rather than only before a release.',
          'The reason it has to be scheduled rather than triggered is that nothing triggers it. An agent producing well-formed, confident, wrong answers looks healthy on every structural signal. The only thing that surfaces it is periodically asking questions you already know the answers to.',
          'This is the control people cut first, because it costs tokens to run and produces no feature. It is also the only one that detects the failure mode the whole category is about.',
        ],
      },
      {
        kind: 'steps',
        heading: 'A monitoring setup that is proportionate',
        intro:
          'In order. The first two take an afternoon and catch the expensive failures; the rest is a day.',
        steps: [
          {
            title: 'Instrument spend per run with a hard ceiling',
            body:
              'Not a monthly alert. A per-run limit that halts, because only a per-run control acts inside the window where the damage happens.',
          },
          {
            title: 'Emit tokens and tool outcomes per task',
            body:
              'Tag every span with a task identifier so the ratios are computable. This is the piece that has to be designed in, because retrofitting task identity onto existing traces is painful.',
          },
          {
            title: 'Alert on ratios, not totals',
            body:
              'Tokens per completed task, tool successes per task, refusals per task. Totals move with volume and will train people to ignore the alert.',
          },
          {
            title: 'Run the evaluation set on a schedule',
            body:
              'Weekly is usually enough, and after every model version change or corpus reindex without exception. Both of those change behaviour with no deployment.',
          },
          {
            title: 'Follow the OpenTelemetry attribute names even while they move',
            body:
              'Naming your spans to match the emerging convention costs nothing now and means your traces are portable later. Just do not describe it internally as compliance with a standard, because it is not one yet.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'What we put in from the start',
        body: [
          'We build agentic systems, and the monitoring conversation is usually the one where a client and we are furthest apart at the beginning.',
          'The gap is reasonable. From their side, they already have monitoring, it is good, and it has served every other system they run. What takes explaining is that it is watching for a category of failure this system will not produce.',
          'The part that costs us arguments rather than money is task identity: tagging spans so that ratios are computable at all. It is trivial to design in and genuinely painful to add later, and it produces nothing visible on the day. We push on it anyway, because every useful signal in this post is a ratio and none of them can be computed without it.',
          'We also hand over the evaluation set and the schedule that runs it. A system you can only evaluate while the builder is still around is a system you are renting, and the scheduled run is what tells you in March whether it still works.',
        ],
      },
    ],

    faqs: [
      {
        question: 'What should I monitor for an AI agent in production?',
        answer:
          'Tokens per completed task, tool successes compared with tasks completed, refusal rate in both directions, and a sampled correctness check against known answers. Error rate and latency matter too, but they will not catch the failures specific to agents, which produce no error.',
      },
      {
        question: 'Why does my normal monitoring not catch agent failures?',
        answer:
          'Because it watches for things stopping. An agent that has gone wrong usually returns 200s at normal latency and reports success. The characteristic failure is a confident report of work that did not happen, which is indistinguishable from success in a conventional dashboard.',
      },
      {
        question: 'Is there a standard for AI observability?',
        answer:
          'OpenTelemetry has GenAI semantic conventions covering agent spans, tool execution and token usage. Two caveats: they recently moved to a dedicated repository, so a lot of published guidance points at a page that is no longer maintained, and the agent spans are at Development status rather than stable.',
      },
      {
        question: 'How do I detect duplicate tool execution?',
        answer:
          'Compare tool successes against tasks completed. If one task should send one email and the email tool fires more than once per task on average, you have duplicates. Counting tool calls alone will not show it, because every one of those calls succeeded.',
      },
      {
        question: 'How often should I run evaluations against a live system?',
        answer:
          'On a schedule rather than on suspicion, because nothing triggers it: an agent producing confident wrong answers looks healthy on every structural signal. Weekly is usually enough, plus after every model version change or corpus reindex, both of which change behaviour without a deployment.',
      },
    ],

    publishedAt: '2026-10-23T03:00:00Z',
    reviewedOn: '2026-09-12',

    sources: [
      {
        label: 'OpenTelemetry GenAI semantic conventions repository',
        url: 'https://github.com/open-telemetry/semantic-conventions-genai',
        readOn: '2026-09-12',
        supports:
          'The move out of the main repository, the Development status of agent spans, the operation names and the gen_ai attribute set including cache read and write token counts.',
      },
      {
        label: 'OpenTelemetry, GenAI spans page (superseded)',
        url: 'https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-spans/',
        readOn: '2026-09-12',
        supports: 'That the conventions have moved and this page is no longer maintained.',
      },
      {
        label: 'Ragas documentation, agentic metrics including topic adherence',
        url: 'https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/agents/',
        readOn: '2026-09-12',
        supports: 'That topic adherence penalises queries refused which should have been answered, which is the over-refusal signal.',
      },
      {
        label: 'LangGraph issue: duplicate tool dispatch after timeout',
        url: 'https://github.com/langchain-ai/langgraph/issues',
        readOn: '2026-09-11',
        supports: 'That a long-running tool call can be re-dispatched with both executions completing successfully.',
      },
    ],

    limits: [
      'The OpenTelemetry GenAI conventions are at Development status and actively changing, with commits during the week this was written. Treat the attribute names as a direction rather than a fixed target.',
      'The practitioner accounts of silent failure evidence that the problem recurs and in what words. They are not a measurement of frequency.',
      'No thresholds are given for any of these ratios, because the right value depends entirely on what your agent does. The signal is movement against your own baseline.',
      'This covers what to watch. Diagnosing what a moved signal means is a separate and usually manual job.',
    ],

    cta: {
      heading: 'Building something that will run unattended?',
      body: 'Task identity is the piece to design in rather than retrofit: without it none of the ratios in this post can be computed, and adding it later means reworking traces across the whole system. It costs nothing on day one.',
      buttonLabel: 'Talk about your build',
      href: '/contact?service=agentic-ai-development',
    },

    related: ['stopping-an-agent-burning-money', 'how-to-evaluate-an-agent'],

    seo: {
      title: 'What to Monitor Once an AI Agent Is Live',
      description:
        'Your existing monitoring watches for errors and agent failures produce none. The four ratios that move first, and why OpenTelemetry is not a settled standard yet.',
    },
  },
];
