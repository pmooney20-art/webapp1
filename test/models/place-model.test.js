import { assert } from "chai";
import Mongoose from "mongoose";
import { db } from "../../src/models/db.js";
import { croaghPatrick } from "../fixtures.js";

suite("Place Model Tests", () => {
  suiteSetup(async () => {
    await db.init("mongo");
  });

  suiteTeardown(async () => {
    await Mongoose.disconnect();
  });

  test("create a place", async () => {
    const place = await db.placeStore.addPlace(croaghPatrick);

    assert.isNotNull(place);
    assert.equal(place.name, croaghPatrick.name);
    assert.isDefined(place.id);

    await db.placeStore.deletePlaceById(place.id);
  });

  test("get a place by ID", async () => {
    const place = await db.placeStore.addPlace(croaghPatrick);

    const returnedPlace = await db.placeStore.getPlaceById(
      place.id
    );

    assert.isNotNull(returnedPlace);
    assert.equal(returnedPlace.name, croaghPatrick.name);

    await db.placeStore.deletePlaceById(place.id);
  });

  test("delete a place", async () => {
    const place = await db.placeStore.addPlace(croaghPatrick);

    await db.placeStore.deletePlaceById(place.id);

    const deletedPlace = await db.placeStore.getPlaceById(
      place.id
    );

    assert.isNull(deletedPlace);
  });
});