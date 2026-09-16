import { defineIcon } from "../../schemas/icon.schema";

export const camera = defineIcon({
  "name": "PXIconCamera",
  "slug": "px-camera",
  "title": "Camera",
  "description": "Handheld photography camera body with lens ring and flash nub.",
  "category": "media",
  "family": "camera",
  "aliases": [
    "photo",
    "capture"
  ],
  "tags": [
    "photo",
    "picture",
    "lens",
    "capture",
    "snapshot"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M4 5h4l2-2h4l2 2h4v16H4V5zm2 2v12h12V7H6zm6 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
      }
    ],
    "filled": [
      {
        "d": "M4 5h4l2-2h4l2 2h4v16H4V5zm8 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
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
export default camera;
