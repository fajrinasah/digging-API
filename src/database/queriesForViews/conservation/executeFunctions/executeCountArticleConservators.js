import { generateExecuteFunction } from "../../../../helpers/generateConnectionFunction.js";
import * as queryStatements from "../queryStatements/index.js";

/*--------------------------------------------------
(SELECT) COUNT ARTICLE'S CONSERVATORS
----------------------------------------------------*/
// placeholder values:
// [article_id]

export const executeCountArticleConservators = ({ article_id = 0 }) => {
  generateExecuteFunction({
    queryStatements: queryStatements.countArticleConservators,
    placeholders: [article_id],
  });
};
