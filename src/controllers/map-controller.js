import { db } from "../models/db.js";

export const mapController = {
  index: {
    auth: false,

    handler: async function (request, h) {
      const places = await db.placeStore.getAllPlaces();

      const mapPlaces = places
        .filter(
          (place) =>
            Number.isFinite(Number(place.latitude)) &&
            Number.isFinite(Number(place.longitude)) &&
            place.latitude !== "" &&
            place.longitude !== "" &&
            place.latitude != null &&
            place.longitude != null
        )
        .map((place) => ({
          id: place.id,
          name: place.name,
          latitude: Number(place.latitude),
          longitude: Number(place.longitude),
        }));

      const viewData = {
        title: "Places Map",
        placesJson: JSON.stringify(mapPlaces).replace(/</g, "\\u003c"),
      };

      return h.view("map", viewData);
    },
  },
};