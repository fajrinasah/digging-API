import connection from "../configs/connection.config.js";

/*=================================================
EXECUTE FUNCTION GENERATOR
==================================================*/
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
