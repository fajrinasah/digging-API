import connection from "../configs/conection.config.js";

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
    if (err) {
      console.error(err);
      return err;
    }

    console.log(results);
    return results;
  });
};
