# ADR-001: Canonical Pixel Geometry, Compiler IR, and Monorepo Architecture

**Status:** Accepted  
**Date:** 2026-09-16  
**Author:** PXUI Design Systems & Core Engineering Team  
**Scope:** `@pxui/core`, `@pxui/react`, `@pxui/react-native`, `@pxui/svg`, `@pxui/metadata`, `@pxui/registry`, Compiler, Documentation Site

---

## 1. Context & Problem Statement

Modern web icon ecosystems frequently present rasterized or smoothed vectors as "pixel icons" without adhering to true orthogonal stepped geometry. This leads to:
1. **Geometric incoherence:** Icons drawn with smoothed Bézier curves that antialias unpredictably across varying pixel densities.
2. **Platform drift:** Inconsistent stroke expansion, fill behavior, and path interpretation across React, React Native, and SVG.
3. **Variant inflation:** Superficial duplicates (e.g. arbitrary `add-left`, `add-right`, `close-small`) cluttering APIs without semantic justification.
4. **Non-deterministic builds:** Unsorted commands, locale-dependent floats, and timestamped file headers making verification and caching brittle.

PXUI resolves these issues by establishing a rigorous **Canonical Pixel Geometry Constitution**, a deterministic compilation pipeline, and a workspace monorepo.

---

## 2. Decision & Architectural Principles

### 2.1 Canonical Pixel Geometry Constitution

* **Canvas & Grid:** Strict 24 × 24 coordinate space (`viewBox="0 0 24 24"`).
* **Integer Coordinates:** All primary anchor vertices must align to the integer grid. Half-unit coordinates (`0.5`) are permitted strictly for documented optical centering (e.g. asymmetric checkmark centroids) and must be explicitly recorded in `opticalCorrection` metadata.
* **Filled Orthogonal Geometry:** Zero strokes in canonical core icons. All paths are authored or compiled as filled orthogonal polygons and stepped staircase rhythms (default `2 × 2` base pixel cell, `4-unit` primary bar, `2-unit` detail bar).
* **Safe Zone & Envelopes:**
  - Default safe zone: `x = 2..22, y = 2..22`.
  - Standard glyph footprint: `16 × 16` (normally `4..20`).
  - Large-emphasis footprint: `20 × 20` (normally `2..22`).
  - Compact footprint: `12 × 12` (normally `6..18`).
* **Stepped Containers:**
  - Circle container: Octagonal stepped perimeter `(8,2) → (16,2) → (16,4) → (20,4) → (20,8) → (22,8) → (22,16) ...` with a 2-unit wall.
  - Square container: Chamfered 2 × 2 corner perimeter with 2-unit wall.
* **Minimum Negative Space:** Minimum 2-unit channel between disconnected shapes or internal cutouts to ensure legibility at 16px.

### 2.2 Canonical Source & Deterministic Compiler Pipeline

All icons are authored once in `icons/source/` using typed TypeScript definitions (`IconDefinition`). Platform packages are strictly generated:

```
[Canonical Definitions] (icons/source/)
           │
           ▼
[Schema & Taxonomy Validation] (tooling/validators/)
           │
           ▼
[IR Normalization & Geometry Analysis] (tooling/compiler/)
  ├─ Bounds, centroid, area calculation
  ├─ Collision fingerprinting (SHA-256)
  └─ Collinear point & zero-length pruning
           │
           ▼
[Deterministic Code Generation] (tooling/generators/)
  ├─ @pxui/react (Tree-shakeable SVG components, forwardRef, TypeScript)
  ├─ @pxui/react-native (react-native-svg components)
  ├─ @pxui/svg (Raw optimized SVG assets)
  ├─ @pxui/metadata (Catalog manifest & search index)
  └─ @pxui/registry (shadcn-compatible JSON endpoints in public/r/)
```

* **Byte-Exact Determinism:** Consecutive clean generation passes yield identical SHA-256 content hashes.
* **No Manual Edits:** Generated files in `packages/` or `public/r/` are never edited by hand. Any enhancement must be made in the canonical source, schema, or generator templates.

### 2.3 Package & Monorepo Topology

```
pxui/
├── apps/
│   └── showcase/              # Next.js 16 Catalog, Inspector, Playground, Specimen
├── packages/
│   ├── core/                  # Schemas, tokens, geometry types, contracts
│   ├── react/                 # Generated React components (@pxui/react)
│   ├── react-native/          # Generated React Native components (@pxui/react-native)
│   ├── svg/                   # Generated raw SVG files (@pxui/svg)
│   ├── metadata/              # Generated catalog manifests & search index (@pxui/metadata)
│   └── registry/              # shadcn registry generator & schema builder (@pxui/registry)
├── tooling/
│   ├── compiler/              # Normalization, AST analysis, geometry algorithms
│   ├── generators/            # Code generators for React, Native, SVG, Registry
│   ├── validators/            # Geometry, Schema, Naming, Collision, Taxonomy gates
│   └── scripts/               # CI verification, generation, and test scripts
├── icons/
│   ├── source/                # Single canonical source of truth for all icons
│   ├── families.ts            # Canonical family definitions & taxonomy registry
│   └── categories.ts          # Category taxonomy definitions
└── tests/                     # Unit, contract, accessibility, scale, and golden tests
```

### 2.4 Component Naming & Public API Governance

* Public React components are strictly prefixed: `PXIcon` + `PascalCase` (e.g. `PXIconAdd`, `PXIconCloseCircle`). Unprefixed, `Pixel*`, or `Px*` component names are forbidden.
* Registry slugs are strictly: `px-` + `kebab-case` (e.g. `px-add`, `px-close-circle`).
* Public API stability: Public component names are immutable once released in a stable milestone.

---

## 3. Consequences & Benefits

* **Positive:**
  - 100% geometric consistency: every icon in PXUI looks natively crafted for pixels rather than scaled down from high-res vectors.
  - Multi-platform parity: React and React Native share byte-aligned geometry.
  - Tree-shaking: Each icon is emitted as an isolated module with standard ES exports.
  - shadcn compatibility: Developers can install single icons via `npx shadcn@latest add https://pxui.dev/r/px-[name].json` without bundle overhead.
* **Negative / Trade-offs:**
  - Strict geometry validation rejects arbitrary SVG path imports; all icons must adhere to orthogonal stepped geometry.
  - Authoring new icons requires defining structured coordinates or normalized path data adhering to the 24×24 integer grid.
