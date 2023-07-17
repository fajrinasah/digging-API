import { Router } from "express";
import { verifyUser, verifyStatus } from "../../middlewares/index.js";
import * as articlesControllers from "./index.js";

const router = Router();

/*------------------------------------------------------------
GET
- getArticlesToDig
- getCarouselArticles
- getPublishedArticlesFromUser
- getTotalArticlesInACategory
-------------------------------------------------------------*/
router.get("/articles", articlesControllers.getArticlesToDig);

router.get(
  "/articles/carousel/:totalArticles",
  articlesControllers.getCarouselArticles
);

router.get("/articles/:username");

router.get("/articles/totalInCategory/:categoryId");

export default router;
