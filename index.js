import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import db from "./src/models/index.js";
// import { associations } from "./src/models/associations.js";

import chalk from "chalk";
import * as emoji from "node-emoji";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(cors({ exposedHeaders: "Authorization" }));

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

// async function syncSequelize() {
//   try {
//     associations();
//     await db.sequelize.sync({ force: true });
//     console.log(
//       "All models were synchronized successfully." +
//         emoji.get("white_check_mark")
//     );
//   } catch (error) {
//     console.error("Unable to synchronize models:", error);
//   }
// }

/*=======================================================*/
//
/*=======================================================*/

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
