import { executeCountArticleConservators } from "./executeFunctions/executeCountArticleConservators";
import { executeDeleteConservation } from "./executeFunctions/executeDeleteConservation";
import { executeInsertConservation } from "./executeFunctions/executeInsertConservation";
import { executeSelectConservedArticlesOfAUser } from "./executeFunctions/executeSelectConservedArticlesOfAUser";
import { querySelectMostConservedArticles } from "./queryFunctions/querySelectMostConservedArticles.js";

export const conservations = {
  executeCountArticleConservators,
  executeDeleteConservation,
  executeInsertConservation,
  executeSelectConservedArticlesOfAUser,
  querySelectMostConservedArticles,
};
