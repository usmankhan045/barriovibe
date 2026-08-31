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
 *
 * ## Two social services, and the line between them
 *
 * `social-media-management` and `social-presence-management` are deliberately
 * both here, and a visitor who cannot tell them apart will buy neither. The
 * distinction is scope of custody, not effort:
 *
 *   MANAGEMENT   the platforms you have already decided to be on, run well.
 *                You name the three or four that matter, we produce and
 *                publish to them and answer the comments.
 *   PRESENCE     the entire surface your business occupies online, owned.
 *                That adds the accounts nobody remembers making, the ones
 *                somebody else made in your name, the community platforms
 *                (Reddit, Quora, Discord) where your reputation is being
 *                decided by people who have not reached your site yet, and the
 *                profiles that answer a search before your homepage does.
 *
 * Each one's FAQ states that line in the visitor's own words, and they say the
 * same thing. If either scope is ever edited, edit both FAQs with it, because
 * two service pages disagreeing about where the boundary sits is worse than no
 * boundary at all.
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
    related: ['social-presence-management', 'performance-marketing', 'chatbot-development'],
    faqs: [
      {
        question: 'How is this different from Presence Management?',
        answer:
          'This runs the platforms you have already decided to be on. You name the three or four that matter, we produce the content, publish it and answer the comments. Presence Management takes custody of everything else too: the accounts nobody remembers making, the ones somebody else made in your name, the Reddit and Quora threads shaping your reputation with people who have not reached your site yet, and the Google Business Profile that answers a search before your homepage does. If you can already list every account that exists in your name, this is the service you want.',
      },
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
    slug: 'social-presence-management',
    pillar: 'growth-marketing',
    title: 'Social Media Presence Management',
    navLabel: 'Presence Management',
    oneLiner:
      'Every account you have anywhere, run as one presence: the networks, the forums, the video platforms, the review sites and the search profiles.',
    intro:
      'Most businesses do not have a social media problem, they have a sprawl problem. There is an Instagram someone posts to, a LinkedIn nobody touches, a TikTok that was tried once, a Reddit thread going unanswered, a Quora question ranking above your own site, and a Google Business Profile with a competitor’s photo on it. We take custody of the whole surface: every platform your audience uses, run to one strategy, one voice and one set of numbers, with the accounts still registered to you.',
    icon: 'users',
    included: [
      'A presence audit: every account that exists, every one that should, every one impersonating you, and every profile you have lost access to',
      'Account recovery, consolidation and verification, with dead and duplicate profiles closed down',
      'One brand book for social: voice, visual direction, bios, handles and link structure, applied identically everywhere',
      'Short-form video for Instagram Reels, TikTok and YouTube Shorts, cut separately for each platform rather than reposted with the watermark on',
      'Feed, story and carousel content for Instagram, Facebook, LinkedIn, X, Pinterest and Threads',
      'Community platforms handled properly: Reddit answers that respect the subreddit rules, Quora answers written to rank, and Discord or Facebook Group moderation where you run one',
      'Google Business Profile and review platforms kept current, with every review answered',
      'Daily inbox and comment management across every platform, with an escalation path for complaints',
      'Listening and reputation monitoring on brand mentions, competitor activity and the questions your market keeps asking',
      'One monthly report covering every platform together, with what to keep, cut and test next',
    ],
    audience: [
      'Businesses with accounts scattered across platforms',
      'Founders replacing an in-house social hire',
      'Brands with a reputation problem online',
    ],
    steps: [
      {
        title: 'Find everything',
        description:
          'We inventory every profile carrying your name, including the ones nobody remembers making and the ones somebody else made. You get the full list with access status against each, which is usually the first time it has existed on one page.',
      },
      {
        title: 'Consolidate and set the standard',
        description:
          'Access recovered, duplicates closed, handles and bios aligned, and the voice and visual rules written down. Nothing goes out until the same brand is showing up on all of them.',
      },
      {
        title: 'Run it daily',
        description:
          'Content produced and published to the agreed cadence per platform, comments and messages answered every working day, mentions monitored, and reviews and community threads handled as they appear.',
      },
      {
        title: 'Report and reset',
        description:
          'One monthly review across the whole presence rather than a report per platform, and the next cycle shaped by what earned attention instead of by what was planned.',
      },
    ],
    deliverables: [
      'A written presence audit listing every account, its status and its access',
      'A social brand book covering voice, visuals, bios and handles',
      'A monthly content calendar approved before anything publishes',
      'All designed graphics and edited video, source files included',
      'A monthly cross-platform report with commentary and next actions',
    ],
    documents: [],
    related: ['social-media-management', 'performance-marketing', 'web-development'],
    faqs: [
      {
        question: 'How is this different from Social Media Management?',
        answer:
          'Scope, and who holds the problem. Social Media Management runs the platforms you have chosen to be on and posts to them well. This owns the entire surface your business occupies online, which includes the profiles you forgot, the review sites you have never logged into, the Reddit and Quora threads deciding your reputation with people who have not reached your site yet, and the Google Business Profile that answers a search before your homepage does. If you know which three platforms matter and want them run, take the management service. If nobody in your business can currently list every account that exists in your name, this is the one.',
      },
      {
        question: 'Which platforms are actually covered?',
        answer:
          'The networks: Instagram, Facebook, LinkedIn, TikTok, X, YouTube, Pinterest, Threads and Snapchat. The community and knowledge platforms: Reddit, Quora and Discord, plus Facebook and LinkedIn Groups. The profiles that answer a search: Google Business Profile, Trustpilot and the review sites specific to your sector. Which of them you should be on is the audit’s job, and the honest answer for most businesses is fewer than they expect. Being absent from a platform is a decision; being half-present on it is a liability.',
      },
      {
        question: 'Reddit bans marketing. How do you post there?',
        answer:
          'By not marketing. Reddit is run by moderators who remove promotional accounts on sight, and a brand that arrives with a campaign gets the account banned and sometimes the domain blocked site-wide. What works is answering questions in the subreddits your customers are already in, from an account with a history, disclosing who you are, and linking only where a link genuinely answers the question. It is slower than anything else in this scope and it is the channel most likely to be read by someone comparing you to a competitor. We will also tell you when a subreddit is not worth entering at all.',
      },
      {
        question: 'What happens to the accounts we cannot get into?',
        answer:
          'We work through the platform recovery routes with you, which need documents from your side: the business registration, a domain email on the brand, and in some cases a signed letter. Where recovery fails, the options are a new profile with the old one reported for impersonation, or leaving it dormant and outranking it. We tell you which is realistic per platform rather than promising every account back.',
      },
      {
        question: 'Do you post using AI?',
        answer:
          'We use AI in the workflow, for research, first drafts, editing and scheduling, and a person approves everything that publishes and writes every reply that matters. Unreviewed AI in a comment section is how brands end up screenshotted, and on Reddit and Quora it is also how accounts get removed. Your calendar states what is produced how, so there is nothing to discover later.',
      },
      {
        question: 'Who owns the accounts?',
        answer:
          'You do, without exception. Every profile stays registered to your business on your own email and we work through delegated access, so ending the engagement is a permissions change and not a handover negotiation. Source files for all graphics and video are yours and handed over on request.',
      },
    ],
    seo: {
      title: 'Social Media Presence Management',
      description:
        'Your whole online presence run as one: Instagram, TikTok, LinkedIn, YouTube, Reddit, Quora and Google Business Profile, with community and reviews handled.',
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
