import { usersProfile } from "../services/queries/users_profile/index.js";

export const usersProfileController = {
  /*------------------------------------------------------------
  GET
  -------------------------------------------------------------*/
  getUserProfile: (req, res) => {
    const { username } = req.params;

    usersProfile.executeSelectUserProfile({ username });

    if (err) {
      return res.status(500).send(err);
    }

    return res.status(200).send(results);
  },

  /*------------------------------------------------------------
  PATCH
  -------------------------------------------------------------*/
  // PATCH USER'S DISPLAY NAME
  patchDisplayName: (req, res) => {
    const { newDisplayName, username } = req.body;

    usersProfile.executeUpdateUserDisplayName({ newDisplayName, username });

    if (err) {
      return res.status(500).send(err);
    }

    return res.status(200).send(results);
  },

  // PATCH USER'S PHOTO PROFILE
  patchPhotoProfile: (req, res) => {
    const { newPhotoProfile, username } = req.body;

    usersProfile.executeUpdateUserPhotoProfile({ newPhotoProfile, username });

    if (err) {
      return res.status(500).send(err);
    }

    return res.status(200).send(results);
  },

  // PATCH USER'S ABOUT
  patchAbout: (req, res) => {
    const { newAbout, username } = req.body;

    usersProfile.executeUpdateUserAbout({ newAbout, username });

    if (err) {
      return res.status(500).send(err);
    }

    return res.status(200).send(results);
  },
};
