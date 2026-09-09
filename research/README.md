# Research store

The evidence base behind the content strategy, recorded so it survives the
session that produced it.

## Start here

| File | What it holds |
| --- | --- |
| `STRATEGY.md` | The conclusions. Why the intersection of tech and compliance is the wedge, what international buyers actually do, the four phases, and what not to build. |
| `ARTICLES.md` | 41 titles across five categories, each tagged READY, BLOCKED or OURS, with the finding ids it rests on. |
| `DEMAND.md` | The raw observations: search demand by cluster, seasonality, who ranks today and why they are beatable. |
| `OPEN-ITEMS.md` | Six verification items that block specific articles, each with what to fetch. |
| `DEAD-ENDS.md` | Fetch routes that do not work, so they are not walked twice. |
| `findings.jsonl` | One record per claim, append-only, with a status that gates publication. |
| `sources/` | Fetch metadata per URL: status, timestamp, hash. |
| `raw/` | Fetched text and PDFs. Gitignored, reproducible via `fetch.py`. |
| `reports/` | The agent reports verbatim, caveats included. |

## Why this exists

The first pass of this research lived only in a conversation. That is the wrong
place for it: the numbers that decide what gets written, and the flags saying
which numbers are **not** safe to publish, are exactly the things that must
outlive a chat window. A claim nobody can trace back to a fetch gets quietly
restated as fact six months later.

Six of the 44 findings are recorded specifically so they are never used again,
including a "63% of enterprises cite IP protection (Forrester 2024)" statistic
that traces to a vendor blog and has no Forrester source behind it.

## The rule that matters

`status` on every finding is one of:

    verified     fetched from a primary source and read. Safe to publish.
    contested    sources disagree. Publish the disagreement, not a number.
    unverified   found, but only in secondary or tier-3/4 restatements.
                 NOT safe to publish as fact.
    rejected     traced and found wrong, or untraceable to any named study.
                 Recorded so it cannot resurface.

Nothing moves to `verified` without a fetch recorded in `sources/`. This mirrors
the standard the tax calculators already hold themselves to: a rate needs its
Ordinance section, and a scraped figure is one source, never the only one.

## Using it

    python3 research/query.py --publishable    # verified only
    python3 research/query.py contested        # needs resolving first
    python3 research/query.py --grep pseb      # substring search

    scrapling-py research/fetch.py <id> <url> [--stealth] [--grep PATTERN]

`--stealth` runs a real browser. It is what got past the TLS failure on
ipo.gov.pk and the 403s on sbp.org.pk that stopped the earlier research. Note
that `get_all_text()` returns empty for PDF responses: download the bytes and
use `pdftotext -layout` instead. See `DEAD-ENDS.md`.

## What the research could not do

**No keyword volume data, and this is structural.** Per-keyword volume is the
paywalled core of Ahrefs and Semrush, and nobody publishes it free for a
Pakistan-geo tax keyword set. Google Trends returns 429 here. What exists
instead is 7,496 real queries harvested from Google and Bing autocomplete, in
`keywords/`, which evidences phrasing and relative prominence but is NOT volume.
Google Keyword Planner with geo=PK, free with an Ads account, remains the
correct fix. See `keywords/README.md`.

**Reddit was blocked for all six agents.** Each said so rather than inventing
practitioner discourse. The n8n community forum substituted for the AI cluster;
nothing substituted for the others.
