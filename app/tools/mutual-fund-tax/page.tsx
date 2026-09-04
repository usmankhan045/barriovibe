import type { Metadata } from 'next';
import { ToolPage } from '@/components/sections/ToolPage';
import { MutualFundCalculator } from '@/components/sections/InvestmentCalculators';
import { MUTUAL_FUND_TOOL, MUTUAL_FUND_FAQS, toolHref } from '@/content/tools';
import { pageMetadata } from '@/lib/seo';

/**
 * /tools/mutual-fund-tax
 *
 * Structure, breadcrumbs, schema and section order come from ToolPage. What is
 * particular to this calculator is its copy (content/tools.ts), its arithmetic
 * (lib/tax/) and its questions.
 */

export const metadata: Metadata = pageMetadata({
  title: MUTUAL_FUND_TOOL.seo.title,
  description: MUTUAL_FUND_TOOL.seo.description,
  path: toolHref(MUTUAL_FUND_TOOL),
});

export default function Page() {
  return (
    <ToolPage
      tool={MUTUAL_FUND_TOOL}
      faqs={MUTUAL_FUND_FAQS}
      limitsHeading={{ lines: ['What this'], accent: 'does not cover' }}
      cta={{
        heading: 'Deducted is not the same as final.',
        body: 'A fund deducts on redemption, but your year may look different once losses and other income are in it. We prepare returns for investors.',
        buttonLabel: 'Talk to us about filing',
        buttonHref: '/contact?service=income-tax-filing',
      }}
      related={['capital-gains-tax', 'salary-tax', 'business-tax']}
    >
      <MutualFundCalculator />
    </ToolPage>
  );
}
