import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const placesService = {
  placesUrl: serviceUrl,

  async getAllPlaces() {
    const response = await axios.get(
      `${this.placesUrl}/api/places`
    );
    return response.data;
  },

  async getPlace(id) {
    const response = await axios.get(
      `${this.placesUrl}/api/places/${id}`
    );
    return response.data;
  },

  async createPlace(place) {
    const response = await axios.post(
      `${this.placesUrl}/api/places`,
      place
    );
    return response.data;
  },

  async deletePlace(id) {
    const response = await axios.delete(
      `${this.placesUrl}/api/places/${id}`
    );
    return response;
  },
};