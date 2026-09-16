import { defineIcon } from "../../schemas/icon.schema";

export const cloud = defineIcon({
  "name": "PXIconCloud",
  "slug": "px-cloud",
  "title": "Cloud",
  "description": "Pixel cloud contour representing remote storage and meteorology.",
  "category": "weather",
  "family": "cloud",
  "aliases": [
    "cloud-storage",
    "weather"
  ],
  "tags": [
    "weather",
    "cloud-storage",
    "sync",
    "sky",
    "overcast"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M6 18H5a4 4 0 0 1-1.2-7.8A6 6 0 0 1 15 7.4 5 5 0 0 1 20 12a4 4 0 0 1-2 7.5H6zm0-2h12a2 2 0 0 0 0-4h-.7l-.3-.7A4 4 0 0 0 10 8a4 4 0 0 0-4 4.5l-.2.7-.7.2A2 2 0 0 0 6 16z"
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
export default cloud;
