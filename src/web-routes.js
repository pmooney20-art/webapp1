import { placesController } from "./controllers/places-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";

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
    config: placesController.editPlace,
  },
  {
    method: "POST",
    path: "/places/{id}/edit",
    config: placesController.updatePlace,
  },
  {
    method: "POST",
    path: "/places/{id}/delete",
    config: placesController.deletePlace,
  },
  {
    method: "GET",
    path: "/signup",
    config: accountsController.showSignup,
  },
  {
    method: "POST",
    path: "/register",
    config: accountsController.signup,
  },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "POST", path: "/authenticate", config: accountsController.login },
  { method: "GET", path: "/logout", config: accountsController.logout },
];
