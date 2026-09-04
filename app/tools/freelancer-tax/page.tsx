import type { Metadata } from 'next';
import { ToolPage } from '@/components/sections/ToolPage';
import { FreelancerTaxCalculator } from '@/components/sections/WithholdingCalculators';
import { FREELANCER_TAX_TOOL, FREELANCER_TAX_FAQS, toolHref } from '@/content/tools';
import { toolMetadata } from '@/lib/seo';

/**
 * /tools/freelancer-tax
 *
 * Structure, breadcrumbs, schema and the section order all come from
 * ToolPage; see the note at the top of components/sections/ToolPage.tsx for
 * why ten near-identical pages are one component rather than ten files. What
 * is here is what is genuinely particular to this calculator: its copy (in
 * content/tools.ts), its arithmetic (in lib/tax/) and its questions.
 */

export const metadata: Metadata = toolMetadata({
  title: FREELANCER_TAX_TOOL.seo.title,
  description: FREELANCER_TAX_TOOL.seo.description,
  path: toolHref(FREELANCER_TAX_TOOL),
});

export default function Page() {
  return (
    <ToolPage
      tool={FREELANCER_TAX_TOOL}
      faqs={FREELANCER_TAX_FAQS}
      limitsHeading={{ lines: ['What this'], accent: 'does not cover' }}
      cta={{
        heading: 'Filing is what keeps the rate low.',
        body: 'Falling off the Active Taxpayer List doubles your section 154A rate. We file returns for freelancers and IT exporters and keep the registration side in order.',
        buttonLabel: 'Talk to us about filing',
        buttonHref: '/contact?service=income-tax-filing',
      }}
      related={['business-tax', 'cash-withdrawal-tax', 'salary-tax']}
    >
      <FreelancerTaxCalculator />
    </ToolPage>
  );
}
