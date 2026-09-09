# Post architecture

Redesigned from the full evidence base: 60 findings, 7,496 harvested queries,
169 SERP-sourced questions, 35 queries with competitive data.

Supersedes the flat list in `ARTICLES.md`, which was 41 titles chosen by
category. This is built the other way round: from the query mass that actually
exists, so every post owns a distinct angle rather than a slice of one.

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

    Cluster                     Hub   Spokes   Total
    1. Filer status              1       7        8
    2. PSEB and IT export        1       7        8
    3. NTN registration          1       6        7
    4. Company formation         1       8        9
    5. Trademark and IP          1       6        7
    6. Property tax              1       6        7
    7. Cross-border              1       7        8
    8. AI cost and failure       1       9       10
    9. Buyer assets              -       7        7
                                                ---
                                                 71

---

## Cluster 1: Filer status

**Why this cluster leads.** `pk-serp-weakest-queries`: SlideShare and a LinkedIn
post rank on page one for "difference between filer and non filer". 134
harvested queries. And 11 shipped calculators compute the filer/non-filer gap,
so every claim links to a tool that proves it in rupees.

| # | Post | Owns | Proof |
| --- | --- | --- | --- |
| 1.1 | **Filer vs Non-Filer: What the Difference Costs You** (hub) | the head term | 11 calculators |
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

## Cluster 8: AI cost and failure

**Why.** `ai-cost-intent-confirmed`: 2,042 of 5,263 AI queries are commercial,
and "ai agent cost per month" and "ai agent development cost" both sit at
maximum autocomplete prominence on both engines. Do not attack the definitional
queries; `DEMAND.md` shows Zendesk and Salesforce own those.

| # | Post | Owns |
| --- | --- | --- |
| 8.1 | **What an AI Agent Actually Costs Over Three Years** (hub) | the cost head term |
| 8.2 | Per Month or Per Build: How Agent Pricing Models Differ | "ai agent cost per month" |
| 8.3 | Agent Cost vs Hiring: The Comparison Done Honestly | "ai agent cost vs salary", a real harvested query |
| 8.4 | You Probably Do Not Need an Agent | the contrarian, Gartner-backed |
| 8.5 | Agent, Chatbot, or LLM: A Three-Way Answer | "ai agent vs chatbot vs llm", nobody writes the three-way |
| 8.6 | Workflow Automation vs RPA vs Agents | "workflow automation vs rpa" |
| 8.7 | Why Agents Hallucinate Instead of Querying the Database | failure cluster |
| 8.8 | The Tool-Count Problem: Why a Third Tool Breaks Your Agent | failure cluster |
| 8.9 | Confidence Thresholds: The Missing Safety Layer | failure cluster |
| 8.10 | n8n vs Zapier vs Make, Priced at Real Volume | nobody prices at volume |

---

## Cluster 9: International buyer assets

**Why.** `g2-security-review-delay`: 39% of buyers, 50% of enterprise, name
security review as the biggest evaluation delay. `g2-cfo-veto`: CFO involvement
rose 31% to 46% and about half report vetoes. These are not articles, they are
downloads that remove friction from a buying process.

| # | Asset | Owns |
| --- | --- | --- |
| 9.1 | Our Vendor Security Questionnaire, Pre-Filled | the 39% delay |
| 9.2 | Working With a Pakistani Agency Under GDPR: SCCs and a TIA | `pk-no-gdpr-adequacy` |
| 9.3 | What We Charge, and How We Arrive at It | the CFO veto |
| 9.4 | Saudi PDPL Does Not Require Data Localization | corrects a live vendor error |
| 9.5 | How to Vet an AI Agency | buyer-stage intent |
| 9.6 | Inheriting a Codebase: A Fixed-Fee Takeover Audit | the rescue stage |
| 9.7 | Pakistan Left the FATF Grey List in 2022 | `pk-fatf-delisted` |

---

## Tools to build alongside

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

Each should produce a shareable permalink and a PDF export: `DEMAND.md` records
that tools producing an artefact earn far more links than tools that display a
number.

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
