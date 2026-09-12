# The post catalogue

Every post here carries two things: **evidence that someone searches for it**,
and **evidence we can answer it**. A post missing either does not get written.

That is the whole method, and it exists because the first blog plan did not have
it. `POSTS.md` allocated 47 posts from a query harvest, and when the writing
started, five of 403 findings touched those clusters. Demand was measured and
answerability was assumed.

## How to read an entry

| Field | What it means |
| --- | --- |
| **Demand** | Harvested queries matching the topic, with the prominence of the strongest. Run `python3 research/keywords/demand.py "<pattern>"` to reproduce. |
| **Evidence** | The `findings.jsonl` records the post rests on. If this is empty, the post is not writable yet. |
| **Angle** | What this post says that the existing page-one results do not. |

Prominence is the `hits` field from `harvest.py`: how many times a query surfaced
across seed expansions. **It is not search volume**, and nothing here pretends it
is. See `keywords/README.md` for why volume is structurally unavailable.

## The evidence base

14,522 unique queries across six harvests, and 523 findings of which 464 are
verified. The harvests:

| File | Queries | Seeded on |
| --- | ---: | --- |
| `ai-dev.jsonl` | 5,263 | AI, automation, development, offshore |
| `ops.jsonl` | 2,467 | evaluating, monitoring and securing agents |
| `pk-tax.jsonl` | 2,233 | Pakistani tax and corporate (guides, not posts) |
| `fit.jsonl` | 2,105 | do I need an app, a website, an agent |
| `buy.jsonl` | 1,452 | vetting an agency, contracts, ownership |
| `rescue.jsonl` | 1,199 | AI failure, RAG accuracy, chatbot problems |

## The wedge, in one sentence

**Published AI guidance answers 2023's question, which was hallucinated text,
while businesses are hitting 2026's problem, which is silent failure.**
Duplicate charges from re-executed tools, guardrails bypassed in streaming
paths, agents reporting success they never achieved. That mismatch runs through
half this catalogue.

## How far the evidence stretches, and where it stops

The catalogue was expanded from 26 unwritten posts to 34 by splitting where the
evidence supports two complete posts rather than one padded one. The split test
is in the next section. What is worth recording is where splitting was
REFUSED, because that is the part that keeps the rule honest:

- **No app-store split.** The rules evidence is rich, covering Apple 4.2.6,
  Play's testing gate, account deletion and trader status, and `app store
  review`, `app rejected` and `google play` return essentially nothing in the
  harvest. Rich evidence with no demand is one post, not four.
- **No US-entity split.** Same shape: eleven verified findings on Form 5472, BOI,
  EIN, ITIN and state obligations, and no harvested demand for any of the
  sub-questions. It stays one post.
- **No checkout, local-search or loyalty posts**, despite good Baymard and
  Google evidence, because all three return zero harvested queries.
- **No offshore-rates, CRM or WooCommerce splits.** Demand in low single digits.

The reverse case also appeared: **733 queries on what a website or app costs to
build, and the catalogue had nothing**. That was the largest gap found, and it
is now two posts, because the estimation literature genuinely supports both a
pre-quote and a post-quote piece.

## A rule that produced most of the good entries

**Split a question by the reader, not by the keyword.** "What does an AI agent
cost" and "why did my AI bill exceed the estimate" match similar queries and are
different posts for different people: one is deciding, one is already committed
and surprised. Splitting that way multiplies the catalogue without thinning it,
because each post answers its own question completely.

The opposite, splitting one answer across three posts so that none of them is
complete, is what `POSTS.md` calls thin content and it is banned here.

---

# Category 1: Why AI projects fail

**Demand: 1,199 queries.** `why ai implementations fail` at 93 is the
single most prominent query in the entire harvest. `why ai projects fail` 91,
`mit why ai projects fail` 82, `what % of ai projects fail` 79.

**The intent is not what it looks like.** These are not people whose project
failed. MIT is named in 24 queries, McKinsey and Gartner in 8: this is someone
**building a case for a board**, looking for research to cite. That changes the
post from a diagnostic into a briefing.

**Why we can win it.** We read the primary document that everyone cites and
nobody has read.

### 1.1 The statistic everyone cites does not say what they think  *(WRITTEN, 9 Oct)*

- **Demand**: `mit why ai projects fail` 82, `what % of ai projects fail` 79,
  `what percentage of ai project fail` 47, `percent of ai projects that fail` 45
- **Evidence**: `nanda-95pc-says-organizations-not-pilots`,
  `nanda-report-contradicts-own-headline`,
  `nanda-methodology-n52-conference-sample`,
  `nanda-prescribes-its-authors-protocol`
- **Angle**: The report says 95% of ORGANIZATIONS get zero return, not that 95%
  of pilots fail. Its own funnel reads 60% evaluated, 20% piloted, 5% reached
  production, so roughly a quarter of actual pilots reached production. Two
  lines after its "95% failure rate" sentence it reports generic chatbots at
  "high pilot-to-implementation rates (~83%)". Sample is 52 interviews plus 153
  surveys collected at four industry conferences. The conclusion prescribes the
  authors' own protocol. Nobody searching this is being told any of it.

### 1.2 What the official statistics actually measured  *(WRITTEN, 10 Oct)*

- **Demand**: `what is ai adoption` 34, `trend in ai adoption` 25,
  `challenges of implementing ai` 25, plus the research-seeking mass above
- **Evidence**: `ons-ai-no-headcount-change`, `census-btos-ai-size-gradient`,
  `ai-productivity-gain-unconfirmed`
- **Angle**: National statistics offices measure this and nobody quotes them.
  ONS: "around half of businesses reported that AI had no impact on headcount."
  Census: 19.8% of US businesses, 37% at 250+ employees, under 20% at four or
  fewer. The job-loss story is not in the official data, and the productivity
  gain is not confirmed either.

### 1.3 Why AI failures are silent rather than loud  *(WRITTEN, 11 Oct)*

- **Demand**: `chatbot gives wrong answers` 28, `error generating response
  chatbot` 35, `why is chatbot not working` 32, `ai agent hallucination` 2
- **Evidence**: `agent-failures-are-silent-not-loud`, `agent-duplicate-side-effects`
- **Angle**: The 2026 failure mode is not a wrong answer, it is a confident
  report of success that did not happen. Practitioner-sourced and specific:
  "Agents rarely fail catastrophically, they fail subtly... This is worse than
  obvious failures because you trust the output."

### 1.4 The AI redundancy that was reversed  *(WRITTEN, 12 Oct)*

- **Demand**: `companies replacing employees with ai` 24, `company replaces
  workers with ai` 22, `how does ai replace workers` 27
- **Evidence**: `documented-ai-replacement-reversals`, `ons-ai-no-headcount-change`
- **Angle**: Commonwealth Bank cut 45 roles citing AI-reduced call volumes, then
  admitted volumes had risen: "We did not adequately consider all relevant
  business considerations." Pairs exactly with the official statistics showing
  near-zero measured employment effect.

### 1.4a Why pilots do not become production systems  *(WRITTEN, 13 Oct)*

- **Demand**: `ai proof of concept` 25, `stop running so many ai pilots` 14,
  `why agentic ai projects fail from proof of concept to production systems` 11,
  `what is ai pilot` 13
- **Evidence**: `nanda-95pc-says-organizations-not-pilots` (the 60/20/5 funnel),
  `agent-failures-are-silent-not-loud`, `productivity-j-curve-intangibles`
- **Angle**: Splits from 1.1 by reader: 1.1 corrects a statistic for someone
  citing it, this is for someone whose own pilot is stuck. The funnel in the
  NANDA report is the useful part rather than its headline, and what stops a
  pilot is usually that it was never scoped to survive contact with real data,
  exceptions and someone owning it afterwards.

### 1.4b Should your business have an AI policy, and what goes in it

- **Demand**: `should my business have an ai policy` 24, `ai guardrails and
  governance` 16, `security considerations in ai adoption` 20,
  `barriers to ai adoption` 21
- **Evidence**: `ai-training-tier-not-vendor`, `gemini-free-tier-human-review`,
  `ai-training-exceptions-feedback-and-zdr`
- **Angle**: Most published AI policies are legal boilerplate about acceptable
  use. The version that matters is operational and short: which tier and billing
  status each tool runs on, what happens to feedback buttons, and which data may
  reach a free tier. The Gemini free-tier trap is the worked example.

### 1.5 Who is liable when the chatbot is wrong

- **Demand**: adjacent rather than direct; `ai guardrails and governance` 16
- **Evidence**: `documented-ai-replacement-reversals` (the OLG Hamm ruling)
- **Angle**: A German court held in May 2026 that "the chatbot is not to be
  regarded as a third party... its statements are attributed to the operator",
  and that "even correct programming does not preclude liability". Barely
  covered in English, where coverage stops at Moffatt v Air Canada (2024).

---

# Category 2: What it costs

**Demand: 1,153 queries.** The largest commercial cluster. `ai agent cost per
month` 29, `how much does an ai agent cost` 27, `cost of ai agents` 27,
`ai agent development cost` 25.

**Why we can win it.** Competitors quote ranges. We show arithmetic and name the
date we read the prices. Two posts already shipped on this.

### 2.1 What an AI agent costs to run  *(SHIPPED 11 Sep 2026)*
### 2.2 n8n vs Zapier vs Make, priced at real volume  *(SHIPPED 11 Sep 2026)*
### 2.3 What a WhatsApp chatbot costs in Pakistan  *(SCHEDULED 8 Oct 2026)*

### 2.3a What a website actually costs, by scope decision

- **Demand**: `how much should a website cost` 28, `how much should a website
  cost to build` 24, `custom shopify website cost comparison` 26,
  `how much does a typical website cost` 15, `website cost in india` 16
- **Evidence**: `estimation-overrun-30-40pc`, `cone-of-uncertainty-does-not-narrow`,
  `flyvbjerg-it-black-swans`
- **Angle**: 733 queries and the largest single gap in the catalogue. Published
  answers quote a range with no explanation of what moves a project between
  tiers. Organise by scope DECISION instead, and state the thing no quote
  admits: reviewed surveys find 60-80% of projects exceed effort estimates by
  30-40%, so a quote is a forecast rather than a price.

### 2.3b Why software estimates are wrong, and what to do about it

- **Demand**: `app development cost calculator` 21, `app development cost
  average` 18, `software development cost estimation` 21,
  `software development cost estimation examples` 15
- **Evidence**: `cone-of-uncertainty-does-not-narrow`, `estimation-overrun-30-40pc`,
  `flyvbjerg-it-black-swans`, `chaos-report-is-not-citable`
- **Angle**: Splits from 2.3a by reader: that one is pre-quote, this is for
  someone holding a quote they do not trust. The finding that carries it is
  counterintuitive and peer-reviewed: across 570 real projects the "cone of
  uncertainty" does NOT narrow as a project proceeds, which is the opposite of
  what every estimation methodology assumes. Flyvbjerg's 1,471 projects add the
  fat tail: one in six runs 200% over.

### 2.4 Why your AI bill exceeded the estimate

- **Demand**: `microsoft ai agent costs` 25, plus the cost mass above
- **Evidence**: `agent-duplicate-side-effects` (the $6,531 incident and the
  mechanism), `prompt-caching-is-the-agent-cost-lever`
- **Angle**: A different reader from 2.1: already committed, already surprised.
  The drivers are retries, duplicate execution and context regrowth, not the
  per-token price. Includes a verified incident: $6,531.30 in 24 hours from an
  agent repeatedly redeploying the same template.

### 2.5 What a chatbot costs, by what you actually want it to do

- **Demand**: `chatbot for website free` 27, `chatbot for my website` 27,
  `chatbot for business website` 21
- **Evidence**: `whatsapp-pakistan-rates-sep2026`, `llm-api-pricing-sep2026`,
  `whatsapp-bsp-markup-distinct-from-meta`
- **Angle**: The free-tier query is the tell: people expect this to be free and
  it is, until it is not. Separates the channel cost from the model cost from
  the build cost, which nobody does.

---

# Category 3: Automate or hire

**Demand: 1,116 queries on automation**, plus 41 on spreadsheet pain. `how to
automate a business` 45, `automate your business process` 37, and crucially
`why is automation bad` 26 and `bad things about automation` 24, which is
scepticism demand nobody serves.

**Why we can win it.** This is the category with peer-reviewed economics behind
it, and the honest answer is genuinely contrarian.

### 3.1 When automation actually pays, and when it quietly loses money  *(WRITTEN, 14 Oct)*

- **Demand**: `should i automate this` 20, `why is automation bad` 26,
  `bad things about automation` 24
- **Evidence**: `so-so-automation-acemoglu`, `bainbridge-ironies-of-automation`,
  `automation-helps-when-help-least-needed`
- **Angle**: Acemoglu's so-so technology result, which is peer-reviewed and
  points the opposite way from every vendor: automating a task your staff do
  well and cheaply with a mediocre tool is the textbook loss case. The
  wage-scarcity corollary is the non-obvious half: the same tool is a good buy
  for a firm short of labour and a bad buy for one with cheap labour available.

### 3.2 Nobody can tell you how often automation projects fail  *(WRITTEN, 15 Oct)*

- **Demand**: `automation failed due to system error` 26, `how to end automation
  error` 23, plus the failure mass in category 1
- **Evidence**: `no-credible-automation-failure-rate`,
  `rpa-literature-only-documents-successes`, `ey-30-50-rpa-fail-traced`,
  `ey-rpa-citation-loop`
- **Angle**: The forensic post. "30-50% of RPA projects fail" traces to a 2016 EY
  marketing brochure whose stated basis is "our practical experience", then
  through a vendor blog and trade press into a peer-reviewed Springer paper.
  Peer review relocated the number rather than validating it. And a systematic
  review of 63 papers states outright that "the literature covers only
  successful RPA projects".

### 3.3 AI helps your newest staff most, which changes what you buy it for  *(WRITTEN, 16 Oct)*

- **Demand**: `how does ai replace workers` 27, `replacing workers with ai` 27,
  `ai and job replacement` 25, `will ai replace hr jobs` 14
- **Evidence**: `ai-returns-concentrate-on-novices`, `ons-ai-no-headcount-change`
- **Angle**: The strongest study available found +34% for novices and near zero
  for experts. So the evidence says AI is an onboarding and training technology,
  not a headcount one. That reframes the purchase and matches what the official
  employment statistics show.

### 3.4 When your spreadsheet becomes a system  *(WRITTEN, 17 Oct)*

- **Demand**: `excel too many sheets` 27, `spreadsheet has too many rows` 27,
  `excel spreadsheet too big` 26, `excel spreadsheet has too many columns` 25
- **Evidence**: `automation-task-criteria-documented-not-validated`,
  `dont-automate-obliterate-hammer`
- **Angle**: Small cluster, sharpest buying moment in the entire harvest: this is
  someone whose manual process broke this week. The task criteria from the BPM
  literature give them a real test, and Hammer gives the warning: automating a
  bad process entrenches it.

### 3.4a What to automate first, and how to tell

- **Demand**: `what can be automated in a business` (seeded), `should i automate
  this` 20, `guide to business process automation` 20, `what are types of
  automated business` 20
- **Evidence**: `automation-task-criteria-documented-not-validated`,
  `so-so-automation-acemoglu`
- **Angle**: Splits from 3.1 by reader: 3.1 answers whether to automate at all,
  this answers which thing first for someone who has decided. Two independent
  academic groups converge on five testable properties: volume, rule-clarity,
  exception rate, stability and structured data. It is a checklist with research
  behind it rather than a vendor's readiness quiz.

### 3.5 What automates badly, and why it is not the technology's fault  *(WRITTEN, 18 Oct)*

- **Demand**: `why is automation bad` 26, `bad things about automation` 24,
  `list 2 disadvantages of using spreadsheets` 12
- **Evidence**: `bainbridge-ironies-of-automation`, `ironies-persist-into-ai-endsley`,
  `automation-helps-when-help-least-needed`
- **Angle**: A 1983 paper describes modern AI deployment exactly. The automation
  takes the easy cases and leaves the human the hard ones, the human's skill at
  those decays because they no longer practise, and the moment they are needed
  is the moment more skill is required. Endsley's 2023 revisit concludes the
  ironies transferred to AI and got worse.

---

# Category 4: Do I actually need this?

**Demand: 146 queries on the app/website decision**, plus 81 on CRM choice and
19 on build-versus-buy. Small, and the purest decision intent in the harvest.

**Why we can win it.** Every answer online is written by someone selling the
thing. Sometimes the honest answer is "you do not need this", and saying so is
the entire trust play.

### 4.1 Do you need an app, or is your website enough?  *(WRITTEN, 26 Oct)*

- **Demand**: `do you need app` 42, `does small business need a mobile app` 23,
  `do i need a website` 19, `do i need a website for my business` 13
- **Evidence**: `baymard-app-vs-mobile-web-guidelines`,
  `baymard-app-benchmark-none-good`, `ios-missing-hardware-apis-bcd`,
  `ios-webpush-homescreen-only`, `appsflyer-uninstall-46pc`, `nra-app-ranks-9th`
- **Angle**: The decision reduces to a checkable test, which nobody publishes:
  does it need hardware over Bluetooth, NFC, USB or serial, or must it keep
  running while closed? If neither, no documented capability requires native.
  Baymard found "342 of 348 guidelines in our mobile website catalog were
  verified to apply equally to native mobile apps", and its 2026 app benchmark
  rated NO app "good" out of 30 leading brands. Apple's own guideline 4.2 makes
  the same argument against you if the app is a repackaged website.

### 4.1a Everything you have read about iOS PWAs is out of date  *(WRITTEN, 27 Oct)*

- **Demand**: shares the 4.1 cluster; distinct reader, already building
- **Evidence**: `ios-webpush-homescreen-only`, `ios-seven-day-storage-eviction`,
  `webkit-opposes-web-bluetooth`, `ios-missing-hardware-apis-bcd`
- **Angle**: "iOS does not support web push" is now FALSE: WebKit shipped it in
  16.4, February 2023, for Home Screen web apps. The seven-day storage eviction
  has an exemption for installed web apps that nobody mentions. And the real
  gaps are narrower and more political than people think: Apple formally
  opposes Web Bluetooth as failing "the web platform's device-independence
  bar", and Chrome Android ships every API iOS lacks, so "the web cannot"
  usually means "Apple will not".

### 4.2 Agent, chatbot, or a form?  *(WRITTEN, 28 Oct)*

- **Demand**: `chatbot vs agentic ai` 25, `difference between chatbot and
  agentic ai` 25, `ai agent vs chatbot vs llm` 15, `rule based chatbot vs ai
  chatbot` 13, `when to use an ai agent` 27, `do ai agents work` 40
- **Evidence**: `so-so-automation-acemoglu`, `agent-failures-are-silent-not-loud`
- **Angle**: Nobody writes the three-way comparison, and every two-way one is
  written by someone selling agents. A decision tree that can end in "use a
  form" is the differentiator.

### 4.3 Is your business ready for an AI agent?

- **Demand**: `are we ready for ai` 27, `do ai agents work` 40, `why do i need an
  ai agent` 6, `getting data ready for ai` 1
- **Evidence**: `automation-task-criteria-documented-not-validated`,
  `productivity-j-curve-intangibles`, `census-btos-ai-size-gradient`
- **Angle**: The J-curve reframes the question from "will this pay for itself" to
  "do I have the management slack to make the complementary investment". A small
  firm with no spare capacity is structurally worse placed, which is a
  defensible reason for caution rather than a failure of nerve.

### 4.4 What a restaurant actually needs, and what it does not

- **Demand**: `app for small business` 25, `do i need an app for my restaurant`
  (seeded), `build a app for business` 25
- **Evidence**: `nra-app-ranks-9th`, `nra-delivery-prefer-direct-gap`,
  `nra-tech-profit-gap`, `doordash-commission-tiers`,
  `doordash-storefront-zero-commission`, `nra-42pc-unprofitable-2026`,
  `nra-median-three-restaurant-apps`, `restaurant-discovery-no-good-data`
- **Angle**: The most evidenced business-type post available. 68% of operators
  used third-party delivery but 61% would rather take orders direct; DoorDash
  prices its own-site product at 0% commission against 15-30% on the
  marketplace; 42% of operators were unprofitable last year; and the median
  customer keeps three restaurant apps, which belong to chains and marketplaces.
  Includes an honest negative: there is no methodologically sound data on how
  customers discover restaurants.

### 4.5 What a clinic actually needs, and the 30-point swing nobody buys

- **Demand**: shares the 4.1 app cluster
- **Evidence**: `clinic-app-no-evidence`, `google-local-ranking-three-factors`
- **Angle**: A clean negative and a better answer. No evidence exists that
  patients want a clinic-specific app, and patients overwhelmingly use their
  EHR vendor's portal instead. Meanwhile 87% of patients accessed their portal
  when staff encouraged them against 57% when not: a 30-point swing from front
  desk behaviour, on software the clinic already owns.

---

# Category 5: Making it trustworthy

**Demand: 508 RAG queries plus 2,467 operations queries.** `why does rag fail`
52, `how to monitor ai agents` 50, `how to evaluate ai agents` 45, `how to
improve rag retrieval accuracy` 28.

**Why we can win it.** This is the service we sell, and the questions are asked
into a void: repeated Ask HN threads on monitoring and evaluation get zero
replies, into a query space saturated with observability vendors.

### 5.1 How to tell if your RAG system is making things up  *(SCHEDULED 5 Oct)*
### 5.2 Does your data train the model?  *(SCHEDULED 4 Oct)*

### 5.3 How to evaluate an agent before you trust it  *(WRITTEN, 20 Oct)*

- **Demand**: `how to evaluate ai agents` 45, `how to evaluate ai` 13,
  `llm evaluation metrics` 12, `llm evaluation harness` 11
- **Evidence**: `agent-eval-asked-into-a-void`, `ragas-faithfulness-definition`,
  `rag-failure-is-retrieval-or-generation`
- **Angle**: The strongest asked-but-unanswered signal in the dataset, and the
  evidence of demand and of no answer are the same artifact: a question with
  zero replies.

### 5.4 What to monitor once an agent is live  *(WRITTEN, 23 Oct)*

- **Demand**: `how to monitor ai agents` 50, `what is ai monitoring` 40,
  `ai agent monitoring tools` 29
- **Evidence**: `agent-failures-are-silent-not-loud`, `agent-duplicate-side-effects`
- **Angle**: Distinct reader from 5.3: already deployed. The things worth
  alerting on are not the things vendors instrument.

### 5.5 Stopping an agent from burning money in a loop  *(WRITTEN, 22 Oct)*

- **Demand**: `ai agent test loop` 27, `agentic ai agent test loop` 26,
  plus the cost cluster
- **Evidence**: `agent-duplicate-side-effects`
- **Angle**: Framework maintainers have no correct answer today. One issue
  demonstrates that even the strongest durability setting leaves exactly-once
  semantics "decided by the OS thread scheduler". The practical answer is
  external idempotency keys, which nobody is selling.

### 5.6 Why your RAG returns wrong answers, by failure type  *(WRITTEN, 19 Oct)*

- **Demand**: `why does rag fail` 52, `rag does not work for enterprises` 31,
  `how to improve rag retrieval accuracy` 28, `how to improve rag` 26
- **Evidence**: `rag-failure-is-retrieval-or-generation`, `ragas-faithfulness-definition`
- **Angle**: Splits from 5.1 by reader: 5.1 is "how do I know", this is "I know,
  now what". Four separately measurable failures with four different fixes.

### 5.6a How to stop an AI making things up, by mechanism  *(WRITTEN, 21 Oct)*

- **Demand**: `how to limit ai hallucination` 27, `how to stop ai
  hallucinations` (seeded), `ai agent hallucination` 2
- **Evidence**: `ragas-faithfulness-definition`, `rag-failure-is-retrieval-or-generation`,
  `jagged-frontier-invisible-boundary`
- **Angle**: Splits from 5.1 and 5.6 by intent: those diagnose, this is someone
  searching for the fix directly. Honest answer: you cannot stop it, you can
  make it detectable and make abstention the default. The jagged-frontier result
  is the warning, since AI made wrong answers MORE persuasive and coherent.

### 5.7 What an AI guardrail actually is, and what it does not stop  *(WRITTEN, 24 Oct)*

- **Demand**: `ai guardrails examples` 16, `ai guardrails meaning` 13,
  `ai guardrails framework` 12, `ai guardrails tools` 12, `what are ai risks` 20
- **Evidence**: `agent-duplicate-side-effects` (the streaming-path bypass),
  `agent-failures-are-silent-not-loud`
- **Angle**: "Guardrails" is used to mean four different things and sold as one.
  The concrete finding worth publishing: a documented case where a PII filter
  set to block still streamed the data in full before the exception fired. A
  guardrail in the wrong place in the pipeline is decoration.

### 5.8 The security questions to ask before an agent touches production  *(WRITTEN, 25 Oct)*

- **Demand**: `agentic ai security risks` 27, `security considerations in ai
  adoption` 20, `ai agent security` 2, `ai agent deletes database` 2
- **Evidence**: `documented-ai-replacement-reversals` (the production-deletion
  incidents), `agent-duplicate-side-effects`
- **Angle**: Two production databases deleted nine months apart, and in one the
  agent then falsely claimed rollback was impossible. The useful content is
  scoping: read-only credentials, tool-wrapped queries, capability limits. The
  best published answer to this today is a buried forum comment.

---

# Category 6: Choosing who builds it

**Demand: 960 queries.** `how to hire a software developer online` 25,
`hiring a software developer tips` 27, `build vs buy software` 29,
`fixed price vs time and materials contract` 27, `who owns the code generated
by ai` 29.

**Why we can win it.** The entire information space is written by sellers. We
are a seller writing against our own interest, which is the only credible
position available.

### 6.1 You probably do not own the code you paid for

- **Demand**: `who owns the code generated by ai` 29, `who owns the code of npm`
  21, `github copilot who owns the code` 3
- **Evidence**: `us-work-made-for-hire-default`, `uk-commissioned-copyright-default`
- **Angle**: Verified from statute in both jurisdictions, and it is the opposite
  of what buyers assume. Under 17 U.S.C. s.101 and CDPA 1988 s.11 the
  CONTRACTOR owns copyright in commissioned software absent a written
  assignment. Paying for it does not transfer it. This is a post that costs us
  nothing to publish and saves a reader a great deal.

### 6.1a Who owns what the AI wrote

- **Demand**: `who owns the code generated by ai` 29, `who owns the code that
  claude writes` 2, `if you build with codex who owns the code` 4
- **Evidence**: `us-work-made-for-hire-default`, `uk-commissioned-copyright-default`
- **Angle**: Splits from 6.1 by reader: 6.1 is about your contractor, this is
  about your tools. A genuinely unsettled question, and the honest post says so
  rather than asserting a position, while explaining what the settled parts are.

### 6.2 Fixed price or time and materials

- **Demand**: `fixed fee vs time and materials` 28, `fixed price vs time and
  materials contract` 27, `fixed cost vs time and materials` 27,
  `fixed price project vs time material` 27
- **Evidence**: `chaos-report-is-not-citable`, `banerjee-duflo-overrun-sharing`,
  `18f-contract-type-guidance`, `flyvbjerg-it-black-swans`
- **Angle**: Very high demand, uniform phrasing, and the honest answer is
  subtler than "time and materials protects you". Banerjee and Duflo, on 230
  projects, found fixed-price contracts nominally put 100% of overrun on the
  vendor while vendors actually bore 66%, and on time and materials they still
  absorbed 26%. Two governments openly disagree: 18F says fixed-price "are not
  appropriate for custom Agile development" while the UK Cabinet Office warns
  time and materials "can drive the wrong behaviours". Publishing that
  disagreement is more useful than inventing a consensus. The most-cited
  evidence, Standish CHAOS, is refuted in peer-reviewed work as "misleading,
  one-sided", so the post reasons from contract structure rather than from a
  failure rate.

### 6.3 Agent washing: auditing a vendor's AI claim

- **Demand**: `ai vendor evaluation` and `how to vet an ai company` (seeded),
  `agentic ai security risks` 27
- **Evidence**: `gartner-130-agentic-vendors`, `gartner-buyer-regret-verified`,
  plus the SEC and FTC enforcement records
- **Angle**: Lead with the regulators rather than the analyst, because they are
  named, dated and penalised. The SEC has charged firms for overstating AI: one
  order records that "the vast majority of drive-thru orders... required human
  intervention", another that a company raised $42m while relying "in large part
  on contract employees to manually input orders". Gartner supplies the term,
  "agent washing, the rebranding of existing products... without substantial
  agentic capabilities", though its estimate that only about 130 of thousands of
  vendors are real carries NO published methodology and must be presented as an
  estimate rather than a measurement.

### 6.4a Why offshore comparisons have no evidence behind them

- **Demand**: `hire developers in india` 18, `offshore software development
  security` 10, plus the 960-query hiring cluster
- **Evidence**: `herbsleb-distributed-delay-with-caveat`, and the verified
  absence of citable figures
- **Angle**: A post that argues against the genre it sits in, including against
  our own interest as an offshore supplier. Every circulating percentage failed
  verification, including a "59% dissatisfaction (Deloitte 2024)" figure that
  does not appear in Deloitte's report. Even the famous 2.5x delay finding
  dissolves under control: the authors state that "given all other factors,
  distributed MRs do not have significantly longer intervals". Citing 2.5x
  without that caveat misrepresents the source, which is what nearly everyone
  does.

### 6.5 What happens when the agency disappears

- **Demand**: `inherited a codebase` and `technical due diligence` (seeded),
  `software project failed what now` (seeded)
- **Evidence**: `truck-factor-primary-figures`
- **Angle**: A peer-reviewed measure of exactly this risk that nobody uses
  commercially: across 133 popular GitHub systems, 65% have a truck factor of
  two or fewer, meaning two people leaving would orphan the project. That is a
  checkable question to ask before signing, not a feeling.

### 6.4 Build or buy

- **Demand**: `build vs buy software` 29, `build or buy software` 12,
  `how to choose a crm` 26, `what does a good crm look like` 24,
  `you don't need a crm` 22
- **Evidence**: `productivity-j-curve-intangibles`
- **Angle**: `you don't need a crm` at 22 is the tell: there is appetite for the
  contrarian answer and nobody serving it.

---

# What is deliberately NOT in this catalogue

**"Questions to ask a software agency."** One matching query in 14,522. It is a
post I would have written on instinct and the data says not to. Recorded because
the instinct will recur.

**Seven more n8n posts.** `POSTS.md` cluster 10 allocates eight. One shipped and
its arithmetic is real; the rest were sized by query volume rather than by
commercial value.

**Anything resting on a failure statistic.** Four are recorded as rejected:
"74% of chatbots pulled offline" (paid sponsored content), "70-80% of enterprise
RAG deployments fail" (a blog-to-blog citation loop), an unverifiable Taco Bell
quote, and the Klarna "lower quality" line (an inaccessible interview).

**The Pakistani AI market.** All 269 tech-flavoured queries in the Pakistani
harvest are government portals: "ntn registration online", "iris fbr app". There
is no local demand for AI buying advice. The guides own the local half and the
posts go global, which is what the user asked for and what the data supports.
