#!/usr/bin/env python3
"""
Turn harvested autocomplete into a ranked opportunity list.

Autocomplete gives no volume. What it does give, and what this scores, is:

  prominence  how early the query appears in Google's own ranked completions,
              across how many prefixes. A query Google surfaces at position 0
              from several different prefixes is one it considers a common
              continuation. That is a popularity signal, not a volume.
  intent      commercial or informational, from the words in the query.
  fit         whether BarrioVibe can answer it from verified findings or a
              shipped calculator.

The output is an ordering, not a forecast. Anything claiming to be volume here
would be invented, and the point of this store is that nothing is.
"""
import json
import re
import sys
from pathlib import Path

# Words that mark a searcher who is close to paying someone.
COMMERCIAL = re.compile(
    r"\b(cost|price|pricing|fee|fees|charges|cheap|affordable|hire|agency|"
    r"company|companies|service|services|consultant|near me|best|top|vs|versus|"
    r"how much|quote)\b")
# Words that mark someone learning, who converts later or not at all.
INFORMATIONAL = re.compile(
    r"\b(what|why|how|when|meaning|definition|guide|explain|difference|"
    r"example|examples|tutorial|learn)\b")
# Queries that want a tool. BarrioVibe ships 22.
TOOL_INTENT = re.compile(r"\b(calculator|calculate|check|checker|verification|estimate|rate|rates|slab|slabs)\b")


def classify(q: str) -> str:
    if TOOL_INTENT.search(q):
        return "tool"
    if COMMERCIAL.search(q):
        return "commercial"
    if INFORMATIONAL.search(q):
        return "informational"
    return "navigational"


def main() -> int:
    if len(sys.argv) < 2:
        print(__doc__)
        return 2
    rows = [json.loads(l) for l in Path(sys.argv[1]).read_text().splitlines() if l.strip()]

    for r in rows:
        # Prominence: early rank across many prefixes beats one lucky hit.
        r["intent"] = classify(r["query"])
        r["prominence"] = round(
            (10 - min(r["best_rank"], 9)) * 1.0 + min(r["hits"], 20) * 0.5
            + (2 if len(r["engines"]) > 1 else 0), 1)
        r["words"] = len(r["query"].split())

    rows.sort(key=lambda r: -r["prominence"])

    by_intent: dict[str, list] = {}
    for r in rows:
        by_intent.setdefault(r["intent"], []).append(r)

    print(f"{len(rows)} unique queries\n")
    for intent in ("tool", "commercial", "informational", "navigational"):
        group = by_intent.get(intent, [])
        if not group:
            continue
        print(f"\n{'='*72}\n{intent.upper()}  ({len(group)})\n{'='*72}")
        for r in group[:int(sys.argv[2]) if len(sys.argv) > 2 else 25]:
            engines = "+".join(e[0] for e in r["engines"])
            print(f"  {r['prominence']:5.1f}  [{engines}] {r['query']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
