import { assert } from "chai";
import Mongoose from "mongoose";
import { categories } from "../../src/models/categories.js";
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

  test("create a place with a category", async () => {
  const place = await db.placeStore.addPlace(croaghPatrick);

  try {
    assert.equal(place.category, "Mountain");
  } finally {
    await db.placeStore.deletePlaceById(place.id);
  }
});

test("filter places by category", async () => {
  const place = await db.placeStore.addPlace(croaghPatrick);

  try {
    const places = await db.placeStore.getAllPlaces();

    const mountains = places.filter(
      (item) => item.category === "Mountain"
    );

    assert.isTrue(
      mountains.some((item) => item.id === place.id)
    );
  } finally {
    await db.placeStore.deletePlaceById(place.id);
  }
});

test("categories include Mountain", () => {
  assert.include(categories, "Mountain");
});
});