# Post architecture

Redesigned from the full evidence base: 60 findings, 7,496 harvested queries,
169 SERP-sourced questions, 35 queries with competitive data.

Supersedes the flat list in `ARTICLES.md`, which was 41 titles chosen by
category. This is built the other way round: from the query mass that actually
exists, so every post owns a distinct angle rather than a slice of one.

> **SUPERSEDED for the blog half, 11 September 2026.** `CATALOGUE.md` is now the
> post slate: 42 posts across six categories, each carrying its harvested demand
> AND the findings it rests on. This file remains useful for the guide half, for
> the cluster reasoning, and as the record of why the blog plan had to be
> rebuilt: it allocated 47 blog posts from a query harvest, and when writing
> began, five of 403 findings touched those clusters. Demand had been measured
> and answerability assumed.
>
> **Status, 11 September 2026 (second batch).** **8 posts now written**, the
> five newest scheduled one per day from **4 to 8 October**, after the last
> guide on 3 October. The second batch was NOT selected from the clusters
> below, and the reason is recorded in "Selection moved to the service list"
> at the foot of this file: the plan's blog clusters were drawn from a query
> harvest, and they do not match what the agency actually sells.
>
> **Status, 11 September 2026.** The blog half has started: **3 posts shipped**
> of the 47 planned, in clusters 10, 8 and 12. The selection was NOT made from
> this plan's ordering. It was made from what could be verified, which turned
> out to be a much harder constraint on the blog side than on the guide side:
> of 403 findings in the store when the blog work began, **five touched the AI
> and development clusters at all** and two of those were unusable. The query
> harvest that produced this plan evidences demand, not answerable questions,
> and the gap between those two is what decides whether a post can be written.
> See "What the first three posts changed" at the foot of this file.
>
> **Status, 10 September 2026.** The guide half of this plan is delivered and
> its shape changed in the delivering. **47 guides shipped**, not 54, because
> the hub-and-spoke allocation below was drawn up before any guide existed and
> the hubs turned out to absorb most of their own spokes. Several planned
> spokes were dropped after checking rather than written, and roughly a third
> of what shipped came from topics this plan never listed, found by reading the
> Ordinance rather than the query harvest. See `GUIDE-RESEARCH.md` for the
> per-guide record and the scope correction that explains the gap. The blog and
> asset halves are untouched: `/blog` is still `POSTS_ENABLED = false`.

**108 pieces: 54 guides, 47 blog posts, 7 downloadable assets.** The blog side
was 10 in the first draft of this document and that was an under-allocation, not
a judgement: the AI and development harvest holds 4,888 queries after noise
removal, with 1,158 on agents, 879 on automation platforms and 797 on cost of
build. Ten posts against that is leaving the larger half of the research
unused.

---

## The rule that produced this list

**One post per answerable question, never one post per topic.**

The harvest shows why. "PSEB registration" is not one topic, it is 150 distinct
queries: the fee, the documents, the renewal, the error list, the portal login,
the freelancer path, the benefits. A single "PSEB Registration Guide" competes
with all 150 and satisfies none of them completely. Seven focused posts each own
one and interlink.

That is also the anti-thin-content rule, inverted from how it is usually stated.
Thin content is not short content. It is content that does not fully answer the
question it claims to. A 900-word post that completely answers "what documents
does PSEB registration need" is not thin. A 3,000-word "complete guide" that
covers seven questions at 400 words each is.

**Every post must clear three gates:**

1. **A question only we can answer well.** Verified statute, a shipped
   calculator, or both halves of the business at once.
2. **A distinct search intent.** If two posts would satisfy the same searcher,
   they are one post.
3. **Something the reader leaves with.** A number, a document list, a decision,
   a filled form. Not "an understanding".

---

## Cluster architecture

Nine clusters. Each has one hub that owns the head term and spokes that own the
long tail. Spokes link up to the hub, the hub links down to all spokes, and
siblings link across where a reader's next question is genuinely next door.

    GUIDES (/guides/)                Hub   Spokes   Total
    1. Filer status                   1       7        8
    2. PSEB and IT export             1       7        8
    3. NTN registration               1       6        7
    4. Company formation              1       8        9
    5. Trademark and IP               1       6        7
    6. Property tax                   1       6        7
    7. Cross-border                   1       7        8
                                                     ---
                                                      54

    BLOG (/blog/)
    8.  AI agents, cost and failure    1       9       10
    9.  When agents break              1       7        8
    10. Automation platforms           1       7        8
    11. What software costs            1       6        7
    12. Shopify and e-commerce         1       6        7
    13. Buying development work        1       6        7
                                                     ---
                                                      47

    ASSETS (downloads, not articles)
    14. International buyer assets     -       7        7

                                             TOTAL   108

---

## Cluster 1: Filer status

**Why this cluster leads.** `pk-serp-weakest-queries`: SlideShare and a LinkedIn
post rank on page one for "difference between filer and non filer". 134
harvested queries. And 13 shipped calculators expose a filer/non-filer toggle,
so every claim links to a tool that proves the gap in rupees.

| # | Post | Owns | Proof |
| --- | --- | --- | --- |
| 1.1 | **Filer vs Non-Filer: What the Difference Costs You** (hub) | the head term | 13 calculators |
| 1.2 | How to Become a Filer: The Registration Path, Start to Finish | "how to become a filer" (412 completions, the deepest seed in the harvest) | IRIS process |
| 1.3 | What Non-Filers Pay on Property: 236C and 236K Compared | property-specific gap | `s236c-single-rate`, `s236k-single-rate` |
| 1.4 | What Non-Filers Pay on Vehicles | vehicle-specific gap | vehicle calculators |
| 1.5 | What Non-Filers Pay on Banking and Cash Withdrawals | banking-specific gap | withholding calculators |
| 1.6 | Checking Your ATL Status, and What to Do If You Are Not on It | "atl status check", verification intent | `pk-tool-intent-dominant` |
| 1.7 | Late Filer, Non-Filer, Active: The Three Statuses Explained | status confusion | s.182A surcharge |
| 1.8 | Restoring ATL Status After a Missed Deadline | recovery intent | s.182A |

Note 1.3 to 1.5: these are three posts rather than one because the searcher is
different each time. Someone buying a plot and someone buying a car are not the
same reader, and a combined post serves neither as well.

---

## Cluster 2: PSEB and IT export

**Why.** 150 harvested queries. `s154a-rates` and `s154a-pseb-condition` are
verified from primary statute, and `s154a-extended-2029` resolves a discrepancy
the whole field gets wrong. This is the convergence wedge in its purest form.

| # | Post | Owns | Proof |
| --- | --- | --- | --- |
| 2.1 | **PSEB Registration and the 0.25% Rate** (hub) | the head term | `s154a-*` |
| 2.2 | What PSEB Registration Actually Requires: The Document List | "pseb registration documents/requirements" | primary sources |
| 2.3 | The 0.25% Rate Runs to 2029, Not 2026 | the discrepancy | `s154a-extended-2029` |
| 2.4 | The Three Conditions That Make It a Final Tax | s.154A(2), explained nowhere | `s154a-final-tax-conditions` |
| 2.5 | PSEB Renewal: When, How Much, and What Lapses If You Miss It | "pseb registration renewal" | to verify |
| 2.6 | Freelancer or Company: Which PSEB Registration Applies | "pseb registration for freelancers" | `s154a-rates` |
| 2.7 | At What Revenue Does PSEB Registration Pay for Itself | break-even, the calculator post | new tool |
| 2.8 | IT Exports at 0.25% vs Goods at 1.25%: Why the Gap Widened | `s154-goods-1.25` | Finance Act 2026 |

---

## Cluster 3: NTN registration

**Why.** 206 harvested queries, and `pk-serp-govt-gap`: the FBR portal ranks
first and answers nothing. Someone searching "ntn registration requirements"
wants a document list and gets a login form.

| # | Post | Owns |
| --- | --- | --- |
| 3.1 | **How to Get an NTN** (hub) | the head term |
| 3.2 | NTN Registration: Exactly What Documents You Need | "ntn registration requirements/documents" |
| 3.3 | Is Your CNIC Your NTN? What the Number Actually Is | a SERP question, asked repeatedly |
| 3.4 | Checking an NTN by CNIC | verification intent |
| 3.5 | Business NTN vs Individual NTN | "ntn registration for business/company" |
| 3.6 | Downloading Your NTN Certificate | "ntn registration certificate download" |
| 3.7 | NTN Registration Fees: What FBR Charges and What Agents Charge | "ntn registration fee" |

3.7 is worth writing precisely because FBR charges nothing for an NTN and the
market is full of pages implying otherwise. Correcting that is a trust asset.

---

## Cluster 4: Company formation

**Why.** 171 SECP queries. `secp-ezfile` verified: SECP runs eZfile now, so
every competitor page describing "eServices" is stale. `secp-sector-fy26` gives
the market: 43,559 new companies, IT and e-commerce the largest sector.

| # | Post | Owns | Proof |
| --- | --- | --- | --- |
| 4.1 | **Registering a Company on SECP eZfile** (hub) | the head term | `secp-ezfile` |
| 4.2 | SECP Registration Fees, Itemised | "secp registration fee/charges" | fee schedule |
| 4.3 | SMC vs Private Limited vs Sole Proprietor | "company type" queries | statute |
| 4.4 | Name Reservation: Rules, Rejections, and How Long It Takes | distinct step | SECP rules |
| 4.5 | What Documents SECP Actually Needs | "documents required" SERP question | SECP |
| 4.6 | Checking Whether a Company Is Registered | verification intent | tool |
| 4.7 | Form A, Form 29 and the Filings Nobody Warns You About | Oct-Nov cluster | `secp-annual-filing-chain` |
| 4.8 | When You Do Not Have to File Form A | the exemption everyone gets wrong | `secp-annual-filing-chain` |
| 4.9 | Registering a Software House: The Full Stack | convergence | `secp-sector-fy26`, `s154a-*` |

4.8 exists because the received wisdom is wrong. SECP's own page says an SMC or
a private company with paid-up capital not over PKR 3 million need not file
Form A/B where particulars are unchanged. Competitors say there is no exemption.

---

## Cluster 5: Trademark and IP

**Why.** `tm-fees-schedule` verified from the 2019 gazette. Competitors conflate
TM-11 registration (9,000) with TM-5 opposition (also 9,000) and omit renewal at
15,000 entirely. `pk-serp-weakest-queries`: YouTube and Scribd rank for
"trademark registration check online pakistan".

| # | Post | Owns | Proof |
| --- | --- | --- | --- |
| 5.1 | **Trademark Registration in Pakistan** (hub) | the head term | `tm-fees-schedule` |
| 5.2 | What a Trademark Actually Costs: Every Fee, From the Gazette | the fee confusion | `tm-fees-schedule` |
| 5.3 | Searching Before You File | "trademark check" queries, YouTube ranks | TM-55 |
| 5.4 | Choosing Your Class, and What Multi-Class Costs | per-class fee logic | `tm-fees-schedule` |
| 5.5 | Renewal: The PKR 15,000 Nobody Mentions | genuinely uncovered | `tm-fees-schedule` |
| 5.6 | How Long Registration Takes, and What Happens in Between | timeline intent | IPO |
| 5.7 | Trademark, Copyright or Patent: Which One You Need | disambiguation | statute |

---

## Cluster 6: Property tax

**Why.** 174 harvested queries. `calc-236c-236k-current`: the calculators
already match Finance Act 2026, verified. Two rate changes this year that most
published content has not caught up with.

| # | Post | Owns | Proof |
| --- | --- | --- | --- |
| 6.1 | **Tax on Buying and Selling Property** (hub) | the head term | property calculators |
| 6.2 | 236C on Sale: One Rate Now, Whatever the Value | `s236c-single-rate` | Finance Act 2026 |
| 6.3 | 236K on Purchase: 1.25% for Filers, Banded for Everyone Else | `s236k-single-rate` | Finance Act 2026 |
| 6.4 | Capital Gains on Property: Why the Acquisition Date Decides Everything | the 1 July 2024 regime split | `lib/tax/property.ts` |
| 6.5 | 236C Is Advance Tax, Not a Separate Charge | a real and expensive misunderstanding | calculator |
| 6.6 | Rental Income: What the Tenant Withholds and What You Still Owe | s.155 | rental calculator |
| 6.7 | FBR Valuation Tables vs Your Actual Price | the input every calculator needs | statute |

---

## Cluster 7: Cross-border

**Why.** The unfakeable wedge. `s116a-thresholds` and `sbp-eia-it-2024` are both
verified from primary sources and neither is covered by anyone: offshore LLC
vendors have no reason to mention Pakistani exposure, and Pakistani tax firms do
not sell company formation abroad.

| # | Post | Owns | Proof |
| --- | --- | --- | --- |
| 7.1 | **Your US LLC Is a Declarable Foreign Asset** (hub, flagship) | the whole angle | `s116a-thresholds` |
| 7.2 | Can a Pakistani Company Legally Own a Foreign Entity? | the SBP question | `sbp-eia-it-2024` |
| 7.3 | The 183-Day Rule Pakistani Expats Get Wrong | residency trap | `s82-residency-verified` |
| 7.4 | Wyoming, Delaware or New Mexico, From Pakistan | LLC choice | to verify |
| 7.5 | Stripe and the EIN Wait | a real, concrete blocker | `stripe-ein-lag`, blocked |
| 7.6 | Form 5472: The USD 25,000 Penalty | non-resident LLC trap | to verify |
| 7.7 | Card Remittance Tax Fell From 5% to 0.5% | uncovered change | `remittance-card-tax-cut` |
| 7.8 | UAE Small Business Relief Ends 31 December 2026 | a dated cliff | `uae-sbr-cliff` |

7.3 corrects a number the whole field repeats: the presence test in s.82(a) is
**183 days**, substituted from "eighty-two" by the Finance Act 2006. The 182-day
figure belongs to the separate other-country test in s.82(d).

---

## Cluster 8: AI agents, cost and failure (`/blog/`)

**Why.** 1,158 agent queries after noise removal, and `ai-cost-intent-confirmed`:
2,042 of 5,263 AI/dev queries are commercial, with "ai agent cost per month" and
"ai agent development cost" both at maximum autocomplete prominence on both
engines. Do not attack the definitional queries: `DEMAND.md` records that
Zendesk, Salesforce and Cognigy own those and the bar there is high.

| # | Post | Owns |
| --- | --- | --- |
| 8.1 | **What an AI Agent Actually Costs Over Three Years** (hub) | the cost head term |
| 8.2 | Per Month or Per Build: How Agent Pricing Models Differ | "ai agent cost per month" |
| 8.3 | Agent Cost vs Hiring: The Comparison Done Honestly | "ai agent cost vs salary" |
| 8.4 | The Hidden Costs: Maintenance, Model Deprecation, Re-Prompting | build is 25-35% of 3-year TCO |
| 8.5 | You Probably Do Not Need an Agent | contrarian, Gartner-backed |
| 8.6 | Agent Washing: Auditing a Vendor's "Agentic AI" Claim | Gartner: ~130 real vendors of thousands |
| 8.7 | Agent, Chatbot, or LLM: A Three-Way Answer | "ai agent vs chatbot vs llm", nobody writes the three-way |
| 8.8 | Workflow Automation vs RPA vs Agents | "workflow automation vs rpa" |
| 8.9 | Rule-Based or AI: Which Chatbot Your Business Needs | "rule based chatbot vs ai chatbot" |
| 8.10 | The 95% Failure Stat Is Disputed. Here Is What It Measured | `mit-95pc-contested`, publish as disputed only |

---

## Cluster 9: When agents break (`/blog/`)

**Why.** Nearly uncontested, because admitting failure modes is off-brand for
vendors. The evidence is real practitioner pain documented on the n8n community
forum, and the service pages already answer "What happens when an automation
breaks?" in two sentences, so the expertise exists and is invisible to search.

| # | Post | Owns |
| --- | --- | --- |
| 14.1 | **Your AI Pilot Failed. Here Is the Diagnostic.** (hub) | the rescue buyer |
| 14.2 | Why Agents Hallucinate Instead of Querying the Database | documented failure |
| 14.3 | The Tool-Count Problem: Why a Third Tool Breaks Your Agent | iteration-limit loops |
| 14.4 | Confidence Thresholds: The Missing Safety Layer | auto-executed low-confidence decisions |
| 14.5 | Agents That Report Actions They Never Performed | documented failure |
| 14.6 | RAG Returns Wrong Answers: A Chunking Triage | ingestion, not the model |
| 14.7 | When Retrieval Is the Problem, Not the Model | "why is my chatbot giving wrong answers" |
| 14.8 | Error Handling in n8n: What Production Actually Needs | "n8n error handling" |

Do not use the RAG failure percentages that circulate ("80% of failures trace to
chunking", "retrieval fails 73% of the time"). None traces to a named study. Use
the claim shape to structure the content and cite our own client data.

---

## Cluster 10: Automation platforms (`/blog/`)

**Why.** 879 queries on n8n, Zapier, Make and RPA after noise removal, the
largest single technology cluster in the harvest. `DEMAND.md`: the comparison
SERP is saturated but shallow, every post recycling the same three facts and
ending in "it depends", and nobody prices at real volume.

| # | Post | Owns |
| --- | --- | --- |
| 10.1 | **n8n vs Zapier vs Make, Priced at Real Volume** (hub) | the comparison head term |
| 10.2 | What 10,000 Executions a Month Actually Costs on Each | the pricing gap nobody fills |
| 10.3 | Self-Hosted n8n: The Ops Cost Everyone Omits | "n8n self hosted vs cloud" |
| 10.4 | Is n8n Worth It? An Honest Read on the Free Tier | "n8n free", "is n8n worth it" |
| 10.5 | When Zapier Is the Right Answer | contrarian, we sell the alternative |
| 10.6 | Migrating From Zapier to n8n: What Breaks | migration intent |
| 10.7 | n8n and MCP: What It Changes | "n8n mcp", emerging |
| 10.8 | Building Your First Production Workflow | "n8n workflow", practitioner |

---

## Cluster 11: What software costs (`/blog/`)

**Why.** 797 cost-of-build queries. `DEMAND.md`: ranking articles quote PKR
15,000 to 1,500,000+, a 100x spread with no explanation of what moves a project
between tiers and almost no statement of what is excluded. The gap is a cost
article organised by scope decision rather than price tier.

| # | Post | Owns |
| --- | --- | --- |
| 11.1 | **What a Website Costs, by Scope Decision** (hub) | the cost head term |
| 11.2 | What a Website Quote Excludes | the TCO gap |
| 11.3 | What a Website Costs to Run, Per Year | "website cost per year" |
| 11.4 | App Development Cost: What Actually Moves the Number | "app development cost" |
| 11.5 | Website vs Web App vs Mobile App: How to Decide | decision intent |
| 11.6 | PWA or Native, on Pakistani Android Devices | 78% of digital payments are in-app |
| 11.7 | Fixed Price or Time and Materials: Which Protects You | contract intent |

11.3 is separate from 11.2 deliberately: "what does it cost to build" and "what
does it cost to keep" are different searchers, and the second is the one nobody
answers.

---

## Cluster 12: Shopify and e-commerce (`/blog/`)

**Why.** 349 queries. `DEMAND.md` records the sharpest gap found in any cluster:
unresolved Shopify Community threads currently rank page one for Pakistani
payment queries. When a forum question with no answer ranks, no page is
satisfying the query.

| # | Post | Owns |
| --- | --- | --- |
| 12.1 | **Accepting Payments on Shopify in Pakistan** (hub) | the blocker |
| 12.2 | Getting Paid *From* Shopify: The Payoneer Myth | the top misconception |
| 12.3 | Daraz vs Your Own Store: The Real Fee Arithmetic | BLOCKED, verify rate card |
| 12.4 | COD Unit Economics: What RTO Actually Costs | publish the range, never one number |
| 12.5 | Shopify vs WooCommerce, for Pakistan Specifically | Shopify Payments unavailable changes the maths |
| 12.6 | Choosing a Courier: What Changes Your Margin | operational intent |
| 12.7 | Reducing RTO: Confirmation, Address Quality, Partial Prepay | the fix, not the diagnosis |

---

## Cluster 13: Buying development work (`/blog/`)

**Why.** 162 offshore and hiring queries, plus the buyer-stage inventory in
`DEMAND.md`. `g2-security-review-delay` and `g2-cfo-veto` show what actually
stalls these deals, and almost the entire offshore information space is written
by sellers with no methodology.

| # | Post | Owns |
| --- | --- | --- |
| 13.1 | **How to Vet a Development Agency** (hub) | the vetting stage |
| 13.2 | What Offshore Development Actually Costs, and Why Rate Tables Lie | rejected rate tables, honestly explained |
| 13.3 | Questions That Expose a Weak Vendor | "questions to ask an agency" |
| 13.4 | Protecting IP When You Outsource | the top stated objection |
| 13.5 | Fixed Price, Time and Materials, or Outcome | `g2-cfo-veto`: outcome pricing doubled |
| 13.6 | Inheriting a Codebase: What to Check First | "inherited a codebase" |
| 13.7 | Your Agency Disappeared. Now What? | the rescue stage |

---

## Cluster 14: International buyer assets

**Why.** `g2-security-review-delay`: 39% of buyers, 50% of enterprise, name
security review as the biggest evaluation delay. `g2-cfo-veto`: CFO involvement
rose 31% to 46% and about half report vetoes. These are not articles, they are
downloads that remove friction from a buying process.

| # | Asset | Owns |
| --- | --- | --- |
| 14.1 | Our Vendor Security Questionnaire, Pre-Filled | the 39% delay |
| 14.2 | Working With a Pakistani Agency Under GDPR: SCCs and a TIA | `pk-no-gdpr-adequacy` |
| 14.3 | What We Charge, and How We Arrive at It | the CFO veto |
| 14.4 | Saudi PDPL Does Not Require Data Localization | corrects a live vendor error |
| 14.5 | How to Vet an AI Agency | buyer-stage intent |
| 14.6 | Inheriting a Codebase: A Fixed-Fee Takeover Audit | the rescue stage |
| 14.7 | Pakistan Left the FATF Grey List in 2022 | `pk-fatf-delisted` |

---

## Tools: deferred, not dropped

`pk-tool-intent-dominant`: 453 of 2,233 Pakistani queries carry tool intent, the
largest actionable category, and the four highest-prominence ones are all
verification queries. BarrioVibe ships 22 calculators and **not one verification
tool**.

    NTN checker by CNIC          feeds 1.6, 3.4
    SECP company checker         feeds 4.6
    PSEB status checker          feeds 2.1
    Trademark search             feeds 5.3
    PSEB break-even calculator   feeds 2.7
    SECP deadline calculator     feeds 4.7

**Deferred on 9 September 2026: guides first, tools later.** Recorded here and in
`findings.jsonl` as `verification-tools-deferred` so the gap is not forgotten.

Worth knowing when it is picked up: these differ in kind from the 22 existing
calculators. Those are pure in-browser arithmetic, which is what lets the site
promise that nothing a visitor types leaves the page. A verification tool has to
query an external source, so the honest first version is a page that explains
how to check, what the result means, and what to do about it, linking to the
official tool. That captures the informational half of the intent at the cost of
a page rather than an integration.

Each should eventually produce a shareable permalink and a PDF export:
`DEMAND.md` records that tools producing an artefact earn far more links than
tools that display a number.

---

## Publication order

**Wave 1, prove the format (6 posts).** 1.1, 1.2, 2.1, 3.1, 5.2, 7.1. One from
each strong cluster, all fully verified, all on demonstrably weak SERPs.

**Wave 2, complete the two strongest clusters (14).** The rest of clusters 1
and 2. A complete cluster outranks six scattered posts.

**Wave 3, the buyer assets (7).** Cluster 9. Independent of search volume: they
work on traffic that already exists.

**Wave 4, breadth (rest).** Clusters 3 to 8 in full.

Ship the four verification tools alongside Wave 2. They are the evidenced gap
and they feed six posts.

---

## Quality bar per post

Non-negotiable, and the reason this list is 71 posts rather than 200:

- **Every figure carries its source.** A rate needs its Ordinance section.
  Where the site already holds the number, interpolate from `lib/tax/` rather
  than retyping, so a Finance Act amendment cannot leave a post arguing with a
  calculator.
- **Answer the title's question completely, then stop.** Length follows the
  question. Padding to hit a word count is how thin content is produced.
- **Every post links to at least one calculator or download.** If it cannot, ask
  whether it should exist.
- **FAQ entries come from `QUESTIONS.md`**, in the searcher's wording, not
  invented.
- **No em dashes**, per `CLAUDE.md`. Applies to copy, metadata and JSON-LD.
- **No formulaic phrasing.** The existing 44 service pages contain exactly one
  instance of "leverage" and no other AI-tell vocabulary. That is the bar.

---

## What the first three posts changed

Written 11 September 2026, after shipping the first three. The plan above was
built from 7,496 harvested queries and it is a good map of demand. It is not a
map of what can be written, and the difference cost a post.

### The evidence was not there, and the harvest hid that

The guide side had 403 findings behind it, nearly all from primary statute. When
the blog side began, a keyword sweep of the same store found **five records
touching clusters 8 to 13**, and one was a rejected vendor statistic while
another was a contested one. Effectively two usable findings for 47 planned
posts.

That is not a failure of the research. It is what the research was for: the
harvest measured demand, and demand is not evidence. The lesson for the
remaining 44 is that **a blog post needs its sources fetched before it is
scheduled**, not after it is chosen, because the fetch is what decides whether
the piece exists.

### Three shipped, one dropped, and the dropped one is the instructive case

**8.10, "The 95% Failure Stat Is Disputed"**, was researched and abandoned. The
premise held up: the MIT Media Lab Project NANDA figure is genuinely disputed.
But the report's own URL now 302-redirects to a group overview page, and the
Wayback capture is excluded from replay by robots policy. The primary document
could not be read.

The post's entire value was quoting what the report actually says against what
is repeated about it. Writing it from critiques of a document we could not read
would have meant characterising a source second-hand, which is the specific
failure `METHOD.md` is about. Recorded as `mit-nanda-report-url-now-redirects`
and left unwritten.

The finding itself is worth keeping: the most-cited AI statistic of 2025 traces
to a URL that no longer serves it.

### WebFetch was not enough, and this is a tooling lesson

The first research pass used WebFetch and returned three "UNVERIFIABLE" items:
n8n's monthly prices, Make's entire tier ladder, and Make's 50,000-credit price.
All three sat behind JavaScript controls.

Driving the same pages with `scrapling`'s browser recovered every one: click the
billing toggle, drive the slider through all 19 positions, read the prices off
each. **The pricing content nobody has written is behind a toggle**, which is a
plausible reason nobody has written it.

The rule for the remaining posts: **for anything priced, use `research/fetch.py`
with `--stealth`, and drive the controls.** A static fetch of a pricing page
reports the default state and silently misses the rest.

### Two errors caught, both in our own premises

Worth recording because both were in the brief rather than in a source.

1. **Make no longer bills in "operations"**, it bills in credits. The research
   agent corrected the brief from the vendor's own docs. A 2026 comparison using
   "operations" reads as stale, which is precisely the defect the post exists to
   correct, and we nearly shipped it.
2. **n8n's pricing page is geo-priced.** One fetch returned 20€/50€/667€ and
   another returned $20/$50/$800 for the same plans. Starter and Pro carry the
   same number in both currencies and Business does not. Any comparison that
   does not name a currency is incomplete, and one that converts between the two
   is wrong.

### What the posts inherited, and what they needed new

Posts reuse the guides' section renderer, date gate, publishing workflow and
IndexNow ping. They needed three things of their own:

- **`sources`, required and non-empty.** Guides cite one statute named once in
  `content/provenance.ts`. A post about n8n pricing has no relation to the
  Income Tax Ordinance, and emitting it as a citation would be a false machine-
  readable claim, so `postSchema` is separate from `guideSchema` and builds its
  citations from the post's own array.
- **`limits`, an explicit statement of what the post does not cover.** The
  honest limitation is the first thing cut when prose is tightened and the thing
  that makes the rest credible.
- **`pnpm check:posts`.** The guides are backstopped by `check:tax`, which
  reconciles every rate against the First Schedule. Vendor prices have no such
  backstop and cannot have one, so the check enforces traceability instead:
  every source has a URL and a read date, and no post claims review before
  publication. It caught exactly that error on its first run.

### The scheduling bug this nearly shipped

`scripts/guides-due.ts` reported only guides. Posts share the `publishedAt`
gate, so a scheduled post would have sat in the repo forever: nothing would have
asked Vercel to rebuild for it, the guide beside it would have published, and
the run log would have said "nothing due" while being wrong.

Generalised to both. **Anything that gains a date gate must also be added to the
thing that fires the build**, or it is scheduled in name only.

---

## Selection moved to the service list

Written 11 September 2026, after the second batch of five.

### What changed

The blog clusters in this document (8 to 13) were built from the AI and
development query harvest: agent cost, agent failure, automation platforms,
software cost, Shopify, buying development work. That is a map of search
demand, and it is a reasonable one.

It is not a map of **what this agency sells**. `content/services/` lists 44
services across six pillars, and the software half of it is agentic AI, RAG
systems, digital FTEs, chatbots and prompt engineering, while a third of the
whole business is international expansion: US, UK and Saudi company formation,
filings and bookkeeping. The blog plan served almost none of that.

So selection for the second batch came from the **service pages' own FAQs**,
which turned out to be the best content brief in the repository. Each answers a
real buyer question in two sentences, which is right for a service page and far
too short for the question. Three of the five posts are a single service-page
FAQ, properly answered:

| Service page FAQ | Became |
| --- | --- |
| "Will our data be used to train models?" | Does your data train the model |
| "How do I know it is not making things up?" | How to tell if your RAG system is making things up |
| "What if Apple rejects the app?" | What actually gets your app rejected |
| "What does WhatsApp actually cost to run?" | What a WhatsApp chatbot costs in Pakistan |

The fifth, on US LLC filings, comes from the international expansion practice,
which this plan never covered at all.

### The rule this suggests for the remaining posts

**A post earns its place by answering a question a buyer asks before paying us,
not by matching a keyword cluster.** The query harvest is still useful for
phrasing and for confirming demand exists. It is the wrong thing to select on,
because it cannot see the business.

The service-page FAQs are the shortlist. There are roughly 40 of them and most
are worth a post.

### n8n is deprioritised

Cluster 10 allocates 8 posts to n8n, Zapier and Make. One shipped and it is a
good post, because the pricing arithmetic is real and nobody else has done it.
The remaining seven are not scheduled: the platform does not warrant that share
of the slate, and the cluster was sized by query volume rather than by
commercial value. Workflow automation remains a service; the platform-specific
content around it does not need eight pages.

### What the research found this time

Five topics, five verified, none dropped. Every one corrected something in the
brief I gave the research, which is becoming the pattern worth noticing:

1. **BOI reporting is permanently over for US-formed entities.** I briefed the
   March 2025 interim rule; a FINAL rule published 14 August 2026 supersedes it.
   A Pakistani founder's Wyoming or Delaware LLC files nothing, and the test is
   where the entity was formed rather than who owns it.
2. **WhatsApp has no "service" template category.** I listed four; Meta has
   three, plus a separate authentication-international rate. Service means
   free-form replies inside the 24-hour window, and those are free.
3. **Google Play's closed-testing gate is 12 testers, not 20.** The count was
   reduced. Most published guidance still says 20.
4. **The Gemini free tier is the real data trap**, not consumer chat apps. Same
   endpoint, same SDK: billing status alone decides whether human reviewers may
   read your inputs. Sharper than the consumer-versus-business framing the post
   was originally built on.
5. **There IS a US-Pakistan tax treaty**, TIAS 4232, in force since 1960. The
   widespread "no treaty" claim probably originates in Treasury's treaty page,
   which lists only post-1996 signings.

### One finding that is a business risk, not just content

Apple guideline 4.2.6: "Apps created from a commercialized template or app
generation service will be rejected unless they are submitted directly by the
provider of the app's content. These services should not submit apps on behalf
of their clients."

An agency submitting client apps from its own developer account is in scope.
The post says so plainly and recommends the client hold the account, which is
also where the listing and reviews belong. Worth knowing internally regardless
of the post.

### Orphans, again

Three of the five new posts had nothing linking to them, which is the exact
defect `EXECUTION.md` records from the guides. Fixed, and `check:posts` now
warns on it so the next batch cannot repeat it.
