import { defineIcon } from "../../schemas/icon.schema";

export const bot = defineIcon({
  "name": "PXIconBot",
  "slug": "px-bot",
  "title": "Bot",
  "description": "Stepped robot head with top sensor antenna and dual digital eyes.",
  "category": "actions",
  "family": "bot",
  "aliases": [
    "robot",
    "agent",
    "assistant"
  ],
  "tags": [
    "robot",
    "assistant",
    "ai",
    "machine",
    "agent"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M11 2h2v3h-2V2zM4 7h16v13H4V7zm2 2v9h12V9H6zm2 3h3v3H8v-3zm5 0h3v3h-3v-3zM2 11h2v4H2v-4zm18 0h2v4h-2v-4z"
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
export default bot;
