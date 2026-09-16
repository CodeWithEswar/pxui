import { defineIcon } from "../../schemas/icon.schema";

export const closePanelRight = defineIcon({
  name: "PXIconClosePanelRight",
  slug: "px-close-panel-right",
  title: "Close Panel Right",
  description: "Closes a panel attached to the right edge of an application or workspace.",
  category: "actions-controls",
  family: "close-layout",
  aliases: ["close-sidebar-right", "dismiss-right-panel", "collapse-right-panel"],
  tags: ["close", "panel", "right", "sidebar", "drawer", "dismiss", "layout", "inspector"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M3 4h18v16H3V4zm2 2h8v12H5V6zm11 4h1v1h1v-1h1v1h-1v1h1v1h-1v1h-1v-1h-1v-1h1v-1h-1v-1z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 3, minY: 4, maxX: 21, maxY: 20 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default closePanelRight;
