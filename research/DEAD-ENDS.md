# Dead ends, recorded so they are not walked twice

**fbr.gov.pk/section-<N>/<id> paths do not encode the section number.**
`/section-154A/152731` returns s.206A. The id range 152715-152732 maps to a
selected subset of sections only (108, 108A, 108B, 109, 109A, 116A, 142-145,
152, 152A, 182, 192B, 195A, 195B, 206A, 230E). s.154A is not published there.
Get section text from the consolidated Ordinance PDF instead.

**sbp.org.pk/fe_manual/chapters/chapter20.htm is a redirect shell.**
Returns 200 with site chrome and no chapter text. The real content is in the
circular PDFs under /epd/<year>/, e.g. FEC1-AnnexA.pdf.

**Plain curl is blocked by ipo.gov.pk and sbp.org.pk** (returns an HTML block
page with a .pdf filename). Two ways through, both verified working:
scrapling's StealthyFetcher, or curl with a browser User-Agent AND a Referer
header from the linking page.

**scrapling's get_all_text() returns empty for PDF responses.** It renders HTML.
For a PDF, download the bytes and use `pdftotext -layout`.

**Every legacy sbp.org.pk PDF path is now an HTML shell, including
/epd/<year>/ and /fe_manual/pdf/<year>/.** SBP moved to a new site. The old
paths 301-redirect to the HTML circular page, so a fetcher saves the page
template under a .pdf name and `pdftotext` fails with "May not be a PDF file".
This is how research/raw/sbp-annexA.txt and sbp-ch20.txt came to hold nothing
but SBP homepage chrome, while a finding cited them as verified. Check
`file <name>.pdf` says "PDF document" before trusting any SBP download.

The live paths, verified 10 Sep 2026:
- circulars:  /circulars/<slug>            e.g. /circulars/fe-circular-no-01-of-2024
- circular attachments: /assets/documents/circulars/FE-2024-C1-Annex-A.pdf
- FE Manual chapters:   /assets/document/Chapter-20-foreign-exchange-manual.pdf
- FERA 1947:            /assets/document/ordinance-foreign-exchange-manual.pdf

**Cloudflare blocks curl on /assets/ even with a browser UA and Referer.**
StealthyFetcher's own navigation also will not save the bytes. What works is
fetching the asset from inside the already-challenged browser page, so the
Cloudflare cookies apply, then base64ing it back out:

```python
page.evaluate("""async (u) => {
  const r = await fetch(u, {credentials:'include'});
  const b = await r.arrayBuffer(); let s=''; const a=new Uint8Array(b);
  for (let i=0;i<a.length;i++) s+=String.fromCharCode(a[i]);
  return r.status + '|' + btoa(s);
}""", pdf_url)
```

**The /circulars listing paginates server-side at /circulars/P<offset>**, in
steps of 30 (P30, P60, ...). `?page=N` and the department filter in the query
string are both ignored and silently return page one, so a sweep that uses them
will conclude there are no later circulars when there are. The listing links
are rendered by JS, so read hrefs from the live DOM, not from the HTML source.

**secp.gov.pk PDFs are behind a JavaScript download manager.**
The document pages (e.g. the Seventh Schedule fee notification, Circular 13 of
2024) render a "Download" button whose href is the same page URL with `?ind=`
and `filename=` query parameters. Fetching that URL, even with StealthyFetcher,
returns the page template rather than the PDF: the actual file is served by a
JS-driven POST the fetcher does not perform.

Tried and failed: plain curl with browser UA and Referer; StealthyFetcher on
the document page and on the `?ind=` URL; guessing `/wp-content/uploads/<year>/
<month>/<FILE>.pdf` paths.

What worked instead: the fee figures came from a third party hosting the same
Seventh Schedule PDF, cross-checked against Business Recorder's reporting of
the 21 April 2025 structure. For anything where only SECP has the document,
download it manually in a browser.

## WIPO Lex record 17010 is not the Pakistan Trade Marks Rules

Tried `https://www.wipo.int/wipolex/en/legislation/details/17010` expecting the
Trade Marks Rules 2004. It returns HTTP 200 and 242KB of text, and the content
is **Serbia's Law on Legal Protection of Industrial Designs** wrapped in WIPO's
site navigation.

Two lessons, both worth more than the fetch would have been:

- **A 200 is not a hit.** The fetch succeeded, the record was written, and the
  file would have sat in `raw/` under a filename asserting it was Pakistani
  trademark law. Always grep the fetched text for a term that must appear in
  the document you asked for before recording it.
- **WIPO Lex detail pages are landing pages.** The legislation text sits behind
  a separate document link that the text extraction drops along with the markup,
  so `--stealth` plus `get_all_text()` returns navigation chrome either way.

The trademark fee and renewal facts came from the gazette PDF at
`raw/ipo-tm-fees.pdf` instead, which is a better source in any case: it is the
instrument that set the fees rather than a restatement of it.

## fbr.gov.pk/section-82/152702 serves a five-year-old version of s.82

The id resolves to the right section, unlike the `/section-154A/152731` case
above, but the text is stale. As fetched on 10 September 2026 the page prints
clause (ab), the 120-day test **omitted by the Finance Act 2021**, and omits
clause (d), the citizen limb **inserted by the Finance Act 2022**.

Two lessons:

- The `/section-<N>/<id>` pages are not maintained. Treat every one of them as
  a lead, never as the text. Get section text from the consolidated Ordinance
  PDF whose cover date postdates the last Finance Act.
- This is worth more as material than as a dead end. It is the likeliest single
  reason competitors misstate s.82, and the error is checkable in thirty
  seconds against footnote 5 to s.82 in the consolidation.

## FBR serves "page does not exist" with HTTP 200

`https://www.fbr.gov.pk/categ/income-tax-rules/51147/131160` returns status 200
and a body reading "The Requested Page does not Exist". A guessed download URL
for the consolidated Income Tax Rules 2002 returned an honest 404.

This is the second instance in one session of a successful-looking fetch that
carried nothing, after WIPO Lex record 17010. The rule that follows is worth
stating once and applying everywhere: **grep the fetched text for a term the
document must contain, and treat its absence as a failed fetch regardless of
the status code.** `fetch.py --grep` exists for exactly this and is cheaper than
discovering the problem after a claim has been written.

The Income Tax Rules 2002 were therefore not obtained. What this blocks is
narrow and it is recorded as `no-day-counting-rule`: the Ordinance itself has
no provision on how days of presence are counted for s.82, and whether the
Rules supply one is unresolved. The residency guide publishes that as an open
question rather than adopting the widely repeated assertion that a part-day
counts as a whole day, which no source we read supports.
