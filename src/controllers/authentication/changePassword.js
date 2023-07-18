import { ValidationError } from "yup";

import * as helpers from "../../helpers/index.js";
import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import * as errorMessage from "../../middlewares/globalErrorHandler/errorMessage.js";
import { User } from "../../models/associations/user.profile.js";
import * as validation from "./validationSchemata/index.js";
import chalk from "chalk";

/*----------------------------------------------------*/
// CHANGE PASSWORD
/*----------------------------------------------------*/
export const changePassword = async (req, res, next) => {
  try {
    const { uuid } = req.user;
    const { password } = req.body;
    await validation.passwordValidationSchema.validate(req.body);

    // CHECK IF USER EXISTS
    const user = await User?.findOne({ where: { uuid } });
    if (!user)
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message: errorMessage.USER_DOES_NOT_EXISTS,
      };

    // ENCRYPT USER'S PASSWORD
    const hashedPassword = helpers.hash(password);

    // UPDATE USER'S DATA
    await User?.update({ password: hashedPassword }, { where: { uuid } });

    // SEND RESPONSE
    res.status(200).json({
      message: "Password was successfully changed.",
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
