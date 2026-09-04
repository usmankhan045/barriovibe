import type { Metadata } from 'next';
import { ToolPage } from '@/components/sections/ToolPage';
import { TelecomTaxCalculator } from '@/components/sections/ConsumerCalculators';
import { TELECOM_TOOL, TELECOM_FAQS, toolHref } from '@/content/tools';
import { pageMetadata } from '@/lib/seo';

/**
 * /tools/mobile-internet-tax
 *
 * Structure, breadcrumbs, schema and section order come from ToolPage. What is
 * particular to this calculator is its copy (content/tools.ts), its arithmetic
 * (lib/tax/) and its questions.
 */

export const metadata: Metadata = pageMetadata({
  title: TELECOM_TOOL.seo.title,
  description: TELECOM_TOOL.seo.description,
  path: toolHref(TELECOM_TOOL),
});

export default function Page() {
  return (
    <ToolPage
      tool={TELECOM_TOOL}
      faqs={TELECOM_FAQS}
      limitsHeading={{ lines: ['What this'], accent: 'does not cover' }}
      cta={{
        heading: 'Small amounts, every day, all year.',
        body: 'Section 236 is adjustable against your yearly tax, and almost nobody claims it. We file returns that put every withholding you have already paid onto them.',
        buttonLabel: 'Talk to us about filing',
        buttonHref: '/contact?service=income-tax-filing',
      }}
      related={['electricity-bill-tax', 'cash-withdrawal-tax', 'salary-tax']}
    >
      <TelecomTaxCalculator />
    </ToolPage>
  );
}
