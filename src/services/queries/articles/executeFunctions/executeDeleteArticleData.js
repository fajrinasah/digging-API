import { generateExecuteFunction } from "../../../../helpers/generateConnectionFunction.js";
import { queryStatements } from "../queryStatements/index.js";

/*--------------------------------------------------
DELETE ARTICLE'S DATA
----------------------------------------------------*/
// placeholder values:
// [article_id]

export const executeDeleteArticleData = ({ article_id = 0 }) => {
  generateExecuteFunction({
    queryStatements: queryStatements.deleteArticleData,
    placeholders: [article_id],
  });
};
