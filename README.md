# plumix.net

Landing site for [Plumix](https://github.com/Plumix-Net/Plumix): Vite + React + shadcn,
prerendered to static HTML.

```bash
npm i
npm run dev          # http://localhost:8080
npm run build        # dist/: client bundle + one prerendered .html per route
node scripts/serve-dist.mjs   # preview dist/ with the hosting's URL rules
```

## Deploy

Hosted on Cloudflare Pages (project `plumix-landing`, production branch `release`).
Every push to `release` runs `.github/workflows/deploy-release-cloudflare.yml`: build in
GitHub Actions, then `wrangler pages deploy dist` (Direct Upload).

- Repository secrets: `CLOUDFLARE_API_TOKEN` (permission *Account → Cloudflare Pages → Edit*)
  and `CLOUDFLARE_ACCOUNT_ID`.
- Response headers live in `public/_headers`. Clean URLs (`/docs` → `docs.html`), the 308s from
  `/docs/` and `/docs.html`, and the real 404 (`404.html`) are Pages defaults.
- `www.plumix.net` → `https://plumix.net` and http → https are set in the Cloudflare zone
  (redirect rule, *Always Use HTTPS*), not in this repository.
