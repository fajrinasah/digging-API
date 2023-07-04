import { usersData } from "../services/queries/users_data/index.js";

export const usersDataController = {
  /*------------------------------------------------------------
  GET
  -------------------------------------------------------------*/
  // GET USER'S ID
  getUserId: (req, res) => {
    const { username } = req.params;

    usersData.executeSelectUserId({ username });

    if (err) {
      return res.status(500).send(err);
    }

    return res.status(200).send(results);
  },

  // GET USER'S DATA
  getUserData: (req, res) => {
    const { username } = req.params;

    usersData.executeSelectUserData({ username });

    if (err) {
      return res.status(500).send(err);
    }

    return res.status(200).send(results);
  },

  /*------------------------------------------------------------
  POST
  -------------------------------------------------------------*/
  postUserData: (req, res) => {
    const { uuid, email, phoneNumber, username, password } = req.body;

    usersData.executeInsertUserData({
      uuid,
      email,
      phone_number: phoneNumber,
      username,
      password,
    });

    if (err) {
      return res.status(500).send(err);
    }

    return res.status(201).send(results);
  },

  /*------------------------------------------------------------
  PATCH
  -------------------------------------------------------------*/
  // PATCH USER'S EMAIL
  patchEmail: (req, res) => {
    const { newEmail, username } = req.body;

    usersData.executeUpdateUserEmail({
      newEmail,
      username,
    });

    if (err) {
      return res.status(500).send(err);
    }

    return res.status(200).send(results);
  },

  // PATCH USER'S PHONE NUMBER
  patchPhoneNumber: (req, res) => {
    const { newPhoneNumber, username } = req.body;

    usersData.executeUpdateUserPhoneNumber({ newPhoneNumber, username });

    if (err) {
      return res.status(500).send(err);
    }

    return res.status(200).send(results);
  },

  // PATCH USER'S USERNAME
  patchUsername: (req, res) => {
    const { newUsername, username } = req.body;

    usersData.executeUpdateUserUsername({ newUsername, username });

    if (err) {
      return res.status(500).send(err);
    }

    return res.status(200).send(results);
  },

  // PATCH USER'S PASSWORD
  patchPassword: (req, res) => {
    const { newPassword, username } = req.body;

    usersData.executeUpdateUserPassword({ newPassword, username });

    if (err) {
      return res.status(500).send(err);
    }

    return res.status(200).send(results);
  },
};
