import type { APIRoute } from 'astro';
import raw from '../brand/logo.svg?raw';

// Favicon is derived from the same brand file, so the CTS-002 swap updates it too.
const style =
  '<style>svg{color:#15171c}[data-accent]{color:#d97521}@media (prefers-color-scheme:dark){svg{color:#f8f5ed}}</style>';

export const GET: APIRoute = () =>
  new Response(raw.trim().replace(/<svg([^>]*)>/, (_match, attrs: string) => `<svg${attrs}>${style}`), {
    headers: { 'Content-Type': 'image/svg+xml' },
  });
