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
        d: "M3 4h15v1h1v1h1v5h-2V6H5v12h5v2H3V4zm3 3h3v3H6V7zm0 9h3v-2h2v2h1v-1h1v1H6v0z M19 11h2v1h-2z M18 12h1v1h-1z M20 12h1v1h-1z M16 13h4v2h-4z M14 15h4v2h-4z M13 17h1v1h-1z M15 17h1v1h-1z M12 18h2v1h-2z M11 19h2v2h-2z",
      },
    ],
    bounds: { minX: 3, minY: 4, maxX: 21, maxY: 21 },
  },
  status: "experimental",
  introducedVersion: "1.0.0",
});

export default editImage;
