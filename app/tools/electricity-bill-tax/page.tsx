import type { Metadata } from 'next';
import { ToolPage } from '@/components/sections/ToolPage';
import { ElectricityBillCalculator } from '@/components/sections/ConsumerCalculators';
import { ELECTRICITY_TOOL, ELECTRICITY_FAQS, toolHref } from '@/content/tools';
import { toolMetadata } from '@/lib/seo';

/**
 * /tools/electricity-bill-tax
 *
 * Structure, breadcrumbs, schema and section order come from ToolPage. What is
 * particular to this calculator is its copy (content/tools.ts), its arithmetic
 * (lib/tax/) and its questions.
 */

export const metadata: Metadata = toolMetadata({
  title: ELECTRICITY_TOOL.seo.title,
  description: ELECTRICITY_TOOL.seo.description,
  path: toolHref(ELECTRICITY_TOOL),
});

export default function Page() {
  return (
    <ToolPage
      tool={ELECTRICITY_TOOL}
      faqs={ELECTRICITY_FAQS}
      limitsHeading={{ lines: ['What this'], accent: 'does not cover' }}
      cta={{
        heading: 'A home meter should be paying nothing.',
        body: 'If you are on the Active Taxpayer List, section 235 does not touch a domestic bill at any amount. If it is on your bill, that is worth fixing.',
        buttonLabel: 'Talk to us about filing',
        buttonHref: '/contact?service=income-tax-filing',
      }}
      related={['mobile-internet-tax', 'cash-withdrawal-tax', 'vehicle-token-tax']}
    >
      <ElectricityBillCalculator />
    </ToolPage>
  );
}
