import { generateExecuteFunction } from "../../../../helpers/generateConnectionFunction.js";
import { queryStatements } from "../queryStatements/index.js";

/*--------------------------------------------------
SELECT USER'S ID
----------------------------------------------------*/
// placeholder values:
// ['username']

export const executeSelectUserId = ({ username = "" }) => {
  generateExecuteFunction({
    queryStatements: queryStatements.selectUserId,
    placeholders: [username],
  });
};
