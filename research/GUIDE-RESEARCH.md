# Per-guide research notes

Deep research for the first five guides, September 2026. Every load-bearing
fact traces to a `verified` record in `findings.jsonl`; this file records what
each guide is built on, what it corrects, and what still blocks it.

Query `python3 research/query.py --grep <term>` for the underlying records.

---

## The pattern that recurs across all five

**A consolidated PDF is not the current law.** It came up in three separate
guides and it is the single most useful thing this research produced.

FBR publishes the Income Tax Ordinance as a consolidated document with an
"amended up to" date. Both consolidations available during this work (31 July
2025 and 20 February 2026) **predate the Finance Act 2026**, which took effect
1 July 2026. So all three of these are true at once:

- Section 7E is printed in full in the consolidation, and was repealed.
- Rule 1A of the Tenth Schedule is printed in full, and was omitted.
- The section 182A surcharge reads Rs 1,000, and is now Rs 25,000.
- Division IVA reads "up to tax year 2026", and was extended to 2029.

Anyone who "goes to the primary source" and stops at the consolidation
publishes repealed law with total confidence. Every guide that touches a rate
needs the consolidation **and** the Finance Act, and the guides say so.

FBR's own Salient Features document has the mirror-image problem: it was
written against the **Bill** and states s.236K at 1.5% where the enacted Act
says 1.25%. A live FBR-hosted PDF contradicts the statute.

---

## Guide 1: Filer vs non-filer

**Published 10 September 2026.** `content/guides/filer.ts`

**Why it leads.** SERP analysis found SlideShare and a LinkedIn post ranking
page one for "difference between filer and non filer": a commercial query being
won by a slide deck. Thirteen shipped calculators expose a filer/non-filer
toggle, so every claim links to a tool that proves it.

**What it corrects**

| Received wisdom | Actual position |
| --- | --- |
| Non-filers pay double | Rule 1 doubles by default, but s.231B vehicles are **tripled** (200% proviso), and s.236C/236K use fixed tables rather than a multiplier |
| The doubling applies everywhere | Rule 10 excludes salary, cash withdrawal, electricity, telecom and export proceeds from the Schedule entirely |
| There are three tiers | The late filer tier was abolished when the Finance Act 2026 omitted Rule 1A |
| Surcharge is Rs 1,000 | **Rs 25,000** for an individual since the Finance Act 2026 |
| ATL updates weekly | **Daily** since October 2024, with immediate inclusion on time filing |
| Non-filers cannot buy cars or property | s.114C is not in force; it awaits a Gazette notification |

**Two things nobody else has.** FBR's own ATL page still says "every Monday"
while FBR's own press release says daily, and s.114C's commencement is
unverifiable because the notification cannot be found. The second is published
as an open question rather than an assertion, which is the honest form.

**Findings:** `tenth-schedule-mechanism`, `s231ab-filer-zero`,
`late-filer-abolished`, `late-filer-surcharge-2026`, `atl-daily-updates`,
`s182a-nonmonetary`, `overseas-psid-filer-rate`, `atl-verification-routes`,
`s114c-not-in-force`, `cnic-is-ntn`.

---

## Guide 2: How to get an NTN

**Scheduled 11 September 2026.**

**Why here.** 86 harvested queries and a SERP where the government portal ranks
first and answers nothing: someone searching "ntn registration requirements"
wants a document list and gets a login form.

**The three claims that carry it**

1. **There is no FBR fee**, and this is provable from statute rather than
   asserted. Old s.181(2) required a prescribed fee; the Finance Act 2008
   substituted Part IX in its entirety and the replacement s.181 has no fee
   provision. Any fee charged is a consultant's service charge.
2. **A salaried individual attaches no documents.** FBR's own IRIS guide lists
   three attachments, all marked "business individuals only". Competitors
   publish a long universal list that pushes salaried readers toward hiring
   someone.
3. **Registration does not complete at login.** FBR's guide warns explicitly
   that you cannot file until Form 181 is submitted from the Draft folder. The
   most common structural failure is creating the login, seeing a dashboard,
   and never submitting.

**Also verified:** the CNIC *is* the NTN under s.181(4) but holding one does
not register you; companies and AOPs cannot complete registration online and
must visit an RTO; the SIM must be registered against the applicant's own CNIC
and, for a company principal officer, not already registered with FBR.

**Findings:** `ntn-no-fee`, `cnic-is-ntn`, `iris-form181-trap`,
`ntn-documents-salaried-none`, `aop-company-rto-visit`,
`atl-verification-routes`, `secp-one-window-ntn`.

---

## Guide 3: How to become a filer

**Scheduled 12 September 2026.**

**Why here.** "How to become a filer" is the deepest seed in the entire
harvest: 412 autocomplete completions, more than any other Pakistani tax query
tested. The SERP carries YouTube and LinkedIn on page one.

**What it adds over guide 1.** Guide 1 answers what the gap costs; this answers
the procedure, and the two link to each other rather than overlapping. The
substance competitors miss is the timing: filing on time now means immediate
ATL inclusion, not a wait until the next Monday or the next March.

**The surcharge waiver** added by the Finance Act 2026 and absent from every
Bill-stage commentary: no surcharge for an individual who undertakes to the
Commissioner not to acquire property for six months.

**Findings:** `atl-daily-updates`, `late-filer-surcharge-2026`,
`s182a-nonmonetary`, `ntn-no-fee`, `atl-verification-routes`.

---

## Guide 4: SECP company registration

**Scheduled 13 September 2026.**

**Why here.** Highest score in the ranking: 182 queries against a weak page
one, and it is the entry point to the whole compliance funnel. Register a
company, then you need an NTN, then sales tax, then annual filings, and every
one is a guide in this set.

**The fee finding is the story.** The Seventh Schedule effective 21 April 2025
sets electronic incorporation at Rs 6,050 and name reservation at Rs 1,000.
Live competitor pages quote Rs 1,800 to 2,200 and Rs 200, roughly a third,
because they predate SRO 1806(I)/2024. **Even invest.gov.pk, a government
site, still publishes the old figures.**

**What else it corrects**

- Minimum capital: there is none. SECP's own FAQ says so. Rs 100,000 is the
  lowest **fee slab**, not a requirement.
- Public company minimums: competitors publish "3 directors and 7
  shareholders", conflating two rules. s.14(1)(a) requires three or more
  **persons**; seven is the **director** minimum for a **listed** company under
  s.154(1)(d).
- Form 29 is **15 days** under s.197(3), not 30, and the first appointment at
  incorporation is expressly excluded.
- Name reservation lasts **60 days** under s.10(4). Almost nobody mentions it,
  so nobody warns that a reserved name can lapse before incorporation.
- SECP's published SLA is **same working day** if filed before 10:00 a.m.,
  against the "1 to 3 working days" competitors claim.

**The section nobody has:** s.17(2) requires subscription money within 30 days
of incorporation, and s.17(3) requires a report to the registrar within 45 days
**with a certificate from a practising chartered accountant or CMA**. New
companies do not know this and it is a real compliance trap.

**TWO OPEN ITEMS BLOCK PARTS OF THIS GUIDE**

1. `secp-fee-escalator` (contested). The Seventh Schedule contains a clause
   increasing fees by 10 percent after one year from the notification date. The
   schedule is effective 21 April 2025, so an uplift would be due from 21 April
   2026, inside the period this guide covers. No SRO, circular or SECP page
   confirming application was found. If applied, Rs 6,050 becomes about
   Rs 6,655. **The guide publishes the clause and the open question rather than
   a number that might be wrong.**
2. `secp-nift-dsc-doubtful` (unverified). Competitors say a paid NIFT digital
   signature is required. SECP's own getting-started page describes a PIN sent
   by SMS and email plus a Rs 100 charge. No SECP page supports a mandatory
   purchased certificate. Treated as an open question, not repeated as fact.

Also unresolved, and named in the guide: SECP has published **no formal
eServices retirement notice**, and its own legacy page was still live in
September 2026 describing the old flow and citing the **repealed** Companies
Ordinance 1984. So "eZfile is mandatory" is true in practice and for named
processes but is not backed by a dated cut-over notification.

**Findings:** `secp-seventh-schedule-fees`, `secp-fee-escalator`,
`secp-no-minimum-capital`, `companies-act-minimums`, `form29-fifteen-days`,
`form-a-exemption-structure`, `secp-name-reservation-rules`,
`secp-first-45-days`, `ezfile-status`, `secp-one-window-ntn`,
`secp-aug-2026-data`, `secp-nift-dsc-doubtful`.

---

## Guide 5: Trademark registration

**Scheduled 14 September 2026.**

**Why here.** YouTube and Scribd rank page one for "trademark registration
check online pakistan", and the Scribd result is a scraped copy of an old IPO
web page. Google is surfacing a document dump of the official source because
nobody has written the structured page.

**Two distinct fee conflations in the market**

1. TM-11 registration (Rs 9,000) and TM-5 opposition (Rs 9,000) are different
   forms that happen to cost the same, and get merged.
2. The widely syndicated S.S. Rana table labels renewal as **TM-13**. The
   gazette says **TM-12 is renewal at Rs 15,000** and TM-13 is restoration at
   Rs 3,000.

Renewal at Rs 15,000 is the largest single fee in the lifecycle and is omitted
almost universally.

**The cost insight.** Rule 13 of the Trade Marks Rules 2004: every application
shall be in respect of goods or services in **one class only**. Pakistan does
not permit multi-class applications, so cost scales linearly. Three classes is
Rs 36,000 in official fees before any search or agent cost. Almost no
competitor models this.

**Renewal windows, exactly.** Rule 50 notice 1 to 6 months before expiry; Rule
51 filing within the six months **ending on** expiry; Rule 52 six-month grace
after expiry with the additional fee; Rule 53 restoration within six months of
the **date of removal**, which is a different date from expiry. Competitors say
"within 12 months of expiry", which is neither.

**Madrid nuance.** Pakistan acceded with effect from 24 May 2021, but the
domestic enabling chapter arrived only with the Trade Marks (Amendment) Act
2023. Outbound filing worked from 2021; inbound designations lacked a domestic
basis until 2023. Competitors present Madrid as simply "available".

**One open item:** `tm-fee-schedule-currency`. No revision later than the 4
March 2019 notification has been located, but that is **negative evidence**.
The guide says "as at this date, no later revision has been notified" and
carries the review date, rather than claiming the fees are fixed.

**Findings:** `tm-fees-schedule`, `tm-form-mapping`, `tm55-search-fee`,
`tm-one-class-per-application`, `tm-renewal-windows`, `tm-opposition-period`,
`tm-madrid-inbound-gap`, `tm-fee-schedule-currency`, `tm-wipo-2024-growth`,
`REJECT-tm-fabricated-fees`.

---

## Guide 6 (researched, not yet scheduled): Property tax

Research is complete and recorded. It is not in the first five because the
seasonal guides were pulled forward, but the material is the strongest
authority signal in the set: **FBR's own live PDF states a rate the enacted Act
contradicts**, and our calculator already has the correct figure.

Also: **s.7E is dead**, struck down by the Federal Constitutional Court on
7 May 2026 and then repealed. Pages currently ranking still explain how to
obtain a 7E exemption certificate for a tax that no longer exists.

**Do not publish KPK provincial rates.** The firm is in KPK and this is the
least-sourced item in the entire research: only tier 4 and 5 blogs. Punjab's
stamp duty cut was made by Ordinance, which lapses after 90 days unless
enacted, and its status is unverified.

**Findings:** `fbr-salient-236k-wrong`, `s236k-nonfiler-bands`,
`s236c-flat-both-sides`, `s7e-repealed`, `late-filer-abolished`,
`calc-236c-236k-current`, `s236c2-minimum-tax-flip`,
`kpk-provincial-rates-unknown`.

---

## What to re-verify when the next Finance Act lands

In priority order, because every one of these moved in 2026:

1. The s.182A surcharge amounts and the property undertaking waiver.
2. Tenth Schedule Rule 1 multipliers and the Rule 10 exclusion list.
3. s.236C and s.236K rates on both sides.
4. The s.154A sunset year.
5. Whether s.114C has been notified.
6. The SECP fee escalator.
7. Whether the trademark fee schedule has been revised.
