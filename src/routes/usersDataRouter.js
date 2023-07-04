import express from "express";
import { usersDataController } from "../controllers/index.js";

export const routers = express.Router();

/*------------------------------------------------------------
GET
-------------------------------------------------------------*/
// GET USER'S ID
routers.get("/usersData/userId/:username", usersDataController.getUserId);

// GET USER'S DATA
routers.get("/usersData/:username", usersDataController.getUserData);

/*------------------------------------------------------------
POST
-------------------------------------------------------------*/
// POST USER'S DATA
/*
request body structure:
NOTE: ALL VALUES CANNOT BE NULL
{
  uuid: "",
  email: "",
  phoneNumber: "",
  username: "",
  password: "",
};
*/
routers.post("/usersData", usersDataController.postUserData);

/*------------------------------------------------------------
PATCH
-------------------------------------------------------------*/
// PATCH USER'S EMAIL
/*
request body structure:
NOTE: ALL VALUES CANNOT BE NULL
{
  newEmail: "",
  username: "",
};
*/
routers.patch("/usersData/edit/email", usersDataController.patchEmail);

// PATCH USER'S PHONE NUMBER
/*
request body structure:
NOTE: ALL VALUES CANNOT BE NULL
{
  newPhoneNumber: "",
  username: "",
};
*/
routers.patch(
  "/usersData/edit/phoneNumber",
  usersDataController.patchPhoneNumber
);

// PATCH USER'S USERNAME
/*
request body structure:
NOTE: ALL VALUES CANNOT BE NULL
{
  newUsername: "",
  username: "",
};
*/
routers.patch("/usersData/edit/username", usersDataController.patchUsername);

// PATCH USER'S PASSWORD
/*
request body structure:
NOTE: ALL VALUES CANNOT BE NULL
{
  newPassword: "",
  username: "",
};
*/
routers.patch("/usersData/edit/password", usersDataController.patchPassword);
