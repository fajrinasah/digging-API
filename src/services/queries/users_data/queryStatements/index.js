import { insertUserData } from "./insertUserData.js";
import { selectUserData } from "./selectUserData.js";
import { selectUserId } from "./selectUserId.js";
import { updateUserEmail } from "./updateUserEmail.js";
import { updateUserPassword } from "./updateUserPassword.js";
import { updateUserPhoneNumber } from "./updateUserPhoneNumber.js";
import { updateUserUsername } from "./updateUserUsername.js";

export const queryStatements = {
  insertUserData,
  selectUserData,
  selectUserId,
  updateUserEmail,
  updateUserPassword,
  updateUserPhoneNumber,
  updateUserUsername,
};
