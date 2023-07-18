import { ValidationError } from "yup";
import chalk from "chalk";

import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import { User, Profile } from "../../models/associations/user.profile.js";
import { Article } from "../../models/article.js";
import db from "../../database/index.js";
import * as validation from "../../controllers/article/validationSchemata/index.js";

export async function articleDataValidator(req, res, next) {
  try {
    console.log("validator start");
    console.log(req.body);
    // PARSE ARTICLE'S DATA
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

    // VALIDATE ARTICLE'S DATA
    await validation.articleValidationSchema.validate(body);

    console.log("done validating");

    // COMPILE DATA THAT WILL BE SENT TO NEXT STEP
    req.articleData = {
      category_id,
      headline,
      subheadline,
      mainshot_caption,
      lede,
      keywords,
      content,
      references,
    };

    console.log("article data: " + req.articleData);

    next();
  } catch (error) {
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
}
