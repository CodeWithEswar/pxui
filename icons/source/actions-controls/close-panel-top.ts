import { defineIcon } from "../../schemas/icon.schema";

export const closePanelTop = defineIcon({
  name: "PXIconClosePanelTop",
  slug: "px-close-panel-top",
  title: "Close Panel Top",
  description: "Closes a panel or region attached to the top of an interface.",
  category: "actions-controls",
  family: "close-layout",
  aliases: ["close-header-panel", "dismiss-top-panel", "collapse-top-panel"],
  tags: ["close", "panel", "top", "header", "drawer", "dismiss", "layout"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M4 3h16v18H4V3zm2 8h12v8H6v-8zm5-5h1v1h1V6h1v1h-1v1h1v1h-1v1h-1V8h-1v1h-1V8h1V7h-1V6h1V6z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 4, minY: 3, maxX: 20, maxY: 21 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default closePanelTop;
