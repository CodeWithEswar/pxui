import { defineIcon } from "../../schemas/icon.schema";

export const messageSquare = defineIcon({
  "name": "PXIconMessageSquare",
  "slug": "px-message-square",
  "title": "Message Square",
  "description": "Pixel speech bubble for comments, chat, and dialogs.",
  "category": "communication",
  "family": "message",
  "aliases": [
    "chat",
    "comment",
    "bubble"
  ],
  "tags": [
    "chat",
    "comment",
    "talk",
    "bubble",
    "feedback"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M3 4h18v13H7l-4 4V4zm2 2v11.6L6.4 15H19V6H5z"
      }
    ],
    "filled": [
      {
        "d": "M3 4h18v13H7l-4 4V4z"
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
export default messageSquare;
