# Per-guide research notes

Deep research for the first five guides, September 2026. Every load-bearing
fact traces to a `verified` record in `findings.jsonl`; this file records what
each guide is built on, what it corrects, and what still blocks it.

Query `python3 research/query.py --grep <term>` for the underlying records.

---

## The pattern that recurs, and how it was refined

**Check the "amended up to" date on any consolidation before you cite it.**

The original form of this note said that every available consolidation predates
the Finance Act 2026 and therefore prints repealed law. That was true of the two
editions in hand at the time, 31 July 2025 and 20 February 2026, and it explained
several apparent contradictions at once: section 7E printed in full though
repealed, Tenth Schedule Rule 1A printed though omitted, the section 182A
surcharge reading Rs 1,000 when it is Rs 25,000, and Division IVA reading "up to
tax year 2026" when the rate runs to 2029.

It is no longer true as a general statement. FBR publishes a consolidation
**amended up to 30 June 2026** which postdates the Act: it prints section 154B
in full, marks section 7E as omitted by the Finance Act 2026, and carries the
Act's amendments throughout. Verified by download and text extraction; recorded
as `ordinance-consolidation-30jun2026`.

The lesson survives and is sharper for the correction. The date on the cover is
the difference between current law and repealed law, and **a newer edition may
exist than the one a search returns**. Two of the three documents FBR was
serving in September 2026 were stale; the third was not.

FBR's Salient Features has the mirror-image problem and it has not been fixed.
It was written against the **Bill**, states section 236K at 1.5 percent where the
enacted Act says 1.25, and is still live on fbr.gov.pk. Two FBR-published
documents contradict each other, which is what makes it dangerous: a writer
sourcing "from FBR" can land on the wrong number in good faith. Recorded as a
rejected finding so it cannot resurface.

**The best single source for what the Act changed** is FBR Circular No. 02 of
2026-27 dated 8 September 2026. Its listing page is a JavaScript form, but the
FBR homepage exposes a download handler that redirects to the PDF. It is scanned,
with no text layer, so it has to be read as images.

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

---

## Guides 11 to 15: research complete, not yet written

Ranked by the usual score. All research is recorded in `findings.jsonl`.

| # | Guide | Queries | SERP weakness | Score |
| ---: | --- | ---: | ---: | ---: |
| 11 | Salary tax and what your employer withholds | 95 | 4.0 | 9.91 |
| 12 | Income tax slabs 2026-27 | 125 | 2.0 | 6.30 |
| 13 | How to file your return in IRIS | 94 | 2.0 | 5.93 |
| 14 | Tax for freelancers | 63 | 1.5 | 4.52 |
| 15 | Tax on YouTube and social media income | 24 | 1.5 | 3.49 |

The salary weakness of 4.0 is the highest measured anywhere in this project.
**Facebook ranks on page one** for "pakistan salary tax slabs", alongside two
consultant blogs. A commercial query being won by a social post.

### What guides 11 to 13 carry

**The slab table is settled from three independent directions.** FBR Circular
No. 02 of 2026-27 para 7 sets out the substituted eight-band table; the Finance
Act 2026 gazette contains it; and `lib/tax/pakistan.ts` already holds all eight
bands, matching exactly, reconciled by `check:tax` on every build. The guide can
interpolate rather than restate, which is the no-figures rule working.

**The section 4AB story resolves a contradiction across every source.** Three
steps: the Finance Act 2024 inserted it at 10 percent above Rs 10 million; the
Finance Act 2025 reduced it to 9 percent for salaried persons; the Finance Act
2026 withdrew it for salaried persons entirely while leaving 10 percent for
others. Every published figure is a real rate from a different year. A salaried
person's top marginal rate for tax year 2027 is a clean 35 percent, not 38.15.

**The comparison that carries guide 12.** Salaried rates fell and business rates
did not, so the gap widened. On Rs 5.6 million a salaried person pays Rs 976,000
and a business individual pays Rs 1,610,000. At the entry band it is starker
still: 1 percent against 15 percent.

**Two different percentage tests get conflated.** Salary must exceed 75 percent
of taxable income for the salaried rate table to apply. FBR's filing page offers
the salaried return form where salary is more than 50 percent. Different tests,
different purposes.

**The section 182 tapering relief is almost never published**: the late-filing
penalty is reduced by 75, 50 or 25 percent where the return is filed within one,
two or three months of the due date. Directly actionable for anyone reading in
October.

### What guides 14 and 15 carry

**Section 154B is minimum tax, not final tax.** Every published account calls it
a 5 percent final tax. Section 154B(3) makes it minimum for a resident and final
only for a non-resident without a permanent establishment. Given section 82(d),
the final limb reaches almost no Pakistani reader. The 5 percent is a floor, not
a settlement.

**Where the 10 percent actually comes from.** Division IIIAB says 5 percent and
nothing else. The 10 percent arises from Tenth Schedule Rule 1 doubling for
non-ATL persons. Rule 10 exempts sections 154 and 154A from that doubling but
not 154B, which is why export proceeds are not doubled and creator revenue is.

**Your bank is the collector, not the platform.** Section 154B(1) names banking
and non-banking financial institutions. Google, Meta and TikTok deduct nothing.

**A twentyfold question the rules do not answer.** A bank seeing a USD credit
from Google must decide between section 154A at 0.25 or 1 percent and section
154B at 5 percent. Section 154B(4) empowers the Board to prescribe identification
mechanisms and no such notification was traced. Publish as an open question.

**Section 111(4) is capped at Rs 5 million.** The inward remittance shield
requires encashment into rupees and a bank certificate, and it protects only
against unexplained-income treatment. It is not an exemption from tax.

### Open before writing

- `kpra-export-services-unknown`. Whether KPK zero-rates exported services, and
  the KPRA rates for IT services. The firm's home jurisdiction and the least
  sourced item in the project: kpra.gov.pk returns 403 and only tier-4 summaries
  exist. Download the Act in a browser.
- `s154b-rules-not-notified`. Recheck FBR SROs issued after 1 July 2026.
- `s153-it-vs-professional-fork`. Whether a freelance developer billing a
  domestic company is withheld at 4 percent as IT services or 15 percent as an
  independent software engineer. Both entries are verbatim; the resolution is
  not. Publish as a tension rather than an answer.

---

## A scope correction found while planning guides 16 to 25

**The first fifteen guides absorbed most of the planned spokes.**

`POSTS.md` allocates 54 guides across seven clusters on a hub-and-spoke model:
one hub owning the head term, six to eight spokes each owning one long-tail
question. That allocation was made before any guide was written.

Measured against what actually shipped, it over-counts. The guides came out as
dense hubs of ten to fifteen sections that answer their spokes inline:

| Planned spoke | Where it already lives |
| --- | --- |
| 4.2 SECP fees, itemised | Hub carries the full Seventh Schedule table and the escalator |
| 4.4 Name reservation | Hub: the sixty-day clock, prohibited words, the same-day SLA |
| 4.7 / 4.8 Form A, Form 29, the exemption | Hub: deadlines table plus the s.130(5) structure |
| 5.3 Searching before you file | Trademark hub: free search versus the official one |
| 5.5 Renewal at PKR 15,000 | Trademark hub: the renewal timetable and removal versus expiry |
| 3.x NTN spokes | Split across the two NTN guides |

Writing those as separate guides would produce exactly what `POSTS.md` forbids:
two pages satisfying the same searcher, which the rule says are one page.

**What this changes.** The remaining slate is smaller and differently shaped
than 54 minus 15. The genuine gaps are whole clusters nobody has touched, not
finer slices of clusters already covered:

- **Cluster 7, cross-border, is entirely unwritten** and is the strongest wedge
  in the strategy. Offshore-LLC vendors have no reason to mention Pakistani
  exposure and Pakistani tax firms do not sell foreign company formation.
- **Business structures other than a company**: partnerships go to the
  Registrar of Firms rather than SECP, which the whole field writes around.

Guides 16 and 17 came from that reading: capital gains on property, which the
property hub deliberately left to a separate page because the acquisition-date
split needs its own table, and partnership registration, which no existing
guide could answer because the answer is that SECP is the wrong building.

**The general lesson for the next planning pass.** Count spokes against what
the hubs actually say, not against the plan that predates them. A spoke is only
a guide if a reader who has read the hub still has an unanswered question.

---

## Guides 16 to 22, and why the batch is seven rather than ten

Written 10 September 2026. Seven guides, taking the schedule to 1 October.

| # | Guide | Cluster | Built on |
| --- | --- | --- | --- |
| 16 | Capital gains on property | property | s.37, Division VIII, interpolated from `lib/tax/property.ts` |
| 17 | Registering a partnership firm | company | Partnership Act 1932, Companies Act s.9 |
| 18 | Your US LLC is a declarable foreign asset | cross-border | s.116A, s.182 entry 1AAA, s.195A, s.195B, s.216, Companies Act s.452 |
| 19 | Can a Pakistani own a company abroad | cross-border | FE Manual Ch.20 Para 13, FERA s.23, Companies Act s.199, ITO s.109A |
| 20 | Tax residency for overseas Pakistanis | cross-border | s.82 and its footnotes |
| 21 | Receiving money from abroad | cross-border | s.111(4) and its footnotes |
| 22 | What a US LLC costs to keep | cross-border | Treas. Reg. 1.6038A, 6 Del. C. s.18-1107, W.S. 17-29-209 |

**The cross-border cluster is now the largest in the set**, at five guides. It
was the correct call: it was entirely unwritten, it is the one place where the
tech half and the compliance half of the firm are both required to answer the
question, and neither the offshore-formation vendors nor the Pakistani tax
firms have a reason to write it.

### Three guides that were planned and not written

Being explicit about this, because "not yet" and "decided against" are
different states and the next pass should not have to rediscover which is which.

**UAE Small Business Relief.** Blocked, not abandoned. `uae-sbr-cliff` carries
the AED 3,000,000 threshold and the 31 December 2026 expiry from PwC, which is
a sound tier 2 source, but the entire guide turns on one date and one figure
from one secondary source. Both `mof.gov.ae` and `tax.gov.ae` time out from
here, twice each. Recorded as `uae-gov-unreachable`. Needs the FTA decision
itself or a second independent source.

**SECP fees itemised, name reservation, Form A and Form 29, trademark search,
trademark renewal.** Decided against, and this is the scope correction recorded
in the section above: each is already answered inside its hub. Writing them
separately would produce two pages satisfying one searcher.

**A dedicated s.153 IT withholding guide.** Decided against for the same
reason. The 4 percent versus 15 percent tension, the prescribed-person
threshold and the gaps in the s.2(30AD) and s.2(30AE) definitions are all
already published in the freelancer guide, including as an open question.

### What the agents changed about guides already written

Three research agents ran against the two flagship cross-border guides, and
both grew from ten and nine sections to fourteen. The additions worth noting:

- **Companies Act s.452**, a thirty-day personal reporting duty on a Pakistani
  citizen who is a substantial shareholder or officer of a Pakistani company
  and holds shares in a foreign one. Its Explanation is drafted to catch a
  foreign entity with no Pakistan nexus at all, and s.452(8) sends the register
  to FBR. Entirely absent from our guides before this pass.
- **s.101(2)**, which stops us conflating "foreign asset" with "foreign
  income": profit from a business carried on in Pakistan is Pakistan-source
  even where the vehicle is foreign.
- **s.103(1) requires foreign tax PAID**, which is why "the treaty prevents
  double taxation" is a non-answer for a lawfully zero-taxed LLC.
- **FinCEN's final rule of 11 August 2026** removes BOI reporting for US-formed
  entities, superseding the March 2025 interim rule that most published content
  still describes. A vintage trap of exactly the kind METHOD.md is about.

### Two claims deliberately not made

- **The s.109A(4) rate.** Division III has limbs at 15 and 25 percent and
  nothing read resolves which applies to attributed CFC income. No rate stated.
- **"Offshore earnings put it outside SBP."** Chapter 20 Para 3 attaches
  legality to the acquisition; FERA s.5(2)(b) carves out payments from services
  income. Published as arguable both ways, which is more than the flat
  assertions in circulation manage.

### Three fetch failures, one lesson

`wyo.gov`, `mof.gov.ae` and `tax.gov.ae` all time out at the transport layer.
That is a different failure from the 403s in METHOD.md section 3: there is no
response for headers to get past, so the retry advice does not apply. Where the
Wyoming figures are used, the guide tells the reader they come from the state's
own PDFs read at one remove from archive captures.

Separately, two fetches returned **HTTP 200 carrying the wrong document**: WIPO
Lex record 17010 serves Serbian design law, and an FBR URL serves "The
Requested Page does not Exist" with a 200. A third instance turned up in the
store itself, where two SBP records cited a URL that now redirects and whose
saved file was site chrome. The claims were right and were not reproducible
from the saved evidence, which is the thing the store exists to prevent.
**Grep every fetch for a term the document must contain.**

---

## Schedule: two a day from 10 September 2026

All 22 guides were rescheduled from one a day to **two a day, four hours
apart**, running 10 to 20 September. Slots are 03:00 and 07:00 UTC, which is
08:00 and 12:00 in Pakistan. Publication order is unchanged.

This required `publishedAt` to become a full UTC timestamp rather than a date,
the gate in `content/guides/index.ts` to compare instants, and
`.github/workflows/publish-guides.yml` to run at both slots rather than once.
A single morning run would publish both of a day's guides at once and the
four-hour gap would be fiction.

**One bug found in the process, worth knowing about.** Comparing ISO strings
looks correct and is not. `publishedAt` is written `2026-09-10T03:00:00Z` while
`toISOString()` returns `2026-09-10T03:00:00.000Z`. Same instant, and they do
not compare equal as strings, because `Z` sorts after `.`. Every guide would
have stayed hidden for the whole of its own slot and appeared four hours late,
which would have read as a scheduling mistake rather than a comparison one. It
surfaced only from testing the exact slot boundary; times in the middle of a
slot behaved correctly throughout. Both the gate and `scripts/guides-due.ts`
now parse to instants before comparing.

## Blocked, and therefore skipped

Per METHOD.md section 7, a guide whose central evidence is missing is skipped
rather than stalled on, and the reason is recorded so nobody rediscovers it.

**UAE Small Business Relief.** Blocked. The guide turns entirely on one date
(31 December 2026) and one threshold (AED 3,000,000), both from a single tier 2
source. `mof.gov.ae` and `tax.gov.ae` each time out at the transport layer,
twice. Recorded as `uae-gov-unreachable`. Needs the Federal Tax Authority's own
decision, or a second independent source for both figures. There is no honest
short version of this page, so it waits rather than shipping hedged.

Nothing else in the current slate is blocked. Nineteen findings remain contested
or unverified, but each is a gap *inside* a guide rather than a gap that is the
guide, and those are published as open questions.

## Four stale open items closed

These were still marked contested or unverified after later work had resolved
them, which inflated the open-items count and would have sent the next session
looking for answers already on disk:

| Was | Now resolved by |
| --- | --- |
| `s236c2-minimum-tax-flip` | `s236c2-minimum-tax-verified`, read from statute |
| `stripe-ein-lag` | `stripe-ein-lag-verified`, and the original 2-3 week figure is wrong |
| `s111-4-cap-history-per-fbr` | `s111-4-cap-history-resolved`; FBR was right and we misread a nested footnote |
| `arrival-departure-days-count-secondary` | `rule14-day-counting-verbatim`, which upgrades it from practitioner statement to law |

Live open items: 19.

---

## Research for guides 23 to 32 (10 September 2026)

Selected from the demand analysis in `DEMAND.md` rather than by extending the
original `POSTS.md` plan, which the scope correction above showed had already
been absorbed by the shipped hubs.

### The slate

| # | Guide | Cluster | Basis | State |
| --- | --- | --- | --- | --- |
| 23 | Rental income: what the tenant withholds and what you still owe | property | `s155-*`, `s16-*`, `s15a-*` | Ready |
| 24 | Provincial property tax, and how it differs from 236C and 236K | property | agent | Pending |
| 25 | Tax on a car: registration, transfer and the five-year cutoff | filer | `s231b-*` | Ready |
| 26 | Tax on a pension | salary | `pension-*`, `s12-2a-*` | Ready, `lib/tax/pension.ts` added |
| 27 | Paying FBR: the PSID, the challan and the CPR | filing | agent | Pending |
| 28 | Getting back into IRIS | filing | agent | Pending |
| 29 | When FBR amends your assessment | filing | `s122-*` | Ready |
| 30 | Advance tax under section 147 | filing | agent, plus s.147 | Pending |
| 31 | Deductions a landlord can actually claim | property | `s15a-*` | Ready |
| 32 | Reserved | | | Held for whichever agent finding is strongest |

Four are writable from the consolidation already on disk. Four wait on the two
commissioned agents. One is blocked on our own code, below. One slot is held
deliberately rather than filled with something thin.

### What the Ordinance gave up this pass

**Pension is the find of the batch.** The general exemption is gone: the Finance
Act 2025 omitted Second Schedule clause (8), which exempted pension from a
former employer, and the armed-forces limb of clause (9) with it. What replaced
it in s.12(2A) is much gentler than "pension is now taxable" implies, and the
guide has to lead with that rather than with alarm: nil up to Rs 10 million,
5 per cent on the excess, final tax, and nil at any figure once the individual
has attained seventy. The sting is s.12(2A)(ii), where continuing to work for the
former employer or an associate throws the whole pension onto the ordinary
salary slabs.

**Rental income has four uncovered points.** A boutique, beauty parlour,
hospital, clinic or maternity home is a prescribed person by virtue of what it
is, with no threshold, while an individual only becomes one at Rs 1.5 million of
gross rent. Rent withholding stopped being a final tax in 2010 and pages still
describe it as a discharge. A 2021 Explanation closes the argument that rent
taxed as business income escapes s.155. And a non-adjustable deposit is taxable
rent spread over ten years which also sits inside the withholding base.

**Vehicles** gave the five-year transfer cutoff, the anti-flipping rule in
s.231B(2A), and s.231B(4), which is the provision a reader needs when asked to
pay a second time on the same car.

**Assessments** gave a limitation period that competitors flatten: five years
from the end of the FINANCIAL YEAR in which the order issued, not from filing.

### Guide 26 was blocked on our own code, and has been unblocked

The s.12(2A) pension regime was not modelled in `lib/tax/` at all. What existed
was `RELIEF.pensionIncomeRate`, which caps the s.63 pension CONTRIBUTION credit
and is a different provision entirely.

Under the no-figures rule that blocked the guide, because a rate typed into
prose is a second source of truth no check can see. That is a different kind of
blocker from the UAE guide: that one has no publishable source, this one had a
perfectly good source and a house rule in the way, and the fix was ours.

**`lib/tax/pension.ts` now models it**, with seven assertions in
`scripts/check-tax.ts`. The module deliberately does NOT compute the
s.12(2A)(ii) case where the pensioner still works for the former employer,
because that routes to the ordinary salary slabs and duplicating that
computation would create exactly the second source of truth the codebase exists
to avoid. It reports the fact and the caller routes.

The assertions were checked by sabotage rather than by trusting a green run:
moving the threshold to Rs 5 million and the age to 75 each failed two
independent checks. Boundary cases are covered explicitly, since the proviso
charges only the amount EXCEEDING ten million and a reader at exactly the
threshold owes nothing.
