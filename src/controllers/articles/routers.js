import { Router } from "express";
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

router.get(
  "/articles/:username",
  articlesControllers.getPublishedArticlesFromUser
);

router.get(
  "/articles/totalInCategory/:categoryId",
  articlesControllers.getTotalArticlesInACategory
);

export default router;
