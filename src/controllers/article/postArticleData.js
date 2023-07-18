import { ValidationError } from "yup";
import chalk from "chalk";

import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import { User, Profile } from "../../models/associations/user.profile.js";
import { Article } from "../../models/article.js";
import db from "../../database/index.js";
import * as validation from "./validationSchemata/index.js";

/*----------------------------------------------------*/
// POST ARTICLE'S DATA
/*----------------------------------------------------*/
export const postArticleData = async (req, res, next) => {
  // // START TRANSACTION
  // const transaction = await db.sequelize.transaction();

  try {
    const { uuid } = req.user;
    // USING ARTICLE DATA VALIDATOR MIDDLEWARE
    // const {
    //   category_id,
    //   headline,
    //   subheadline,
    //   mainshot_caption,
    //   lede,
    //   keywords,
    //   content,
    //   references,
    // } = req.articleData;

    // NOT USING ARTICLE DATA VALIDATOR MIDDLEWARE
    const { data } = req.body;
    console.log("data: " + data);
    const body = JSON.parse(data);
    console.log("body: " + body);
    const {
      category_id,
      headline,
      subheadline,
      mainshot_caption,
      lede,
      keywords,
      content,
      references,
    } = body;
    await validation.articleValidationSchema.validate(body);

    // GET DATA FROM USER & PROFILE
    const user = await User?.findOne({
      where: { uuid },
    });

    const profile = await Profile?.findOne({
      where: { user_id: user?.dataValues?.id },
    });

    // INSERT ARTICLE'S DATA INTO DB
    const article = await Article?.create({
      profile_id: profile?.dataValues?.id,
      category_id,
      headline,
      subheadline,
      mainshot: req?.file?.path,
      mainshot_caption,
      lede,
      keywords,
      content,
      references,
    });

    // CLEAN UP DATA BEFORE SENDING THEM
    delete article?.dataValues?.profile_id;

    // // COMMIT TRANSACTION
    // await transaction.commit();

    // SEND RESPONSE
    res.status(201).json({
      message: "Article was published successfully.",
      article,
    });
  } catch (error) {
    // // ROLLBACK TRANSACTION IF THERE'S ANY ERROR
    // await transaction.rollback();

    // // IF ERROR FROM VALIDATION
    // if (error instanceof ValidationError) {
    //   console.error(chalk.bgRedBright("Validation Error: "));

    //   return next({
    //     status: errorStatus.BAD_REQUEST_STATUS,
    //     message: error?.errors?.[0],
    //   });
    // }

    next(error);
  }
};
