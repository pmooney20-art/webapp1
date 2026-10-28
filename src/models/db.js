import { placeMemStore } from "./mem/place-mem-store.js";
import { userMemStore } from "./mem/user-mem-store.js";

import { placeJsonStore } from "./json/place-json-store.js";
import { userJsonStore } from "./json/user-json-store.js";

import { connectMongo } from "./mongo/connect.js";
import { placeMongoStore } from "./mongo/place-mongo-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";

export const db = {
  placeStore: null,
  userStore: null,

async  init(storeType) {
    switch (storeType) {
      case "json":
        this.placeStore = placeJsonStore;
        this.userStore = userJsonStore;
        break;

     case "mongo":
         this.placeStore = placeMongoStore;
         this.userStore = userMongoStore;
          await connectMongo();
          break;

      default:
        this.placeStore = placeMemStore;
        this.userStore = userMemStore;

    }
  },
};
