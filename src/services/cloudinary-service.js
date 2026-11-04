import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const cloudinaryService = {
  async uploadImage(file) {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "places-of-interest", resource_type: "image" },
        (error, uploaded) => {
          if (error) {
            reject(error);
          } else {
            resolve(uploaded);
          }
        },
      );

      stream.end(file);
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  },
};