import { Router } from "express";
import {
  articleDataValidator,
  mainshotDestroyer,
  verifyUser,
  verifyStatus,
} from "../../middlewares/index.js";
import * as articleControllers from "./index.js";
import {
  createUploader,
  createCloudinaryStorage,
} from "../../helpers/imageUploader.js";

const router = Router();
const storage = createCloudinaryStorage("mainshots");
const uploader = createUploader(storage);

/*------------------------------------------------------------
GET
getArticleData
-------------------------------------------------------------*/
// GET ARTICLE'S DATA
router.get("/data/:articleId", articleControllers.getArticleData);

/*------------------------------------------------------------
POST
postArticleData
-------------------------------------------------------------*/
// POST ARTICLE'S DATA

// USING ARTICLE DATA VALIDATOR MIDDLEWARE
// router.post(
//   "/publish",
//   verifyStatus,
//   articleDataValidator,
//   uploader.single("file"),
//   articleControllers.postArticleData
// );

// NOT USING ARTICLE DATA VALIDATOR MIDDLEWARE
router.post(
  "/publish",
  verifyStatus,
  uploader.single("file"),
  articleControllers.postArticleData
);

/*------------------------------------------------------------
PATCH
patchArticleData
-------------------------------------------------------------*/
// PATCH ARTICLE'S DATA
router.patch(
  "/edit/:articleId",
  verifyUser,
  articleControllers.patchArticleData
);

// PATCH ARTICLE'S DATA
router.patch(
  "/edit/mainshot/:articleId",
  verifyUser,
  mainshotDestroyer,
  uploader.single("file"),
  articleControllers.patchArticleMainshot
);

/*------------------------------------------------------------
DELETE
deleteArticleData
-------------------------------------------------------------*/
// DELETE ARTICLE'S DATA
router.delete(
  "/bury/:articleId",
  verifyUser,
  articleControllers.deleteArticleData
);

export default router;
