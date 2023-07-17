import { Router } from "express";
import { verifyUser } from "../../middlewares/index.js";
import * as profileControllers from "./index.js";
import {
  createUploader,
  createCloudinaryStorage,
} from "../../helpers/imageUploader.js";

const router = Router();
const storage = createCloudinaryStorage("profiles");
const uploader = createUploader(storage);

/*------------------------------------------------------------
GET
- getUserProfile
-------------------------------------------------------------*/
router.get("/:username", profileControllers.getUserProfile);

/*------------------------------------------------------------
PATCH
- changeAbout
- changeDisplayName
- changePhotoProfile
-------------------------------------------------------------*/

router.patch("/change-about", verifyUser, profileControllers.changeAbout);
router.patch(
  "/change-display-name",
  verifyUser,
  profileControllers.changeDisplayName
);
router.patch(
  "/change-photo-profile",
  verifyUser,
  uploader.single("file"),
  profileControllers.changePhotoProfile
);

export default router;
