import assert from "node:assert";

async function verify() {
  console.log("=== PXUI Workspace Verification ===");

  // 1. Verify GitHub Stars API Route
  console.log("\n1. Verifying /api/github-stars API Route...");
  const starsRes = await fetch("http://localhost:3000/api/github-stars");
  assert.strictEqual(starsRes.status, 200, "API route returns 200");
  const starsData = await starsRes.json();
  console.log("   API Response:", starsData);
  assert.ok(starsData.repoUrl.includes("github.com"), "repoUrl is valid");
  assert.ok(starsData.stars === null || typeof starsData.stars === "number", "stars is number or null (no fake stats)");
  console.log("   ✓ GitHub stars API conforms to spec");

  // 2. Verify /icons Page HTML
  console.log("\n2. Verifying /icons HTML structure...");
  const pageRes = await fetch("http://localhost:3000/icons");
  assert.strictEqual(pageRes.status, 200, "/icons returns 200");
  const html = await pageRes.text();

  // Check 100dvh application shell
  assert.ok(html.includes("h-dvh"), "Contains h-dvh application shell");
  assert.ok(html.includes("overflow-hidden"), "Shell has overflow-hidden");
  console.log("   ✓ 100dvh fixed application shell verified");

  // Check header
  assert.ok(html.includes("PXUI"), "Contains PXUI brand lockup");
  assert.ok(html.includes("ICON SYSTEM"), "Contains ICON SYSTEM brand label");
  console.log("   ✓ Fixed application header verified");

  // Check Left Discovery & Community Panel
  assert.ok(html.includes("LIBRARY"), "Contains LIBRARY section");
  assert.ok(html.includes("CATEGORIES"), "Contains CATEGORIES section");
  assert.ok(html.includes("PXUI / OPEN SOURCE"), "Contains pinned CommunityPanel with PXUI / OPEN SOURCE");
  assert.ok(html.includes("v0.1.0"), "Contains version readout");
  console.log("   ✓ Left Discovery and pinned CommunityPanel verified");

  // Check Center Catalog & Toolbar
  assert.ok(html.includes("Search icons"), "Contains Search input");
  assert.ok(html.includes("GRID"), "Contains GRID density controls");
  assert.ok(html.includes("SIZE"), "Contains SIZE controls");
  console.log("   ✓ Center Catalog and Toolbar verified");

  // Check Right Inspector
  assert.ok(html.includes("SPECIMEN"), "Contains SPECIMEN tab");
  assert.ok(html.includes("SIZES"), "Contains SIZES tab");
  assert.ok(html.includes("GEOMETRY"), "Contains GEOMETRY tab");
  assert.ok(html.includes("CODE"), "Contains CODE tab");
  console.log("   ✓ Right Inspector and tabs verified");

  // Verify that document-level marketing footer is NOT rendered on /icons
  assert.ok(!html.includes("The pixel-native icon system and developer registry for considered interfaces"), "Extraneous marketing footer removed on /icons");
  console.log("   ✓ Extraneous marketing footer removed from desktop workspace");

  console.log("\n=== ALL WORKSPACE VERIFICATION CHECKS PASSED ===");
}

verify().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
