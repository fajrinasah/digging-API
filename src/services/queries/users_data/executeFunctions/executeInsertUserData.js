import { generateExecuteFunction } from "../../../../helpers/generateConnectionFunction.js";
import { queryStatements } from "../queryStatements/index.js";

/*--------------------------------------------------
INSERT USER'S DATA
----------------------------------------------------*/
// placeholder values:
// ['uuid', 'email', 'phone_number', 'username', 'password']

export const executeInsertUserData = ({
  uuid = "",
  email = "",
  phone_number = "",
  username = "",
  password = "",
}) => {
  generateExecuteFunction({
    queryStatements: queryStatements.insertUserData,
    placeholders: [uuid, email, phone_number, username, password],
  });
};
