import Joi from "joi";
import { categories } from "./categories.js";

export const PlaceSpec = Joi.object({
  name: Joi.string().trim().min(3).max(100).required(),

  category: Joi.string()
    .valid(...categories)
    .required(),

  location: Joi.string().trim().min(3).max(100).required(),
  description: Joi.string().allow("").optional(),
  latitude: Joi.number().min(-90).max(90).optional(),
  longitude: Joi.number().min(-180).max(180).optional(),
});
export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
}).label("UserDetails");
