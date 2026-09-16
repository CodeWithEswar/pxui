import { defineIcon } from "../../schemas/icon.schema";

export const power = defineIcon({
  "name": "PXIconPower",
  "slug": "px-power",
  "title": "Power",
  "description": "Circular power switch with top vertical break for system on/off.",
  "category": "actions",
  "family": "power",
  "aliases": [
    "shutdown",
    "switch",
    "toggle"
  ],
  "tags": [
    "shutdown",
    "on",
    "off",
    "standby",
    "reboot"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M11 2h2v9h-2V2zm5.7 3.3l1.4 1.4A8 8 0 1 1 5.9 6.7l1.4-1.4A6 6 0 1 0 16.7 5.3z"
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
export default power;
