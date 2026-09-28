import type { APIRoute } from 'astro';
import { meta } from '../content/meta';

// Only the home is indexable; /c, /c2 and /d are noindex previews.
const urls = [new URL('/', meta.siteUrl).toString()];

// Each deploy ships new content, so the build date is the home's lastmod.
const lastmod = new Date().toISOString().slice(0, 10);

const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((loc) => `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n')}
</urlset>
`;

export const GET: APIRoute = () =>
  new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
