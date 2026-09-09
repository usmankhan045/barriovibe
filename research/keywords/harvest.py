#!/usr/bin/env python3
"""
Harvest real query phrasing from Google and Bing autocomplete.

Autocomplete is not volume. It is Google's own ranked list of what people
actually type after a prefix, which makes it the best free evidence of PHRASING
and of relative prominence within a topic. Ordering is a popularity signal:
position 1 is more common than position 8.

Two expansions per seed, because the alphabet trick surfaces the long tail that
a bare seed hides:
    seed            -> the head completions
    seed + " a".."z" -> the modifier space

Usage:
    scrapling-py research/keywords/harvest.py seeds.txt out.jsonl [--gl pk]
"""
import json
import string
import sys
import time
from pathlib import Path

from scrapling.fetchers import Fetcher

GOOGLE = "https://suggestqueries.google.com/complete/search?client=chrome&hl=en&gl={gl}&q={q}"
BING = "https://api.bing.com/osjson.aspx?query={q}"


def google(q: str, gl: str) -> list[str]:
    import urllib.parse
    try:
        p = Fetcher.get(GOOGLE.format(gl=gl, q=urllib.parse.quote(q)), timeout=20)
        if p.status != 200:
            return []
        return json.loads(p.body)[1]
    except Exception:
        return []


def bing(q: str) -> list[str]:
    import urllib.parse
    try:
        p = Fetcher.get(BING.format(q=urllib.parse.quote(q)), timeout=20)
        if p.status != 200:
            return []
        return json.loads(p.body)[1]
    except Exception:
        return []


def main() -> int:
    if len(sys.argv) < 3:
        print(__doc__)
        return 2
    seeds = [s.strip() for s in Path(sys.argv[1]).read_text().splitlines()
             if s.strip() and not s.startswith("#")]
    out = Path(sys.argv[2])
    gl = sys.argv[sys.argv.index("--gl") + 1] if "--gl" in sys.argv else "pk"

    seen: dict[str, dict] = {}
    for i, seed in enumerate(seeds, 1):
        prefixes = [seed] + [f"{seed} {c}" for c in string.ascii_lowercase]
        for pref in prefixes:
            for engine, fn in (("google", lambda q: google(q, gl)), ("bing", bing)):
                for rank, s in enumerate(fn(pref)):
                    rec = seen.setdefault(s.lower(), {
                        "query": s.lower(), "seeds": set(), "engines": set(),
                        "best_rank": 99, "hits": 0,
                    })
                    rec["seeds"].add(seed)
                    rec["engines"].add(engine)
                    rec["best_rank"] = min(rec["best_rank"], rank)
                    rec["hits"] += 1
            time.sleep(0.12)   # be a polite client
        print(f"  [{i}/{len(seeds)}] {seed}: {len(seen)} unique so far", flush=True)

    with out.open("w") as f:
        for r in sorted(seen.values(), key=lambda r: (r["best_rank"], -r["hits"])):
            r["seeds"] = sorted(r["seeds"])
            r["engines"] = sorted(r["engines"])
            f.write(json.dumps(r) + "\n")
    print(f"\nwrote {len(seen)} unique queries to {out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
