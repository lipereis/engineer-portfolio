# Felipe Gomes — Premium Engineering Portfolio Design

**Date:** 2026-07-22  
**Status:** Approved (conversation) — pending user review of this file  
**Owner:** Felipe Gomes (`lipereis`)  
**Live URL (target):** `https://lipereis.github.io/engineer-portfolio`

---

## 1. Purpose

A GitHub Pages–hosted portfolio that helps Felipe land a software engineering role. The site must feel unique and premium (Vercel / Linear / Stripe / Framer caliber), automatically surface his strongest public GitHub work, and tell a coherent story: video editor → product builder → software engineer.

**Success criteria**

- Recruiter can understand who he is and what he ships in under 10 seconds.
- Top 6 projects ranked automatically (no manual curation).
- Bilingual EN/PT, dark-default theme, deployable via GitHub Actions → Pages.
- Lighthouse targets: Performance / Accessibility / SEO / Best Practices ≈ 100.
- Content editable primarily via `config.ts`.

---

## 2. Positioning & Copy Frame

| Layer | Decision |
|-------|----------|
| Brand narrative | Creative hybrid: video craft + product + AI tooling |
| Job-market headline | Software Engineer |
| Focus line | Frontend · Full-stack capable |
| Location | Rio de Janeiro |

Hero arc sentence (draft, EN): video editor transitioning into software engineering — building products with code and AI.

All marketing strings live in i18n dictionaries keyed from `config.ts` where personal.

---

## 3. Identity & Config

Single source of truth: `src/config.ts`.

```ts
// Conceptual shape — exact fields set at implementation
{
  name: "Felipe Gomes",
  githubUsername: "lipereis",
  email: "felipedrg02@gmail.com",
  linkedin: "https://www.linkedin.com/in/felipe-gomes-0220b7247/",
  resumeUrl: "/resume.pdf", // Next basePath prefixes automatically
  socials: {}, // none for now
  siteUrl: "https://lipereis.github.io/engineer-portfolio",
  basePath: "/engineer-portfolio",
  experience: [], // drafted from GitHub + career arc
  education: [], // drafted; editable
  skills: {
    frontend: [],
    backend: [],
    languages: [],
    databases: [],
    tools: [],
    design: [],
  },
  about: { en: "", pt: "" },
}
```

**Resume:** Generate a starter PDF at `public/resume.pdf` from drafted content. Felipe edits copy later via config + regenerate if needed.

**Experience / education / about:** Drafted by implementer from GitHub profile + career arc (Approach A). No blocking paste from Felipe before build.

---

## 4. Architecture

### 4.1 Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui + Lucide
- Framer Motion
- Deploy: static export → GitHub Pages

### 4.2 Data strategy (Approach 1 — selected)

**Build-time GitHub fetch only.** No client calls to GitHub API.

1. `scripts/fetch-github.ts` runs before / as part of `npm run build`.
2. Uses GitHub REST API (`GITHUB_TOKEN` in Actions when available; unauthenticated locally with fallback).
3. Writes `src/data/github.json`. **Decision:** generate in CI on every deploy; also commit a seeded snapshot so local `next dev` works offline. CI overwrites the file in the build workspace (does not need to push the JSON back unless we choose to later).
4. Ranking runs in the script; JSON includes `profile`, `topProjects` (length 6), `allProjects`, `stats`, `languages`, `contributionWeeks`, `commitActivity`.

**Contribution calendar:** Build script uses GitHub GraphQL `contributionsCollection` for `lipereis` with `GITHUB_TOKEN`. If GraphQL unavailable locally, omit calendar cells and show totals/languages only (no fake data).

**Offline / failure:** If fetch fails and a previous `github.json` exists, warn and reuse. If none exists, fail the build with a clear error.

**Freshness:** GitHub Action on push to `main` + weekly cron rebuild.

### 4.3 Folder structure

```
src/config.ts
scripts/fetch-github.ts
src/
  app/
    layout.tsx
    page.tsx
    not-found.tsx
    globals.css
  components/
    layout/          # Nav, Footer, ScrollProgress, BackToTop, LoadingScreen
    hero/
    about/
    skills/
    projects/
    stats/
    experience/
    education/
    contact/
    search/          # "Ask me about my projects"
    ui/              # shadcn + magnetic button, theme toggle, lang toggle, command menu
  hooks/
  lib/               # rank, github types, i18n, utils, seo
  data/github.json
public/
  resume.pdf
  favicon.ico / icons
.github/workflows/deploy.yml
```

### 4.4 Next.js Pages constraints

- `output: 'export'`
- `basePath: '/engineer-portfolio'`
- `assetPrefix: '/engineer-portfolio'` (if required by Next version)
- `images.unoptimized: true` (required for static export)
- Trailing slash: follow Next + Pages convention (`trailingSlash: true` if needed for Pages)

---

## 5. Visual Design

**Direction:** High-contrast craft — charcoal ground, warm highlight, tactile texture, cinematic motion.

**Palette (CSS variables)**

| Token | Dark | Light |
|-------|------|-------|
| `--bg` | `#0C0B0A` | `#E6E4E1` (cool stone — avoid cream/terracotta cliché) |
| `--fg` | `#F5F0E8` warm off-white | `#141210` |
| `--accent` | `#E8A45A` (amber-bronze) | `#C4843A` (deeper for contrast on light) |
| `--muted` | `#9A948C` | `#6B6560` |
| `--border` | `white` @ ~8% | charcoal @ ~12% |

**Texture:** Subtle film-grain / noise overlay at low opacity. Avoid flat pure black and purple-glow AI defaults.

**Typography**

- Display: **Instrument Serif**
- UI / body: **Geist Sans**
- No Inter / Roboto / Arial / system-only stacks as primary

**Hero composition rules (first viewport)**

- One composition, not a dashboard
- Brand name **Felipe Gomes** is the dominant signal
- One headline / role line, one short supporting sentence, one CTA group
- Full-bleed animated gradient + parallax grain as the visual plane
- No cards, stat strips, floating badges, or promo chips in the hero

**Motion**

- Section reveal (fade + rise)
- Parallax hero layers
- Magnetic buttons
- Desktop cursor glow (disabled when `prefers-reduced-motion: reduce`)
- Scroll progress bar, soft page transitions
- Typing animation on a secondary hero line

---

## 6. Page Sections (single-page home)

Order:

1. Animated loading screen  
2. **Hero** — name, Software Engineer, Frontend / Full-stack capable, arc sentence, CTAs: View Projects, Download Resume, GitHub, LinkedIn  
3. **About** — professional summary + timeline (Video Editing → Learning Programming → Current Transition → Future Goals)  
4. **Skills** — animated cards grouped: Frontend, Backend, Programming Languages, Databases, Tools, Design (Lucide icons)  
5. **Featured Projects** — Top 6 ranked cards  
6. **Ask me about my projects** — client-side keyword search over `allProjects` from build JSON  
7. **GitHub Statistics** — totals, languages, commit activity, contribution calendar (static data)  
8. **Experience** — timeline, config-driven for future entries  
9. **Education** — University / Courses / Certificates cards  
10. **Contact** — email, copy email, LinkedIn, GitHub  
11. Footer  

**Extras:** Command menu (⌘K), back-to-top, 404 page, custom favicon, theme toggle, language toggle.

---

## 7. Repository Ranking

### 7.1 Inclusion / exclusion

- Include public non-fork repos owned by `lipereis`
- Exclude: empty profile README-only repo if score near zero; optional denylist in config (e.g. `lipereis`, course mirrors if desired)
- Prefer repos with description, language, or meaningful size

### 7.2 Score (0–100)

| Signal | Weight | Notes |
|--------|--------|-------|
| Stars + forks | 15% | Low signal today (mostly 0); still included |
| Commits (recent window, e.g. 1 year) | 25% | Primary signal |
| Description quality | 15% | Length, non-placeholder text |
| Topics | 10% | Count |
| Language boost | 10% | Favor TypeScript, JavaScript, Python, and stack relevance |
| Size (capped) | 10% | Distinguishes stubs vs real work |
| Recency | 15% | Decay from `pushed_at` |

Tunable constants live in `lib/rank.ts`. Display only Top **6**. Full scored list retained for search.

### 7.3 Project card UI

- Image: GitHub Open Graph / social preview when available; else generated placeholder (name + language gradient)
- Name, description, language, stars, forks, topics
- Buttons: Live Demo (only if `homepage` set), GitHub
- Hover: lift + subtle warm glow

### 7.4 Stats

From build JSON:

- Repository count, total stars, followers, following
- Most-used languages (aggregate)
- Commit activity series
- Contribution calendar weeks (precomputed; render as static grid/SVG)

---

## 8. i18n & Theme

- Languages: English and Portuguese; visitor chooses; persist `localStorage`
- Default language: detect `navigator.language` if `pt*`, else `en`; still allow toggle
- Theme: dark default; light optional; persist preference
- Command menu actions include jump-to-section, theme, language, copy email, open socials

---

## 9. SEO & Structured Data

- Meta title/description per locale default (EN primary in `<head>` for hiring; PT available in UI)
- Open Graph + Twitter Card images (static OG asset under `public/`)
- `sitemap.xml`, `robots.txt`
- JSON-LD: `Person` + `WebSite`
- Canonical URL: `https://lipereis.github.io/engineer-portfolio`

---

## 10. Performance & Accessibility

- Static HTML/CSS/JS only at runtime
- Font loading: `display: swap`, subset if possible
- Respect `prefers-reduced-motion`
- Semantic landmarks, focus states, keyboard ⌘K, sufficient contrast on accent
- No CLS: explicit dimensions for media/placeholders
- Lazy-load below-fold heavy visuals

---

## 11. Error Handling & Edge Cases

| Case | Behavior |
|------|----------|
| GitHub API rate limit in CI | Fail with message to retry; use token |
| Missing `homepage` on repo | Hide Live Demo button |
| Zero stars across board | Ranking still works via commits/description/recency |
| Empty topics | Hide topic chips |
| Reduced motion | Disable parallax, cursor glow, magnetic pull |

---

## 12. Deployment

**Repo:** this project (`engineer-portfolio`) as project site.

**Workflow:**

1. Checkout  
2. Setup Node  
3. `npm ci`  
4. `npm run fetch-github` (env: `GITHUB_TOKEN`)  
5. `npm run build`  
6. Upload `out/` to GitHub Pages  

**README:** install, local dev, env vars (`GITHUB_TOKEN` optional locally), deployment steps, how to edit `config.ts`.

**Env**

| Name | Where | Purpose |
|------|-------|---------|
| `GITHUB_TOKEN` | Actions (default) / local optional | Higher rate limit, commit stats |
| `NEXT_PUBLIC_SITE_URL` | optional | Absolute SEO URLs override |

---

## 13. Testing / Verification

- Manual: desktop / tablet / mobile layout, theme, i18n, ⌘K, project links
- `npm run build` succeeds with static `out/`
- Lighthouse CI or local Lighthouse on production build
- Ranker unit tests for scoring edge cases (optional but preferred for `lib/rank.ts`)

---

## 14. Out of Scope (YAGNI)

- CMS / Notion sync
- Runtime GitHub API from browser
- Blog / MDX posts (unless added later)
- Auth, comments, analytics SDKs that hurt performance (defer)
- Extra social networks until Felipe adds them in config
- Custom domain (can add later without redesign)

---

## 15. Implementation Notes (for planning)

Known repos likely to rank high given current profile: `CineOps`, `video-portfolio`, `tubepilot-ai`, `scriptmvp-ai`, `jumpcut`, `dogsnext`, feast-related work, etc. Ranking must not hardcode these names.

Draft timeline themes:

1. Video editing / videomaker practice  
2. Learning programming (HTML/CSS/JS → React/Next)  
3. Shipping tools at video×AI intersection  
4. Contributing / deeper engineering (e.g. Feast)  
5. Goal: software engineering role (frontend-strong, full-stack capable)

---

## 16. Approval Log

| Section | Decision |
|---------|----------|
| Name / GitHub | Felipe Gomes / lipereis |
| Visual | C — high-contrast craft |
| Contact | email + LinkedIn; resume generated; no extra socials |
| Language | Visitor chooses EN or PT |
| Positioning | Creative brand + SWE headline; Frontend · Full-stack capable |
| Hosting | Project Pages `/engineer-portfolio` |
| Content | Draft from GitHub (A) |
| Data architecture | Approach 1 — build-time fetch + static export |
| Design §§1–4 | Approved in chat 2026-07-22 |
