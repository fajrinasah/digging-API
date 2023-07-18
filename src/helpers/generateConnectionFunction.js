import connection from "../configs/conection.config.js";
import * as errorStatus from "../middlewares/globalErrorHandler/errorStatus.js";
import * as errorMessage from "../middlewares/globalErrorHandler/errorMessage.js";

/*=================================================
EXECUTE FUNCTION GENERATOR
==================================================*/
// WITH PLACEHOLDERS
export const generateExecuteFunction = ({
  queryStatements = "",
  placeholders = [],
}) => {
  return connection.execute(
    queryStatements,
    placeholders,
    function (err, results) {
      if (err) {
        console.error(err);
        return err;
      }

      console.log(results);
      return results;
    }
  );
};

// WITHOUT PLACEHOLDERS
export const generateQueryFunction = ({ queryStatements = "" }) => {
  return connection.query(queryStatements, function (err, results) {
    // if (err) {
    //   console.error(err);
    //   return err;
    // }
    if (err)
      throw {
        status: errorStatus.DEFAULT_ERROR_STATUS,
        message: err.sqlState,
      };

    console.log(results);
    return results;
  });
};
