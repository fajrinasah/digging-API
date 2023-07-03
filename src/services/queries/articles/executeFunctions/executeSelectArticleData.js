import { generateExecuteFunction } from "../../../../helpers/generateExecuteFunction.js";
import { queryStatements } from "../queryStatements/index.js";

/*--------------------------------------------------
SELECT ARTICLE'S DATA
----------------------------------------------------*/
// placeholder values:
// [article_id]

export const executeSelectArticleData = ({ article_id = 0 }) => {
  generateExecuteFunction({
    queryStatements: queryStatements.selectArticleData,
    placeholders: [article_id],
  });
};
