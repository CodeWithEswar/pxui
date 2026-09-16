import { defineIcon } from "../../schemas/icon.schema";

export const loader = defineIcon({
  "name": "PXIconLoader",
  "slug": "px-loader",
  "title": "Loader",
  "description": "Circular segmented ticker wheel for asynchronous wait and processing states.",
  "category": "actions",
  "family": "loader",
  "aliases": [
    "spinner",
    "loading"
  ],
  "tags": [
    "spinner",
    "loading",
    "wait",
    "progress",
    "busy"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M11 2h2v4h-2V2zm0 16h2v4h-2v-4zm9-7v2h-4v-2h4zM8 11v2H4v-2h4zm7.8-5.4l1.4 1.4-2.8 2.8-1.4-1.4 2.8-2.8zM9.4 14.8l1.4 1.4-2.8 2.8-1.4-1.4 2.8-2.8zm7 7l1.4-1.4-2.8-2.8-1.4 1.4 2.8 2.8zM8 6.4L9.4 7.8 6.6 10.6 5.2 9.2 8 6.4z"
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
export default loader;
