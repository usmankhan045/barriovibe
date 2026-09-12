# How a post gets built

`POSTS.md` says what to write: **108 pieces, 54 guides, 47 blog posts, 7
downloadable assets**. This says how, and in what order, so the first piece and
the hundredth come out the same shape.

Guides and blog posts are separate tracks with separate models. Most of this
document is about guides, because they ship first and because their constraints
are the tighter ones. The blog post model is noted where it differs.

---

## Where guides live

    /guides/                      hub, lists the nine clusters
    /guides/<cluster>/            cluster hub page
    /guides/<cluster>/<slug>      the spokes

Flat `/guides/<slug>` was considered and rejected. The clusters are the whole
strategy: nesting makes the hub-and-spoke relationship visible in the URL, in
the breadcrumb, and to a crawler, and it means a reader who strips a path
segment lands somewhere useful rather than on a 404.

`/blog/` stays separate and stays empty until there is dated commentary worth
publishing. A guide is updated in place and carries "last reviewed"; a post
carries a publish date and stays where it is. Mixing them costs the guides
their compounding authority, which is the entire reason for the split.

## The content model

Guides are typed data in `content/guides/`, mirroring `content/tools.ts`. Not
MDX, not a CMS. The reason is the same one that governs the calculators: a rate
in prose that was retyped by hand is a second source of truth that no check can
see, and the first Finance Act to move it leaves the guide arguing with the
calculator on the page it links to.

So a guide that states a figure must interpolate it from `lib/tax/`, and
`check:content` should assert that guides contain no bare rate literals. The
constraint is inherited, not new: see the note at the top of `content/tools.ts`.

## Anatomy of a guide

Every guide has the same parts, in the same order, because a reader comparing
two of them should find the same information in the same place both times.

1. **The answer, in the first 60 words.** Not a preamble. Someone who reads one
   paragraph and leaves should have what they came for.
2. **The working.** Where the figure comes from, with its statutory section.
3. **What it does not cover.** Its own section, never small print. The limits of
   an answer are the part a reader most needs and least expects to be told.
4. **FAQ**, drawn from `keywords/QUESTIONS.md` in the searcher's wording, carried
   into FAQPage schema.
5. **Where to go next.** Named siblings in the cluster, not a directory.
6. **One commercial ask**, at the foot, after the reader has been served.

That is the `ToolPage` shape, and it is deliberate: it already works, and a
reader moving between a calculator and a guide should not feel a seam.

## Provenance

Every guide carries the same block the calculators do
(`components/sections/RateProvenance.tsx`): statutory basis, last reviewed date,
reviewer, disclaimer. Read from `content/provenance.ts` so the page and the
schema cannot drift.

Guides are YMYL content. An undated, unsourced page about tax is the profile
that rates worst, however accurate it happens to be.

## Schema

    Article           datePublished from the guide's own publishedAt,
                      dateModified from RATES_REVIEWED, speakable pointing at
                      #guide-answer
    FAQPage           from the guide's own FAQs
    BreadcrumbList    home > guides > cluster > guide
    HowTo             only where the guide has a `steps` section
    organizationRef() so the provider reference resolves on the page

All of it is emitted by `GuidePage.tsx`, so a new guide gets every block
automatically. Nothing here is per-guide work. What follows is the reasoning, so
the next person changing `lib/jsonld.tsx` knows which parts are load-bearing.

### datePublished is the guide's own date, and this was got wrong once

For a while `guideSchema` set both `datePublished` and `dateModified` to
`RATES_REVIEWED`, a single site-wide constant. Every guide therefore claimed it
was published on the day the rates were last reviewed, including guides written
weeks afterwards.

That is worse than a missed optimisation. It is a false statement that a crawler
can check against its own record of when the URL first appeared, on YMYL content
where trust is the whole asset, and it bought nothing in exchange.

The two dates do different jobs and both are real:

    datePublished   the guide's own publishedAt. When this page appeared.
    dateModified    RATES_REVIEWED. When the figures were last reconciled
                    against the statute, which RateProvenance also renders
                    visibly.

`dateModified` is floored at `datePublished`, because a guide published after
the last rate review would otherwise report being modified before it existed.

**The general rule: a date in schema is a claim, so it has to be true.** If you
cannot say what a date means, do not emit it.

### HowTo is for the reader's benefit, not for a rich result

Google retired the HowTo rich result in 2023, so this earns no SERP decoration
and it would be cargo-cult to imply otherwise. It is emitted because an
assistant extracting a procedure gets an ordered, unambiguous list instead of
inferring structure from prose.

Two constraints worth keeping:

- **Sibling, not primary type.** These are reference guides that contain a
  procedure, not procedures with prose attached. `Article` stays the page's
  subject and `HowTo` sits alongside it.
- **No invented fields.** No `totalTime`, `estimatedCost`, `tool` or `supply`.
  The content carries no such data and a fabricated duration for a statutory
  filing is a misleading number wearing the costume of structure.

### speakable is honest, not a lever

It points at `#guide-answer`, which really is the canonical direct answer, so
the claim is true. Its documented consumer is voice read-aloud, not ChatGPT or
Perplexity, and it will not on its own win a citation. It is here because it is
correct and free.

What actually drives extraction is that the answer is the first paragraph and is
self-contained. That is a writing discipline, not a schema one, and no amount of
JSON-LD substitutes for it.

### What was assessed and deliberately not built

Recorded so the next person does not spend a day rediscovering it:

- **`Legislation` schema and structured `citation` objects.** `Legislation`
  describes a page whose subject IS the statute. Our guides are about a
  procedure and cite statute in passing, so using it would misrepresent the
  page. The prose already carries "section 231B(2)" in readable, quotable form,
  and duplicating every citation into JSON-LD doubles the maintenance surface
  for no demonstrated consumer.
- **`Dataset` or table markup for rate tables.** `Dataset` is for downloadable
  research data and its consumer is Google Dataset Search. There is no
  schema.org `Table` type at all. A semantic `<table>` with `<th scope>`, which
  `GuideBlock` already renders, is the correct machine-readable form.
- **`QAPage`.** Models genuine multi-answer user-generated Q&A. Our `answer` is
  authored first-party content, which is the opposite, and a validator would not
  catch the mismatch.

## Integration points

A new route section is not just a template. These six all derive from content
registries and will silently omit guides otherwise. Verified against the
codebase on 9 September 2026:

    app/sitemap.ts          add the guide routes and their lastmod sources.
                            Uses per-route git dates, so name the content files
                            each guide is generated from.
    app/llms.txt/route.ts   enumerates sections from SERVICES and TOOL_GROUPS.
                            Guides need the same treatment or AI crawlers get a
                            site description that omits them.
    content/nav.ts          the header currently carries six items. Adding
                            Guides makes seven. Consider moving Blog to the
                            footer until it has posts: a nav link to an
                            acknowledged empty page is a weak signal.
    components/layout/      footer link groups.
    scripts/check-content.ts  extend to validate the guide registry the way it
                            validates services: required fields, resolvable
                            cross-links, slug format.
    app/robots.ts           AI search crawlers are named explicitly, including
                            Google-Extended, which is what controls whether
                            Gemini and AI Overviews may quote the site. They
                            were already allowed by the wildcard; naming them
                            makes the choice reviewable rather than accidental.
                            Training-only crawlers are blocked, because there is
                            no citation and no referral in it for us.
    publish-guides.yml      pings IndexNow after the deploy hook succeeds, with
                            the changed paths from guides-due.ts. See below.

### The doorbell nobody pressed

`scripts/indexnow.ts` existed, worked, and was called by nothing for weeks.
Every scheduled guide waited on an organic recrawl of the sitemap while a
working push mechanism sat one line away from the publishing pipeline.

Two things worth carrying forward from that:

- **A script that is not wired into a pipeline does not exist.** The file even
  said "once this is wired into a deploy" in its own header, and nobody read it
  as a TODO.
- **Where it sits in the sequence matters.** The ping runs AFTER the Vercel hook
  succeeds, because submitting a URL that has not been built yet invites a crawl
  of a 404. It is also `continue-on-error`, since a guide that went live
  unannounced is a smaller problem than a red workflow, and the sitemap still
  covers it.

## Posts are not guides, and the difference is enforced

The blog shipped on 11 September 2026. Posts reuse most of the guide machinery
and differ in three places, each for a reason worth keeping.

### The test for which one you are writing

A guide is reference content, updated in place, carrying a review date because
it is not news. A post is an argument with a shelf life.

The practical test: **if the right response to the facts changing is to REWRITE
the page, it is a guide. If the right response is to write a new piece and leave
this one standing as a record of what was true then, it is a post.**

"Income Tax Slabs 2026-27" is a guide, because next year's slabs replace this
year's at the same URL and keep the links it earned. "You probably do not need
an agent" is a post, because it is a position held on a date.

### What posts inherit

The section union, the renderer, the date gate, the publishing workflow, the
IndexNow ping and the FAQ and HowTo schema. `GuideSection` was NOT duplicated
into a post-shaped copy: the renderer moved to
`components/sections/ContentBlock.tsx` and both page types import it. A copy
would have had the same failure mode as the duplicated table this file already
records, with a wider blast radius, because a spacing or anchor change would
land on guides and silently not on posts.

### What posts needed of their own

**`sources`, required and non-empty.** A guide cites one instrument, named once
in `content/provenance.ts`, and every guide inherits it. That works only because
every guide rests on the same statute. A post about n8n's pricing page has no
relation to the Income Tax Ordinance, and `guideSchema` hardcodes it as
`citation`, so reusing it would have emitted a false claim in machine-readable
form. `postSchema` is therefore separate and builds citations from the post's
own array, which is the same array that renders visibly at the foot of the page.
One array, two consumers, no drift.

Each source carries the date it was read. That is the blog's form of the
no-figures rule: guides may not type a rate because `lib/tax/` holds it, and
posts have nothing to interpolate from, so the date is what makes a price
claim checkable instead of assertable.

**`limits`, an explicit statement of what the post does not cover.** A field
rather than a paragraph, because the honest limitation is the first thing cut
when prose is tightened and the thing that makes the rest credible.

**`pnpm check:posts`.** The guides are backstopped by `check:tax`, which
reconciles every rate against the First Schedule, so a guide cannot state a
figure its calculator disagrees with. Vendor prices have no equivalent and
cannot have one. The check enforces traceability instead: every source has an
absolute URL and a read date, no source claims to have been read after the post
published, and no post claims review before publication.

It caught a real error on its first run: a post dated 12 September carrying a
`reviewedOn` of the 11th, which would have claimed its sources were checked
before it was written. Same family as the false `datePublished` that shipped on
all forty-seven guides.

### The scheduling trap, which nearly shipped

`scripts/guides-due.ts` reported guides only. Posts share the `publishedAt`
gate, so a scheduled post would have sat in the repo indefinitely: nothing would
have asked Vercel to rebuild for it, the guide beside it would have gone live,
and the run log would have read "nothing due" while being wrong.

**Anything that gains a date gate must also be added to the thing that fires the
build.** A gate without a trigger is scheduling in name only, and it fails
silently, which is the worst way for a publishing system to fail.

### Two gates, not one: demand AND answerability

`research/CATALOGUE.md` is the post slate, and every entry in it carries two
things: the harvested queries that evidence someone searches for it, and the
`findings.jsonl` records it rests on. **A post missing either is not written.**

That rule is the correction to a specific failure. `POSTS.md` allocated 47 blog
posts from a query harvest, and when the writing started, five of 403 findings
touched those clusters and two were unusable. Demand had been measured and
answerability had been assumed, which is how a plan can be evidence-based and
still unbuildable.

Reproduce any catalogue demand figure with:

    python3 research/keywords/demand.py "<pattern>"

The number it prints is the `hits` field from the harvest, meaning how many
times a query surfaced across seed expansions. It is **not search volume**, and
the catalogue says so rather than implying otherwise.

### Split by the reader, not by the keyword

This is what multiplies a catalogue without thinning it, and it is worth stating
precisely because the wrong version of it is exactly what thin content is.

"What does an AI agent cost" and "why did my AI bill exceed the estimate" match
overlapping queries and are two posts, because they are two people: one is
deciding whether to build, one has already built and been surprised. Each post
answers its own question completely, and neither is a fragment of the other.

The banned version is splitting one answer across three posts so that none of
them is complete. `POSTS.md` states the test and it still holds: thin content is
not short content, it is content that does not fully answer the question it
claims to.

### A harvest only finds what its seeds look for

Midway through building the catalogue I concluded that AI-failure content had no
demand, because the existing harvest held about ten such queries against 1,153
on cost. That was an artefact of the seed list, which contained no failure
seeds. I had measured their absence and reported it as absence of demand.

Seeded properly, the cluster is 1,199 queries and contains `why ai
implementations fail` at 93 hits, the single most prominent query in the entire
dataset. **Absence in a harvest is not evidence of absence in the world**, and
the fix is to seed the angle explicitly before concluding anything about it.

### Select from the service pages, not the keyword clusters

The second batch of posts was chosen from `content/services/` FAQs rather than
from the blog clusters in `research/POSTS.md`, and it should have been from the
start. The clusters were drawn from a query harvest, which measures demand and
cannot see the business: they allocate eight posts to automation platforms and
none to RAG, digital FTEs, or the international expansion practice that is a
third of what the firm does.

Each service-page FAQ answers a real buyer question in two sentences. That is
correct for a service page and far too short for the question, which makes the
FAQ list the best content brief in the repository: roughly forty questions,
already known to be asked, already known to matter commercially.

**A post earns its place by answering a question a buyer asks before paying,
not by matching a keyword cluster.**

### Every post connects to the work, and the CTA has to actually work

Two separate requirements, both now enforced by `pnpm check:posts`.

**The service parameter must name a real service.** `ContactForm` preselects its
dropdown from `?service=<slug>`, matching on the service slug. Four posts
shipped with invented slugs (`automation`, `ai-agents`, `shopify`, and a guessed
US tax filing slug). Nothing surfaced it, because from the type system's point
of view they are all perfectly good strings: the link works, the page loads, and
the dropdown is simply empty. The one thing a bespoke CTA exists to do silently
did not happen. The check now fails on a slug that matches no service.

**The body has to say who wrote it.** This is an honesty requirement rather than
a sales one. These posts are written by people who do the work, and a post that
never says so reads as though it came from nowhere, which is the anonymous
profile `content/provenance.ts` exists to avoid on the guides.

It also does something a disclaimer cannot. Several of these posts argue against
our own commercial interest: that your spreadsheet may be fine, that automating
a task your team does well loses money, that nobody including us has a
defensible failure rate. **A stated interest can be weighed by the reader. An
unstated one cannot**, so naming it is what makes the limitation credible rather
than performative.

The check warns rather than fails, because the right number of references is a
judgement and one good sentence beats five weak ones.

**What a good connection looks like.** Not "we can help with this". The useful
version is what the work has taught that the research alone does not show:

- the automation proposals that arrive already in the losing quadrant, and why
  (the task was chosen because it was visible, not because it was expensive)
- that the request most often cut from an agent build is the evaluation set and
  the idempotency work, because neither demonstrates well
- that the first diagnostic question about a stalled pilot is who owns it in
  March, not which model it uses
- that most spreadsheet rescues turn out to be two processes in one workbook, or
  a bad input form upstream, both of which are worse business for us

Each of those is a claim only somebody doing the work could make, which is the
test. If the paragraph would be equally true written by a competitor, it is
marketing rather than provenance.

### Pricing sources need a browser, not a fetch

Every figure in a priced comparison sits behind a control: a monthly/annual
toggle, a tier slider, a currency selector. A plain fetch reads the default
state and reports the rest as unavailable, which is how three figures came back
"unverifiable" before `fetch.py --stealth` drove the controls and recovered all
of them.

Two consequences for any post quoting a price. **Drive the controls**, and
**name the currency**: n8n's pricing page served euros to one request and
dollars to another minutes apart, with Business priced differently between them
rather than converted.

## Definition of done

A guide ships when all of these hold:

- Every figure traces to a `verified` finding or interpolates from `lib/tax/`
- No `contested`, `unverified` or `rejected` claim is stated as fact
- It links to at least one calculator, download, or sibling guide
- FAQ entries come from `QUESTIONS.md`, not invented
- `pnpm verify` passes, including the no-em-dash check on rendered output
- The provenance block renders with a real review date
- **Some other guide links to it.** A guide nothing points at is reachable only
  through its cluster hub and earns no contextual anchor text. Twenty of the
  first forty-seven shipped this way before anyone checked.
- **A figure appears in exactly one place.** If a table exists in `lib/tax/`,
  interpolate it. Do not restate it in a second guide, even a related one.
- **The `answer` reads correctly with the title removed.** It is the passage an
  assistant will lift, and it has to survive being lifted.

### The check that catches the linking and duplication ones

Run before committing a batch:

```sh
npx tsx -e "
import { ALL_GUIDES } from './content/guides/index';
const inb = new Map(ALL_GUIDES.map(g => [g.slug, 0]));
for (const g of ALL_GUIDES) for (const r of g.related ?? []) inb.set(r, (inb.get(r) ?? 0) + 1);
console.log('orphans:', [...inb].filter(([, n]) => n === 0).map(([s]) => s));
for (const g of ALL_GUIDES) for (const r of g.related ?? [])
  if (!ALL_GUIDES.find(x => x.slug === r)) console.log('BROKEN', g.slug, '->', r);
"
```

Zero orphans and zero broken references, every time. This belongs in
`scripts/check-content.ts` eventually; until it is there, run it by hand.

## Writing for citation, not just for ranking

The goal is that ChatGPT, Perplexity, Claude and Gemini quote these pages by
name. Most of what achieves that is writing, not markup.

**Keep the answer self-contained.** It is the first paragraph and the most
likely thing to be extracted. If it depends on the title or on a sentence below
it, an assistant lifting it produces something that reads as incomplete and is
less likely to be used.

**Put a correction in its own `note` block.** The site's differentiator is
checkable corrections of things the field gets wrong, and a `note` is the
cleanest citable unit on the page: one claim, self-contained, attributable.
Burying a correction inside a four-sentence prose paragraph means an assistant
lifts the statutory fact and drops the framing that would have made it ours.

**Name the provision.** "Section 236C" beats "the seller's advance tax" because
it lets a reader verify us and gives a model something distinctive to attribute.
Generic tax content does not cite subsection numbers.

**Vary the opening move.** Nearly every guide opens by correcting something. Each
is earned individually, but stacked across forty-seven the rhetorical pattern
starts to show, and a reader working through several in a row notices the
machinery rather than the expertise.

**Say what could not be established.** Publishing an open question is the thing a
firm can do that a content mill cannot, and it is a trust signal rather than a
gap. See METHOD.md section 8.

### The one thing markup cannot fix

`RATES_REVIEWER.credential` is `null` and the schema graph has no `Person` node:
`author` and `reviewedBy` both resolve to the organisation.

For YMYL tax content that caps trust signals regardless of how good the legal
analysis is. A model cannot verify that an organisation employs anyone
qualified; a named individual with a checkable credential is a different kind of
claim. It is the single highest-leverage improvement available to the guides and
it is a business decision, not a code change.

**Do not close it by inventing a credential.** It is trivially checked against a
public register, and a fabricated one turns the strongest asset on the site into
its largest liability.

## Order of work, as it now stands

The guide half is delivered: 47 guides shipped, the last publishing 3 October.
The blog half is eight posts written, and `CATALOGUE.md` holds 34 more that are
researched and ready to draft.

    1. /guides infrastructure, the template, the hub, schema     DONE
    2. 47 guides across 11 clusters                              DONE
    3. /blog content model, routes, check:posts                  DONE
    4. 8 posts, scheduled through 8 October                      DONE
    5. Harvest demand and verify evidence for the rest           DONE
    6. Write the remaining 34, in catalogue order

Step 6 is where this doc's Definition of done applies to each one. The order
inside it is a commercial decision rather than a technical one, and the
catalogue records the demand behind each category so it can be made on evidence.

**The historical note worth keeping.** The original plan here said to write one
guide end to end and review it before writing the rest, because "the shape it
settles is the shape the rest inherit". That was correct and it is why 47 guides
share one renderer and one section union. The same discipline produced
`ContentBlock.tsx` when posts arrived: the shape was already settled, so posts
inherited it instead of growing a parallel copy.

## What a writing session actually looks like now

Because the research is done, drafting a catalogue post is a narrower job than
the earlier waves were. In order:

1. **Read the catalogue entry.** It names the demand, the finding ids and the
   angle. If the angle no longer looks right, change the entry rather than
   writing against it silently.
2. **Read the findings it cites**, in full, from `findings.jsonl`. Not the
   summary in the catalogue: the record, including its `note`, which is where
   the caveats live. Several records exist specifically to stop a figure being
   published without its qualification.
3. **Check nothing has moved.** Anything with a price, a rate or a policy in it
   gets re-fetched. `sources/` records when each was last read.
4. **Write it against the Definition of done below**, including the answer-first
   discipline and the no-orphans rule.
5. **Run `pnpm verify`**, which now includes `check:posts`.

The step people skip is 2, and it is the one that produces wrong sentences.

## Open items, and what they still gate

`findings.jsonl` holds 29 records at `contested` or `unverified`. None of them
blocks a catalogue post, because the catalogue's second gate is answerability:
an entry only exists where verified evidence already supports it.

Two items listed here previously are now closed. **Form 5472 penalty detail** was
verified from the IRS instructions, including the e-filing prohibition, and is
published. **Pakistan's domestic data-protection position** is no longer load
bearing for the blog, since the posts went global.

What remains open is recorded in `OPEN-ITEMS.md` with what to fetch. The rule is
unchanged: close one with `research/fetch.py` before the post that needs it, not
before starting work.

**The failure mode to avoid here is the opposite of the obvious one.** The risk
is not writing while something is unverified, which the gates prevent. It is
treating a verified record as permanently true. Anything with a price, a rate,
a policy or a platform capability in it decays, and several catalogue posts rest
entirely on that kind of fact. `sources/` records when each URL was last read,
and a post whose figures were read months ago needs them re-read rather than
re-used.
