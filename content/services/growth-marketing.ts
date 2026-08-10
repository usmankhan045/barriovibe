import type { Service } from '../types';

/**
 * Pillar 04 — Growth & Marketing.
 *
 * Demand only; the storefront and marketplace work lives in `ecommerce.ts`.
 * Copy here deliberately reports against revenue and cost per acquisition
 * rather than reach or impressions. Monetization in particular is written to
 * set honest expectations: platform approval is never guaranteed by anyone.
 */
export const GROWTH_SERVICES: Service[] = [
  {
    slug: 'social-media-management',
    pillar: 'growth-marketing',
    title: 'Social Media Management',
    navLabel: 'Social Media',
    oneLiner:
      'Content planned, produced and published across every platform you are on, with community management and monthly reporting.',
    intro:
      'We run your social presence end to end: strategy, content calendar, design and copy, scheduling, and replying to the people who comment. Across Instagram, Facebook, LinkedIn, TikTok, YouTube and X, adapted per platform rather than the same post cross-published five times.',
    icon: 'megaphone',
    included: [
      'Platform strategy and a monthly content calendar agreed in advance',
      'Graphic design, short-form video editing and caption copywriting',
      'Scheduling and publishing across all active platforms',
      'Community management: comments, DMs and mentions answered daily',
      'Hashtag, trend and competitor monitoring',
      'Monthly report on reach, engagement, follower growth and link clicks',
    ],
    audience: ['Brands with no in-house team', 'Businesses posting inconsistently', 'Companies entering new platforms'],
    steps: [
      {
        title: 'Audit & strategy',
        description:
          'Existing accounts, audience and competitors reviewed; we agree which platforms deserve effort and which are a distraction.',
        duration: '1 week',
      },
      {
        title: 'Content system',
        description:
          'Visual direction, content pillars and posting cadence established, with the first month’s calendar approved before anything publishes.',
        duration: '1–2 weeks',
      },
      {
        title: 'Produce & publish',
        description:
          'Content designed, written, scheduled and published to the agreed cadence, with community management running daily.',
        duration: 'Ongoing',
      },
      {
        title: 'Review',
        description:
          'Monthly performance review against the previous month, with the next calendar shaped by what actually worked.',
        duration: 'Monthly',
      },
    ],
    deliverables: [
      'An approved monthly content calendar',
      'All designed graphics and edited video assets, source files included',
      'Published posts across every agreed platform',
      'Monthly performance report with commentary and next actions',
    ],
    documents: [],
    turnaround: 'Ongoing, with content approved a month ahead',
    related: ['performance-marketing', 'platform-monetization', 'chatbot-development'],
    faqs: [
      {
        question: 'How many posts per month?',
        answer:
          'It depends on the platform and package, but volume is the wrong lens. Twelve strong posts outperform thirty filler ones on every platform’s current ranking behaviour. We agree a specific number in your scope so there is no ambiguity about what you are paying for.',
      },
      {
        question: 'Do you shoot photos and video?',
        answer:
          'We design graphics and edit video as standard. Original photography and videography shoots are scoped separately because they involve crew, location and travel. Many clients supply raw footage and we handle everything after that.',
      },
      {
        question: 'Who owns the accounts and the content?',
        answer:
          'You do. Accounts stay registered to you and we work with delegated access. All source files, including layered designs and video projects, are yours and handed over on request.',
      },
    ],
    seo: {
      title: 'Social Media Management Services',
      description:
        'Full social media management across Instagram, Facebook, LinkedIn, TikTok, YouTube and X: strategy, content, publishing and community.',
    },
  },

  {
    slug: 'performance-marketing',
    pillar: 'growth-marketing',
    title: 'Performance Marketing',
    navLabel: 'Performance Marketing',
    oneLiner:
      'Paid campaigns on Meta, Google, TikTok and LinkedIn, managed against cost per acquisition and return on ad spend.',
    intro:
      'We plan, build and run paid campaigns where the only metrics that count are what a customer costs and what they are worth. Full-funnel structure, proper conversion tracking, disciplined creative testing, and reporting that ties spend to revenue rather than to impressions.',
    icon: 'target',
    included: [
      'Account structure and campaign build across Meta, Google, TikTok and LinkedIn',
      'Conversion tracking setup: pixels, server-side events and offline conversions',
      'Audience research, segmentation and exclusion strategy',
      'Ad creative production and a structured testing schedule',
      'Landing page conversion review and recommendations',
      'Weekly optimisation and monthly reporting on CPA, ROAS and contribution',
    ],
    audience: ['E-commerce brands scaling spend', 'B2B companies needing leads', 'Advertisers with unclear tracking'],
    steps: [
      {
        title: 'Audit & tracking',
        description:
          'Existing accounts audited and conversion tracking verified end to end. Nothing is optimised against numbers we have not proven are accurate.',
        duration: '1 week',
      },
      {
        title: 'Strategy & build',
        description:
          'Funnel structure, budget allocation and creative concepts agreed, then campaigns built and launched.',
        duration: '1–2 weeks',
      },
      {
        title: 'Test',
        description:
          'Creative, audience and placement tests run to find what works, with a deliberate learning budget rather than accidental spend.',
        duration: '2–4 weeks',
      },
      {
        title: 'Scale',
        description:
          'Winners scaled and losers cut on a weekly cycle, with CPA held inside the agreed target as budget increases.',
        duration: 'Ongoing',
      },
    ],
    deliverables: [
      'Fully structured ad accounts you own',
      'Verified conversion tracking with a documented event map',
      'All ad creative, source files included',
      'A weekly optimisation log and a monthly performance report',
    ],
    documents: [],
    turnaround: 'Live within 2 weeks · optimised weekly',
    related: ['social-media-management', 'shopify-store-development', 'web-development'],
    faqs: [
      {
        question: 'Who pays for the ad spend?',
        answer:
          'You do, directly to the platform on your own payment method. Your media spend is entirely separate from the management engagement, and we never take custody of it.',
      },
      {
        question: 'What ROAS can you guarantee?',
        answer:
          'None, and anyone guaranteeing a number is either guessing or planning to move the goalposts. ROAS depends on your margins, price point, product and market. What we do commit to is accurate tracking, a documented test plan, and honest reporting, including telling you when paid acquisition is not viable at your current margin.',
      },
      {
        question: 'What is the minimum budget worth starting on?',
        answer:
          'Below a certain spend there is not enough data for the platform’s algorithm to exit the learning phase, and results stay random. We will tell you the realistic floor for your category during the audit rather than taking a retainer for a budget that cannot work.',
      },
    ],
    seo: {
      title: 'Performance Marketing: Meta, Google, TikTok Ads',
      description:
        'Paid campaign management across Meta, Google, TikTok and LinkedIn with verified conversion tracking and reporting on CPA and ROAS.',
    },
  },

  {
    slug: 'platform-monetization',
    pillar: 'growth-marketing',
    title: 'Platform Monetization',
    navLabel: 'Monetization',
    oneLiner:
      'Getting YouTube, TikTok and Facebook channels eligible for payout, and keeping them compliant once they are.',
    intro:
      'Every platform has a specific eligibility bar and a policy review that trips most applicants at least once. We build the content strategy and channel setup that gets you to the threshold legitimately, prepare the application, and diagnose rejections when they happen.',
    icon: 'play',
    included: [
      'Eligibility assessment against current YouTube, TikTok and Facebook requirements',
      'Channel setup, optimisation and content strategy built for watch time',
      'Content production guidance targeting the specific metric that gates payout',
      'Monetization policy compliance review before you apply',
      'Application preparation and submission',
      'Rejection diagnosis and a remediation plan for reapplication',
    ],
    audience: ['Creators near the threshold', 'Brands building owned channels', 'Channels rejected for monetization'],
    steps: [
      {
        title: 'Assessment',
        description:
          'Current metrics measured against each platform’s live requirements, with an honest view of the gap and the realistic timeline.',
        duration: '2–3 days',
      },
      {
        title: 'Compliance clean-up',
        description:
          'Reused content, music rights, thumbnails and metadata reviewed and corrected. This is what most rejections are actually about.',
        duration: '1–2 weeks',
      },
      {
        title: 'Growth phase',
        description:
          'Content strategy executed against the specific gating metric, whether watch hours, followers or video views.',
        duration: '2–6 months',
      },
      {
        title: 'Apply & maintain',
        description:
          'Application submitted, and post-approval compliance monitored so monetization is not later revoked.',
        duration: 'Ongoing',
      },
    ],
    deliverables: [
      'A written eligibility gap analysis per platform',
      'A content strategy targeting the gating metric',
      'A completed policy compliance review',
      'Submitted application with supporting channel documentation',
    ],
    documents: [],
    turnaround: 'Depends entirely on your current distance from the threshold',
    related: ['social-media-management', 'performance-marketing', 'app-development'],
    faqs: [
      {
        question: 'Can you guarantee my channel gets monetized?',
        answer:
          'No, and it is worth being blunt about why. Approval is entirely the platform’s decision, thresholds change without notice, and policy review involves human judgement. What we can do is remove every avoidable reason for rejection and build the content strategy that reaches the metric. Anyone promising guaranteed approval is selling you something that is not theirs to sell.',
      },
      {
        question: 'How long does it take?',
        answer:
          'Entirely dependent on where you start. A channel at 60% of the watch-hour threshold with clean compliance is months away; one starting from zero is longer. We give you a realistic estimate after the assessment rather than an encouraging one upfront.',
      },
      {
        question: 'My channel was rejected. Can it be fixed?',
        answer:
          'Usually, yes. The most common causes, namely reused content, unlicensed music, misleading metadata, or thin repetitive uploads, are all fixable. We diagnose the specific reason and build a remediation plan before reapplying, because repeated rejections do make subsequent review harder.',
      },
    ],
    seo: {
      title: 'YouTube, TikTok & Facebook Monetization Services',
      description:
        'Channel monetization support: eligibility assessment, policy compliance review, content strategy and application preparation.',
    },
  },
];
