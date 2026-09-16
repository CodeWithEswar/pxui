export interface PXVectorPath {
  d: string;
  fillRule?: "nonzero" | "evenodd";
  clipRule?: "nonzero" | "evenodd";
}

export interface PXGeometry {
  grid: 24 | 16 | 32;
  paths: PXVectorPath[];
  filled?: PXVectorPath[];
  viewBox?: string;
  bounds?: {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
  };
}
