import { QualityGateIssue } from "../types";

export interface RegistryItemInput {
  name?: string;
  type?: string;
  files?: Array<{ path?: string; content?: string }>;
}

export function validateRegistryItem(item: RegistryItemInput): QualityGateIssue[] {
  const issues: QualityGateIssue[] = [];
  const slug = item.name || "unknown";

  if (!item.name || !item.name.startsWith("px-")) {
    issues.push({
      gate: "registry",
      severity: "BLOCKING",
      slug,
      field: "name",
      code: "REGISTRY_NAME_PREFIX",
      message: "Registry item name must start with 'px-' canonical prefix.",
      expected: "^px-[a-z0-9-]+$",
      actual: item.name,
    });
  }

  if (item.type !== "registry:ui" && item.type !== "registry:lib") {
    issues.push({
      gate: "registry",
      severity: "BLOCKING",
      slug,
      field: "type",
      code: "REGISTRY_TYPE_INVALID",
      message: `Registry item type must be 'registry:ui' or 'registry:lib'. Received: '${item.type}'.`,
      expected: "registry:ui | registry:lib",
      actual: item.type,
    });
  }

  if (!item.files || !Array.isArray(item.files) || item.files.length === 0) {
    issues.push({
      gate: "registry",
      severity: "BLOCKING",
      slug,
      field: "files",
      code: "REGISTRY_FILES_EMPTY",
      message: "Registry item must have at least one target component file.",
      expected: "Non-empty array of file descriptors",
      actual: "0 files",
    });
  } else {
    for (let i = 0; i < item.files.length; i++) {
      const f = item.files[i];
      if (!f.path || typeof f.path !== "string") {
        issues.push({
          gate: "registry",
          severity: "BLOCKING",
          slug,
          field: `files[${i}].path`,
          code: "REGISTRY_FILE_PATH_MISSING",
          message: "Registry file descriptor missing valid path.",
          actual: String(f.path),
        });
      }
      if (!f.content || typeof f.content !== "string") {
        issues.push({
          gate: "registry",
          severity: "BLOCKING",
          slug,
          field: `files[${i}].content`,
          code: "REGISTRY_FILE_CONTENT_EMPTY",
          message: "Registry file content must be a non-empty string.",
          actual: "empty content",
        });
      }
    }
  }

  return issues;
}
