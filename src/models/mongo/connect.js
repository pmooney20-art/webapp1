import * as dotenv from "dotenv";
import Mongoose from "mongoose";

export async function connectMongo() {
  dotenv.config();

  Mongoose.set("strictQuery", true);

  const db = Mongoose.connection;

  db.on("error", (err) => {
    console.log(`Database connection error: ${err}`);
  });

  db.on("disconnected", () => {
    console.log("Database disconnected");
  });

  await Mongoose.connect(process.env.db);

  console.log(
    `Database connected to ${db.name} on ${db.host}`
  );
}