import { defineIcon } from "../../schemas/icon.schema";

export const bell = defineIcon({
  "name": "PXIconBell",
  "slug": "px-bell",
  "title": "Bell",
  "description": "Notification alert bell with clapper, supports stepped wiggle animation.",
  "category": "communication",
  "family": "bell",
  "aliases": [
    "notification",
    "alert",
    "alarm"
  ],
  "tags": [
    "alert",
    "notification",
    "alarm",
    "reminder",
    "ring"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M11 2h2v2h2a5 5 0 0 1 5 5v5l2 2v2H2v-2l2-2V9a5 5 0 0 1 5-5h2V2zm-5 14h12v-7a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v7zm4 3h4v1a2 2 0 0 1-4 0v-1z"
      }
    ],
    "filled": [
      {
        "d": "M11 2h2v2h2a5 5 0 0 1 5 5v5l2 2v2H2v-2l2-2V9a5 5 0 0 1 5-5h2V2zm-1 17h4v1a2 2 0 0 1-4 0v-1z"
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
    "type": "wiggle",
    "family": "attention",
    "trigger": "hover"
  },
  "status": "stable",
  "introducedVersion": "1.0.0"
});
export default bell;
