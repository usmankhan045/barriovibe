import type { Metadata } from 'next';
import { ToolPage } from '@/components/sections/ToolPage';
import { SalaryIncrementCalculator } from '@/components/sections/SalaryToolCalculators';
import { SALARY_INCREMENT_TOOL, SALARY_INCREMENT_FAQS, toolHref } from '@/content/tools';
import { pageMetadata } from '@/lib/seo';

/**
 * /tools/salary-increment
 *
 * Structure, breadcrumbs, schema and the section order all come from
 * ToolPage; see the note at the top of components/sections/ToolPage.tsx for
 * why ten near-identical pages are one component rather than ten files. What
 * is here is what is genuinely particular to this calculator: its copy (in
 * content/tools.ts), its arithmetic (in lib/tax/) and its questions.
 */

export const metadata: Metadata = pageMetadata({
  title: SALARY_INCREMENT_TOOL.seo.title,
  description: SALARY_INCREMENT_TOOL.seo.description,
  path: toolHref(SALARY_INCREMENT_TOOL),
});

export default function Page() {
  return (
    <ToolPage
      tool={SALARY_INCREMENT_TOOL}
      faqs={SALARY_INCREMENT_FAQS}
      limitsHeading={{ lines: ['What this'], accent: 'does not do' }}
      cta={{
        heading: 'Worth checking the whole picture.',
        body: 'A raise changes what you can claim as well as what you are taxed. We file returns for salaried individuals and set out the reliefs most people never claim.',
        buttonLabel: 'Talk to us about filing',
        buttonHref: '/contact?service=income-tax-filing',
      }}
      related={['salary-tax', 'reverse-salary', 'job-offer-comparison']}
    >
      <SalaryIncrementCalculator />
    </ToolPage>
  );
}
