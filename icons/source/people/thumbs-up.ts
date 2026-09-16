import { defineIcon } from "../../schemas/icon.schema";

export const thumbsUp = defineIcon({
  "name": "PXIconThumbsUp",
  "slug": "px-thumbs-up",
  "title": "Thumbs Up",
  "description": "Hand gesture with thumb raised upward indicating approval.",
  "category": "people",
  "family": "thumbs",
  "aliases": [
    "like",
    "upvote",
    "approve"
  ],
  "tags": [
    "approve",
    "agree",
    "upvote",
    "recommend"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M2 10h4v11H2V10zm5 11h9a4 4 0 0 0 3.8-2.7l2-6A2 2 0 0 0 20 10h-6V4a2 2 0 0 0-2-2h-1l-4 8v11zm2-2v-8.5l3.5-7h.5v4h7l-2 6H9z"
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
export default thumbsUp;
