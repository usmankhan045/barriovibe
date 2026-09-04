import type { Metadata } from 'next';
import { ToolPage } from '@/components/sections/ToolPage';
import { RentalIncomeCalculator } from '@/components/sections/PropertyCalculators';
import { RENTAL_INCOME_TOOL, RENTAL_INCOME_FAQS, toolHref } from '@/content/tools';
import { pageMetadata } from '@/lib/seo';

/**
 * /tools/rental-income-tax
 *
 * Structure, breadcrumbs, schema and section order come from ToolPage. What is
 * particular to this calculator is its copy (content/tools.ts), its arithmetic
 * (lib/tax/) and its questions.
 */

export const metadata: Metadata = pageMetadata({
  title: RENTAL_INCOME_TOOL.seo.title,
  description: RENTAL_INCOME_TOOL.seo.description,
  path: toolHref(RENTAL_INCOME_TOOL),
});

export default function Page() {
  return (
    <ToolPage
      tool={RENTAL_INCOME_TOOL}
      faqs={RENTAL_INCOME_FAQS}
      limitsHeading={{ lines: ['What this'], accent: 'does not cover' }}
      cta={{
        heading: 'Withheld is not the same as owed.',
        body: 'Repairs, property tax, insurance and other allowable deductions can bring your final liability below what your tenant withheld. The difference comes back on a return. We file them.',
        buttonLabel: 'Talk to us about filing',
        buttonHref: '/contact?service=income-tax-filing',
      }}
      related={['property-sale-tax', 'property-capital-gains', 'salary-tax']}
    >
      <RentalIncomeCalculator />
    </ToolPage>
  );
}
