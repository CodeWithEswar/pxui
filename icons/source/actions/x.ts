import { defineIcon } from "../../schemas/icon.schema";

export const x = defineIcon({
  "name": "PXIconX",
  "slug": "px-x",
  "title": "X (Close)",
  "description": "Stepped pixel diagonal cross for dismissal, cancel, or deletion.",
  "category": "actions",
  "family": "x",
  "aliases": [
    "close",
    "cancel",
    "cross"
  ],
  "tags": [
    "close",
    "cancel",
    "remove",
    "dismiss",
    "delete",
    "cross"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M5 5h2v2h2v2h2v2h2V9h2V7h2V5h2v2h-2v2h-2v2h-2v2h2v2h2v2h2v2h-2v-2h-2v-2h-2v-2h-2v2H9v2H7v2H5v-2h2v-2h2v-2h2v-2H9V9H7V7H5V5z"
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
export default x;
