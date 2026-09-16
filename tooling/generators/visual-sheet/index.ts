import { NormalizedIcon } from "../../compiler/src/normalize";

export function generateVisualRegressionSheetHtml(icons: NormalizedIcon[]): string {
  // Group icons by family
  const familyMap = new Map<string, NormalizedIcon[]>();
  for (const icon of icons) {
    const fam = icon.family || "other";
    if (!familyMap.has(fam)) {
      familyMap.set(fam, []);
    }
    familyMap.get(fam)!.push(icon);
  }

  const families = Array.from(familyMap.entries()).sort(([a], [b]) => a.localeCompare(b));

  const renderSvg = (icon: NormalizedIcon, size: number) => {
    const pathsHtml = icon.paths.map((p) => `<path d="${p.d}" fill="currentColor" />`).join("");
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="pixel-crisp">${pathsHtml}</svg>`;
  };

  const familySections = families
    .map(([fam, famIcons]) => {
      const rows = famIcons
        .map((icon) => {
          return `
          <tr class="icon-row border-b border-[#e6dfd8] dark:border-[#252320]">
            <td class="p-3 font-mono text-xs text-[#141413] dark:text-[#faf9f5]">
              <div class="font-semibold">${icon.pascalName}</div>
              <div class="text-[#8e8b82] text-[10px]">px-${icon.cleanName} · ${icon.category}</div>
            </td>
            <td class="p-3 text-center"><div class="inline-flex items-center justify-center w-8 h-8 bg-paper dark:bg-[#141413] rounded border border-[#e6dfd8] dark:border-[#2e2c28]">${renderSvg(icon, 16)}</div></td>
            <td class="p-3 text-center"><div class="inline-flex items-center justify-center w-9 h-9 bg-paper dark:bg-[#141413] rounded border border-[#e6dfd8] dark:border-[#2e2c28]">${renderSvg(icon, 20)}</div></td>
            <td class="p-3 text-center"><div class="inline-flex items-center justify-center w-10 h-10 bg-paper dark:bg-[#141413] rounded border border-[#e6dfd8] dark:border-[#2e2c28]">${renderSvg(icon, 24)}</div></td>
            <td class="p-3 text-center"><div class="inline-flex items-center justify-center w-12 h-12 bg-paper dark:bg-[#141413] rounded border border-[#e6dfd8] dark:border-[#2e2c28]">${renderSvg(icon, 32)}</div></td>
            <td class="p-3 text-center"><div class="inline-flex items-center justify-center w-16 h-16 bg-paper dark:bg-[#141413] rounded border border-[#e6dfd8] dark:border-[#2e2c28]">${renderSvg(icon, 48)}</div></td>
          </tr>
        `;
        })
        .join("");

      return `
        <div class="family-card mb-8 border border-[#e6dfd8] dark:border-[#2e2c28] rounded-lg bg-white dark:bg-[#181715] overflow-hidden shadow-xs">
          <div class="bg-[#f5f0e8] dark:bg-[#201e1b] px-4 py-2.5 border-b border-[#e6dfd8] dark:border-[#252320] flex items-center justify-between">
            <span class="font-mono text-xs font-bold uppercase tracking-wider text-[#cc785c]">${fam} FAMILY</span>
            <span class="font-mono text-[11px] text-[#8e8b82]">${famIcons.length} SPECIMENS</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-[#faf9f5] dark:bg-[#1d1b18] text-[10px] font-mono text-[#8e8b82] uppercase border-b border-[#e6dfd8] dark:border-[#252320]">
                  <th class="p-3">IDENTIFIER</th>
                  <th class="p-3 text-center">16px</th>
                  <th class="p-3 text-center">20px</th>
                  <th class="p-3 text-center">24px</th>
                  <th class="p-3 text-center">32px</th>
                  <th class="p-3 text-center">48px</th>
                </tr>
              </thead>
              <tbody>
                ${rows}
              </tbody>
            </table>
          </div>
        </div>
      `;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PXUI Visual Regression & Family Reference Matrix</title>
  <style>
    :root {
      --paper: #faf9f5;
      --foreground: #141413;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      margin: 0;
      padding: 24px;
      background: #faf9f5;
      color: #141413;
    }
    .pixel-crisp {
      shape-rendering: crispEdges;
    }
    @media (prefers-color-scheme: dark) {
      body {
        background: #141413;
        color: #faf9f5;
      }
    }
  </style>
</head>
<body>
  <div style="max-width: 1200px; margin: 0 auto;">
    <header style="margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #e6dfd8;">
      <h1 style="font-family: monospace; font-size: 20px; margin: 0 0 8px 0; color: #cc785c;">
        ■ PXUI VISUAL REGRESSION & OPTICAL REFERENCE MATRIX
      </h1>
      <div style="font-family: monospace; font-size: 11px; color: #8e8b82;">
        Total Specimens: ${icons.length} | Families: ${families.length} | Scales: 16px, 20px, 24px, 32px, 48px
      </div>
    </header>

    <main>
      ${familySections}
    </main>
  </div>
</body>
</html>`;
}
