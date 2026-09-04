import type { Metadata } from 'next';
import { ToolPage } from '@/components/sections/ToolPage';
import { ReverseSalaryCalculator } from '@/components/sections/SalaryToolCalculators';
import { REVERSE_SALARY_TOOL, REVERSE_SALARY_FAQS, toolHref } from '@/content/tools';
import { pageMetadata } from '@/lib/seo';

/**
 * /tools/reverse-salary
 *
 * Structure, breadcrumbs, schema and the section order all come from
 * ToolPage; see the note at the top of components/sections/ToolPage.tsx for
 * why ten near-identical pages are one component rather than ten files. What
 * is here is what is genuinely particular to this calculator: its copy (in
 * content/tools.ts), its arithmetic (in lib/tax/) and its questions.
 */

export const metadata: Metadata = pageMetadata({
  title: REVERSE_SALARY_TOOL.seo.title,
  description: REVERSE_SALARY_TOOL.seo.description,
  path: toolHref(REVERSE_SALARY_TOOL),
});

export default function Page() {
  return (
    <ToolPage
      tool={REVERSE_SALARY_TOOL}
      faqs={REVERSE_SALARY_FAQS}
      limitsHeading={{ lines: ['What this'], accent: 'does not do' }}
      cta={{
        heading: 'The gross is only half the negotiation.',
        body: 'Reliefs change what a given gross is worth to you. We file returns for salaried individuals with a computation you can follow line by line.',
        buttonLabel: 'Talk to us about filing',
        buttonHref: '/contact?service=income-tax-filing',
      }}
      related={['salary-tax', 'salary-increment', 'job-offer-comparison']}
    >
      <ReverseSalaryCalculator />
    </ToolPage>
  );
}
