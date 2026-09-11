#!/usr/bin/env python3
"""
Find the harvested demand behind a proposed post.

The catalogue rule is that no post is written without evidence that someone
searches for it. This is what enforces it: give it a regex, it returns the
matching queries ranked by prominence, so a catalogue entry can carry its
evidence rather than an assertion.

Prominence here is the `hits` field from harvest.py: how many times a query
surfaced across the seed expansions. It is NOT volume, and nothing here
pretends otherwise. See keywords/README.md.

    python3 research/keywords/demand.py "pattern"
    python3 research/keywords/demand.py "pattern" --top 30
"""
import json, re, sys, glob

def load():
    rows, seen = [], {}
    for f in glob.glob('research/keywords/*.jsonl'):
        if 'serp' in f:
            continue
        for line in open(f):
            try:
                r = json.loads(line)
            except Exception:
                continue
            if 'query' not in r or 'hits' not in r:
                continue
            q = r['query']
            if q not in seen or r['hits'] > seen[q]['hits']:
                seen[q] = r
    return list(seen.values())

def demand(pattern, rows, top=20):
    rx = re.compile(pattern, re.I)
    hits = [r for r in rows if rx.search(r['query'])]
    hits.sort(key=lambda r: -r['hits'])
    return hits[:top], len(hits)

if __name__ == '__main__':
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    top = 20
    if '--top' in sys.argv:
        top = int(sys.argv[sys.argv.index('--top') + 1])
    if not args:
        print(__doc__); raise SystemExit(2)
    rows = load()
    shown, total = demand(args[0], rows, top)
    print(f"{total} matching queries of {len(rows)} harvested\n")
    for r in shown:
        print(f"  {r['hits']:>3}  {r['query']}")
