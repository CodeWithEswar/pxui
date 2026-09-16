# PXUI Changesets & Release Policy

PXUI uses Changesets for coordinated versioning and package publishing across our monorepo packages:
- `@pxui/core`
- `@pxui/react`
- `@pxui/react-native`
- `@pxui/svg`
- `@pxui/registry`
- `@pxui/metadata`

## Semantic Versioning Rules (Section 13.2)

### Patch
- Metadata typos, description corrections, search alias adjustments.
- Internal compiler performance optimizations with identical public output.
- Visually insignificant optical centering refinements within approved 1px sub-threshold.
- Accessibility documentation corrections.

### Minor
- New canonical icons authored on the 24×24 integer grid.
- New animation state sequencers or motion families.
- New Registry collections or component props (backward compatible).
- New platform targets or package export paths.

### Major
- Removing or renaming any stable public component (`PXIcon*`).
- Changing canonical slugs (`px-*`).
- Removing Registry routes or altering Registry schema.
- Incompatible geometry or runtime API breaking changes.

## Renaming & Deprecation Lifecycle (Section 13.6, 13.20)
1. **Draft / Review**: Authoring and geometry review.
2. **Experimental**: Public preview stage before stable lock.
3. **Stable**: Canonical release contract; public exports must not be removed.
4. **Deprecated**: Mark with `deprecated: true` and `replacedBy: "px-new-name"`. The old `PXIconOldName` component remains exported until the next major release.
