# Lcino Editor — Landing Page

Static, crawler-first landing page for **editor.lcino.com**.
Pure HTML + CSS + a few lines of vanilla JS. No frameworks, no build step,
no client-side rendering — every word of copy is in the HTML source, which is
exactly what search crawlers and AI answer engines (GEO/AEO) want.

## Files

| File | Purpose |
|---|---|
| `index.html` | The whole page: copy, JSON-LD (SoftwareApplication + FAQPage + Organization), Open Graph |
| `css/style.css` | Editor-matched visual language (#0b0d12, teal→sky→violet, glass, aurora, springy motion) |
| `js/main.js` | Optional scroll-reveal only — page is 100% complete without JS |
| `wrangler.toml` | Cloudflare Workers static-assets deploy config |

## Deploy to Cloudflare (editor.lcino.com)

### Option A — Cloudflare Pages (recommended, git-connected)

1. Push this `landing/` folder to a GitHub repository (see below).
2. Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Pick the repo. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/` (if the repo root IS the landing folder) or `/landing` if it lives in a subfolder.
4. Deploy → you get `lcino-editor-landing.pages.dev`.
5. **Custom domain:** Pages project → *Custom domains → Set up a custom domain* → `editor.lcino.com`. Cloudflare creates the CNAME automatically if `lcino.com` is on the same account. Wait for the certificate (a minute or two).

### Option B — Workers (static assets)

```bash
cd landing
npx wrangler login
npx wrangler deploy
```
Then bind the domain: Workers & Pages → your worker → **Domains & Routes → Add → Custom domain** → `editor.lcino.com`.

### GitHub push (from this folder)

```bash
cd landing
git init
git add .
git commit -m "Lcino Editor landing page"
git branch -M main
git remote add origin git@github.com:<your-account>/<repo>.git
git push -u origin main
```

## Editing copy & prices

- Prices live in three places of `index.html`: the hero `<strong>` line, the
  comparison table rows, and the `#pricing` cards (plus the JSON-LD `offers`).
  They are plain text — search `$11.50` to find every spot.
- Feature claims map 1:1 to the shipped editor features; when a feature
  changes, update the same section name in `index.html`.

## SEO / GEO notes

- Single static HTML page; all copy server-rendered in the source (no hydration).
- `JSON-LD @graph`: `SoftwareApplication` (with offers + featureList),
  `Organization`, and `FAQPage` mirroring the visible FAQ word-for-word.
- Semantic outline: one `h1`, section `h2`s, real `<table>` for the comparison,
  `<details>` FAQ, descriptive `alt`/`aria-label`s, canonical + OG/Twitter tags.
- Target queries: “After Effects alternative”, “Premiere Pro alternative”,
  “CapCut alternative for Mac”, “local AI video editor Apple Silicon”,
  “video editor no subscription”.
