// import Sequelize from "sequelize";
const Sequelize = require("sequelize").Sequelize;
import dotenv from "dotenv";
import process from "process";

dotenv.config();
import config from "../configs/index.js";

// SEQUELIZE CONNECTION
const db = {};
const env = process.env.NODE_ENV || "development";
const configuration = config[env];
const sequelize = new Sequelize(
  configuration.database,
  configuration.username,
  configuration.password,
  configuration
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
