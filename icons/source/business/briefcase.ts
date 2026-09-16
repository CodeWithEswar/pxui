import { defineIcon } from "../../schemas/icon.schema";

export const briefcase = defineIcon({
  "name": "PXIconBriefcase",
  "slug": "px-briefcase",
  "title": "Briefcase",
  "description": "Executive attache case with top leather handle and dual latches.",
  "category": "business",
  "family": "briefcase",
  "aliases": [
    "work",
    "job",
    "case"
  ],
  "tags": [
    "work",
    "job",
    "career",
    "corporate",
    "portfolio"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M9 3h6v3h5v15H4V6h5V3zm2 2v1h2V5h-2zm7 3H6v3h12V8zm-12 5v6h12v-6H6z"
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
export default briefcase;
