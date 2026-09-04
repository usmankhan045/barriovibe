import type { Metadata } from 'next';
import { ToolPage } from '@/components/sections/ToolPage';
import { PropertySaleCalculator } from '@/components/sections/PropertyCalculators';
import { PROPERTY_SALE_TOOL, PROPERTY_SALE_FAQS, toolHref } from '@/content/tools';
import { pageMetadata } from '@/lib/seo';

/**
 * /tools/property-sale-tax
 *
 * Structure, breadcrumbs, schema and section order come from ToolPage. What is
 * particular to this calculator is its copy (content/tools.ts), its arithmetic
 * (lib/tax/) and its questions.
 */

export const metadata: Metadata = pageMetadata({
  title: PROPERTY_SALE_TOOL.seo.title,
  description: PROPERTY_SALE_TOOL.seo.description,
  path: toolHref(PROPERTY_SALE_TOOL),
});

export default function Page() {
  return (
    <ToolPage
      tool={PROPERTY_SALE_TOOL}
      faqs={PROPERTY_SALE_FAQS}
      limitsHeading={{ lines: ['What this'], accent: 'does not cover' }}
      cta={{
        heading: 'This is advance tax, not your final bill.',
        body: 'Section 236C is creditable against the capital gains tax on the same sale, and the excess is refundable. Neither happens without a return. We prepare and file them.',
        buttonLabel: 'Talk to us about filing',
        buttonHref: '/contact?service=income-tax-filing',
      }}
      related={['property-capital-gains', 'property-purchase-tax', 'rental-income-tax']}
    >
      <PropertySaleCalculator />
    </ToolPage>
  );
}
