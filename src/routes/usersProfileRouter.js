import express from "express";
import { usersProfileController } from "../controllers/index.js";

export const routers = express.Router();

/*------------------------------------------------------------
GET
-------------------------------------------------------------*/
// GET USER'S PROFILE
routers.get("/usersProfile/:username", usersProfileController.getUserProfile);

/*------------------------------------------------------------
PATCH
-------------------------------------------------------------*/
// PATCH USER'S DISPLAY NAME
/*
request body structure:
NOTE: ALL VALUES CANNOT BE NULL
{
  newDisplayName: "",
  username: "",
};
*/
routers.patch(
  "/usersProfile/edit/displayName",
  usersProfileController.patchDisplayName
);

// PATCH USER'S PHOTO PROFILE
/*
request body structure:
NOTE: ALL VALUES CANNOT BE NULL
{
  newPhotoProfile: "",
  username: "",
};
*/
routers.patch(
  "/usersProfile/edit/photoProfile",
  usersProfileController.patchPhotoProfile
);

// PATCH USER'S ABOUT
/*
request body structure:
NOTE: ALL VALUES CANNOT BE NULL
{
  newAbout: "",
  username: "",
};
*/
routers.patch("/usersProfile/edit/about", usersProfileController.patchAbout);

/*------------------------------------------------------------
PATCH
-------------------------------------------------------------*/
