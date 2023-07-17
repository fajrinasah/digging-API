import { generateExecuteFunction } from "../../../../helpers/generateConnectionFunction.js";
import * as queryStatements from "../queryStatements/index.js";

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
