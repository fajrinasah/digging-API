import { Router } from "express";

import { verifyStatus } from "../../middlewares/index.js";
import * as conservationControllers from "./index.js";

const router = Router();

/*------------------------------------------------------------
POST
- postConservation
-------------------------------------------------------------*/
router.post(
  "/conserve/:articleId",
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
  "/by/:username",
  conservationControllers.getConservedArticlesFromUser
);

router.get("/most-conserved", conservationControllers.getMostConservedArticles);

router.get(
  "/total-conservators/:articleId",
  conservationControllers.getTotalConservators
);

/*------------------------------------------------------------
DELETE
- deleteConservation
-------------------------------------------------------------*/
router.delete(
  "/conservation",
  verifyStatus,
  conservationControllers.deleteConservation
);

export default router;
