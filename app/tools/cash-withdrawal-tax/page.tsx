import type { Metadata } from 'next';
import { ToolPage } from '@/components/sections/ToolPage';
import { CashWithdrawalCalculator } from '@/components/sections/WithholdingCalculators';
import { CASH_WITHDRAWAL_TOOL, CASH_WITHDRAWAL_FAQS, toolHref } from '@/content/tools';
import { pageMetadata } from '@/lib/seo';

/**
 * /tools/cash-withdrawal-tax
 *
 * Structure, breadcrumbs, schema and the section order all come from
 * ToolPage; see the note at the top of components/sections/ToolPage.tsx for
 * why ten near-identical pages are one component rather than ten files. What
 * is here is what is genuinely particular to this calculator: its copy (in
 * content/tools.ts), its arithmetic (in lib/tax/) and its questions.
 */

export const metadata: Metadata = pageMetadata({
  title: CASH_WITHDRAWAL_TOOL.seo.title,
  description: CASH_WITHDRAWAL_TOOL.seo.description,
  path: toolHref(CASH_WITHDRAWAL_TOOL),
});

export default function Page() {
  return (
    <ToolPage
      tool={CASH_WITHDRAWAL_TOOL}
      faqs={CASH_WITHDRAWAL_FAQS}
      limitsHeading={{ lines: ['What this'], accent: 'does not cover' }}
      cta={{
        heading: 'This money is only refundable if you file.',
        body: 'Section 231AB is adjustable against your yearly tax, but nobody claims it for you. We file income tax returns and put the withholding you have already paid on them.',
        buttonLabel: 'Talk to us about filing',
        buttonHref: '/contact?service=income-tax-filing',
      }}
      related={['freelancer-tax', 'salary-tax', 'business-tax']}
    >
      <CashWithdrawalCalculator />
    </ToolPage>
  );
}
