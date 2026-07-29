# Extensions Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a bilingual Extensions section that presents AmzScope as a polished Chrome-extension product and links to its public GitHub repository.

**Architecture:** Keep curated extension product data in `siteConfig`, separate from automatic GitHub ranking. Share section IDs between the header and command menu through one typed registry. Render a client-side section for locale and reduced-motion support, with a focused presentational preview component.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Framer Motion, Lucide React, Vitest.

## Global Constraints

- Render the section after Featured Projects and before project search.
- Keep AmzScope independent from `src/data/github.json` and repository ranking.
- Link to `https://github.com/lipereis/AmzScope`; no Chrome Web Store action exists.
- Provide complete English and Portuguese copy.
- The analytics preview must be explicitly illustrative and must not claim live Amazon data.
- Support desktop, tablet, mobile, keyboard navigation, and reduced motion.
- Use Tailwind utilities; do not add a dependency or global component stylesheet.
- Keep `src/app/page.tsx` a Server Component; place locale and motion behavior inside the client-side section boundary.
- Do not commit changes unless the user explicitly requests a commit.

## File Structure

- Create `src/lib/extensions.test.ts`: validates curated AmzScope data and locale completeness.
- Create `src/lib/sections.test.ts`: validates section ordering and desktop navigation exposure.
- Create `src/lib/sections.ts`: single typed source for full and desktop section IDs.
- Create `src/components/extensions/extension-preview.tsx`: non-interactive sample analytics panel.
- Create `src/components/extensions/extensions-section.tsx`: localized section shell and AmzScope product card.
- Modify `src/config.ts`: add `ExtensionEntry` and curated `extensions`.
- Modify `src/lib/dictionaries/en.ts`: add Extensions navigation and UI copy.
- Modify `src/lib/dictionaries/pt.ts`: add matching Portuguese copy.
- Modify `src/components/layout/site-header.tsx`: consume the shared section registry.
- Modify `src/components/layout/command-menu.tsx`: consume the shared section registry.
- Modify `src/app/page.tsx`: render the section in the approved position.

---

### Task 1: Curated Extension Data and Localized Copy

**Files:**
- Create: `src/lib/extensions.test.ts`
- Modify: `src/config.ts`
- Modify: `src/lib/dictionaries/en.ts`
- Modify: `src/lib/dictionaries/pt.ts`

**Interfaces:**
- Produces: `ExtensionEntry`
- Produces: `siteConfig.extensions: readonly ExtensionEntry[]`
- Produces: `Dictionary["nav"]["extensions"]`
- Produces: `Dictionary["sections"]["extensions"]`

- [ ] **Step 1: Write the failing data and locale test**

Create `src/lib/extensions.test.ts`:

```ts
import { describe, expect, it } from "vitest";

import { siteConfig } from "@/config";
import { en } from "@/lib/dictionaries/en";
import { pt } from "@/lib/dictionaries/pt";

describe("AmzScope extension content", () => {
  it("defines AmzScope as a curated public Chrome extension", () => {
    expect(siteConfig.extensions).toHaveLength(1);
    expect(siteConfig.extensions[0]).toMatchObject({
      id: "amzscope",
      name: "AmzScope",
      repository: "https://github.com/lipereis/AmzScope",
      technologies: ["JavaScript", "CSS", "Chrome Extension API"],
    });
    expect(siteConfig.extensions[0].description.pt).toContain("Amazon Brasil");
    expect(siteConfig.extensions[0].capabilities.en).toHaveLength(4);
  });

  it("provides complete EN and PT section copy", () => {
    expect(en.nav.extensions).toBe("Extensions");
    expect(pt.nav.extensions).toBe("Extensões");
    expect(en.sections.extensions.viewGithub).toBe("View on GitHub");
    expect(pt.sections.extensions.viewGithub).toBe("Ver no GitHub");
    expect(en.sections.extensions.previewLabel).toBe("Illustrative preview");
    expect(pt.sections.extensions.previewLabel).toBe("Prévia ilustrativa");
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```bash
npx vitest run src/lib/extensions.test.ts
```

Expected: FAIL because `siteConfig.extensions`, `nav.extensions`, and
`sections.extensions` do not exist.

- [ ] **Step 3: Add the typed extension data**

Add after `SpokenLanguage` in `src/config.ts`:

```ts
export type ExtensionEntry = {
  id: string;
  name: string;
  repository: string;
  technologies: readonly string[];
  type: LocalizedString;
  description: LocalizedString;
  capabilities: {
    en: readonly string[];
    pt: readonly string[];
  };
  previewAlt: LocalizedString;
};
```

Add after `repoDisplayNames` in `siteConfig`:

```ts
  extensions: [
    {
      id: "amzscope",
      name: "AmzScope",
      repository: "https://github.com/lipereis/AmzScope",
      technologies: ["JavaScript", "CSS", "Chrome Extension API"],
      type: {
        en: "Chrome Extension · Manifest V3",
        pt: "Extensão Chrome · Manifest V3",
      },
      description: {
        en: "Amazon Brazil product analytics, injected directly into the product page. AmzScope identifies the ASIN and estimates monthly sales, revenue, Amazon commission, and net earnings without interrupting the research workflow.",
        pt: "Análises de produtos da Amazon Brasil, injetadas diretamente na página do produto. O AmzScope identifica o ASIN e estima vendas mensais, receita, comissão da Amazon e ganhos líquidos sem interromper o fluxo de pesquisa.",
      },
      capabilities: {
        en: [
          "Automatic ASIN detection",
          "Monthly sales estimates",
          "Gross and net revenue projections",
          "Estimated Amazon commission",
        ],
        pt: [
          "Detecção automática do ASIN",
          "Estimativas de vendas mensais",
          "Projeções de receita bruta e líquida",
          "Comissão estimada da Amazon",
        ],
      },
      previewAlt: {
        en: "Illustrative AmzScope panel showing sample ASIN, sales, revenue, commission, and net earnings.",
        pt: "Painel ilustrativo do AmzScope com exemplos de ASIN, vendas, receita, comissão e ganhos líquidos.",
      },
    },
  ] as const satisfies readonly ExtensionEntry[],
```

- [ ] **Step 4: Add English dictionary copy**

Add `extensions: "Extensions"` after `projects` in `en.nav`.

Add after `sections.projects`:

```ts
    extensions: {
      title: "Browser Extensions",
      subtitle:
        "Small tools that bring useful data into the workflows where it matters.",
      viewGithub: "View on GitHub",
      capabilities: "What it does",
      previewLabel: "Illustrative preview",
      preview: {
        asin: "ASIN",
        sales: "Monthly sales",
        gross: "Gross revenue",
        commission: "Amazon commission",
        net: "Net earnings",
      },
    },
```

- [ ] **Step 5: Add Portuguese dictionary copy**

Add `extensions: "Extensões"` after `projects` in `pt.nav`.

Add after `sections.projects`:

```ts
    extensions: {
      title: "Extensões para Navegador",
      subtitle:
        "Ferramentas pequenas que levam dados úteis para o fluxo onde eles realmente importam.",
      viewGithub: "Ver no GitHub",
      capabilities: "O que faz",
      previewLabel: "Prévia ilustrativa",
      preview: {
        asin: "ASIN",
        sales: "Vendas mensais",
        gross: "Receita bruta",
        commission: "Comissão da Amazon",
        net: "Ganhos líquidos",
      },
    },
```

- [ ] **Step 6: Run the focused test and verify GREEN**

Run:

```bash
npx vitest run src/lib/extensions.test.ts
```

Expected: 2 tests passed.

- [ ] **Step 7: Check TypeScript**

Run:

```bash
npx tsc --noEmit
```

Expected: exit code 0 with no diagnostics.

---

### Task 2: Shared Section Registry and Navigation

**Files:**
- Create: `src/lib/sections.test.ts`
- Create: `src/lib/sections.ts`
- Modify: `src/components/layout/site-header.tsx`
- Modify: `src/components/layout/command-menu.tsx`

**Interfaces:**
- Produces: `SECTION_IDS`
- Produces: `DESKTOP_SECTION_IDS`
- Produces: `SectionId`
- Consumes: `Dictionary["nav"][SectionId]`

- [ ] **Step 1: Write the failing section-order test**

Create `src/lib/sections.test.ts`:

```ts
import { describe, expect, it } from "vitest";

import { DESKTOP_SECTION_IDS, SECTION_IDS } from "./sections";

describe("portfolio section registry", () => {
  it("places Extensions after Projects and exposes it in desktop navigation", () => {
    expect(SECTION_IDS).toEqual([
      "about",
      "skills",
      "projects",
      "extensions",
      "ask",
      "stats",
      "experience",
      "education",
      "contact",
    ]);
    expect(DESKTOP_SECTION_IDS).toContain("extensions");
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```bash
npx vitest run src/lib/sections.test.ts
```

Expected: FAIL because `src/lib/sections.ts` does not exist.

- [ ] **Step 3: Add the shared typed registry**

Create `src/lib/sections.ts`:

```ts
export const SECTION_IDS = [
  "about",
  "skills",
  "projects",
  "extensions",
  "ask",
  "stats",
  "experience",
  "education",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export const DESKTOP_SECTION_IDS = [
  "about",
  "projects",
  "extensions",
  "experience",
  "education",
  "contact",
] as const satisfies readonly SectionId[];
```

- [ ] **Step 4: Replace local header arrays**

In `src/components/layout/site-header.tsx`, import:

```ts
import {
  DESKTOP_SECTION_IDS,
  SECTION_IDS,
  type SectionId,
} from "@/lib/sections";
```

Delete the local `SECTION_IDS`, `SectionId`, and `DESKTOP_IDS` declarations.
Replace both `DESKTOP_IDS` references with `DESKTOP_SECTION_IDS`.

- [ ] **Step 5: Replace the command-menu array**

In `src/components/layout/command-menu.tsx`, import:

```ts
import { SECTION_IDS, type SectionId } from "@/lib/sections";
```

Delete the local `SECTION_IDS` and `SectionId` declarations. Keep the existing
mapping and `jumpTo` behavior unchanged.

- [ ] **Step 6: Run focused and full tests**

Run:

```bash
npx vitest run src/lib/sections.test.ts
npm test
```

Expected: the focused test passes and the full suite passes.

- [ ] **Step 7: Check TypeScript**

Run:

```bash
npx tsc --noEmit
```

Expected: exit code 0 with no diagnostics.

---

### Task 3: AmzScope Product Card and Analytics Preview

**Files:**
- Create: `src/components/extensions/extension-preview.tsx`
- Create: `src/components/extensions/extensions-section.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `siteConfig.extensions`
- Consumes: `Dictionary["sections"]["extensions"]`
- Consumes: `Locale`
- Produces: `<ExtensionsSection />`

- [ ] **Step 1: Add the presentational preview**

Create `src/components/extensions/extension-preview.tsx`:

```tsx
type ExtensionPreviewProps = {
  label: string;
  labels: {
    asin: string;
    sales: string;
    gross: string;
    commission: string;
    net: string;
  };
  alt: string;
};

const SAMPLE_METRICS = {
  asin: "B0AMZSCOPE",
  sales: "1,200",
  gross: "R$ 119.988",
  commission: "R$ 14.399",
  net: "R$ 105.589",
} as const;

export function ExtensionPreview({
  label,
  labels,
  alt,
}: ExtensionPreviewProps) {
  const metrics = [
    [labels.sales, SAMPLE_METRICS.sales],
    [labels.gross, SAMPLE_METRICS.gross],
    [labels.commission, SAMPLE_METRICS.commission],
    [labels.net, SAMPLE_METRICS.net],
  ] as const;

  return (
    <div className="relative" aria-label={alt} role="img">
      <div
        aria-hidden
        className="absolute -inset-8 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden
        className="relative overflow-hidden rounded-2xl border border-border/70 bg-bg/90 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-accent" />
            <span className="text-xs font-semibold tracking-wide text-fg">
              AmzScope
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {label}
          </span>
        </div>

        <div className="p-4 sm:p-5">
          <div className="mb-4 rounded-xl border border-border/60 bg-fg/[0.03] p-3">
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {labels.asin}
            </p>
            <p className="mt-1 font-mono text-sm font-semibold text-accent">
              {SAMPLE_METRICS.asin}
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-2.5">
            {metrics.map(([metric, value]) => (
              <div
                key={metric}
                className="rounded-xl border border-border/60 bg-fg/[0.03] p-3"
              >
                <dt className="text-[10px] leading-snug text-muted-foreground">
                  {metric}
                </dt>
                <dd className="mt-1 text-sm font-semibold tracking-tight text-fg">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add the localized Extensions section**

Create `src/components/extensions/extensions-section.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Chrome,
  CircleDollarSign,
  ExternalLink,
  ScanSearch,
} from "lucide-react";

import { ExtensionPreview } from "@/components/extensions/extension-preview";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { siteConfig } from "@/config";
import { useLocale } from "@/hooks/use-locale";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const CAPABILITY_ICONS = [
  ScanSearch,
  BarChart3,
  CircleDollarSign,
  CircleDollarSign,
] as const;

export function ExtensionsSection() {
  const { locale, t } = useLocale();
  const reduced = useReducedMotion();
  const copy = t.sections.extensions;
  const extension = siteConfig.extensions[0];

  return (
    <section
      id="extensions"
      aria-labelledby="extensions-heading"
      className="scroll-mt-20 border-t border-border/60 px-5 py-24 sm:px-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {t.nav.extensions}
          </p>
          <h2
            id="extensions-heading"
            className="font-display text-3xl tracking-tight text-fg sm:text-4xl"
          >
            {copy.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {copy.subtitle}
          </p>
        </header>

        <motion.article
          className="overflow-hidden rounded-2xl border border-border/70 bg-fg/[0.03] p-5 sm:p-8 lg:p-10"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
          }
        >
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-2 rounded-full border border-accent/35 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                  <Chrome className="size-3.5" aria-hidden />
                  {extension.type[locale]}
                </span>
                {extension.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground"
                  >
                    {technology}
                  </span>
                ))}
              </div>

              <h3 className="font-display text-4xl tracking-tight text-fg sm:text-5xl">
                {extension.name}
              </h3>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                {extension.description[locale]}
              </p>

              <h4 className="mt-7 text-xs font-medium uppercase tracking-[0.18em] text-accent">
                {copy.capabilities}
              </h4>
              <ul className="mt-3 grid list-none gap-2 sm:grid-cols-2">
                {extension.capabilities[locale].map((capability, index) => {
                  const Icon = CAPABILITY_ICONS[index];
                  return (
                    <li
                      key={capability}
                      className="flex items-start gap-2.5 text-sm text-fg/80"
                    >
                      <Icon
                        className="mt-0.5 size-4 shrink-0 text-accent"
                        aria-hidden
                      />
                      {capability}
                    </li>
                  );
                })}
              </ul>

              <MagneticButton
                size="lg"
                className="mt-8 h-11 gap-2 px-5 text-sm"
                nativeButton={false}
                render={
                  <a
                    href={extension.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                {copy.viewGithub}
                <ExternalLink data-icon="inline-end" />
              </MagneticButton>
            </div>

            <ExtensionPreview
              label={copy.previewLabel}
              labels={copy.preview}
              alt={extension.previewAlt[locale]}
            />
          </div>
        </motion.article>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Render the section in the approved position**

In `src/app/page.tsx`, add:

```ts
import { ExtensionsSection } from "@/components/extensions/extensions-section";
```

Place this immediately after the `ProjectsSection` reveal and before
`AskProjects`:

```tsx
      <Reveal>
        <ProjectsSection />
      </Reveal>
      <Reveal>
        <ExtensionsSection />
      </Reveal>
      <Reveal>
        <AskProjects />
      </Reveal>
```

- [ ] **Step 4: Run lint diagnostics for changed files**

Run:

```bash
npx eslint \
  src/components/extensions/extension-preview.tsx \
  src/components/extensions/extensions-section.tsx \
  src/app/page.tsx \
  src/components/layout/site-header.tsx \
  src/components/layout/command-menu.tsx \
  src/config.ts \
  src/lib/sections.ts \
  src/lib/extensions.test.ts \
  src/lib/sections.test.ts
```

Expected: exit code 0 with no diagnostics.

- [ ] **Step 5: Run all tests**

Run:

```bash
npm test
```

Expected: all test files and tests pass.

- [ ] **Step 6: Run the production static export**

Run with an authenticated GitHub token to avoid API rate-limit fallback:

```bash
GITHUB_TOKEN="$(gh auth token)" npm run build
```

Expected:

```text
✓ Compiled successfully
✓ Generating static pages
○ /  (Static) prerendered as static content
```

- [ ] **Step 7: Verify generated content and public repository**

Run:

```bash
rg -n "AmzScope|Browser Extensions|Extensões para Navegador" out
gh repo view lipereis/AmzScope --json isPrivate,url
```

Expected:

```text
out/index.html contains AmzScope and the English section heading
{"isPrivate":false,"url":"https://github.com/lipereis/AmzScope"}
```

- [ ] **Step 8: Check the responsive UI when browser tooling is available**

Verify:

- Desktop: editorial copy and preview form two balanced columns.
- Tablet/mobile: content stacks with no horizontal overflow.
- EN/PT switch updates section, capability, preview, and navigation copy.
- Header and command menu scroll to `#extensions`.
- Reduced motion removes reveal displacement.
- GitHub action opens the public AmzScope repository.

Do not claim manual browser verification if no browser tooling is available.
