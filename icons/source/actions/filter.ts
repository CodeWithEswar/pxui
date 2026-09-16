import { defineIcon } from "../../schemas/icon.schema";

export const filter = defineIcon({
  "name": "PXIconFilter",
  "slug": "px-filter",
  "title": "Filter",
  "description": "Funnel shaped device for sorting, narrowing, and query refinement.",
  "category": "actions",
  "family": "filter",
  "aliases": [
    "funnel",
    "refine"
  ],
  "tags": [
    "sort",
    "funnel",
    "refine",
    "criteria",
    "narrow"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M3 4h18v2l-7 7v7l-4-2v-5L3 6V4zm3.2 2l5.8 5.8V16l2 1v-5.2l5.8-5.8H6.2z"
      }
    ],
    "filled": [
      {
        "d": "M3 4h18v2l-7 7v7l-4-2v-5L3 6V4z"
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
export default filter;
