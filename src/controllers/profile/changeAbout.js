import { ValidationError } from "yup";

import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import * as errorMessage from "../../middlewares/globalErrorHandler/errorMessage.js";
import { User, Profile } from "../../models/associations/user.profile.js";
import * as validation from "./validationSchemata/index.js";
import chalk from "chalk";

/*----------------------------------------------------*/
// CHANGE ABOUT
/*----------------------------------------------------*/
export const changeAbout = async (req, res, next) => {
  try {
    const { uuid } = req.user;
    const { about } = req.body;
    await validation.aboutValidationSchema.validate(req.body);

    // CHECK IF USER EXISTS
    const user = await User?.findOne({ where: { uuid } });
    if (!user)
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message: errorMessage.USER_DOES_NOT_EXISTS,
      };

    // UPDATE USER'S ABOUT IN PROFILE DATA
    await Profile?.update(
      { about },
      { where: { user_id: user?.dataValues?.id } }
    );

    // SEND RESPONSE
    res.status(200).json({
      message: "About was successfully changed.",
    });
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
};
