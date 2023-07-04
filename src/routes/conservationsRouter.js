import express from "express";
import { conservationsController } from "../controllers/index.js";

export const routers = express.Router();

/*------------------------------------------------------------
GET
-------------------------------------------------------------*/
// GET CONSERVED ARTICLES FROM A USER
/*
available queries:
categoryId = 0
headline = ""
keywords = ""
sort = ""
*/
routers.get(
  "/conservations/:username",
  conservationsController.getConservedArticlesFromUser
);

// GET MOST CONSERVED ARTICLES
routers.get(
  "/conservations/mostConserved",
  conservationsController.getMostConservedArticles
);

// GET TOTAL OF AN ARTICLE'S CONSERVATORS
routers.get(
  "/conservations/totalConservators/:articleId",
  conservationsController.getTotalConservators
);

/*------------------------------------------------------------
POST
-------------------------------------------------------------*/
// POST CONSERVATION
/*
request body structure:
NOTE: ALL VALUES CANNOT BE NULL
{
  userId: 0,
  articleId: 0,
};
*/
routers.post(
  "/conservations/conserve",
  conservationsController.postConservation
);

/*------------------------------------------------------------
DELETE
-------------------------------------------------------------*/
// DELETE CONSERVATION
/*
request body structure:
NOTE: ALL VALUES CANNOT BE NULL
{
  userId: 0,
  articleId: 0,
};
*/
routers.delete(
  "/conservations/deleteConservation",
  conservationsController.deleteConservation
);
