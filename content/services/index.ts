import type { PillarSlug, PracticeSlug, Service } from '../types';
import { PILLARS } from '../pillars';
import { PRACTICES } from '../practices';
import { FINANCE_TAX_SERVICES } from './finance-tax';
import { CORPORATE_SERVICES } from './corporate-legal';
import { IP_SERVICES } from './intellectual-property';
import { USA_SERVICES } from './usa';
import { UK_SERVICES } from './uk';
import { INTERNATIONAL_SERVICES } from './international-expansion';
import { GROWTH_SERVICES } from './growth-marketing';
import { ECOMMERCE_SERVICES } from './ecommerce';
import { SOFTWARE_SERVICES } from './software-ai';

/**
 * Every service, in discipline order.
 *
 * This array is the single source of truth for the static service routes, the
 * mega-menu, the home page service index, the footer, sitemap.xml and the
 * contact form dropdown. Adding a service here updates all six.
 *
 * USA_SERVICES, INTERNATIONAL_SERVICES and UK_SERVICES are all the
 * International Expansion discipline, split across three files only because
 * the US and UK blocks are each five services standing on their own, against
 * two for Saudi Arabia and the UAE combined. The spread order below is the
 * order the discipline is named in everywhere else, the United States, Saudi
 * Arabia, the UAE, then the UK, which is what puts them in that order
 * wherever the discipline is listed.
 *
 * Keep these spreads in the same order as PILLARS in content/pillars.ts, which
 * is itself sorted to follow PRACTICES. Only the flat consumers read this
 * order — sitemap.xml is the one that matters — because everything grouped
 * goes through SERVICE_GROUPS or PRACTICE_GROUPS, both built from the content
 * files, which would silently disagree with this array if the two drifted.
 */
export const SERVICES: Service[] = [
  ...SOFTWARE_SERVICES,
  ...GROWTH_SERVICES,
  ...ECOMMERCE_SERVICES,
  ...FINANCE_TAX_SERVICES,
  ...CORPORATE_SERVICES,
  ...IP_SERVICES,
  ...USA_SERVICES,
  ...INTERNATIONAL_SERVICES,
  ...UK_SERVICES,
];

export const SERVICE_COUNT = SERVICES.length;

/**
 * Spelled out because it reads better in headline copy than a numeral, and
 * derived from the array so the word can never drift from the actual count.
 */
const NUMBER_WORDS = [
  'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
  'Seventeen', 'Eighteen', 'Nineteen', 'Twenty', 'Twenty-one', 'Twenty-two',
  'Twenty-three', 'Twenty-four', 'Twenty-five', 'Twenty-six', 'Twenty-seven',
  'Twenty-eight', 'Twenty-nine', 'Thirty', 'Thirty-one', 'Thirty-two',
  'Thirty-three', 'Thirty-four', 'Thirty-five', 'Thirty-six', 'Thirty-seven',
  'Thirty-eight', 'Thirty-nine', 'Forty', 'Forty-one', 'Forty-two',
  'Forty-three', 'Forty-four', 'Forty-five', 'Forty-six', 'Forty-seven',
  'Forty-eight', 'Forty-nine', 'Fifty',
] as const;

export const SERVICE_COUNT_WORD: string =
  NUMBER_WORDS[SERVICE_COUNT] ?? String(SERVICE_COUNT);

const BY_SLUG = new Map(SERVICES.map((s) => [s.slug, s]));

export function getService(slug: string): Service | undefined {
  return BY_SLUG.get(slug);
}

export function servicesByPillar(pillar: PillarSlug): Service[] {
  return SERVICES.filter((s) => s.pillar === pillar);
}

/** Every discipline with its services attached — the shape most sections need. */
export const SERVICE_GROUPS = PILLARS.map((pillar) => ({
  pillar,
  services: servicesByPillar(pillar.slug),
}));

const GROUP_BY_PILLAR = new Map(SERVICE_GROUPS.map((group) => [group.pillar.slug, group]));

/**
 * The full three-level tree: practice → discipline → services.
 *
 * This is the shape the navigation, the footer and the services hub read.
 * `SERVICE_GROUPS` above is still the two-level shape, and is still correct
 * for anything that genuinely wants a flat list of disciplines (the About
 * grid, the 404 cards, the contact dropdown). Neither is derived from the
 * other by accident: both read PILLARS, so a discipline that exists but is
 * listed in no practice would vanish from here while still appearing there.
 * `pnpm check:content` fails the build on exactly that.
 */
export const PRACTICE_GROUPS = PRACTICES.map((practice) => ({
  practice,
  groups: practice.pillars
    .map((slug) => GROUP_BY_PILLAR.get(slug))
    .filter((group): group is NonNullable<typeof group> => group !== undefined),
}));

/**
 * The practices that get a page of their own: the ones holding more than one
 * discipline.
 *
 * A single-discipline practice is already served in full by that discipline's
 * page, and in the one case that exists (Software & AI) the two share a slug,
 * so they would be the same URL. See the note in content/practices.ts.
 */
export const PRACTICE_PAGES = PRACTICE_GROUPS.filter(({ groups }) => groups.length > 1);

const PRACTICE_PAGE_BY_SLUG = new Map(PRACTICE_PAGES.map((entry) => [entry.practice.slug, entry]));

/** The practice entry for `slug`, or undefined if it has no page of its own. */
export function getPracticePage(slug: string) {
  return PRACTICE_PAGE_BY_SLUG.get(slug as PracticeSlug);
}

/** Every service in a practice, in discipline order. */
export function servicesByPractice(practiceSlug: string): Service[] {
  const entry = PRACTICE_GROUPS.find((p) => p.practice.slug === practiceSlug);
  return entry ? entry.groups.flatMap((g) => g.services) : [];
}

/** Total services in a practice, across all of its disciplines. */
export function practiceServiceCount(practiceSlug: string): number {
  return servicesByPractice(practiceSlug).length;
}

/**
 * `/services/{practice}` for a practice with a page, and `/services/{pillar}`
 * for one without.
 *
 * Both come out as `/services/${slug}` because the only single-discipline
 * practice shares its slug with its discipline. That is a coincidence worth
 * naming rather than relying on silently: if a second single-discipline
 * practice is ever added under a slug of its own, this has to resolve to the
 * discipline instead, which is what the branch below does.
 */
export function practiceHref(practiceSlug: string): string {
  const entry = PRACTICE_GROUPS.find((p) => p.practice.slug === practiceSlug);
  if (!entry) return '/services';
  if (entry.groups.length > 1) return `/services/${practiceSlug}`;
  return `/services/${entry.groups[0]!.pillar.slug}`;
}

/** `/services/{pillar}/{service}` — the canonical path for a service. */
export function serviceHref(service: Service): string {
  return `/services/${service.pillar}/${service.slug}`;
}

export function pillarHref(pillar: PillarSlug): string {
  return `/services/${pillar}`;
}

/** Resolves the `related` slugs on a service into the services themselves. */
export function relatedServices(service: Service): Service[] {
  return service.related
    .map((slug) => BY_SLUG.get(slug))
    .filter((s): s is Service => s !== undefined && s.slug !== service.slug);
}

export {
  SOFTWARE_SERVICES,
  GROWTH_SERVICES,
  ECOMMERCE_SERVICES,
  FINANCE_TAX_SERVICES,
  CORPORATE_SERVICES,
  IP_SERVICES,
  INTERNATIONAL_SERVICES,
};
