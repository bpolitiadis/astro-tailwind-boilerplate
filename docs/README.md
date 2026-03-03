# Documentation

Reference guides for this boilerplate. Start with the SEO checklist if you're launching a client project.

## Getting Started

| Guide | Description |
|---|---|
| [Architecture](./architecture.md) | Tech stack, routing, component patterns, API routes |
| [Content Guide](./content-guide.md) | How to add pages, components, images, and assets |
| [Tailwind Guide](./tailwind.md) | Design tokens, theme customisation, utility patterns |
| [Branding & UX](./branding-ux-guidelines.md) | Design system principles, colour, typography |

## SEO & Search

| Guide | Description |
|---|---|
| **[SEO Checklist](./seo-checklist.md)** | Step-by-step setup — start here before going live |
| [SEO Guide](./seo.md) | Strategy, meta tags, sitemap, robots.txt |
| [Security Headers](./security-headers.md) | CSP, HSTS, and other HTTP security headers |

## Quality & Testing

| Guide | Description |
|---|---|
| [Quality Guide](./quality.md) | ESLint, Prettier, TypeScript, Playwright |
| [Test Naming](./test-naming-convention.md) | Playwright test naming conventions |
| [Logging](./logging.md) | Pino logger usage and configuration |

## Deployment

| Guide | Description |
|---|---|
| [Deployment Guide](./deployment.md) | Vercel and Docker deployment |
| [Troubleshooting](./troubleshooting.md) | Common issues and fixes |

## Contributing

| Guide | Description |
|---|---|
| [Contributing](./contributing.md) | Dev workflow, code style, PR process |

---

## Quick Reference: Files to Change When Starting a Project

```
src/config/site.config.ts   ← #1: business name, URL, description, contact, social links
astro.config.mjs            ← #2: set SITE_URL env var (or update fallback)
src/styles/global.css       ← #3: CSS variables for your colour palette
tailwind.config.mjs         ← #4: extend theme with your brand tokens
public/og-image.jpg         ← #5: replace with your 1200×630 social share image
public/favicon.svg          ← #6: replace with your favicon
src/pages/sitemap.xml.ts    ← #7: add your pages to the sitemap
src/layouts/Layout.astro    ← #8: update lang attribute, add hreflang if multilingual
```
