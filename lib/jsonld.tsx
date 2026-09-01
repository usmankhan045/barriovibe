import { BRAND, CONTACT, SOCIALS, TAGLINE } from '@/content/site';
import { SERVICES, serviceHref } from '@/content/services';
import type { Faq, Service } from '@/content/types';
import { absoluteUrl, SITE_URL } from './seo';
import type { Crumb } from '@/components/primitives/Breadcrumb';

/**
 * Structured data.
 *
 * Every builder derives from the same content objects that render the visible
 * page, so the markup and the schema cannot describe different things — which
 * is both a correctness property and the thing Google penalises when it fails.
 */

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // The payload is our own build-time content, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    name: BRAND.name,
    legalName: BRAND.legalName,
    url: SITE_URL,
    // The icon Next serves from app/icon.png. Google uses this for the
    // knowledge panel and for rich results that carry a brand mark.
    logo: absoluteUrl('/icon.png'),
    image: absoluteUrl('/opengraph-image'),
    description: TAGLINE,
    email: CONTACT.email,
    telephone: CONTACT.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.address.line1,
      addressLocality: CONTACT.address.city,
      addressRegion: 'Khyber Pakhtunkhwa',
      addressCountry: 'PK',
    },
    areaServed: { '@type': 'Country', name: 'Pakistan' },
    // Mirrors CONTACT.hours. Stated here as data so a search engine can show
    // the opening hours without parsing the sentence the footer renders.
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      opens: '10:00',
      closes: '19:00',
    },
    // `sameAs` is the claim that these profiles are this organisation. Every
    // entry in SOCIALS is a verified, absolute profile URL, so the list goes
    // through whole; the old '#' filter guarded placeholders that no longer
    // exist. See the note in content/site.ts on why Facebook is not here.
    sameAs: SOCIALS.map((s) => s.href),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: SERVICES.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.oneLiner,
          url: absoluteUrl(serviceHref(service)),
        },
      })),
    },
  };
}

export function serviceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.oneLiner,
    url: absoluteUrl(serviceHref(service)),
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: { '@type': 'Country', name: 'Pakistan' },
    serviceType: service.title,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.title}: what's included`,
      itemListElement: service.included.map((item) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: item },
      })),
    },
  };
}

export function breadcrumbSchema(items: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function itemListSchema(name: string, urls: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: urls.length,
    itemListElement: urls.map((url, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absoluteUrl(url),
    })),
  };
}

/**
 * A free browser-side tool, described as an application rather than as a page.
 *
 * `WebApplication` is what earns a tool the rich result that names it and its
 * price. The price is genuinely zero and stated as such: omitting `offers`
 * entirely reads as "unknown", which is not the same claim.
 */
export function webApplicationSchema({
  name,
  description,
  path,
  category = 'FinanceApplication',
}: {
  name: string;
  description: string;
  path: string;
  category?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: absoluteUrl(path),
    applicationCategory: category,
    // It runs in the page, so the browser is the whole requirement.
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'PKR',
    },
    provider: { '@id': `${SITE_URL}/#organization` },
    isAccessibleForFree: true,
  };
}
