# Research store

The evidence base behind the content strategy, recorded so it survives the
session that produced it.

## Start here

| File | What it holds |
| --- | --- |
| `METHOD.md` | **How to research for this site.** The traps, the source order, the fetch workarounds, and how to publish an open question. Read before commissioning an agent. |
| `STRATEGY.md` | The conclusions. Why the intersection of tech and compliance is the wedge, what international buyers actually do, the four phases, and what not to build. |
| `POSTS.md` | The original post plan: 108 pieces in fourteen clusters, built from the query harvest and SERP data. Records what the first three blog posts changed about it, including why demand data is not evidence. **Superseded for the blog half by `CATALOGUE.md`.** |
| `CATALOGUE.md` | **The post catalogue, and what to write next.** Every entry carries its harvested demand AND the findings it rests on, because a post missing either does not get written. Six categories, 42 posts, plus a record of where splitting a post was refused and why. |
| `GUIDE-RESEARCH.md` | Per-guide notes: what each is built on, what it corrects, what still blocks it. |
| `EXECUTION.md` | **How a guide or post gets built, and what has already gone wrong.** URL shape, content model, anatomy, schema with the reasoning behind each block, writing for AI citation, how posts differ from guides and why that difference is enforced by a check, and a definition of done that includes the gates the first forty-seven guides failed. Read before writing one. |
| `ARTICLES.md` | Superseded by POSTS.md. Kept for its per-title status tags and finding ids. |
| `DEMAND.md` | The raw observations: search demand by cluster, seasonality, who ranks today and why they are beatable. |
| `OPEN-ITEMS.md` | Verification items that block specific articles, each with what to fetch. Live count is in findings.jsonl: 29 contested or unverified. |
| `DEAD-ENDS.md` | Fetch routes that do not work, so they are not walked twice. |
| `findings.jsonl` | One record per claim, append-only, with a status that gates publication. |
| `sources/` | Fetch metadata per URL: status, timestamp, hash. |
| `raw/` | Fetched text and PDFs. Gitignored, reproducible via `fetch.py`. |
| `keywords/` | The query harvests and the tools over them. `demand.py` finds the evidence behind a proposed post; `harvest.py` gathers more. |
| `reports/` | The agent reports verbatim, caveats included. |

## Why this exists

The first pass of this research lived only in a conversation. That is the wrong
place for it: the numbers that decide what gets written, and the flags saying
which numbers are **not** safe to publish, are exactly the things that must
outlive a chat window. A claim nobody can trace back to a fetch gets quietly
restated as fact six months later.

Thirty-five of the 562 findings are recorded specifically so they are never used
again. Two examples show the range: a "63% of enterprises cite IP protection
(Forrester 2024)" statistic that traces to a vendor blog and has no Forrester
source behind it, and a "USD 100,000" remittance threshold that was a Finance
Bill 2023 proposal, dropped before enactment, still published as live law on
pages badged 2026.

Before writing a guide, read `EXECUTION.md`. Its schema and definition-of-done
sections record specific defects that shipped and were caught later: a false
publication date on all forty-seven guides, twenty guides that nothing linked
to, a table duplicated into two pages that could drift apart, and a working
IndexNow script that nothing called for weeks. Each is a general trap rather
than a one-off.

Before starting new research, read `METHOD.md`. It records what actually went
wrong across fifteen guides, and the headline is that every serious error came
from a source that was genuinely official: a consolidation that predated the
Finance Act, a regulator's summary written against the Bill, a government page
that was three years stale.

## The rule that matters

`status` on every finding is one of:

    verified     fetched from a primary source and read. Safe to publish.
    contested    sources disagree. Publish the disagreement, not a number.
    unverified   found, but only in secondary or tier-3/4 restatements.
                 NOT safe to publish as fact.
    rejected     traced and found wrong, or untraceable to any named study.
                 Recorded so it cannot resurface.

**These four are the only permitted values.** `query.py` groups on exactly this
list, so a record written with any other status is invisible to every grouped
query and to `--publishable`. One record was written with a well-meant
`never-use` status and vanished from the store's own reports, which is the
precise opposite of what a never-use record is for. It has been normalised to
`rejected`, which already carries that meaning.

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
instead is 14,522 real queries harvested from Google and Bing autocomplete, in
`keywords/`, which evidences phrasing and relative prominence but is NOT volume.
Google Keyword Planner with geo=PK, free with an Ads account, remains the
correct fix. See `keywords/README.md`.

**Reddit was blocked for all six agents.** Each said so rather than inventing
practitioner discourse. The n8n community forum substituted for the AI cluster;
nothing substituted for the others.

**A harvest only finds what its seeds look for.** Midway through the catalogue
research I concluded that AI-failure content had no demand, on the basis that
the existing harvest held about ten such queries against 1,153 on cost. That was
an artefact of the seed list, which contained no failure seeds: I had measured
their absence and called it absence of demand. Seeded properly the cluster is
1,199 queries and contains the single most prominent query in the whole dataset.
Absence in a harvest is not evidence of absence in the world.

**A plain fetch reports a pricing page's default state and misses the rest.**
Three figures came back "unverifiable" from a WebFetch pass and all three were
behind JavaScript controls: a monthly/annual toggle and a tier slider. Driving
the same pages with `fetch.py --stealth` recovered every one. For anything
priced, drive the controls rather than reading the page as served, and record
the currency: n8n's pricing page is geo-priced and served two different
currencies to two requests minutes apart.
