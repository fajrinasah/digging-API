import { generateQueryFunction } from "../../../../helpers/generateConnectionFunction.js";
import { selectAllCategories } from "../queryStatements/selectAllCategories.js";

/*--------------------------------------------------
SELECT ALL CATEGORIES
----------------------------------------------------*/

export const querySelectAllCategories = () => {
  generateQueryFunction({ queryStatements: selectAllCategories });
};
