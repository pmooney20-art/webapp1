const places = [
  {
    name: "Croagh Patrick",
    category: "Mountain",
    location: "County Mayo",
  },
  {
    name: "Kylemore Abbey",
    category: "Historic Site",
    location: "County Galway",
  },
  {
    name: "Cliffs of Moher",
    category: "Scenic View",
    location: "County Clare",
  },
];

export const placeStore = {
  getAllPlaces() {
    return places;
  },

  addPlace(place) {
    places.push(place);
  },
};