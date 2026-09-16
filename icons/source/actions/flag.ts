import { defineIcon } from "../../schemas/icon.schema";

export const flag = defineIcon({
  "name": "PXIconFlag",
  "slug": "px-flag",
  "title": "Flag",
  "description": "Vertical flagpole supporting a rectangular pennant banner.",
  "category": "actions",
  "family": "flag",
  "aliases": [
    "report",
    "banner"
  ],
  "tags": [
    "report",
    "marker",
    "country",
    "banner",
    "checkpoint"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M4 3h15l-3 6 3 6H6v6H4V3zm2 2v8h10.4l-2-4 2-4H6z"
      }
    ],
    "filled": [
      {
        "d": "M4 3h15l-3 6 3 6H6v6H4V3z"
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
export default flag;
