import { generateExecuteFunction } from "../../../../helpers/generateConnectionFunction.js";
import { queryStatements } from "../queryStatements/index.js";

/*--------------------------------------------------
UPDATE USER'S EMAIL
----------------------------------------------------*/
// placeholder values:
// ['newEmail', 'username']

export const executeUpdateUserEmail = ({ newEmail = "", username = "" }) => {
  generateExecuteFunction({
    queryStatements: queryStatements.updateUserEmail,
    placeholders: [newEmail, username],
  });
};
