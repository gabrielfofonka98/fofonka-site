import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://gabrielfofonka.com.br',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'file',
    inlineStylesheets: 'always',
  },
  compressHTML: true,
});
