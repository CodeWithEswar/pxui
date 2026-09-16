import { defineIcon } from "../../schemas/icon.schema";

export const zap = defineIcon({
  "name": "PXIconZap",
  "slug": "px-zap",
  "title": "Zap",
  "description": "Sharp stepped lightning bolt symbolizing electric charge, energy, and speed.",
  "category": "weather",
  "family": "zap",
  "aliases": [
    "lightning",
    "energy",
    "flash"
  ],
  "tags": [
    "lightning",
    "electricity",
    "energy",
    "fast",
    "speed"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M13 2L3 14h8l-2 8 10-12h-8l2-8zm-1.8 10H7.4l5.4-6.5-.8 3.5h3.8l-5.4 6.5.8-3.5z"
      }
    ],
    "filled": [
      {
        "d": "M13 2L3 14h8l-2 8 10-12h-8l2-8z"
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
export default zap;
