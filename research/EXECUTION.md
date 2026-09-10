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

## The first post, and why

**1.1, the filer hub.** Not the flagship, deliberately.

The SERP data shows SlideShare and a LinkedIn post ranking page one for
"difference between filer and non filer": a commercial query being won by a
slide deck. Thirteen shipped calculators expose a filer/non-filer toggle, so
every claim in it links to a tool that proves the number on the reader's own
figures. It is the clearest demonstration of what this site can do that
competitors cannot, and it is the head of the cluster with the most spokes ready
to follow.

The cross-border flagship (7.1) is the more distinctive piece and stays in the
plan, but it benefits from a ranked cluster linking into it.

## Order of work

    1. /guides infrastructure: content/guides/, the template, the hub, schema
    2. Post 1.1, the filer hub, end to end
    3. Review it together before writing the rest
    4. Wave 1: 1.2, 2.1, 3.1, 5.2, 7.1
    5. Wave 2: complete guide clusters 1 and 2
    6. /blog post model, then Wave 3: cluster 8

The blog needs its own model and template. A guide is typed data updated in
place with a "last reviewed" date; a post is dated, opinionated and stays where
it is. Do not try to serve both from one component: the shared parts are the
layout primitives, which they already share.

Step 3 is the point. One finished guide is worth more than six drafts, because
the shape it settles is the shape the rest inherit.

## Open items that gate specific posts

`OPEN-ITEMS.md` lists six. None blocks 1.1 or Wave 1. They gate:

    2.5   PSEB renewal terms
    7.5   Stripe and EIN timing
    7.6   Form 5472 penalty detail
    14.2  Pakistan's domestic data-protection position

Close them with `research/fetch.py` before those posts, not before starting.
