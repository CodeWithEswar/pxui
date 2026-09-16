import { defineIcon } from "../../schemas/icon.schema";

export const cancel = defineIcon({
  name: "PXIconCancel",
  slug: "px-cancel",
  title: "Cancel",
  description: "Stops or aborts an operation before it completes.",
  category: "actions-controls",
  family: "cancel",
  aliases: ["abort", "stop-operation", "cancel-upload", "interrupt-process"],
  tags: ["cancel", "stop", "abort", "operation", "process", "dismiss", "terminate", "interrupt"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M8 2h8v1h2v1h2v1h1v3h1v8h-1v3h-1v1h-2v1h-2v1H8v-1H6v-1H4v-1H3v-3H2V8h1V5h1V4h2V3h2V2z M10 5h5v1h2v1h1v1h1v4h-1v-2h-1v-1h-1v-1h-1v-1h-1v-1h-2V5z M5 11h1v2h1v1h1v1h1v1h1v1h2v1H9v-1H7v-1H6v-1H5v-2H4v-2h1z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 2, minY: 2, maxX: 22, maxY: 22 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default cancel;
