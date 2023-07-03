import { executeCountArticlesInACategory } from "./executeFunctions/executeCountArticlesInACategory.js";
import { executeDeleteArticleData } from "./executeFunctions/executeDeleteArticleData.js";
import { executeInsertArticleData } from "./executeFunctions/executeInsertArticleData.js";
import { executeSelectArticleData } from "./executeFunctions/executeSelectArticleData.js";
import { executeSelectArticlesToDig } from "./executeFunctions/executeSelectArticlesToDig.js";
import { executeSelectCarouselArticles } from "./executeFunctions/executeSelectCarouselArticles.js";
import { executeSelectPublishedArticlesFromUser } from "./executeFunctions/executeSelectPublishedArticlesFromUser.js";
import { executeUpdateArticleData } from "./executeFunctions/executeUpdateArticleData.js";

export const articles = {
  executeCountArticlesInACategory,
  executeDeleteArticleData,
  executeInsertArticleData,
  executeSelectArticleData,
  executeSelectArticlesToDig,
  executeSelectCarouselArticles,
  executeSelectPublishedArticlesFromUser,
  executeUpdateArticleData,
};
