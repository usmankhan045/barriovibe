# Getting real search volume from Google Keyword Planner

Free, no ad spend required, about 20 minutes. This is the only free source that
returns geo-correct volume for Pakistani queries: see `README.md` for why no
published source has them.

## 1. Create a Google Ads account without a campaign

ads.google.com, sign in, then look for **Switch to Expert Mode** (a small link
at the bottom of the campaign-setup page) and then **Create an account without
a campaign**. Confirm country Pakistan, currency PKR, timezone. Submit.

No campaign, no billing, no spend.

## 2. Open the right tool

Tools (wrench icon) > Planning > Keyword Planner >
**Get search volume and forecasts**.

Not "Discover new keywords": that finds ideas, and we already have 7,496.

## 3. Set location BEFORE pasting

The step that matters most. Set location to **Pakistan** (remove any other) and
language to **English**. Getting this wrong returns US volumes for Pakistani
queries, which is worse than no data at all.

## 4. Paste, then read historical metrics

Paste one list, click Get started, then open the **Historical metrics** tab.
The column you want is **Avg. monthly searches**.

## 5. Download as CSV

Download > .csv. Keep the file; `ingest.py` in this directory reads it.

## The two lists

    planner-pakistan.txt    700 queries, run with location = Pakistan
    planner-ai-global.txt   700 queries, run with location = United States

Run them separately. The AI and offshore queries are a global market and the
Pakistani tax queries are not, so mixing geographies in one run destroys both.

Regenerate either list, or make bigger ones, from the harvested files: the
selection logic is at the bottom of this file.

## What to expect

Without ad spend Google returns **banded ranges** ("1K - 10K") rather than exact
figures. That is normal and still decisive: it separates a 100-search query from
a 10,000-search one, which is all the article ordering needs. Exact numbers
require active spend and are not worth it here.

## After the download

    python3 research/keywords/ingest.py <downloaded.csv> pk    # or: us

That joins Google's volumes onto the harvested queries, writes
`volumes-pk.jsonl` or `volumes-us.jsonl`, and prints the ranked opportunity
list that `ARTICLES.md` ordering should be rebuilt from.

## Regenerating the paste lists

The lists are the highest-prominence queries that carry tool, commercial or
informational intent, are at least two words, and (for Pakistan) do not name
another country. Selection lives in the git history for this file; the harvested
source data is `pk-tax.jsonl` and `ai-dev.jsonl`.
