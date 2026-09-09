#!/usr/bin/env python3
"""
Read the findings store.

    python3 research/query.py                 everything, grouped by status
    python3 research/query.py verified        only that status
    python3 research/query.py --grep pseb     substring match on claim/note
    python3 research/query.py --publishable   what is safe to write from
"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
ORDER = ["verified", "contested", "unverified", "rejected"]


def load():
    p = ROOT / "findings.jsonl"
    if not p.exists():
        return []
    return [json.loads(l) for l in p.read_text().splitlines() if l.strip()]


def main() -> int:
    rows = load()
    args = sys.argv[1:]

    if "--grep" in args:
        needle = args[args.index("--grep") + 1].lower()
        rows = [r for r in rows if needle in (r.get("claim", "") + r.get("note", "")).lower()]
    if "--publishable" in args:
        rows = [r for r in rows if r.get("status") == "verified"]
    for a in args:
        if a in ORDER:
            rows = [r for r in rows if r.get("status") == a]

    if not rows:
        print("no matching findings")
        return 0

    for status in ORDER:
        group = [r for r in rows if r.get("status") == status]
        if not group:
            continue
        print(f"\n{'='*70}\n{status.upper()}  ({len(group)})\n{'='*70}")
        for r in group:
            print(f"\n[{r['id']}]  tier {r.get('tier','?')}")
            print(f"  {r['claim']}")
            print(f"  source: {r.get('source','?')}")
            if r.get("note"):
                print(f"  note:   {r['note']}")
    print()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
