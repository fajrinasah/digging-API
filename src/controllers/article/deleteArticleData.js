import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import * as errorMessage from "../../middlewares/globalErrorHandler/errorMessage.js";
import { Article } from "../../models/article.js";
import { User, Profile } from "../../models/associations/user.profile.js";
import db from "../../database/index.js";

/*----------------------------------------------------*/
// DELETE ARTICLE'S DATA
/*----------------------------------------------------*/
export const deleteArticleData = async (req, res, next) => {
  // START TRANSACTION
  const transaction = await db.sequelize.transaction();

  try {
    const { uuid } = req.user;
    const { articleId } = req.params;

    // CHECK IF USER IS ALSO THE ARTICLE'S WRITER
    const user = await User?.findOne({
      where: { uuid },
    });

    const profile = await Profile?.findOne({
      where: { user_id: user?.dataValues?.id },
    });

    const article = await Article?.findOne({
      where: { id: articleId },
    });

    const userIsWriter =
      profile?.dataValues?.id === article?.dataValues?.profile_id;

    // ONLY ARTICLE'S WRITER CAN DELETE ARTICLE'S DATA
    if (!userIsWriter)
      throw {
        status: errorStatus.UNAUTHORIZED_STATUS,
        message:
          errorMessage.UNAUTHORIZED +
          `: only article's writer can delete article's data.`,
      };

    // DELETE ARTICLE'S DATA
    await Article.destroy({
      where: { id: articleId },
    });

    // COMMIT TRANSACTION
    await transaction.commit();

    // SEND RESPONSE
    res.status(200).json({ message: "Article was deleted successfully." });
  } catch (error) {
    // ROLLBACK TRANSACTION IF THERE'S ANY ERROR
    await transaction.rollback();

    next(error);
  }
};
