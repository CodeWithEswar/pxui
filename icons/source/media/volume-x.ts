import { defineIcon } from "../../schemas/icon.schema";

export const volumeX = defineIcon({
  "name": "PXIconVolumeX",
  "slug": "px-volume-x",
  "title": "Volume Mute",
  "description": "Speaker horn with an adjacent cross indicating muted audio output.",
  "category": "media",
  "family": "volume",
  "aliases": [
    "mute",
    "silent"
  ],
  "tags": [
    "mute",
    "silent",
    "quiet",
    "off",
    "sound"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M3 9h4l5-5v16l-5-5H3V9zm2 2v2h3l3 3V8l-3 3H5zm12.5 1l2 2 2-2 1.4 1.4-2 2 2 2-1.4 1.4-2-2-2 2-1.4-1.4 2-2-2-2 1.4-1.4z"
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
export default volumeX;
