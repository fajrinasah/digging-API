import { executeInsertUserData } from "./executeFunctions/executeInsertUserData";
import { executeSelectUserData } from "./executeFunctions/executeSelectUserData";
import { executeSelectUserId } from "./executeFunctions/executeSelectUserId";
import { executeUpdateUserEmail } from "./executeFunctions/executeUpdateUserEmail";
import { executeUpdateUserPassword } from "./executeFunctions/executeUpdateUserPassword";
import { executeUpdateUserPhoneNumber } from "./executeFunctions/executeUpdateUserPhoneNumber";
import { executeUpdateUserUsername } from "./executeFunctions/executeUpdateUserUsername";

export const usersData = {
  executeInsertUserData,
  executeSelectUserData,
  executeSelectUserId,
  executeUpdateUserEmail,
  executeUpdateUserPassword,
  executeUpdateUserPhoneNumber,
  executeUpdateUserUsername,
};
