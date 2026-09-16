# PXUI — Pixel-Native Icon System & Package Ecosystem

> A production-grade, pixel-native icon system, deterministic compiler, multi-platform package ecosystem, shadcn registry, and interactive catalog for modern web and mobile applications.

[![Build & Verification Status](https://img.shields.io/badge/verification-100%25%20passing-10b981?style=flat-square)](https://github.com/CodeWithEswar/pxui)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](./LICENSE)
[![Grid: 24x24](https://img.shields.io/badge/grid-24%C3%9724%20canonical-f97316?style=flat-square)](https://pxui.dev)
[![TypeScript: Strict](https://img.shields.io/badge/typescript-5.x%20strict-3178c6?style=flat-square)](https://www.typescriptlang.org)

---

## 1. System Mission & Visual Constitution

PXUI is not a collection of smooth line icons downscaled to an SVG canvas. PXUI icons are **genuinely constructed from stepped orthogonal geometry, filled pixel cells, and chamfered containers**.

### Canonical Geometry Principles
- **Canonical Canvas**: Strict 24 × 24 coordinate space (`viewBox="0 0 24 24"`).
- **Coordinate Grid**: Exact integer coordinates. Half-unit coordinates (`0.5`) are permitted strictly for mathematically justified optical centering. Arbitrary floating decimals are rejected by compiler gates.
- **Stepped Rhythm**: Orthogonal bands with a 2-unit base pixel cell, 4-unit primary bar thickness, 2-unit detail thickness, and minimum 2-unit negative space channels.
- **Octagonal Pixel Containers**: Pixel-native "circles" and "squares" constructed through precise chamfered corners, preserving crisp rasterization at 16, 20, 24, 32, and 48px without antialiasing blur.
- **No SVG Strokes**: All core icons are authored and compiled as filled orthogonal polygons and cutouts, guaranteeing deterministic rendering across React, React Native, raw SVG, and canvas backends.

---

## 2. Package Ecosystem

The PXUI repository is organized as an industrial monorepo separating authored canonical definitions, compiler tooling, distribution packages, and the showcase application:

| Package | Purpose | Distribution / Location |
| :--- | :--- | :--- |
| **`@pxui/core`** | Canonical schemas, geometry tokens, normalization algorithms, and type definitions | `packages/core` |
| **`@pxui/react`** | Tree-shakeable React 19 / 18 SVG components with forwardRef, full accessibility, and zero runtime dependencies | `packages/react` |
| **`@pxui/react-native`** | Native components utilizing `react-native-svg` with equivalent geometry | `packages/react-native` |
| **`@pxui/svg`** | Optimized raw SVGs with normalized paths, integer coordinates, and `fill="currentColor"` | `packages/svg` |
| **`@pxui/metadata`** | Full manifest, geometry statistics, and ultra-fast in-memory search index (<15ms p95 across 5,000+ items) | `packages/metadata` |
| **`@pxui/registry`** | Direct distribution registry compatible with the `shadcn` CLI (`npx shadcn@latest add ...`) | `packages/registry` |
| **Showcase App** | Production Next.js 16 catalog, interactive geometry inspector, specification explorer, and playground | `app/` |

---

## 3. Installation & Usage

### A. React Components (`@pxui/react`)

```bash
# Using npm
npm install @pxui/react

# Using pnpm
pnpm add @pxui/react
```

```tsx
import { PXIconAddCircle, PXIconEdit, PXIconCheck } from "@pxui/react";

export function ActionToolbar() {
  return (
    <div className="flex items-center gap-3">
      {/* Default 24x24 outline */}
      <PXIconAddCircle />

      {/* Custom size and color inheritance */}
      <PXIconEdit size={20} className="text-amber-500" />

      {/* Accessible icon with title/accessible name */}
      <PXIconCheck
        size={24}
        title="Completed task"
        className="text-emerald-500"
      />
    </div>
  );
}
```

### B. shadcn Registry Integration

Install single icons directly into your existing React / Tailwind project without adding a full package dependency:

```bash
# Install base runtime component
npx shadcn@latest add https://pxui.dev/r/px-icon-base.json

# Install specific canonical icons
npx shadcn@latest add https://pxui.dev/r/px-add.json
npx shadcn@latest add https://pxui.dev/r/px-check.json
npx shadcn@latest add https://pxui.dev/r/px-edit.json
```

### C. React Native (`@pxui/react-native`)

```bash
npm install @pxui/react-native react-native-svg
```

```tsx
import { PXIconHome, PXIconSettings } from "@pxui/react-native";

export function MobileTabBar() {
  return (
    <View style={{ flexDirection: "row", padding: 12 }}>
      <PXIconHome size={24} color="#141413" />
      <PXIconSettings size={24} color="#6c6a64" />
    </View>
  );
}
```

### D. Raw SVG (`@pxui/svg`)

Direct SVG assets are located in `packages/svg/` and can be imported into any static site generator, Figma, or UI framework:

```html
<img src="/icons/svg/add-circle.svg" width="24" height="24" alt="Add" />
```

---

## 4. Accessibility & Screen Reader Standards

Every PXUI component adheres to strict WAI-ARIA standards:
- **Decorative by default**: When no `title` or `aria-label` is passed, icons render with `aria-hidden="true"` and omit `role="img"`, preventing screen-reader clutter.
- **Accessible when labeled**: When `title` or `aria-label` is provided, icons render with `role="img"`, an accessible name, and an internal `<title>` element.
- **Focus Indicators**: Catalog and interactive specimens maintain standard `min-h-[44px]` touch targets with high-contrast visible focus rings.
- **Reduced Motion**: All animated variants respect `prefers-reduced-motion: reduce`, disabling continuous loops and immediately resolving to the final stable glyph pose.

---

## 5. Compiler Pipeline & Architecture

PXUI enforces a single authored canonical source (`icons/source/`). All platform components and registries are generated deterministically.

```
┌───────────────────────────┐
│ Authored Canonical Source │  icons/source/*.ts (Definitions, Primitives, Geometry)
└─────────────┬─────────────┘
              ▼
┌───────────────────────────┐
│ Schema & Geometry Gates   │  tooling/validators/ (24x24 bounds, off-grid check, collisions)
└─────────────┬─────────────┘
              ▼
┌───────────────────────────┐
│ Intermediate Normalizer   │  tooling/compiler/src/normalize.ts (IR, Centroid, Area, Bounds)
└─────────────┬─────────────┘
              ▼
  ┌───────────┼───────────┬───────────┬───────────┐
  ▼           ▼           ▼           ▼           ▼
React    React Native    SVG      Registry    Metadata
Package    Package     Package    Artifacts   & Search
```

---

## 6. Development, Validation & Quality Gates

PXUI operates with zero tolerance for broken geometry, type errors, or test drift.

```bash
# 1. Run all quality gates in sequential order (CI script)
npm run verify

# 2. Validate canonical geometry and taxonomy (bounds, grid, collisions)
npm run icons:validate

# 3. Generate all multi-platform outputs and registries
npm run icons:generate

# 4. Check for generated drift against canonical definitions
npm run check:generated

# 5. Verify byte-exact compiler determinism (SHA-256 hash comparison)
npm run validate:determinism

# 6. Run comprehensive unit, contract, and scale test suites
npm test

# 7. Execute production Next.js static build
npm run build
```

---

## 7. Reference Family Batches (0001–0050)

The first 50 canonical icons establish PXUI's reference visual DNA across five core action families:

1. **Add Family (`0001–0010`)**: `add`, `add-circle`, `add-square`, `insert-left`, `insert-right`, `insert-above`, `insert-below`, `remove`, `remove-circle`, `close`.
2. **Remove & Subtraction Family (`0011–0020`)**: `remove-square`, `subtract`, `subtract-circle`, `subtract-square`, `remove-row`, `remove-column`, `clear`, `clear-circle`, `clear-square`, `delete`.
3. **Close & Dismissal Family (`0021–0030`)**: `close-circle`, `close-square`, `close-panel-left`, `close-panel-right`, `close-panel-top`, `close-panel-bottom`, `close-tab`, `close-window`, `dismiss`, `cancel`.
4. **Check & Confirm Family (`0031–0040`)**: `check`, `check-circle`, `check-square`, `check-double`, `check-all`, `checkbox-checked`, `checkbox-indeterminate`, `radio-checked`, `selection-check`, `confirm`.
5. **Edit & Authoring Family (`0041–0050`)**: `edit`, `edit-circle`, `edit-square`, `edit-text`, `edit-document`, `edit-image`, `edit-code`, `edit-table`, `edit-selection`, `edit-locked`.

---

## 8. License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for full details.
