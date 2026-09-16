import { defineIcon } from "../../schemas/icon.schema";

export const battery = defineIcon({
  "name": "PXIconBattery",
  "slug": "px-battery",
  "title": "Battery",
  "description": "Horizontal battery cell container with positive anode terminal.",
  "category": "devices",
  "family": "battery",
  "aliases": [
    "power-cell",
    "charge"
  ],
  "tags": [
    "charge",
    "power",
    "energy",
    "cell",
    "level"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M2 6h17v12H2V6zm2 2v8h13V8H4zm17 3h2v2h-2v-2zm-12 1h3v4H7v-4z"
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
export default battery;
