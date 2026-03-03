/**
 * Schema.org structured data helpers.
 *
 * WHY THIS MATTERS FOR SEO
 * ─────────────────────────────────────────────────────────────────────────────
 * Structured data tells Google what your content means, not just what it says.
 * Google uses it to generate rich results (star ratings, FAQs, breadcrumbs,
 * Knowledge Panels) which increase click-through rates significantly.
 *
 * HOW TO USE
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. Choose the schema(s) that match your page type (see functions below).
 * 2. Generate the JSON-LD string using `generateSchemaScript(schema)`.
 * 3. Inject it into your page's <head> via a <Fragment set:html={...} />.
 *
 * EXAMPLE (in an .astro page):
 *   ---
 *   import { generateLocalBusinessSchema, generateSchemaScript } from '../lib/schema';
 *   const schema = generateSchemaScript(generateLocalBusinessSchema());
 *   ---
 *   <head>
 *     <Fragment set:html={schema} />
 *   </head>
 *
 * VALIDATE your output at: https://search.google.com/test/rich-results
 */

import {
  getBusinessName,
  getBusinessDescription,
  getBusinessUrl,
  getContactEmail,
  getContactPhone,
  getBusinessAddress,
  getBusinessCoordinates,
  getBusinessHours,
  getSocialLinks,
  getLegalInfo,
} from '../config/site.config';

// ─── Type Definitions ─────────────────────────────────────────────────────────

export interface LocalBusinessSchema {
  '@context': 'https://schema.org';
  '@type': string;
  name: string;
  description: string;
  url: string;
  telephone?: string;
  email?: string;
  address?: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
    addressRegion?: string;
  };
  geo?: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  openingHoursSpecification?: Array<{
    '@type': 'OpeningHoursSpecification';
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }>;
  sameAs?: string[];
  logo?: string;
  image?: string;
  priceRange?: string;
  currenciesAccepted?: string;
  paymentAccepted?: string[];
}

export interface OrganizationSchema {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  description: string;
  url: string;
  logo?: string;
  image?: string;
  address?: LocalBusinessSchema['address'];
  contactPoint?: {
    '@type': 'ContactPoint';
    telephone?: string;
    contactType: string;
    email?: string;
  };
  sameAs?: string[];
  foundingDate?: string;
  vatID?: string;
  taxID?: string;
}

export interface FAQSchema {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

export interface BreadcrumbSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildAddress(): LocalBusinessSchema['address'] | undefined {
  const raw = getBusinessAddress();
  if (!raw) return undefined;

  const parts = raw.split(', ');
  if (parts.length < 3) return undefined;

  return {
    '@type': 'PostalAddress',
    streetAddress: parts[0],
    postalCode: parts[1],
    addressLocality: parts[2],
    addressCountry: parts[3] ?? '',
  };
}

function buildOpeningHours(): LocalBusinessSchema['openingHoursSpecification'] {
  const hours = getBusinessHours();
  if (!hours) return [];

  const dayMap: Record<string, string> = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
  };

  return Object.entries(hours)
    .filter(([, value]) => value.toLowerCase() !== 'closed')
    .flatMap(([day, range]) => {
      const [opens, closes] = range.split(' - ');
      if (!opens || !closes) return [];
      return [{
        '@type': 'OpeningHoursSpecification' as const,
        dayOfWeek: [dayMap[day]],
        opens: opens.trim(),
        closes: closes.trim(),
      }];
    });
}

// ─── Schema Generators ────────────────────────────────────────────────────────

/**
 * LocalBusiness schema — best for physical stores, service providers,
 * restaurants, clinics, etc.
 *
 * SEO IMPACT: Enables Google Knowledge Panel, Maps rich results, and
 * "business hours" display directly in search results.
 *
 * @param businessType  Schema.org @type. Use a specific subtype when possible:
 *   'Restaurant', 'MedicalClinic', 'LegalService', 'HomeAndConstructionBusiness', etc.
 *   Full list: https://schema.org/LocalBusiness#subtypes
 * @param overrides     Additional Schema.org fields to merge in.
 */
export function generateLocalBusinessSchema(
  businessType = 'LocalBusiness',
  overrides: Record<string, unknown> = {}
): LocalBusinessSchema {
  const social = getSocialLinks();

  return {
    '@context': 'https://schema.org',
    '@type': businessType,
    name: getBusinessName(),
    description: getBusinessDescription(),
    url: getBusinessUrl(),
    telephone: getContactPhone() || undefined,
    email: getContactEmail() || undefined,
    address: buildAddress(),
    geo: (() => {
      const coords = getBusinessCoordinates();
      return coords
        ? { '@type': 'GeoCoordinates' as const, latitude: coords.lat, longitude: coords.lng }
        : undefined;
    })(),
    openingHoursSpecification: buildOpeningHours(),
    sameAs: Object.values(social).filter((v): v is string => Boolean(v)),
    ...overrides,
  };
}

/**
 * Organization schema — best for companies, nonprofits, or online-only businesses
 * without a physical storefront.
 *
 * SEO IMPACT: Helps Google establish your brand entity and may power a
 * Knowledge Panel with logo, description, and social profiles.
 *
 * @param overrides  Additional Schema.org fields to merge in.
 */
export function generateOrganizationSchema(
  overrides: Record<string, unknown> = {}
): OrganizationSchema {
  const legal = getLegalInfo();
  const social = getSocialLinks();
  const phone = getContactPhone();
  const email = getContactEmail();

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: getBusinessName(),
    description: getBusinessDescription(),
    url: getBusinessUrl(),
    address: buildAddress(),
    contactPoint: (phone || email)
      ? {
          '@type': 'ContactPoint',
          telephone: phone || undefined,
          contactType: 'customer service',
          email: email || undefined,
        }
      : undefined,
    sameAs: Object.values(social).filter((v): v is string => Boolean(v)),
    vatID: legal.vatNumber,
    taxID: legal.registrationNumber,
    ...overrides,
  };
}

/**
 * FAQ schema — for pages that contain question-and-answer content.
 *
 * SEO IMPACT: Google may display your FAQ directly in search results as an
 * expandable accordion, significantly increasing your result's real estate.
 *
 * NOTE: Do not use this for content that already appears as Q&A rich results
 * from another schema type on the same page.
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
): FAQSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

/**
 * Breadcrumb schema — reflects the page's position in your site hierarchy.
 *
 * SEO IMPACT: Google displays the breadcrumb path in search results instead
 * of the raw URL, making results cleaner and more click-worthy.
 *
 * EXAMPLE:
 *   generateBreadcrumbSchema([
 *     { name: 'Home', url: 'https://acme.com' },
 *     { name: 'Blog', url: 'https://acme.com/blog' },
 *     { name: 'My Post', url: 'https://acme.com/blog/my-post' },
 *   ])
 */
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>
): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map(({ name, url }, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: url,
    })),
  };
}

/**
 * WebSite schema with Sitelinks Searchbox potential.
 *
 * SEO IMPACT: Required for Google to potentially show a search box directly
 * in your search result. Only add `potentialAction` if you have a working
 * site search at `${url}/search?q={term}`.
 */
export function generateWebSiteSchema(includeSiteSearch = false): Record<string, unknown> {
  const url = getBusinessUrl();
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: getBusinessName(),
    description: getBusinessDescription(),
    url,
    publisher: { '@type': 'Organization', name: getBusinessName() },
  };

  if (includeSiteSearch) {
    // TODO: Only enable this if you have a functional /search?q= endpoint
    schema.potentialAction = {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${url}/search?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    };
  }

  return schema;
}

/**
 * WebPage schema — for individual pages (articles, landing pages, etc.).
 *
 * SEO IMPACT: Provides explicit page-level metadata. Essential for blog posts
 * and landing pages you want indexed with high fidelity.
 */
export function generateWebPageSchema(
  name: string,
  description: string,
  url: string
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    isPartOf: { '@type': 'WebSite', name: getBusinessName(), url: getBusinessUrl() },
    publisher: { '@type': 'Organization', name: getBusinessName() },
  };
}

// ─── Output Utilities ─────────────────────────────────────────────────────────

/** Serialises a schema object into a <script type="application/ld+json"> tag. */
export function generateSchemaScript(schema: Record<string, unknown>): string {
  return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
}

/** Combines multiple schema objects into a @graph array (preferred by Google). */
export function generateSchemaGraph(...schemas: Record<string, unknown>[]): string {
  return generateSchemaScript({
    '@context': 'https://schema.org',
    '@graph': schemas,
  });
}

/**
 * Basic validation — warns about missing required fields.
 * Run this at build time to catch config issues early.
 */
export function validateSchema(schema: Record<string, unknown>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!schema['@context']) errors.push('Missing @context');
  if (!schema['@type']) errors.push('Missing @type');
  if (!schema['name']) errors.push('Missing name');
  return { valid: errors.length === 0, errors };
}
