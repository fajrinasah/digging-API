import { generateExecuteFunction } from "../../../../helpers/generateExecuteFunction.js";
import { queryStatements } from "../queryStatements/index.js";

/*--------------------------------------------------
SELECT CAROUSEL ARTICLES
----------------------------------------------------*/
// placeholder values:
// [limit]

export const executeSelectCarouselArticles = ({ limit = 5 }) => {
  generateExecuteFunction({
    queryStatements: queryStatements.selectCarouselArticles,
    placeholders: [limit],
  });
};
