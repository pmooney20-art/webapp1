import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placeSchema = new Schema({
  name: String,
  category: String,
  location: String,
  description: String,
  latitude: Number,
  longitude: Number,
});

export const Place = Mongoose.model("Place", placeSchema);