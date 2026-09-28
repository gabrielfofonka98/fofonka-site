# fofonka-site

Página pessoal de Gabriel Fofonka. Site estático em Astro 7, publicado no Cloudflare Pages.

## Setup local

Requer Node 26 (definido em `.nvmrc`).

```bash
nvm use
npm ci
npm run dev        # http://localhost:4321
```

## Verificação e build

```bash
npm run check      # astro check (tipos e diagnósticos)
npm run build      # gera dist/
npm run test:site  # smoke tests sobre dist/ (rodar depois do build)
```

## Rotas

| Rota | Indexação |
|------|-----------|
| `/` | indexável, única URL no `sitemap.xml` |
| `/c`, `/c2`, `/d` | previews com `noindex` (fora do sitemap) |

`robots.txt` e `sitemap.xml` são gerados em `src/pages/`. Headers de segurança e o redirect `www` → apex (308) ficam em `public/_headers` e `public/_redirects`.

## Deploy

GitHub Actions publica `dist/` no projeto `fofonka-site` do Cloudflare Pages: push na `main` vai para produção; push em `feat/**` gera um preview em `<branch>.fofonka-site.pages.dev`.

## Rollback

- **Cloudflare Pages:** em Deployments, use "Rollback" no deploy anterior.
- **Git:** `git revert -m 1 <merge-commit>` na `main` e faça push; o workflow republica. A última versão em Next.js é o commit `69c2055`.
