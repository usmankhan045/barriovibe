# Demand and competitive landscape

What the six research agents observed about search demand, who ranks, and where
the gaps are. Separated from `STRATEGY.md` so the raw observations stay readable
apart from the conclusions drawn from them.

**Read the caveats first.** They are load-bearing.

---

## Caveats that apply to everything below

**No keyword volume data exists.** None of the six agents had access to Ahrefs,
Semrush, DataForSEO or Search Console. Every "high volume" or "niche" label in
this document is **inferred** from SERP commercial density, result counts and
autocomplete-adjacent titles. Treat them as hypotheses to validate, never as
measurements. The single exception is the AI keyword table below, which came
from a published DataForSEO-derived study and is dated.

**Reddit was blocked for every agent.** All six reported this explicitly rather
than substituting invented discourse. The practitioner language that would
normally supply real query phrasing is missing. The n8n community forum
substituted well for the AI cluster; nothing substituted for the others.

**Vendor blogs dominate these niches.** In the offshore-services space in
particular, roughly 60 results yielded essentially zero independent,
methodologically transparent sources. Where ten URLs appeared to corroborate a
number, they were frequently ten competitors each publishing self-serving
figures with no common upstream. See `findings.jsonl` status `rejected`.

---

## AI and automation demand

The only cluster with dated, published volume figures (Truelogic study derived
from DataForSEO, 14 June 2026):

| Term | Monthly (US) | YoY change |
| --- | ---: | ---: |
| AI chatbot | 1,800,000 | - |
| Agentic AI | 110,000 | +39% |
| AI agents | 60,500 | +15% |
| Autonomous AI agents | - | +770% |
| AI agents for business | - | +210% |

And the terms in **decline**: "AI for ecommerce" -50%, "AI chatbot for business"
-39%, "AI for marketing" -38%.

Cluster totals: agent and automation framing 251,000/month against task-AI
framing 61,000/month.

**Strategic implication.** Do not build a content plan around "AI for
[function]" phrasing. Build around agent, automation and workflow framing. The
task-AI vocabulary is measurably dying.

### Where the opportunity actually is

Ranked by opportunity, not volume:

1. **Cost and pricing.** Lowest volume of the AI clusters, highest commercial
   intent, weakest competition. What ranks today are ranges like $10K to $450K
   with no methodology. The useful frame almost nobody leads with: build cost is
   only **25-35% of three-year TCO**, with 15-30% per year maintenance. An $80K
   build is a $230-320K commitment.
2. **Failure and debugging.** Medium volume, high intent, very weak competition,
   because admitting failure modes is off-brand for vendors. Real practitioner
   pain, documented in n8n community forum thread titles: agents reporting
   actions they never performed; adding a third tool causing iteration-limit
   loops; agents hallucinating instead of querying the database; no confidence
   thresholds, so low-confidence decisions auto-execute.
3. **Platform selection.** High volume, saturated but shallow. Every ranking
   post recycles the same three facts (Zapier 8,000+ apps, Make 3,000+, n8n
   self-hostable) and ends in "it depends". Nobody prices a 50,000-execution
   month, and nobody accounts for self-hosted ops burden.
4. **Architecture decisions** (RAG vs fine-tuning). Genuinely decent content
   already ranks here. The gap is economics: the frameworks exist, the pricing
   does not.
5. **Category confusion** ("AI agent vs chatbot"). Very high volume, saturated,
   and every ranking article is written by a company selling agents, so the
   answer is always "you need an agent". A decision tree ending in "use a form,
   use a rule, use a chatbot" is contrarian and true.

### Do not repeat these

The RAG failure percentages that circulate widely ("80% of failures trace to
ingestion and chunking", "retrieval is the failure point 73% of the time",
"naive RAG fails 40% of the time") **trace to no named study**. Use the claim
shape to structure content; cite BarrioVibe's own client data instead.

---

## Pakistan tax and corporate demand

### Seasonality, which is sharper than expected

- **July**: IRIS window opens, ramp begins
- **August to September**: steep climb, **peak around 20-30 September**
- **October**: second spike if an extension lands. In TY2025 FBR extended
  **twice**, to 15 October then 31 October, and its 5.9M-return figure was
  measured on 31 October. The October tail is substantial, not marginal.
- **November to June**: trough for return-filing queries. Registration,
  trademark, sales tax, freelancer and international clusters stay flat
  year-round.
- **Late June**: budget and Finance Act spike for slab queries.

**A second, less contested cluster sits in October and November**: the SECP
annual filing chain. Everyone fights over 30 September; far fewer write about
Form A and Form 29.

### Intent and value by cluster

| Cluster | Intent | Volume | Revenue per lead |
| --- | --- | --- | --- |
| Filer status | Informational | Very high | Low, except "how to become a filer" |
| Return filing mechanics | Informational | High, seasonal | Medium |
| NTN registration | Mixed | Medium | High |
| SECP company formation | Commercial | Low to medium | Very high |
| Sales tax / STRN | Commercial | Medium | High |
| Trademark and IP | Commercial | Low | High |
| Freelancer and IT export | Mixed | High | **Very high** |
| International expansion | Commercial | Medium | **Highest** |

**Freelancer and IT export is the strongest single cluster**: large addressable
audience, genuinely confused, and willing to pay. `s154a-*` findings give it a
fully verified statutory spine.

### What ranks, and why it is beatable

The "thin listicle" assumption is **partly wrong** and this matters for how the
content is written. The top-ranking deadline page is roughly 3,200 words,
bylined with stated credentials, and carries a compliance calendar, a
back-filing table and worked PKR examples. It is competent.

Its weaknesses, shared across the field, are the exploitable ones:

1. **No primary-source hyperlinks.** Everyone cites "Section 182" and "Finance
   Act 2026" without linking a single FBR gazette notification or SRO.
2. **No screenshots** of the actual IRIS or eZfile portal, which is the
   highest-value asset for a "how to file" query.
3. **No embedded calculators.**

And the field contradicts itself in public: on the first taxable slab above PKR
600,000, one ranking source says 2.5% and another says 1%. Both rank. A dev.to
article ranked page one while stating the deadline is 30 June.

---

## E-commerce, payments and web demand

### The sharpest gap: Pakistan payments

Someone searching "JazzCash Shopify integration" has a store and a blocker.
**Unresolved Shopify Community threads currently rank on page one.** When a
forum question with no answer ranks, no page is satisfying the query.

The substance nobody covers properly is two-sided: **collecting** from Pakistani
customers (Shopify Payments does not operate in Pakistan), and **receiving** the
money as a merchant, where the most common misconception is that Payoneer
integrates with Shopify Payments directly. It does not.

Market context: 132 million registered mobile banking and wallet users by March
2026, up from 96 million a year earlier (+37.5%), and 78% of digital payments
now happen in apps (SBP, via press coverage).

### The COD statistic is miscited everywhere

Four different figures circulate. The widely repeated one is the weakest:

| Claim | Source | Assessment |
| --- | --- | --- |
| 95% of e-commerce companies | trade.gov | Tier 1 domain but the stat is unsourced, and it measures companies *offering* COD, not share of transactions |
| **75% of transactions by volume** | **PCMI** | **Best available.** Named methodology, breakdown sums to 100% |
| 80-90% volume / 60% value | SBP 2018 | Directionally useful, eight years stale |
| ~55% in 2026 | blog aggregators | No methodology. Reject |

Cite PCMI's 75% with its date. The gap between 75% by volume and roughly 60% by
value is itself an article: COD dominates cheap orders, digital payment
dominates expensive ones, which changes the AOV argument entirely.

RTO rates are quoted from 25% to 60% with no methodology anywhere. Publish the
range with sources; do not pick a number.

### Marketing benchmarks are all wrong for this market

Everything ranking quotes USD Western figures: $0.78 CPC, $29.99 CPA, agency
retainers of $2,000-25,000/month. A Pakistani SMB reading "test with $5,000"
gets actively misleading advice. There is **no authoritative Pakistan-specific
Meta benchmark dataset**. BarrioVibe's own anonymised client data would be
unbeatable and uncopyable.

### Cost content is uselessly vague

Website cost articles quote PKR 15,000 to 1,500,000+, a 100x spread, with no
explanation of what moves a project between tiers and almost no statement of
what is excluded. The gap is a cost article organised by **scope decision**
rather than price tier.

---

## Competitive landscape

### Pakistani tax and corporate

- **PakFiler** is the strongest competitor: a real interactive calculator
  covering 2019-20 through 2026-27, slab tables, worked examples, a 17-question
  FAQ, and a clean tool-to-service funnel with explicit pricing. Single-domain,
  no tech content.
- **Waystax** is credible editorially with historical context and FAQ schema,
  but its calculator is **linked, not embedded**, which is precisely how it
  loses to PakFiler.
- **The long tail** (companyregistration.pk, sixer.pk, paklegal.com.pk,
  nmklegal.com, bacoconsultants.com and similar) is near-interchangeable: the
  same step lists, the same generic benefits blocks, rarely a byline, almost
  never a tool.

### Pakistani software and AI

The SERP is dominated by **directories** (Clutch, GoodFirms, The Manifest,
Sortlist), not agencies. Actual agencies rank on brand and directory profiles
rather than informational content.

Devsinc, Tintash and InvoZone were searched specifically for AI-agent and RAG
content. **Nothing ranking was found.** Pakistan's largest software houses are
not competing on informational AI content at all.

The best local AI-agency content found is roughly 2,800 words with an original
taxonomy and real PKR pricing, but **no case studies, no ROI metrics, no
third-party validation**. Beatable by any agency with real client data.

Shopify Pakistan is the weakest SERP observed: freelancer personal sites and
thin service pages, almost no informational content.

### International AI content

A high bar, owned by well-funded vendors and educational platforms: Zendesk,
Salesforce, Cognigy on "AI agent vs chatbot"; DataCamp, SingleStore and arXiv
papers on "what is RAG"; Atlassian, Kissflow and Workato on workflow
automation. Do not attack head-on.

**The exemplar worth studying is n8n's blog**: bylined with date and read time,
comparison tables, real workflow diagrams, copy-pasteable prompts, an FAQ
absorbing adjacent queries, and outbound links into a free template library.
That template library is the link engine: third parties have built entire
domains on top of it.

### What earns links in these niches

Ranked by observed effectiveness:

1. **Free tools others cite as references.** Calculators are the proven
   Pakistani link asset. Tools producing a shareable permalink or PDF earn far
   more than tools that only display a number.
2. **Free template and asset libraries.** The n8n ecosystem is the clearest
   case: forkable JSON on GitHub spawned multiple linking domains.
3. **Original data.** Nobody in Pakistan runs an annual agency-pricing or
   freelancer-tax survey. Whoever publishes one owns the citation.
4. **Definitive comparison guides** with real cost math, not feature lists.
5. **Annually-updated reference tables**, which accrue links each budget cycle.

### Structural patterns worth copying

- **Parallel jurisdiction silos**: mirror service clusters across Pakistan, US
  and UK, with content categories mapping to services.
- **Tool-to-service funnel** with the calculator embedded, never merely linked,
  and the CTA priced explicitly.
- **Primary-source citation as differentiation.** Most competitors cite Dawn and
  Tribune. Citing the Ordinance section-by-section is both an E-E-A-T win and
  matches the standard `check:tax` already enforces.

---

## Gap analysis for guides 23 to 32 (10 September 2026)

Run against the 2,233 harvested Pakistani queries and the 35 queries with live
SERP data, filtering out everything the 22 shipped guides already own.

| Theme | Queries | Status |
| --- | ---: | --- |
| Tax calculators | 146 | Owned by `/tools`, not a guide gap |
| IRIS login and password | 47 | Mostly navigational, see below |
| E-payment, PSID and challan | 11 | **Real gap** |
| ATL and filer verification | 9 | Covered by `check-your-atl-status` |
| Provincial property tax | 6 | **Real gap**, and a structural one |
| AOP registration | 4 | Partly covered by the partnership guide |
| Pensioner returns | 3 | Thin, but a distinct filer type |

### The IRIS number is mostly not addressable

310 queries mention IRIS, which is the single largest uncovered theme by raw
count, and most of it is navigational: "iris fbr gov pk login" is a person
looking for the login page, and the login page will always outrank us for it.
Stripping the navigational half leaves roughly 47 login and password queries
that describe an actual procedural problem, and those are worth answering inside
a guide about access and recovery rather than as a page competing with
iris.fbr.gov.pk itself.

**This is the noise-stripping rule from METHOD.md section 4 applied again.** RAG
looked like 508 queries and was 57. IRIS looks like 310 and is closer to 47.
Raw counts flatter a topic until you read the queries.

### The structural gap: property tax is provincial and we only cover federal

`property tax punjab online check pakistan` is the one query in the SERP set
that no shipped guide addresses, and it exposes a real hole. Our two property
guides cover sections 236C, 236K and 37, which are federal advance tax and
capital gains under the Income Tax Ordinance. They say nothing about the annual
**provincial** property tax levied by each province's Excise and Taxation
department, which is what most people mean by "property tax" and what the
challan and online-check queries are about.

A reader searching "property tax Punjab" wants the Urban Immovable Property Tax
under the Punjab Urban Immovable Property Tax Act 1958, not section 236K. Those
are different taxes, different authorities, and different money, and conflating
them is the kind of error that sends someone to the wrong office.
