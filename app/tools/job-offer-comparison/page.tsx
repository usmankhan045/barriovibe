import type { Metadata } from 'next';
import { ToolPage } from '@/components/sections/ToolPage';
import { JobOfferCalculator } from '@/components/sections/SalaryToolCalculators';
import { JOB_OFFER_TOOL, JOB_OFFER_FAQS, toolHref } from '@/content/tools';
import { toolMetadata } from '@/lib/seo';

/**
 * /tools/job-offer-comparison
 *
 * Structure, breadcrumbs, schema and the section order all come from
 * ToolPage; see the note at the top of components/sections/ToolPage.tsx for
 * why ten near-identical pages are one component rather than ten files. What
 * is here is what is genuinely particular to this calculator: its copy (in
 * content/tools.ts), its arithmetic (in lib/tax/) and its questions.
 */

export const metadata: Metadata = toolMetadata({
  title: JOB_OFFER_TOOL.seo.title,
  description: JOB_OFFER_TOOL.seo.description,
  path: toolHref(JOB_OFFER_TOOL),
});

export default function Page() {
  return (
    <ToolPage
      tool={JOB_OFFER_TOOL}
      faqs={JOB_OFFER_FAQS}
      limitsHeading={{ lines: ['What this'], accent: 'does not weigh' }}
      cta={{
        heading: 'Changing jobs mid-year changes your tax.',
        body: 'Two employers in one tax year almost never withhold the right amount between them. We file returns for salaried individuals and settle the difference.',
        buttonLabel: 'Talk to us about filing',
        buttonHref: '/contact?service=income-tax-filing',
      }}
      related={['salary-tax', 'multi-year-salary-tax', 'reverse-salary']}
    >
      <JobOfferCalculator />
    </ToolPage>
  );
}
