/*=======================================================*/
// USER DATA
/*=======================================================*/

/*--------------------------------------------------
INSERT
----------------------------------------------------*/

// placeholder values:
// ['uuid', 'email', 'phone_number', 'username', 'password']
const insertNewUserData =
  "INSERT INTO digging.users(`uuid`, `email`, `phone_number`, `username`, `password`) VALUES (?, ?, ?, ?, ?)";

/*--------------------------------------------------
SELECT
----------------------------------------------------*/
// placeholder values:
// ['username']
const selectUserId =
  "SELECT `user_id`, `username` FROM digging.users WHERE `username` = ?";

// placeholder values:
// ['username']
const selectUserData = "SELECT * FROM users_data WHERE username = ?";

/*--------------------------------------------------
UPDATE
----------------------------------------------------*/

// placeholder values:
// ['newEmail', 'username']
const updateUserEmail = "UPDATE digging.users SET email = ? WHERE username = ?";

// placeholder values:
// ['newPhoneNumber', 'username']
const updateUserPhoneNumber =
  "UPDATE digging.users SET phone_number = ? WHERE username = ?";

// placeholder values:
// ['newUsername', 'username']
const updateUserUsername =
  "UPDATE digging.users SET username = ? WHERE username = ?";

// placeholder values:
// ['newPassword', 'username']
const updateUserPassword =
  "UPDATE digging.users SET password = ? WHERE username = ?";

/*=======================================================*/
// USER PROFILE
/*=======================================================*/

/*--------------------------------------------------
SELECT
----------------------------------------------------*/

// placeholder values:
// ['username']
const selectUserProfile = "SELECT * FROM users_profile WHERE username = ?";

/*--------------------------------------------------
UPDATE
----------------------------------------------------*/

// placeholder values:
// ['newDisplayName', 'username']
const updateUserDisplayName =
  "UPDATE digging.users SET display_name = ? WHERE username = ?";

// placeholder values:
// ['newAbout', 'username']
const updateUserAbout = "UPDATE digging.users SET about = ? WHERE username = ?";

// placeholder values:
// ['newPhotoProfile', 'username']
const updateUserPhotoProfile =
  "UPDATE digging.users SET photo_profile = ? WHERE username = ?";
