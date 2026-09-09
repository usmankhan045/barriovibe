# How a post gets built

`POSTS.md` says what to write. This says how, and in what order, so the first
post and the seventieth come out the same shape.

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

    Article           with dateModified and reviewedBy from provenance.ts
    FAQPage           from the guide's own FAQs
    BreadcrumbList    home > guides > cluster > guide
    organizationRef() so the provider reference resolves on the page

`HowTo` on procedural guides only, where the steps are genuinely sequential.

## Definition of done

A guide ships when all of these hold:

- Every figure traces to a `verified` finding or interpolates from `lib/tax/`
- No `contested`, `unverified` or `rejected` claim is stated as fact
- It links to at least one calculator, download, or sibling guide
- FAQ entries come from `QUESTIONS.md`, not invented
- `pnpm verify` passes, including the no-em-dash check on rendered output
- The provenance block renders with a real review date

## The first post, and why

**1.1, the filer hub.** Not the flagship, deliberately.

The SERP data shows SlideShare and a LinkedIn post ranking page one for
"difference between filer and non filer": a commercial query being won by a
slide deck. Eleven shipped calculators already compute the filer/non-filer gap,
so every claim in it links to a tool that proves the number on the reader's own
figures. It is the clearest demonstration of what this site can do that
competitors cannot, and it is the head of the cluster with the most spokes ready
to follow.

The cross-border flagship (7.1) is the more distinctive piece and stays in the
plan, but it benefits from a ranked cluster linking into it.

## Order of work

    1. /guides infrastructure: content/guides/, the template, the hub, schema
    2. Post 1.1, the filer hub, end to end
    3. Review it together before writing 70 more
    4. Wave 1: 1.2, 2.1, 3.1, 5.2, 7.1
    5. Wave 2: complete clusters 1 and 2

Step 3 is the point. One finished guide is worth more than six drafts, because
the shape it settles is the shape the rest inherit.

## Open items that gate specific posts

`OPEN-ITEMS.md` lists six. None blocks 1.1 or Wave 1. They gate:

    2.5   PSEB renewal terms
    7.5   Stripe and EIN timing
    7.6   Form 5472 penalty detail
    9.2   Pakistan's domestic data-protection position

Close them with `research/fetch.py` before those posts, not before starting.
