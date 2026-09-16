import { defineIcon } from "../../schemas/icon.schema";

export const closePanelBottom = defineIcon({
  name: "PXIconClosePanelBottom",
  slug: "px-close-panel-bottom",
  title: "Close Panel Bottom",
  description: "Closes a panel, tray, or drawer attached to the bottom edge of an interface.",
  category: "actions-controls",
  family: "close-layout",
  aliases: ["close-bottom-panel", "dismiss-tray", "collapse-dock", "close-terminal"],
  tags: ["close", "panel", "bottom", "drawer", "tray", "sheet", "dismiss", "layout"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M4 3h16v18H4V3zm2 2h12v8H6V5zm5 11h1v1h1v-1h1v1h-1v1h1v1h-1v1h-1v-1h-1v1h-1v-1h1v-1h-1v-1h1v-1z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 4, minY: 3, maxX: 20, maxY: 21 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default closePanelBottom;
