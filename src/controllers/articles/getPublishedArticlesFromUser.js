import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import * as errorMessage from "../../middlewares/globalErrorHandler/errorMessage.js";
import * as articles from "../../database/queriesForViews/articles/index.js";

/*----------------------------------------------------*/
// GET PUBLISHED ARTICLES FROM A USER
/*----------------------------------------------------*/
export const getPublishedArticlesFromUser = (req, res) => {
  // writer's username
  const { username } = req.params;

  // get data from req query (if any)
  const categoryId = req.query.categoryId ? req.query.categoryId : 0;
  const headline = req.query.headline ? req.query.headline : "";
  const keywords = req.query.keywords ? req.query.keywords : "";
  const sort = req.query.sort ? req.query.sort : "DESC";

  articles.executeSelectPublishedArticlesFromUser({
    username,
    filterByCategory: categoryId,
    filterByHeadline: headline,
    filterByKeywords: keywords,
    sortingOption: sort,
  });

  if (err) {
    return res.status(errorStatus.DEFAULT_ERROR_STATUS).json({
      message: errorMessage.SOMETHING_WENT_WRONG,
      error: err,
    });
  }

  return res.status(200).send(results);
};
