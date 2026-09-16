import { defineIcon } from "../../schemas/icon.schema";

export const closeTab = defineIcon({
  name: "PXIconCloseTab",
  slug: "px-close-tab",
  title: "Close Tab",
  description: "Closes an active document, browser, editor, or workspace tab.",
  category: "actions-controls",
  family: "close",
  aliases: ["close-editor-tab", "close-document", "dismiss-tab"],
  tags: ["close", "tab", "document", "editor", "browser", "dismiss", "workspace"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M2 19h20v2H2v-2z M7 5h10v1h1v1h1v1h1v10H4V8h1V7h1V6h1V5zm-1 3v8h12V8h-1V7h-1V6H8v1H7v1H6zm1 3h5v2H7v-2zm7-1h1v1h1v-1h1v1h-1v1h1v1h-1v1h-1v-1h-1v1h-1v-1h1v-1h-1v-1h1v-1z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 2, minY: 5, maxX: 22, maxY: 21 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default closeTab;
