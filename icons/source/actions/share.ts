import { defineIcon } from "../../schemas/icon.schema";

export const share = defineIcon({
  "name": "PXIconShare",
  "slug": "px-share",
  "title": "Share",
  "description": "Interconnected nodes representing sharing across destinations.",
  "category": "actions",
  "family": "share",
  "aliases": [
    "export",
    "distribute"
  ],
  "tags": [
    "export",
    "network",
    "nodes",
    "social",
    "send"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M17 3h4v4h-4V3zm-2 3l-6 4v1l6 4v-2l-4-3 4-3V6zm2 11h4v4h-4v-4zm-14-7h4v4H3v-4z"
      }
    ],
    "filled": [
      {
        "d": "M16 2h6v6h-6V2zm-3 5.3l-5 3.3v2.8l5 3.3v-2.3l-3-2 3-2V7.3zM16 16h6v6h-6v-6zM2 9h6v6H2V9z"
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
export default share;
