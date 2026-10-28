import Mongoose from "mongoose";
import { User } from "./user.js";

function normaliseUser(user) {
  if (!user) {
    return null;
  }

  return {
    ...user,
    id: user._id.toString(),
  };
}

export const userMongoStore = {
  async getAllUsers() {
    const users = await User.find().lean();
    return users.map(normaliseUser);
  },

  async getUserById(id) {
    if (!Mongoose.isValidObjectId(id)) {
      return null;
    }

    const user = await User.findById(id).lean();
    return normaliseUser(user);
  },

  async getUserByEmail(email) {
    const user = await User.findOne({ email }).lean();
    return normaliseUser(user);
  },

  async addUser(user) {
    const newUser = new User(user);
    const savedUser = await newUser.save();
    return this.getUserById(savedUser._id);
  },
};