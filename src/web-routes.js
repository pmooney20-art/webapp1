import { placesController } from "./controllers/places-controller.js";

export const webRoutes = [
  {
    method: "GET",
    path: "/",
    config: placesController.index,
  },
  {
    method: "GET",
    path: "/dashboard",
    config: placesController.dashboard,
  },
  {
    method: "GET",
    path: "/places",
    config: placesController.list,
  },
];