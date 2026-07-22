# engineer-portfolio

Static portfolio for **Felipe Gomes** — Next.js App Router, static export, GitHub Pages project site.

**Live:** [https://lipereis.github.io/engineer-portfolio](https://lipereis.github.io/engineer-portfolio)

## Prerequisites

- Node.js 22+
- npm

## Setup

```bash
git clone https://github.com/lipereis/engineer-portfolio.git
cd engineer-portfolio
npm install
cp .env.example .env.local   # optional
```

### Environment

| Variable | Required | Purpose |
|----------|----------|---------|
| `GITHUB_TOKEN` | Optional locally | Higher GitHub API rate limit for `fetch-github` (commit stats, GraphQL calendar). CI uses Actions’ default `GITHUB_TOKEN`. |
| `NEXT_PUBLIC_SITE_URL` | Optional | Absolute site URL override for SEO. Defaults to the Pages project URL in `.env.example`. |

Without a local token, fetch may hit rate limits and reuse the existing seed under `src/data/`.

## Scripts

```bash
npm run dev              # local dev (http://localhost:3000/engineer-portfolio)
npm run fetch-github     # refresh GitHub data → src/data/
npm run build            # static export → out/ (runs fetch via prebuild)
npm start                # serve out/ (npx serve out)
npm test                 # vitest
npm run generate-resume  # regenerate public/resume.pdf
```

## Customize content

Edit [`src/config.ts`](src/config.ts) — name, links, about, experience, education, skills, and repo denylist. UI chrome strings (nav, buttons) live in `src/lib/dictionaries/{en,pt}.ts`.

## Bilingual + theme

- **Locales:** English and Portuguese (`en` / `pt`), toggled in the UI; preference persists locally.
- **Theme:** dark / light (dark default); preference persists locally.

## Deploy (GitHub Pages)

This repo deploys as a **project site** under `/engineer-portfolio`.

1. Push to `main` or `master` (or run the workflow manually).
2. In the repo: **Settings → Pages → Source → GitHub Actions**.
3. Workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
   - runs on push to `main`/`master`
   - weekly refresh Mondays 06:00 UTC
   - `workflow_dispatch` for manual runs
4. Build uploads the `out/` artifact; deploy publishes to Pages.

After the first successful run, the site is at:

https://lipereis.github.io/engineer-portfolio

## Local production check

```bash
npm run build
npx serve out
```

Open `/engineer-portfolio/` and verify sections, theme, locale, and projects.
