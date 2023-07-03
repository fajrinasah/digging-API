import { countArticlesInACategory } from "./countArticlesInACategory.js";
import { deleteArticleData } from "./deleteArticleData.js";
import { insertArticleData } from "./insertArticleData.js";
import { selectArticleData } from "./selectArticleData.js";
import { selectArticlesToDig } from "./selectArticlesToDig.js";
import { selectCarouselArticles } from "./selectCarouselArticles.js";
import { selectPublishedArticlesFromUser } from "./selectPublishedArticlesFromUser.js";
import { updateArticleData } from "./updateArticleData.js";

export const queryStatements = {
  countArticlesInACategory,
  deleteArticleData,
  insertArticleData,
  selectArticleData,
  selectArticlesToDig,
  selectCarouselArticles,
  selectPublishedArticlesFromUser,
  updateArticleData,
};
