import crypto from "crypto";
import { PXIconDefinition } from "../../../icons/schemas/icon.schema";
import { QualityGateIssue } from "../types";

/**
 * Computes canonical SHA-256 geometry hash from normalized path string.
 */
export function computeGeometryHash(icon: PXIconDefinition): string {
  const normalizedD = (icon.geometry.paths || [])
    .map((p) => p.d.replace(/\s+/g, " ").trim())
    .sort()
    .join("|");
  return crypto.createHash("sha256").update(normalizedD).digest("hex");
}

export function validateCollisions(icons: PXIconDefinition[]): QualityGateIssue[] {
  const issues: QualityGateIssue[] = [];

  const seenCanonicalNames = new Map<string, string>();
  const seenComponentNames = new Map<string, string>();
  const seenSlugs = new Map<string, string>();
  const normalizedKeys = new Map<string, string>();
  const seenGeometryHashes = new Map<string, { slug: string; name: string }>();

  for (const icon of icons) {
    const slug = icon.slug || `px-${icon.name.replace(/^(px-|PXIcon)/, "").toLowerCase()}`;
    const canonicalName = slug.replace(/^px-/, "");
    const componentName = icon.name.startsWith("PXIcon")
      ? icon.name
      : "PXIcon" +
        canonicalName
          .split("-")
          .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
          .join("");

    // 1. Duplicate canonical semantic name check
    if (seenCanonicalNames.has(canonicalName)) {
      issues.push({
        gate: "naming",
        severity: "BLOCKING",
        slug,
        field: "name",
        code: "COLLISION_CANONICAL_NAME",
        message: `Collision: Duplicate canonical semantic name '${canonicalName}' detected. Clashes with icon in slug '${seenCanonicalNames.get(canonicalName)}'.`,
        actual: canonicalName,
        expected: "Globally unique canonical name",
      });
    } else {
      seenCanonicalNames.set(canonicalName, slug);
    }

    // 2. Duplicate component name check
    if (seenComponentNames.has(componentName)) {
      issues.push({
        gate: "naming",
        severity: "BLOCKING",
        slug,
        field: "componentName",
        code: "COLLISION_COMPONENT_NAME",
        message: `Collision: Duplicate public component name '${componentName}' detected. Clashes with icon in slug '${seenComponentNames.get(componentName)}'.`,
        actual: componentName,
        expected: "Globally unique component name",
      });
    } else {
      seenComponentNames.set(componentName, slug);
    }

    // 3. Duplicate slug check
    if (seenSlugs.has(slug)) {
      issues.push({
        gate: "naming",
        severity: "BLOCKING",
        slug,
        field: "slug",
        code: "COLLISION_SLUG",
        message: `Collision: Duplicate registry slug '${slug}' detected.`,
        actual: slug,
        expected: "Globally unique slug",
      });
    } else {
      seenSlugs.set(slug, slug);
    }

    // 4. Case-only or punctuation collision check (e.g. qr-code vs qrcode)
    const collapsedKey = canonicalName.replace(/[^a-z0-9]/g, "");
    if (normalizedKeys.has(collapsedKey)) {
      const prior = normalizedKeys.get(collapsedKey)!;
      if (prior !== canonicalName) {
        issues.push({
          gate: "naming",
          severity: "BLOCKING",
          slug,
          field: "name",
          code: "COLLISION_PUNCTUATION_AMBIGUITY",
          message: `Collision: Punctuation/case ambiguity between '${canonicalName}' and '${prior}'.`,
          actual: canonicalName,
          expected: `Distinct semantic name that does not collide when normalized with '${prior}'`,
        });
      }
    } else {
      normalizedKeys.set(collapsedKey, canonicalName);
    }

    // 5. Exact Geometry Duplicate Gate (Section 9.11 & 9.12)
    const geoHash = computeGeometryHash(icon);
    if (seenGeometryHashes.has(geoHash)) {
      const prior = seenGeometryHashes.get(geoHash)!;
      // If they have different names and are not explicitly linked via aliases or deprecation
      const isRegisteredAlias =
        icon.aliases.includes(prior.name) ||
        icon.aliases.includes(prior.slug) ||
        icon.name === prior.name;

      if (!isRegisteredAlias) {
        issues.push({
          gate: "geometry",
          severity: "BLOCKING",
          slug,
          field: "geometry.paths",
          code: "EXACT_GEOMETRY_DUPLICATE",
          message: `Exact duplicate geometry detected between '${slug}' and '${prior.slug}' (hash: ${geoHash.slice(0, 12)}). Identical geometry must be consolidated as an alias rather than a duplicate icon.`,
          actual: geoHash,
          expected: "Unique geometry or registered alias",
          suggestion: `Add '${canonicalName}' to aliases of '${prior.slug}' instead of creating a duplicate icon.`,
        });
      }
    } else {
      seenGeometryHashes.set(geoHash, { slug, name: canonicalName });
    }
  }

  return issues;
}
