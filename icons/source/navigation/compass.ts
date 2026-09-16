import { defineIcon } from "../../schemas/icon.schema";

export const compass = defineIcon({
  "name": "PXIconCompass",
  "slug": "px-compass",
  "title": "Compass",
  "description": "Navigation compass casing with 4 directional stepped needle points.",
  "category": "navigation",
  "family": "compass",
  "aliases": [
    "navigate",
    "explore"
  ],
  "tags": [
    "direction",
    "orient",
    "north",
    "explore",
    "navigate"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm4 4l-6 2-2 6 6-2 2-6zm-4.6 4.6l2.8-1-1 2.8-1.8-1.8z"
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
export default compass;
