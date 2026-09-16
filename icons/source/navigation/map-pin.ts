import { defineIcon } from "../../schemas/icon.schema";

export const mapPin = defineIcon({
  "name": "PXIconMapPin",
  "slug": "px-map-pin",
  "title": "Map Pin",
  "description": "Point-of-interest location marker pin with central aperture.",
  "category": "navigation",
  "family": "map",
  "aliases": [
    "location",
    "marker",
    "place"
  ],
  "tags": [
    "location",
    "place",
    "spot",
    "marker",
    "gps"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 2a5 5 0 0 1 5 5c0 3.3-3.6 8.3-5 10.1-1.4-1.8-5-6.8-5-10.1a5 5 0 0 1 5-5zm0 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
      }
    ],
    "filled": [
      {
        "d": "M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"
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
export default mapPin;
