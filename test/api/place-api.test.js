import { assert } from "chai";
import axios from "axios";
import { placesService } from "./places-service.js";
import { croaghPatrick } from "../fixtures.js";

suite("Place API Tests", () => {
  test("get all places", async () => {
    const places = await placesService.getAllPlaces();

    assert.isArray(places);
  });

  test("create a place", async () => {
    const place = await placesService.createPlace(croaghPatrick);

    assert.isNotNull(place);
    assert.equal(place.name, croaghPatrick.name);
    assert.isDefined(place.id);

    await placesService.deletePlace(place.id);
  });

  test("get a place by ID", async () => {
    const place = await placesService.createPlace(croaghPatrick);

    const returnedPlace = await placesService.getPlace(place.id);

    assert.equal(returnedPlace.name, croaghPatrick.name);

    await placesService.deletePlace(place.id);
  });

  test("delete a place", async () => {
    const place = await placesService.createPlace(croaghPatrick);

    const response = await placesService.deletePlace(place.id);

    assert.equal(response.status, 204);
  });

  test("get a place that does not exist", async () => {
  try {
    await placesService.getPlace("507f1f77bcf86cd799439011");
    assert.fail("Request should have failed");
  } catch (err) {
    assert.equal(err.response.status, 404);
  }
});

test("create a place with invalid data", async () => {
  try {
    await placesService.createPlace({
      name: "Invalid Place",
    });
    assert.fail("Request should have failed");
  } catch (err) {
    assert.equal(err.response.status, 400);
  }
});

test("delete a place that does not exist", async () => {
  try {
    await placesService.deletePlace("507f1f77bcf86cd799439011");
    assert.fail("Request should have failed");
  } catch (err) {
    assert.equal(err.response.status, 404);
  }
});
});