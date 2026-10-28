import Mongoose from "mongoose";
import { Place } from "./place.js";

function normalisePlace(place) {
  if (!place) {
    return null;
  }

  return {
    ...place,
    id: place._id.toString(),
  };
}

export const placeMongoStore = {
async getAllPlaces() {
  const places = await Place.find().lean();
  return places.map(normalisePlace);
},

async getPlaceById(id) {
  if (Mongoose.isValidObjectId(id)) {
    const place = await Place.findById(id).lean();
    return normalisePlace(place);
  }
  return null;
},
  async addPlace(place) {
    const newPlace = new Place(place);
    const placeObj = await newPlace.save();
    return this.getPlaceById(placeObj._id);
  },

  async deletePlaceById(id) {
    if (Mongoose.isValidObjectId(id)) {
      await Place.deleteOne({ _id: id });
    }
  },

  async deleteAllPlaces() {
    await Place.deleteMany({});
  },

  async updatePlace(updatedPlace) {
    const place = await Place.findById(updatedPlace._id);

    if (place) {
      place.name = updatedPlace.name;
      place.category = updatedPlace.category;
      place.location = updatedPlace.location;
      place.description = updatedPlace.description;
      place.latitude = updatedPlace.latitude;
      place.longitude = updatedPlace.longitude;

      await place.save();
    }
  },
};