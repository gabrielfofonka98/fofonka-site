import type { MetadataRoute } from 'next';

const siteUrl = 'https://gabrielfofonka.com.br';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date('2026-05-11'),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
