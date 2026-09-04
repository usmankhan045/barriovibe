import type { Metadata } from 'next';
import { ToolPage } from '@/components/sections/ToolPage';
import { SuperTaxCalculator } from '@/components/sections/BusinessCalculators';
import { SUPER_TAX_TOOL, SUPER_TAX_FAQS, toolHref } from '@/content/tools';
import { pageMetadata } from '@/lib/seo';

/**
 * /tools/super-tax
 *
 * Structure, breadcrumbs, schema and the section order all come from
 * ToolPage; see the note at the top of components/sections/ToolPage.tsx for
 * why ten near-identical pages are one component rather than ten files. What
 * is here is what is genuinely particular to this calculator: its copy (in
 * content/tools.ts), its arithmetic (in lib/tax/) and its questions.
 */

export const metadata: Metadata = pageMetadata({
  title: SUPER_TAX_TOOL.seo.title,
  description: SUPER_TAX_TOOL.seo.description,
  path: toolHref(SUPER_TAX_TOOL),
});

export default function Page() {
  return (
    <ToolPage
      tool={SUPER_TAX_TOOL}
      faqs={SUPER_TAX_FAQS}
      limitsHeading={{ lines: ['What this'], accent: 'does not cover' }}
      cta={{
        heading: 'Section 4C sits on top of everything else.',
        body: 'It is charged alongside ordinary income tax, and the income figure it uses is defined by the section rather than by your computation. We handle both.',
        buttonLabel: 'Talk to us about your company',
        buttonHref: '/contact?service=income-tax-filing',
      }}
      related={['corporate-tax', 'minimum-turnover-tax', 'business-tax']}
    >
      <SuperTaxCalculator />
    </ToolPage>
  );
}
