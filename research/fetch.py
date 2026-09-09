#!/usr/bin/env python3
"""
Fetch a URL with scrapling and record it, so a claim can be traced to a fetch.

Usage:
    scrapling-py research/fetch.py <id> <url> [--stealth] [--grep PATTERN]

Writes:
    research/raw/<id>.txt        the extracted text
    research/sources/<id>.json   url, status, fetch time, sha256, title

The id is what findings.jsonl references. Reusing an id re-fetches and
overwrites, which is intended: re-verification should update the record rather
than accumulate near-duplicates.
"""
import hashlib
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent
(ROOT / "raw").mkdir(exist_ok=True)
(ROOT / "sources").mkdir(exist_ok=True)


def main() -> int:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    flags = {a for a in sys.argv[1:] if a.startswith("--")}
    if len(args) < 2:
        print(__doc__)
        return 2

    sid, url = args[0], args[1]
    grep = None
    if "--grep" in sys.argv:
        grep = sys.argv[sys.argv.index("--grep") + 1]

    from scrapling.fetchers import Fetcher, StealthyFetcher

    # StealthyFetcher runs a real browser: slower, but it is what gets past the
    # 403s that blocked the earlier research (sbp.org.pk) and the TLS failure on
    # ipo.gov.pk. Plain Fetcher first, because most pages do not need the cost.
    try:
        if "--stealth" in flags:
            page = StealthyFetcher.fetch(url, timeout=60000)
        else:
            page = Fetcher.get(url, timeout=30)
    except Exception as exc:  # noqa: BLE001 - the failure reason is the finding
        rec = {
            "id": sid, "url": url, "status": None, "error": str(exc)[:500],
            "fetched_at": datetime.now(timezone.utc).isoformat(),
        }
        (ROOT / "sources" / f"{sid}.json").write_text(json.dumps(rec, indent=2))
        print(f"FAILED {sid}: {exc}", file=sys.stderr)
        return 1

    text = page.get_all_text() or ""
    # Collapse the runs of whitespace that CMS markup leaves behind, so a grep
    # for a phrase is not defeated by a newline in the middle of it.
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)

    (ROOT / "raw" / f"{sid}.txt").write_text(text)
    rec = {
        "id": sid,
        "url": url,
        "status": page.status,
        "fetched_at": datetime.now(timezone.utc).isoformat(),
        "sha256": hashlib.sha256(text.encode()).hexdigest()[:16],
        "chars": len(text),
        "stealth": "--stealth" in flags,
    }
    (ROOT / "sources" / f"{sid}.json").write_text(json.dumps(rec, indent=2))
    print(f"OK {sid} status={page.status} chars={len(text)}")

    if grep:
        for m in re.finditer(grep, text, re.I):
            lo, hi = max(0, m.start() - 220), min(len(text), m.end() + 220)
            print(f"\n  ...{text[lo:hi].strip()}...")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
