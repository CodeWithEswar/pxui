import assert from "node:assert";
import crypto from "crypto";
import { CANONICAL_ICONS } from "../../icons/source";
import { normalizeIcon } from "../compiler/src/normalize";
import { generateReactComponent } from "../generators/react";
import { generateReactNativeComponent } from "../generators/react-native";
import { generateSvgAsset } from "../generators/svg";
import { generateRegistryItem } from "../generators/registry";

function computeRunHash(): string {
  const hash = crypto.createHash("sha256");
  const normalized = CANONICAL_ICONS.map((i) => normalizeIcon(i));

  // Sort deterministically by slug
  normalized.sort((a, b) => a.slug.localeCompare(b.slug));

  for (const icon of normalized) {
    const reactCode = generateReactComponent(icon);
    const nativeCode = generateReactNativeComponent(icon);
    const svgCode = generateSvgAsset(icon);
    const regItem = JSON.stringify(generateRegistryItem(icon));

    hash.update(icon.slug);
    hash.update(icon.geometryHash);
    hash.update(reactCode);
    hash.update(nativeCode);
    hash.update(svgCode);
    hash.update(regItem);
  }

  return hash.digest("hex");
}

export function testCompilerDeterminism() {
  console.log("🔒 [PXUI Determinism Gate] Testing compiler idempotency & byte-exact determinism...");

  const hash1 = computeRunHash();
  const hash2 = computeRunHash();

  console.log(`   Run 1 Hash: ${hash1}`);
  console.log(`   Run 2 Hash: ${hash2}`);

  assert.strictEqual(
    hash1,
    hash2,
    "Compiler output must be 100% byte-identical across multiple runs. Non-deterministic timestamps or unordered keys detected!"
  );

  console.log("✅ Determinism Gate PASSED: Generated artifacts are 100% byte-identical and reproducible.");
}

testCompilerDeterminism();
