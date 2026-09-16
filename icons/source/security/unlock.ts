import { defineIcon } from "../../schemas/icon.schema";

export const unlock = defineIcon({
  "name": "PXIconUnlock",
  "slug": "px-unlock",
  "title": "Unlock",
  "description": "Padlock with open lifted shackle indicating unrestricted access.",
  "category": "security",
  "family": "unlock",
  "aliases": [
    "open-lock",
    "accessible"
  ],
  "tags": [
    "open",
    "unlocked",
    "access",
    "public",
    "decrypted"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M7 8V6a5 5 0 0 1 10 0h-2a3 3 0 0 0-6 0v2h10v14H5V8h2zm0 2v10h10V10H7zm5 3a1.5 1.5 0 0 1 1 1.4v1.6h-2v-1.6c0-.6.4-1.2 1-1.4z"
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
export default unlock;
