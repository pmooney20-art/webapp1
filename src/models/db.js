import { placeMemStore } from "./mem/place-mem-store.js";
import { placeJsonStore } from "./json/place-json-store.js";

export const db = {
  placeStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.placeStore = placeJsonStore;
        break;

      default:
        this.placeStore = placeMemStore;
    }
  },
};
