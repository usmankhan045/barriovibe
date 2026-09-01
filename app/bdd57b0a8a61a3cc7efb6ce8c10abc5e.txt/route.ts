import { INDEXNOW_KEY } from '@/content/site';

/**
 * The IndexNow key file.
 *
 * IndexNow lets a site tell Bing, Yandex, Naver and Seznam that a URL changed
 * instead of waiting to be recrawled. Google does not participate.
 *
 * Ownership is proved by serving the key as plain text at a path named after
 * the key itself, which is why the filename and the body are the same string.
 * The key is a public verification token, not a credential: it is meant to be
 * fetched by anyone. It lives in the repo for that reason, and leaking it
 * grants nothing beyond the ability to ask a search engine to recrawl a site
 * that is already public.
 *
 * The route directory name must stay in sync with `INDEXNOW_KEY`. Next cannot
 * derive a route path from a constant, so `pnpm check:content` asserts the two
 * match rather than leaving it to memory.
 */

export const dynamic = 'force-static';

export function GET() {
  return new Response(INDEXNOW_KEY, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
