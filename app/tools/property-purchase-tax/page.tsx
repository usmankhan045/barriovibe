import type { Metadata } from 'next';
import { ToolPage } from '@/components/sections/ToolPage';
import { PropertyPurchaseCalculator } from '@/components/sections/PropertyCalculators';
import { PROPERTY_PURCHASE_TOOL, PROPERTY_PURCHASE_FAQS, toolHref } from '@/content/tools';
import { toolMetadata } from '@/lib/seo';

/**
 * /tools/property-purchase-tax
 *
 * Structure, breadcrumbs, schema and section order come from ToolPage. What is
 * particular to this calculator is its copy (content/tools.ts), its arithmetic
 * (lib/tax/) and its questions.
 */

export const metadata: Metadata = toolMetadata({
  title: PROPERTY_PURCHASE_TOOL.seo.title,
  description: PROPERTY_PURCHASE_TOOL.seo.description,
  path: toolHref(PROPERTY_PURCHASE_TOOL),
});

export default function Page() {
  return (
    <ToolPage
      tool={PROPERTY_PURCHASE_TOOL}
      faqs={PROPERTY_PURCHASE_FAQS}
      limitsHeading={{ lines: ['What this'], accent: 'does not cover' }}
      cta={{
        heading: 'Buying is the easy half.',
        body: 'Stamp duty, capital value tax and the registration fee are provincial and sit on top of this. We handle property transactions end to end, including the filing that makes the filer rate available next time.',
        buttonLabel: 'Talk to us about property',
        buttonHref: '/contact?service=income-tax-filing',
      }}
      related={['property-sale-tax', 'property-capital-gains', 'rental-income-tax']}
    >
      <PropertyPurchaseCalculator />
    </ToolPage>
  );
}
