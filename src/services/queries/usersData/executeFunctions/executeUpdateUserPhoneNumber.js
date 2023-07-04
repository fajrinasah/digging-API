import { generateExecuteFunction } from "../../../../helpers/generateConnectionFunction.js";
import { queryStatements } from "../queryStatements/index.js";

/*--------------------------------------------------
UPDATE USER'S PHONE NUMBER
----------------------------------------------------*/
// placeholder values:
// ['newPhoneNumber', 'username']

export const executeUpdateUserPhoneNumber = ({
  newPhoneNumber = "",
  username = "",
}) => {
  generateExecuteFunction({
    queryStatements: queryStatements.updateUserPhoneNumber,
    placeholders: [newPhoneNumber, username],
  });
};
