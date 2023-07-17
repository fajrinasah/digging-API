import { Router } from "express";
import { verifyUser, verifyStatus } from "../../middlewares/index.js";
import * as articleControllers from "./index.js";
import {
  createUploader,
  createCloudinaryStorage,
} from "../../helpers/imageUploader.js";

const router = Router();
const storage = createCloudinaryStorage("profiles");
const uploader = createUploader(storage);

/*------------------------------------------------------------
GET
getArticleData
-------------------------------------------------------------*/
// GET ARTICLE'S DATA
router.get("/article/:articleId", articleControllers.getArticleData);

/*------------------------------------------------------------
POST
postArticleData
-------------------------------------------------------------*/
// POST ARTICLE'S DATA
router.post(
  "/article/publish",
  verifyStatus,
  uploader.single("data"),
  articleControllers.postArticleData
);

/*------------------------------------------------------------
PATCH
patchArticleData
-------------------------------------------------------------*/
// PATCH ARTICLE'S DATA
router.patch(
  "/article/edit/:articleId",
  verifyUser,
  articleControllers.patchArticleData
);

/*------------------------------------------------------------
DELETE
deleteArticleData
-------------------------------------------------------------*/
// DELETE ARTICLE'S DATA
router.delete(
  "/article/bury/:articleId",
  verifyUser,
  articleControllers.deleteArticleData
);

export default router;
