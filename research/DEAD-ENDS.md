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

**sbp.org.pk/fe_manual/pdf/2021/Chapter-20.pdf returns an HTML shell, not a PDF.**
Tried plain curl, curl with browser UA + Referer, and StealthyFetcher with a
prior session on the manual index. All return the SBP page template. The 2021
chapter path appears retired. Use the EPD circulars under /epd/<year>/ instead:
FE Circular No. 01 of 11 July 2024 (FEC1-AnnexA.pdf) fetched cleanly and carries
the current Equity Investment Abroad framework, which supersedes the 2021 text.

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
