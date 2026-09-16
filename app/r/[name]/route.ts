import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ name: string }> }
) {
  const { name } = await context.params;
  const cleanName = name.endsWith(".json") ? name.slice(0, -5) : name;

  const publicRegistryDir = path.join(process.cwd(), "public", "r");
  let resolvedPath = path.join(publicRegistryDir, `${cleanName}.json`);

  if (!fs.existsSync(resolvedPath)) {
    if (cleanName.startsWith("px-")) {
      resolvedPath = path.join(publicRegistryDir, `${cleanName.slice(3)}.json`);
    } else {
      resolvedPath = path.join(publicRegistryDir, `px-${cleanName}.json`);
    }
  }

  if (!fs.existsSync(resolvedPath)) {
    return NextResponse.json(
      { error: `Registry item '${cleanName}' not found in PXUI registry.` },
      {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  try {
    const fileContent = fs.readFileSync(resolvedPath, "utf-8");
    const json = JSON.parse(fileContent);

    return NextResponse.json(json, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to parse registry item", details: String(error) },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
