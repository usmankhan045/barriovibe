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
