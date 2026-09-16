import { defineIcon } from "../../schemas/icon.schema";

export const zoomIn = defineIcon({
  "name": "PXIconZoomIn",
  "slug": "px-zoom-in",
  "title": "Zoom In",
  "description": "Magnifier lens containing a stepped plus sign for scaling upward.",
  "category": "actions",
  "family": "zoom",
  "aliases": [
    "magnify-plus",
    "enlarge"
  ],
  "tags": [
    "magnify",
    "enlarge",
    "scale-up",
    "plus"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M9 3h6v2h2v2h2v6h-2v2h-2v2H9v-2H7v-2H5V9h2V7h2V5zm6 4H9v6h6V7zm1 8h2v2h-2zm2 2h2v2h-2zm2 2h2v2h-2zm-9-8h2v2h2v2h-2v2h-2v-2H9v-2h2V9z"
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
export default zoomIn;
