import { selectUserProfile } from "./selectUserProfile.js";
import { updateUserAbout } from "./updateUserAbout.js";
import { updateUserDisplayName } from "./updateUserDisplayName.js";
import { updateUserPhotoProfile } from "./updateUserPhotoProfile.js";

export const queryStatements = {
  selectUserProfile,
  updateUserAbout,
  updateUserDisplayName,
  updateUserPhotoProfile,
};
