import { Router } from "express";

import { verifyUser, verifyStatus } from "../../middlewares/index.js";
import * as conservationControllers from "./index.js";

const router = Router();

/*------------------------------------------------------------
POST
- postConservation
-------------------------------------------------------------*/
router.post(
  "/conservations/conserve/:articleId",
  verifyStatus,
  conservationControllers.postConservation
);

/*------------------------------------------------------------
GET
- getConservedArticlesFromUser
- getMostConservedArticles
- getTotalConservators
-------------------------------------------------------------*/
router.get(
  "/conservations/:username",
  conservationControllers.getConservedArticlesFromUser
);

router.get("/conservations/mostConserved");

router.get("/conservations/totalConservators/:articleId");

/*------------------------------------------------------------
DELETE
- deleteConservation
-------------------------------------------------------------*/
router.delete(
  "/conservations/deleteConservation",
  verifyStatus,
  conservationControllers.deleteConservation
);

export default router;
