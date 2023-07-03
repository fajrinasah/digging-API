import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

import chalk from "chalk";
import * as emoji from "node-emoji";

import connection from "./src/configs/connection.config.js";
// import { generateExecuteFunction } from "./src/services/queries/articles/executeFunctions/index.js";
// import { queryStatements } from "./src/services/queries/articles/queryStatements/index.js";
import { executeCountArticlesInACategory } from "./src/services/queries/articles/executeFunctions/countArticlesInACategory.execute.js";

const app = express();
dotenv.config();

app.use(cors());
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

executeCountArticlesInACategory({ category_id: 2 });

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
