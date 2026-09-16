import { PXIconDefinition } from "../../../icons/schemas/icon.schema";
import { QualityGateIssue } from "../types";

const FORBIDDEN_SVG_TAGS = ["script", "foreignobject", "iframe", "embed", "object", "link", "style"];
const EVENT_HANDLER_REGEX = /\bon[a-z]+\s*=/i;
const REMOTE_URL_REGEX = /\b(?:https?:\/\/|ftp:\/\/)/i;
const DATA_URI_REGEX = /\bdata:(?!image\/svg\+xml)[a-z0-9/+-]+;base64/i;
const SCRIPT_URL_REGEX = /javascript:/i;

// Match color hexes (#fff, #ffffff, #000000) or rgb/rgba or hsl
const HARDCODED_COLOR_REGEX = /#(?:[0-9a-fA-F]{3}){1,2}\b|rgba?\([^)]+\)|hsla?\([^)]+\)/i;

export function validateHygiene(icon: PXIconDefinition): QualityGateIssue[] {
  const issues: QualityGateIssue[] = [];
  const slug = icon.slug || `px-${icon.name.replace(/^(px-|PXIcon)/, "").toLowerCase()}`;
  const isBrand = Boolean(icon.brand || icon.category === "brands");

  const pathsToCheck = [...(icon.geometry.paths || [])];
  if (icon.geometry.filled) {
    pathsToCheck.push(...icon.geometry.filled);
  }

  for (let i = 0; i < pathsToCheck.length; i++) {
    const p = pathsToCheck[i];
    const d = p.d || "";

    // 1. Check for injected tags
    for (const tag of FORBIDDEN_SVG_TAGS) {
      if (new RegExp(`<\\s*${tag}`, "i").test(d)) {
        issues.push({
          gate: "hygiene",
          severity: "BLOCKING",
          slug,
          field: `geometry.paths[${i}]`,
          code: "FORBIDDEN_SVG_TAG",
          message: `Path contains forbidden XML tag '<${tag}>'.`,
          expected: "Pure SVG path command string without embedded XML tags",
          actual: d,
          primitiveIndex: i,
        });
      }
    }

    // 2. Check for event handler attributes (e.g. onload=)
    if (EVENT_HANDLER_REGEX.test(d)) {
      issues.push({
        gate: "hygiene",
        severity: "BLOCKING",
        slug,
        field: `geometry.paths[${i}]`,
        code: "EVENT_HANDLER_INJECTION",
        message: `Path contains forbidden event handler attribute.`,
        expected: "No JavaScript event handlers in icon geometry",
        primitiveIndex: i,
      });
    }

    // 3. Check for external remote URLs
    if (REMOTE_URL_REGEX.test(d)) {
      issues.push({
        gate: "hygiene",
        severity: "BLOCKING",
        slug,
        field: `geometry.paths[${i}]`,
        code: "EXTERNAL_RESOURCE_URL",
        message: `Path contains external URL reference. Icons must be completely self-contained.`,
        expected: "Self-contained vector data",
        primitiveIndex: i,
      });
    }

    // 4. Check for javascript: or dangerous data URIs
    if (SCRIPT_URL_REGEX.test(d) || DATA_URI_REGEX.test(d)) {
      issues.push({
        gate: "hygiene",
        severity: "BLOCKING",
        slug,
        field: `geometry.paths[${i}]`,
        code: "UNSAFE_URI_INJECTION",
        message: `Path contains unsafe script or data URI.`,
        primitiveIndex: i,
      });
    }

    // 5. Hard-Coded Color Policy (Section 9.14)
    if (!isBrand && HARDCODED_COLOR_REGEX.test(d)) {
      issues.push({
        gate: "color",
        severity: "BLOCKING",
        slug,
        field: `geometry.paths[${i}]`,
        code: "HARDCODED_COLOR_FORBIDDEN",
        message: `Standard PXUI interface icons must use 'currentColor' rather than hard-coded colors.`,
        expected: "currentColor",
        primitiveIndex: i,
        suggestion: "Remove hardcoded hex/rgb fills and use currentColor.",
      });
    }
  }

  return issues;
}
