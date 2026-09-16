import { defineIcon } from "../../schemas/icon.schema";

export const mail = defineIcon({
  "name": "PXIconMail",
  "slug": "px-mail",
  "title": "Mail",
  "description": "Postal envelope with stepped diagonal envelope flap.",
  "category": "communication",
  "family": "mail",
  "aliases": [
    "email",
    "letter",
    "inbox"
  ],
  "tags": [
    "email",
    "message",
    "inbox",
    "letter",
    "contact"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M3 4h18v16H3V4zm2 2v2.8l7 4.7 7-4.7V6H5zm14 12V9.8l-6.4 4.3h-1.2L5 9.8V18h14z"
      }
    ],
    "filled": [
      {
        "d": "M3 4h18v16H3V4zm2 2v2.5l7 4.7 7-4.7V6H5z"
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
export default mail;
