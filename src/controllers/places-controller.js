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

      return h.view("places", {
        title: "Explore Places",
        places,
      });
    },
  },
};