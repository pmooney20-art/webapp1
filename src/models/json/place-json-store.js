import { v4 as uuid } from "uuid";
import { db } from "./store-utils.js";

export const placeJsonStore = {
  async getAllPlaces() {
    return db.data.places;
  },

  async getPlaceById(id) {
    return db.data.places.find((place) => place.id === id);
  },

  async addPlace(place) {
    const newPlace = {
      id: uuid(),
      ...place,
    };

    db.data.places.push(newPlace);

    await db.write();

    return newPlace;
  },

  async updatePlace(id, updatedDetails) {
    const place = db.data.places.find((item) => item.id === id);

    if (place) {
      place.name = updatedDetails.name;
      place.category = updatedDetails.category;
      place.location = updatedDetails.location;
      place.description = updatedDetails.description;
      place.latitude = updatedDetails.latitude;
      place.longitude = updatedDetails.longitude;

      await db.write();
    }

    return place;
  },

  async deletePlace(id) {
    const index = db.data.places.findIndex((place) => place.id === id);

    if (index !== -1) {
      db.data.places.splice(index, 1);

      await db.write();

      return true;
    }

    return false;
  },
};
