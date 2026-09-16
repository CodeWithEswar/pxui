import { defineIcon } from "../../schemas/icon.schema";

export const pause = defineIcon({
  "name": "PXIconPause",
  "slug": "px-pause",
  "title": "Pause",
  "description": "Dual vertical pixel columns for halting media playback.",
  "category": "media",
  "family": "pause",
  "aliases": [
    "halt",
    "freeze"
  ],
  "tags": [
    "halt",
    "stop",
    "hold",
    "freeze",
    "break"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M5 4h4v16H5V4zm10 0h4v16h-4V4z"
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
export default pause;
