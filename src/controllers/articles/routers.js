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
router.get("/dig", articlesControllers.getArticlesToDig);

router.get("/carousel/:totalArticles", articlesControllers.getCarouselArticles);

router.get("/:username", articlesControllers.getPublishedArticlesFromUser);

router.get(
  "/total-in-a-category/:categoryId",
  articlesControllers.getTotalArticlesInACategory
);

export default router;
