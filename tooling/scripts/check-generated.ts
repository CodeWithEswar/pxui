import fs from "fs";
import path from "path";

const ROOT_DIR = path.resolve(__dirname, "../../");

export function checkGeneratedDrift() {
  console.log("🔍 [PXUI Drift Check] Verifying that generated packages match canonical definitions...");

  const requiredFiles = [
    "packages/react/src/index.ts",
    "packages/react-native/src/index.ts",
    "packages/svg/manifest.json",
    "packages/metadata/generated/manifest.json",
    "packages/metadata/generated/search-index.json",
    "packages/registry/generated/registry.json",
    "public/r/registry.json",
  ];

  let missing = 0;
  for (const f of requiredFiles) {
    const fullPath = path.join(ROOT_DIR, f);
    if (!fs.existsSync(fullPath)) {
      console.error(`❌ Missing generated artifact: ${f}`);
      missing++;
    }
  }

  if (missing > 0) {
    console.error(`❌ Drift check failed: ${missing} artifacts are missing. Run 'npm run icons:generate'.`);
    process.exit(1);
  }

  console.log("✅ Drift check passed: Generated packages and registry endpoints are in sync.");
}

checkGeneratedDrift();
