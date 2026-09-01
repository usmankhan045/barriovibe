import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';

/**
 * Two kinds of crawler are named here, and the distinction is the point.
 *
 * AI *search* crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot,
 * PerplexityBot) fetch a page in order to answer someone's question and cite
 * it, which sends a reader back. Those are allowed, on the same terms as
 * Google.
 *
 * Training crawlers (CCBot, anthropic-ai) collect text into a dataset. There
 * is no citation and no referral, so there is nothing in it for the site.
 * Those are disallowed.
 *
 * The wildcard rule below already allowed all of them by omission. Naming
 * them makes the choice explicit and reviewable rather than accidental.
 */

const AI_SEARCH_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'PerplexityBot',
];

const AI_TRAINING_CRAWLERS = ['CCBot', 'anthropic-ai'];

// The kitchen sink is a component gallery for development, and the API route
// has nothing to crawl.
const PRIVATE_PATHS = ['/dev/', '/api/'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: PRIVATE_PATHS,
      },
      ...AI_SEARCH_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: PRIVATE_PATHS,
      })),
      {
        userAgent: AI_TRAINING_CRAWLERS,
        disallow: '/',
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
