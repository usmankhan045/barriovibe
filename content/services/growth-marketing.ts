import type { Service } from '../types';

/**
 * Discipline 02: Growth & Marketing.
 *
 * Demand only. The storefront and the marketplace work live in `ecommerce.ts`.
 *
 * Copy here reports against revenue and cost per acquisition rather than reach
 * or impressions, which is the discipline's whole argument and should survive
 * any future edit. Monetization is written to set expectations honestly:
 * approval is the platform's decision and nobody can guarantee it.
 */
export const GROWTH_SERVICES: Service[] = [
  {
    slug: 'social-media-management',
    pillar: 'growth-marketing',
    title: 'Social Media Management',
    navLabel: 'Social Media',
    oneLiner:
      'Content planned, produced and published on the platforms you are actually on, with the comments answered and a monthly report.',
    intro:
      'We run your social presence end to end: the strategy, the content calendar, the design and the copy, the scheduling, and the replies to people who comment. That covers Instagram, Facebook, LinkedIn, TikTok, YouTube and X. Each post is cut for the platform it goes on, because the same asset cross-posted five times performs badly on at least four of them.',
    icon: 'megaphone',
    included: [
      'A platform strategy and a monthly content calendar, agreed before anything is made',
      'Graphic design, short-form video editing and caption copywriting',
      'Scheduling and publishing on every active platform',
      'Community management: comments, direct messages and mentions answered daily',
      'Hashtag, trend and competitor monitoring',
      'A monthly report on reach, engagement, follower growth and link clicks',
    ],
    audience: ['Brands with no in-house team', 'Businesses posting inconsistently', 'Companies entering new platforms'],
    steps: [
      {
        title: 'Audit and strategy',
        description:
          'We review your accounts, your audience and your competitors, then agree which platforms are worth the effort and which are a distraction.',
      },
      {
        title: 'Content system',
        description:
          'Visual direction, content themes and posting cadence set, with the first month’s calendar signed off before anything publishes.',
      },
      {
        title: 'Produce and publish',
        description:
          'Content designed, written, scheduled and published to the agreed cadence, with community management running every day.',
      },
      {
        title: 'Review',
        description:
          'A monthly review against the month before, and the next calendar shaped by what performed rather than by what was planned.',
      },
    ],
    deliverables: [
      'An approved monthly content calendar',
      'All designed graphics and edited video assets, source files included',
      'Published posts across every agreed platform',
      'Monthly performance report with commentary and next actions',
    ],
    documents: [],
    related: ['performance-marketing', 'platform-monetization', 'chatbot-development'],
    faqs: [
      {
        question: 'How many posts per month?',
        answer:
          'It depends on the platform, but volume is the wrong question. Every major platform now ranks on engagement per post, so twelve good posts beat thirty filler ones and a weak post actively costs you distribution on the next one. We put a specific number in your scope so there is no ambiguity about what you are paying for.',
      },
      {
        question: 'Do you shoot photos and video?',
        answer:
          'Graphic design and video editing are standard. Original photo and video shoots are scoped separately, because they bring in crew, location and travel costs that have nothing to do with a monthly retainer. Plenty of clients send us raw footage and we handle everything after that.',
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
      'We plan, build and run paid campaigns judged on two numbers: what a customer costs to acquire and what that customer is worth. The work covers full-funnel account structure, conversion tracking we have verified ourselves, a disciplined creative testing schedule, and reporting that ties spend to revenue instead of to impressions.',
    icon: 'target',
    included: [
      'Account structure and campaign build across Meta, Google, TikTok and LinkedIn',
      'Conversion tracking end to end: the pixel, server-side events through Meta’s Conversions API and Google Ads enhanced conversions, and offline conversion imports',
      'GA4 configured so the platforms and your analytics report the same conversion',
      'Audience research, segmentation and exclusion lists',
      'Ad creative production on a written testing schedule',
      'A landing page conversion review, since the ad can only get them there',
      'Weekly optimisation and a monthly report on cost per acquisition, return on ad spend and contribution',
    ],
    audience: ['E-commerce brands scaling spend', 'B2B companies needing leads', 'Advertisers with unclear tracking'],
    steps: [
      {
        title: 'Audit and tracking',
        description:
          'Accounts audited and conversion tracking verified from click to confirmed sale. We do not optimise against numbers we have not proven are accurate.',
      },
      {
        title: 'Strategy and build',
        description:
          'Funnel structure, budget split and creative concepts agreed, then the campaigns built and launched.',
      },
      {
        title: 'Test',
        description:
          'Creative, audience and placement tests run against a named learning budget, so the cost of finding out is planned rather than discovered later.',
      },
      {
        title: 'Scale',
        description:
          'Winners scaled and losers cut weekly, holding cost per acquisition inside the agreed target as the budget goes up.',
      },
    ],
    deliverables: [
      'Fully structured ad accounts you own',
      'Verified conversion tracking with a documented event map',
      'All ad creative, source files included',
      'A weekly optimisation log and a monthly performance report',
    ],
    documents: [],
    related: ['social-media-management', 'shopify-store-development', 'web-development'],
    faqs: [
      {
        question: 'Who pays for the ad spend?',
        answer:
          'You do, directly to the platform on your own payment method. Your media spend is entirely separate from the management engagement, and we never take custody of it.',
      },
      {
        question: 'What return on ad spend can you guarantee?',
        answer:
          'None. Anyone quoting you a number is either guessing or has already decided how to move the goalposts later. Return on ad spend follows your margin, your price point, your product and your market, and three of those four are outside our control. What we commit to is tracking we have verified, a written test plan, and reporting that includes telling you when paid acquisition does not work at your current margin.',
      },
      {
        question: 'Why does my tracking under-report sales?',
        answer:
          'Usually because it relies on the browser alone. Ad blockers, cookie restrictions and Apple’s app tracking prompt all cut into what the pixel sees, so the platform never learns which ads produced the sale and optimises against a partial picture. Sending the same events server side, through Meta’s Conversions API and Google’s enhanced conversions, closes most of that gap. Fixing it is the first thing we do, because every optimisation after it depends on the numbers being real.',
      },
      {
        question: 'What is the minimum budget worth starting on?',
        answer:
          'Below a certain weekly spend the platform cannot gather enough conversions to leave its learning phase, and the results stay effectively random no matter who is managing them. We will tell you the realistic floor for your category during the audit instead of taking a retainer to run a budget that cannot work.',
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
      'Getting YouTube, TikTok and Facebook channels to the payout threshold, through the policy review, and compliant afterwards.',
    intro:
      'Each platform sets a numeric bar and then runs a policy review, and the policy review is what catches most applicants. YouTube asks for 1,000 subscribers plus either 4,000 valid public watch hours in the last 12 months or 10 million valid public Shorts views in the last 90 days. TikTok’s Creator Rewards Program looks for 10,000 followers and 100,000 video views in the last 30 days. We build the channel and the content strategy that reaches whichever number gates you, clean the channel up before you apply, and diagnose the rejection if one comes back.',
    icon: 'play',
    included: [
      'An eligibility assessment against each platform’s current published requirements',
      'Channel setup, optimisation and a content strategy aimed at watch time',
      'Content guidance targeting the specific metric that gates your payout',
      'A policy compliance review before you apply, covering reused content, music rights and metadata',
      'Application preparation and submission',
      'Rejection diagnosis and a remediation plan before reapplying',
    ],
    audience: ['Creators near the threshold', 'Brands building owned channels', 'Channels rejected for monetization'],
    steps: [
      {
        title: 'Assessment',
        description:
          'Your current metrics measured against each platform’s live requirements, with a straight view of the gap rather than an encouraging one.',
      },
      {
        title: 'Compliance clean-up',
        description:
          'Reused content, music rights, thumbnails and metadata reviewed and corrected. This is what most rejections turn out to be about.',
      },
      {
        title: 'Growth phase',
        description:
          'The content strategy run against the specific gating metric, whether that is watch hours, Shorts views, followers or video views.',
      },
      {
        title: 'Apply and maintain',
        description:
          'The application submitted, then compliance monitored after approval, because monetization can be withdrawn as well as granted.',
      },
    ],
    deliverables: [
      'A written eligibility gap analysis per platform',
      'A content strategy targeting the gating metric',
      'A completed policy compliance review',
      'Submitted application with supporting channel documentation',
    ],
    documents: [],
    related: ['social-media-management', 'performance-marketing', 'app-development'],
    faqs: [
      {
        question: 'Can you guarantee my channel gets monetized?',
        answer:
          'No, and it is worth saying plainly why. Approval is the platform’s decision, the thresholds move without notice, and the policy review is done by people exercising judgement. What we can do is remove every avoidable reason for a rejection and build the content strategy that reaches the number. Anyone promising guaranteed approval is selling something that is not theirs to sell.',
      },
      {
        question: 'What actually gets channels rejected?',
        answer:
          'Rarely the subscriber count, which is the part everybody watches. The usual causes are reused content the channel did not create and did not add to, music used without a licence, thumbnails or titles that do not match the video, and a run of thin repetitive uploads. All four are fixable, and all four are cheaper to fix before the first application than after it.',
      },
      {
        question: 'My channel was rejected. Can it be fixed?',
        answer:
          'Usually. We diagnose the specific reason, fix it, and let the channel build a clean record before reapplying. That waiting period is deliberate: repeat applications with nothing changed between them make the next review harder, not easier.',
      },
    ],
    seo: {
      title: 'YouTube, TikTok & Facebook Monetization Services',
      description:
        'Channel monetization support: eligibility assessment, policy compliance review, content strategy and application preparation.',
    },
  },
];
