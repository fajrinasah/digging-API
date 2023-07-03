import { countArticleConservators } from "./countArticleConservators.js";
import { deleteConservation } from "./deleteConservation.js";
import { insertConservation } from "./insertConservation.js";
import { selectMostConservedArticles } from "./selectMostConservedArticles.js";

export const queryStatements = {
  countArticleConservators,
  deleteConservation,
  insertConservation,
  selectMostConservedArticles,
};
