import { defineIcon } from "../../schemas/icon.schema";

export const dollarSign = defineIcon({
  "name": "PXIconDollarSign",
  "slug": "px-dollar-sign",
  "title": "Dollar Sign",
  "description": "Currency dollar glyph bisected by a centered vertical pixel spine.",
  "category": "business",
  "family": "dollar",
  "aliases": [
    "money",
    "currency",
    "usd"
  ],
  "tags": [
    "money",
    "currency",
    "usd",
    "price",
    "finance"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M11 2h2v2a5 5 0 0 1 3.8 2.2l-1.6 1.2A3 3 0 0 0 13 6.1V10l1.6.4a5 5 0 0 1 3.4 4.8 5 5 0 0 1-5 4.8V22h-2v-2a5 5 0 0 1-3.8-2.2l1.6-1.2A3 3 0 0 0 11 17.9V14l-1.6-.4A5 5 0 0 1 6 8.8 5 5 0 0 1 11 4V2zm0 4.1a3 3 0 0 0-3 2.7 3 3 0 0 0 3 2.8v-5.5zm2 7.8v5.5a3 3 0 0 0 3-2.7 3 3 0 0 0-3-2.8z"
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
export default dollarSign;
