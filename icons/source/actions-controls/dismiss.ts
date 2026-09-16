import { defineIcon } from "../../schemas/icon.schema";

export const dismiss = defineIcon({
  name: "PXIconDismiss",
  slug: "px-dismiss",
  title: "Dismiss",
  description: "Dismisses temporary interface content without implying destructive deletion.",
  category: "actions-controls",
  family: "close",
  aliases: ["dismiss-toast", "dismiss-notification", "hide-banner", "dismiss-alert"],
  tags: ["dismiss", "close", "hide", "remove", "notification", "toast", "banner", "temporary"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M5 6h14v1h1v1h1v8h-1v1h-1v1H5v-1H4v-1H3V8h1V7h1V6zm0 2v8h14V8H5zm2 2h3v4H7v-4zm5 1h2v2h-2v-2zm4-1h1v1h1v-1h1v1h-1v1h1v1h-1v1h-1v-1h-1v-1h1v-1h-1v-1z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 3, minY: 6, maxX: 21, maxY: 18 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default dismiss;
