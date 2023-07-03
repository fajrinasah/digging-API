import { generateQueryFunction } from "../../../../helpers/generateConnectionFunction.js";
import { selectMostConservedArticles } from "../queryStatements/selectMostConservedArticles.js";

/*--------------------------------------------------
SELECT MOST CONSERVED ARTICLES
----------------------------------------------------*/
export const querySelectMostConservedArticles = () => {
  generateQueryFunction({ queryStatements: selectMostConservedArticles });
};
