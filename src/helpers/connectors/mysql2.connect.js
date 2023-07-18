import chalk from "chalk";
import * as emoji from "node-emoji";

import connection from "../../configs/conection.config.js";

// USING MYSQL2 (for views)
export const withMySql2 = () =>
  connection.connect((err) => {
    if (err) {
      return console.error(
        chalk.bgRedBright(
          "Unable to connect to the database with mysql2: " + err.message
        )
      );
    }

    console.log(
      chalk.bgGreenBright.bold("Connection with database using MySQL2") +
        " has been established successfully." +
        emoji.get("white_check_mark")
    );
  });
