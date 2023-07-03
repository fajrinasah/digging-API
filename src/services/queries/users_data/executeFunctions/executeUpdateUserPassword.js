import { generateExecuteFunction } from "../../../../helpers/generateConnectionFunction.js";
import { queryStatements } from "../queryStatements/index.js";

/*--------------------------------------------------
UPDATE USER'S PASSWORD
----------------------------------------------------*/
// placeholder values:
// ['newPassword', 'username']

export const executeUpdateUserPassword = ({
  newPassword = "",
  username = "",
}) => {
  generateExecuteFunction({
    queryStatements: queryStatements.updateUserPassword,
    placeholders: [newPassword, username],
  });
};
