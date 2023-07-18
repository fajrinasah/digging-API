import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

import connection from "./src/configs/conection.config.js";
import client from "./src/configs/redis.config.js";
import * as middlewares from "./src/middlewares/index.js";
import * as helpers from "./src/helpers/index.js";
import db from "./src/database/index.js";
// import { associations } from "./src/models/associations.js";

import chalk from "chalk";
import * as emoji from "node-emoji";

/*-------------------------------------------------------*/
// IMPORT ROUTERS
/*-------------------------------------------------------*/
import articleRouters from "./src/controllers/article/routers.js";
import articlesRouters from "./src/controllers/articles/routers.js";
import authRouters from "./src/controllers/authentication/routers.js";
import categoriesRouters from "./src/controllers/categories/routers.js";
import conservationRouters from "./src/controllers/conservation/routers.js";
import profileRouters from "./src/controllers/profile/routers.js";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(cors({ exposedHeaders: "Authorization" }));
app.use(middlewares.requestLogger);

/*-------------------------------------------------------*/
// TEST CONNECTION TO DATABASE
/*-------------------------------------------------------*/
helpers.connect.withMySql2();
helpers.connect.withRedis();
helpers.connect.withSequelize();
// // USING SEQUELIZE
// async function testConnection() {
//   try {
//     await db.sequelize.authenticate();
//     console.log(
//       chalk.bgGreenBright.bold("Connection with database using sequelize") +
//         " has been established successfully." +
//         emoji.get("white_check_mark")
//     );
//   } catch (error) {
//     console.error("Unable to connect to the database with sequelize:", error);
//   }
// }

// testConnection();

// // USING MYSQL2 (for views)
// connection.connect((err) => {
//   if (err) {
//     return console.error(
//       chalk.bgRedBright(
//         "Unable to connect to the database with mysql2: " + err.message
//       )
//     );
//   }

//   console.log(
//     chalk.white.bgGreenBright.bold(`Connected to the database using mysql2 `) +
//       emoji.get("white_check_mark")
//   );
// });

/*-------------------------------------------------------*/
// DEFINE ROOT ROUTE
/*-------------------------------------------------------*/
app.get("/", (req, res) => {
  res.status(200).send("<h1> Connected to Digging API successfully. </h1>");
});

/*-------------------------------------------------------*/
// USE ROUTERS
/*-------------------------------------------------------*/
app.use("/api/article", articleRouters);
app.use("/api/articles", articlesRouters);
app.use("/api/auth", authRouters);
app.use("/api/categories", categoriesRouters);
app.use("/api/conservations", conservationRouters);
app.use("/api/profile", profileRouters);

/*-------------------------------------------------------*/
// USE ERROR HANDLER
/*-------------------------------------------------------*/
app.use(middlewares.errorHandler);

/*-------------------------------------------------------*/
// LISTEN TO PORT
/*-------------------------------------------------------*/
const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(chalk.bgGreenBright("Server running") + ` on port ${PORT}`)
);
