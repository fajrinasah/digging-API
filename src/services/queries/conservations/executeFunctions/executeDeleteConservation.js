import { generateExecuteFunction } from "../../../../helpers/generateExecuteFunction.js";
import { queryStatements } from "../queryStatements/index.js";

/*--------------------------------------------------
DELETE CONSERVATION
----------------------------------------------------*/
// placeholder values:
// [conservator, article_id]

export const executeDeleteConservation = ({
  conservator = 0,
  article_id = 0,
}) => {
  generateExecuteFunction({
    queryStatements: queryStatements.deleteConservation,
    placeholders: [conservator, article_id],
  });
};
