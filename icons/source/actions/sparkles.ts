import { defineIcon } from "../../schemas/icon.schema";

export const sparkles = defineIcon({
  "name": "PXIconSparkles",
  "slug": "px-sparkles",
  "title": "Sparkles",
  "description": "Pixel-native sparkle cluster representing artificial intelligence and magic.",
  "category": "actions",
  "family": "sparkles",
  "aliases": [
    "magic",
    "generate",
    "ai"
  ],
  "tags": [
    "ai",
    "magic",
    "generate",
    "stars",
    "intelligence"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M10 2h2v4h4v2h-4v4h-2V8H6V6h4V2zm7 9h2v2h2v2h-2v2h-2v-2h-2v-2h2v-2zM4 14h2v2h2v2H6v2H4v-2H2v-2h2v-2z"
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
    "type": "blink",
    "family": "reveal",
    "trigger": "hover"
  },
  "status": "stable",
  "introducedVersion": "1.0.0"
});
export default sparkles;
