import type { Metadata } from 'next';
import { ToolPage } from '@/components/sections/ToolPage';
import { MinimumTurnoverTaxCalculator } from '@/components/sections/BusinessCalculators';
import { MINIMUM_TURNOVER_TAX_TOOL, MINIMUM_TURNOVER_TAX_FAQS, toolHref } from '@/content/tools';
import { toolMetadata } from '@/lib/seo';

/**
 * /tools/minimum-turnover-tax
 *
 * Structure, breadcrumbs, schema and the section order all come from
 * ToolPage; see the note at the top of components/sections/ToolPage.tsx for
 * why ten near-identical pages are one component rather than ten files. What
 * is here is what is genuinely particular to this calculator: its copy (in
 * content/tools.ts), its arithmetic (in lib/tax/) and its questions.
 */

export const metadata: Metadata = toolMetadata({
  title: MINIMUM_TURNOVER_TAX_TOOL.seo.title,
  description: MINIMUM_TURNOVER_TAX_TOOL.seo.description,
  path: toolHref(MINIMUM_TURNOVER_TAX_TOOL),
});

export default function Page() {
  return (
    <ToolPage
      tool={MINIMUM_TURNOVER_TAX_TOOL}
      faqs={MINIMUM_TURNOVER_TAX_FAQS}
      limitsHeading={{ lines: ['What this'], accent: 'does not cover' }}
      cta={{
        heading: 'A minimum tax year needs planning, not arithmetic.',
        body: 'Which sector rate applies, what turnover is excluded, and how much carried-forward tax you can actually use are questions your accounts have to answer. We prepare company and business returns.',
        buttonLabel: 'Talk to us about your return',
        buttonHref: '/contact?service=income-tax-filing',
      }}
      related={['corporate-tax', 'business-tax', 'super-tax']}
    >
      <MinimumTurnoverTaxCalculator />
    </ToolPage>
  );
}
