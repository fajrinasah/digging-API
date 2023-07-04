import { generateExecuteFunction } from "../../../../helpers/generateConnectionFunction.js";
import { queryStatements } from "../queryStatements/index.js";

/*--------------------------------------------------
SELECT USER'S DATA
----------------------------------------------------*/
// placeholder values:
// ['username']

export const executeSelectUserData = ({ username = "" }) => {
  generateExecuteFunction({
    queryStatements: queryStatements.selectUserData,
    placeholders: [username],
  });
};
