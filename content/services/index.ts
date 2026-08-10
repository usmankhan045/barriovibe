import type { PillarSlug, Service } from '../types';
import { PILLARS } from '../pillars';
import { FINANCE_TAX_SERVICES } from './finance-tax';
import { CORPORATE_SERVICES } from './corporate-compliance';
import { GROWTH_SERVICES } from './growth-marketing';
import { ECOMMERCE_SERVICES } from './ecommerce';
import { SOFTWARE_SERVICES } from './software-ai';

/**
 * All 18 services, in pillar order.
 *
 * This array is the single source of truth for the 18 static routes, the
 * mega-menu, the home page service index, the footer, sitemap.xml and the
 * contact form dropdown. Adding a service here updates all six.
 *
 * Keep these spreads in the same order as PILLARS in content/pillars.ts. Only
 * the flat consumers read this order — sitemap.xml is the one that matters —
 * because everything grouped goes through SERVICE_GROUPS, which is built from
 * PILLARS and would silently disagree with this array if the two drifted.
 */
export const SERVICES: Service[] = [
  ...SOFTWARE_SERVICES,
  ...FINANCE_TAX_SERVICES,
  ...CORPORATE_SERVICES,
  ...GROWTH_SERVICES,
  ...ECOMMERCE_SERVICES,
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
  'Twenty-three', 'Twenty-four', 'Twenty-five',
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

/** Every pillar with its services attached — the shape most sections need. */
export const SERVICE_GROUPS = PILLARS.map((pillar) => ({
  pillar,
  services: servicesByPillar(pillar.slug),
}));

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
  FINANCE_TAX_SERVICES,
  CORPORATE_SERVICES,
  GROWTH_SERVICES,
  ECOMMERCE_SERVICES,
  SOFTWARE_SERVICES,
};
