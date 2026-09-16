# 6. Professional Monorepo & File Architecture

PXUI must use a **compiler-driven professional monorepo** designed from the beginning for thousands of icons, multiple framework targets, generated Registry artifacts, visual regression testing, documentation, search metadata, animation definitions, and future tooling.

The repository must not evolve into thousands of manually maintained SVG/TSX files with duplicated metadata.

The architectural principle is:

```text
Canonical Icon Source
        ↓
Schema Validation
        ↓
Geometry Validation
        ↓
Normalization
        ↓
Compiler
        ↓
┌─────────────────────────────────────────────┐
│ React                                      │
│ React Native                               │
│ Raw SVG                                    │
│ shadcn Registry                            │
│ Metadata                                   │
│ Search Index                               │
│ Documentation Data                         │
│ Visual QA Fixtures                         │
└─────────────────────────────────────────────┘
```

There is **one canonical icon definition**.

Everything else should be generated wherever technically possible.

---

## 6.1 Final Repository Structure

```text
pxui/
│
├── apps/
│   │
│   ├── showcase/
│   │   │
│   │   ├── app/
│   │   │   │
│   │   │   ├── (marketing)/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   └── _components/
│   │   │   │
│   │   │   ├── (catalog)/
│   │   │   │   ├── layout.tsx
│   │   │   │   │
│   │   │   │   ├── icons/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [name]/
│   │   │   │   │       └── page.tsx
│   │   │   │   │
│   │   │   │   ├── animated/
│   │   │   │   │   └── page.tsx
│   │   │   │   │
│   │   │   │   ├── brands/
│   │   │   │   │   └── page.tsx
│   │   │   │   │
│   │   │   │   ├── collections/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [slug]/
│   │   │   │   │       └── page.tsx
│   │   │   │   │
│   │   │   │   └── registry/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── r/
│   │   │   │   └── [name]/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   ├── api/
│   │   │   │   ├── search/
│   │   │   │   │   └── route.ts
│   │   │   │   └── registry/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   ├── layout.tsx
│   │   │   ├── not-found.tsx
│   │   │   ├── error.tsx
│   │   │   └── global-error.tsx
│   │   │
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── shell/
│   │   │   ├── brand/
│   │   │   └── shared/
│   │   │
│   │   ├── features/
│   │   │   │
│   │   │   ├── catalog/
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── lib/
│   │   │   │   ├── types/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── inspector/
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── lib/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── search/
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── lib/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── registry/
│   │   │   │   ├── components/
│   │   │   │   ├── lib/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── animations/
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── categories/
│   │   │   ├── collections/
│   │   │   └── icon-detail/
│   │   │
│   │   ├── lib/
│   │   │   ├── catalog/
│   │   │   ├── registry/
│   │   │   ├── search/
│   │   │   ├── routing/
│   │   │   └── utils/
│   │   │
│   │   ├── hooks/
│   │   ├── styles/
│   │   ├── public/
│   │   ├── next.config.ts
│   │   ├── components.json
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── docs/
│       │
│       ├── app/
│       ├── components/
│       ├── content/
│       │   ├── getting-started/
│       │   ├── react/
│       │   ├── react-native/
│       │   ├── registry/
│       │   ├── animation/
│       │   ├── design-language/
│       │   └── contributing/
│       │
│       ├── lib/
│       ├── public/
│       └── package.json
│
├── packages/
│   │
│   ├── core/
│   │   ├── src/
│   │   │   ├── icon.ts
│   │   │   ├── geometry.ts
│   │   │   ├── metadata.ts
│   │   │   ├── animation.ts
│   │   │   ├── category.ts
│   │   │   ├── brand.ts
│   │   │   ├── constants.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── react/
│   │   ├── src/
│   │   │   ├── generated/
│   │   │   ├── runtime/
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── react-native/
│   │   ├── src/
│   │   │   ├── generated/
│   │   │   ├── runtime/
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── svg/
│   │   ├── generated/
│   │   │   ├── actions/
│   │   │   ├── arrows/
│   │   │   ├── communication/
│   │   │   └── ...
│   │   ├── manifest.json
│   │   └── package.json
│   │
│   ├── animations/
│   │   ├── src/
│   │   │   ├── definitions/
│   │   │   ├── adapters/
│   │   │   │   ├── web/
│   │   │   │   └── native/
│   │   │   ├── runtime/
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── brands/
│   │   ├── src/
│   │   │   ├── definitions/
│   │   │   ├── policies/
│   │   │   ├── metadata/
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── metadata/
│   │   ├── generated/
│   │   │   ├── icons.json
│   │   │   ├── categories.json
│   │   │   ├── families.json
│   │   │   ├── collections.json
│   │   │   ├── search-index.json
│   │   │   └── manifest.json
│   │   ├── src/
│   │   └── package.json
│   │
│   ├── registry/
│   │   ├── src/
│   │   │   ├── builder/
│   │   │   ├── validators/
│   │   │   ├── serializers/
│   │   │   └── index.ts
│   │   ├── generated/
│   │   │   ├── registry.json
│   │   │   └── r/
│   │   └── package.json
│   │
│   ├── cli/
│   │   ├── src/
│   │   │   ├── commands/
│   │   │   ├── prompts/
│   │   │   ├── utils/
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── config-eslint/
│   │   ├── base.mjs
│   │   ├── next.mjs
│   │   ├── react.mjs
│   │   └── package.json
│   │
│   └── config-typescript/
│       ├── base.json
│       ├── nextjs.json
│       ├── react-library.json
│       ├── native-library.json
│       └── package.json
│
├── icons/
│   │
│   ├── source/
│   │   │
│   │   ├── actions/
│   │   │   ├── add.ts
│   │   │   ├── remove.ts
│   │   │   ├── check.ts
│   │   │   └── ...
│   │   │
│   │   ├── arrows/
│   │   ├── business/
│   │   ├── communication/
│   │   ├── commerce/
│   │   ├── development/
│   │   ├── devices/
│   │   ├── editing/
│   │   ├── files/
│   │   ├── finance/
│   │   ├── maps/
│   │   ├── media/
│   │   ├── navigation/
│   │   ├── people/
│   │   ├── security/
│   │   ├── shapes/
│   │   ├── social/
│   │   ├── status/
│   │   ├── time/
│   │   └── weather/
│   │
│   ├── brands/
│   │   ├── source/
│   │   └── metadata/
│   │
│   ├── schemas/
│   │   ├── icon.schema.ts
│   │   ├── geometry.schema.ts
│   │   ├── metadata.schema.ts
│   │   ├── animation.schema.ts
│   │   └── brand.schema.ts
│   │
│   ├── categories.ts
│   ├── families.ts
│   └── collections.ts
│
├── tooling/
│   │
│   ├── compiler/
│   │   ├── src/
│   │   │   ├── parse.ts
│   │   │   ├── normalize.ts
│   │   │   ├── compile.ts
│   │   │   ├── pipeline.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── generators/
│   │   ├── react/
│   │   ├── react-native/
│   │   ├── svg/
│   │   ├── registry/
│   │   ├── metadata/
│   │   ├── search/
│   │   └── documentation/
│   │
│   ├── validators/
│   │   ├── schema/
│   │   ├── geometry/
│   │   ├── naming/
│   │   ├── taxonomy/
│   │   ├── registry/
│   │   ├── accessibility/
│   │   └── visual/
│   │
│   ├── visual-tests/
│   │   ├── fixtures/
│   │   ├── renderers/
│   │   ├── snapshots/
│   │   └── reports/
│   │
│   └── scripts/
│       ├── generate-all.ts
│       ├── generate-react.ts
│       ├── generate-native.ts
│       ├── generate-svg.ts
│       ├── generate-registry.ts
│       ├── generate-metadata.ts
│       ├── generate-search.ts
│       ├── validate-icons.ts
│       ├── validate-registry.ts
│       ├── validate-taxonomy.ts
│       └── check-generated.ts
│
├── registry/
│   ├── registry.json
│   ├── r/
│   │   ├── px-home.json
│   │   ├── px-search.json
│   │   ├── px-bell.json
│   │   └── ...
│   │
│   └── collections/
│       ├── navigation.json
│       ├── essentials.json
│       └── animated.json
│
├── tests/
│   │
│   ├── contract/
│   │   ├── react.test.ts
│   │   ├── react-native.test.ts
│   │   ├── metadata.test.ts
│   │   └── registry.test.ts
│   │
│   ├── compiler/
│   ├── generators/
│   ├── registry/
│   ├── snapshots/
│   ├── accessibility/
│   └── visual/
│
├── .changeset/
│
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── visual-regression.yml
│   │   ├── registry-validation.yml
│   │   ├── release.yml
│   │   └── preview.yml
│   │
│   ├── ISSUE_TEMPLATE/
│   └── pull_request_template.md
│
├── .editorconfig
├── .gitignore
├── .npmrc
├── prettier.config.mjs
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── turbo.json
└── tsconfig.base.json
```

---

## 6.2 Non-Negotiable Repository Principle

The following directory is the primary source of truth:

```text
icons/source/
```

Do **not** manually edit generated framework output.

For example:

```text
packages/react/src/generated/
packages/react-native/src/generated/
packages/svg/generated/
packages/metadata/generated/
packages/registry/generated/
registry/r/
```

must be treated as compiler output.

Add an explicit generated-file header:

```ts
/**
 * AUTO-GENERATED BY PXUI.
 *
 * Do not edit this file manually.
 * Source:
 * icons/source/navigation/home.ts
 */
```

This prevents accidental divergence.

---

## 6.3 Package Responsibility Matrix

| Package                   | Public          | Responsibility                                                                                               |
| ------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------ |
| `@pxui/core`              | Yes             | Canonical shared types, geometry contracts, icon runtime primitives and zero/near-zero dependency utilities. |
| `@pxui/react`             | Yes             | Tree-shakeable generated React icon components and minimal React runtime.                                    |
| `@pxui/react-native`      | Yes             | Generated React Native components using `react-native-svg`.                                                  |
| `@pxui/svg`               | Yes             | Raw generated SVG assets and optional programmatic SVG access.                                               |
| `@pxui/animations`        | Optional        | Animation definitions and platform-specific animation adapters.                                              |
| `@pxui/brands`            | Yes             | Brand icon exports, legal metadata and trademark/source information.                                         |
| `@pxui/metadata`          | Public/Internal | Catalog, search, category, family and icon metadata.                                                         |
| `@pxui/registry`          | Build Tool      | shadcn Registry generation, serialization and validation.                                                    |
| `@pxui/cli`               | Later           | Search, add, inspect, update and developer-workflow commands.                                                |
| `@pxui/config-eslint`     | Internal        | Shared lint configuration.                                                                                   |
| `@pxui/config-typescript` | Internal        | Shared TypeScript configurations.                                                                            |

---

## 6.4 - 6.54 Directives

For the full detailed specifications on individual package targets, validation gates, testing layers, and CLI commands, refer to the authoritative architecture documentation.
