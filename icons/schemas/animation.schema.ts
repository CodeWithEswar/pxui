export type PXAnimationFamily =
  | "state"
  | "directional"
  | "attention"
  | "reveal"
  | "signal"
  | "loop";

export type PXAnimationTrigger = "hover" | "click" | "state" | "continuous" | "mount" | "always";

export interface PXAnimationFrameStep {
  step: number;
  durationMs: number;
  transform?: string;
  opacity?: number;
}

export interface PXAnimationDefinition {
  type: string;
  family?: PXAnimationFamily;
  trigger?: PXAnimationTrigger;
  durationMs?: number;
  steps?: PXAnimationFrameStep[];
}
