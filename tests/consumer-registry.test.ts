import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

describe("PXUI Registry Consumer Verification", () => {
  let server: http.Server | null = null;
  let testBaseUrl = "http://localhost:3000";

  before(async () => {
    // Check if port 3000 is already active
    try {
      const ping = await fetch("http://localhost:3000/r/registry.json");
      if (ping.ok) {
        testBaseUrl = "http://localhost:3000";
        return;
      }
    } catch {
      // Server not active on 3000, spin up lightweight test server on random port
    }

    const publicRDir = path.resolve(__dirname, "../public/r");
    server = http.createServer((req, res) => {
      // CORS headers
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");

      if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
      }

      const urlPath = req.url || "/";
      const cleanPath = urlPath.replace(/^\/r\//, "").replace(/\.json$/, "");
      const targetFile = path.join(publicRDir, `${cleanPath}.json`);

      if (fs.existsSync(targetFile)) {
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        res.end(fs.readFileSync(targetFile));
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Not found" }));
      }
    });

    await new Promise<void>((resolve) => {
      server!.listen(0, "127.0.0.1", () => {
        const addr = server!.address();
        if (addr && typeof addr === "object") {
          testBaseUrl = `http://127.0.0.1:${addr.port}`;
        }
        resolve();
      });
    });
  });

  after(() => {
    if (server) {
      server.close();
    }
  });

  it("should fetch registry.json and find all registered items", async () => {
    const res = await fetch(`${testBaseUrl}/r/registry.json`);
    assert.strictEqual(res.status, 200);

    const registry = await res.json();
    assert.strictEqual(registry.name, "pxui");
    assert.ok(Array.isArray(registry.items));
    assert.ok(registry.items.length >= 101);

    const homeItem = registry.items.find((i: { name: string; title: string }) => i.name === "px-home" || i.name === "home");
    assert.ok(homeItem, "Should have 'px-home' item in registry");
    assert.strictEqual(homeItem.title, "PXIconHome");
  });

  it("should fetch px-home.json with valid content and resolve dependencies", async () => {
    const res = await fetch(`${testBaseUrl}/r/px-home.json`);
    assert.strictEqual(res.status, 200);

    const item = await res.json();
    assert.strictEqual(item.name, "px-home");
    assert.strictEqual(item.type, "registry:ui");
    assert.ok(Array.isArray(item.files));
    assert.strictEqual(item.files[0].path, "components/pxui/px-home.tsx");
    assert.ok(item.files[0].content.length > 50);

    // Verify registryDependencies includes px-icon-base
    assert.ok(Array.isArray(item.registryDependencies));
    const baseDepUrl = item.registryDependencies[0];
    assert.ok(baseDepUrl.includes("px-icon-base.json"));

    // Fetch the base dependency to ensure clean resolution
    const cleanDep = baseDepUrl.split("/r/")[1];
    const baseRes = await fetch(`${testBaseUrl}/r/${cleanDep}`);
    assert.strictEqual(baseRes.status, 200);
    const baseItem = await baseRes.json();
    assert.strictEqual(baseItem.name, "px-icon-base");
    assert.strictEqual(baseItem.files.length, 2);
  });

  it("should deliver valid JSON and CORS headers on registry endpoints", async () => {
    const res = await fetch(`${testBaseUrl}/r/home.json`);
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.headers.get("access-control-allow-origin"), "*");
  });
});
