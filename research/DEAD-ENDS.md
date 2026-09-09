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
