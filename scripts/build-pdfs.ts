#!/usr/bin/env tsx
/**
 * Generates the downloadable rate cards and slab tables into `public/pdf/`.
 *
 * ## Why these are generated rather than written
 *
 * A PDF of tax rates is the single easiest document to let go stale: it is a
 * snapshot, it gets downloaded, and the copy in somebody's Downloads folder
 * keeps circulating long after a Finance Act moved the figures in it. Every
 * firm that publishes one has old ones in the wild disagreeing with its own
 * website.
 *
 * So none of the numbers below are typed here. They are read from
 * `lib/tax/rate-card.ts` and `lib/tax/salary-years.ts`, which are the same
 * modules the pages render from and `scripts/check-tax.ts` reconciles against
 * the First Schedule. The PDF and the page are two renderings of one source,
 * which is the only arrangement in which they cannot disagree.
 *
 * ## Why WeasyPrint rather than a headless browser
 *
 * Print CSS is the whole job here: page size, margins, repeating table
 * headers, page numbers. WeasyPrint implements the CSS paged-media spec
 * directly and installs as one binary. A headless browser would add a
 * hundred-megabyte dependency to the build to do the same thing less well,
 * since Chrome's print pipeline ignores several of the paged-media features
 * this uses.
 *
 * The generated files are committed to `public/`, so a deploy needs neither
 * WeasyPrint nor this script. Run it when the rates change, which is the same
 * moment `pnpm check:tax` would tell you something moved.
 *
 * Run: pnpm build:pdfs
 */

import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, rmSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { RATE_GROUPS, RATE_CARD } from '../lib/tax/rate-card';
import { TAX_YEARS, type TaxYearTable } from '../lib/tax/salary-years';
import { BRAND } from '../content/site';
import { RATES_BASIS, RATES_REVIEWED, RATES_REVIEWER } from '../content/provenance';

const OUT_DIR = join(process.cwd(), 'public', 'pdf');
const TMP_DIR = join(process.cwd(), '.next', 'pdf-tmp');

/**
 * The site's own two typefaces, embedded rather than substituted.
 *
 * A downloadable rate card is a brand document: it gets saved, forwarded and
 * printed, often months later and with no page around it. Setting it in
 * Helvetica would make it look like a generic form from a different firm,
 * which is the one thing a document carrying our name should not do.
 *
 * WeasyPrint resolves `src: url(...)` against the stylesheet, so the woff2
 * files next/font already serves are pointed at by absolute file URL. Both are
 * variable fonts covering the weights used here, so one file per family is
 * enough. Arial stays in the stack as the last resort only.
 */
const FONT_DIR = join(process.cwd(), 'app', 'fonts');
const fontUrl = (file: string) => pathToFileURL(join(FONT_DIR, file)).href;

const money = new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 });
const pc = (rate: number) => `${Number((rate * 100).toFixed(4))}%`;

/** HTML-escape. These strings are ours, but a stray & would still break the parse. */
const esc = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const reviewedLabel = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
}).format(new Date(RATES_REVIEWED));

/**
 * The print stylesheet, shared by both documents.
 *
 * Points rather than pixels throughout: this is paper, and a reader who prints
 * it should get the same thing the download shows. `thead { display:
 * table-header-group }` is what repeats a table's header on every page it runs
 * onto, which is the one thing a long rate card genuinely needs.
 */
const CSS = `
@font-face {
  font-family: "Satoshi";
  src: url("${fontUrl('Satoshi-Variable.woff2')}") format("woff2");
  font-weight: 300 900;
  font-style: normal;
}
@font-face {
  font-family: "InterVar";
  src: url("${fontUrl('Inter-Variable-latin.woff2')}") format("woff2");
  font-weight: 100 900;
  font-style: normal;
}
@page {
  size: A4;
  margin: 12mm 11mm 14mm;
  @bottom-center {
    content: "Page " counter(page) " of " counter(pages);
    /* Margin boxes sit outside <body>, so they inherit nothing from it. Left
       unset, WeasyPrint falls back to its own default serif and the page
       number arrives in a face that appears nowhere else in the document. */
    font-family: "InterVar", Arial, sans-serif;
    font-size: 7.5pt;
    color: #6b7280;
  }
}
* { box-sizing: border-box; }
body {
  font-family: "InterVar", Arial, sans-serif;
  font-size: 7.4pt;
  line-height: 1.35;
  color: #14171f;
  margin: 0;
}
/* Two columns, which is what makes a reference card a reference card. A rate
   table is a list of short rows: run at full width it wastes half the sheet
   and doubles the page count, and a reader scanning for one section has
   further to travel. column-fill:auto fills the left column before the right
   rather than balancing, so reading order down-then-across matches the order
   of the sections. */
.cols {
  column-count: 2;
  column-gap: 7mm;
  column-fill: auto;
}
.cols > section { break-inside: avoid; }
.masthead {
  border-bottom: 1.5pt solid #14171f;
  padding-bottom: 5pt;
  margin-bottom: 9pt;
}
.brand { font-family: "Satoshi", Arial, sans-serif; font-size: 6.6pt; letter-spacing: .10em; text-transform: uppercase; color: #1d4ed8; font-weight: 700; }
h1 { font-family: "Satoshi", Arial, sans-serif; font-weight: 800; font-size: 15pt; margin: 3pt 0 2pt; letter-spacing: -.01em; }
.sub { font-size: 7.6pt; color: #4b5563; margin: 0; max-width: 62em; }
h2 {
  font-family: "Satoshi", Arial, sans-serif;
  font-weight: 700;
  font-size: 8.4pt;
  margin: 9pt 0 3pt;
  padding-bottom: 2pt;
  border-bottom: .75pt solid #14171f;
  /* Never leave a group heading alone at the foot of a column. */
  break-after: avoid;
}
h2:first-child { margin-top: 0; }
table { width: 100%; border-collapse: collapse; }
thead { display: table-header-group; }
tr { break-inside: avoid; }
th {
  text-align: left;
  font-size: 5.8pt;
  text-transform: uppercase;
  letter-spacing: .05em;
  color: #4b5563;
  background: #f4f6f8;
  padding: 2.5pt 3.5pt;
  border-bottom: .6pt solid #dfe3e8;
}
td { padding: 3pt 3.5pt; border-bottom: .4pt solid #eceff2; vertical-align: top; }
td.n, th.n { text-align: right; }
td.strong { font-weight: 600; }
.note { display: block; font-size: 6.3pt; line-height: 1.3; color: #6b7280; margin-top: 1pt; }
.yearhead { display: flex; justify-content: space-between; align-items: baseline; }
.yearnote {
  font-size: 7.5pt;
  color: #4b5563;
  background: #f7f9fb;
  border: .5pt solid #e5e9ee;
  border-radius: 3pt;
  padding: 4pt 6pt;
  margin: 4pt 0 5pt;
}
.year { break-inside: avoid; margin-bottom: 12pt; }
footer {
  /* Spans both columns, at the foot of the last page. */
  column-span: all;
  margin-top: 10pt;
  padding-top: 5pt;
  border-top: .75pt solid #dfe3e8;
  font-size: 6.4pt;
  line-height: 1.35;
  color: #6b7280;
}
footer p { margin: 0 0 3pt; }
`;

/**
 * The provenance line for a document.
 *
 * `RATES_BASIS` names the current year, which is right for the rate card and
 * wrong for a single closed year: a 2018-19 table footed with "as amended by
 * the Finance Act 2026, for tax year 2027" contradicts its own heading. So a
 * per-year document states its own Act and year, and everything else falls
 * back to the shared line.
 */
function basisFor(year?: TaxYearTable): string {
  if (!year) return RATES_BASIS;
  return `Income Tax Ordinance, 2001, as amended by the ${year.authority}, for ${year.label.toLowerCase()} (${year.period}).`;
}

function shell(title: string, subtitle: string, body: string, year?: TaxYearTable): string {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${esc(title)}</title>
<style>${CSS}</style></head><body>
<div class="masthead">
  <div class="brand">${esc(BRAND.name)}</div>
  <h1>${esc(title)}</h1>
  <p class="sub">${esc(subtitle)}</p>
</div>
${body}
<footer>
  <p><strong>Where these figures come from.</strong> ${esc(basisFor(year))}</p>
  <p>Last checked against the statute on ${esc(reviewedLabel)} by ${esc(RATES_REVIEWER.name)}${
    RATES_REVIEWER.credential ? `, ${esc(RATES_REVIEWER.credential)}` : ''
  }.</p>
  <p>For general guidance and not a substitute for advice on your own facts. Prepared by ${esc(
    BRAND.name,
  )}, ${esc(BRAND.domain)}.</p>
</footer>
</body></html>`;
}

/* ── 1. The withholding rate card ───────────────────────────────────────── */

function rateCardHtml(): string {
  /* Four columns rather than five: the nature of the tax (adjustable, final,
     minimum) joins the note under the payment. It is a word per row, it is
     the same word for most rows in a group, and giving it a column of its own
     cost more width than it earned. */
  const groups = RATE_GROUPS.map(
    (group) => `
<section>
<h2>${esc(group.title)}</h2>
<table>
  <thead><tr>
    <th style="width:12%">Sec</th>
    <th style="width:48%">Nature of payment</th>
    <th class="n" style="width:20%">Filer</th>
    <th class="n" style="width:20%">Non-filer</th>
  </tr></thead>
  <tbody>
    ${group.rows
      .map(
        (row) => `<tr>
      <td>${esc(row.section)}</td>
      <td>${esc(row.payment)}<span class="note"><strong>${esc(row.nature)}.</strong>${
        row.note ? ` ${esc(row.note)}` : ''
      }</span></td>
      <td class="n strong">${esc(row.filer)}</td>
      <td class="n strong">${esc(row.nonFiler)}</td>
    </tr>`,
      )
      .join('\n    ')}
  </tbody>
</table>
</section>`,
  ).join('\n');

  return shell(
    'Withholding Tax Rate Card',
    `${RATE_CARD.taxYear.label}, ${RATE_CARD.taxYear.searchLabel}. ${RATE_CARD.taxYear.period}. Rates set by the ${RATE_CARD.taxYear.authority}. Written for an individual: several sections charge a company or an association of persons differently. Filer means a person on FBR's Active Taxpayer List.`,
    `<div class="cols">${groups}</div>`,
  );
}

/* ── 2. The slab tables ─────────────────────────────────────────────────── */

function slabRowsHtml(year: TaxYearTable): string {
  return year.slabs
    .map((slab, i) => {
      const from = i === 0 ? 0 : (year.slabs[i - 1]!.upTo ?? 0);
      const band =
        slab.upTo === null
          ? `Above Rs ${money.format(from)}`
          : i === 0
            ? `Up to Rs ${money.format(slab.upTo)}`
            : `Rs ${money.format(from + 1)} to Rs ${money.format(slab.upTo)}`;
      const rate =
        slab.flat !== undefined ? 'Flat charge' : slab.rate === 0 ? 'Nil' : pc(slab.rate);
      const floor =
        slab.flat !== undefined
          ? `Rs ${money.format(slab.flat)}`
          : slab.fixed === 0
            ? '-'
            : `Rs ${money.format(slab.fixed)}`;
      return `<tr><td>${band}</td><td class="n">${rate}</td><td class="n">${floor}</td></tr>`;
    })
    .join('\n      ');
}

function yearBlock(year: TaxYearTable): string {
  const surcharge =
    year.surcharge.rate > 0
      ? ` A surcharge of ${pc(year.surcharge.rate)} under section 4AB also applied above Rs ${money.format(
          year.surcharge.threshold,
        )} of taxable income.`
      : '';
  return `
<div class="year">
  <h2>${esc(year.searchLabel)} &nbsp;<span style="font-weight:400;font-size:8.5pt;color:#4b5563">${esc(
    year.label,
  )}. ${esc(year.period)}. Set by the ${esc(year.authority)}.</span></h2>
  ${year.note || surcharge ? `<p class="yearnote">${esc(year.note ?? '')}${esc(surcharge)}</p>` : ''}
  <table>
    <thead><tr>
      <th style="width:56%">Annual taxable income</th>
      <th class="n" style="width:22%">Rate on the excess</th>
      <th class="n" style="width:22%">Tax at the floor</th>
    </tr></thead>
    <tbody>
      ${slabRowsHtml(year)}
    </tbody>
  </table>
</div>`;
}

function slabsHtml(): string {
  const oldest = TAX_YEARS[TAX_YEARS.length - 1]!;
  const newest = TAX_YEARS[0]!;
  return shell(
    'Pakistan Salary Tax Slabs by Year',
    `Salaried individuals, ${oldest.searchLabel} to ${newest.searchLabel}. Each table is the one in force for that year, with the Act that set it named against it. Business and association-of-persons income is charged on a different table.`,
    TAX_YEARS.map(yearBlock).join('\n'),
    // Spans fifteen Acts, so the footer names the range rather than one Act.
    // Each table states its own Act above it.
    {
      ...newest,
      authority: `Finance Acts in force for ${oldest.searchLabel} to ${newest.searchLabel}`,
      label: `tax years ${oldest.label.replace('Tax year ', '')} to ${newest.label.replace('Tax year ', '')}`,
      period: `${oldest.period.split(' to ')[0]} to ${newest.period.split(' to ')[1]}`,
    } as TaxYearTable,
  );
}

/** One year on its own, for the per-year downloads. */
function singleYearHtml(year: TaxYearTable): string {
  return shell(
    `Pakistan Salary Tax Slabs ${year.searchLabel}`,
    `Salaried individuals, ${year.label}. ${year.period}. Rates set by the ${year.authority}.`,
    yearBlock(year),
    year,
  );
}

/* ── Render ─────────────────────────────────────────────────────────────── */

/**
 * What was generated and how big it is.
 *
 * Written beside the files as JSON so the pages can state a size without
 * anybody typing one. A hardcoded "38 KB" is wrong the first time a rate
 * changes and the file is regenerated, and it is the kind of wrong nobody
 * notices.
 */
const manifest: Record<string, { bytes: number; pages: number }> = {};

function render(name: string, html: string): void {
  const htmlPath = join(TMP_DIR, `${name}.html`);
  const pdfPath = join(OUT_DIR, `${name}.pdf`);
  writeFileSync(htmlPath, html, 'utf8');
  execFileSync('weasyprint', [htmlPath, pdfPath], { stdio: ['ignore', 'ignore', 'pipe'] });
  /* Page count read back from the finished file. It changes as sections are
     added, and a page that said "two pages" while the card fitted on one
     would be the same class of stale claim these documents exist to avoid. */
  const pageCount = Number(
    execFileSync('pdfinfo', [pdfPath], { encoding: 'utf8' })
      .split('\n')
      .find((line) => line.startsWith('Pages:'))
      ?.replace('Pages:', '')
      .trim() ?? '0',
  );
  manifest[name] = { bytes: statSync(pdfPath).size, pages: pageCount };
  process.stdout.write(`  ${name}.pdf\n`);
}

function main(): void {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
  if (!existsSync(TMP_DIR)) mkdirSync(TMP_DIR, { recursive: true });

  process.stdout.write('\n  Generating PDFs into public/pdf/\n\n');

  render(`withholding-tax-rate-card-${RATE_CARD.taxYear.searchLabel}`, rateCardHtml());
  render('salary-tax-slabs-all-years', slabsHtml());
  for (const year of TAX_YEARS) {
    render(`salary-tax-slabs-${year.searchLabel}`, singleYearHtml(year));
  }

  writeFileSync(
    join(OUT_DIR, 'manifest.json'),
    `${JSON.stringify(manifest, null, 2)}\n`,
    'utf8',
  );

  rmSync(TMP_DIR, { recursive: true, force: true });
  process.stdout.write(`\n  Done. ${TAX_YEARS.length + 2} files.\n\n`);
}

main();
