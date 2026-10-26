import Joi from "joi";

export const PlaceSpec = Joi.object({
  name: Joi.string().trim().min(3).max(100).required(),

  category: Joi.string().trim().min(3).max(50).required(),

  location: Joi.string().trim().min(3).max(100).required(),
});
