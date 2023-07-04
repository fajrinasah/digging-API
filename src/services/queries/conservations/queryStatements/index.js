import { countArticleConservators } from "./countArticleConservators.js";
import { deleteConservation } from "./deleteConservation.js";
import { insertConservation } from "./insertConservation.js";
import { selectConservedArticlesFromAUser } from "./selectConservedArticlesFromAUser.js";
import { selectMostConservedArticles } from "./selectMostConservedArticles.js";

export const queryStatements = {
  countArticleConservators,
  deleteConservation,
  insertConservation,
  selectConservedArticlesFromAUser,
  selectMostConservedArticles,
};
