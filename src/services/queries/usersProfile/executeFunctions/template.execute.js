import { generateExecuteFunction } from "../../../../helpers/generateConnectionFunction.js";
import { queryStatements } from "../queryStatements/index.js";

/*--------------------------------------------------
ACTION NAME
----------------------------------------------------*/
// placeholder values:
// []

export const executeWhat = ({ placeholder }) => {
  generateExecuteFunction({
    queryStatements: queryStatements,
    placeholders: [placeholder],
  });
};
