# Tanim Ahmed — portfolio

Next.js 16 site, exported as static files (`output: "export"`) and hosted on
GitHub Pages. All copy lives in `src/data/content.ts`.

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

## Deploy (GitHub Pages)

Live at **https://og-tanim.github.io**.

`.github/workflows/deploy.yml` builds the static export and publishes `out/` to
GitHub Pages on every push to `main`. It can also be started by hand from the
repo's **Actions** tab ("Deploy to GitHub Pages" → **Run workflow**).

Pages is set to deploy from **GitHub Actions** (Settings → Pages → Source).
The repo must stay named `OG-Tanim.github.io` for the site to live at the root
URL. Under any other name it would move to `/<repo-name>`, which this build
isn't set up for.

### Custom domain (optional)

Buy a domain, then in **Settings → Pages → Custom domain** enter it and follow
GitHub's DNS instructions. Tick **Enforce HTTPS** once the certificate is issued.

## Notes

- Unknown URLs get `404.html`, which GitHub Pages serves automatically.
- The workflow adds `out/.nojekyll` so Pages doesn't drop the `_next/` folder.
- `trailingSlash: true` makes every page a folder with an `index.html`
  (`/work/the-eye/`), which static hosts resolve unambiguously.
- No server features are used. Cache Components and next/image optimization
  stay off because a static export can't run them.
