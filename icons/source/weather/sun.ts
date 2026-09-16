import { defineIcon } from "../../schemas/icon.schema";

export const sun = defineIcon({
  "name": "PXIconSun",
  "slug": "px-sun",
  "title": "Sun",
  "description": "Central solar disc surrounded by 8 stepped radiating light beams.",
  "category": "weather",
  "family": "sun",
  "aliases": [
    "light",
    "day",
    "bright"
  ],
  "tags": [
    "light",
    "day",
    "warmth",
    "bright",
    "weather"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M11 2h2v3h-2V2zm0 17h2v3h-2v-3zM2 11h3v2H2v-2zm17 0h3v2h-3v-2zm-13.6-5l1.4-1.4 2.1 2.1-1.4 1.4-2.1-2.1zm11.3 11.3l1.4-1.4 2.1 2.1-1.4 1.4-2.1-2.1zM6.8 17.2l-2.1 2.1-1.4-1.4 2.1-2.1 1.4 1.4zm11.3-11.3l2.1-2.1 1.4 1.4-2.1 2.1-1.4-1.4zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"
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
export default sun;
