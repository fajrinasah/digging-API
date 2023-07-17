import { ValidationError } from "yup";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import moment from "moment";

import * as config from "../../configs/index.js";
import * as helpers from "../../helpers/index.js";
import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import * as errorMessage from "../../middlewares/globalErrorHandler/errorMessage.js";
import { User, Profile } from "../../models/associations/user.profile.js";
import db from "../../database/index.js";
import * as validation from "./validationSchemata/index.js";
import chalk from "chalk";

/*----------------------------------------------------*/
// REGISTER
/*----------------------------------------------------*/
export const register = async (req, res, next) => {
  // START TRANSACTION
  const transaction = await db.sequelize.transaction();

  try {
    // VALIDATE DATA
    const { email, phone_number, username, password } = req.body;
    await validation.registerValidationSchema.validate(req.body);

    // CHECK IF USER ALREADY EXIST
    const userExist = await User?.findOne({
      where: { email, phone_number, username },
    });
    if (userExist)
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message: errorMessage.USER_ALREADY_EXISTS,
      };

    // ENCRYPT USER'S PASSWORD
    const hashedPassword = helpers.hash(password);

    // GENERATE OTP TOKEN FOR VERIFICATION PROCESS
    const otpToken = helpers.generateOtp();

    // INSERT USER'S DATA TO USERS TABLE
    const user = await User?.create({
      email,
      phone_number,
      username,
      password: hashedPassword,
      otp: otpToken,
      otp_exp: moment().add(1, "days").format("YYYY-MM-DD HH:mm:ss"),
    });

    // INSERT NEW DATA TO PROFILES TABLE
    await Profile?.create({ user_id: user?.dataValues?.id });

    // CLEAN UP DATA BEFORE SEND THEM BACK TO CLIENT
    delete user?.dataValues?.password;
    delete user?.dataValues?.otp;
    delete user?.dataValues?.otp_exp;

    // GENERATE ACCESS TOKEN
    const accessToken = helpers.createToken({
      uuid: user?.dataValues?.uuid,
      role: user?.dataValues?.role,
      status: user?.dataValues?.status,
    });

    // SEND RESPONSE
    res.header("Authorization", `Bearer ${accessToken}`).status(201).json({
      message: "Account was created successfully.",
      user,
    });

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
