import { assert } from "chai";
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
});