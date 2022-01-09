import { Sequelize, SequelizeScopeError } from "sequelize";
import { v4 as uuid } from "uuid";
import { dbURL, dialect } from "./env";

export const db = new Sequelize(dbURL, {
  dialect,
  dialectOptions: dbURL.includes("localhost")
    ? {}
    : { ssl: { require: true, rejectUnauthorized: false } },
  logging: false,
});

const seed = async (models: any) => {
  console.log("DB cleared");

  await models.User.create({
    id: uuid(),
    firstname: "Claret",
    lastname: "Nnamocha",
    email: "devclareo@gmail.com",
    country: "Nigeria",
    planet: "Earth",
  });

  await models.User.create({
    id: uuid(),
    firstname: "Claret",
    lastname: "Nnamocha",
    email: "claretnnamocha@gmail.com",
    country: "Nigeria",
    password: "Password123!",
    planet: "Earth",
    role: "admin",
  });

  await models.Job.create({
    id: uuid(),
    title: "Nodejs Position",
    description: "Nodejs developer xtradonaire",
    skills: ["node"],
    market: "financial services",
    type: "internship",
    country: "Country",
    planet: "Earth",
  });

  // todo: plant other db seeds 😎

  console.log("Seeded");
};

export const authenticate = (db: Sequelize, clear: boolean = false) => {
  db.authenticate()
    .then(async () => {
      console.log("Connection to Database has been established successfully.");
      const models = require("../models");
      const opts = clear ? { force: true } : { alter: true };
      for (let schema in models) await models[schema].sync(opts);
      if (clear) await seed(models);
      console.log("Migrated");
    })
    .catch((error: SequelizeScopeError) =>
      console.error("Unable to connect to the database: " + error.message)
    );
};
