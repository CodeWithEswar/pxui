import { defineIcon } from "../../schemas/icon.schema";

export const refresh = defineIcon({
  "name": "PXIconRefresh",
  "slug": "px-refresh",
  "title": "Refresh",
  "description": "Dual circular pixel arrows for reloading or synchronizing data.",
  "category": "actions",
  "family": "refresh",
  "aliases": [
    "reload",
    "sync"
  ],
  "tags": [
    "reload",
    "sync",
    "cycle",
    "rotate",
    "repeat"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M12 3a9 9 0 0 0-8 5V4H2v7h7V9H5.5A7 7 0 0 1 19 12h2a9 9 0 0 0-9-9zm7 6h-2a7 7 0 0 1-13.5 3H2a9 9 0 0 0 17 4v4h2v-7h-7v2h3.5A7 7 0 0 1 19 9z"
      }
    ],
    "bounds": {
      "minX": 0,
      "minY": 0,
      "maxX": 24,
      "maxY": 24
    }
  },
  "animation": {
    "type": "spin",
    "family": "loop",
    "trigger": "always"
  },
  "status": "stable",
  "introducedVersion": "1.0.0"
});
export default refresh;
