import type { APIRoute } from 'astro';
import { meta } from '../content/meta';

// Preview routes stay crawlable so bots can read their noindex meta.
const body = `User-agent: *
Allow: /
Sitemap: ${new URL('/sitemap.xml', meta.siteUrl)}
`;

export const GET: APIRoute = () =>
  new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
