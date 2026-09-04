import type { Metadata } from 'next';
import { ToolPage } from '@/components/sections/ToolPage';
import { CorporateTaxCalculator } from '@/components/sections/BusinessCalculators';
import { CORPORATE_TAX_TOOL, CORPORATE_TAX_FAQS, toolHref } from '@/content/tools';
import { toolMetadata } from '@/lib/seo';

/**
 * /tools/corporate-tax
 *
 * Structure, breadcrumbs, schema and the section order all come from
 * ToolPage; see the note at the top of components/sections/ToolPage.tsx for
 * why ten near-identical pages are one component rather than ten files. What
 * is here is what is genuinely particular to this calculator: its copy (in
 * content/tools.ts), its arithmetic (in lib/tax/) and its questions.
 */

export const metadata: Metadata = toolMetadata({
  title: CORPORATE_TAX_TOOL.seo.title,
  description: CORPORATE_TAX_TOOL.seo.description,
  path: toolHref(CORPORATE_TAX_TOOL),
});

export default function Page() {
  return (
    <ToolPage
      tool={CORPORATE_TAX_TOOL}
      faqs={CORPORATE_TAX_FAQS}
      limitsHeading={{ lines: ['What this'], accent: 'does not cover' }}
      cta={{
        heading: 'Taxable income is the hard part.',
        body: 'The gap between accounting profit and taxable income is where a company return is won or lost. We prepare company computations, returns and the compliance around them.',
        buttonLabel: 'Talk to us about your company',
        buttonHref: '/contact?service=income-tax-filing',
      }}
      related={['business-tax', 'minimum-turnover-tax', 'super-tax']}
    >
      <CorporateTaxCalculator />
    </ToolPage>
  );
}
