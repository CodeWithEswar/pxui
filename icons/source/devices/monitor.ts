import { defineIcon } from "../../schemas/icon.schema";

export const monitor = defineIcon({
  "name": "PXIconMonitor",
  "slug": "px-monitor",
  "title": "Monitor",
  "description": "Desktop computer monitor screen resting on a center stand.",
  "category": "devices",
  "family": "monitor",
  "aliases": [
    "display",
    "screen"
  ],
  "tags": [
    "screen",
    "display",
    "desktop",
    "tv",
    "workstation"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M3 3h18v13H3V3zm2 2v9h14V5H5zm6 11h2v3h4v2H7v-2h4v-3z"
      }
    ],
    "filled": [
      {
        "d": "M3 3h18v13H3V3zm8 13h2v3h4v2H7v-2h4v-3z"
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
export default monitor;
