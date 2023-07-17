import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import * as errorMessage from "../../middlewares/globalErrorHandler/errorMessage.js";
import * as articles from "../../database/queriesForViews/articles/index.js";

/*----------------------------------------------------*/
// GET CAROUSEL ARTICLES
/*----------------------------------------------------*/
export const getCarouselArticles = (req, res) => {
  const { totalArticles } = req.params;
  articles.executeSelectCarouselArticles({ limit: totalArticles });

  if (err) {
    return res.status(errorStatus.DEFAULT_ERROR_STATUS).json({
      message: errorMessage.SOMETHING_WENT_WRONG,
      error: err,
    });
  }

  return res.status(200).send(results);
};
