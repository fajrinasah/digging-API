import { executeCountArticleConservators } from "./executeFunctions/executeCountArticleConservators";
import { executeDeleteConservation } from "./executeFunctions/executeDeleteConservation";
import { executeInsertConservation } from "./executeFunctions/executeInsertConservation";
import { executeSelectConservedArticlesFromAUser } from "./executeFunctions/executeSelectConservedArticlesFromAUser";
import { querySelectMostConservedArticles } from "./queryFunctions/querySelectMostConservedArticles.js";

export const conservations = {
  executeCountArticleConservators,
  executeDeleteConservation,
  executeInsertConservation,
  executeSelectConservedArticlesFromAUser,
  querySelectMostConservedArticles,
};
