/**
 * Which guides, calculators and posts stand behind which service.
 *
 * ── Why this file exists ──
 *
 * The site had two halves that never spoke. Forty-odd guides, two dozen
 * calculators and a blog earned whatever reading and linking they earned, and
 * none of it reached the service pages, because not one guide linked to the
 * service that does the thing it explains, and no service page linked to the
 * guide that proves the firm understands it. In September 2026 that was
 * measurable: the service pages had no impressions for their own names while
 * the guides beside them were the site's best-ranked pages.
 *
 * A search engine reads a service page with six specific, dated, sourced
 * guides pointing at it as the page of a firm that knows the subject. The same
 * page standing alone reads as a brochure. So every entry below is a claim that
 * this piece of writing is the evidence for that service, and it is rendered in
 * both directions: the service page lists its pieces, and each piece names the
 * service that does the work.
 *
 * ── Maintaining this ──
 *
 * Slugs only. A slug naming a guide or post that is not published yet is fine:
 * the renderers filter on the published lists, so a scheduled guide appears on
 * its service page the build it goes live, with nothing to remember. A slug
 * naming something that does not exist at all fails `pnpm check:content`.
 *
 * Order is display order, strongest evidence first. Leave a service out rather
 * than padding it: a list of loosely related links is worse than none, because
 * it tells the reader and the crawler alike that the connection is decoration.
 */

export interface ServiceLinks {
  guides?: string[];
  tools?: string[];
  posts?: string[];
}

export const SERVICE_LINKS: Record<string, ServiceLinks> = {
  /* ── Software & AI ─────────────────────────────────────────────────── */
  'web-development': {
    posts: [
      'what-a-website-costs-by-scope-decision',
      'do-you-need-an-app-or-a-website',
      'you-probably-do-not-own-the-code',
      'fixed-price-or-time-and-materials',
      'what-happens-when-the-agency-disappears',
      'build-or-buy',
    ],
  },
  'app-development': {
    posts: [
      'app-store-rejection-what-actually-blocks-you',
      'do-you-need-an-app-or-a-website',
      'ios-pwa-what-changed',
      'you-probably-do-not-own-the-code',
    ],
  },
  'agentic-ai-development': {
    posts: [
      'what-an-ai-agent-costs-to-run',
      'is-your-business-ready-for-an-ai-agent',
      'how-to-evaluate-an-agent',
      'stopping-an-agent-burning-money',
      'security-questions-before-an-agent-touches-production',
      'agent-washing-auditing-a-vendor-claim',
    ],
  },
  'rag-development': {
    posts: [
      'how-to-tell-if-your-rag-system-is-lying',
      'why-your-rag-returns-wrong-answers',
      'does-your-data-train-the-model',
      'how-to-stop-ai-making-things-up',
    ],
  },
  'digital-fte': {
    posts: [
      'ai-helps-your-newest-staff-most',
      'the-ai-redundancy-that-was-reversed',
      'what-an-ai-agent-costs-to-run',
      'what-to-monitor-once-an-agent-is-live',
    ],
  },
  'workflow-automation': {
    posts: [
      'n8n-zapier-make-real-cost',
      'when-automation-actually-pays',
      'what-to-automate-first',
      'what-automates-badly',
      'when-your-spreadsheet-becomes-a-system',
    ],
  },
  'chatbot-development': {
    posts: [
      'whatsapp-chatbot-real-cost-pakistan',
      'what-a-chatbot-costs-by-what-it-does',
      'agent-chatbot-or-a-form',
      'who-is-liable-when-the-chatbot-is-wrong',
    ],
  },
  'ai-prompt-engineering': {
    posts: [
      'should-your-business-have-an-ai-policy',
      'how-to-stop-ai-making-things-up',
      'does-your-data-train-the-model',
    ],
  },

  /* ── Marketing & E-commerce ────────────────────────────────────────── */
  'platform-monetization': {
    guides: ['tax-on-youtube-and-social-media-income'],
  },
  'shopify-store-development': {
    guides: ['tax-on-selling-online'],
    posts: ['shopify-payments-pakistan'],
  },
  'ecommerce-management': {
    guides: ['tax-on-selling-online', 'sales-tax-registration'],
    posts: ['shopify-payments-pakistan'],
  },

  /* ── Finance & Tax ─────────────────────────────────────────────────── */
  'ntn-registration': {
    guides: [
      'how-to-get-an-ntn',
      'ntn-registration-documents',
      'how-to-become-a-filer',
      'check-your-atl-status',
      'tax-for-freelancers',
    ],
    tools: ['freelancer-tax', 'salary-tax'],
  },
  'income-tax-filing': {
    guides: [
      'how-to-file-your-tax-return',
      'filer-vs-non-filer',
      'how-to-become-a-filer',
      'check-your-atl-status',
      'how-to-pay-fbr-tax',
      'iris-login-and-account-recovery',
      'how-to-get-a-tax-refund',
      'tax-for-freelancers',
      'tax-on-rental-income',
    ],
    tools: ['salary-tax', 'freelancer-tax', 'business-tax', 'rental-income-tax'],
  },
  'sales-tax-registration-filing': {
    guides: ['sales-tax-registration', 'filing-a-sales-tax-return', 'tax-on-selling-online'],
  },
  'withholding-tax-statements': {
    guides: [
      'withholding-statements-section-165',
      'advance-tax-section-147',
      'paying-foreign-suppliers',
    ],
    tools: ['rates/withholding', 'cash-withdrawal-tax'],
  },
  'tax-advisory': {
    guides: [
      'when-fbr-amends-your-assessment',
      'appealing-an-fbr-order',
      'selected-for-tax-audit',
      'how-fbr-recovers-unpaid-tax',
      'exemption-and-lower-rate-certificates',
      'tax-on-gifts-and-inheritance',
    ],
    tools: ['super-tax', 'minimum-turnover-tax'],
  },
  'financial-accounting': {
    guides: ['company-annual-compliance', 'depreciation-on-business-assets'],
    tools: ['corporate-tax', 'business-tax'],
  },
  bookkeeping: {
    guides: ['depreciation-on-business-assets', 'landlord-tax-deductions'],
    tools: ['business-tax'],
  },
  'audit-assurance': {
    guides: ['company-annual-compliance'],
  },
  'financial-advisory': {
    tools: ['corporate-tax', 'super-tax', 'minimum-turnover-tax'],
  },

  /* ── Corporate & Legal ─────────────────────────────────────────────── */
  'company-registration': {
    guides: [
      'secp-company-registration',
      'smc-vs-private-limited-vs-sole-proprietor',
      'registering-a-partnership-firm',
      'company-annual-compliance',
      'how-to-get-an-ntn',
    ],
    tools: ['corporate-tax', 'business-tax'],
  },
  'corporate-secretarial-compliance': {
    guides: ['company-annual-compliance', 'secp-company-registration'],
  },
  'npo-registration': {
    guides: ['non-profit-tax-status'],
  },
  'pseb-registration': {
    guides: [
      'pseb-registration-and-the-025-rate',
      'tax-for-freelancers',
      'exemption-and-lower-rate-certificates',
    ],
    tools: ['freelancer-tax'],
  },
  'import-export-license': {
    guides: ['paying-foreign-suppliers'],
  },
  'contract-drafting': {
    posts: ['you-probably-do-not-own-the-code', 'who-owns-what-the-ai-wrote'],
  },

  /* ── Intellectual Property ─────────────────────────────────────────── */
  'trademark-registration': {
    guides: ['trademark-registration-cost'],
  },
  'copyright-registration': {
    posts: ['who-owns-what-the-ai-wrote'],
  },

  /* ── International Expansion ───────────────────────────────────────── */
  'us-company-formation': {
    guides: [
      'us-llc-annual-compliance',
      'us-llc-foreign-asset-declaration',
      'can-a-pakistani-company-own-a-foreign-entity',
      'receiving-money-from-abroad',
    ],
    posts: ['us-llc-filings-pakistani-founders-miss'],
  },
  'us-tax-filing': {
    guides: ['us-llc-annual-compliance', 'us-llc-foreign-asset-declaration'],
    posts: ['us-llc-filings-pakistani-founders-miss'],
  },
  'us-bookkeeping-payroll': {
    guides: ['us-llc-annual-compliance'],
  },
  'saudi-business-setup': {
    guides: ['can-a-pakistani-company-own-a-foreign-entity'],
  },
  'uae-tax-bookkeeping': {
    guides: [
      'can-a-pakistani-company-own-a-foreign-entity',
      'tax-residency-for-overseas-pakistanis',
      'overseas-pakistani-tax-obligations',
    ],
  },
  'uk-company-formation': {
    guides: ['can-a-pakistani-company-own-a-foreign-entity', 'receiving-money-from-abroad'],
  },
};
