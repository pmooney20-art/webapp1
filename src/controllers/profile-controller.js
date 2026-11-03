
import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { ProfileSpec } from "../models/joi-schemas.js";

export const profileController = {
  index: {
    async handler(request, h) {
      const userId = request.auth.credentials.id;

      const user = await db.userStore.getUserById(userId);

      if (!user) {
        return Boom.notFound("User not found");
      }

      return h.view("profile", {
        title: "My Profile",
        user,
      });
    },
  },

  update: {
    async handler(request, h) {
      const userId = request.auth.credentials.id;
      const validation = ProfileSpec.validate(request.payload);

      if (validation.error) {
        return Boom.badRequest("Invalid profile details");
      }
      const updatedUser = {
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
      };

      await db.userStore.updateUser(userId, updatedUser);

      return h.redirect("/profile");
    },
  },
};
