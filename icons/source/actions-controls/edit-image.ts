import { defineIcon } from "../../schemas/icon.schema";

export const editImage = defineIcon({
  name: "PXIconEditImage",
  slug: "px-edit-image",
  title: "Edit Image",
  description: "Edits or modifies an image, photograph, artwork, or media asset.",
  category: "actions-controls",
  family: "edit",
  aliases: ["image-edit", "photo-edit", "modify-image", "picture-edit"],
  tags: ["image", "photo", "media", "creative", "editor", "asset"],
  geometry: {
    grid: 24,
    paths: [
      {
        d: "M3 4h15v1h1v1h1v6h-2V6H5v12h6v2H3V4zm3 3h3v3H6V7zm0 9l3-4 2 2 2-3 2 3v2H6v-2z M13 21h3v-1h1v-1h1v-1h1v-1h2v-2h-1v-1h-2v2h-1v1h-1v1h-1v1h-2v2z",
      },
    ],
    bounds: { minX: 3, minY: 4, maxX: 21, maxY: 21 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default editImage;
