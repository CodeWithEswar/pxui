import { defineIcon } from "../../schemas/icon.schema";

export const search = defineIcon({
  "name": "PXIconSearch",
  "slug": "px-search",
  "title": "Search",
  "description": "Pixel-native magnifying glass for discovery and query inputs.",
  "category": "navigation",
  "family": "search",
  "aliases": [
    "magnifier",
    "find",
    "lookup"
  ],
  "tags": [
    "find",
    "magnifier",
    "lookup",
    "explore",
    "query"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M9 3h6v2h2v2h2v6h-2v2h-2v2H9v-2H7v-2H5V9h2V7h2V5zm6 4H9v6h6V7zm1 8h2v2h-2zm2 2h2v2h-2zm2 2h2v2h-2z"
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
export default search;
