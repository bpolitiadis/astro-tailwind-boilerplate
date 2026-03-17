// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

/**
 * SITE URL — IMPORTANT FOR SEO
 * ─────────────────────────────────────────────────────────────────────────────
 * Set the SITE_URL environment variable in your deployment platform, or update
 * the fallback below to your production domain.
 *
 * This value is used by Astro for:
 *   • Canonical URL generation (prevents duplicate-content penalties)
 *   • Sitemap base URL
 *   • Open Graph URL meta tags
 *
 * It must also match `business.url` in src/config/site.config.ts.
 */
const SITE_URL = process.env.SITE_URL ?? 'https://your-domain.com'; // TODO: set your domain

export default defineConfig({
  site: SITE_URL,

  integrations: [
    tailwind(),
  ],

  build: {
    // Inline small stylesheets for faster first paint (reduces render-blocking CSS)
    inlineStylesheets: 'never',
    // Output hashed asset filenames for long-term caching
    assets: '_astro',
  },

  // Astro's built-in image optimisation service (powered by Sharp).
  // Use <Image> from 'astro:assets' in your components — it auto-generates
  // WebP/AVIF, correct srcset, and prevents layout shift via width/height.
  image: {},

  vite: {
    // Add Vite plugins here as your project grows (e.g. @vitejs/plugin-react)
  },
});
