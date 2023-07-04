import { generateExecuteFunction } from "../../../../helpers/generateConnectionFunction.js";
import { queryStatements } from "../queryStatements/index.js";

/*--------------------------------------------------
UPDATE USER'S USERNAME
----------------------------------------------------*/
// placeholder values:
// ['newUsername', 'username']

export const executeUpdateUserUsername = ({
  newUsername = "",
  username = "",
}) => {
  generateExecuteFunction({
    queryStatements: queryStatements.updateUserUsername,
    placeholders: [newUsername, username],
  });
};
