import { generateExecuteFunction } from "../../../../helpers/generateExecuteFunction.js";
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
