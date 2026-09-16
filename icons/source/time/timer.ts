import { defineIcon } from "../../schemas/icon.schema";

export const timer = defineIcon({
  "name": "PXIconTimer",
  "slug": "px-timer",
  "title": "Timer",
  "description": "Precision stopwatch with top activation pusher stem.",
  "category": "time",
  "family": "timer",
  "aliases": [
    "stopwatch",
    "countdown"
  ],
  "tags": [
    "stopwatch",
    "countdown",
    "seconds",
    "duration",
    "interval"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M10 2h4v2h-4V2zm2 4a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm0 2a6 6 0 1 1-6 6 6 6 0 0 1 6-6zm-1 2v5h4v-2h-2v-3h-2z"
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
export default timer;
