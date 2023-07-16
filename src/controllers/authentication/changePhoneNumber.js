import { ValidationError } from "yup";

import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import * as errorMessage from "../../middlewares/globalErrorHandler/errorMessage.js";
import { User } from "../../models/associations/user.profile.js";
import db from "../../database/index.js";
import * as validation from "./validationSchemata/index.js";
import chalk from "chalk";

/*----------------------------------------------------*/
// CHANGE PHONE NUMBER
/*----------------------------------------------------*/

export const changePhoneNumber = async (req, res, next) => {
  const transaction = db.sequelize.transaction();

  try {
    const { uuid } = req.user;
    const { phone_number } = req.body;
    await validation.phoneNumberValidationSchema.validate(req.body);

    // CHECK IF USER EXISTS
    const user = await User?.findOne({ where: { uuid } });
    if (!user)
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message: errorMessage.USER_DOES_NOT_EXISTS,
      };

    // UPDATE USER'S DATA
    await User?.update({ phone_number }, { where: { uuid } });

    // COMMIT TRANSACTION
    await transaction.commit();

    // SEND RESPONSE
    res.status(200).json({
      message: "Phone number was successfully changed.",
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
