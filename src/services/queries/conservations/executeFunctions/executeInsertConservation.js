import { generateExecuteFunction } from "../../../../helpers/generateExecuteFunction.js";
import { queryStatements } from "../queryStatements/index.js";

/*--------------------------------------------------
INSERT CONSERVATION
----------------------------------------------------*/
// placeholder values:
// [conservator, article_id]

export const executeInsertConservation = ({
  conservator = 0,
  article_id = 0,
}) => {
  generateExecuteFunction({
    queryStatements: queryStatements.insertConservation,
    placeholders: [conservator, article_id],
  });
};
