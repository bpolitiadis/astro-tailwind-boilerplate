# SEO Setup Checklist

A step-by-step guide to making this boilerplate rank well. Work through each section before launch and after adding new pages.

---

## 1. Configuration (Do This First)

These files are the foundation. Everything else depends on them being accurate.

### `src/config/site.config.ts`

| Field | Why it matters | What to do |
|---|---|---|
| `business.name` | Used in `<title>` and Schema.org | Your exact brand/legal name |
| `business.description` | Default `<meta description>` | 150–160 chars; compelling, keyword-rich |
| `business.url` | Canonical URLs, sitemap, OG tags | Your production domain, no trailing slash |
| `business.ogImage` | Social share preview image | 1200×630 px JPG/PNG, place in `/public/` |
| `contact.phone` | LocalBusiness Schema (Maps rich results) | E.164 format: `+12125551234` |
| `contact.address` | LocalBusiness Schema (Maps rich results) | Physical address if you have one |
| `contact.coordinates` | Pin on Google Maps | Latitude/longitude from google.com/maps |
| `hours.*` | Opening hours in search results | Accurate times; `'Closed'` for closed days |
| `social.*` | `sameAs` in Schema (entity authority) | Full URLs to your real profiles |
| `legal.privacyPolicyUrl` | Required for GDPR compliance | Create the page or link external policy |

### `astro.config.mjs`

Set `SITE_URL` in your deployment environment variables **or** update the fallback:

```javascript
const SITE_URL = process.env.SITE_URL ?? 'https://acme.com';
```

This must match `business.url` in `site.config.ts` exactly.

---

## 2. Per-Page SEO (Every Page)

Every `.astro` page must pass `title` and `description` to the `Layout` component:

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout
  title="Services — What We Offer"
  description="We provide X, Y, and Z for businesses in [City]. Contact us today for a free quote."
>
  <!-- page content -->
</Layout>
```

### Title Tag Rules

- **Length**: 50–60 characters (Google truncates at ~60)
- **Format**: `Page Name | Brand Name` (Layout handles this automatically)
- **Be specific**: "Web Design Services" not "Services"
- **Avoid keyword stuffing**: one primary keyword is enough

### Meta Description Rules

- **Length**: 150–160 characters
- **Include a CTA**: "Learn more", "Get a free quote", "Contact us today"
- **Match user intent**: describe exactly what the page is about
- **Each page must be unique** — duplicate descriptions hurt rankings

### Hiding pages from Google

For pages that should not appear in search results (thank-you pages, admin, staging):

```astro
<Layout title="Thank You" noindex={true}>
```

---

## 3. Structured Data / Schema.org

Structured data is how you speak directly to Google's understanding of your content. Use the helpers in `src/lib/schema.ts`.

### Which schema to use?

| Business Type | Recommended Schema | Function |
|---|---|---|
| Physical store, clinic, restaurant | `LocalBusiness` (or a subtype) | `generateLocalBusinessSchema('MedicalClinic')` |
| Online-only / SaaS / agency | `Organization` | `generateOrganizationSchema()` |
| Blog post or article | `Article` | Build manually (see schema.org/Article) |
| FAQ content | `FAQPage` | `generateFAQSchema([...])` |
| Multi-step navigation | `BreadcrumbList` | `generateBreadcrumbSchema([...])` |
| Homepage | `WebSite` + `Organization` | `generateSchemaGraph(...)` |

### Available LocalBusiness subtypes (examples)

Use a specific subtype instead of plain `LocalBusiness` for better rich result eligibility:

- `MedicalClinic`, `Dentist`, `Physician`
- `LegalService`, `Accountant`, `FinancialService`
- `Restaurant`, `CafeOrCoffeeShop`, `Bakery`
- `HairSalon`, `BeautySalon`
- `HomeAndConstructionBusiness`, `Electrician`, `Plumber`
- `RealEstateAgent`, `AutoDealer`

Full list: [https://schema.org/LocalBusiness#subtypes](https://schema.org/LocalBusiness#subtypes)

### Adding schema to a page

```astro
---
import Layout from '../layouts/Layout.astro';
import { generateLocalBusinessSchema, generateWebSiteSchema, generateSchemaGraph } from '../lib/schema';

// Combine multiple schemas using @graph (preferred by Google)
const schemaMarkup = generateSchemaGraph(
  generateLocalBusinessSchema('MedicalClinic'),
  generateWebSiteSchema()
);
---

<Layout title="...">
  <Fragment slot="head" set:html={schemaMarkup} />
  <!-- page content -->
</Layout>
```

> **Validate**: [https://search.google.com/test/rich-results](https://search.google.com/test/rich-results)

---

## 4. Open Graph & Social Sharing

The `Layout.astro` automatically generates OG and Twitter Card tags. Your only job is:

1. **Create the OG image**: 1200×630 px, JPEG or PNG, ≤ 1 MB
2. **Place it at** `/public/og-image.jpg`
3. **Set** `business.ogImage: '/og-image.jpg'` in `site.config.ts`

For pages with unique share images (e.g. a blog post hero):

```astro
<Layout title="My Post" ogImage="/blog/my-post-og.jpg">
```

> **Preview how your page looks on social**: [https://cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator) or [https://www.opengraph.xyz](https://www.opengraph.xyz)

---

## 5. Sitemap & robots.txt

### Sitemap (`src/pages/sitemap.xml.ts`)

- Add every **public** page you create to the `pages` array
- **Do not include**: `noindex` pages, admin pages, duplicate URLs
- After deploying, **submit to Google Search Console**:
  1. Go to [https://search.google.com/search-console](https://search.google.com/search-console)
  2. Select your property → Sitemaps
  3. Enter `https://your-domain.com/sitemap.xml` → Submit

### robots.txt (`src/pages/robots.txt.ts`)

The default allows all bots. To block specific paths:

```
User-agent: *
Allow: /

Disallow: /admin/
Disallow: /private/

Sitemap: https://your-domain.com/sitemap.xml
```

---

## 6. Images

Good image SEO protects Core Web Vitals scores and provides additional ranking signals.

| Practice | How to implement |
|---|---|
| Use Astro's `<Image>` | `import { Image } from 'astro:assets'` — auto WebP, correct dimensions, lazy load |
| Always write `alt` text | Describe what is in the image in 5–15 words |
| Filename matters | `team-photo.jpg` > `IMG_4321.jpg` |
| Compress before uploading | Use [Squoosh](https://squoosh.app) or [TinyPNG](https://tinypng.com) for `/public/` images |
| Specify LCP image with `loading="eager"` | The hero/above-the-fold image should load immediately |

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/images/hero.jpg';
---
<!-- Above-the-fold: eager + fetchpriority for best LCP -->
<Image
  src={heroImage}
  alt="Our team working on a web project"
  loading="eager"
  fetchpriority="high"
  width={1200}
  height={630}
/>
```

---

## 7. Performance (Core Web Vitals)

Google uses Core Web Vitals as a ranking factor. Target these thresholds:

| Metric | Target | What affects it |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | Hero image size, font loading, server response |
| CLS (Cumulative Layout Shift) | < 0.1 | Always set `width` + `height` on images/videos |
| INP (Interaction to Next Paint) | < 200ms | JavaScript bundle size, long tasks |
| TTFB (Time to First Byte) | < 600ms | Hosting speed, CDN |

### Quick wins in this boilerplate

- `astro build` with `inlineStylesheets: 'auto'` eliminates render-blocking CSS requests
- Use `<Image>` from `astro:assets` — it sets correct dimensions automatically (prevents CLS)
- Google Fonts already uses `display=swap` — add `rel="preconnect"` tags (already in Layout.astro)

> **Measure**: [https://pagespeed.web.dev](https://pagespeed.web.dev) — test your deployed URL

---

## 8. Content & Keyword Strategy

Technical SEO without content is worthless. For each page:

1. **Identify one primary keyword** — what would someone type to find this page?
2. **Put it in**: the `<title>`, `<h1>`, first paragraph, and one image `alt`
3. **Write for humans first** — Google's ranking is getting better at detecting keyword stuffing
4. **Internal linking** — link between related pages using descriptive anchor text
5. **Page depth**: aim for ≥ 300 words on any page you want to rank

### Page naming conventions

| Page | Recommended `<h1>` pattern |
|---|---|
| Homepage | Brand name or primary value proposition |
| Services | "Professional [Service] in [City]" |
| About | "About [Brand Name] — [Tagline]" |
| Blog post | The post title (keyword at the front) |
| Contact | "Contact [Brand Name]" |

---

## 9. Technical Checklist Before Launch

Run through this before your first deploy:

- [ ] `business.url` in `site.config.ts` is set to your real domain
- [ ] `site` in `astro.config.mjs` matches the above
- [ ] `/public/og-image.jpg` exists and is 1200×630 px
- [ ] Every page has a unique `title` and `description`
- [ ] No pages that should be hidden are missing `noindex={true}`
- [ ] Sitemap is up to date with all public pages
- [ ] Google Search Console property is verified
- [ ] Sitemap is submitted in Search Console
- [ ] Schema.org output validated at [https://search.google.com/test/rich-results](https://search.google.com/test/rich-results)
- [ ] PageSpeed score ≥ 90 on mobile at [https://pagespeed.web.dev](https://pagespeed.web.dev)
- [ ] `robots.txt` is accessible at `/robots.txt`
- [ ] SSL/HTTPS is active (required for HSTS header in `vercel.json`)
- [ ] Social preview tested at [https://www.opengraph.xyz](https://www.opengraph.xyz)

---

## 10. Ongoing SEO

After launch:

- **Monitor rankings**: Google Search Console → Performance
- **Fix crawl errors**: Google Search Console → Pages (check "Not indexed" reasons)
- **Update sitemap**: whenever you add or remove pages
- **Refresh content**: Google rewards recently-updated pages for freshness-sensitive queries
- **Build backlinks**: create content worth linking to; reach out to partners
