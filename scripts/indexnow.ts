#!/usr/bin/env tsx
/**
 * IndexNow submission.
 *
 * ── What was missing ──
 *
 * The site already served a valid key at `/{INDEXNOW_KEY}.txt`, and
 * `pnpm check:content` already asserted the route matched the constant. Both
 * halves of the ownership proof were in place and nothing ever submitted a URL,
 * so the protocol did nothing at all: IndexNow is a push, and a key file on its
 * own is a doorbell nobody presses. Bing, Yandex, Naver and Seznam were left to
 * find changes by crawling, which is the thing IndexNow exists to avoid.
 *
 * ── What it does ──
 *
 * Posts the site's URLs to the IndexNow endpoint, which fans out to every
 * participating engine. Google does not participate, and no amount of pinging
 * changes that; Google gets the sitemap and the lastmod dates fixed alongside
 * this.
 *
 * ── Running it ──
 *
 *   pnpm indexnow              submit every URL in the sitemap
 *   pnpm indexnow --dry-run    print what would be sent, send nothing
 *   pnpm indexnow /tools/salary-tax /about
 *                              submit only those paths
 *
 * Run it after a deploy, not during a build. A build that has not shipped yet
 * announcing its own URLs would invite a crawl of the version still live, and
 * on a preview build it would announce pages that are not on the domain at all.
 *
 * ── On submitting everything ──
 *
 * The no-argument form sends all eighty-four URLs, which is correct for a first
 * submission and wasteful afterwards: the protocol asks for changed URLs, and
 * an engine that is told everything changed on every deploy learns to discount
 * the source, which is precisely the failure the sitemap's lastmod fix
 * addresses. Once this is wired into a deploy, pass the paths that actually
 * changed.
 */

import { INDEXNOW_KEY } from '../content/site';
import { SITE_URL } from '../lib/seo';
import sitemap from '../app/sitemap';

const ENDPOINT = 'https://api.indexnow.org/indexnow';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const paths = args.filter((a) => !a.startsWith('--'));

const host = new URL(SITE_URL).host;

const urls = paths.length
  ? paths.map((p) => `${SITE_URL}${p.startsWith('/') ? p : `/${p}`}`)
  : sitemap().map((entry) => entry.url);

if (urls.length === 0) {
  console.error('  ✗ Nothing to submit.');
  process.exit(1);
}

// The protocol caps a single request at 10,000 URLs. This site is two orders of
// magnitude below that, so the check is a guard against a future the site has
// not reached rather than a case that happens today.
if (urls.length > 10_000) {
  console.error(`  ✗ ${urls.length} URLs exceeds the 10,000 per-request limit.`);
  process.exit(1);
}

const payload = {
  host,
  key: INDEXNOW_KEY,
  keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
  urlList: urls,
};

if (dryRun) {
  console.log(`\n  Dry run. Would submit ${urls.length} URL(s) to ${ENDPOINT}:\n`);
  for (const u of urls) console.log(`  • ${u}`);
  console.log(`\n  Key location: ${payload.keyLocation}\n`);
  process.exit(0);
}

const response = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
});

/*
 * 200 accepted, 202 accepted but the key is still being verified. Both are
 * successes and 202 is the expected answer on a first submission, so treating
 * it as a failure would make the first run look broken every time.
 */
if (response.status === 200 || response.status === 202) {
  console.log(
    `\n  ✓ Submitted ${urls.length} URL(s) to IndexNow (HTTP ${response.status}).\n`,
  );
  process.exit(0);
}

/*
 * The failures worth naming, because each has a different fix and the raw
 * status code sends you looking in the wrong place:
 *   403  the key file did not verify. Check it is reachable at keyLocation.
 *   422  a URL did not belong to `host`, or the key did not match it.
 *   429  too many submissions. Back off; this is why the deploy hook should
 *        send changed URLs rather than all of them.
 */
const body = await response.text().catch(() => '');
console.error(
  `\n  ✗ IndexNow rejected the submission (HTTP ${response.status}).` +
    `\n    Key location: ${payload.keyLocation}` +
    (body ? `\n    Response: ${body.slice(0, 400)}` : '') +
    '\n',
);
process.exit(1);
