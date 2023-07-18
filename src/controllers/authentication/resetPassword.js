import { ValidationError } from "yup";
import chalk from "chalk";

import * as helpers from "../../helpers/index.js";
import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import * as errorMessage from "../../middlewares/globalErrorHandler/errorMessage.js";
import { User } from "../../models/associations/user.profile.js";
import * as validation from "./validationSchemata/index.js";

/*----------------------------------------------------*/
// RESET PASSWORD
/*----------------------------------------------------*/
export const resetPassword = async (req, res, next) => {
  try {
    // const { uuid } = req.user;
    const { uuidWithContext } = req.params;
    const { password } = req.body;
    await validation.passwordValidationSchema.validate(req.body);

    // CHECK CONTEXT FROM UUID PREFIX
    const context = uuidWithContext.split("-")[0];
    const cleanedUuid = uuidWithContext.split("-")?.slice(1)?.join("-");

    // CHECK IF CONTEXT === "rpw"
    if (context !== "rpw")
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message:
          errorMessage.BAD_REQUEST_STATUS +
          `: context is not for reset password.`,
      };

    // ENCRYPT USER'S PASSWORD
    const hashedPassword = helpers.hash(password);

    // UPDATE USER'S PASSWORD IN DB
    await User?.update(
      { password: hashedPassword },
      { where: { uuid: cleanedUuid } }
    );

    // SEND RESPONSE
    res.status(200).json({
      message: "Password was successfully reset. Please login again.",
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
