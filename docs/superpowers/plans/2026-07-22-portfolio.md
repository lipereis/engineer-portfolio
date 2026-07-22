# Felipe Gomes Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a premium bilingual static portfolio at `https://lipereis.github.io/engineer-portfolio` that auto-ranks Felipe’s GitHub repos and reads as senior-level craft.

**Architecture:** Next.js App Router static export (`basePath: /engineer-portfolio`). Build script fetches GitHub REST + GraphQL, scores repos, writes `src/data/github.json`. Site is pure static; content/personal data from `src/config.ts`; EN/PT + dark/light client preferences.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS 4 (or 3 if shadcn pins 3), Framer Motion, shadcn/ui, Lucide, Vitest (ranker), GitHub Actions → Pages.

**Spec:** `docs/superpowers/specs/2026-07-22-portfolio-design.md`

## Global Constraints

- `output: 'export'`, `basePath: '/engineer-portfolio'`, `images.unoptimized: true`
- No runtime GitHub API from the browser
- Dark default `#0C0B0A`, accent `#E8A45A`, light bg `#E6E4E1`
- Fonts: Instrument Serif (display) + Geist Sans (UI)
- No Inter/Roboto/Arial primary; no purple-glow / cream-terracotta cliché
- Hero: brand-first, no cards/stats/badges in first viewport
- Top 6 projects only in Featured; full list for search
- i18n: EN + PT, visitor choice, persist localStorage
- Respect `prefers-reduced-motion`
- Ranker weights: stars/forks 15%, commits 25%, description 15%, topics 10%, language 10%, size 10%, recency 15%
- Identity: Felipe Gomes / `lipereis` / `felipedrg02@gmail.com` / LinkedIn in spec
- Frequent commits after each task

## File Map

| Path | Responsibility |
|------|----------------|
| `src/config.ts` | Identity, copy hooks, experience, education, skills, denylist |
| `src/lib/types.ts` | Shared TS types |
| `src/lib/rank.ts` | Pure scoring functions |
| `src/lib/i18n.ts` + `src/lib/dictionaries/{en,pt}.ts` | Strings |
| `src/lib/utils.ts` | `cn`, formatters |
| `scripts/fetch-github.ts` | API → JSON |
| `src/data/github.json` | Seeded + CI-generated snapshot |
| `src/app/*` | Layout, page, not-found, globals, SEO files |
| `src/components/**` | UI sections |
| `src/hooks/**` | theme, locale, reduced-motion, magnetic |
| `.github/workflows/deploy.yml` | Pages deploy |
| `public/resume.pdf` | Starter resume |
| `vitest.config.ts` | Ranker tests |

---

### Task 1: Scaffold Next.js + Tailwind + base config

**Files:**
- Create: entire Next app via `create-next-app`
- Create/Modify: `next.config.ts`, `package.json`, `tsconfig.json`, `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`, `.gitignore`

**Interfaces:**
- Produces: runnable `npm run dev`, static-export-ready `next.config.ts`

- [ ] **Step 1: Scaffold**

```bash
cd /Users/lipereis/Desktop/engineer-portfolio
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack --yes
```

If directory not empty (docs exist), scaffold in temp and move files, or init manually with same flags. Keep `docs/` intact.

- [ ] **Step 2: Install motion + icons + class utils**

```bash
npm install framer-motion lucide-react clsx tailwind-merge class-variance-authority
npm install -D vitest @types/node tsx
```

- [ ] **Step 3: Write `next.config.ts`**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/engineer-portfolio",
  assetPrefix: "/engineer-portfolio",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
```

- [ ] **Step 4: Wire scripts in `package.json`**

```json
{
  "scripts": {
    "dev": "next dev",
    "fetch-github": "tsx scripts/fetch-github.ts",
    "prebuild": "tsx scripts/fetch-github.ts",
    "build": "next build",
    "start": "npx serve out",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

- [ ] **Step 5: Smoke check**

```bash
npm run dev
```

Expected: app loads (later under basePath in prod). Stop dev server after confirm.

- [ ] **Step 6: Commit**

```bash
/usr/bin/git add -A
/usr/bin/git commit -F- <<'EOF'
chore: scaffold Next.js static portfolio app

EOF
```

---

### Task 2: Design tokens, fonts, `cn` util

**Files:**
- Create: `src/lib/utils.ts`
- Modify: `src/app/globals.css`, `src/app/layout.tsx`

**Interfaces:**
- Produces: `cn(...inputs: ClassValue[]): string`
- CSS vars: `--bg`, `--fg`, `--accent`, `--muted`, `--border`, grain utility

- [ ] **Step 1: Create `src/lib/utils.ts`**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: Tokens in `globals.css`**

Define `:root` and `.dark` (dark is default on `<html class="dark">`):

```css
:root {
  --bg: #e6e4e1;
  --fg: #141210;
  --accent: #c4843a;
  --muted: #6b6560;
  --border: rgba(20, 18, 16, 0.12);
  --grain-opacity: 0.04;
}
.dark {
  --bg: #0c0b0a;
  --fg: #f5f0e8;
  --accent: #e8a45a;
  --muted: #9a948c;
  --border: rgba(255, 255, 255, 0.08);
  --grain-opacity: 0.06;
}
html {
  scroll-behavior: smooth;
}
body {
  background: var(--bg);
  color: var(--fg);
}
.grain::before {
  content: "";
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 50;
  opacity: var(--grain-opacity);
  background-image: url("data:image/svg+xml,..."); /* fine-noise SVG */
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 3: Fonts in `layout.tsx`**

```ts
import { GeistSans } from "geist/font/sans";
// Instrument Serif via next/font/google
import { Instrument_Serif } from "next/font/google";

const instrument = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
```

Install `geist` package if needed: `npm install geist`.

Apply `className={cn(GeistSans.variable, instrument.variable, "dark antialiased grain")}` on `<html>` initially (theme provider will manage `dark` later).

- [ ] **Step 4: Commit**

```bash
/usr/bin/git add src/lib/utils.ts src/app/globals.css src/app/layout.tsx package.json package-lock.json
/usr/bin/git commit -m "feat: add design tokens and fonts"
```

---

### Task 3: Types + ranker (TDD)

**Files:**
- Create: `src/lib/types.ts`, `src/lib/rank.ts`, `vitest.config.ts`, `src/lib/rank.test.ts`

**Interfaces:**
- Produces:
  - `export type RankableRepo = { name: string; description: string | null; stargazers_count: number; forks_count: number; size: number; language: string | null; topics: string[]; pushed_at: string; commitCount: number; homepage: string | null; html_url: string; fork: boolean }`
  - `export type ScoredRepo = RankableRepo & { score: number }`
  - `export function scoreRepo(repo: RankableRepo, now?: Date): number`
  - `export function rankRepos(repos: RankableRepo[], opts?: { top?: number; denylist?: string[] }): ScoredRepo[]`

- [ ] **Step 1: Write `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: { environment: "node" },
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
```

- [ ] **Step 2: Write failing tests `src/lib/rank.test.ts`**

```ts
import { describe, expect, it } from "vitest";
import { rankRepos, scoreRepo } from "./rank";
import type { RankableRepo } from "./types";

const base = (over: Partial<RankableRepo> = {}): RankableRepo => ({
  name: "demo",
  description: "A solid project description for testing quality",
  stargazers_count: 0,
  forks_count: 0,
  size: 500,
  language: "TypeScript",
  topics: ["nextjs"],
  pushed_at: new Date().toISOString(),
  commitCount: 40,
  homepage: null,
  html_url: "https://github.com/lipereis/demo",
  fork: false,
  ...over,
});

describe("scoreRepo", () => {
  it("scores recent TS repo with commits higher than empty stub", () => {
    const strong = scoreRepo(base());
    const stub = scoreRepo(
      base({
        description: null,
        commitCount: 0,
        size: 1,
        language: null,
        topics: [],
        pushed_at: "2020-01-01T00:00:00Z",
      }),
    );
    expect(strong).toBeGreaterThan(stub);
  });

  it("weights stars when present", () => {
    const starred = scoreRepo(base({ stargazers_count: 50, forks_count: 10 }));
    const plain = scoreRepo(base());
    expect(starred).toBeGreaterThan(plain);
  });
});

describe("rankRepos", () => {
  it("returns top N excluding forks and denylist", () => {
    const ranked = rankRepos(
      [
        base({ name: "keep", commitCount: 80 }),
        base({ name: "lipereis", commitCount: 100 }),
        base({ name: "forked", fork: true, commitCount: 99 }),
        base({ name: "old", commitCount: 5, pushed_at: "2022-01-01T00:00:00Z" }),
      ],
      { top: 2, denylist: ["lipereis"] },
    );
    expect(ranked).toHaveLength(2);
    expect(ranked[0].name).toBe("keep");
    expect(ranked.every((r) => r.name !== "forked")).toBe(true);
  });
});
```

- [ ] **Step 3: Run tests — expect FAIL**

```bash
npm test
```

Expected: cannot find module `./rank` or functions undefined.

- [ ] **Step 4: Implement `src/lib/types.ts` + `src/lib/rank.ts`**

Weights exact: stars/forks 0.15, commits 0.25, description 0.15, topics 0.10, language 0.10, size 0.10, recency 0.15.

Normalize each signal 0–1 then weighted sum × 100. Language boost: TypeScript/JavaScript/Python → 1.0, others → 0.5, null → 0. Language list expandable.

```ts
// rank.ts core shape
export function scoreRepo(repo: RankableRepo, now = new Date()): number {
  const starsForks = Math.min(1, (repo.stargazers_count + repo.forks_count * 2) / 50);
  const commits = Math.min(1, repo.commitCount / 80);
  const descLen = repo.description?.trim().length ?? 0;
  const description = Math.min(1, descLen / 80);
  const topics = Math.min(1, (repo.topics?.length ?? 0) / 5);
  const lang = !repo.language
    ? 0
    : ["TypeScript", "JavaScript", "Python"].includes(repo.language)
      ? 1
      : 0.5;
  const size = Math.min(1, repo.size / 2000);
  const days = Math.max(
    0,
    (now.getTime() - new Date(repo.pushed_at).getTime()) / (1000 * 60 * 60 * 24),
  );
  const recency = Math.max(0, 1 - days / 365);
  return (
    (starsForks * 0.15 +
      commits * 0.25 +
      description * 0.15 +
      topics * 0.1 +
      lang * 0.1 +
      size * 0.1 +
      recency * 0.15) *
    100
  );
}

export function rankRepos(
  repos: RankableRepo[],
  opts: { top?: number; denylist?: string[] } = {},
): ScoredRepo[] {
  const deny = new Set(opts.denylist ?? []);
  const top = opts.top ?? 6;
  return repos
    .filter((r) => !r.fork && !deny.has(r.name))
    .map((r) => ({ ...r, score: scoreRepo(r) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, top);
}
```

Also export `rankAll` that returns full sorted list without slice (for search JSON).

- [ ] **Step 5: Run tests — expect PASS**

```bash
npm test
```

- [ ] **Step 6: Commit**

```bash
/usr/bin/git commit -am "feat: add repo ranker with vitest coverage"
```

---

### Task 4: `config.ts` + i18n dictionaries

**Files:**
- Create: `src/config.ts`, `src/lib/dictionaries/en.ts`, `src/lib/dictionaries/pt.ts`, `src/lib/i18n.ts`

**Interfaces:**
- Produces: `export const siteConfig = { ... } as const`
- `export type Locale = "en" | "pt"`
- `export function getDictionary(locale: Locale)`

- [ ] **Step 1: Write `src/config.ts`** with identity from spec + drafted experience/education/skills/about (EN strings in config or dictionaries — prefer dictionaries for UI chrome, config for personal facts).

Include:
- `repoDenylist: ["lipereis"]`
- experience timeline entries (Video Editing, Learning Programming, Transition, Goals)
- education placeholders (courses from public learning arc; mark as editable)
- skills grouped arrays `{ name, icon: LucideIconName string }`

- [ ] **Step 2: Dictionaries** covering nav labels, section titles, hero CTAs, contact, command menu, empty search, stats labels — both `en` and `pt`.

- [ ] **Step 3: `getDictionary(locale)` returns merged messages.**

- [ ] **Step 4: Commit**

```bash
/usr/bin/git add src/config.ts src/lib/dictionaries src/lib/i18n.ts
/usr/bin/git commit -m "feat: add site config and EN/PT dictionaries"
```

---

### Task 5: GitHub fetch script + seed JSON

**Files:**
- Create: `scripts/fetch-github.ts`, `src/data/github.json`
- Modify: none else required

**Interfaces:**
- Produces JSON shape:

```ts
export type GithubData = {
  profile: {
    login: string;
    avatarUrl: string;
    followers: number;
    following: number;
    publicRepos: number;
    htmlUrl: string;
  };
  topProjects: ScoredRepo[]; // length 6
  allProjects: ScoredRepo[];
  stats: { totalStars: number; totalForks: number };
  languages: Record<string, number>;
  commitActivity: { week: string; count: number }[];
  contributionWeeks: { date: string; count: number; level: 0|1|2|3|4 }[];
  fetchedAt: string;
};
```

- [ ] **Step 1: Implement fetch**

Use REST:
- `GET /users/lipereis`
- `GET /users/lipereis/repos?per_page=100&type=owner`
- For each non-fork repo (cap concurrency 5): `GET /repos/{owner}/{repo}/languages`, `GET /repos/{owner}/{repo}/commits?since=1y&per_page=1` with `Link` header count approximation OR `GET /repos/{owner}/{repo}/stats/participation` (may 202 — retry/backoff)

GraphQL for contributions (optional graceful skip):

```graphql
query($login:String!) {
  user(login:$login) {
    contributionsCollection {
      contributionCalendar { weeks { contributionDays { date contributionCount color } } }
    }
  }
}
```

Auth header: `process.env.GITHUB_TOKEN` if set.

- [ ] **Step 2: On failure** — if `src/data/github.json` exists, log warning and `process.exit(0)` without overwrite; else `process.exit(1)`.

- [ ] **Step 3: Run fetch**

```bash
GITHUB_TOKEN=... npm run fetch-github
```

Expected: writes `src/data/github.json` with `topProjects.length === 6`.

- [ ] **Step 4: Commit seed JSON + script**

```bash
/usr/bin/git add scripts/fetch-github.ts src/data/github.json
/usr/bin/git commit -m "feat: add GitHub fetch script and seed data"
```

---

### Task 6: Theme + locale providers + hooks

**Files:**
- Create: `src/hooks/use-theme.ts`, `src/hooks/use-locale.ts`, `src/hooks/use-reduced-motion.ts`, `src/components/providers/app-providers.tsx`

**Interfaces:**
- `ThemeProvider` / `useTheme(): { theme: "dark"|"light"; toggle: () => void }`
- `LocaleProvider` / `useLocale(): { locale: Locale; setLocale: (l: Locale) => void; t: Dictionary }`
- Persist keys: `portfolio-theme`, `portfolio-locale`
- Default theme dark; default locale `pt` if `navigator.language` starts with `pt`, else `en`

- [ ] **Step 1: Implement providers with `useEffect` hydration-safe pattern** (avoid mismatch: render default, then sync).

- [ ] **Step 2: Wrap children in `layout.tsx` with `AppProviders`.**

- [ ] **Step 3: Commit**

```bash
/usr/bin/git commit -am "feat: add theme and locale providers"
```

---

### Task 7: shadcn primitives + magnetic button + command menu shell

**Files:**
- Create: `src/components/ui/button.tsx`, `dialog.tsx`, `command.tsx` (or install via shadcn CLI), `src/components/ui/magnetic-button.tsx`, `src/components/layout/command-menu.tsx`

**Interfaces:**
- `MagneticButton` props extend Button; dampen to 0 if reduced motion
- Command menu: `⌘K` / `Ctrl+K` opens; actions jump sections, toggle theme/locale, copy email, open GitHub/LinkedIn

- [ ] **Step 1: Init shadcn** (`npx shadcn@latest init`) with CSS variables matching tokens; add `button`, `dialog`, `command`, `separator`, `tooltip`.

- [ ] **Step 2: MagneticButton with Framer Motion `useMotionValue` + spring toward pointer.**

- [ ] **Step 3: CommandMenu wired to section ids: `#about #skills #projects #ask #stats #experience #education #contact`.**

- [ ] **Step 4: Commit**

```bash
/usr/bin/git commit -am "feat: add shadcn ui, magnetic button, command menu"
```

---

### Task 8: Chrome — nav, footer, scroll progress, back-to-top, loading screen, cursor glow

**Files:**
- Create: `src/components/layout/site-header.tsx`, `site-footer.tsx`, `scroll-progress.tsx`, `back-to-top.tsx`, `loading-screen.tsx`, `cursor-glow.tsx`

**Interfaces:**
- Loading screen: shows once per session (`sessionStorage`), min ~600ms, respects reduced motion (skip)
- Cursor glow: desktop only, `pointer: fine`, reduced-motion off
- Scroll progress: fixed top bar using scrollY progress

- [ ] **Step 1: Implement components; mount in `layout.tsx` / `page.tsx`.**

- [ ] **Step 2: Header includes logo name, section anchors, theme toggle, locale toggle, resume link.**

- [ ] **Step 3: Commit**

```bash
/usr/bin/git commit -am "feat: add layout chrome and ambient effects"
```

---

### Task 9: Hero section

**Files:**
- Create: `src/components/hero/hero.tsx`, `typing-text.tsx`, `hero-background.tsx`

**Interfaces:**
- Consumes: `siteConfig`, `useLocale().t`
- CTAs: scroll to `#projects`, `config.resumeUrl`, GitHub, LinkedIn

- [ ] **Step 1: Build hero per spec** — name dominant (Instrument Serif), role line, typing secondary line, one arc sentence, CTA group with MagneticButton. Full-bleed animated gradient + parallax grain layers. No cards/stats.

- [ ] **Step 2: Mount as first section in `page.tsx`.**

- [ ] **Step 3: Commit**

```bash
/usr/bin/git commit -am "feat: add cinematic hero section"
```

---

### Task 10: About + Skills

**Files:**
- Create: `src/components/about/about-section.tsx`, `src/components/skills/skills-section.tsx`, `skill-card.tsx`

- [ ] **Step 1: About** — summary + vertical timeline (4 beats from config).

- [ ] **Step 2: Skills** — grouped grids; each skill Lucide icon via name→icon map; staggered reveal.

- [ ] **Step 3: Commit**

```bash
/usr/bin/git commit -am "feat: add about timeline and skills grid"
```

---

### Task 11: Featured projects + Ask search

**Files:**
- Create: `src/components/projects/projects-section.tsx`, `project-card.tsx`, `project-placeholder.tsx`, `src/components/search/ask-projects.tsx`
- Read: `src/data/github.json`

**Interfaces:**
- `ProjectCard` props: `ScoredRepo`
- Live Demo button only if `homepage` truthy
- Ask: filter `allProjects` by keyword on name/description/topics/language

- [ ] **Step 1: Placeholder art** — deterministic gradient from repo name hash + language color.

- [ ] **Step 2: Featured maps `topProjects`.**

- [ ] **Step 3: Ask section client component with input + results list.**

- [ ] **Step 4: Commit**

```bash
/usr/bin/git commit -am "feat: add featured projects and keyword search"
```

---

### Task 12: GitHub stats

**Files:**
- Create: `src/components/stats/stats-section.tsx`, `language-chart.tsx`, `contribution-calendar.tsx`, `commit-activity.tsx`

- [ ] **Step 1: Stat counters** — repos, stars, followers, following from JSON.

- [ ] **Step 2: Languages** — simple CSS/SVG bar or doughnut (no heavy chart lib unless needed; prefer lightweight SVG).

- [ ] **Step 3: Contribution calendar** — CSS grid from `contributionWeeks`; if empty array, hide calendar with note.

- [ ] **Step 4: Commit**

```bash
/usr/bin/git commit -am "feat: add GitHub statistics section"
```

---

### Task 13: Experience + Education + Contact

**Files:**
- Create: `src/components/experience/experience-section.tsx`, `src/components/education/education-section.tsx`, `src/components/contact/contact-section.tsx`

- [ ] **Step 1: Experience timeline from `siteConfig.experience`.**

- [ ] **Step 2: Education cards (university/courses/certificates kinds).**

- [ ] **Step 3: Contact** — mailto, copy-to-clipboard with feedback, LinkedIn, GitHub.

- [ ] **Step 4: Commit**

```bash
/usr/bin/git commit -am "feat: add experience, education, and contact"
```

---

### Task 14: Assemble home page + section reveal

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/motion/reveal.tsx`

- [ ] **Step 1: `Reveal` wrapper** using Framer `whileInView` once; no-op if reduced motion.

- [ ] **Step 2: Compose all sections in order from spec §6.**

- [ ] **Step 3: Verify no layout shift — images/placeholders have width/height.**

- [ ] **Step 4: Commit**

```bash
/usr/bin/git commit -am "feat: compose homepage with section reveals"
```

---

### Task 15: SEO, robots, sitemap, JSON-LD, 404, favicon, OG

**Files:**
- Create: `src/app/not-found.tsx`, `public/favicon.ico` (or `icon.tsx`), `public/og.png`, `public/robots.txt`, `public/sitemap.xml`
- Modify: `src/app/layout.tsx` metadata

**Interfaces:**
- Metadata `metadataBase: new URL(siteConfig.siteUrl)`
- JSON-LD `Person` + `WebSite` in layout

- [ ] **Step 1: `export const metadata: Metadata = { ... }`** with title, description, openGraph, twitter.

- [ ] **Step 2: Static `robots.txt` + `sitemap.xml` pointing at siteUrl.**

- [ ] **Step 3: Craft 404 with link home (respect basePath via `Link href="/"`).**

- [ ] **Step 4: Simple OG image (designed PNG or generated SVG→PNG).**

- [ ] **Step 5: Commit**

```bash
/usr/bin/git commit -am "feat: add SEO, 404, favicon, and social meta"
```

---

### Task 16: Resume PDF

**Files:**
- Create: `public/resume.pdf` (and optional `scripts/generate-resume.tsx` or markdown→PDF)

- [ ] **Step 1: Draft one-page resume** — Felipe Gomes, Rio, Software Engineer (Frontend · Full-stack capable), contact, skills, selected projects from seed JSON, experience arc.

- [ ] **Step 2: Place PDF at `public/resume.pdf`; `siteConfig.resumeUrl = "/resume.pdf"`.**

- [ ] **Step 3: Commit**

```bash
/usr/bin/git add public/resume.pdf src/config.ts
/usr/bin/git commit -m "feat: add starter resume PDF"
```

---

### Task 17: GitHub Actions deploy + README

**Files:**
- Create: `.github/workflows/deploy.yml`, `README.md`, `.env.example`

- [ ] **Step 1: Workflow**

```yaml
name: Deploy GitHub Pages
on:
  push:
    branches: [main, master]
  schedule:
    - cron: "0 6 * * 1"
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run fetch-github
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: README** — install, `GITHUB_TOKEN` optional, `npm run dev`, `npm run build`, Pages setup (Settings → Pages → GitHub Actions), edit `src/config.ts`, bilingual/theme notes.

- [ ] **Step 3: `.env.example`**

```
GITHUB_TOKEN=
NEXT_PUBLIC_SITE_URL=https://lipereis.github.io/engineer-portfolio
```

- [ ] **Step 4: Local production verify**

```bash
npm run build
npx serve out
```

Open `/engineer-portfolio/` — check sections, theme, locale, projects.

- [ ] **Step 5: Commit**

```bash
/usr/bin/git add .github/workflows/deploy.yml README.md .env.example
/usr/bin/git commit -m "ci: add GitHub Pages workflow and README"
```

---

### Task 18: Polish pass + Lighthouse sanity

**Files:**
- Modify: any gaps found

- [ ] **Step 1: Checklist vs spec** — every section present; ranking weights unchanged; basePath links work; reduced-motion paths; copy email; ⌘K; loading once; back-to-top.

- [ ] **Step 2: Run**

```bash
npm test && npm run lint && npm run build
```

Expected: all pass; `out/index.html` exists.

- [ ] **Step 3: Lighthouse** on served `out` (mobile+desktop). Fix a11y/contrast/SEO issues found.

- [ ] **Step 4: Final commit**

```bash
/usr/bin/git commit -am "fix: polish a11y, performance, and spec gaps"
```

---

## Self-Review (plan vs spec)

| Spec area | Task(s) |
|-----------|---------|
| Static export + basePath | 1, 17 |
| config.ts identity | 4 |
| Build-time GitHub + rank Top 6 | 3, 5 |
| Visual craft + fonts + grain | 2, 9 |
| Hero rules | 9 |
| About / Skills / Projects / Ask / Stats / Exp / Edu / Contact | 10–13 |
| i18n + theme | 6 |
| Motion + ⌘K + chrome extras | 7, 8, 14 |
| SEO / 404 / favicon | 15 |
| Resume | 16 |
| Actions + README | 17 |
| Lighthouse / verify | 18 |
| Contribution calendar GraphQL graceful skip | 5, 12 |
| No runtime GitHub client fetch | 5, 11–12 (JSON import only) |

**Placeholder scan:** none intentional. Resume content is drafted in Task 16 from public GitHub arc (per spec Approach A).

**Type consistency:** `RankableRepo` / `ScoredRepo` / `GithubData` defined Task 3–5; UI consumes same names.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-22-portfolio.md`.

**Two execution options:**

1. **Subagent-Driven (recommended)** — fresh subagent per task, review between tasks  
2. **Inline Execution** — this session, executing-plans with checkpoints  

Which approach?
