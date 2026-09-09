# Research store

Everything the content strategy rests on, recorded so it survives the session
that produced it.

## Why this exists

The first pass of this research lived only in a conversation. That is a bad
place for it: the numbers that decide what gets written, and the flags that say
which numbers are not safe to publish, are exactly the things that must outlive
the chat window. A claim nobody can trace back to a fetch is a claim that gets
quietly restated as fact six months later.

## Layout

    findings.jsonl   one record per verified claim, append-only
    sources/         fetch metadata, one JSON per URL retrieved
    raw/             raw fetched text, named by source id
    reports/         the agent reports, verbatim

## The rule that matters

`status` on every finding is one of:

    verified     fetched from a primary source and read. Safe to publish.
    unverified   found, but only in secondary or tier-3/4 restatements.
                 NOT safe to publish as fact.
    contested    sources disagree. Publish the disagreement, not a number.
    rejected     traced and found wrong, or untraceable to any named study.

Nothing moves to `verified` without a fetch recorded in `sources/`. This mirrors
the standard the tax calculators already hold themselves to: a rate needs its
Ordinance section, and a scraped figure is one source, never the only one.
