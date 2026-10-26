import { v4 as uuid } from "uuid";

const places = [
  {
    id: uuid(),
    name: "Croagh Patrick",
    category: "Mountain",
    location: "County Mayo",
  },
  {
    id: uuid(),
    name: "Kylemore Abbey",
    category: "Historic Site",
    location: "County Galway",
  },
  {
    id: uuid(),
    name: "Cliffs of Moher",
    category: "Scenic View",
    location: "County Clare",
  },
];

export const placeStore = {
  getAllPlaces() {
    return places;
  },

  getPlaceById(id) {
    return places.find((place) => place.id === id);
  },

  addPlace(place) {
    const newPlace = {
      id: uuid(),
      ...place,
    };

    places.push(newPlace);
    return newPlace;
  },

  updatePlace(id, updatedDetails) {
    const place = this.getPlaceById(id);

    if (place) {
      place.name = updatedDetails.name;
      place.category = updatedDetails.category;
      place.location = updatedDetails.location;
    }

    return place;
  },

  deletePlace(id) {
    const index = places.findIndex((place) => place.id === id);

    if (index !== -1) {
      places.splice(index, 1);
      return true;
    }

    return false;
  },
};
