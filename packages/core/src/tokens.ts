/**
 * Canonical PXUI Geometry Tokens
 * As codified in Section 4 of the PXUI Specification.
 */
export const PX_GRID = 24 as const;
export const ACTION_BAR_WEIGHT = 4 as const;
export const ACTION_STANDARD_EXTENT = 16 as const;
export const CONTAINER_CORNER_STEP = 2 as const;
export const MODIFIER_WEIGHT = 2 as const;
export const CANVAS_SAFE_MARGIN = 2 as const;

export const PX_TOKENS = {
  grid: PX_GRID,
  actionBarWeight: ACTION_BAR_WEIGHT,
  actionStandardExtent: ACTION_STANDARD_EXTENT,
  containerCornerStep: CONTAINER_CORNER_STEP,
  modifierWeight: MODIFIER_WEIGHT,
  canvasSafeMargin: CANVAS_SAFE_MARGIN,
} as const;
