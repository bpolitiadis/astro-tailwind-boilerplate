import type { APIRoute } from 'astro';

/**
 * Dynamic sitemap — lists all pages you want Google to crawl and index.
 *
 * HOW TO MAINTAIN THIS FILE
 * ─────────────────────────────────────────────────────────────────────────────
 * Add an entry to the `pages` array every time you create a new public page.
 * Set priority between 0.0 and 1.0:
 *   • 1.0 — homepage
 *   • 0.8 — top-level section pages (about, services, blog index)
 *   • 0.6 — leaf pages (individual blog posts, product pages)
 *   • 0.4 — utility pages (privacy policy, terms)
 *
 * For large sites (100+ pages), consider using @astrojs/sitemap instead —
 * it auto-discovers all static routes at build time:
 *   pnpm astro add sitemap
 *
 * Validate your sitemap at: https://www.xml-sitemaps.com/validate-xml-sitemap.html
 * Submit to Google: https://search.google.com/search-console (Sitemaps section)
 */

export const GET: APIRoute = ({ site }) => {
  const baseUrl = site?.toString().replace(/\/$/, '') ?? 'https://your-domain.com';

  const pages = [
    // TODO: Keep this list in sync with your actual routes in src/pages/
    { url: baseUrl, changefreq: 'weekly', priority: 1.0 },
    // { url: `${baseUrl}/about`,    changefreq: 'monthly', priority: 0.8 },
    // { url: `${baseUrl}/services`, changefreq: 'monthly', priority: 0.8 },
    // { url: `${baseUrl}/blog`,     changefreq: 'weekly',  priority: 0.8 },
    // { url: `${baseUrl}/contact`,  changefreq: 'monthly', priority: 0.6 },
    // { url: `${baseUrl}/privacy`,  changefreq: 'yearly',  priority: 0.3 },
  ];

  const lastmod = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: { 'Content-Type': 'application/xml' },
  });
};
