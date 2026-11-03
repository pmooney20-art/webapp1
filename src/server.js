import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Cookie from "@hapi/cookie";
import dotenv from "dotenv";
import Inert from "@hapi/inert";
import Handlebars from "handlebars";
import path from "path";
import Joi from "joi";
import HapiSwagger from "hapi-swagger";
import { fileURLToPath } from "url";
import { apiRoutes } from "./api-routes.js";
import { db } from "./models/db.js";
import { webRoutes } from "./web-routes.js";
import { accountsController } from "./controllers/accounts-controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
Handlebars.registerHelper("eq", (a, b) => a === b);

async function init() {
const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: "0.0.0.0",
});

  await server.register([
    Vision,
    Inert,
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: "Places of Interest API",
          version: "1.0.0",
        },
      },
    },
  ]);

  await server.register(Cookie);
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.cookie_name,
      password: process.env.cookie_password,
      isSecure: false,
    },
    redirectTo: "/",
    validate: accountsController.validate,
  });

  server.auth.default("session");

  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
  });
  server.validator(Joi);
  server.route(webRoutes);
  server.route(apiRoutes);
  await db.init("mongo");
  await server.start();

  console.log("Server running at %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
