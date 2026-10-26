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
  {
    method: "POST",
    path: "/places/add",
    config: placesController.addPlace,
  },
  {
    method: "GET",
    path: "/places/{id}/edit",
    options: placesController.editPlace,
  },
  {
    method: "POST",
    path: "/places/{id}/edit",
    options: placesController.updatePlace,
  },
  {
    method: "POST",
    path: "/places/{id}/delete",
    options: placesController.deletePlace,
  },
];
