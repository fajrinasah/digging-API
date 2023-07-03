import { generateExecuteFunction } from "../../../../helpers/generateConnectionFunction.js";
import { queryStatements } from "../queryStatements/index.js";

/*--------------------------------------------------
SELECT USER'S PROFILE
----------------------------------------------------*/
// placeholder values:
// ['username']

export const executeSelectUserProfile = ({ username = "" }) => {
  generateExecuteFunction({
    queryStatements: queryStatements.selectUserProfile,
    placeholders: [username],
  });
};
