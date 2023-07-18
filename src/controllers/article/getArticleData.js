import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import * as errorMessage from "../../middlewares/globalErrorHandler/errorMessage.js";
import { Articles } from "../../models/views/articles.js";

/*----------------------------------------------------*/
// GET ARTICLE'S DATA
/*----------------------------------------------------*/
export const getArticleData = async (req, res, next) => {
  try {
    const { articleId } = req.params;

    const articleData = await Articles?.findOne({
      where: { article_id: articleId },
    });

    delete articleData?.dataValues?.profile_id;

    if (!articleData)
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message: errorMessage.BAD_REQUEST + `: article not found.`,
      };

    // SEND RESPONSE
    res.status(200).json({
      articleData,
    });
  } catch (error) {
    next(error);
  }
};
