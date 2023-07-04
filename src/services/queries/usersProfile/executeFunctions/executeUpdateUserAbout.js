import { generateExecuteFunction } from "../../../../helpers/generateConnectionFunction.js";
import { queryStatements } from "../queryStatements/index.js";

/*--------------------------------------------------
UPDATE USER'S ABOUT
----------------------------------------------------*/
// placeholder values:
// ['newAbout', 'username']

export const executeUpdateUserAbout = ({ newAbout = "", username = "" }) => {
  generateExecuteFunction({
    queryStatements: queryStatements,
    placeholders: [newAbout, username],
  });
};
