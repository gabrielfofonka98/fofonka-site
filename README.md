# fofonka-site

Página pessoal de Gabriel Fofonka. One-pager Next.js + Tailwind, static export, Cloudflare Pages.

## Setup local

```bash
nvm use            # Node 20
npm install
npm run dev        # http://localhost:3000
```

## Build

```bash
npm run build
npx serve out      # smoke test
```

## Deploy

Cloudflare Pages auto-deploy via push (Gage configura em CTS-007).

## Refs

- PRD: `~/fofonka/docs/product/PRD-fofonka-personal-page.md`
- SPEC: `~/fofonka/docs/specs/SPEC-fofonka-personal-page.md`
- Design spec: `~/fofonka/docs/design/personal-page-spec.md` (+ amendment §13)
- Copy: `~/fofonka/docs/design/personal-page-copy.md`
- ADR motion stack: `~/fofonka/docs/architecture/ADR-001-wow-moment-stack.md`
- Decision log: `~/fofonka/docs/decisions/DECISION-LOG.md`
