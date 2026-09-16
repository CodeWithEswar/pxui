import { defineIcon } from "../../schemas/icon.schema";

export const arrowUpRight = defineIcon({
  "name": "PXIconArrowUpRight",
  "slug": "px-arrow-up-right",
  "title": "Arrow Up Right",
  "description": "Stepped pixel diagonal arrow pointing upward and to the right.",
  "category": "arrows",
  "family": "arrow",
  "aliases": [
    "diagonal",
    "external",
    "northeast"
  ],
  "tags": [
    "diagonal",
    "up-right",
    "northeast",
    "direction",
    "arrow"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M6.4 17.6L16.6 7.4V14h2V4H8.6v2h6.6L5 16.2l1.4 1.4z"
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
export default arrowUpRight;
