# Astro + Tailwind Boilerplate

> A modern, production-ready starting point for Astro projects.

Clean, minimal, and SEO-ready. Built to be customised — not wrestled with.

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| [Astro](https://astro.build) | ^5.12 | Framework (SSG / SSR) |
| [Tailwind CSS](https://tailwindcss.com) | ^3.4 | Utility-first styling |
| [TypeScript](https://www.typescriptlang.org) | ^5.6 | Type safety |
| [Pino](https://getpino.io) | ^9.7 | Structured logging (server-side / build) |
| [Resend](https://resend.com) | ^4.8 | Transactional email (opt-in) |
| [Playwright](https://playwright.dev) | ^1.54 | End-to-end testing |
| [ESLint](https://eslint.org) | ^9.32 | Linting (flat config) |
| [Prettier](https://prettier.io) | ^3.6 | Code formatting |
| [Sharp](https://sharp.pixelplumbing.com) | ^0.33 | Image optimisation |

## Features

- **Zero-config SEO**: canonical URLs, OG tags, Twitter Cards, and Schema.org structured data wired up out of the box
- **Type-safe site config**: one file (`src/config/site.config.ts`) drives meta tags, schema, and the sitemap
- **Production-grade styling**: Tailwind with CSS variable theming (light/dark), responsive layout utilities, and a shadcn-style component library
- **Accessible by default**: skip links, semantic HTML, and `focus-visible` ring styles included
- **Docker + Nginx**: multi-stage build with correct MPA routing and security headers
- **Vercel-ready**: `vercel.json` with HSTS, CSP, asset caching, and function config

## Getting Started

### Prerequisites

- Node.js ≥ 20.0.0
- pnpm ≥ 9.0.0

### Install

```bash
git clone https://github.com/bpolitiadis/astro-tailwind-boilerplate.git
cd astro-tailwind-boilerplate
pnpm install
```

### Configure

```bash
cp env.example .env
```

Open `.env` and add your values. Then open `src/config/site.config.ts` and fill in your business details — this is the most important file for SEO.

### Develop

```bash
pnpm dev       # http://localhost:4321
pnpm build     # type-check + production build
pnpm preview   # serve the production build locally
```

## Customising for a New Project

Work through these files in order:

```
1. src/config/site.config.ts   → business name, URL, contact, social links
2. astro.config.mjs            → set SITE_URL env var (or update fallback)
3. src/styles/global.css       → CSS variables for your colour palette
4. tailwind.config.mjs         → extend theme with your brand tokens
5. public/og-image.jpg         → your 1200×630 social share image
6. public/favicon.svg          → your favicon
7. src/pages/sitemap.xml.ts    → add your pages to the sitemap
8. src/pages/index.astro       → replace placeholder content
```

See [docs/seo-checklist.md](docs/seo-checklist.md) for the full launch checklist.

## Project Structure

```
src/
├── components/
│   ├── Header.astro
│   ├── Footer.astro
│   ├── SkipLinks.astro
│   └── ui/               ← shadcn-style component library
│       ├── Button.astro
│       ├── Card.astro
│       ├── Input.astro
│       ├── Textarea.astro
│       └── Badge.astro
├── config/
│   └── site.config.ts    ← single source of truth for all site metadata
├── layouts/
│   └── Layout.astro      ← base layout with full SEO <head>
├── lib/
│   ├── logger.ts         ← structured logging (Pino)
│   └── schema.ts         ← Schema.org structured data helpers
├── pages/
│   ├── index.astro
│   ├── 404.astro
│   ├── sitemap.xml.ts
│   ├── robots.txt.ts
│   └── docs/             ← renders this /docs directory as a site
└── styles/
    └── global.css        ← Tailwind imports + CSS variables + component classes
public/
├── favicon.svg
└── og-image.jpg          ← replace with your own
tests/
├── e2e/                  ← Playwright tests
└── page-objects/         ← Page Object Models
docs/                     ← developer documentation
```

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server (port 4321) |
| `pnpm build` | Type-check then build for production |
| `pnpm preview` | Preview the production build |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Auto-fix ESLint errors |
| `pnpm format` | Format with Prettier |
| `pnpm type-check` | Run `astro check` (TypeScript + Astro) |
| `pnpm test` | Run Playwright E2E tests |
| `pnpm test:ui` | Run tests with Playwright UI |
| `pnpm clean` | Delete `dist/` and `.astro/` |

## Testing

```bash
pnpm install:playwright   # install browser binaries (first time)
pnpm test                 # run all E2E tests
pnpm test:headed          # watch tests run in the browser
pnpm test:debug           # step through tests with Playwright inspector
```

## Deployment

### Vercel (recommended for SSR / API routes)

1. Push to GitHub
2. Import the repo in [vercel.com](https://vercel.com)
3. Set the `SITE_URL` environment variable to your production domain
4. Set any other env vars from `.env.example`
5. Deploy — Vercel picks up `vercel.json` automatically

### Docker (recommended for self-hosted / static output)

```bash
docker build -t my-site .
docker run -p 80:80 my-site
```

The multi-stage Dockerfile outputs a static build served by Nginx with full security headers and correct MPA routing.

## Documentation

- [SEO Checklist](docs/seo-checklist.md) — start here before going live
- [Architecture](docs/architecture.md) — tech stack and component patterns
- [Content Guide](docs/content-guide.md) — adding pages, components, and assets
- [Tailwind Guide](docs/tailwind.md) — theme customisation
- [Deployment](docs/deployment.md) — Vercel and Docker guides
- [Quality](docs/quality.md) — linting, formatting, and testing
- [Logging](docs/logging.md) — structured logging with Pino
- [Troubleshooting](docs/troubleshooting.md) — common issues and fixes

## Author

Built and maintained by **[Vasileios Politeiadis](https://vpoliteiadis.dev)** — [@bpolitiadis](https://github.com/bpolitiadis) on GitHub.

## License

MIT
