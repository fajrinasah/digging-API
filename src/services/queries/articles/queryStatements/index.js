import { countArticlesInACategory } from "./countArticlesInACategory";
import { deleteArticleData } from "./deleteArticleData";
import { insertArticleData } from "./insertArticleData";
import { selectArticleData } from "./selectArticleData";
import { selectArticlesToDig } from "./selectArticlesToDig";
import { selectCarouselArticles } from "./selectCarouselArticles";
import { selectPublishedArticlesFromUser } from "./selectPublishedArticlesFromUser";
import { updateArticleData } from "./updateArticleData";

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

// export const queryStatements = {
//   countArticlesInACategory,
//   deleteArticleData,
//   insertArticleData,
//   selectArticleData,
//   selectArticlesToDig: () => selectArticlesToDig(),
//   selectCarouselArticles,
//   selectPublishedArticlesFromUser: () => selectPublishedArticlesFromUser(),
//   updateArticleData,
// };
