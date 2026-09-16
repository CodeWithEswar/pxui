import { defineIcon } from "../../schemas/icon.schema";

export const trendingUp = defineIcon({
  "name": "PXIconTrendingUp",
  "slug": "px-trending-up",
  "title": "Trending Up",
  "description": "Stepped diagonal growth graph rising from bottom left to top right.",
  "category": "business",
  "family": "trending",
  "aliases": [
    "growth",
    "chart",
    "analytics"
  ],
  "tags": [
    "growth",
    "increase",
    "metrics",
    "chart",
    "analytics"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M16 4h5v5h-2V7.4l-6.3 6.3-3.3-3.3L3.7 16 2.3 14.6l7.1-7.1 3.3 3.3L17.6 6H16V4zM3 20h18v2H3v-2z"
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
export default trendingUp;
