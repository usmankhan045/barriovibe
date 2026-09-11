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

### The same trap in its other form: a footnote names the word REPLACED

FBR's consolidations write an amendment as, for example, `5[ ] 6[person]` with
footnote 6 reading *"The word 'company' substituted by the Finance Act, 2021"*.

Read quickly, that looks like the Finance Act 2021 put **company** into the
text. It means the opposite: **the quoted word is the one that was replaced**,
so company came out and person went in.

This nearly inverted a guide. s.15A allows a landlord to deduct provincial
property tax against rental income, and reading the marker order the wrong way
made every s.15A deduction available only to companies, which would have made
the deduction useless to exactly the reader the guide is for. The tell is that
the footnote numbering runs in source order, not in chronological order of what
the text now says.

**Do not infer from marker position. Read the footnote text, and confirm
against a section nearby that uses the same word without amendment**, in this
case s.15(1) charging "a person". Recorded as `s15a-person-not-company`.

### And the convention is not the same across statutes

The rule above holds for the Income Tax Ordinance consolidation. It does **not**
hold for the Sales Tax Act consolidation, which uses the opposite convention.

At s.33 Table entry 1, footnote 484 reads *"the word 'fifty' Substituted through
Finance Act, 2026"*, the live text reads `[fifty] thousand rupees`, and the
Finance Act 2026 gazette says *"for the word ten, the word fifty shall be
substituted"*. Here the footnote names the word that went **in**.

So the safe procedure, which supersedes the rule above rather than adding to it:

1. **Read the live text inside the bracket.** That is the operative word,
   whatever the footnote says about it.
2. **Where the figure is load-bearing, confirm against the enacting Finance Act
   gazette.** The gazette states the substitution unambiguously in both
   directions and settles it in one grep.

Recorded as `sta-footnote-convention-inconsistent`. Both consolidations were
checked against the gazette; they genuinely differ, and this is not one
misprinted footnote.

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
- **A negative grep on a PDF extraction is not evidence of absence.** Layout
  breaks phrases at arbitrary points, so "the 25th day of September" can exist
  in the document and match nothing. This produced a wrong finding: searching
  for the phrase returned nothing, and the conclusion drawn was that s.147 had
  no separate company timetable, when s.147(5A) sets one out in full. **Search
  the rarest single token, then read the surrounding block.**
- **A 200 is not a hit, and this is the most frequent trap of all.** Five
  distinct instances in one session: WIPO Lex serving Serbian design law, an FBR
  page serving "The Requested Page does not Exist" with a 200, an SBP URL
  serving site chrome, KPMG serving HTML from a `.pdf` path, and
  `iris.fbr.gov.pk` serving its Angular shell for routes that do not exist.
  **Grep every fetch for a term the document must contain and treat its absence
  as a failed fetch, whatever the status code.** For a PDF, checking the file
  begins with `%PDF` costs nothing.
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

### Require provenance, and spot-check the load-bearing claim

**Insist on `source_id` and a saved file in `raw/`, not just a URL.** One agent
returned 23 findings on provincial property tax, all labelled tier 1, all
carrying URLs, and none with a file on disk. Nothing was reproducible.

Four of them cited a URL as a current consolidation "whose footnotes cite the
Punjab Finance Act 2026". Downloading it showed no year later than 2013, no
Schedule at all, and a levy section still printing the repealed ten-per-cent
annual-value charge: the exact regime the guide was meant to be correcting.

The substance turned out to be right, confirmed later from the enacting Finance
Act itself. That is the uncomfortable part. A brief can be correct in every
particular and still cite a document that contradicts it, and the tier-1 label
is the agent's own assessment rather than an audit.

So: **download the one source the guide's lead depends on and read it
yourself.** Not all of them, just the claim that would be most embarrassing to
get wrong. It took one fetch here and it caught a page that would have opened
with a schedule attributed to a document saying the opposite.

### Two agents agreeing is not verification

Five SEO agents audited the guides. Two independently reported that
`content/guides/pension.ts` and `securities.ts` were orphaned files, not
imported into `ALL_GUIDES` and therefore dead content.

Both are imported at `content/guides/index.ts` lines 13 and 14, and both guides
are in `ALL_GUIDES`. One check settled it.

The failure mode is worth naming because it is seductive: independent agreement
feels like corroboration, and here it was two agents making the same reasonable
inference from the same partial view. **Agreement raises confidence about
plausibility, not about truth.** If two reports agree on something load-bearing
and neither quotes the line it rests on, that is still one unverified claim
rather than two.

### An agent's brief can be wrong, and a good agent will say so

Going into the non-profit research I told an agent that s.100C had probably been
cut from a hundred per cent credit and to establish what replaced it. It came
back with the live text: still a hundred per cent, untouched by the Finance Act
2026. What had actually changed was the Finance Act 2025 merging two tables in
clause (66), so entities with a former straight exemption must now meet the
s.100C conditions. A narrowing of eligibility, not a cut in the rate.

Had the brief been phrased as an instruction rather than a hypothesis, the guide
would have gone out asserting a rate change that did not happen. **Phrase a
premise as a premise, and ask to be corrected.**

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

## 7. A blocked guide is skipped, not stalled

**If the evidence for a guide is genuinely missing, leave it and write the next
one.** Waiting on a source that will not load stops the whole queue for one
page, and there is always another guide whose sources are already on disk.

The distinction that matters is between a gap *inside* a guide and a gap that
*is* the guide:

- **A gap inside a guide is not a blocker.** Publish the open question. Section
  8 below is about exactly this, and those sections are among the most useful
  things on the site.
- **A gap that is the guide is a blocker.** The UAE Small Business Relief
  countdown turns entirely on one date and one threshold. Both come from a
  single tier 2 source, and both `mof.gov.ae` and `tax.gov.ae` time out from
  here. There is no honest version of that page, so it waits.

When you skip one, record why in `GUIDE-RESEARCH.md` under a heading that says
whether it is **blocked** or **decided against**. Those are different states and
the next session should not have to work out which.

Two rules follow from this. Never write a thin version of a blocked guide to
fill the slot: a page that hedges its central claim is worse than no page.
And never let a blocker sit unrecorded, because an unrecorded blocker is
rediscovered from scratch every time somebody plans the next batch.

---

## 8. Publishing an open question

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

## 9. Writing from the store

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

## 10. What is still missing

**Check the vintage of the RULES, not only of the Act.** The "amended up to"
discipline in section 1 applies to subordinate legislation just as hard, and it
is easier to forget because the Act is the document you were thinking about.

A finding was recorded as contested on the strength of a Rules consolidation
amended to 10 February 2017, which was three stages out of date: rule 44 said
monthly, SRO 849(I)/2019 made it biannual, and the Finance Act 2020 made the
statute quarterly. FBR publishes a 24 November 2023 consolidation that would
have shown the middle stage immediately. The conflict was not a conflict, it was
a stale file.

Two useful by-products of that episode. FBR leaves subordinate legislation
unconformed for years, so a Rule contradicting its parent Act is normal rather
than a puzzle, and the resolution is that a rule made under s.237 cannot survive
against a later express provision. And where a regulator has changed something,
**look for its own circular at the point of change**: Circular No. 3 of 2020
states the biannual-to-quarterly move in one sentence and settles what two
consolidations could not.

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

---

## Demand is not evidence, and the harvest does not distinguish them

The query harvest is 7,496 real queries and it is good at what it does: it shows
what people ask and roughly how prominently. It says nothing about whether the
question can be answered from a source you can cite.

On the Pakistani tax side those two ran together, because the Ordinance answers
almost anything you can ask about it. On the AI and development side they came
apart completely: 5,263 harvested queries sat behind **five findings**, two of
them unusable. The plan drawn from the harvest listed 47 blog posts; the store
supported two.

So for any cluster not backed by a statute, **fetch the sources before
scheduling the piece, not after choosing it**. The fetch is what decides whether
the post exists, and discovering that after the slot is assigned means either a
gap in the schedule or a post written to fill one.

## When the primary document is gone, look harder before dropping the post

**This section has been corrected, and the correction is the lesson.**

The "95% of AI pilots fail" piece was researched and dropped. The report's own
URL redirects to a group overview page, and the Wayback capture of the PDF is
blocked by robots policy. The document could not be read, so the post was not
written, on the principle that a document you cannot read is not a source
however well known its contents are.

That principle stands. The conclusion drawn from it was wrong, because the
document was retrievable after all: mirrors of the PDF exist on third-party
sites, and one served the complete 26-page original. It was verified by page
count, byte size, and locating both occurrences of "95%" plus the methodology
page and the conclusion.

Reading it changed the post from impossible to the strongest in the catalogue.
The report says 95% of ORGANIZATIONS get zero return, not that 95% of pilots
fail, and its own funnel implies roughly a quarter of actual pilots reached
production. Two lines after its "95% failure rate" sentence it reports generic
chatbots at "high pilot-to-implementation rates (~83%)".

**So the rule has two halves, and the second was missing.** A document you
cannot read is not a source. But "the canonical URL is dead" is not the same as
"the document is gone", and a widely circulated report has usually been mirrored
by someone. Search for the filename rather than the title, check consultancy and
vendor uploads, and verify any mirror by size and page count before quoting it.

That a market-moving statistic survives only on a cloud consultancy's uploads
folder is itself worth publishing.

## Correct a brief that is wrong, including ours

Two of the premises handed to research agents for the blog posts were wrong, and
both were caught by the agent reading the live source rather than accepting the
brief.

- Make was briefed as billing in "operations". It renamed that unit to credits,
  and a 2026 post using the old term would have read as stale in exactly the way
  the post set out to criticise.
- An earlier brief asserted that section 100C had been cut. It had not.

Phrase a premise as a premise, never as an instruction, and say plainly that
contradicting it is a useful result. An agent told "verify that X" will tend to
find X; an agent told "establish whether X, and I may be wrong" will tell you
when you are.

## The brief is the least reliable document in the room

Across two batches of blog research, **every single topic came back with a
correction to the premise I handed the agent.** Not to the sources: to the
brief.

- Make bills in credits, not operations. It renamed the unit.
- WhatsApp has three template categories, not four. Service is not a category.
- Google Play's testing gate is 12 testers, not 20. It was reduced.
- BOI reporting rests on a final rule of August 2026, not the March 2025 interim
  rule I cited.
- Section 100C had not been cut, contrary to what I told an earlier agent.

The pattern is that a brief is written from memory, and memory is a stale cache
with no invalidation. The source is current by definition; the brief never is.

So write the premise as a premise, and say explicitly that contradicting it is a
useful result. "Verify that X" produces agents that find X. "Establish whether
X, and note that I may be out of date" produces agents that tell you when you
are, which is the entire value of commissioning the work.

Where a brief carries a figure, mark it as the thing to check rather than the
thing to build on. The five corrections above would each have shipped as a
confident wrong sentence.

---

## Tracing a statistic is often the whole story

Several catalogue posts exist because a number everyone repeats does not survive
being traced. The pattern recurs often enough to be a method rather than a
series of accidents.

**The shape is always the same.** A consultancy or vendor publishes an estimate
with no methodology. A trade article repeats it. A peer-reviewed paper cites the
trade article. Now the number has a journal citation, and anyone checking the
citation finds a real paper rather than the brochure underneath it.

Two worked examples from this project:

- **"30-50% of RPA projects fail"** traces to a 2016 EY marketing brochure whose
  stated basis is "our practical experience", with no sample and no definition of
  failure. It reached a Springer paper by 2022. Peer review relocated the number
  rather than validating it.
- **"13% of government software projects succeed"** looks impeccably sourced
  because it sits inside an official US government guide. It traces back to the
  Standish CHAOS report, which two peer-reviewed papers demolish: one shows a
  mirror-image bias flipping a company from 6% to 94% success, and Standish's own
  chairman called the data "Standish opinion", a disclaimer never printed in the
  reports themselves.

**How to run the trace.** Follow every citation back one more hop than feels
necessary, and stop only at a document that states its own sample and method. If
the chain ends at a page that says "based on our experience", the number is an
impression with a citation attached.

**When the trace ends nowhere, that is publishable.** The strongest version of
this is the finding that a systematic review of 63 RPA papers states in print
that "the literature covers only successful RPA projects". No failure rate can
be produced from a literature that does not study failures, which retires every
such statistic at once rather than one at a time.

## An agent writing to the store can collide with you

Two research agents wrote records to `findings.jsonl` under ids that already
existed, because both were running while the main session was also appending.
The duplicates were invisible until `query.py` grouped on id.

The fix applied was to merge, keeping the better-evidenced record and preserving
the other's claim inside the note, so nothing was lost. The lesson for future
parallel work: **run the duplicate check after any session where agents wrote to
the store**, not only after your own writes.

    python3 -c "import json;from collections import Counter;\
    r=[json.loads(l) for l in open('research/findings.jsonl') if l.strip()];\
    print([k for k,v in Counter(x['id'] for x in r).items() if v>1])"

## Rich evidence is not a reason to write

The catalogue refused four splits that the evidence would easily have supported:
app store rules, US entity obligations, checkout and local search. Each has
between eight and thirteen verified findings behind it, and each returns almost
nothing in the harvest.

This is worth naming because the pull is strong in the opposite direction. Once
the research exists, it feels wasteful not to use all of it, and a catalogue
that uses all of it looks more impressive. It would also produce pages nobody
searches for, which is the definition of work that cannot pay off.

**Evidence decides whether a post can be written. Demand decides whether it
should be.** Both gates, every time.
