#!/usr/bin/env python3
"""
Join Google Keyword Planner volumes onto the harvested queries.

    python3 research/keywords/ingest.py <planner-export.csv> <pk|us>

Keyword Planner exports UTF-16 with two preamble lines, and its column names
differ by locale and by which tab was open. Both are handled: the volume column
is found by matching on "avg" and "month" rather than on an exact header, so a
localised export still works.

Writes volumes-<geo>.jsonl and prints the ranked opportunity list.
"""
import csv
import io
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
TOOL = re.compile(r"\b(calculator|calculate|check|checker|verification|verify|estimate|rate|rates|slab|slabs)\b")
COMM = re.compile(r"\b(cost|price|pricing|fee|fees|charges|hire|agency|company|companies|service|services|consultant|near me|best|top|vs|versus|how much|quote|register|registration)\b")
INFO = re.compile(r"\b(what|why|how|when|meaning|definition|guide|explain|difference|tutorial)\b")


def intent(q: str) -> str:
    if TOOL.search(q):
        return "tool"
    if COMM.search(q):
        return "commercial"
    if INFO.search(q):
        return "informational"
    return "navigational"


def read_planner(path: Path) -> dict[str, dict]:
    """Return {query: {volume, competition, low_bid, high_bid}}."""
    raw = path.read_bytes()
    for enc in ("utf-16", "utf-8-sig", "utf-8"):
        try:
            text = raw.decode(enc)
            if text.count(",") + text.count("\t") > 10:
                break
        except UnicodeDecodeError:
            continue
    else:
        raise SystemExit("could not decode the export; is it the CSV Google gave you?")

    lines = text.splitlines()
    # Google prefixes two title lines before the real header.
    start = next((i for i, l in enumerate(lines)
                  if re.search(r"keyword", l, re.I) and re.search(r"avg|currency|competition", l, re.I)), 0)
    dialect = csv.Sniffer().sniff(lines[start][:2000], delimiters=",\t;")
    rows = list(csv.DictReader(io.StringIO("\n".join(lines[start:])), dialect=dialect))
    if not rows:
        raise SystemExit("no data rows found in the export")

    cols = rows[0].keys()

    def find(*must):
        for c in cols:
            lc = (c or "").lower()
            if all(m in lc for m in must):
                return c
        return None

    kw_col = find("keyword") or next(iter(cols))
    vol_col = find("avg", "month") or find("searches")
    comp_col = find("competition") and not find("competition", "indexed") and find("competition")
    lo_col = find("low", "bid") or find("top of page bid", "low")
    hi_col = find("high", "bid") or find("top of page bid", "high")

    if not vol_col:
        raise SystemExit(f"could not find a volume column. Headers were: {list(cols)}")

    out = {}
    for r in rows:
        q = (r.get(kw_col) or "").strip().lower()
        if not q:
            continue
        v = (r.get(vol_col) or "").strip()
        out[q] = {
            "volume_raw": v,
            "volume": int(re.sub(r"[^\d]", "", v)) if re.search(r"\d", v) else None,
            "competition": (r.get(comp_col) or "").strip() if comp_col else "",
            "low_bid": (r.get(lo_col) or "").strip() if lo_col else "",
            "high_bid": (r.get(hi_col) or "").strip() if hi_col else "",
        }
    return out


def main() -> int:
    if len(sys.argv) < 3:
        print(__doc__)
        return 2
    csv_path, geo = Path(sys.argv[1]), sys.argv[2].lower()
    src = ROOT / ("pk-tax.jsonl" if geo == "pk" else "ai-dev.jsonl")

    planner = read_planner(csv_path)
    harvested = {json.loads(l)["query"]: json.loads(l)
                 for l in src.read_text().splitlines() if l.strip()}

    merged = []
    for q, p in planner.items():
        h = harvested.get(q, {})
        merged.append({
            "query": q,
            "volume": p["volume"],
            "volume_raw": p["volume_raw"],
            "competition": p["competition"],
            "high_bid": p["high_bid"],
            "intent": intent(q),
            "best_rank": h.get("best_rank"),
            "engines": h.get("engines", []),
            "geo": geo,
        })

    out = ROOT / f"volumes-{geo}.jsonl"
    with out.open("w") as f:
        for r in sorted(merged, key=lambda r: -(r["volume"] or 0)):
            f.write(json.dumps(r) + "\n")

    withvol = [r for r in merged if r["volume"]]
    print(f"{len(merged)} keywords, {len(withvol)} with a volume figure -> {out}\n")

    for label in ("tool", "commercial", "informational"):
        g = sorted([r for r in withvol if r["intent"] == label],
                   key=lambda r: -(r["volume"] or 0))[:20]
        if not g:
            continue
        print(f"\n{'='*74}\n{label.upper()}  (top 20 by volume)\n{'='*74}")
        for r in g:
            comp = f"comp {r['competition']}" if r["competition"] else ""
            print(f"  {r['volume']:>9,}  {r['query'][:52]:<52} {comp}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
