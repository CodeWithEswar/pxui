import { defineIcon } from "../../schemas/icon.schema";

export const shoppingCart = defineIcon({
  "name": "PXIconShoppingCart",
  "slug": "px-shopping-cart",
  "title": "Shopping Cart",
  "description": "Wheeled supermarket trolley for e-commerce checkout and baskets.",
  "category": "commerce",
  "family": "shopping",
  "aliases": [
    "cart",
    "store",
    "buy"
  ],
  "tags": [
    "store",
    "basket",
    "buy",
    "ecommerce",
    "purchase"
  ],
  "geometry": {
    "grid": 24,
    "paths": [
      {
        "d": "M2 3h3l2.6 11.2A3 3 0 0 0 10.5 17h8a3 3 0 0 0 2.9-2.2L23 7H6M8 21a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm10 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
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
export default shoppingCart;
