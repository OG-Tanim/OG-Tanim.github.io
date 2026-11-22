# Tanim Ahmed — portfolio

Next.js 16 site, exported as static files (`output: "export"`) and hosted on
Cloudflare Pages. All copy lives in `src/data/content.ts`.

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

## Deploy to Cloudflare Pages

### Option A — connect the GitHub repo (rebuilds on every push)

1. Push this project to a GitHub repository.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**,
   then pick the repository.
3. Build settings:

   | Setting                | Value                          |
   | ---------------------- | ------------------------------ |
   | Framework preset       | Next.js (Static HTML Export)   |
   | Root directory         | `site` (if the repo root is the `Portfolio` folder; leave empty if the repo *is* `site`) |
   | Build command          | `npm run build`                |
   | Build output directory | `out`                          |

   Node is pinned to 22 by `.node-version`, so no environment variable is needed.
4. **Save and Deploy.** The site goes live at `<project>.pages.dev`.

### Option B — upload a local build (no Git needed)

```bash
npm run build
npx wrangler pages deploy out --project-name <project-name>
```

Wrangler asks you to log in to Cloudflare the first time.

### Custom domain

In the Pages project: **Custom domains → Set up a custom domain**. If the
domain's DNS is on Cloudflare, it is configured automatically.

## Notes

- `public/_headers` sets Cloudflare response headers: build assets in
  `/_next/static/` are cached for a year (their filenames are content-hashed),
  plus basic security headers.
- `trailingSlash: true` makes every page a folder with an `index.html`
  (`/work/the-eye/`), which static hosts resolve unambiguously.
- Unknown URLs are served `404.html`.
- No server features are used. Cache Components and next/image optimization
  stay off because a static export can't run them.
