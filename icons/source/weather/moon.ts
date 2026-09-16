import { defineIcon } from "../../schemas/icon.schema";

export const moon = defineIcon({
  "name": "PXIconMoon",
  "slug": "px-moon",
  "title": "Moon",
  "description": "Stepped pixel crescent moon representing nighttime and dark mode.",
  "category": "weather",
  "family": "moon",
  "aliases": [
    "night",
    "dark",
    "lunar"
  ],
  "tags": [
    "dark",
    "night",
    "lunar",
    "sleep",
    "theme"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M12 3a9 9 0 0 0 9 9c0 5-4 9-9 9a9 9 0 0 1-9-9c0-5 4-9 9-9zm0 2c-3.9 0-7 3.1-7 7a7 7 0 0 0 7 7c2.5 0 4.6-1.3 5.8-3.2A7 7 0 0 1 12 5z"
      }
    ],
    "filled": [
      {
        "d": "M12 3a9 9 0 1 0 8.7 11.4A7 7 0 0 1 12 5V3z"
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
export default moon;
