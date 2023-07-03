import { generateExecuteFunction } from "../../../../helpers/generateConnectionFunction.js";
import { queryStatements } from "../queryStatements/index.js";

/*--------------------------------------------------
UPDATE USER'S DISPLAY NAME
----------------------------------------------------*/
// placeholder values:
// ['newDisplayName', 'username']

export const executeUpdateUserDisplayName = ({ newDisplayName, username }) => {
  generateExecuteFunction({
    queryStatements: queryStatements.updateUserDisplayName,
    placeholders: [newDisplayName, username],
  });
};
