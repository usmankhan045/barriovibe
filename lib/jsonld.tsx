import { BRAND, CONTACT, SOCIALS, TAGLINE } from '@/content/site';
import { SERVICES, serviceHref } from '@/content/services';
import type { Faq, Service } from '@/content/types';
import { absoluteUrl, SITE_URL } from './seo';
import type { Crumb } from '@/components/primitives/Breadcrumb';
import { RATES_BASIS, RATES_REVIEWED } from '@/content/provenance';

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

/**
 * The organisation as a *reference* node, for pages that name it as a provider.
 *
 * `serviceSchema` and `webApplicationSchema` both point `provider` at
 * `/#organization`. That reference only resolves if the node it names is in the
 * same page's markup: Google reads each URL's JSON-LD on its own and does not
 * merge a graph across pages. Defining the node only on the home page therefore
 * left the `provider` on all sixty-six service and tool pages pointing at
 * nothing, which is not an error a validator reports, it just silently drops.
 *
 * This is the identifying subset rather than the full node. It carries the same
 * `@id`, so a consumer that has seen the full node elsewhere merges the two; a
 * consumer that has not still gets a named, located provider instead of a
 * dangling pointer. The full node stays on home, about and contact, where the
 * address, hours and catalogue actually belong.
 */
export function organizationRef() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    name: BRAND.name,
    url: SITE_URL,
    logo: absoluteUrl('/icon.png'),
    address: {
      '@type': 'PostalAddress',
      addressLocality: CONTACT.address.city,
      addressRegion: 'Khyber Pakhtunkhwa',
      addressCountry: 'PK',
    },
  };
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
    /*
     * Two claims, not one. The firm works nationally, and most of what it does
     * (a return filed through IRIS, a company registered with SECP) needs no
     * physical proximity at all. But it is also a real office in Charsadda, and
     * a country-only `areaServed` states the first and hides the second, which
     * is the half that wins "tax consultant near me" in Khyber Pakhtunkhwa
     * where the competition is thin.
     *
     * TODO: add `geo` with the exact GeoCoordinates for Ayan Plaza. Real
     * coordinates have to be read off the map, not guessed from the city
     * centre: a pin in the wrong place is worse for a local search than no pin,
     * because Google matches it against the address and finds a contradiction.
     */
    areaServed: [
      { '@type': 'Country', name: 'Pakistan' },
      { '@type': 'AdministrativeArea', name: 'Khyber Pakhtunkhwa' },
    ],
    /*
     * A band, not a price. Schema.org wants the symbol form here, and it is the
     * one figure the site is willing to state: the engagements start small and
     * scope up, which "$$" says without publishing a rate card the services
     * pages deliberately do not carry.
     */
    priceRange: '$$',
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
 * A mobile app we built, for a product page under /work.
 *
 * `MobileApplication` rather than the `WebApplication` below, because the two
 * describe different things: that one runs in the page it is declared on, this
 * one is installed from a store and the page is only where it is written about.
 * Getting that wrong asserts the app runs in the browser, which is the kind of
 * claim a rich result will happily repeat.
 *
 * NO `aggregateRating` and NO `offers`. A rating needs ratings, and this app
 * has no public reviews to aggregate yet; inventing one is both a lie and a
 * structured data violation Google issues manual actions for. The price is left
 * unstated rather than declared zero, because the app carries a subscription
 * and "0" would be the wrong number rather than a missing one.
 *
 * `installUrl` is deliberately absent too. It is added the day the listings go
 * public, alongside `store.live` in content/products.ts.
 */
export function mobileAppSchema({
  name,
  description,
  path,
  platforms,
}: {
  name: string;
  description: string;
  path: string;
  platforms: readonly string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name,
    description,
    url: absoluteUrl(path),
    applicationCategory: 'HealthApplication',
    operatingSystem: platforms.join(', '),
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
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
    /*
     * The YMYL trio: who is answerable, and as of when.
     *
     * These calculators compute a figure a visitor may act on, which is the
     * content class Google holds to the highest evidence bar. An anonymous,
     * undated number is the profile that rates worst there, regardless of how
     * accurate it actually is. The same three facts render visibly on the page
     * (components/sections/RateProvenance.tsx) and are read from the same
     * module, so the markup and the schema cannot come apart.
     */
    dateModified: RATES_REVIEWED,
    author: { '@id': `${SITE_URL}/#organization` },
    reviewedBy: { '@id': `${SITE_URL}/#organization` },
    citation: RATES_BASIS,
  };
}

/**
 * The site itself, as an entity distinct from the firm that runs it.
 *
 * `WebSite` is what lets a search engine say "these 87 URLs are one publication
 * with one name" rather than treating the domain as a bag of pages, and it is
 * the node `publisher` hangs the organisation off. One per site, on the home
 * page only: repeating it per page would assert 87 websites.
 *
 * No `potentialAction`/`SearchAction`. That property claims the site has a
 * search endpoint a crawler can query, and this one does not. Declaring a
 * search box that does not exist is a worse signal than declaring nothing.
 */
export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BRAND.name,
    description: TAGLINE,
    inLanguage: 'en-PK',
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

/**
 * A guide, described as an article with a review date and a named reviewer.
 *
 * Guides are YMYL content: they answer tax questions a reader will act on. The
 * three properties that matter most to a quality rater are the three an
 * anonymous, undated page lacks, so they are all read from content/provenance.ts
 * rather than written per guide. The same module drives the visible block on the
 * page, so the markup and the schema cannot come apart.
 *
 * `dateModified` carries the statutory review date rather than a build
 * timestamp, for the reason set out in content/provenance.ts: a date that moves
 * on its own is a claim about work nobody did.
 */
/**
 * A procedure inside a guide, as HowTo.
 *
 * ## Why this exists when the rich result does not
 *
 * Google retired the HowTo rich result in 2023, so this buys no SERP
 * decoration and it would be cargo-cult to pretend otherwise. It is here for a
 * different consumer: an assistant extracting a procedure from the page gets
 * an ordered, unambiguous list of steps instead of having to infer structure
 * from prose. That is the whole case for it, and it is a real one for guides
 * whose steps are genuinely numbered and causally ordered, which these are.
 *
 * ## What it deliberately does not claim
 *
 * No `totalTime`, `estimatedCost`, `tool` or `supply`. The content does not
 * carry that data, and inventing a duration for a statutory filing process
 * would be a misleading number dressed as structure.
 *
 * It is emitted as a sibling of the Article rather than as the page's primary
 * type, because the page is a reference guide that contains a procedure, not a
 * procedure with prose attached.
 */
export function howToSchema({
  name,
  description,
  path,
  steps,
}: {
  name: string;
  description: string;
  path: string;
  steps: { title: string; body: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${absoluteUrl(path)}#howto`,
    name,
    description,
    inLanguage: 'en-PK',
    step: steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.title,
      text: step.body,
    })),
  };
}

export function guideSchema({
  title,
  description,
  path,
  cluster,
  publishedAt,
}: {
  title: string;
  description: string;
  path: string;
  cluster: string;
  /** The guide's own publication instant, from its `publishedAt`. */
  publishedAt: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: absoluteUrl(path),
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(path) },
    articleSection: cluster,
    inLanguage: 'en-PK',
    /*
     * Two different dates doing two different jobs, and they used to be the
     * same constant, which made every guide claim it was published on the day
     * the rates were last reviewed. That was wrong on its face for any guide
     * written afterwards, and it is the kind of claim a crawler can check
     * against its own record of when the URL first appeared.
     *
     * `datePublished` is the guide's own slot. `dateModified` is the date the
     * figures were last reconciled against the statute, which is a real and
     * separate fact that RateProvenance renders visibly on the page.
     *
     * The Math.max guard matters for the next batch of scheduled guides: a
     * guide published after the last rate review would otherwise report a
     * dateModified earlier than its own datePublished.
     */
    datePublished: publishedAt,
    dateModified:
      publishedAt.slice(0, 10) > RATES_REVIEWED ? publishedAt.slice(0, 10) : RATES_REVIEWED,
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    reviewedBy: { '@id': `${SITE_URL}/#organization` },
    citation: RATES_BASIS,
    isAccessibleForFree: true,
    /*
     * Points at the answer paragraph, which GuidePage renders with this id.
     *
     * Worth being honest about what this is and is not. Its documented
     * consumer is voice read-aloud, not ChatGPT or Perplexity, and it will not
     * on its own make an assistant cite us. It is here because it is a correct,
     * zero-cost statement about our own markup: the element it names really is
     * the canonical direct answer. What actually drives extraction is that the
     * answer is the first paragraph and is self-contained, which is a content
     * discipline rather than a schema one.
     */
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#guide-answer'],
    },
  };
}

/**
 * A blog post, as Article.
 *
 * ## Why this is not `guideSchema`
 *
 * They look similar enough to merge and must not be. `guideSchema` hardcodes
 * `citation: RATES_BASIS`, the Income Tax Ordinance, because every guide is
 * sourced from it, and it pins `dateModified` to `RATES_REVIEWED`, the date a
 * person last reconciled the rates against the statute.
 *
 * Neither is true of a post. A post about n8n's pricing page has no connection
 * to the Ordinance, and emitting one as its citation would be a false statement
 * in machine-readable form, which is worse than omitting the property. Its
 * review date is likewise its own: the day someone re-read the vendor pages,
 * which has nothing to do with when Pakistani tax rates were last checked.
 *
 * So posts carry their own citations, built from the `sources` array that also
 * renders visibly at the foot of the page. One array, two consumers, no drift.
 *
 * `dateModified` falls back to `datePublished` rather than to a build date,
 * because "checked when written" is the honest claim when nobody has revisited
 * it, and a date that advances on its own is a claim about work nobody did.
 */
export function postSchema({
  title,
  description,
  path,
  cluster,
  publishedAt,
  reviewedOn,
  sources,
}: {
  title: string;
  description: string;
  path: string;
  cluster: string;
  publishedAt: string;
  reviewedOn?: string;
  sources: { label: string; url: string; readOn: string }[];
}) {
  const published = publishedAt.slice(0, 10);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: absoluteUrl(path),
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(path) },
    articleSection: cluster,
    inLanguage: 'en-PK',
    datePublished: publishedAt,
    dateModified: reviewedOn && reviewedOn > published ? reviewedOn : published,
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    /*
     * The post's own sources, as citations. A reader and a crawler get the
     * same list, from the same array that renders on the page.
     */
    citation: sources.map((s) => ({
      '@type': 'CreativeWork',
      name: s.label,
      url: s.url,
    })),
    isAccessibleForFree: true,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#post-answer'],
    },
  };
}
