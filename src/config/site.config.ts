/**
 * Site Configuration — the single source of truth for your project.
 *
 * HOW TO USE THIS FILE
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. Fill in every field marked with a TODO comment before going to production.
 * 2. Sensitive values (API keys) must live in `.env`, not here.
 * 3. This config feeds Layout.astro (meta tags), schema.ts (structured data),
 *    and sitemap.xml.ts — so keeping it accurate has a direct SEO impact.
 *
 * SEO IMPACT SUMMARY
 * ─────────────────────────────────────────────────────────────────────────────
 * • business.name        → <title> suffix, Schema.org name, OG site_name
 * • business.description → <meta description>, Schema.org description
 * • business.url         → canonical URLs, sitemap, OG url
 * • business.ogImage     → Open Graph / Twitter Card image (1200×630 px)
 * • contact.*            → LocalBusiness Schema (rich results in Google Maps)
 * • social.*             → sameAs in Schema (builds entity authority)
 */

// ─── Interfaces ──────────────────────────────────────────────────────────────

export interface BusinessInfo {
  /** Full legal / brand name. Used in <title> and Schema.org. */
  name: string;
  /** Short tagline shown in the hero section and OG description. */
  tagline?: string;
  /** 150–160 character description. This is your default <meta description>. */
  description: string;
  /**
   * Canonical base URL — no trailing slash.
   * TODO: Set to your production domain, e.g. 'https://acme.com'
   * Also update the `site` field in astro.config.mjs to match.
   */
  url: string;
  /**
   * Absolute URL or path to your OG / social share image.
   * Recommended size: 1200×630 px. Place the file in /public/.
   * TODO: Replace '/og-image.jpg' with your actual image.
   */
  ogImage?: string;
  /** Path to your favicon SVG or ICO in /public/. */
  favicon?: string;
}

export interface ContactInfo {
  /**
   * Business email shown in Schema.org and footer.
   * TODO: Replace with your real contact email.
   */
  email: string;
  /**
   * Phone number in E.164 format, e.g. '+12125551234'.
   * Used in Schema.org — Google uses this for rich results.
   * TODO: Replace with your real phone number or remove if not applicable.
   */
  phone?: string;
  /**
   * Physical address. If present, Google can show you in Maps and Knowledge Panels.
   * TODO: Fill in or set to undefined if you are a fully remote/online business.
   */
  address?: {
    street: string;
    city: string;
    postalCode: string;
    country: string; // ISO 3166-1 alpha-2, e.g. 'US', 'GB', 'GR'
    region?: string;
  };
  /**
   * GPS coordinates for Google Maps rich results.
   * TODO: Get these from Google Maps or maps.google.com → right-click → "What's here?"
   */
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface BusinessHours {
  /**
   * Use 'HH:MM' 24-hour format for each day, e.g. '09:00 - 17:00'.
   * Use 'Closed' for days the business is not open.
   * TODO: Fill in your actual operating hours or remove if not applicable.
   */
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface SocialLinks {
  /**
   * Full URLs to your social profiles.
   * These populate the `sameAs` array in Schema.org, which helps Google
   * associate your website with your social entity — improving Knowledge Panel accuracy.
   * TODO: Add the profiles that apply; remove or leave undefined the rest.
   */
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  github?: string;
}

export interface LegalInfo {
  /**
   * URLs for legal pages. These are required if you operate under GDPR or similar.
   * TODO: Create these pages or link to hosted policy documents.
   */
  privacyPolicyUrl: string;
  termsOfServiceUrl: string;
  cookiePolicyUrl?: string;
  /** VAT / company registration numbers for Schema.org (improves trust signals). */
  vatNumber?: string;
  registrationNumber?: string;
}

export interface SiteConfig {
  business: BusinessInfo;
  contact: ContactInfo;
  /** Optional — only provide if you have a physical location with fixed hours. */
  hours?: BusinessHours;
  social: SocialLinks;
  legal: LegalInfo;
  /**
   * BCP 47 language tags, e.g. ['en', 'fr'].
   * The first entry is the default. Used for <html lang=""> and hreflang tags.
   * TODO: Add every language your site supports.
   */
  languages: string[];
  /** ISO 4217 currency code, e.g. 'USD', 'EUR'. Used in Schema pricing. */
  currency?: string;
}

// ─── Configuration ────────────────────────────────────────────────────────────

/**
 * TODO: Replace every placeholder below with your actual project values
 * before deploying to production.
 */
export const siteConfig: SiteConfig = {
  business: {
    name: 'Your Business Name', // TODO: e.g. 'Acme Co.'
    tagline: 'Your short, punchy tagline here.', // TODO
    description:
      'A 150–160 character description of your business for search engines. Make it compelling — this is what appears in Google search results.', // TODO
    url: 'https://your-domain.com', // TODO: must match `site` in astro.config.mjs
    ogImage: '/og-image.jpg', // TODO: replace with your 1200×630 image in /public/
    favicon: '/favicon.svg',
  },

  contact: {
    email: 'hello@your-domain.com', // TODO
    phone: '+1 (555) 000-0000', // TODO: E.164 format recommended, or remove field
    address: {
      // TODO: Fill in your address, or remove this block if fully online
      street: '123 Main Street',
      city: 'Your City',
      postalCode: '00000',
      country: 'US',
    },
    // coordinates: { lat: 0.0, lng: 0.0 }, // TODO: uncomment and fill for Maps rich results
  },

  hours: {
    // TODO: Update with your actual hours, or remove `hours` from siteConfig entirely
    monday: '09:00 - 17:00',
    tuesday: '09:00 - 17:00',
    wednesday: '09:00 - 17:00',
    thursday: '09:00 - 17:00',
    friday: '09:00 - 17:00',
    saturday: 'Closed',
    sunday: 'Closed',
  },

  social: {
    // TODO: Add your actual profile URLs; delete entries that don't apply
    // facebook: 'https://facebook.com/your-page',
    // twitter: 'https://twitter.com/your-handle',
    // instagram: 'https://instagram.com/your-handle',
    // linkedin: 'https://linkedin.com/company/your-company',
    // youtube: 'https://youtube.com/@your-channel',
    // github: 'https://github.com/your-org',
  },

  legal: {
    privacyPolicyUrl: '/privacy', // TODO: create this page
    termsOfServiceUrl: '/terms', // TODO: create this page
    // cookiePolicyUrl: '/cookies', // TODO: uncomment if you use cookies
    // vatNumber: 'XX000000000', // TODO: add if applicable
  },

  languages: ['en'], // TODO: add more language codes if you support multiple locales
  currency: 'USD', // TODO: change to your primary currency
};

// ─── Accessor helpers ─────────────────────────────────────────────────────────
// Used by schema.ts and Layout.astro. Add more as needed.

export const getBusinessName = () => siteConfig.business.name;
export const getBusinessDescription = () => siteConfig.business.description;
export const getBusinessUrl = () => siteConfig.business.url;
export const getOgImage = () => siteConfig.business.ogImage ?? '/og-image.jpg';
export const getContactEmail = () => siteConfig.contact.email;
export const getContactPhone = () => siteConfig.contact.phone ?? '';
export const getSocialLinks = () => siteConfig.social;
export const getBusinessHours = () => siteConfig.hours;
export const getLegalInfo = () => siteConfig.legal;

/**
 * Formats a physical address into a comma-separated string.
 * @param address - The address object to format.
 * @returns A formatted address string or an empty string if no address is provided.
 */
export function formatAddress(address?: ContactInfo['address']): string {
  if (!address) return '';
  const parts = [address.street, address.postalCode, address.city, address.country].filter(Boolean);
  return parts.join(', ');
}

export function getBusinessAddress(): string {
  return formatAddress(siteConfig.contact.address);
}

export function getBusinessCoordinates(): { lat: number; lng: number } | null {
  return siteConfig.contact.coordinates ?? null;
}

// ─── Config validation (runs at build time) ───────────────────────────────────

export function validateSiteConfig(config: SiteConfig): string[] {
  const warnings: string[] = [];

  if (config.business.url.includes('your-domain.com')) {
    warnings.push('business.url still contains placeholder "your-domain.com". Update before deploying.');
  }
  if (config.business.name === 'Your Business Name') {
    warnings.push('business.name is still the placeholder. Update in site.config.ts.');
  }
  if (!config.business.ogImage) {
    warnings.push('business.ogImage is not set. Add a 1200×630 image for social sharing.');
  }

  return warnings;
}

export default siteConfig;
