import { placeApi } from "./api/place-api.js";
import { userApi } from "./api/user-api.js";

export const apiRoutes = [
  {
    method: "GET",
    path: "/api/places",
    config: {
      ...placeApi.find,
      tags: ["api"],
      description: "Get all places",
    },
  },
  {
    method: "GET",
    path: "/api/places/{id}",
    config: {
      ...placeApi.findOne,
      tags: ["api"],
      description: "Get a place by ID",
    },
  },
  {
    method: "POST",
    path: "/api/places",
    config: {
      ...placeApi.create,
      tags: ["api"],
      description: "Create a new place",
    },
  },
  {
    method: "DELETE",
    path: "/api/places/{id}",
    config: {
      ...placeApi.deleteOne,
      tags: ["api"],
      description: "Delete a place",
    },
  },

  {
    method: "POST",
    path: "/api/users/authenticate",
    config: {
      ...userApi.authenticate,
      tags: ["api"],
      description: "Authenticate user and return JWT",
    },
  },
];
