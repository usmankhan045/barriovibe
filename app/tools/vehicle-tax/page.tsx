import type { Metadata } from 'next';
import { ToolPage } from '@/components/sections/ToolPage';
import { VehicleTaxCalculator } from '@/components/sections/ConsumerCalculators';
import { VEHICLE_TAX_TOOL, VEHICLE_TAX_FAQS, toolHref } from '@/content/tools';
import { pageMetadata } from '@/lib/seo';

/**
 * /tools/vehicle-tax
 *
 * Structure, breadcrumbs, schema and section order come from ToolPage. What is
 * particular to this calculator is its copy (content/tools.ts), its arithmetic
 * (lib/tax/) and its questions.
 */

export const metadata: Metadata = pageMetadata({
  title: VEHICLE_TAX_TOOL.seo.title,
  description: VEHICLE_TAX_TOOL.seo.description,
  path: toolHref(VEHICLE_TAX_TOOL),
});

export default function Page() {
  return (
    <ToolPage
      tool={VEHICLE_TAX_TOOL}
      faqs={VEHICLE_TAX_FAQS}
      limitsHeading={{ lines: ['What this'], accent: 'does not cover' }}
      cta={{
        heading: 'Filing is worth three times more here.',
        body: 'Section 231B trebles for a non-filer rather than doubling. On a single registration that gap is usually larger than the cost of getting on the Active Taxpayer List.',
        buttonLabel: 'Talk to us about filing',
        buttonHref: '/contact?service=income-tax-filing',
      }}
      related={['vehicle-token-tax', 'cash-withdrawal-tax', 'salary-tax']}
    >
      <VehicleTaxCalculator />
    </ToolPage>
  );
}
