import { executeSelectUserProfile } from "./executeFunctions/executeSelectUserProfile";
import { executeUpdateUserAbout } from "./executeFunctions/executeUpdateUserAbout";
import { executeUpdateUserDisplayName } from "./executeFunctions/executeUpdateUserDisplayName";
import { executeUpdateUserPhotoProfile } from "./executeFunctions/executeUpdateUserPhotoProfile";

export const usersProfile = {
  executeSelectUserProfile,
  executeUpdateUserAbout,
  executeUpdateUserDisplayName,
  executeUpdateUserPhotoProfile,
};
