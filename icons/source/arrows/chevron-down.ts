import { defineIcon } from "../../schemas/icon.schema";

export const chevronDown = defineIcon({
  "name": "PXIconChevronDown",
  "slug": "px-chevron-down",
  "title": "Chevron Down",
  "description": "Stepped pixel chevron angle bracket pointing down.",
  "category": "arrows",
  "family": "chevron",
  "aliases": [
    "angle-down",
    "dropdown"
  ],
  "tags": [
    "down",
    "angle",
    "expand",
    "dropdown"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M4 9l1.4-1.4L12 14.2l6.6-6.6L20 9l-8 8-8-8z"
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
export default chevronDown;
