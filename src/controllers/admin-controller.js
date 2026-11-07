import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const adminController = {
  index: {
    async handler(request, h) {
      const user = request.auth.credentials;

      if (user.role !== "admin") {
        return Boom.forbidden("Administrator access required");
      }

      const users = await db.userStore.getAllUsers();
      const places = await db.placeStore.getAllPlaces();

      return h.view("admin", {
        title: "Admin Dashboard",
        users,
        places,
        userCount: users.length,
        placeCount: places.length,
      });
    },
  },

  deleteUser: {
    async handler(request, h) {
      const admin = request.auth.credentials;

      if (admin.role !== "admin") {
        return Boom.forbidden("Administrator access required");
      }

      const userId = request.params.id;

      if (String(admin.id || admin._id) === userId) {
        return Boom.forbidden("You cannot delete your own account");
      }

      const user = await db.userStore.getUserById(userId);

      if (!user) {
        return Boom.notFound("User not found");
      }

      if (user.role === "admin") {
        return Boom.forbidden("Administrator accounts cannot be deleted");
      }

      await db.userStore.deleteUserById(userId);

      return h.redirect("/admin");
    },
  },
};
