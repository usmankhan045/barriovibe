import type { Post } from './types';

/**
 * The two questions that gate an AI purchase.
 *
 * Both are already answered in two sentences on the service pages, which is
 * where the expertise was sitting invisibly: "Will our data be used to train
 * models?" on the agentic AI page, and "How do I know it is not making things
 * up?" on the RAG page. A two-sentence answer is right for a service page and
 * far too short for the question, which is what these posts are for.
 */
export const AI_DATA_POSTS: Post[] = [
  {
    slug: 'does-your-data-train-the-model',
    cluster: 'ai-data',
    title: 'Does Your Data Train the Model? The Answer Depends on the Tier, Not the Vendor',
    navLabel: 'Does your data train the model',
    card: 'Every major provider commits not to train on business API data. The trap is a free tier on the same endpoint.',

    answer:
      'No, if you are on a paid business or API tier. Anthropic, OpenAI, Google and all three major clouds commit by default not to train on data sent through their business products, and OpenAI has done so since March 2023. The fear almost always comes from consumer terms that do not govern what you are buying. The real trap is narrower and sharper: Google\'s free Gemini tier permits human review of your inputs on the same endpoint as the paid one.',

    sections: [
      {
        kind: 'prose',
        heading: 'The question is asked in the wrong units',
        body: [
          'Nearly every security review we have been through asks some version of "do you use OpenAI?" It is the wrong question, and it cannot be answered usefully, because the same company applies opposite defaults to two different products.',
          'One OpenAI document states both halves. For consumer products: "When you use our services for individuals such as ChatGPT, Codex, and Sora, we may use your content to train our models." For business: "By default, we do not train on any inputs or outputs from our products for business users, including ChatGPT Business, ChatGPT Enterprise, and the API."',
          'Consumer is opt-out. API is opt-in. Same vendor, opposite defaults. So the question that actually determines the answer is not which company you are using, but which product, which tier, and whether it is being billed.',
        ],
      },
      {
        kind: 'table',
        heading: 'Where each provider stands, by tier',
        intro:
          'Read from each provider\'s own terms on 11 September 2026. "Trains by default" is the question a buyer is actually asking.',
        columns: ['Product', 'Trains on your data by default?', 'What governs it'],
        rows: [
          ['Anthropic API and Claude for Work', 'No', 'Commercial Terms, effective 17 June 2025'],
          ['Claude consumer (Free, Pro, Max)', 'User selects; not automatic', 'Consumer terms, updated 28 August 2025'],
          ['OpenAI API', 'No, since 1 March 2023', 'API data controls documentation'],
          ['ChatGPT consumer', 'Yes, unless you opt out', 'OpenAI data usage help article'],
          ['ChatGPT Business and Enterprise', 'No', 'Enterprise privacy page'],
          ['Gemini API, paid tier', 'No', 'Gemini API terms, effective 23 March 2026'],
          ['Gemini API, free tier', 'Yes, and humans may read it', 'Gemini API terms, effective 23 March 2026'],
          ['AWS Bedrock, Vertex AI, Azure OpenAI', 'No', 'Each cloud\'s service terms'],
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'The one that catches real teams',
        body:
          'Google\'s Gemini API terms split the same API into two data regimes by billing status alone. On the unpaid tier, "Google uses the content you submit to the Services and any generated responses to provide, improve, and develop Google products and services", and "human reviewers may read, annotate, and process your API input and output". On the paid tier, "Google doesn\'t use your prompts... or responses to improve our products". Same endpoint, same SDK, same code. Nothing in the developer experience tells you when you have crossed the line, which means a prototype on a free key, or a project whose billing lapses, is in the human-review regime without anyone deciding that.',
      },
      {
        kind: 'prose',
        heading: 'What "by default" is doing in those sentences',
        body: [
          'Every one of these commitments is phrased as a default, and a default implies something that is not the default. It is worth knowing what flips it, because the flip is usually something a developer does casually.',
          'The recurring exception is feedback. OpenAI states that "if you choose to provide feedback, the entire conversation associated with that feedback may be used to train our models", and Anthropic applies the same treatment to thumbs-up and thumbs-down. A developer clicking a rating button in a console is a genuine disclosure path, and it is not covered by the opt-out.',
          'If your application handles anything sensitive, the feedback UI is something to govern deliberately rather than to ship because the framework included it.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Training and retention are different questions',
        body: [
          'These get conflated in security reviews constantly, and they have different answers.',
          'Nobody trains on your API data by default. Almost everybody retains it for around 30 days for abuse monitoring: Anthropic states it deletes inputs and outputs "within 30 days of receipt or generation", and OpenAI retains API data "for up to 30 days".',
          'So a buyer who says "we need you to not keep our data" is asking the harder question. Both Anthropic and OpenAI offer zero data retention, and neither offers it as a setting. OpenAI states these controls are "subject to prior approval by OpenAI and acceptance of additional requirements"; Anthropic\'s is "subject to Anthropic\'s approval" and applied per organisation.',
          'That matters for your timeline rather than your architecture. If a security questionnaire assumes zero retention is a checkbox, correct it early, because the approval sits on the critical path.',
        ],
      },
      {
        kind: 'prose',
        heading: 'If you need the paperwork rather than the promise',
        body: [
          'Some buyers cannot act on a vendor help page, and need something their legal team can hold. The cloud route is usually the shortest path, because the contract is already signed.',
          'AWS states that "AWS and the third-party model providers will not use any inputs to or outputs from Amazon Bedrock to train Amazon Nova, Amazon Titan, or any third-party models". Google Cloud\'s Service Specific Terms carry a Training Restriction clause: "Google will not use Customer Data to train or fine-tune any AI/ML models without Customer\'s prior permission or instruction." Azure states that prompts and completions "are not used to train, retrain, or improve the base models".',
          'Azure adds something the others do not: a way to check. Microsoft documents that the content logging setting can be read back from the portal or the CLI, so the control is auditable rather than merely promised. If you are answering a questionnaire that asks how you would verify the claim, that is a real answer.',
          'Anthropic\'s own consumer announcement names this boundary explicitly, stating that its consumer changes do not apply to "API use, including via third parties such as Amazon Bedrock and Google Cloud\'s Vertex AI".',
        ],
      },
      {
        kind: 'steps',
        heading: 'What to actually check before you approve a build',
        intro:
          'Five questions. They take an afternoon and they replace a generalised worry with a specific answer.',
        steps: [
          {
            title: 'Name the exact product and tier',
            body:
              'Not "OpenAI" or "Google" but which endpoint, on which plan, billed to which account. This single question resolves most of the anxiety, because the business tiers almost all commit not to train.',
          },
          {
            title: 'Confirm every environment is billed',
            body:
              'Production, staging and CI. A free-tier key in a test pipeline is still processing real data if your test fixtures contain any, and on Gemini the free tier is where human review lives.',
          },
          {
            title: 'Decide what happens to feedback',
            body:
              'If the application has thumbs-up and thumbs-down, establish whether pressing it sends the conversation to the provider for training. Disable it or govern it if the content is sensitive.',
          },
          {
            title: 'Separate the retention ask from the training ask',
            body:
              'If you genuinely need zero retention rather than no training, start that approval now. It is not a setting, it requires the provider\'s sign-off, and it will otherwise surface late.',
          },
          {
            title: 'Get the DPA in place',
            body:
              'Anthropic incorporates its DPA with Standard Contractual Clauses automatically into its commercial terms. OpenAI executes one via a form. The clouds cover it under the existing agreement. None of these is a negotiation for a normal buyer.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'The honest summary',
        body: [
          'If you are buying an API-based build from anyone competent, your data is not training anyone\'s model, and that has been true of the OpenAI API since March 2023 and is written into Anthropic\'s commercial contract rather than its marketing.',
          'What deserves your attention is narrower: that free tiers on the same endpoints can carry entirely different terms, that feedback buttons are a real exception, and that retention is a separate and slower ask than training.',
          'Those are answerable in a morning, and they are worth more than a general assurance from anyone, ourselves included.',
        ],
      },
    ],

    faqs: [
      {
        question: 'Does OpenAI train on API data?',
        answer:
          'No. OpenAI states that "as of March 1, 2023, data sent to the OpenAI API is not used to train or improve OpenAI models (unless you explicitly opt in to share data with us)". The opposite is true of consumer ChatGPT, where content may be used for training unless you opt out, which is the source of most of the confusion.',
      },
      {
        question: 'Is the free Gemini API tier safe for production?',
        answer:
          'No, if your data is sensitive. Google\'s terms state that on the unpaid tier it uses submitted content "to provide, improve, and develop Google products and services" and that "human reviewers may read, annotate, and process your API input and output". The paid tier commits the opposite way. Run production, staging and CI on a billed project.',
      },
      {
        question: 'What is the difference between not training and zero retention?',
        answer:
          'Training is whether your data improves the model. Retention is whether it is stored at all. Business tiers do not train by default but do retain for around 30 days for abuse monitoring. Zero retention is a separate arrangement requiring the provider\'s prior approval at both Anthropic and OpenAI.',
      },
      {
        question: 'Does using AWS Bedrock or Azure change the answer?',
        answer:
          'It mostly changes the paperwork rather than the outcome. All three major clouds state that customer data is not used to train the underlying models, and the advantage is that the data processing terms are already part of an agreement you have signed. Azure additionally documents how to verify that content logging is disabled.',
      },
      {
        question: 'Can we run a model ourselves and avoid the question entirely?',
        answer:
          'Yes, and that is the right answer for some corpora. A self-hosted open model means nothing leaves your infrastructure, at the cost of running the infrastructure and generally accepting weaker output than the frontier models. It is a real trade rather than a free win, and it should be settled before anything is indexed rather than after.',
      },
    ],

    publishedAt: '2026-10-04T03:00:00Z',

    sources: [
      {
        label: 'Anthropic Commercial Terms of Service',
        url: 'https://www.anthropic.com/legal/commercial-terms',
        readOn: '2026-09-11',
        supports: 'That Anthropic may not train on customer content from its commercial services.',
      },
      {
        label: 'Anthropic, updates to consumer terms',
        url: 'https://www.anthropic.com/news/updates-to-our-consumer-terms',
        readOn: '2026-09-11',
        supports: 'The consumer training choice, and that it does not apply to API use including via Bedrock and Vertex.',
      },
      {
        label: 'OpenAI API data controls',
        url: 'https://developers.openai.com/api/docs/guides/your-data',
        readOn: '2026-09-11',
        supports: 'That API data is not used for training since 1 March 2023, the 30-day retention, and the zero-retention approval requirement.',
      },
      {
        label: 'Google Gemini API terms of service',
        url: 'https://ai.google.dev/gemini-api/terms',
        readOn: '2026-09-11',
        supports: 'The different paid and unpaid tier data regimes, including human review on the unpaid tier.',
      },
      {
        label: 'AWS Bedrock FAQs',
        url: 'https://aws.amazon.com/bedrock/faqs/',
        readOn: '2026-09-11',
        supports: 'That inputs and outputs are not used to train any models and are not shared with model providers.',
      },
      {
        label: 'Google Cloud Service Specific Terms',
        url: 'https://cloud.google.com/terms/service-terms',
        readOn: '2026-09-11',
        supports: 'The section 18 Training Restriction clause for Vertex AI.',
      },
      {
        label: 'Microsoft Learn, Azure AI Foundry data privacy',
        url: 'https://learn.microsoft.com/en-us/azure/ai-foundry/responsible-ai/openai/data-privacy',
        readOn: '2026-09-11',
        supports: 'That prompts and completions are not used to train base models, and the auditable content logging setting.',
      },
    ],

    limits: [
      'Terms as they stood on 11 September 2026. These documents are revised regularly and each carries its own effective date, given above.',
      'OpenAI\'s pages could not be retrieved live: both openai.com and help.openai.com returned 403 to every route tried. Those quotes come from archived captures of OpenAI\'s own pages, which is primary content but not a live read, and worth re-checking in a browser.',
      'This is not legal advice, and a security review that actually matters should read the operative agreement rather than a summary of it, including this one.',
      'Self-hosted and open-weight models are mentioned but not compared here. That is a different post and a genuinely different trade.',
    ],

    cta: {
      heading: 'Need this answered for a specific build?',
      body: 'We settle the data question at the corpus review stage, before anything is indexed, because it changes the architecture rather than the paperwork. If you have a security review asking these questions, we have answered them before.',
      buttonLabel: 'Talk about your build',
      href: '/contact?service=agentic-ai-development',
    },

    related: ['how-to-tell-if-your-rag-system-is-lying'],

    seo: {
      title: 'Does Your Data Train the Model? Tier, Not Vendor',
      description:
        'Every major provider commits not to train on business API data. The real trap is Google\'s free Gemini tier, where humans may read your inputs on the same endpoint.',
    },
  },

  {
    slug: 'how-to-tell-if-your-rag-system-is-lying',
    cluster: 'ai-data',
    title: 'How to Tell If Your RAG System Is Making Things Up',
    navLabel: 'Is your RAG system lying',
    card: 'Four different failures look identical to a user. Each has a different fix, and each is separately measurable.',

    answer:
      '"The chatbot gave a wrong answer" is not one problem, it is at least four, and they need different fixes. The document was never retrieved, it was retrieved but ranked below noise, it was retrieved and the model ignored it, or irrelevant context derailed an answerable question. Published evaluation metrics separate these, so the question is measurable rather than a matter of impression. A team without those numbers is guessing which failure they have.',

    sections: [
      {
        kind: 'prose',
        heading: 'Why "it hallucinates sometimes" is not a diagnosis',
        body: [
          'Every retrieval system gets something wrong eventually, and the usual response is to blame the model and try a bigger one. That is expensive, slow, and frequently fixes nothing, because in a retrieval system the model is often not where the failure happened.',
          'A user sees one symptom: a confident answer that is wrong. Underneath it are several distinct mechanisms, and telling them apart is the whole job. Swapping models when the real problem is that your chunking cut a table in half will not help, and you will have spent a month finding that out.',
        ],
      },
      {
        kind: 'table',
        heading: 'The four failures, and what each one actually is',
        intro:
          'These are the standard evaluation dimensions, as defined by the Ragas framework. The point is not the tool: it is that each dimension isolates a different stage of the pipeline.',
        columns: ['What went wrong', 'The measure', 'Where the fix is'],
        rows: [
          ['The right passage was never retrieved', 'Context recall', 'Ingestion: chunking, coverage, the index'],
          ['It was retrieved but buried below noise', 'Context precision', 'Ranking: embeddings, reranking, top-k'],
          ['It was retrieved and the answer ignored it', 'Faithfulness', 'Generation: the prompt, the model'],
          ['Irrelevant context derailed the answer', 'Noise sensitivity', 'Filtering, and knowing when to abstain'],
        ],
      },
      {
        kind: 'prose',
        heading: 'Faithfulness, and what it does not tell you',
        body: [
          'Faithfulness "measures how factually consistent a response is with the retrieved context", scored from 0 to 1, where "a response is considered faithful if all its claims can be supported by the retrieved context". It is computed by breaking the answer into claims, checking each against what was retrieved, and dividing supported claims by total claims.',
          'That is the closest thing to a direct measure of making things up, and it is worth understanding precisely, because it is narrower than it sounds.',
          'Faithfulness measures whether the answer follows from what was retrieved. It does not measure whether the answer is true. A system can score a perfect 1.0 while being completely wrong, if retrieval confidently returned the wrong document and the model faithfully summarised it.',
          'That is exactly why it has to be read against the retrieval measures rather than alone. High faithfulness with low context recall is a system that is reliably telling you what the wrong document said.',
        ],
      },
      {
        kind: 'prose',
        heading: 'The two retrieval measures do different jobs',
        body: [
          'Context recall "measures how many of the relevant documents (or pieces of information) were successfully retrieved. It focuses on not missing important results." Low recall means the answer was never available. No prompt engineering fixes that, and no better model fixes it either. The problem is upstream in ingestion.',
          'Context precision "evaluates the retriever\'s ability to rank relevant chunks higher than irrelevant ones", calculated as the mean of precision at each rank. Low precision with acceptable recall means the right passage was in there but buried, which is a ranking problem and often the cheapest of all these to fix.',
          'Noise sensitivity "measures how often a system makes errors by providing incorrect responses when utilizing either relevant or irrelevant retrieved documents", scored 0 to 1 where lower is better. It catches the case where retrieval technically worked but the surrounding junk pulled the answer off course.',
        ],
      },
      {
        kind: 'note',
        tone: 'warning',
        heading: 'About the percentages you have read',
        body:
          'Figures circulate claiming that some specific share of RAG failures trace to chunking, or that retrieval fails some specific percentage of the time. We looked for the studies behind the common ones and could not trace them to any named piece of research. We are not going to repeat them. The useful part of those claims is their shape, that failures concentrate in ingestion rather than in the model, and the honest way to hold that is as a hypothesis your own evaluation set can test, on your own corpus, where the answer actually applies to you.',
      },
      {
        kind: 'steps',
        heading: 'Building the evaluation set, which is the actual work',
        intro:
          'None of the above helps without a set of questions with known answers. This is unglamorous and it is the difference between managing a system and hoping about it.',
        steps: [
          {
            title: 'Collect real questions from the people who will use it',
            body:
              'Not questions you invented to demonstrate the system. The questions your team actually asks, in the words they actually use, including the badly phrased ones. Fifty real questions beat five hundred synthetic ones.',
          },
          {
            title: 'Write down the passage that should answer each',
            body:
              'This is the reference the retrieval measures compare against, and it is the tedious part. It is also what converts "it feels worse since the reindex" into a number that either moved or did not.',
          },
          {
            title: 'Include questions the corpus cannot answer',
            body:
              'The system should say it does not know. Most demos quietly omit this case, and it is the one that destroys trust fastest in production, because a confident answer to an unanswerable question teaches users they cannot rely on any answer.',
          },
          {
            title: 'Score before you change anything',
            body:
              'A baseline is what makes the next change legible. Without it you are comparing a new impression against a remembered one.',
          },
          {
            title: 'Re-score on a schedule, not on suspicion',
            body:
              'Corpora drift as documents are added and edited. A system that scored well at launch and was never measured again is the most common way a trusted tool quietly stops being trustworthy.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'What to ask a vendor, including us',
        body: [
          'If someone is building a retrieval system for you, these questions separate the people who have done it from the people who have demoed it.',
          'What is in the evaluation set, and who wrote the questions? If the answer is that the builder wrote them, the set is measuring whether the system does what the builder expected, not whether it answers your questions.',
          'What does it do when retrieval comes back empty? The correct behaviour is to say so. A system that always produces an answer will always produce an answer, including when there is nothing to base one on.',
          'Can I see the passage behind any given answer? If a claim cannot be traced back to its source in one click, nobody will check it, and unchecked answers are how a wrong one survives to become a decision.',
          'What is the re-indexing story? A stale index is the most common reason a system that worked at launch is distrusted six months later.',
        ],
      },
    ],

    faqs: [
      {
        question: 'How do I know if my chatbot is hallucinating?',
        answer:
          'Measure faithfulness, which scores whether each claim in the answer is supported by the passages that were retrieved. But read it alongside context recall, because a system can be perfectly faithful to the wrong document. High faithfulness plus low recall means it is reliably reporting the wrong source.',
      },
      {
        question: 'Is hallucination a model problem or a retrieval problem?',
        answer:
          'Usually retrieval, in a RAG system. If the passage that answers the question was never retrieved, no model can answer correctly and a larger one will simply be wrong more fluently. Measure recall first, because it tells you whether the answer was even available.',
      },
      {
        question: 'What is a good faithfulness score?',
        answer:
          'There is no universal threshold, and anyone quoting one without knowing your corpus is guessing. What matters is your own baseline and whether changes move it. A score that drops after a reindex tells you something specific; a score compared against someone else\'s number tells you nothing.',
      },
      {
        question: 'Do I need an evaluation set if the system seems to work?',
        answer:
          'That is precisely when you need one, because "seems to work" is an impression formed from the handful of questions someone happened to try. The set exists so that six months and three reindexes later you can tell whether it still works, rather than waiting for a user to lose confidence.',
      },
      {
        question: 'Can a RAG system be made to admit it does not know?',
        answer:
          'Yes, and it should be built that way from the start. It requires deciding what happens when retrieval returns nothing relevant, and treating abstention as correct behaviour rather than a failure. Most demonstrations skip it because an answer always looks better than a refusal, right up until the answer is invented.',
      },
    ],

    publishedAt: '2026-10-05T03:00:00Z',

    sources: [
      {
        label: 'Ragas documentation, Faithfulness',
        url: 'https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/faithfulness/',
        readOn: '2026-09-11',
        supports: 'The definition of faithfulness and how the score is computed.',
      },
      {
        label: 'Ragas documentation, Context Precision',
        url: 'https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/context_precision/',
        readOn: '2026-09-11',
        supports: 'The ranking measure and its precision-at-k calculation.',
      },
      {
        label: 'Ragas documentation, Context Recall',
        url: 'https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/context_recall/',
        readOn: '2026-09-11',
        supports: 'The retrieval-coverage measure and its need for a reference.',
      },
      {
        label: 'Ragas documentation, Noise Sensitivity',
        url: 'https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/noise_sensitivity/',
        readOn: '2026-09-11',
        supports: 'The measure of errors induced by relevant and irrelevant retrieved documents.',
      },
    ],

    limits: [
      'These are framework definitions, not empirical claims about how often each failure occurs. How your system fails is a question about your corpus, which only your own evaluation set can answer.',
      'Ragas is used here because it publishes precise definitions and formulas. It is not the only framework and this is not a recommendation of a tool over its alternatives.',
      'No failure-rate percentages appear in this post. The commonly circulated ones could not be traced to any named study, so they are deliberately absent rather than accidentally omitted.',
      'Evaluation tells you where a system fails, not how to fix it. The fix is specific to the corpus, the chunking and the domain.',
    ],

    cta: {
      heading: 'Want a number instead of an impression?',
      body: 'We build the evaluation set from your team\'s own questions and report the scores, so quality is something you can check rather than something we assert. If you have a retrieval system nobody quite trusts any more, that is a good place to start.',
      buttonLabel: 'Get it measured',
      href: '/contact?service=rag-development',
    },

    related: ['does-your-data-train-the-model'],

    seo: {
      title: 'How to Tell If Your RAG System Is Making Things Up',
      description:
        'Four different failures look identical to a user: missing retrieval, bad ranking, an ignored passage, or noise. Each is separately measurable, and each has a different fix.',
    },
  },
];
