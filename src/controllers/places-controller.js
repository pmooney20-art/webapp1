import { placeStore } from "../models/place-store.js";

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
      const newPlace = {
        name: request.payload.name,
        category: request.payload.category,
        location: request.payload.location,
      };

      placeStore.addPlace(newPlace);

      return h.redirect("/places");
    },
  },
};