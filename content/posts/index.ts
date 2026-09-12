import type { Post, PostCluster, PostClusterSlug } from './types';
import { AUTOMATION_POSTS } from './automation';
import { AGENT_COST_POSTS } from './agent-cost';
import { ECOMMERCE_POSTS } from './ecommerce';
import { AI_DATA_POSTS } from './ai-data';
import { SHIPPING_POSTS } from './shipping';
import { US_ENTITY_POSTS } from './us-entity';
import { AI_FAILURE_POSTS } from './ai-failure';
import { AUTOMATE_OR_HIRE_POSTS } from './automate-or-hire';
import { TRUST_POSTS } from './trust';

export type { Post, PostCluster, PostClusterSlug, PostSource } from './types';

/**
 * The post registry.
 *
 * Same shape as `content/guides/index.ts`, deliberately: one array, everything
 * else derived, so a post added here appears in its cluster hub, the `/blog`
 * index, the sitemap and `llms.txt` without anyone remembering four places.
 *
 * ## Scheduling works exactly as it does for guides
 *
 * `PUBLISHED_POSTS` filters on the build instant, so a future-dated post has no
 * route, no sitemap entry and no listing until a build runs at or after its
 * slot. The daily rebuild is the whole publishing mechanism. See
 * `content/guides/index.ts` for the full reasoning and
 * `.github/workflows/publish-guides.yml` for the thing that makes the timestamp
 * mean something.
 */

export const POST_CLUSTERS: PostCluster[] = [
  {
    slug: 'automation',
    title: 'Automation platforms',
    card: 'n8n, Zapier and Make priced at real volume, and what the billing unit does to the bill.',
    intro:
      'The comparison everybody writes lists features and ends in "it depends". These price the same workload on each platform instead, from the vendors’ own pricing pages, with the date they were read. The billing unit turns out to matter more than the headline price.',
    icon: 'workflow',
  },
  {
    slug: 'agent-cost',
    title: 'What AI costs',
    card: 'The arithmetic behind an AI agent’s running cost, from published API prices rather than vendor estimates.',
    intro:
      'Cost is the most commercially serious question asked about AI agents and the worst answered, because almost every published figure is an estimate with no method behind it. These posts show the calculation and name the prices it uses.',
    icon: 'sparkles',
  },
  {
    slug: 'trust',
    title: 'Making AI trustworthy',
    card: 'How to tell whether a system is working, what to watch once it is live, and what a guardrail does not stop.',
    intro:
      'These are the questions people ask into a void: repeated public threads about evaluating and monitoring agents get almost no replies, into a space full of vendors selling observability. The answers exist, they are mostly unglamorous, and they are what separates a system you can trust from one you merely like.',
    icon: 'shield',
  },
  {
    slug: 'automate-or-hire',
    title: 'Automate or hire',
    card: 'When automation pays, when it quietly loses money, and why nobody can tell you how often it fails.',
    intro:
      'This is the one category with peer-reviewed economics behind it, and the findings point the opposite way from the sales pitch. Automation pays in proportion to cost saved rather than to sophistication, the measured gains land on your newest staff rather than your most expensive, and the failure statistics everyone quotes do not survive being traced.',
    icon: 'workflow',
  },
  {
    slug: 'ai-failure',
    title: 'Why AI projects fail',
    card: 'What the research everyone cites actually says, what the official statistics measured, and how AI fails in production.',
    intro:
      'The most quoted evidence in this field is quoted wrongly, and the statistics agencies that actually measure AI adoption are almost never cited at all. These posts go to the primary documents, including the ones whose original links no longer work, and say what they contain.',
    icon: 'audit',
  },
  {
    slug: 'ai-data',
    title: 'AI, data and trust',
    card: 'What actually happens to your data when you build on someone else’s model, and how to tell whether the answers can be trusted.',
    intro:
      'The two questions every buyer asks before approving an AI build are whether their data trains someone else’s model and how they would know if the system started making things up. Both have precise answers, in vendor contracts and in published evaluation methods, and both are usually answered with reassurance instead.',
    icon: 'shield',
  },
  {
    slug: 'shipping',
    title: 'Shipping software',
    card: 'The rules, gates and review queues between a finished build and a customer actually using it.',
    intro:
      'Most of what delays a launch is not engineering. It is a store guideline, a verification requirement or a testing gate that nobody read until it blocked them. These are written from the platforms’ own current policies, with the dates they were read.',
    icon: 'phone',
  },
  {
    slug: 'us-entity',
    title: 'Running a US company from Pakistan',
    card: 'What a US LLC actually obliges you to do once it exists, sourced to the IRS and the states rather than to formation vendors.',
    intro:
      'Forming the company is the easy part and the part everyone sells. What follows is a filing calendar with real penalties attached, and an information space dominated by vendors with a reason to understate it. Everything here comes from the IRS, FinCEN or the state itself.',
    icon: 'globe-arrows',
  },
  {
    slug: 'ecommerce',
    title: 'E-commerce in Pakistan',
    card: 'Selling online from Pakistan: the payment constraints that are structural, and what actually works around them.',
    intro:
      'Pakistani e-commerce content is written either by people who have not tried it or by platforms selling something. These start from what the platforms themselves document, including the parts they document only in a help-centre page nobody links to.',
    icon: 'cart',
  },
];

/** Every post, due or not. Use `PUBLISHED_POSTS` for anything reader-facing. */
export const ALL_POSTS: Post[] = [
  ...AUTOMATION_POSTS,
  ...AGENT_COST_POSTS,
  ...ECOMMERCE_POSTS,
  ...AI_DATA_POSTS,
  ...SHIPPING_POSTS,
  ...US_ENTITY_POSTS,
  ...AI_FAILURE_POSTS,
  ...AUTOMATE_OR_HIRE_POSTS,
  ...TRUST_POSTS,
];

/**
 * The build instant the publication gate compares against.
 *
 * Mirrors `content/guides/index.ts`, including the `POST_BUILD_DATE` override,
 * which exists for the same reason: to answer "what would a build on this date
 * publish?" without waiting for the date. A bare `YYYY-MM-DD` is read as the
 * END of that day, because someone asking what the 20th publishes means the
 * last slot on the 20th.
 */
function buildNow(): string {
  const override = process.env.POST_BUILD_DATE;
  if (override) {
    return /^\d{4}-\d{2}-\d{2}$/.test(override) ? `${override}T23:59:59Z` : override;
  }
  return new Date().toISOString();
}

const BUILD_INSTANT = Date.parse(buildNow());

export const PUBLISHED_POSTS: Post[] = ALL_POSTS.filter(
  (p) => Date.parse(p.publishedAt) <= BUILD_INSTANT,
).sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));

export const POST_CLUSTER_BY_SLUG: Record<PostClusterSlug, PostCluster> =
  Object.fromEntries(POST_CLUSTERS.map((c) => [c.slug, c])) as Record<
    PostClusterSlug,
    PostCluster
  >;

export function postsInCluster(cluster: PostClusterSlug): Post[] {
  return PUBLISHED_POSTS.filter((p) => p.cluster === cluster);
}

export function getPost(slug: string): Post | undefined {
  return PUBLISHED_POSTS.find((p) => p.slug === slug);
}

export function postHref(post: Post): string {
  return `/blog/${post.cluster}/${post.slug}`;
}

export function postClusterHref(cluster: PostClusterSlug): string {
  return `/blog/${cluster}`;
}

/** Clusters with at least one live post. An empty cluster renders nothing. */
export function activePostClusters(): PostCluster[] {
  return POST_CLUSTERS.filter((c) => postsInCluster(c.slug).length > 0);
}

export const BLOG_HUB = {
  title: 'Blog',
  intro:
    'Arguments with a date on them, about what software and automation actually cost and where they break. Every figure names the page it came from and the day it was read, because a price with no date behind it is a guess.',
  seo: {
    title: 'Notes on Automation, AI Cost and Building Software',
    description:
      'Priced comparisons of n8n, Zapier and Make, the real arithmetic behind AI agent running costs, and what Pakistani e-commerce actually runs into. Sourced and dated.',
  },
} as const;
