import { generateExecuteFunction } from "../../../../helpers/generateConnectionFunction.js";
import { queryStatements } from "../queryStatements/index.js";

/*--------------------------------------------------
UPDATE USER'S PHOTO PROFILE
----------------------------------------------------*/
// placeholder values:
// ['newPhotoProfile', 'username']

export const executeUpdateUserPhotoProfile = ({
  newPhotoProfile = "",
  username = "",
}) => {
  generateExecuteFunction({
    queryStatements: queryStatements.updateUserPhotoProfile,
    placeholders: [newPhotoProfile, username],
  });
};
