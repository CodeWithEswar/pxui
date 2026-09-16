import { defineIcon } from "../../schemas/icon.schema";

export const sliders = defineIcon({
  "name": "PXIconSliders",
  "slug": "px-sliders",
  "title": "Sliders",
  "description": "Multi-track horizontal adjustment bars with stepped sliders.",
  "category": "actions",
  "family": "sliders",
  "aliases": [
    "tune",
    "filters",
    "adjust"
  ],
  "tags": [
    "filter",
    "controls",
    "tune",
    "parameters",
    "adjust"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M3 6h4v-2h4v6H7V8H3V6zm10 2h8V6h-8v2zm-10 8h8v-2h4v6h-4v-2H3v-2zm14 2h4v-2h-4v2z"
      }
    ],
    "bounds": {
      "minX": 0,
      "minY": 0,
      "maxX": 24,
      "maxY": 24
    }
  },
  "status": "stable",
  "introducedVersion": "1.0.0"
});
export default sliders;
