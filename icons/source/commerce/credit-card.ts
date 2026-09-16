import { defineIcon } from "../../schemas/icon.schema";

export const creditCard = defineIcon({
  "name": "PXIconCreditCard",
  "slug": "px-credit-card",
  "title": "Credit Card",
  "description": "Plastic payment card with magnetic strip and security chip.",
  "category": "commerce",
  "family": "credit",
  "aliases": [
    "card",
    "payment"
  ],
  "tags": [
    "payment",
    "bank",
    "finance",
    "money",
    "visa"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M2 4h20v16H2V4zm2 2v2h16V6H4zm0 4v8h16v-8H4zm2 4h4v2H6v-2z"
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
export default creditCard;
