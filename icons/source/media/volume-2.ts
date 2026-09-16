import { defineIcon } from "../../schemas/icon.schema";

export const volume2 = defineIcon({
  "name": "PXIconVolume2",
  "slug": "px-volume-2",
  "title": "Volume High",
  "description": "Speaker horn with stepped sonic waves for loud sound playback.",
  "category": "media",
  "family": "volume",
  "aliases": [
    "sound",
    "audio",
    "speaker"
  ],
  "tags": [
    "audio",
    "sound",
    "speaker",
    "loud",
    "music"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M3 9h4l5-5v16l-5-5H3V9zm2 2v2h3l3 3V8l-3 3H5zm11-4a7 7 0 0 1 0 10l-1.4-1.4a5 5 0 0 0 0-7.2L16 7zm3-3a11 11 0 0 1 0 16l-1.4-1.4a9 9 0 0 0 0-13.2L19 4z"
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
export default volume2;
