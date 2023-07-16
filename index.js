import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import * as middlewares from "./src/middlewares/index.js";
import db from "./src/database/index.js";
// import { associations } from "./src/models/associations.js";

import chalk from "chalk";
import * as emoji from "node-emoji";

/*-------------------------------------------------------*/
// IMPORT ROUTERS
/*-------------------------------------------------------*/
import authRouters from "./src/controllers/authentication/routers.js";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(cors({ exposedHeaders: "Authorization" }));
app.use(middlewares.requestLogger);

/*-------------------------------------------------------*/
// TEST CONNECTION TO DATABASE
/*-------------------------------------------------------*/
async function testConnection() {
  try {
    await db.sequelize.authenticate();
    console.log(
      chalk.bgGreenBright("Connection with database") +
        " has been established successfully." +
        emoji.get("white_check_mark")
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

/*-------------------------------------------------------*/
// DEFINE ROOT ROUTE
/*-------------------------------------------------------*/
app.get("/", (req, res) => {
  res.status(200).send("<h1> Connected to Digging API successfully. </h1>");
});

/*-------------------------------------------------------*/
// USE ROUTERS
/*-------------------------------------------------------*/
app.use("/api/auth", authRouters);

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
