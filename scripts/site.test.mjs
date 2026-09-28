// Smoke tests against the built static output. Run `npm run build` first.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = 'https://gabrielfofonka.com.br';
const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const PREVIEWS = ['c', 'c2', 'd'];
const NOINDEX = /<meta\s+name="robots"\s+content="[^"]*noindex/i;

const read = (file) => readFileSync(join(DIST, file), 'utf8');
const exists = (file) => existsSync(join(DIST, file));

test('dist/ exists (run `npm run build` first)', () => {
  assert.ok(existsSync(DIST), `missing ${DIST}`);
});

test('home is indexable with canonical and Open Graph tags', () => {
  assert.ok(exists('index.html'));
  const html = read('index.html');
  assert.match(html, new RegExp(`<link rel="canonical" href="${SITE}/"`));
  assert.match(html, /<meta property="og:title" content="[^"]+"/);
  assert.match(html, new RegExp(`<meta property="og:image" content="${SITE}/og-image.png"`));
  assert.doesNotMatch(html, NOINDEX);
});

for (const page of PREVIEWS) {
  test(`preview /${page} exists and is noindex`, () => {
    assert.ok(exists(`${page}.html`), `missing ${page}.html`);
    assert.match(read(`${page}.html`), NOINDEX);
  });
}

test('404 page exists and is noindex', () => {
  assert.ok(exists('404.html'), 'missing 404.html (Cloudflare Pages would fall back to SPA mode)');
  assert.match(read('404.html'), NOINDEX);
});

test('robots.txt points to the sitemap', () => {
  assert.match(read('robots.txt'), new RegExp(`^Sitemap: ${SITE}/sitemap.xml$`, 'm'));
});

test('sitemap lists only the home', () => {
  const xml = read('sitemap.xml');
  assert.match(xml, new RegExp(`<loc>${SITE}/</loc>`));
  for (const page of PREVIEWS) {
    assert.doesNotMatch(xml, new RegExp(`<loc>${SITE}/${page}(\\.html)?/?</loc>`));
  }
});

test('Cloudflare _headers and _redirects are published', () => {
  assert.ok(exists('_headers'));
  const redirects = read('_redirects');
  assert.match(redirects, new RegExp(`^https://www\\.gabrielfofonka\\.com\\.br/\\* ${SITE}/:splat 308$`, 'm'));
  assert.match(redirects, /^\/og\.png \/og-image\.png 301$/m);
});

test('favicon and OG image are published', () => {
  assert.ok(exists('favicon.svg'));
  assert.ok(exists('og-image.png'));
});

// Maps an internal URL path to the file Cloudflare Pages would serve.
function resolveInternal(path) {
  const clean = decodeURIComponent(path.split(/[?#]/)[0]);
  if (clean === '/') return 'index.html';
  const rel = clean.replace(/^\//, '').replace(/\/$/, '');
  return [rel, `${rel}.html`, join(rel, 'index.html')].find(exists);
}

test('every internal href/src in the home resolves to a file in dist', () => {
  const html = read('index.html');
  const refs = [...html.matchAll(/\b(?:href|src)="(\/(?!\/)[^"]*)"/g)].map((m) => m[1]);
  assert.ok(refs.length > 0, 'expected at least one internal reference');
  const missing = [...new Set(refs)].filter((ref) => !resolveInternal(ref));
  assert.deepEqual(missing, [], `unresolved internal references: ${missing.join(', ')}`);
});

test('external links in the home use https', () => {
  const insecure = [...read('index.html').matchAll(/\b(?:href|src)="(http:\/\/[^"]*)"/g)].map((m) => m[1]);
  assert.deepEqual(insecure, [], `insecure links: ${insecure.join(', ')}`);
});
