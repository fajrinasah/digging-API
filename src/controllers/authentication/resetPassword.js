import { ValidationError } from "yup";

import * as helpers from "../../helpers/index.js";
import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import { User } from "../../models/associations/user.profile.js";
import db from "../../database/index.js";
import * as validation from "./validationSchemata/index.js";
import chalk from "chalk";

/*----------------------------------------------------*/
// RESET PASSWORD
/*----------------------------------------------------*/
export const resetPassword = async (req, res, next) => {
  const transaction = db.sequelize.transaction();

  try {
    const { uuid } = req.user;
    const { password } = req.body;
    await validation.passwordValidationSchema.validate(req.body);

    // ENCRYPT USER'S PASSWORD
    const hashedPassword = helpers.hash(password);

    // UPDATE USER'S PASSWORD IN DB
    await User?.update({ password: hashedPassword }, { where: { uuid } });

    // COMMIT TRANSACTION
    await transaction.commit();
    res.status(200).json({
      message: "Password was successfully reset.",
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
