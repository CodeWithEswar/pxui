import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { validateNaming } from "../../tooling/validators/naming";
import { toPXComponentName } from "../../lib/compiler";
import { normalizeIcon } from "../../tooling/compiler/src/normalize";
import { PXIconDefinition } from "../../icons/schemas/icon.schema";

describe("PXUI Naming & Metadata Governance Unit Tests (Section 12.3 - 12.5)", () => {
  it("should transform canonical lowercase-kebab-case names to strictly PXIcon* components", () => {
    assert.strictEqual(toPXComponentName("arrow-left"), "PXIconArrowLeft");
    assert.strictEqual(toPXComponentName("calendar-clock"), "PXIconCalendarClock");
    assert.strictEqual(toPXComponentName("arrow-up-right"), "PXIconArrowUpRight");
    assert.strictEqual(toPXComponentName("git-branch"), "PXIconGitBranch");
    assert.strictEqual(toPXComponentName("volume-2"), "PXIconVolume2");
  });

  it("should validate valid naming combinations", () => {
    const issues = validateNaming("px-calendar-clock", "PXIconCalendarClock");
    assert.strictEqual(issues.length, 0, "Valid naming should produce zero issues");

    const issues2 = validateNaming("px-arrow-left", "PXIconArrowLeft");
    assert.strictEqual(issues2.length, 0, "Valid naming should produce zero issues");
  });

  it("should strictly reject non-PXIcon naming variants (Section 12.4)", () => {
    const invalidVariants = [
      "PXCalendarClock",
      "PixelCalendarClock",
      "CalendarClockIcon",
      "PxIconCalendarClock",
      "PXIconcalendarClock",
      "PXIcon_calendar_clock",
    ];

    for (const variant of invalidVariants) {
      const issues = validateNaming("px-calendar-clock", variant);
      assert.ok(
        issues.length > 0,
        `Naming validator must reject non-compliant variant '${variant}'`
      );
      assert.ok(
        issues.some((i) => i.severity === "BLOCKING"),
        `Rejection of '${variant}' must be BLOCKING`
      );
    }
  });

  it("should reject slug mismatch with component name", () => {
    const issues = validateNaming("px-calendar-clock", "PXIconArrowLeft");
    assert.ok(issues.some((i) => i.code === "NAME_SLUG_MISMATCH"));
  });

  it("should reject invalid slug formats", () => {
    const invalidSlugs = [
      "calendar-clock", // missing px- prefix
      "PX-calendar-clock",
      "px-calendar_clock",
      "px-CalendarClock",
    ];

    for (const slug of invalidSlugs) {
      const issues = validateNaming(slug, "PXIconCalendarClock");
      assert.ok(issues.length > 0, `Must reject invalid slug '${slug}'`);
    }
  });

  it("should normalize metadata deterministically (Section 12.5)", () => {
    const rawIcon: PXIconDefinition = {
      name: "calendar-clock",
      title: "Calendar Clock",
      description: "Schedule and time icon.",
      category: "time",
      family: "calendar",
      aliases: ["appointment", "event-time", "appointment", "  MEETING  ", ""],
      tags: ["calendar", "time", "calendar", "SCHEDULE", "  ", "time"],
      geometry: {
        grid: 24,
        paths: [{ d: "M4 4h16v16H4z" }],
      },
      status: "stable",
      introduced: "1.0.0",
      introducedVersion: "1.0.0",
    };

    const normalized = normalizeIcon(rawIcon);

    // Tags should be deduplicated, trimmed, and lowercase
    assert.deepStrictEqual(normalized.tags, ["calendar", "time", "schedule"]);

    // Aliases should be deduplicated, trimmed, lowercase, empty strings removed
    assert.deepStrictEqual(normalized.aliases, ["appointment", "event-time", "meeting"]);

    // Canonical names must be consistent
    assert.strictEqual(normalized.pascalName, "PXIconCalendarClock");
    assert.strictEqual(normalized.slug, "px-calendar-clock");
    assert.strictEqual(normalized.cleanName, "calendar-clock");
  });

  it("should preserve deprecation schema and replacement pointer (Section 13.5)", () => {
    const deprecatedIcon: PXIconDefinition = {
      name: "old-calendar",
      title: "Old Calendar",
      category: "time",
      aliases: [],
      tags: ["calendar"],
      geometry: {
        grid: 24,
        paths: [{ d: "M4 4h16v16H4z" }],
      },
      status: "deprecated",
      introduced: "1.0.0",
      introducedVersion: "1.0.0",
      deprecated: true,
      replacedBy: "px-calendar-clock",
    };

    const normalized = normalizeIcon(deprecatedIcon);
    assert.strictEqual(normalized.deprecated, true);
    assert.strictEqual(normalized.status, "deprecated");
    assert.strictEqual(normalized.replacedBy, "px-calendar-clock");
  });
});
