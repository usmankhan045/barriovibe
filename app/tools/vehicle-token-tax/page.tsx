import type { Metadata } from 'next';
import { ToolPage } from '@/components/sections/ToolPage';
import { TokenTaxCalculator } from '@/components/sections/ProvincialCalculators';
import { TOKEN_TAX_TOOL, TOKEN_TAX_FAQS, toolHref } from '@/content/tools';
import { toolMetadata } from '@/lib/seo';

/**
 * /tools/vehicle-token-tax
 *
 * Structure, breadcrumbs, schema and section order come from ToolPage. What is
 * particular to this calculator is its copy (content/tools.ts), its arithmetic
 * (lib/tax/) and its questions.
 */

export const metadata: Metadata = toolMetadata({
  title: TOKEN_TAX_TOOL.seo.title,
  description: TOKEN_TAX_TOOL.seo.description,
  path: toolHref(TOKEN_TAX_TOOL),
});

export default function Page() {
  return (
    <ToolPage
      tool={TOKEN_TAX_TOOL}
      faqs={TOKEN_TAX_FAQS}
      limitsHeading={{ lines: ['What this'], accent: 'does not cover' }}
      cta={{
        heading: 'The federal half is where filing pays.',
        body: 'Your provincial token is the same either way, but the section 234 tax collected with it doubles for a non-filer, every year, on every vehicle you own.',
        buttonLabel: 'Talk to us about filing',
        buttonHref: '/contact?service=income-tax-filing',
      }}
      related={['vehicle-tax', 'cash-withdrawal-tax', 'electricity-bill-tax']}
    >
      <TokenTaxCalculator />
    </ToolPage>
  );
}
