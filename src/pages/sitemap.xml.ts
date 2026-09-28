import type { APIRoute } from 'astro';
import { meta } from '../content/meta';

// Only the home is indexable; /c, /c2 and /d are noindex previews.
const urls = [new URL('/', meta.siteUrl).toString()];

const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((loc) => `  <url><loc>${loc}</loc></url>`).join('\n')}
</urlset>
`;

export const GET: APIRoute = () =>
  new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
