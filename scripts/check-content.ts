#!/usr/bin/env tsx
/**
 * Content completeness guard.
 *
 * The failure this exists to prevent: a service silently going missing.
 *
 * The client's hardest requirement is that a visitor knows every service
 * offered with nothing hidden. That guarantee is only as good as the data, so
 * this asserts that every service is complete, reachable, and cross-linked
 * before the site can ship.
 *
 * Run: pnpm check:content
 */

import { PILLARS } from '../content/pillars';
import { PRACTICES } from '../content/practices';
import { SERVICES, SERVICE_COUNT, SERVICE_COUNT_WORD, serviceHref } from '../content/services';
import { MEGA_MENU_COLUMNS } from '../content/nav';
import type { Service } from '../content/types';

const failures: string[] = [];
const warnings: string[] = [];

const fail = (msg: string) => failures.push(msg);
const warn = (msg: string) => warnings.push(msg);

// ── Required fields, per service ────────────────────────────────────────────
const REQUIRED_STRINGS: (keyof Service)[] = [
  'slug',
  'pillar',
  'title',
  'navLabel',
  'oneLiner',
  'intro',
  'icon',
];

const REQUIRED_ARRAYS: { key: keyof Service; min: number }[] = [
  { key: 'included', min: 4 },
  { key: 'audience', min: 3 },
  { key: 'steps', min: 4 },
  { key: 'deliverables', min: 3 },
  { key: 'related', min: 3 },
  { key: 'faqs', min: 3 },
];

const slugs = new Set<string>();
const pillarSlugs = new Set(PILLARS.map((p) => p.slug));

for (const service of SERVICES) {
  const id = service.slug || '(missing slug)';

  for (const key of REQUIRED_STRINGS) {
    const value = service[key];
    if (typeof value !== 'string' || value.trim() === '') {
      fail(`${id}: "${String(key)}" is empty. Every service must be fully described.`);
    }
  }

  for (const { key, min } of REQUIRED_ARRAYS) {
    const value = service[key];
    if (!Array.isArray(value) || value.length < min) {
      fail(
        `${id}: "${String(key)}" has ${Array.isArray(value) ? value.length : 0} item(s), needs at least ${min}.`,
      );
    }
  }

  // Duplicate slugs would collapse two routes into one — a service disappears.
  if (slugs.has(service.slug)) {
    fail(`${id}: duplicate slug. Two services cannot share a route.`);
  }
  slugs.add(service.slug);

  if (!pillarSlugs.has(service.pillar)) {
    fail(`${id}: pillar "${service.pillar}" does not exist in content/pillars.ts.`);
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(service.slug)) {
    fail(`${id}: slug must be lowercase kebab-case.`);
  }

  // SEO limits — over-length titles and descriptions get truncated in results.
  if (service.seo.title.length > 60) {
    warn(`${id}: SEO title is ${service.seo.title.length} chars (max 60 before truncation).`);
  }
  if (service.seo.description.length < 110 || service.seo.description.length > 160) {
    warn(
      `${id}: SEO description is ${service.seo.description.length} chars (aim for 110–160).`,
    );
  }

  // The one-liner is what makes the offering unambiguous wherever it is linked.
  if (service.oneLiner.length > 160) {
    warn(`${id}: oneLiner is ${service.oneLiner.length} chars — it needs to fit under a link.`);
  }

  for (const step of service.steps) {
    if (!step.title || !step.description) {
      fail(`${id}: a step is missing its title or description.`);
    }
  }

  for (const faq of service.faqs) {
    if (!faq.question.trim() || !faq.answer.trim()) {
      fail(`${id}: an FAQ has an empty question or answer.`);
    }
    if (!faq.question.endsWith('?')) {
      warn(`${id}: FAQ "${faq.question.slice(0, 40)}…" does not end in a question mark.`);
    }
  }
}

// ── Related-service links must resolve, and should cross pillars ────────────
for (const service of SERVICES) {
  for (const relatedSlug of service.related) {
    if (!slugs.has(relatedSlug)) {
      fail(`${service.slug}: related service "${relatedSlug}" does not exist.`);
    }
    if (relatedSlug === service.slug) {
      fail(`${service.slug}: lists itself as a related service.`);
    }
  }

  const crossesPillar = service.related.some((slug) => {
    const target = SERVICES.find((s) => s.slug === slug);
    return target && target.pillar !== service.pillar;
  });
  if (!crossesPillar) {
    warn(
      `${service.slug}: all related services are in the same pillar. At least one cross-pillar link helps discovery.`,
    );
  }
}

// ── Every pillar must have services, and every service must be reachable ────
for (const pillar of PILLARS) {
  const count = SERVICES.filter((s) => s.pillar === pillar.slug).length;
  if (count === 0) {
    fail(`Pillar "${pillar.slug}" has no services. It would render as an empty page.`);
  }

  // Both headlines render as an H1 or an H2 with nothing else in it, so an
  // empty one is a heading-shaped hole rather than a visible mistake.
  for (const [key, headline] of [
    ['headline', pillar.headline],
    ['servicesHeadline', pillar.servicesHeadline],
  ] as const) {
    if (headline.lines.length === 0 || headline.lines.some((l) => !l.trim())) {
      fail(`Pillar "${pillar.slug}": "${key}.lines" is empty. Its heading would render blank.`);
    }
    if (!headline.accent.trim()) {
      fail(`Pillar "${pillar.slug}": "${key}.accent" is empty. The blue half of the heading carries it.`);
    }
  }

  if (pillar.servicesHeadline.accent === pillar.headline.accent) {
    warn(
      `Pillar "${pillar.slug}": "servicesHeadline" repeats "headline". Both appear on its page, a screen apart.`,
    );
  }
}

// ── The practice → discipline edge ──────────────────────────────────────────
//
// `content/practices.ts` is the only record of which discipline sits under
// which practice, and the navigation reads it while the About grid, the 404
// cards and the contact dropdown read PILLARS directly. A discipline missing
// from every practice would therefore vanish from the menu and the footer
// while still appearing on those pages, which is the "nothing hidden" failure
// arriving by a side door. These three checks close it.
const claimed = new Map<string, string[]>();
for (const practice of PRACTICES) {
  if (practice.pillars.length === 0) {
    fail(`Practice "${practice.slug}" lists no disciplines. Its mega-menu tab would be empty.`);
  }
  for (const pillarSlug of practice.pillars) {
    claimed.set(pillarSlug, [...(claimed.get(pillarSlug) ?? []), practice.slug]);
  }
}

for (const pillar of PILLARS) {
  const owners = claimed.get(pillar.slug) ?? [];
  if (owners.length === 0) {
    fail(
      `Pillar "${pillar.slug}" belongs to no practice. It would be missing from the mega-menu and the footer.`,
    );
  }
  if (owners.length > 1) {
    fail(
      `Pillar "${pillar.slug}" is listed by ${owners.length} practices (${owners.join(', ')}). Every service under it would appear twice in the menu.`,
    );
  }
}

// ── Practices that have a page of their own ─────────────────────────────────
//
// `/services/{practice}` exists for any practice holding more than one
// discipline, and `/services/{pillar}` for all seven disciplines. Both live in
// the same dynamic segment, so a practice slug that also names a discipline
// would shadow that discipline's page and take its services off the site.
// Software & AI is exactly that case today and is safe only because it holds
// one discipline, which is what makes the slug refer to the same page either
// way. Adding a second discipline under it without renaming would break it.
for (const practice of PRACTICES) {
  if (practice.pillars.length <= 1) continue;

  if (pillarSlugs.has(practice.slug)) {
    fail(
      `Practice "${practice.slug}" has ${practice.pillars.length} disciplines and shares its slug ` +
        `with a discipline. /services/${practice.slug} would render the practice and the ` +
        'discipline page would be unreachable. Rename one of them.',
    );
  }

  if (!practice.headline || practice.headline.lines.length === 0 || !practice.headline.accent) {
    fail(
      `Practice "${practice.slug}" has a page at /services/${practice.slug} but no "headline". ` +
        'Its H1 would be empty.',
    );
  }
}

// Every practice's navigation destination must cover every service under it.
// This is the check that would have caught the original bug: the mega-menu tab
// for a practice pointed at its first discipline, so clicking "Marketing &
// E-commerce" reached a page holding three of its six services.
for (const practice of PRACTICES) {
  const column = MEGA_MENU_COLUMNS.find((c) => c.practice.slug === practice.slug);
  if (!column) {
    fail(`Practice "${practice.slug}" has no mega-menu column.`);
    continue;
  }

  const expected =
    practice.pillars.length > 1
      ? `/services/${practice.slug}`
      : `/services/${practice.pillars[0]}`;

  if (column.href !== expected) {
    fail(
      `Practice "${practice.slug}" links to ${column.href}, which does not cover all ` +
        `${practice.pillars.length} of its disciplines. Expected ${expected}.`,
    );
  }
}

const pillarOrder = PILLARS.map((p) => p.slug).join(' > ');
const practiceOrder = PRACTICES.flatMap((p) => p.pillars).join(' > ');
if (pillarOrder !== practiceOrder) {
  fail(
    'PILLARS order does not follow PRACTICES order. Sort content/pillars.ts to match, ' +
      `or the site ranks disciplines differently from the navigation.\n      pillars.ts:   ${pillarOrder}\n      practices.ts: ${practiceOrder}`,
  );
}

// This is the check that directly enforces "nothing hidden": every service in
// the data must be present in the navigation the user can actually click.
const menuHrefs = new Set(
  MEGA_MENU_COLUMNS.flatMap((c) => c.groups.flatMap((g) => g.links.map((l) => l.href))),
);
for (const service of SERVICES) {
  const href = serviceHref(service);
  if (!menuHrefs.has(href)) {
    fail(`${service.slug}: not reachable from the mega-menu (${href}). It would be hidden.`);
  }
}

if (menuHrefs.size !== SERVICE_COUNT) {
  fail(
    `Mega-menu lists ${menuHrefs.size} services but ${SERVICE_COUNT} exist. Counts must match exactly.`,
  );
}

// ── Report ──────────────────────────────────────────────────────────────────
if (warnings.length > 0) {
  console.warn(`\n  ⚠ ${warnings.length} warning(s):\n`);
  for (const w of warnings) console.warn(`  • ${w}`);
}

if (failures.length > 0) {
  console.error(`\n  ✗ Content check failed — ${failures.length} problem(s):\n`);
  for (const f of failures) console.error(`  • ${f}`);
  console.error('');
  process.exit(1);
}

console.log(
  `\n  ✓ Content check passed — ${SERVICE_COUNT_WORD.toLowerCase()} (${SERVICE_COUNT}) services, ` +
    `all complete and reachable across ${PILLARS.length} disciplines in ${PRACTICES.length} practices`,
);
console.log('');
