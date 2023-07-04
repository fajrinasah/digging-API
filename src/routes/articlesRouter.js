import express from "express";
import { articlesController } from "../controllers/index.js";

export const routers = express.Router();

/*===========================================================
MAIN PATH:
/article
============================================================*/

/*------------------------------------------------------------
GET
-------------------------------------------------------------*/
// GET ARTICLE'S DATA
routers.get("/article/:articleId", articlesController.getArticleData);

/*------------------------------------------------------------
POST
-------------------------------------------------------------*/
// POST ARTICLE'S DATA
/*
request body structure:
NOTE: ALL VALUES CANNOT BE NULL
{
  userId: 0,
  categoryId: 0,
  headline: "",
  subheadline: "",
  mainshot: "",
  mainshotCaption: "",
  lede: "",
  keywords: "",
  content: "",
  references: "",
};
*/
routers.post("/article/publish", articlesController.postArticleData);

/*------------------------------------------------------------
PATCH
-------------------------------------------------------------*/
// PATCH ARTICLE'S DATA
/*
request body structure:
NOTE: ALL VALUES CANNOT BE NULL
{
  categoryId: 0,
  headline: "",
  subheadline: "",
  mainshot: "",
  mainshotCaption: "",
  lede: "",
  keywords: "",
  content: "",
  references: "",
};
*/
routers.patch("/article/edit/:articleId", articlesController.patchArticleData);
/*------------------------------------------------------------
DELETE
-------------------------------------------------------------*/
// DELETE ARTICLE'S DATA
routers.delete(
  "/article/bury/:articleId",
  articlesController.deleteArticleData
);

/*===========================================================
MAIN PATH:
/articles
============================================================*/

/*------------------------------------------------------------
GET
-------------------------------------------------------------*/
// GET ARTICLES TO DIG
/*
available queries:
categoryId = 0
headline = ""
keywords = ""
sort = ""
*/
routers.get("/articles", articlesController.getArticlesToDig);

// GET CAROUSEL ARTICLES
routers.get(
  "/articles/carousel/:totalArticles",
  articlesController.getCarouselArticles
);

// GET PUBLISHED ARTICLES FROM A USER
/*
available queries:
categoryId = 0
headline = ""
keywords = ""
sort = ""
*/
routers.get(
  "/articles/:username",
  articlesController.getPublishedArticlesFromUser
);

// GET TOTAL ARTICLES IN A CATEGORY
routers.get(
  "/articles/totalInCategory/:categoryId",
  articlesController.getTotalArticlesInACategory
);
