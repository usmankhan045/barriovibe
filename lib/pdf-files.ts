import manifest from '@/public/pdf/manifest.json';
import { RATE_CARD } from '@/lib/tax/rate-card';
import type { TaxYearTable } from '@/lib/tax/salary-years';

/**
 * The generated PDFs under /pdf, and how to name and size them.
 *
 * `scripts/build-pdfs.ts` writes both the files and the manifest this reads,
 * so a page never states a filename or a size that is not on disk. Importing
 * the manifest rather than calling `statSync` keeps this usable from a server
 * component without touching the filesystem at request time, and makes a
 * missing file a build error rather than a broken link.
 */

type Manifest = Record<string, { bytes: number; pages: number }>;

const files = manifest as Manifest;

/** "36 KB". Rounded, because nobody needs the byte count. */
function size(bytes: number): string {
  return `${Math.round(bytes / 1024)} KB`;
}

/** "one page", "two pages", "15 pages". Words for the small counts. */
function pages(count: number): string {
  const words = ['', 'one page', 'two pages', 'three pages', 'four pages'];
  return words[count] ?? `${count} pages`;
}

/** A download's href and its "PDF, one page, 27 KB" line, or null if absent. */
function entry(name: string): { href: string; meta: string; pages: number } | null {
  const file = files[name];
  if (!file) return null;
  return {
    href: `/pdf/${name}.pdf`,
    meta: `PDF, ${pages(file.pages)}, ${size(file.bytes)}`,
    pages: file.pages,
  };
}

/** The withholding rate card for the current year. */
export const withholdingPdf = () =>
  entry(`withholding-tax-rate-card-${RATE_CARD.taxYear.searchLabel}`);

/** Every slab table in one file. */
export const allSlabsPdf = () => entry('salary-tax-slabs-all-years');

/** One year's slab table on its own. */
export const slabPdfFor = (year: TaxYearTable) =>
  entry(`salary-tax-slabs-${year.searchLabel}`);
