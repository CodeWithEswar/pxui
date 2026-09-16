import { defineIcon } from "../../schemas/icon.schema";

export const closeWindow = defineIcon({
  name: "PXIconCloseWindow",
  slug: "px-close-window",
  title: "Close Window",
  description: "Closes an application, floating window, dialog, or independent surface.",
  category: "actions-controls",
  family: "close",
  aliases: ["close-application", "close-dialog", "close-modal", "window-exit"],
  tags: ["close", "window", "application", "dialog", "surface", "dismiss", "exit"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M3 3h18v18H3V3zm2 5h14v11H5V8zm1-3h2v1H6V5zm3 0h2v1H9V5zm2 7h2v1h1v1h-1v1h2v2h-1v1h-2v-1h-1v-1h-1v1H9v-1H8v-2h2v-1H8v-1h1v-1h2z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 3, minY: 3, maxX: 21, maxY: 21 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default closeWindow;
