import { defineIcon } from "../../schemas/icon.schema";

export const closePanelLeft = defineIcon({
  name: "PXIconClosePanelLeft",
  slug: "px-close-panel-left",
  title: "Close Panel Left",
  description: "Closes or dismisses a panel attached to the left side of the interface.",
  category: "actions-controls",
  family: "close-layout",
  aliases: ["close-sidebar-left", "dismiss-left-panel", "collapse-left-panel"],
  tags: ["close", "panel", "left", "sidebar", "drawer", "dismiss", "layout"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M3 4h18v16H3V4zm7 2h8v12h-8V6zm-5 4h1v1h1v-1h1v1h-1v1h1v1h-1v1h-1v-1H5v-1h1v-1H5v-1z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 3, minY: 4, maxX: 21, maxY: 20 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default closePanelLeft;
