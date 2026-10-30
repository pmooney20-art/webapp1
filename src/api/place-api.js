import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { PlaceSpec } from "../models/joi-schemas.js";

export const placeApi = {
  find: {
    auth: false,

    handler: async function (request, h) {
      try {
        const places = await db.placeStore.getAllPlaces();
        return places;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },

    tags: ["api"],
    description: "Get all places",
    notes: "Returns all places of interest",
  },

  findOne: {
    auth: false,

    handler: async function (request, h) {
      try {
        const place = await db.placeStore.getPlaceById(
          request.params.id
        );

        if (!place) {
          return Boom.notFound("No place with this ID");
        }

        return place;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },

    tags: ["api"],
    description: "Find a place",
    notes: "Returns a single place of interest",
  },

  create: {
  auth: false,
  validate: {
  payload: PlaceSpec,
},

  handler: async function (request, h) {
    try {
      const place = request.payload;

      const newPlace = await db.placeStore.addPlace(place);

      if (newPlace) {
        return h.response(newPlace).code(201);
      }

      return Boom.badImplementation("Error creating place");
    } catch (err) {
      return Boom.serverUnavailable("Database Error");
    }
  },

  tags: ["api"],
  description: "Create a place",
  notes: "Returns the newly created place",
},

deleteOne: {
  auth: false,

  handler: async function (request, h) {
    try {
      const place = await db.placeStore.getPlaceById(
        request.params.id
      );

      if (!place) {
        return Boom.notFound("No place with this ID");
      }

      await db.placeStore.deletePlaceById(request.params.id);

      return h.response().code(204);
    } catch (err) {
      return Boom.serverUnavailable("Database Error");
    }
  },

  tags: ["api"],
  description: "Delete a place",
},
};