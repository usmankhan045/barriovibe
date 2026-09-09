# Article slate

41 titles across five categories, each tagged with what it rests on and whether
it can be written today. Derived from `STRATEGY.md`; facts trace to
`findings.jsonl`.

**Status key**

    READY      every load-bearing fact is verified. Write it.
    BLOCKED    needs a verification item closed first. The blocker is named.
    OURS       needs BarrioVibe's own data, not research. Nobody else can write it.

Priority is by defensibility and intent, not by search volume, because no
volume data exists yet (see STRATEGY.md, "What is still unknown").

---

## A. Convergence: tech + compliance (`/guides/`)

The wedge. Each of these needs both halves of the business, which is why no
competitor has written them.

| # | Title | Status | Rests on |
| --- | --- | --- | --- |
| 1 | Your US LLC Is a Declarable Foreign Asset in Pakistan | READY | `s116a-thresholds` |
| 2 | PSEB Registration and the 0.25% Rate: What Section 154A Actually Requires | READY | `s154a-pseb-condition`, `s154a-rates`, `s154a-final-tax-conditions`, `s154a-extended-2029` |
| 3 | Can a Pakistani Company Legally Own a Foreign Entity? What SBP Permits | READY | `sbp-eia-it-2024`, `sbp-eia-framework` |
| 4 | Freelancer to Registered Software House: When Incorporating Starts Paying | READY | `s154a-rates`, `secp-sector-fy26` |
| 5 | Living Abroad, Still Resident: The 183-Day Rule Pakistani Expats Get Wrong | READY | `s82-residency-verified` |
| 6 | Getting Paid from Abroad: Payoneer, Wise and the PSEB Banking Condition | BLOCKED | `80pc-banking-omitted` unresolved |

**Note on #1.** This is the flagship. LLC-formation vendors are offshore and
have no incentive to mention Pakistani tax exposure; Pakistani tax consultants
do not sell LLC formation. The thresholds (USD 10,000 foreign income, USD
100,000 foreign assets) are quoted verbatim from FBR.

**Note on #5.** Corrects an error the whole field repeats: the presence test in
s.82(a) is **183 days**, substituted from "eighty-two" by the Finance Act 2006.
The 182-day figure belongs to the separate other-country test in s.82(d).

---

## B. Pakistan tax and corporate reference (`/guides/`)

Evergreen. Updated in place, never re-dated.

| # | Title | Status | Rests on |
| --- | --- | --- | --- |
| 7 | Income Tax Slabs 2026-27, With the Working Shown | READY | `lib/tax/pakistan.ts` (already verified by `check:tax`) |
| 8 | Filer vs Non-Filer: The Real Rupee Difference | READY | 11 existing calculators compute both sides |
| 9 | Trademark Registration Costs: The Fees Everyone Gets Wrong | READY | `tm-fees-schedule`, `tm-fee-currency` |
| 10 | Registering a Company on SECP eZfile | READY | `secp-ezfile` |
| 11 | SECP Annual Filing: Form A, Form 29, and When You Don't Have to File | READY | `secp-annual-filing-chain` |
| 12 | Sales Tax Registration: Biometric Verification and GPS-Tagged Premises | READY | FBR sales tax registration page |
| 13 | How to Get an NTN | READY | standard FBR process |
| 14 | Missed 30 September: Penalties, Surcharge, and Restoring ATL | READY | FBR s.182A surcharge amounts |

**Note on #8.** This is the most linkable page in category B, and the advantage
is structural. Every competitor writes filer-vs-non-filer as prose. BarrioVibe
has **11 calculators** that compute both rates (property purchase and sale,
property capital gains, vehicle tax and token tax, rental income, cash
withdrawal, mobile and internet, capital gains, mutual fund, freelancer). Each
claim can link to a tool that proves it in rupees on the reader's own numbers.
A competitor would have to build 11 calculators to copy it.

**Note on #9.** Corrects a live, checkable error. Competitors conflate the TM-11
registration fee (PKR 9,000) with the TM-5 opposition fee (also PKR 9,000), and
essentially nobody mentions renewal at PKR 15,000 under TM-12. All verified from
the 2019 gazette notification.

**Note on #11.** The October-November SECP cluster is far less contested than
30 September. Critically, the popular claim that dormant companies have no
exemption is **wrong**: where particulars are unchanged, an SMC or a private
company with paid-up capital not over PKR 3 million need not file Form A/B at
all. Writing the received version would tell readers to file something they do
not owe.

---

## C. International buyer assets (`/guides/`)

These are downloads and reference pages, not reading material. Aimed squarely at
the 39% security-review delay and the CFO veto.

| # | Title | Status | Rests on |
| --- | --- | --- | --- |
| 15 | Working With a Pakistani Agency Under GDPR: SCCs and a Transfer Impact Assessment | READY | `pk-no-gdpr-adequacy` |
| 16 | Our Vendor Security Questionnaire, Pre-Filled | READY | `g2-security-review-delay` |
| 17 | What We Charge, and How We Arrive at It | OURS | `g2-cfo-veto` |
| 18 | Saudi PDPL Does Not Require Data Localization | READY | `saudi-pdpl-no-localization` |
| 19 | How to Vet an AI Agency: The Questions That Expose a Weak One | READY | buyer-stage query inventory |
| 20 | Inheriting a Codebase: A Fixed-Fee Takeover Audit | READY | project-rescue buyer journey |

**Note on #17.** Contrarian and probably the highest-converting page on the
site. Every offshore competitor hides pricing, and the CFO now vetoes roughly
half of deals. Needs BarrioVibe's real numbers and a stated methodology, not
research.

**Note on #20.** The "I've been burned" stage has the lowest volume and the
highest urgency, and country-of-origin objections weaken sharply when the
alternative is a dead project.

---

## D. AI and automation (`/blog/`)

Cost and failure, never definitions. Do not fight Zendesk and Salesforce on
"what is RAG" or "AI agent vs chatbot".

| # | Title | Status | Rests on |
| --- | --- | --- | --- |
| 21 | What an AI Agent Actually Costs Over Three Years | READY | TCO structure: build is 25-35% of 3-year total |
| 22 | You Probably Don't Need an Agent | READY | Gartner: 40%+ cancelled by 2027 |
| 23 | Agent Washing: How to Audit a Vendor's "Agentic AI" Claim | READY | Gartner: ~130 real vendors of thousands |
| 24 | The 95% AI Failure Stat Is Disputed. Here's What It Measured | BLOCKED-ish | `mit-95pc-contested`, publish only as disputed |
| 25 | Why Your Agent Hallucinates Instead of Querying the Database | READY | n8n community forum threads |
| 26 | Your Agent Is Stuck in a Loop: The Tool-Count Problem | READY | n8n community forum threads |
| 27 | RAG Returns Wrong Answers: A Chunking Triage | READY | ingestion/chunking failure pattern |
| 28 | Confidence Thresholds: The Missing Safety Layer | READY | documented n8n failure mode |
| 29 | n8n vs Zapier vs Make, Priced at 1K, 10K and 100K Executions | READY | nobody publishes cost at volume |
| 30 | RAG, Fine-Tuning, or Just Better Prompts? | READY | consensus exists; economics do not |
| 31 | Your AI Pilot Failed. Here's the Diagnostic. | READY | post-pilot rescue buyer |

**Note on #24.** Publishable only as "the widely-cited and widely-disputed
claim". The study is n=52 interviews, not peer-reviewed, a Wharton professor
could not locate the 95% figure in it, and NANDA has commercial conflicts.
Publishing both the stat and the critique is a trust asset; repeating the stat
as fact is not.

**Note on the failure cluster (#25-28, #31).** Nearly uncontested, because
admitting failure modes is off-brand for vendors. The service pages already
answer "What happens when an automation breaks?" in two sentences, so the
expertise exists and is currently invisible to search.

**Do not use** the RAG failure percentages that circulate widely ("80% of
failures trace to chunking", "retrieval fails 73% of the time"). None traces to
a named study. Use the claim shape to structure content and cite BarrioVibe's
own client data instead.

---

## E. E-commerce, web and marketing (`/blog/`)

| # | Title | Status | Rests on |
| --- | --- | --- | --- |
| 32 | Accepting Payments on Shopify in Pakistan | READY | Shopify Payments unavailable in PK |
| 33 | Getting Paid *From* Shopify: The Payoneer Myth | READY | most common misconception in the cluster |
| 34 | Daraz vs Your Own Store: The Real Fee Arithmetic | BLOCKED | rate card is tier-4; verify on a live seller dashboard |
| 35 | COD Unit Economics: What RTO Actually Costs | READY | publish the range, never a single number |
| 36 | No, Pakistan's E-Commerce Tax Was Not Cancelled | BLOCKED | `ecommerce-tax-not-cancelled`; verify 1%/2% against enacted Finance Act |
| 37 | The 5% Creator Tax on YouTube, Facebook and TikTok Income | READY | `s154b-social-media-5pc` |
| 38 | Website Cost in Pakistan, by Scope Decision Not Price Tier | READY | competitor ranges span 100x with no methodology |
| 39 | What a Website Quote Excludes | READY | TCO gap nobody covers |
| 40 | Setting an Ad Budget at Small Absolute Spend | OURS | no PK Meta benchmark dataset exists |
| 41 | PWA or Native, on Pakistani Android Devices | READY | 78% of digital payments are in-app (SBP) |

**Note on #32 and #33.** Unresolved Shopify Community threads currently rank on
page one for these queries. When a forum question with no answer ranks, no page
is satisfying the query. That is about as clean a gap signal as exists.

**Note on #35.** RTO figures in circulation range from 25% to 60% with no
methodology anywhere. Publish the range with sources and explain why it varies
by category and city. Do not pick a number.

**Note on #40.** No authoritative Pakistan-specific Meta benchmark dataset
exists. Everything ranking quotes USD Western figures ($0.78 CPC, $29.99 CPA,
"$2,000-25,000/month retainers"), which is actively misleading for a Pakistani
SMB reading "test with $5,000". PKR benchmarks from BarrioVibe's own anonymised
client accounts would be unbeatable and uncopyable.

---

## Suggested first five

Ordered by defensibility, not volume.

1. **#1** Your US LLC Is a Declarable Foreign Asset (flagship, fully verified)
2. **#2** PSEB and the 0.25% Rate (strongest cluster, conditions explained nowhere)
3. **#3** Can a Pakistani Company Legally Own a Foreign Entity (zero competition)
4. **#9** Trademark Costs (corrects a live error, gazette-verified)
5. **#10** SECP eZfile (competitor pages are stale; timeboxed)

Then the international pack (#15, #16, #17), which targets buying-process
friction rather than search volume and is therefore not competing with anyone.

## Writing constraints

Every draft must satisfy the project rules in `CLAUDE.md`, in particular the
**no em dashes** rule, which applies to page copy, metadata, JSON-LD and code
comments alike.

Beyond that, two constraints specific to this content:

1. **No figure without a citation.** The tax calculators hold themselves to a
   cited Ordinance section plus a `check:tax` assertion. Guides inherit that
   standard: a rate in prose needs its section, and where possible it should be
   interpolated from `lib/tax/` rather than retyped, so a Finance Act amendment
   cannot leave a guide arguing with a calculator.
2. **No formulaic phrasing.** The existing 44 service pages contain exactly one
   instance of "leverage" and no other AI-tell vocabulary. That is the voice bar
   to match. A `check:prose` script enforcing this mechanically is worth adding
   before drafting begins.
