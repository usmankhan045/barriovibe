import type { Metadata } from 'next';
import { ToolPage } from '@/components/sections/ToolPage';
import { RateTable } from '@/components/sections/RateTable';
import { RATE_CARD_TOOL, RATE_CARD_FAQS, toolHref } from '@/content/tools';
import { RATE_CARD } from '@/lib/tax/rate-card';
import { PdfDownload } from '@/components/sections/PdfDownload';
import { withholdingPdf } from '@/lib/pdf-files';
import { toolMetadata } from '@/lib/seo';

/**
 * /tools/rates/withholding: the withholding tax rate card.
 *
 * ## Why a page rather than a PDF
 *
 * The rate card is one of the most downloaded things any Pakistani tax firm
 * publishes, and almost all of them publish it as a PDF. A PDF is the wrong
 * format for it: it cannot be searched from a phone, it cannot be linked to a
 * particular row, it does not reflow at 390px, and a search engine indexes it
 * poorly if at all. Worst of all it is a snapshot, so the copy somebody
 * downloaded in 2024 keeps circulating after the rates move.
 *
 * This page is the same information as HTML, generated from the modules the
 * calculators compute with, so it cannot drift from them and it updates when
 * they do. A downloadable version is offered as well, printed from this page
 * rather than maintained beside it, so the two cannot disagree.
 *
 * ## Why it sits under /tools rather than in a resources section
 *
 * Because it is the same subject as everything else here and a visitor does
 * not sort by "interactive". Somebody who wants the section 236K rate and
 * somebody who wants to compute their own 236K liability are usually the same
 * person on different days. Each row therefore links to the calculator that
 * works it out, which is the thing a PDF cannot do at all.
 */

export const metadata: Metadata = toolMetadata({
  title: RATE_CARD_TOOL.seo.title,
  description: RATE_CARD_TOOL.seo.description,
  path: toolHref(RATE_CARD_TOOL),
});

export default function WithholdingRatesPage() {
  const pdf = withholdingPdf();

  return (
    <ToolPage
      tool={RATE_CARD_TOOL}
      faqs={RATE_CARD_FAQS}
      eyebrow={`${RATE_CARD.taxYear.label}, ${RATE_CARD.taxYear.searchLabel}`}
      limitsHeading={{ lines: ['What this card'], accent: 'does not cover' }}
      cta={{
        heading: 'Have the deductions checked against your return',
        body: 'Most of what is on this card is adjustable, which means it counts towards your tax for the year and is claimed back when you file. Plenty of it never is. We reconcile what was withheld from you against what you actually owed.',
        buttonLabel: 'Talk to us about filing',
        buttonHref: '/contact?service=income-tax-filing',
      }}
      related={['salary-tax', 'cash-withdrawal-tax', 'rates/salary-slabs']}
    >
      <>
        {/* The download sits above the table rather than under it. Somebody
            who came for the file should not have to scroll the whole card to
            find it, and somebody who came to read is not impeded by one row. */}
        {pdf ? (
          <div className="mb-8">
            <PdfDownload
              href={pdf.href}
              label={`Download the ${RATE_CARD.taxYear.searchLabel} rate card`}
              meta={`${pdf.meta}. Every rate below.`}
            />
          </div>
        ) : null}

        <RateTable />
      </>
    </ToolPage>
  );
}
