# Tanim Ahmed — portfolio

Next.js 16 site, exported as static files (`output: "export"`) and hosted on
Cloudflare (a Worker serving static assets). All copy lives in `src/data/content.ts`.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build and preview the static site

```bash
npm run build      # writes the whole site to out/
npm run preview    # serves out/ at http://localhost:3000, like a static host
```

`out/` is plain HTML/CSS/JS. Any static host can serve it.

## Deploy to Cloudflare

The site is served by a Cloudflare **Worker with static assets**, configured in
`wrangler.jsonc`: the Worker has no code and only serves the files in `out/`.

### Connected repository (current setup)

The Cloudflare project `portfolio` builds from GitHub on every push to `main`:

| Setting        | Value                |
| -------------- | -------------------- |
| Build command  | `npm run build`      |
| Deploy command | `npx wrangler deploy`|
| Root directory | *(empty — the repo is this folder)* |

`wrangler.jsonc` must stay in the repo. Without it, `wrangler deploy` tries to
auto-configure OpenNext (a Next.js server adapter), which fails on a static
export.

### Deploy from your machine

```bash
npm run build
npx wrangler deploy      # asks you to log in to Cloudflare the first time
```

### Custom domain

In the Worker's settings: **Domains & Routes → Add → Custom domain**. If the
domain's DNS is on Cloudflare, it is configured automatically.

## Notes

- `wrangler.jsonc` serves `out/` with `auto-trailing-slash` (`/work/the-eye`
  redirects to `/work/the-eye/`) and `404-page` (unknown URLs get `404.html`).
- `public/_headers` sets Cloudflare response headers: build assets in
  `/_next/static/` are cached for a year (their filenames are content-hashed),
  plus basic security headers.
- `trailingSlash: true` makes every page a folder with an `index.html`
  (`/work/the-eye/`), which static hosts resolve unambiguously.
- No server features are used. Cache Components and next/image optimization
  stay off because a static export can't run them.
