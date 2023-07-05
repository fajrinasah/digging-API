import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import db from "./src/models/index.js";

import chalk from "chalk";
import * as emoji from "node-emoji";

// import connection from "./src/configs/connection.config.js";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(cors({ exposedHeaders: "Authorization" }));

// connection.connect((err) => {
//   if (err) {
//     return console.error(`error: ${err.message}`);
//   }
//   console.log(
//     chalk.white.bgGreenBright.bold(`Connected to the database`) +
//       emoji.get("white_check_mark")
//   );
// });

async function testConnection() {
  try {
    await db.sequelize.authenticate();
    console.log(
      "Connection has been established successfully." +
        emoji.get("white_check_mark")
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

/*=======================================================*/
//
/*=======================================================*/

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
