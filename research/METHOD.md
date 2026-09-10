# How to research for this site

Written after fifteen guides and 155 findings, from what actually went wrong
rather than from how research is supposed to work. Read this before
commissioning an agent or verifying a claim.

The single sentence version: **the errors that survive are the ones that look
correctly sourced**, so most of the work is deciding which of two plausible
government documents to believe.

---

## 1. The failure mode that produced the most errors

**A document from the right source can still be the wrong document.**

Every serious error in this project came from a source that was genuinely
official. Not one came from a source anybody would have flagged as dubious.

| Trap | What it looks like | What it is |
| --- | --- | --- |
| Stale consolidation | "Income Tax Ordinance 2001, amended up to 20.02.2026" | Predates the Finance Act 2026. Prints repealed law with total confidence. |
| Bill-stage summary | FBR's own Salient Features, live on fbr.gov.pk | Written against the Bill. States s.236K at 1.5% where the Act says 1.25%. |
| Stale government page | invest.gov.pk on SECP fees | About a third of the real figures. |
| Self-contradicting page | FBR's ATL page vs FBR's own press release | One says weekly, one says daily. The press release is right. |
| Internally inconsistent article | Business Recorder on SECP fees | States "manual costs double or more", then reverses the labels in one sentence. |

### The rule that follows

Before citing any consolidated statute, **read the "amended up to" date on the
cover and compare it with the last Finance Act**. If the Act is later, the
document is describing a world that no longer exists.

And do not assume the newest edition is the one your search returned. FBR was
serving three consolidations in September 2026: two stale, one current. The
current one, amended to 30 June 2026, was three pages deep in results.

### The nested-footnote trap, which caught us

A consolidation's footnote often reproduces the text an amendment replaced.
**Text quoted inside a footnote is the OLD version**, and it carries its own
nested footnotes recording how it got that way.

We read a footnote saying "sub-section (4) substituted by the Finance Act 2021"
and attributed everything in the reproduced text to that Act, concluding that
the Rs 5 million cap in s.111(4) was created in 2021 and that the shield had
been unlimited from 2004 until then. The reproduced text already contained the
five million figure, with its own nested footnotes. The real history is no cap
until 2018, Rs 10 million by the Finance Act 2018, Rs 5 million by the Finance
Act 2019, restructured without change in 2021. A guide had already published
the wrong version and had to be corrected.

The rule: before attributing any wording to a substituting Act, check whether
the wording appears in the text being quoted as replaced, and read the nested
footnotes. Recorded as `s111-4-cap-was-added-CORRECTED`.

### The corollary that saved a guide

When two sources conflict, **check whether one of them contradicts itself**.
A second agent claimed our SECP fee was backwards. Reading the source article's
*other* figures settled it: its general rule and its guarantee-company numbers
both agreed with us, and only the one sentence disagreed. The article was
internally inconsistent, and the published guide was right.

---

## 2. Where to look, in order

The order matters because each step can invalidate the one before it.

1. **The enacted Finance Act gazette.** Definitive. Often 40MB+ and beyond an
   agent's fetch limit, which is why agents miss it. `curl` it with a browser
   user-agent and run `pdftotext -layout`. This closed four flags in one pass.
2. **The regulator's explanatory circular.** FBR Circular No. 02 of 2026-27 is
   the best single account of what an Act changed. Its listing page is a
   JavaScript form, but the homepage exposes a download handler.
3. **A consolidation dated after the Act.** Check the cover date first.
4. **A Big Four brief.** KPMG's Finance Act summary is reliable and readable,
   and it flags Bill-versus-Act divergences, which is exactly the trap in §1.
5. **The regulator's own web pages.** Useful, and demonstrably capable of
   contradicting the regulator's own press releases.
6. **Everything else.** Corroboration at best, never a source.

---

## 3. Fetching: what works when the obvious thing fails

Recorded in full in `DEAD-ENDS.md`. The short version:

- **403 is often not a block.** `kpra.gov.pk` returned 403 to an agent and was
  flagged as the project's biggest gap for days. A browser user-agent plus a
  same-site `Referer` downloaded it first time. **Always retry with headers
  before recording a blocker.**
- **`scrapling`'s `StealthyFetcher`** gets past TLS failures and 403s that
  defeat plain requests. It renders HTML, so `get_all_text()` returns empty for
  a PDF: download the bytes and use `pdftotext`.
- **JavaScript download managers** (SECP) serve the page template at the
  download URL. No header trick helps. Get the file another way or manually.
- **Scanned PDFs** have no text layer. `pdftotext` returns nothing and the
  document has to be read as images.
- **Google rate-limits SERP scraping** after roughly 100 to 140 queries from
  one IP, then serves a 6KB shell that reads as "no results". Cap a session at
  70 and space requests.

---

## 4. Picking what to write about

The scoring function that has held up:

    score = log10(queries + 1) x (1 + SERP weakness)

Demand log-damped so a large cluster does not swamp a winnable one, multiplied
by how beatable page one actually looks. `weakness` counts how much of the top
ten is user-generated content, video and government pages rather than
established commercial competitors.

**Read the weakness score, not just the number.** A 4.0 sounds abstract until
you look at what drove it: Facebook ranking on page one for "pakistan salary
tax slabs". When SlideShare, Scribd, YouTube or a LinkedIn post ranks for a
commercial query, nobody has written the authoritative page.

Two refinements learned the hard way:

- **Strip noise before counting.** RAG looked like 508 queries and was 57 after
  removing "rag and bone", "rag doll" and "rag quilt". Raw counts flatter a
  topic until you read them.
- **A government portal ranking first is an opportunity, not a wall.** It
  satisfies the navigational intent and answers nothing. Somebody searching
  "ntn registration requirements" wants a document list and gets a login form.

---

## 5. Commissioning an agent

What produced the best briefs:

- **Give it what is already verified**, with instructions to flag
  contradictions rather than re-research. Two agents found real contradictions
  in facts I had handed them as settled, and both were worth having.
- **Name the traps.** Telling an agent that consolidations predate the Act, and
  that Salient Features was written against the Bill, changed what it went
  looking for.
- **Ask for verified and unverified separately**, and insist that anything
  unverifiable is said so rather than smoothed over.
- **Ask what competitors get wrong.** This produced more usable content than
  any other instruction, because a checkable correction is the one thing a
  firm citing primary law can do that a content mill cannot.

Expect an agent to score itself honestly. One returned 68/100 and named its own
remediation list; that brief was more useful than a confident one would have
been.

---

## 6. The status gate

Nothing reaches a guide without a status in `findings.jsonl`.

    verified     fetched from a primary source and read. Safe to publish.
    contested    sources disagree. Publish the disagreement, not a number.
    unverified   found, but only in secondary restatements. Not safe as fact.
    rejected     traced and found wrong. Recorded so it cannot resurface.

**The rejected records are the most reusable thing in the store.** Twelve of
them, and several are figures that look impeccably sourced:

- A "63% of enterprises (Forrester 2024)" statistic with no Forrester source.
- Offshore rate tables where ten corroborating URLs were ten competitors.
- A PKR 12.5m sales tax threshold that exists in no provision.
- **FBR's own Salient Features figure for s.236K**, which is the sharpest
  example: published by the regulator, and wrong.

When you reject something, write *why* in the note. "Not found" is useless in
six months; "traced to a vendor blog, no Forrester source exists" is not.

---

## 7. Publishing an open question

Several guides state that something could not be established. That is a
feature, and it is what a firm can do that a content mill cannot.

The form that works: name the provision, say what it would mean, say what could
not be confirmed and why, and tell the reader what to do instead.

Worked examples in the live guides:

- **SECP fee escalator.** The clause is real and would raise fees 10% from
  21 April 2026. No confirming SRO found. The guide states the clause, says
  the position is unconfirmed, and tells the reader to check the challan.
- **s.114C purchase restrictions.** Widely reported as current law. They
  commence on a Gazette notification nobody can trace.
- **KP entry 19(g).** The Act points individual software freelancers at a
  reduced rate whose figure is not stated for their category. The guide says
  exactly that and tells the reader to ask KPRA.

The test: would a reader be better served by a confident number that might be
wrong, or by knowing precisely what is uncertain? On tax content the answer is
always the second.

---

## 8. Writing from the store

- **Interpolate, do not retype.** Where `lib/tax/` holds a figure, render from
  it. The salary guide's slab table comes from the same array the calculator
  computes with, so the two cannot drift and the next Finance Act moves both or
  fails the build.
- **Lead with the correction.** Every guide that works opens with something
  checkable that the field gets wrong. That is the differentiator, and it is
  also the most useful thing for the reader.
- **Name the section.** "Section 236C" beats "the seller's advance tax",
  because it lets a reader verify you.
- **Cross-check your own code.** Twice, the codebase already held the answer an
  agent was chasing: the s.4AB surcharge history and the TY2027 slab table.
  `grep lib/tax/` before commissioning research on a rate.

---

## 9. What is still missing

**Searching the wrong instrument.** The Ordinance is not the only source of
Pakistani income tax law, and twice this cost us. We searched the whole
Ordinance for a day-counting rule for s.82, found nothing, and were ready to
publish "the statute is silent" as an open question. It is rule 14 of the
**Income Tax Rules 2002**, which applies expressly for the purposes of s.82 and
sets out part-days, arrival, departure, leave, strikes and transit in detail.
Before publishing any negative finding about tax law, search the Rules as well
as the Ordinance, and the SROs as well as the Rules.

**No keyword volume data.** Every ordering rests on inference from SERP
composition plus autocomplete prominence. Google Keyword Planner with geo set
to Pakistan is free and would replace inference with measurement; the lists are
prepared at `keywords/planner-pakistan.txt`.

**Reddit was blocked for every agent.** The practitioner discourse that would
supply real query phrasing is absent. The n8n community forum substituted well
for the AI cluster; nothing substituted for the others.

**Verification tools deferred.** 208 harvested queries want to look something
up rather than compute something, and the four highest-prominence tool queries
are all "...registration check". See `verification-tools-deferred`.
