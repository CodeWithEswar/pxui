import { defineIcon } from "../../schemas/icon.schema";

export const minimize = defineIcon({
  "name": "PXIconMinimize",
  "slug": "px-minimize",
  "title": "Minimize",
  "description": "Four corner markers pointing inward for exiting fullscreen.",
  "category": "actions",
  "family": "minimize",
  "aliases": [
    "collapse",
    "restore"
  ],
  "tags": [
    "collapse",
    "shrink",
    "window",
    "restore"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M9 3v4H5v2h6V3H9zm6 0v6h6V7h-4V3h-2zm-6 12H3v2h4v4h2v-6zm6 0v6h2v-4h4v-2h-6z"
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
export default minimize;
