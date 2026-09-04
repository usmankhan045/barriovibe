import type { Metadata } from 'next';
import { ToolPage } from '@/components/sections/ToolPage';
import { SecuritiesGainsCalculator } from '@/components/sections/InvestmentCalculators';
import { SECURITIES_GAINS_TOOL, SECURITIES_GAINS_FAQS, toolHref } from '@/content/tools';
import { pageMetadata } from '@/lib/seo';

/**
 * /tools/capital-gains-tax
 *
 * Structure, breadcrumbs, schema and section order come from ToolPage. What is
 * particular to this calculator is its copy (content/tools.ts), its arithmetic
 * (lib/tax/) and its questions.
 */

export const metadata: Metadata = pageMetadata({
  title: SECURITIES_GAINS_TOOL.seo.title,
  description: SECURITIES_GAINS_TOOL.seo.description,
  path: toolHref(SECURITIES_GAINS_TOOL),
});

export default function Page() {
  return (
    <ToolPage
      tool={SECURITIES_GAINS_TOOL}
      faqs={SECURITIES_GAINS_FAQS}
      limitsHeading={{ lines: ['What this'], accent: 'does not cover' }}
      cta={{
        heading: 'One disposal is not a tax year.',
        body: 'Losses elsewhere in the year are set against gains before anything is owed, and a non-filer\'s rate depends on their whole income. We prepare returns that put the year together.',
        buttonLabel: 'Talk to us about filing',
        buttonHref: '/contact?service=income-tax-filing',
      }}
      related={['mutual-fund-tax', 'property-capital-gains', 'salary-tax']}
    >
      <SecuritiesGainsCalculator />
    </ToolPage>
  );
}
