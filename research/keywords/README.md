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

7,496 unique real queries harvested from Google and Bing autocomplete.

| File | Queries | Geo | Seeds |
| --- | ---: | --- | --- |
| `pk-tax.jsonl` | 2,233 | Pakistan | 15 tax, corporate, IP, freelancer |
| `ai-dev.jsonl` | 5,263 | US | 15 AI, automation, web, offshore |

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
