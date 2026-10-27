import { placeMemStore } from "./mem/place-mem-store.js";
import { userMemStore } from "./mem/user-mem-store.js";

import { placeJsonStore } from "./json/place-json-store.js";
import { userJsonStore } from "./json/user-json-store.js";

export const db = {
  placeStore: null,
  userStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.placeStore = placeJsonStore;
        this.userStore = userJsonStore;
        break;

      default:
        this.placeStore = placeMemStore;
        this.userStore = userMemStore;
    }
  },
};
