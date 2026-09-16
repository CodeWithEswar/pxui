import { defineIcon } from "../../schemas/icon.schema";

export const wifi = defineIcon({
  "name": "PXIconWifi",
  "slug": "px-wifi",
  "title": "Wi-Fi",
  "description": "Stepped wireless frequency broadcast waves emanating from origin point.",
  "category": "devices",
  "family": "wifi",
  "aliases": [
    "wireless",
    "network",
    "internet"
  ],
  "tags": [
    "network",
    "internet",
    "wireless",
    "signal",
    "radio"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M12 4c4.6 0 8.8 1.8 11.9 4.8l-1.4 1.4A14.9 14.9 0 0 0 12 6a14.9 14.9 0 0 0-10.5 4.2L.1 8.8A16.9 16.9 0 0 1 12 4zm0 5c3.2 0 6.2 1.3 8.4 3.4l-1.4 1.4A9.9 9.9 0 0 0 12 11c-2.7 0-5.1 1-7 2.8L3.6 12.4A11.9 11.9 0 0 1 12 9zm0 5c1.8 0 3.5.7 4.8 2l-1.4 1.4c-.9-.9-2.1-1.4-3.4-1.4s-2.5.5-3.4 1.4L7.2 16a6.9 6.9 0 0 1 4.8-2zm0 5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"
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
export default wifi;
