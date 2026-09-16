import { defineIcon } from "../../schemas/icon.schema";

export const radioChecked = defineIcon({
  name: "PXIconRadioChecked",
  slug: "px-radio-checked",
  title: "Radio Checked",
  description: "Represents a radio control in its selected state.",
  category: "actions-controls",
  family: "radio",
  aliases: ["radio-selected", "radio-on", "option-selected"],
  tags: ["radio", "selection", "single-choice", "form", "control"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M8 2h8v1h2v1h2v1h1v3h1v8h-1v3h-1v1h-2v1h-2v1H8v-1H6v-1H4v-1H3v-3H2V8h1V5h1V4h2V3h2V2zm0 2H6v1H5v1H4v2H3v8h1v2h1v1h1v1h2v1h8v-1h2v-1h1v-1h1v-2h1V8h-1V6h-1V5h-1V4h-2V3h-2V2H8v2zm2 5h4v1h1v4h-1v1h-4v-1H9v-4h1V9z",
        fillRule: "evenodd",
      },
    ],
    bounds: { minX: 2, minY: 2, maxX: 22, maxY: 22 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default radioChecked;
