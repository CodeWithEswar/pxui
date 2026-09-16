import { defineIcon } from "../../schemas/icon.schema";

export const smartphone = defineIcon({
  "name": "PXIconSmartphone",
  "slug": "px-smartphone",
  "title": "Smartphone",
  "description": "Handheld mobile phone device with touch screen and home indicator.",
  "category": "devices",
  "family": "smartphone",
  "aliases": [
    "phone",
    "mobile"
  ],
  "tags": [
    "phone",
    "mobile",
    "ios",
    "android",
    "device"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M6 2h12v20H6V2zm2 2v16h8V4H8zm3 13h2v2h-2v-2z"
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
export default smartphone;
