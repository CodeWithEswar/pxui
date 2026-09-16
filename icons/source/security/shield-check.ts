import { defineIcon } from "../../schemas/icon.schema";

export const shieldCheck = defineIcon({
  "name": "PXIconShieldCheck",
  "slug": "px-shield-check",
  "title": "Shield Check",
  "description": "Defensive shield bearing an interior verification checkmark.",
  "category": "security",
  "family": "shield",
  "aliases": [
    "verified",
    "trusted"
  ],
  "tags": [
    "verified",
    "secure",
    "trusted",
    "safety",
    "approved"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M12 2l8 3v6c0 5.5-3.4 10.3-8 11.9C7.4 21.3 4 16.5 4 11V5l8-3zm0 2.2L6 6.8V11c0 4.4 2.6 8.3 6 9.8 3.4-1.5 6-5.4 6-9.8V6.8L12 4.2zm-1.5 9.3l-2.5-2.5 1.4-1.4 1.1 1.1 3.5-3.5 1.4 1.4-4.9 4.9z"
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
export default shieldCheck;
