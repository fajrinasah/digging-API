import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import * as errorMessage from "../../middlewares/globalErrorHandler/errorMessage.js";
import * as conservations from "../../database/queriesForViews/conservation/index.js";

/*----------------------------------------------------*/
// GET TOTAL OF AN ARTICLE'S CONSERVATORS
/*----------------------------------------------------*/
export const getTotalConservators = (req, res) => {
  const { articleId } = req.params;

  conservations.executeCountArticleConservators({ article_id: articleId });

  if (err) {
    return res.status(errorStatus.DEFAULT_ERROR_STATUS).json({
      message: errorMessage.SOMETHING_WENT_WRONG,
      error: err,
    });
  }

  return res.status(200).send(results);
};
