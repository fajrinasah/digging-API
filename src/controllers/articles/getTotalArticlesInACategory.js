import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import * as errorMessage from "../../middlewares/globalErrorHandler/errorMessage.js";
import * as articles from "../../database/queriesForViews/articles/index.js";

/*----------------------------------------------------*/
// GET TOTAL ARTICLES IN A CATEGORY
/*----------------------------------------------------*/
export const getTotalArticlesInACategory = (req, res) => {
  const { categoryId } = req.params;

  articles.executeCountArticlesInACategory({ category_id: categoryId });

  if (err) {
    return res.status(errorStatus.DEFAULT_ERROR_STATUS).json({
      message: errorMessage.SOMETHING_WENT_WRONG,
      error: err,
    });
  }

  return res.status(200).send(results);
};
