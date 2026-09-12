#!/usr/bin/env tsx
/**
 * Invariants for the blog posts under `content/posts`.
 *
 * ## Why posts get their own check when guides never had one
 *
 * The guides are held together by `pnpm check:tax`: every rate they state is
 * interpolated from `lib/tax/`, and that script reconciles those modules
 * against the First Schedule on every build. A guide therefore cannot state a
 * figure the calculators disagree with, and the check that proves it already
 * exists.
 *
 * Posts have no such backstop and cannot have one. Their figures are vendor
 * prices, which no module computes and no statute fixes. The only thing
 * standing between a post and a quietly wrong number is whether a reader can
 * trace it, so the traceability itself is what this enforces: every post has
 * sources, every source has a URL and a date it was read, and no post claims to
 * have been reviewed before it was written.
 *
 * That is the blog's version of the no-figures rule, and it is the reason
 * `sources` is a required non-empty field in the type rather than a convention.
 *
 * Run: pnpm check:posts
 */

import { ALL_POSTS, POST_CLUSTERS } from '../content/posts';
import { SERVICES } from '../content/services';

const failures: string[] = [];
const warnings: string[] = [];

const fail = (m: string) => failures.push(m);
const warn = (m: string) => warnings.push(m);

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const ISO_INSTANT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;

const slugs = new Set<string>();
const clusterSlugs = new Set(POST_CLUSTERS.map((c) => c.slug));

for (const post of ALL_POSTS) {
  const id = `${post.cluster}/${post.slug}`;

  // ── Identity ──
  if (slugs.has(post.slug)) {
    fail(`${id}: duplicate slug. Slugs must be unique across all clusters, because getPost() looks up by slug alone.`);
  }
  slugs.add(post.slug);

  if (!clusterSlugs.has(post.cluster)) {
    fail(`${id}: cluster "${post.cluster}" is not in POST_CLUSTERS, so the post would have no hub to appear on.`);
  }

  // ── Dates ──
  if (!ISO_INSTANT.test(post.publishedAt)) {
    fail(`${id}: publishedAt must be a UTC instant like 2026-09-11T03:00:00Z, got "${post.publishedAt}". A local time drifts with daylight saving and the runner's clock is UTC.`);
  }

  if (post.reviewedOn) {
    if (!ISO_DATE.test(post.reviewedOn)) {
      fail(`${id}: reviewedOn must be YYYY-MM-DD, got "${post.reviewedOn}".`);
    }
    /*
     * There is deliberately no check that reviewedOn falls after publishedAt.
     *
     * The first version of this check failed that case, reasoning that a post
     * cannot have been reviewed before it existed. That was wrong, and it
     * rejected the correct workflow: posts are written and verified now, then
     * DATE-GATED to publish weeks later. Sources checked on the day of writing
     * are legitimately earlier than the publication slot.
     *
     * What the field means is "the day a person last read these sources". The
     * honest value for a scheduled post is the day it was researched, and
     * forcing it forward to the publication date would be the false claim the
     * check was trying to prevent.
     *
     * The source-level check below still applies and is the one that matters:
     * a source cannot be read after the post publishes, because that date is
     * what a reader uses to judge whether a figure is stale.
     */
  }

  // ── Sources, which are the whole point ──
  if (post.sources.length === 0) {
    fail(`${id}: no sources. A post with no checkable sources is exactly what the content model exists to prevent.`);
  }

  for (const source of post.sources) {
    if (!/^https?:\/\//.test(source.url)) {
      fail(`${id}: source "${source.label}" has no absolute URL ("${source.url}"). A reader must be able to open it.`);
    }
    if (!ISO_DATE.test(source.readOn)) {
      fail(`${id}: source "${source.label}" has readOn "${source.readOn}", which is not YYYY-MM-DD. The date is what makes a price claim checkable.`);
    } else if (source.readOn > post.publishedAt.slice(0, 10)) {
      fail(`${id}: source "${source.label}" claims to have been read on ${source.readOn}, after the post publishes (${post.publishedAt.slice(0, 10)}). A reader judges staleness from this date, so it cannot be in the post's own future.`);
    }
  }

  /*
   * The CTA's service parameter must name a real service.
   *
   * ContactForm reads `?service=` and preselects the dropdown from it, matching
   * on the service SLUG. A parameter that names no service fails silently: the
   * link works, the page loads, and the dropdown is simply empty, so the one
   * thing the bespoke CTA existed to do does not happen.
   *
   * Four posts shipped with invented slugs (`automation`, `ai-agents`,
   * `shopify`, and a guessed US tax filing slug) before this check existed.
   * Nothing surfaced it because nothing was wrong from the type system's point
   * of view: they are all valid strings.
   */
  const serviceParam = post.cta?.href?.match(/[?&]service=([a-z0-9-]+)/)?.[1];
  if (serviceParam && !SERVICES.some((s) => s.slug === serviceParam)) {
    fail(`${id}: cta.href names service "${serviceParam}", which is not a service slug. The contact form would silently fail to preselect it.`);
  }

  /*
   * A post should connect to what we actually do.
   *
   * Not as a sales requirement: as an honesty one. These posts are written by
   * people who do this work, and a post that never says so reads as though it
   * came from nowhere, which is exactly the anonymous content the guides'
   * provenance block exists to avoid. Saying "we build these" is also what
   * makes a limitation credible, because a stated interest is weighable and an
   * unstated one is not.
   *
   * A warning rather than a failure, because the right number of references is
   * a judgement and one good sentence beats five weak ones.
   */
  const bodyText = JSON.stringify(post.sections) + JSON.stringify(post.faqs);
  const firstPerson = (bodyText.match(/\b(we|our|us)\b/gi) ?? []).length;
  if (firstPerson === 0) {
    warn(`${id}: the body never refers to us at all. A post with no stated connection to the work reads as though nobody wrote it, and an unstated interest cannot be weighed by the reader.`);
  }

  // ── Links ──
  for (const related of post.related ?? []) {
    if (!ALL_POSTS.some((p) => p.slug === related)) {
      fail(`${id}: related post "${related}" does not exist.`);
    }
    if (related === post.slug) {
      fail(`${id}: related links to itself.`);
    }
  }

  // ── Shape ──
  if (post.sections.length === 0) fail(`${id}: no sections.`);
  if (post.faqs.length === 0) {
    warn(`${id}: no FAQs, so the post emits no FAQPage schema. Intentional?`);
  }

  /*
   * The answer has to stand alone. EXECUTION.md records this as a gate the
   * first guides failed: an answer that only makes sense under its own title
   * cannot be extracted, quoted or read aloud, which is most of what the
   * speakable selector and the answer-first discipline are for.
   */
  const words = post.answer.trim().split(/\s+/).length;
  if (words < 25) {
    warn(`${id}: answer is ${words} words, which is probably too short to stand alone.`);
  }
  if (words > 120) {
    warn(`${id}: answer is ${words} words. It is meant to be the answer, not the summary.`);
  }

  if (post.seo.title.length > 60) {
    warn(`${id}: seo.title is ${post.seo.title.length} chars and will be truncated in results.`);
  }
  if (post.seo.description.length < 110 || post.seo.description.length > 175) {
    warn(`${id}: seo.description is ${post.seo.description.length} chars, outside the 110-175 range that renders well.`);
  }
}

/*
 * Nothing links to it.
 *
 * research/EXECUTION.md records this as a defect that shipped on the guides:
 * twenty of them had nothing pointing at them, found only by looking. A post
 * reachable solely from its cluster listing is a post nobody arrives at from
 * another post, which is the traffic that actually compounds.
 *
 * A warning rather than a failure, because the FIRST post in a new cluster is
 * legitimately unlinked until its sibling exists.
 */
const linkedTo = new Set(ALL_POSTS.flatMap((p) => p.related ?? []));
for (const post of ALL_POSTS) {
  if (!linkedTo.has(post.slug)) {
    warn(`${post.cluster}/${post.slug}: nothing links to it. Add it to another post's related list, unless it is the first in a new cluster.`);
  }
}

// ── An empty cluster renders nothing, which is a content bug not a design one ──
for (const cluster of POST_CLUSTERS) {
  if (!ALL_POSTS.some((p) => p.cluster === cluster.slug)) {
    warn(`Cluster "${cluster.slug}" has no posts, so it is declared but invisible.`);
  }
}

// ── Report ──
if (warnings.length > 0) {
  console.warn(`\n  ⚠ ${warnings.length} warning(s):\n`);
  for (const w of warnings) console.warn(`  • ${w}`);
}

if (failures.length > 0) {
  console.error(`\n  ✗ Post check failed — ${failures.length} problem(s):\n`);
  for (const f of failures) console.error(`  • ${f}`);
  console.error('');
  process.exit(1);
}

const sourceCount = ALL_POSTS.reduce((n, p) => n + p.sources.length, 0);
console.log(
  `\n  ✓ Post check passed — ${ALL_POSTS.length} post(s) across ` +
    `${new Set(ALL_POSTS.map((p) => p.cluster)).size} cluster(s), ` +
    `${sourceCount} sources, every one dated and traceable`,
);
console.log('');
