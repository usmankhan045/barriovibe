import type { Metadata } from 'next';
import { ToolPage } from '@/components/sections/ToolPage';
import { BusinessTaxCalculator } from '@/components/sections/BusinessCalculators';
import { BUSINESS_TAX_TOOL, BUSINESS_TAX_FAQS, toolHref } from '@/content/tools';
import { pageMetadata } from '@/lib/seo';

/**
 * /tools/business-tax
 *
 * Structure, breadcrumbs, schema and the section order all come from
 * ToolPage; see the note at the top of components/sections/ToolPage.tsx for
 * why ten near-identical pages are one component rather than ten files. What
 * is here is what is genuinely particular to this calculator: its copy (in
 * content/tools.ts), its arithmetic (in lib/tax/) and its questions.
 */

export const metadata: Metadata = pageMetadata({
  title: BUSINESS_TAX_TOOL.seo.title,
  description: BUSINESS_TAX_TOOL.seo.description,
  path: toolHref(BUSINESS_TAX_TOOL),
});

export default function Page() {
  return (
    <ToolPage
      tool={BUSINESS_TAX_TOOL}
      faqs={BUSINESS_TAX_FAQS}
      limitsHeading={{ lines: ['What this'], accent: 'does not cover' }}
      cta={{
        heading: 'A business return is more than a slab.',
        body: 'What is deductible, what is carried forward and what has already been withheld all sit between this figure and what you actually pay. We prepare and file business and AOP returns.',
        buttonLabel: 'Talk to us about your return',
        buttonHref: '/contact?service=income-tax-filing',
      }}
      related={['corporate-tax', 'minimum-turnover-tax', 'freelancer-tax']}
    >
      <BusinessTaxCalculator />
    </ToolPage>
  );
}
