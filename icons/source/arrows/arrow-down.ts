import { defineIcon } from "../../schemas/icon.schema";

export const arrowDown = defineIcon({
  "name": "PXIconArrowDown",
  "slug": "px-arrow-down",
  "title": "Arrow Down",
  "description": "Stepped pixel arrow pointing downward.",
  "category": "arrows",
  "family": "arrow",
  "aliases": [
    "down",
    "bottom"
  ],
  "tags": [
    "down",
    "bottom",
    "direction",
    "south"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M11 3v14.2l-4.6-4.6L5 14l7 7 7-7-1.4-1.4L13 17.2V3h-2z"
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
export default arrowDown;
