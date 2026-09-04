import type { Metadata } from 'next';
import { ToolPage } from '@/components/sections/ToolPage';
import { MultiYearSalaryCalculator } from '@/components/sections/SalaryToolCalculators';
import { MULTI_YEAR_SALARY_TOOL, MULTI_YEAR_SALARY_FAQS, toolHref } from '@/content/tools';
import { toolMetadata } from '@/lib/seo';

/**
 * /tools/multi-year-salary-tax
 *
 * Structure, breadcrumbs, schema and the section order all come from
 * ToolPage; see the note at the top of components/sections/ToolPage.tsx for
 * why ten near-identical pages are one component rather than ten files. What
 * is here is what is genuinely particular to this calculator: its copy (in
 * content/tools.ts), its arithmetic (in lib/tax/) and its questions.
 */

export const metadata: Metadata = toolMetadata({
  title: MULTI_YEAR_SALARY_TOOL.seo.title,
  description: MULTI_YEAR_SALARY_TOOL.seo.description,
  path: toolHref(MULTI_YEAR_SALARY_TOOL),
});

export default function Page() {
  return (
    <ToolPage
      tool={MULTI_YEAR_SALARY_TOOL}
      faqs={MULTI_YEAR_SALARY_FAQS}
      limitsHeading={{ lines: ['What this'], accent: 'cannot settle' }}
      cta={{
        heading: 'A number is not a filed return.',
        body: 'We file income tax returns through FBR IRIS for salaried individuals, including years with more than one employer, where the reconciliation is the whole job. Individuals file by 30 September.',
        buttonLabel: 'Talk to us about filing',
        buttonHref: '/contact?service=income-tax-filing',
      }}
      related={['salary-tax', 'salary-increment', 'job-offer-comparison']}
    >
      <MultiYearSalaryCalculator />
    </ToolPage>
  );
}
