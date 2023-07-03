import { generateExecuteFunction } from "../../../../helpers/generateConnectionFunction.js";
import { queryStatements } from "../queryStatements/index.js";

/*--------------------------------------------------
(SELECT) COUNT TOTAL ARTICLES OF A CATEGORY
----------------------------------------------------*/
// placeholder values:
// [category_id]
export const executeCountArticlesInACategory = ({ category_id = 0 }) => {
  generateExecuteFunction({
    queryStatements: queryStatements.countArticlesInACategory,
    placeholders: [category_id],
  });
};
