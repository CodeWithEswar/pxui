# Contributing to PXUI

Thank you for your interest in contributing to PXUI. PXUI is a professional, pixel-native icon system and compiler with strict geometric, architectural, and quality standards.

---

## 1. Non-Negotiable Engineering Principles

1. **Canonical Source is Authored; Platforms are Generated**: Never manually edit generated files in `packages/react/`, `packages/react-native/`, `packages/svg/`, or `public/r/`. Always modify the canonical definition in `icons/source/` and run `npm run icons:generate`.
2. **Deterministic Generation**: Generated output must be 100% byte-identical across consecutive clean runs. No random IDs, no timestamps, no locale-dependent sorting.
3. **No Variant Inflation**: A new icon must differ materially in silhouette, topology, container, direction, state, or semantic meaning. Modifiers like `small`, `large`, and `active` should be handled via component props (`size`, `variant`, `filled`), not separate duplicate icons.
4. **Zero Lint / Zero Error Policy**: Every PR must pass `npm run verify` with 0 blocking errors, 0 review signals, 0 type errors, 0 lint errors, and 0 test failures.

---

## 2. Geometry & Authoring Constitution

When authoring a new icon in `icons/source/`:
- **Canvas Size**: 24 × 24 units (`viewBox="0 0 24 24"`).
- **Safe Zone**: `x = 2..22`, `y = 2..22`. Standard footprint is `16 × 16` (`x = 4..20`, `y = 4..20`).
- **Integer Coordinates**: All coordinates must be integers. Half-unit coordinates (`0.5`) are permitted strictly for mathematically justified optical centering and must be documented.
- **Filled Orthogonal Paths**: Core icons must use filled polygons (`M`, `L`, `H`, `V`, `Z`), not SVG strokes.
- **Stepped Rhythm**: Base pixel cell is `2 × 2` units. Primary bar thickness is `4` units; detail thickness is `2` units.
- **Negative Space**: Minimum gap between disconnected shapes or cutouts is `2` units.
- **No Hardcoded Colors**: Path definitions must inherit `currentColor` by default.

---

## 3. Contribution Workflow

1. **Create a branch**:
   ```bash
   git checkout -b feat/my-new-family
   ```
2. **Author the Canonical Definition**:
   - Add your icon definition to `icons/source/`.
   - Register any new family in `icons/families.ts`.
   - Verify category matches `icons/categories.ts`.
3. **Validate & Compile**:
   ```bash
   # Validate geometry and taxonomy
   npm run icons:validate

   # Generate platform packages and registries
   npm run icons:generate

   # Verify determinism and check drift
   npm run validate:determinism
   npm run check:generated
   ```
4. **Run Test Suites**:
   ```bash
   npm test
   ```
5. **Run the Unified Verification Gate**:
   ```bash
   npm run verify
   ```

---

## 4. Pull Request Checklist

Before submitting your PR, verify that:
- [ ] `npm run verify` succeeds completely.
- [ ] No generated files were manually modified.
- [ ] All new icons have `PXIcon` + PascalCase component names and `px-` + kebab-case slugs.
- [ ] Any optical corrections are documented with axis, amount, and rationale.
- [ ] Conventional commit messages are used (e.g. `feat(icons): add calendar family definitions`).
