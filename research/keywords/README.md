# Keyword data

## The headline, stated plainly

**No published per-keyword search volume exists for the Pakistani queries, and
almost none for the AI/dev queries.** Two research agents searched exhaustively
and returned honest nulls. This is structural, not a search failure.

Per-keyword volume is the core paywalled asset of Ahrefs, Semrush and Moz. They
publish it free in blog posts only for keyword sets that market their product to
their own buyers: US and UK marketing, e-commerce, SEO-industry terms. A
Pakistan-geo tax-compliance keyword set has no marketing value to them, so
nobody has published one.

Google Trends is also unavailable: HTTP 429 from this environment on both the UI
route and the JSON explore API, including through a warmed browser session. Bing
Webmaster's keyword API requires authentication.

## What was obtained instead

14,522 unique real queries harvested from Google and Bing autocomplete, across
six seed sets.

| File | Queries | Seeded on |
| --- | ---: | --- |
| `ai-dev.jsonl` | 5,263 | AI, automation, web, offshore, cost of build |
| `ops.jsonl` | 2,467 | evaluating, monitoring and securing agents |
| `pk-tax.jsonl` | 2,233 | Pakistani tax, corporate, IP, freelancer |
| `fit.jsonl` | 2,105 | do I need an app, a website, an agent |
| `buy.jsonl` | 1,452 | vetting an agency, contracts, code ownership |
| `rescue.jsonl` | 1,199 | AI failure, RAG accuracy, chatbot problems |

The last four were added while building `CATALOGUE.md`, and the reason is a
lesson rather than an expansion. The first two harvests could not answer
questions their seeds never asked, and a conclusion was briefly drawn from that
silence. See "A harvest only finds what its seeds look for" below.

**Autocomplete is not volume, and nothing here pretends it is.** What it is:
Google's own ranked list of what people actually type after a prefix. That makes
it strong evidence of two things volume alone would not give:

- **Real phrasing.** How people actually word a question, which is what a title
  and an H1 should match.
- **Relative prominence.** Position 1 is a more common continuation than
  position 8, and a query surfaced early from several different prefixes is one
  Google considers common. The `prominence` score in `analyse.py` combines rank,
  breadth across prefixes, and agreement between Google and Bing.

## The three findings that change the plan

### 1. Tool intent is the largest actionable category in Pakistan

Of 2,233 Pakistani queries, **453 (20%) carry explicit tool intent** and 219 are
commercial. Only informational (517) is larger among non-navigational queries.

The four highest-prominence tool queries are all **verification** queries:

    22.0  trademark registration check online pakistan
    22.0  ntn registration check
    21.5  secp registration check
    21.0  pseb registration check

BarrioVibe ships 22 calculators and **none of them is a verification tool**.
That is a concrete, evidenced gap in exactly the category where the market's
strongest competitor (PakFiler) already wins on tooling.

### 2. Cost intent in AI is confirmed independently

Of 5,263 AI/dev queries, **2,042 (39%) are commercial**. Both of these sit at
maximum prominence on Google and Bing:

    22.0  ai agent cost per month
    22.0  ai agent development cost

This independently confirms the earlier conclusion that cost is the strongest
AI content opportunity, which had rested on SERP inspection alone.

Two more useful surfaces: `ai agent vs chatbot vs llm` (a three-way framing
nobody covers, against the two-way one everybody does) and `ai agent failure
rate` / `ai agent hallucination rate`, which support the failure cluster.

### 3. The market-size anchor is a hard count, not an estimate

**5.9 million income tax returns filed for TY2025** as of 31 October 2025,
against 5.0 million the year before, 3.6 million with payment (FBR Press Release
No. 327). An administrative count, not a model. This is the realistic ceiling on
filing-intent audience size in Pakistan, and the closest thing to a market
sizing available for free.

## Reproducing and extending

    scrapling-py research/keywords/harvest.py <seeds.txt> <out.jsonl> --gl pk

### Finding the demand behind a proposed post

    python3 research/keywords/demand.py "<regex>"
    python3 research/keywords/demand.py "<regex>" --top 30

Searches every harvest at once and ranks matches by prominence. This is what
makes the first gate in `CATALOGUE.md` enforceable rather than rhetorical: an
entry in that file quotes the numbers this prints, so any claim about demand in
the catalogue can be reproduced in one command.

It is also the fastest way to kill a bad idea. "Questions to ask a software
agency" felt like an obvious post and returns ONE matching query out of 14,522.
    python3 research/keywords/analyse.py <out.jsonl> [top-n]

`harvest.py` expands each seed with a-z suffixes across both engines, which is
what surfaces the long tail a bare seed hides. It sleeps between calls; leave
that in.

## Getting real volume, if you want it

In order of cost:

1. **Google Keyword Planner, geo set to Pakistan.** Free with any Google Ads
   account. Returns banded volumes for every query in these files. This is the
   correct tool and the only free one that actually answers the question.
2. **Google Search Console**, once any page is live and indexed. True
   impressions beat every third-party estimate.
3. **One month of Ahrefs or Semrush** with the country filter set to PK.

Until one of those exists, ordering in `ARTICLES.md` rests on prominence,
intent, competitive weakness and verified-fact coverage, and says so.

## Rejected sources

Recorded in `findings.jsonl` so they do not resurface:

- **Exploding Topics "n8n: 1.5M, +833%"**: the methodology page does not state
  whether the figure is monthly, which geography, or which search engine, and
  the growth window is undefined. Comparable pages for agentic-ai, ai-agents and
  rag all 404.
- **AY Automate "AI Automation Demand Index"**: the publisher is an AI
  automation agency selling agent development, so high demand figures are
  directly self-serving. Cluster aggregates only, from its own keyword panel.
- **Similarweb dollar values beside keywords are CPC, not volume.** Easy to
  misread as volume; they are not.

---

# SERP competitive analysis

Volume answers "how big is the prize". This answers "can we take it", which for
a site with no rankings yet is the more useful question.

    scrapling-py research/keywords/serp.py <queries.txt> <out.jsonl> [--gl pk]

Per query it records the questions Google surfaces, the domains that rank, and
a 0-5 `weakness` score: how much of page one is user-generated content, video
and government pages rather than established commercial competitors.

## Files

    serp-pk.jsonl          raw, 70 queries, 35 usable
    serp-pk-usable.jsonl   the 35 with 3+ domains extracted. USE THIS ONE.
    serp-ai.jsonl          raw, 70 queries, 3 usable. DO NOT USE, see below.
    QUESTIONS.md           169 unique questions, deduplicated, with sources

## What the Pakistani data says

35 queries, 193 top-10 slots:

    56%  commercial
    26%  user-generated content and video
    18%  government

**No incumbent owns this market.** The strongest commercial player holds 10 of
193 slots, about 5%. YouTube is the single most frequent domain on page one.

The weakest, most winnable queries:

    difference between filer and non filer      SlideShare and LinkedIn rank
    how to become a filer in pakistan           YouTube and LinkedIn on page one
    trademark registration check online pk      YouTube and Scribd rank
    ntn registration requirements               consultant blogs, no tooling

A quarter of page one being video and slide decks is what a SERP looks like when
nobody has written the authoritative page yet.

Separately, on NTN, SECP and sales tax queries the top results are the
**government portals themselves**. They satisfy the navigational intent and
answer nothing underneath it: someone searching "ntn registration requirements"
wants a document list and gets a login form.

## Why the AI/dev run was discarded

Google rate-limits SERP scraping from one IP after roughly 100-140 queries and
then serves a ~6KB "unusual traffic" shell page. The AI run was collected after
that threshold, so 67 of its 70 queries returned no domains, which the tool
recorded as "no competitors found".

Read naively that says the AI market has almost no competition. That is the
opposite of what the verified competitor research found, and it is an artifact
of being blocked rather than a finding. The run is marked `rejected` in
`findings.jsonl`.

`serp.py` now detects short shell responses and records an error instead of a
confident-looking empty result, so this failure mode cannot recur silently.

## Method limits for future runs

- Cap at roughly 70 queries per session and space them 3 to 4 seconds.
- Bing exposes ranked URLs in `<cite>` elements, which survive its redirect
  wrapping, but returns topically wrong results for some queries. Validate that
  returned domains plausibly match the query before trusting a batch.
- Weakness is a composition heuristic, not a difficulty score. It says what
  *kind* of page ranks, which for an unranked site is the more actionable
  signal.

## A harvest only finds what its seeds look for

Recorded because it produced a wrong conclusion that survived several hours and
reached the user before being caught.

While building the catalogue, the AI-failure cluster appeared to have almost no
demand: about ten matching queries against 1,153 on cost. The inference drawn
was that failure content was not worth writing.

That was an artefact of the seed list. `ai-dev.jsonl` was seeded on products and
costs and contained no failure seeds at all, so the harvest had never looked for
those queries. Seeded properly, `rescue.jsonl` returned 1,199 of them, including
`why ai implementations fail` at 93 hits, which is the single most prominent
query in the entire corpus.

**Absence in a harvest is evidence about the seeds, not about the world.** Before
concluding that a topic has no demand, check whether anything was ever asked
that could have found it, and seed the angle explicitly if not.

## What the numbers in the catalogue mean

`CATALOGUE.md` quotes a figure beside each query, for example
`why ai implementations fail` 93. That is the `hits` field: how many times the
query surfaced across seed expansions and engines.

It is a prominence signal, not a volume. A query with 93 hits is one Google and
Bing both consider a common continuation from many different prefixes. It does
not mean 93 of anything, and it cannot be compared against a volume figure from
a paid tool. Every use of these numbers in the catalogue is comparative: this
cluster is larger than that one, this phrasing beats that phrasing.
