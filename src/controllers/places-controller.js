import { db } from "../models/db.js";
import { PlaceSpec } from "../models/joi-schemas.js";
import { categories } from "../models/categories.js";

export const placesController = {
  index: {
    auth: false,
    handler(request, h) {
      return h.view("home", {
        title: "Places of Interest",
      });
    },
  },

  dashboard: {
    handler(request, h) {
      return h.view("dashboard", {
        title: "Dashboard",
      });
    },
  },

  list: {
    async handler(request, h) {
      const selectedCategory = request.query.category || "";
      const allPlaces = await db.placeStore.getAllPlaces();

      const places = selectedCategory
        ? allPlaces.filter((place) => place.category === selectedCategory)
        : allPlaces;

      return h.view("places", {
        title: "Explore Places",
        places,
        categories,
        selectedCategory,
      });
    },
  },

  addPlace: {
    async handler(request, h) {
      const validation = PlaceSpec.validate(request.payload, {
        abortEarly: false,
      });

      if (validation.error) {
        const places = await db.placeStore.getAllPlaces();

        return h
          .view("places", {
            title: "Explore Places",
            places,
            categories,
            errors: validation.error.details,
            values: request.payload,
          })
          .code(400);
      }

      await db.placeStore.addPlace(validation.value);

      return h.redirect("/places");
    },
  },

  editPlace: {
    async handler(request, h) {
      const place = await db.placeStore.getPlaceById(request.params.id);

      if (!place) {
        return h.response("Place not found").code(404);
      }

      return h.view("edit-place", {
        title: "Edit Place",
        place,
        categories,
      });
    },
  },

  updatePlace: {
    async handler(request, h) {
      const place = await db.placeStore.getPlaceById(request.params.id);

      if (!place) {
        return h.response("Place not found").code(404);
      }

      const validation = PlaceSpec.validate(request.payload, {
        abortEarly: false,
      });

      if (validation.error) {
        return h
          .view("edit-place", {
            title: "Edit Place",
            place: {
              id: place.id,
              ...request.payload,
            },
            categories,
            errors: validation.error.details,
          })
          .code(400);
      }

      await db.placeStore.updatePlace(place.id, validation.value);

      return h.redirect("/places");
    },
  },

  deletePlace: {
    async handler(request, h) {
      const deleted = await db.placeStore.deletePlace(request.params.id);

      if (!deleted) {
        return h.response("Place not found").code(404);
      }

      return h.redirect("/places");
    },
  },

  showPlace: {
    auth: false,

    handler: async function (request, h) {
      const place = await db.placeStore.getPlaceById(request.params.id);

      if (!place) {
        return h.response("Place not found").code(404);
      }

      return h.view("place-details", {
        title: place.name,
        place: place,
      });
    },
  },
};
