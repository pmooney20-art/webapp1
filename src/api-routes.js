import { placeApi } from "./api/place-api.js";

export const apiRoutes = [
  {
    method: "GET",
    path: "/api/places",
    config: placeApi.find,
  },
  {
    method: "GET",
    path: "/api/places/{id}",
    config: placeApi.findOne,
  },
  {
  method: "POST",
  path: "/api/places",
  config: placeApi.create,
},
{
  method: "DELETE",
  path: "/api/places/{id}",
  config: placeApi.deleteOne,
},
]