import { ValidationError } from "yup";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import moment from "moment";

import * as config from "../../configs/index.js";
import * as helpers from "../../helpers/index.js";
import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import * as errorMessage from "../../middlewares/globalErrorHandler/errorMessage.js";
import { User } from "../../models/associations/user.profile.js";
import db from "../../database/index.js";
import * as validation from "./validationSchemata/index.js";

/*----------------------------------------------------*/
// RE-SEND EMAIL VERIFICATION
/*----------------------------------------------------*/
export const resendEmailVerification = async (req, res, next) => {
  // START TRANSACTION
  const transaction = await db.sequelize.transaction();

  try {
    const { email } = req.body;
    await validation.emailValidationSchema.validate(req.body);

    // CHECK IF USER EXIST
    const user = await User?.findOne({ where: { email: email } });
    if (!user || user?.dataValues?.status_id === 3)
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message: errorMessage.USER_DOES_NOT_EXISTS,
      };

    if (user?.dataValues?.status_id === 2)
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message:
          errorMessage.INVALID_CREDENTIALS + `: account was already verified.`,
      };

    // GENERATE OTP TOKEN FOR VERIFICATION PROCESS
    const otpToken = helpers.generateOtp();

    await User?.update(
      {
        otp: otpToken,
        otp_exp: moment().add(1, "days").format("YYYY-MM-DD HH:mm:ss"),
      },
      { where: { email } }
    );

    // COMPOSE "EMAIL VERIFICATION" MAIL
    const emailTemplate = fs.readFileSync(
      path.join(
        process.cwd(),
        "src",
        "views",
        "emailVerification",
        "emailVerification.html"
      ),
      "utf8"
    );

    const emailData = handlebars.compile(emailTemplate)({
      email,
      otpToken,
      link: config.REDIRECT_URL + `/auth/verify/reg-${user?.dataValues?.uuid}`,
    });

    // SEND "EMAIL VERIFICATION" MAIL
    const mailOptions = {
      from: config.GMAIL,
      to: email,
      subject: "Email Verification",
      html: emailData,
    };
    helpers.transporter.sendMail(mailOptions, (error, info) => {
      if (error) throw error;
      console.log("Email was sent successfully: " + info.response);
    });

    res.status(200).json({
      message:
        "Email verification was sent successfully. Please check your email to verify.",
    });

    // COMMIT TRANSACTION
    await transaction.commit();
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
