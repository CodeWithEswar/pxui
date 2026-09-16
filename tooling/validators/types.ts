export type GateSeverity = "BLOCKING" | "REVIEW" | "WARNING" | "INFO";

export interface QualityGateIssue {
  gate:
    | "schema"
    | "naming"
    | "taxonomy"
    | "bounds"
    | "grid"
    | "geometry"
    | "optical"
    | "hygiene"
    | "color"
    | "collision"
    | "registry"
    | "determinism"
    | "accessibility"
    | "motion";
  severity: GateSeverity;
  slug: string;
  field: string;
  code: string;
  message: string;
  expected?: string;
  actual?: string;
  primitiveIndex?: number;
  sourceFile?: string;
  suggestion?: string;
}

export interface QualityReportSummary {
  timestamp: string;
  totalIcons: number;
  gatesPassed: boolean;
  blockingCount: number;
  reviewCount: number;
  warningCount: number;
  infoCount: number;
  issues: QualityGateIssue[];
  metrics: {
    exactDuplicates: number;
    nearDuplicates: number;
    hardcodedColors: number;
    outOfBounds: number;
    offGridCoordinates: number;
    namingCollisions: number;
    registryViolations: number;
  };
}
