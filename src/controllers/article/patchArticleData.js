import { ValidationError } from "yup";
import chalk from "chalk";

import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import * as errorMessage from "../../middlewares/globalErrorHandler/errorMessage.js";
import { Article } from "../../models/article.js";
import { User, Profile } from "../../models/associations/user.profile.js";
import db from "../../database/index.js";
import * as validation from "./validationSchemata/index.js";

/*----------------------------------------------------*/
// PATCH ARTICLE'S DATA
/*----------------------------------------------------*/
export const patchArticleData = async (req, res, next) => {
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

    // ONLY ARTICLE'S WRITER CAN EDIT ARTICLE'S DATA
    if (!userIsWriter)
      throw {
        status: errorStatus.UNAUTHORIZED_STATUS,
        message:
          errorMessage.UNAUTHORIZED +
          `: only article's writer can edit article's data.`,
      };

    /*-------------------------------------------------------
      PATCH ARTICLE'S DATA
      --------------------------------------------------------*/
    // VALIDATE DATA
    await validation.patchValidationSchema.validate(req.body);

    // DATA THAT WILL BE UPDATED
    const category_id = req.body?.category_id;
    const headline = req.body?.headline;
    const subheadline = req.body?.subheadline;
    const mainshot_caption = req.body?.mainshot_caption;
    const lede = req.body?.lede;
    const keywords = req.body?.keywords;
    const content = req.body?.content;
    const references = req.body?.references;

    // CREATE UPDATE-QUERY BUILDER
    const updateQuery = {};

    if (category_id) {
      updateQuery.category_id = category_id;
    }

    if (headline) {
      updateQuery.headline = headline;
    }

    if (subheadline) {
      updateQuery.subheadline = subheadline;
    }

    if (mainshot_caption) {
      updateQuery.mainshot_caption = mainshot_caption;
    }

    if (lede) {
      updateQuery.lede = lede;
    }

    if (keywords) {
      updateQuery.keywords = keywords;
    }

    if (content) {
      updateQuery.content = content;
    }

    if (references) {
      updateQuery.references = references;
    }

    // UPDATE ARTICLE'S DATA BASED ON CREATED UPDATE QUERY
    await Article.update(updateQuery, {
      where: { id: articleId },
    });

    // GET UPDATED ARTICLE DATA
    const updatedArticle = await Article?.findOne({
      where: { id: articleId },
    });

    delete updatedArticle?.dataValues?.profile_id;

    // COMMIT TRANSACTION
    await transaction.commit();

    // SEND RESPONSE
    res.status(200).json({
      message: "Article was edited successfully.",
      article: updatedArticle,
    });
  } catch (error) {
    // ROLLBACK TRANSACTION IF THERE'S ANY ERROR
    await transaction.rollback();

    // IF ERROR FROM VALIDATION
    if (error instanceof ValidationError) {
      console.error(chalk.bgRedBright("Validation Error: "));

      return next({
        status: errorStatus.BAD_REQUEST_STATUS,
        message: error?.errors?.[0],
      });
    }

    next(error);
  }
};
