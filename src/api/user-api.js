import Boom from "@hapi/boom";
import Jwt from "@hapi/jwt";
import { db } from "../models/db.js";
import { UserCredentialsSpec } from "../models/joi-schemas.js";

export const userApi = {
  authenticate: {
    auth: false,

    validate: {
      payload: UserCredentialsSpec,
    },

    handler: async function (request, h) {
      const { email, password } = request.payload;

      const user = await db.userStore.getUserByEmail(email);

      if (!user || user.password !== password) {
        return Boom.unauthorized("Invalid email or password");
      }

      const token = Jwt.token.generate(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          ttlSec: 3600,
        },
      );

      return h.response({
        success: true,
        token,
      });
    },
  },
};
