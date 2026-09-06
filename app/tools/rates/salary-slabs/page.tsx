import type { Metadata } from 'next';
import { ToolPage } from '@/components/sections/ToolPage';
import { SlabTables } from '@/components/sections/SlabTables';
import { SLAB_TABLES_TOOL, SLAB_TABLES_FAQS, toolHref } from '@/content/tools';
import { TAX_YEARS } from '@/lib/tax/salary-years';
import { PdfDownload } from '@/components/sections/PdfDownload';
import { allSlabsPdf } from '@/lib/pdf-files';
import { toolMetadata } from '@/lib/seo';

/**
 * /tools/rates/salary-slabs: every salaried slab table, newest first.
 *
 * ## Why this exists beside the calculator
 *
 * The calculator answers "what do I owe". This answers "what were the rates",
 * which is a different question asked by a different visitor: somebody
 * checking a closed year, reconciling an old assessment, revising a return, or
 * simply wanting to see how the slabs have moved. Sending them through a
 * calculator to read a table would be making them compute an answer they did
 * not ask for.
 *
 * It is also the page that catches the search. "Income tax slabs 2024-25" and
 * its variants are looked up far more often than any calculator query, and
 * until now this site had the data for fifteen years without a page that
 * simply stated it.
 *
 * ## One page, not fifteen
 *
 * See the note in components/sections/SlabTables.tsx: the question is usually
 * comparative, and three of these years share a table with another year, which
 * is a real feature of the law that a page-per-year would hide.
 */

export const metadata: Metadata = toolMetadata({
  title: SLAB_TABLES_TOOL.seo.title,
  description: SLAB_TABLES_TOOL.seo.description,
  path: toolHref(SLAB_TABLES_TOOL),
});

export default function SalarySlabsPage() {
  const oldest = TAX_YEARS[TAX_YEARS.length - 1]!;
  const newest = TAX_YEARS[0]!;
  const pdf = allSlabsPdf();

  return (
    <ToolPage
      tool={SLAB_TABLES_TOOL}
      faqs={SLAB_TABLES_FAQS}
      eyebrow={`${oldest.searchLabel} to ${newest.searchLabel}`}
      limitsHeading={{ lines: ['What these tables'], accent: 'do not cover' }}
      cta={{
        heading: 'Filing for a year that has closed',
        body: 'A return can be revised, and an assessment can be amended, for years most people assume are settled. If you are looking up an old year because something needs correcting, that is work we do.',
        buttonLabel: 'Talk to us about filing',
        buttonHref: '/contact?service=income-tax-filing',
      }}
      related={['salary-tax', 'multi-year-salary-tax', 'rates/withholding']}
    >
      <>
        {/* Every year in one file. Each year below also has its own, which is
            what somebody checking a single closed year actually wants. */}
        {pdf ? (
          <div className="mb-8">
            <PdfDownload
              href={pdf.href}
              label="Download all fifteen years"
              meta={`${pdf.meta}. Every table below in one file.`}
            />
          </div>
        ) : null}

        <SlabTables />
      </>
    </ToolPage>
  );
}
