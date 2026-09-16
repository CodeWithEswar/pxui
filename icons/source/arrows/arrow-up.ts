import { defineIcon } from "../../schemas/icon.schema";

export const arrowUp = defineIcon({
  "name": "PXIconArrowUp",
  "slug": "px-arrow-up",
  "title": "Arrow Up",
  "description": "Stepped pixel arrow pointing upward.",
  "category": "arrows",
  "family": "arrow",
  "aliases": [
    "up",
    "top"
  ],
  "tags": [
    "up",
    "top",
    "direction",
    "north"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M12 3l-7 7 1.4 1.4L11 6.8V21h2V6.8l4.6 4.6L19 10l-7-7z"
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
export default arrowUp;
