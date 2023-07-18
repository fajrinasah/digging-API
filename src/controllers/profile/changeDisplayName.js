import { ValidationError } from "yup";

import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import * as errorMessage from "../../middlewares/globalErrorHandler/errorMessage.js";
import { User, Profile } from "../../models/associations/user.profile.js";
import * as validation from "./validationSchemata/index.js";
import chalk from "chalk";

/*----------------------------------------------------*/
// CHANGE DISPLAY NAME
/*----------------------------------------------------*/
export const changeDisplayName = async (req, res, next) => {
  try {
    const { uuid } = req.user;
    const { display_name } = req.body;
    await validation.displayNameValidationSchema.validate(req.body);

    // CHECK IF USER EXISTS
    const user = await User?.findOne({ where: { uuid } });
    if (!user)
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message: errorMessage.USER_DOES_NOT_EXISTS,
      };

    // UPDATE USER'S DISPLAY NAME IN PROFILE DATA
    await Profile?.update(
      { display_name },
      { where: { user_id: user?.dataValues?.id } }
    );

    // SEND RESPONSE
    res.status(200).json({
      message: "Display name was successfully changed.",
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
