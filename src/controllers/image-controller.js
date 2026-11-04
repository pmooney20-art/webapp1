
import Boom from "@hapi/boom";
import { fileTypeFromBuffer } from "file-type";
import { db } from "../models/db.js";
import { cloudinaryService } from "../services/cloudinary-service.js";

export const imageController = {
  upload: {
    payload: {
      output: "data",
      parse: true,
      multipart: true,
      maxBytes: 5 * 1024 * 1024,
    },

    async handler(request, h) {
      const place = await db.placeStore.getPlaceById(request.params.id);

      if (!place) {
        return Boom.notFound("Place not found");
      }

      const image = request.payload?.image;

      if (!image || !Buffer.isBuffer(image)) {
        return Boom.badRequest("Please select an image");
      }

      const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

      const detectedType = await fileTypeFromBuffer(image);

      if (!detectedType || !allowedTypes.includes(detectedType.mime)) {
        return Boom.badRequest("Unsupported image type");
      }

      try {
        const uploaded = await cloudinaryService.uploadImage(image);

        await db.placeStore.updatePlaceImage(place.id, {
          imageUrl: uploaded.url,
          imagePublicId: uploaded.publicId,
        });

        return h.redirect(`/places/${place.id}`);
      } catch (error) {
        console.error("Image upload failed:", error);
        return Boom.internal("Failed to upload image");
      }
    },
  },
};
