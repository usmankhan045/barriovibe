import type { Metadata } from 'next';
import { ToolPage } from '@/components/sections/ToolPage';
import { PropertyGainsCalculator } from '@/components/sections/PropertyCalculators';
import { PROPERTY_GAINS_TOOL, PROPERTY_GAINS_FAQS, toolHref } from '@/content/tools';
import { toolMetadata } from '@/lib/seo';

/**
 * /tools/property-capital-gains
 *
 * Structure, breadcrumbs, schema and section order come from ToolPage. What is
 * particular to this calculator is its copy (content/tools.ts), its arithmetic
 * (lib/tax/) and its questions.
 */

export const metadata: Metadata = toolMetadata({
  title: PROPERTY_GAINS_TOOL.seo.title,
  description: PROPERTY_GAINS_TOOL.seo.description,
  path: toolHref(PROPERTY_GAINS_TOOL),
});

export default function Page() {
  return (
    <ToolPage
      tool={PROPERTY_GAINS_TOOL}
      faqs={PROPERTY_GAINS_FAQS}
      limitsHeading={{ lines: ['What this'], accent: 'cannot know' }}
      cta={{
        heading: 'The gain is only as good as the paperwork.',
        body: 'What you can substantiate as cost is what reduces the tax, and a non-filer\'s rate depends on their whole year. We prepare property capital gains computations and the returns that carry them.',
        buttonLabel: 'Talk to us about your sale',
        buttonHref: '/contact?service=income-tax-filing',
      }}
      related={['property-sale-tax', 'property-purchase-tax', 'rental-income-tax']}
    >
      <PropertyGainsCalculator />
    </ToolPage>
  );
}
