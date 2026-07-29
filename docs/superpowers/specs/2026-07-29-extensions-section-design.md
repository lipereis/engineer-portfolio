# Extensions Section Design

## Goal

Add a dedicated **Extensions** section to Felipe Gomes's portfolio and feature
AmzScope as its first browser-extension product.

AmzScope is a public Chrome extension that injects an analytics panel into
Amazon Brazil product pages. It identifies the ASIN and estimates monthly
sales, gross revenue, Amazon commission, and net revenue.

## Scope

The change includes:

- A new Extensions section after Featured Projects and before project search.
- A dedicated AmzScope product card rather than a generic repository card.
- Extensions navigation entries in the responsive header and command menu.
- English and Portuguese copy.
- A GitHub action linking to `https://github.com/lipereis/AmzScope`.
- Responsive and reduced-motion behavior consistent with the existing site.

The change does not include:

- Chrome Web Store installation, because no store URL exists.
- Live Amazon scraping or extension execution inside the portfolio.
- A separate route or full case study.
- Automatic discovery of extension repositories.

## Content

### English

- Eyebrow/navigation label: **Extensions**
- Title: **Browser Extensions**
- Subtitle: **Small tools that bring useful data into the workflows where it
  matters.**
- Product: **AmzScope**
- Product type: **Chrome Extension · Manifest V3**
- Description: **Amazon Brazil product analytics, injected directly into the
  product page. AmzScope identifies the ASIN and estimates monthly sales,
  revenue, Amazon commission, and net earnings without interrupting the
  research workflow.**
- Capabilities:
  - Automatic ASIN detection
  - Monthly sales estimates
  - Gross and net revenue projections
  - Estimated Amazon commission
- Technologies: JavaScript, CSS, Chrome Extension API
- Action: **View on GitHub**

### Portuguese

- Eyebrow/navigation label: **Extensões**
- Title: **Extensões para Navegador**
- Subtitle: **Ferramentas pequenas que levam dados úteis para o fluxo onde
  eles realmente importam.**
- Product: **AmzScope**
- Product type: **Extensão Chrome · Manifest V3**
- Description: **Análises de produtos da Amazon Brasil, injetadas diretamente
  na página do produto. O AmzScope identifica o ASIN e estima vendas mensais,
  receita, comissão da Amazon e ganhos líquidos sem interromper o fluxo de
  pesquisa.**
- Capabilities:
  - Detecção automática do ASIN
  - Estimativas de vendas mensais
  - Projeções de receita bruta e líquida
  - Comissão estimada da Amazon
- Technologies: JavaScript, CSS, Chrome Extension API
- Action: **Ver no GitHub**

## Visual Design

The section follows the portfolio's current high-contrast craft direction.

- Full-width section with the same borders, spacing, and max width as adjacent
  sections.
- A large editorial card with a subtle accent glow and responsive two-column
  layout.
- Left column: Chrome/extension identity, title, description, technology chips,
  and GitHub action.
- Right column: a stylized, non-interactive Amazon analytics panel built from
  HTML/CSS. It previews the extension's function without claiming live data.
- The preview uses clearly fictional sample metrics and is marked as a product
  preview to avoid presenting estimates as real Amazon data.
- Hover movement is subtle and disabled when reduced motion is enabled.
- Mobile stacks the content above the preview with no horizontal overflow.

## Architecture

### Data

Add a typed `extensions` entry to `siteConfig`. It contains stable facts:

- ID and display name
- Repository URL
- Technology labels
- Localized type, description, capabilities, and preview labels

This data is intentionally independent from `github.json`. AmzScope is a
curated product, and its section must not disappear or change position due to
repository ranking.

### Components

- `ExtensionsSection`: section shell, heading, localization, and card layout.
- `ExtensionPreview`: presentational sample analytics panel.

Both remain focused and reusable if another browser extension is added later.

### Integration

- Render `ExtensionsSection` after `ProjectsSection` in the home page.
- Add `extensions` to the full section ID list used by header and command menu.
- Add it to desktop navigation because it represents a distinct product type.
- Add EN/PT dictionary keys under `nav.extensions` and
  `sections.extensions`.

## Accessibility

- The section uses an `aria-labelledby` relationship.
- Capabilities and technologies are semantic lists.
- The GitHub action has visible text and an external-link indication.
- Decorative preview details are hidden from screen readers; a concise text
  alternative describes the preview's purpose.
- Color is not the only way capabilities or metrics are distinguished.
- Reduced-motion users receive no reveal or hover displacement.

## Testing and Verification

- Add a focused test for the extension data contract and locale completeness.
- Verify the test fails before adding the production data and dictionary keys.
- Run the full unit-test suite.
- Run TypeScript checking and the production static export.
- Confirm the generated page contains the EN and PT AmzScope copy.
- Check desktop and mobile layout manually when browser tooling is available.
- Confirm the GitHub link resolves publicly.

## Success Criteria

- Visitors can navigate directly to `#extensions`.
- AmzScope is clearly presented as a Chrome extension rather than a standard
  repository.
- The section explains its value and core metrics in both languages.
- The GitHub action opens the public AmzScope repository.
- Existing project ranking remains unchanged.
- The static GitHub Pages build completes successfully.
