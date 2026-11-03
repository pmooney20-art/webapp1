
import { assert } from "chai";
import Mongoose from "mongoose";
import { db } from "../../src/models/db.js";
import { testUser } from "../fixtures.js";

suite("User Model Tests", () => {
  suiteSetup(async () => {
    await db.init("mongo");
  });

  suiteTeardown(async () => {
    await Mongoose.disconnect();
  });

  test("create a user", async () => {
    const user = await db.userStore.addUser(testUser);

    try {
      assert.isNotNull(user);
      assert.equal(user.firstName, testUser.firstName);
      assert.equal(user.email, testUser.email);
    } finally {
      if (user) {
        await db.userStore.deleteUserById(user._id);
      }
    }
  });

  test("get a user by ID", async () => {
    const user = await db.userStore.addUser(testUser);

    try {
      const returnedUser = await db.userStore.getUserById(
        user._id
      );

      assert.isNotNull(returnedUser);
      assert.equal(returnedUser.email, testUser.email);
    } finally {
      await db.userStore.deleteUserById(user._id);
    }
  });

  test("get a user by email", async () => {
    const user = await db.userStore.addUser(testUser);

    try {
      const returnedUser = await db.userStore.getUserByEmail(
        testUser.email
      );

      assert.isNotNull(returnedUser);
      assert.equal(returnedUser.firstName, testUser.firstName);
    } finally {
      await db.userStore.deleteUserById(user._id);
    }
  });

  test("delete a user", async () => {
    const user = await db.userStore.addUser(testUser);

    await db.userStore.deleteUserById(user._id);

    const deletedUser = await db.userStore.getUserById(
      user._id
    );

    assert.isNull(deletedUser);
  });

  test("update a user", async () => {
  const user = await db.userStore.addUser(testUser);

  try {
    const updatedUser = await db.userStore.updateUser(
      user._id,
      {
        firstName: "Updated",
        lastName: "User",
      }
    );

    assert.equal(updatedUser.firstName, "Updated");

    const savedUser = await db.userStore.getUserById(user._id);

    assert.equal(savedUser.firstName, "Updated");
  } finally {
    await db.userStore.deleteUserById(user._id);
  }
});
});
