import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import chalk from "chalk";
import * as emoji from "node-emoji";

import connection from "./src/configs/index.js";

const app = express();
dotenv.config();

app.use(bodyParser.json());

connection.connect((err) => {
  if (err) {
    return console.error(`error: ${err.message}`);
  }
  console.log(
    chalk.white.bgGreenBright.bold(`Connected to the database`) +
      emoji.get("white_check_mark")
  );
});

/*=======================================================*/
//
/*=======================================================*/

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
