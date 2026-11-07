import { placesController } from "./controllers/places-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { mapController } from "./controllers/map-controller.js";
import { profileController } from "./controllers/profile-controller.js";
import { imageController } from "./controllers/image-controller.js";
import { adminController } from "./controllers/admin-controller.js";

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
  {
    method: "GET",
    path: "/places/{id}",
    config: placesController.showPlace,
  },
  {
    method: "GET",
    path: "/map",
    config: mapController.index,
  },

  {
    method: "GET",
    path: "/profile",
    config: profileController.index,
  },
  {
    method: "POST",
    path: "/profile/update",
    config: profileController.update,
  },

  {
    method: "POST",
    path: "/places/{id}/image",
    options: imageController.upload,
  },

  {
    method: "GET",
    path: "/admin",
    config: adminController.index,
  },

  {
    method: "POST",
    path: "/admin/users/{id}/delete",
    config: adminController.deleteUser,
  },
];
