import { defineIcon } from "../../schemas/icon.schema";

export const chevronUp = defineIcon({
  "name": "PXIconChevronUp",
  "slug": "px-chevron-up",
  "title": "Chevron Up",
  "description": "Stepped pixel chevron angle bracket pointing up.",
  "category": "arrows",
  "family": "chevron",
  "aliases": [
    "angle-up"
  ],
  "tags": [
    "up",
    "angle",
    "collapse",
    "accordion"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M4 15l8-8 8 8-1.4 1.4L12 9.8l-6.6 6.6L4 15z"
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
export default chevronUp;
