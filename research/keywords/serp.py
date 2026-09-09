#!/usr/bin/env python3
"""
Read what Google itself says about a query: the questions it thinks are
related, the searches it suggests next, and who currently ranks.

This is the half of keyword research that does NOT need a volume number. A
query where the top results are a YouTube video and a forum thread is winnable
whatever its volume; a query owned by four established competitors with real
tooling is not.

    scrapling-py research/keywords/serp.py <queries.txt> <out.jsonl> [--gl pk]

Per query it records:
    questions   People-also-ask style questions Google surfaces
    related     related-search phrasings
    domains     who ranks, in order
    weakness    a 0-5 score: how beatable page one looks
"""
import json
import re
import sys
import time
import urllib.parse
from collections import Counter
from pathlib import Path

from scrapling.fetchers import StealthyFetcher

SKIP = ("google.", "gstatic", "schema.org", "w3.org", "googleusercontent",
        "ggpht", "googletagmanager", "googleadservices", "doubleclick")

# Domains whose presence on page one means the query is winnable: user-generated
# content, video, and social all signal that no authoritative page owns it.
SOFT = ("youtube.com", "facebook.com", "linkedin.com", "quora.com", "reddit.com",
        "medium.com", "tiktok.com", "instagram.com", "twitter.com", "x.com",
        "pinterest.com", "slideshare.net", "scribd.com")


# A real results page is tens of KB. Anything much smaller is a consent
# interstitial or a JS shell, which yields zero domains and silently poisons the
# competitive read with "nobody ranks here". Detect it and retry rather than
# recording a confident-looking empty result.
MIN_HTML = 20_000


def _fetch(url: str):
    return StealthyFetcher.fetch(url, timeout=60000, network_idle=True)


def _bing(query: str, gl: str):
    """Bing prints each result's display URL in a <cite>, which survives its
    redirect wrapping. Google rate-limits hard after a hundred or so queries
    from one IP and then serves a 6KB "unusual traffic" shell, so Bing is the
    primary source here and Google is the fallback rather than the reverse."""
    url = (f"https://www.bing.com/search?q={urllib.parse.quote(query)}"
           f"&cc={gl}&setlang=en&count=20")
    p = _fetch(url)
    if not p.body or len(p.body) < MIN_HTML:
        return None, "", []
    cites = [(c.text or "").strip() for c in p.css("cite")]
    doms = []
    for c in cites:
        m = re.match(r"https?://(?:www\.)?([a-z0-9.-]+\.[a-z]{2,})", c)
        if m and m.group(1) not in doms:
            doms.append(m.group(1))
    return p, (p.get_all_text() or ""), doms[:12]


def analyse(query: str, gl: str, attempts: int = 3) -> dict:
    text, doms, err = "", [], None
    for i in range(attempts):
        try:
            p, text, doms = _bing(query, gl)
            if doms:
                break
        except Exception as exc:  # noqa: BLE001
            err = str(exc)[:150]
        time.sleep(3 * (i + 1))

    if not doms:
        return {"query": query, "error": err or "no results extracted"}

    html = ""

    questions = sorted({
        m.strip() for m in re.findall(
            r"\b(?:How|What|Who|Why|When|Where|Is|Are|Can|Do|Does|Should)\b[^?\n]{8,90}\?",
            text)
    })

    doms = [d for d in doms if not any(s in d for s in SKIP)]

    soft = sum(1 for d in doms[:10] if any(s in d for s in SOFT))
    gov = sum(1 for d in doms[:10] if d.endswith((".gov.pk", ".gov", ".edu.pk")))
    # More UGC and video on page one means less established competition.
    # A government page ranking is neutral: it answers the query but does not
    # compete for the commercial intent underneath it.
    weakness = min(5, soft + (1 if gov else 0))

    return {
        "query": query,
        "questions": questions[:12],
        "domains": doms,
        "soft_results": soft,
        "gov_results": gov,
        "weakness": weakness,
    }


def main() -> int:
    if len(sys.argv) < 3:
        print(__doc__)
        return 2
    queries = [q.strip() for q in Path(sys.argv[1]).read_text().splitlines()
               if q.strip() and not q.startswith("#")]
    out = Path(sys.argv[2])
    gl = sys.argv[sys.argv.index("--gl") + 1] if "--gl" in sys.argv else "pk"

    done = []
    if out.exists():   # resumable: SERP fetches are slow, do not redo them
        done = [json.loads(l) for l in out.read_text().splitlines() if l.strip()]
    seen = {d["query"] for d in done}

    with out.open("a") as f:
        for i, q in enumerate(queries, 1):
            if q in seen:
                continue
            r = analyse(q, gl)
            f.write(json.dumps(r) + "\n")
            f.flush()
            mark = "ERR" if r.get("error") else f"weakness {r['weakness']}/5, {len(r['questions'])}q"
            print(f"  [{i}/{len(queries)}] {q[:52]:<52} {mark}", flush=True)
            time.sleep(2.5)   # deliberately slow; do not get the IP blocked
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
