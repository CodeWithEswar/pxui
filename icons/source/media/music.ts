import { defineIcon } from "../../schemas/icon.schema";

export const music = defineIcon({
  "name": "PXIconMusic",
  "slug": "px-music",
  "title": "Music",
  "description": "Interconnected beamed eighth musical notes representing song and audio.",
  "category": "media",
  "family": "music",
  "aliases": [
    "audio",
    "song",
    "note"
  ],
  "tags": [
    "song",
    "melody",
    "tune",
    "sound",
    "track"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M9 3h10v13a4 4 0 1 1-4-3.5V5h-4v11a4 4 0 1 1-4-3.5V3zm2 12a2 2 0 1 0 2 2v-2h-2zm6 0a2 2 0 1 0 2 2v-2h-2z"
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
export default music;
