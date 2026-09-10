# Open verification items

Facts that block specific articles. Each names what to fetch and what it gates.
Close one, update `findings.jsonl`, and the article it blocks becomes writable.

Run `python3 research/query.py contested` and `... unverified` for the current
machine-readable state; this file adds the how and the why.

---

## 1. The 80% banking-channel condition

**Status**: contested (`80pc-banking-omitted`)
**Blocks**: article #6, Getting Paid from Abroad

In the Ordinance as amended to 31 July 2025, the "80% of export proceeds
remitted through normal banking channels" condition appears **only inside a
clause omitted by the Finance Act 2022** (the former Second Schedule Part I
clause 133, which ran to 30 June 2025). Research briefs and consultant blogs
treat it as a live s.154A condition.

**To resolve**: read s.154A(2) and its provisos in full, plus any SBP or PSEB
certification requirement that imposes a banking-channel test independently of
the Ordinance. The likeliest answer is that the condition now lives in PSEB's
certification criteria rather than in tax law, which would make it real but
differently sourced. `research/raw/it-ordinance.txt` is already downloaded.

---

## 2. E-commerce withholding rates

**Status**: contested (`ecommerce-tax-not-cancelled`)
**Blocks**: article #36, No, Pakistan's E-Commerce Tax Was Not Cancelled

The structural claim is sound and valuable: the Digital Presence Proceeds Tax on
**foreign** providers was suspended by SRO 1366(I)/2025 effective 1 July 2025,
while **domestic** e-commerce obligations were not. Most coverage conflates the
two, which is exactly what makes the correction piece worth writing.

The numbers are the problem. The 1% on digital and bank payments and 2% on cash
on delivery come from instruments at different stages: Finance Bill proposal,
enacted Act, and suspending SRO. One vatcalc source returned 403.

**To resolve**: read the enacted Finance Act 2025 text for the e-commerce
withholding provisions, and SRO 1366(I)/2025 directly, at
`https://download1.fbr.gov.pk/SROs/20257302072529390SRO1366(I)2025.pdf`.
Confirm what each instrument did and what is in force today.

---

## 3. Stripe and EIN timing

**Status**: unverified (`stripe-ein-lag`)
**Blocks**: nothing outright; weakens the US-LLC service content

The claim is that Stripe rejects newly issued EINs because IRS records lag
roughly two to three weeks, and that foreign-routed applications fail at higher
rates. Sourced only to a commercial guide.

**To resolve**: Stripe's own documentation on business verification, and IRS
guidance on EIN record availability. Do not publish a specific waiting period
without one of those.

---

## 4. Pakistan's Personal Data Protection Act status

**Status**: contested (`pk-pdpa-status-unresolved`)
**Blocks**: article #15, the GDPR pack, in part

Sources genuinely conflict on whether Pakistan has an enacted personal data
protection statute as of 2026. Legal500 and Chambers suggest no enacted law;
other sources refer to a PDPA 2025 as the first full statute. PECA 2016 (amended
January 2025) applies in the interim.

**To resolve**: the Ministry of IT and Telecom's legislation page, and the
National Assembly's passed-bills record. This matters because the GDPR pack
should state Pakistan's domestic position accurately, not merely the EU side.

Article #15 can be written on the EU side alone (`pk-no-gdpr-adequacy` is
verified) with the domestic position left out until resolved.

---

## 5. The 120-day AGM rule

**Status**: partially verified (`secp-annual-filing-chain`)
**Blocks**: precision in article #11, SECP Annual Filing

SECP's annual-returns page confirms the Form A/B and Form 29 deadlines and the
exemptions, all now recorded. It does **not** state the 120-day AGM rule that
the research reported.

**To resolve**: Companies Act 2017 s.132 for the AGM timing. The article can be
written now on the verified filing deadlines; only the AGM anchor date needs
this.

---

## 6. Daraz fee schedule

**Status**: not recorded as a finding; flagged in `DEMAND.md`
**Blocks**: article #34, Daraz vs Your Own Store

Component fees (category commission roughly 5-20%, 2.25% payment fee, Free
Shipping Max around 6%, provincial VAT of 13-16% charged on the commission) come
from tier-4 seller-tool blogs and vary by category.

**To resolve**: a live Daraz seller dashboard, which is the only authoritative
source for current category rates. This one cannot be closed by fetching a
public page; it needs an account.

---

## The largest missing input, which is not a blocker

**No keyword volume data.** Every priority ordering in `STRATEGY.md` and
`ARTICLES.md` rests on inferred demand. Google Search Console access for
barriovibe.com, or a DataForSEO key, would replace inference with measurement
and could reorder the slate materially. This is the highest-value input the
strategy is missing, and it costs nothing if Search Console is already
connected.

## Open after the residency and remittance research (10 September 2026)

Blockers, and unresolved questions worth publishing as such.

### Publish as open questions

1. **Does the Pakistan-UAE treaty tie-breaker engage for a salaried employee?**
   Article 4(1) defines a resident as a person who "operates an industrial or
   commercial establishment, or is liable to tax therein". A salaried employee
   in a state with no personal income tax may satisfy neither limb, in which
   case Article 4(2) never engages. Unresolved at tier 1 and tier 2. Two
   independent research streams reached this separately. Highest-value open
   question in guide A.

2. **How are days in a third country to be counted for clause 82(d)?**
   Rule 14 counts only days present in Pakistan. Nothing counts days elsewhere,
   and no evidential standard is prescribed.

3. **Is the "or" in clause 82(d) truly disjunctive?** Read literally it makes
   almost every non-resident Pakistani a resident. FBR reproduced the "or"
   without comment in Circular 15 of 2022-23.

4. **What does FBR accept as proof of foreign residency?** Nothing is
   prescribed. Rule 19A runs only in the outbound direction.

5. **Does the s.111(4) Explanation reach every modern channel?** The Finance
   Act 2022 wording covers money service bureaus, exchange companies and money
   transfer operators, and is expressly scoped to "this sub-section". Whether a
   given fintech route qualifies has no FBR guidance behind it.

### Verify before publishing

- **Income Tax Rules vintage.** The negative finding that no rule prescribes the
  s.111(4) encashment certificate rests on consolidations to 2015 and
  24.11.2023, the newest FBR publishes. Re-run before stating it flatly.
- **SRO 1638(I)/2024**, final version of the rule 81B amendment, not retrieved.
  Do not quote rule 81B verbatim.
- **FBR Circular 01 of 2024-25** is a scanned image with no text layer. Recorded
  as unchecked, not as a negative, in the sweep for clause (d) guidance.
- **SBP Annexure V-148**, the e-PRC standard format, not read. Do not publish an
  exact field list for the certificate.
- **Foreign Currency Accounts (Protection) Ordinance 2001** text came from a
  law-site mirror. Confirm against the Pakistan Code PDF before quoting at
  length. Note s.5(1) names the Income Tax Ordinance **1979**.

### Closed by this research

- s.82 unchanged by the Finance Act 2026. The apparent hit was Customs Act s.82.
- s.111(4) unchanged by the Finance Act 2026. Rs 5 million stands.
- Day counting: rule 14 found, after we wrongly concluded the law was silent
  from searching the Ordinance alone.
- The cap history discrepancy between FBR Circular 05 and the Ordinance
  footnotes: resolved in the circular's favour. Rs 10m in 2018, Rs 5m in 2019,
  restructured but unchanged in 2021.
