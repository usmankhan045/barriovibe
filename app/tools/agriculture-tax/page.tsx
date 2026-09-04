import type { Metadata } from 'next';
import { ToolPage } from '@/components/sections/ToolPage';
import { AgricultureTaxCalculator } from '@/components/sections/ProvincialCalculators';
import { AGRICULTURE_TAX_TOOL, AGRICULTURE_FAQS, toolHref } from '@/content/tools';
import { toolMetadata } from '@/lib/seo';

/**
 * /tools/agriculture-tax
 *
 * Structure, breadcrumbs, schema and section order come from ToolPage. What is
 * particular to this calculator is its copy (content/tools.ts), its arithmetic
 * (lib/tax/) and its questions.
 */

export const metadata: Metadata = toolMetadata({
  title: AGRICULTURE_TAX_TOOL.seo.title,
  description: AGRICULTURE_TAX_TOOL.seo.description,
  path: toolHref(AGRICULTURE_TAX_TOOL),
});

export default function Page() {
  return (
    <ToolPage
      tool={AGRICULTURE_TAX_TOOL}
      faqs={AGRICULTURE_FAQS}
      limitsHeading={{ lines: ['What this'], accent: 'cannot settle' }}
      cta={{
        heading: 'Provincial and federal are two returns.',
        body: 'Agricultural income is exempt federally but taxable provincially, and what counts as agricultural is narrower than what happens on a farm. Getting the line right is the work.',
        buttonLabel: 'Talk to us about your farm',
        buttonHref: '/contact?service=income-tax-filing',
      }}
      related={['business-tax', 'rental-income-tax', 'salary-tax']}
    >
      <AgricultureTaxCalculator />
    </ToolPage>
  );
}
