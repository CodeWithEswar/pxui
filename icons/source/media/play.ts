import { defineIcon } from "../../schemas/icon.schema";

export const play = defineIcon({
  "name": "PXIconPlay",
  "slug": "px-play",
  "title": "Play",
  "description": "Stepped pixel equilateral triangle pointing right for media playback.",
  "category": "media",
  "family": "play",
  "aliases": [
    "start",
    "resume"
  ],
  "tags": [
    "start",
    "video",
    "audio",
    "resume",
    "stream"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M6 4l14 8-14 8V4zm2 3.5v9l8-4.5-8-4.5z"
      }
    ],
    "filled": [
      {
        "d": "M6 4l14 8-14 8V4z"
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
export default play;
