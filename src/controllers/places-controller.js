import { placeStore } from "../models/place-store.js";
import { PlaceSpec } from "../models/joi-schemas.js";

export const placesController = {
  index: {
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
    handler(request, h) {
      const places = placeStore.getAllPlaces();

      return h.view("places", {
        title: "Explore Places",
        places,
      });
    },
  },

  addPlace: {
    handler(request, h) {
      const validation = PlaceSpec.validate(request.payload, {
        abortEarly: false,
      });

      if (validation.error) {
        return h
          .view("places", {
            title: "Explore Places",
            places: placeStore.getAllPlaces(),
            errors: validation.error.details,
            values: request.payload,
          })
          .code(400);
      }

      placeStore.addPlace(validation.value);

      return h.redirect("/places");
    },
  },
};
