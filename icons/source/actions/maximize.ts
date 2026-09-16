import { defineIcon } from "../../schemas/icon.schema";

export const maximize = defineIcon({
  "name": "PXIconMaximize",
  "slug": "px-maximize",
  "title": "Maximize",
  "description": "Four corner markers pointing outward for expanding to fullscreen.",
  "category": "actions",
  "family": "maximize",
  "aliases": [
    "fullscreen",
    "expand"
  ],
  "tags": [
    "fullscreen",
    "expand",
    "grow",
    "window"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M3 3h6v2H5v4H3V3zm12 0h6v6h-2V5h-4V3zM3 15h2v4h4v2H3v-6zm16 4h-4v2h6v-6h-2v4z"
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
export default maximize;
