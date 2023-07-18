import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import * as errorMessage from "../../middlewares/globalErrorHandler/errorMessage.js";
import { Article } from "../../models/article.js";

/*----------------------------------------------------*/
// CHANGE PHOTO PROFILE
/*----------------------------------------------------*/
export const patchArticleMainshot = async (req, res, next) => {
  try {
    const { articleId } = req.params;

    // CHECK IF FILE IS UPLOADED
    if (!req.file) {
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message: errorMessage.BAD_REQUEST + "Please upload an image.",
      }();
    }

    // UPDATE MAINSHOT IN ARTICLE'S DATA
    await Article?.update(
      { mainshot: req?.file?.path },
      { where: { id: articleId } }
    );

    // SEND RESPONSE
    res.status(200).json({
      message: "Mainshot was updated successfully.",
      mainshotUrl: req.file?.path,
    });
  } catch (error) {
    next(error);
  }
};
