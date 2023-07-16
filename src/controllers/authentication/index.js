import { ValidationError } from "yup";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import moment from "moment";
import redis from "redis";

import * as config from "../../configs/index.js";
import * as helpers from "../../helpers/index.js";
import * as error from "../../middlewares/globalErrorHandler/errorHandler.js";
import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import * as errorMessage from "../../middlewares/globalErrorHandler/errorMessage.js";
import { User, Profile } from "../../models/associations/user.profile.js";
import db from "../../database/index.js";
import * as validation from "./validationSchemata.js";
import chalk from "chalk";

const client = redis.createClient();
client.on("error", (err) => console.log("Redis Client Error", err));
// await client.connect();

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
    res.header("Authorization", `Bearer ${accessToken}`).status(200).json({
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

/*----------------------------------------------------*/
// RE-SEND EMAIL VERIFICATION
/*----------------------------------------------------*/
export const resendEmailVerification = async (req, res, next) => {
  // START TRANSACTION
  const transaction = await db.sequelize.transaction();

  try {
    const { email } = req.body;

    // CHECK IF USER EXIST
    const user = await User?.findOne({ where: { email: email } });
    if (!user)
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message: errorMessage.USER_DOES_NOT_EXISTS,
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
      message: "Email verification was sent successfully.",
    });

    // COMMIT TRANSACTION
    await transaction.commit();
  } catch (error) {
    // ROLLBACK TRANSACTION IF THERE'S ANY ERROR
    await transaction.rollback();

    next(error);
  }
};

/*----------------------------------------------------*/
// VERIFY
/*----------------------------------------------------*/
export const verify = async (req, res, next) => {
  const { uuidWithContext } = req.params;
  const { token } = req.body;

  try {
    // CHECK CONTEXT FROM UUID PREFIX
    const context = uuidWithContext.split("-")[0];
    const cleanedUuid = uuidWithContext.split("-")?.slice(1)?.join("-");

    // CHECK IF USER EXIST
    const user = await User?.findOne({ where: { uuid: cleanedUuid } });
    if (!user)
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message: errorMessage.USER_DOES_NOT_EXISTS,
      };

    // VERIFY OTP TOKEN
    if (token !== user?.dataValues?.otp)
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message: errorMessage.INVALID_CREDENTIALS + `: wrong OTP token.`,
      };

    // CHECK TOKEN'S EXPIRE DATE/TIME
    const isExpired = moment().isAfter(user?.dataValues?.otp_exp);
    if (isExpired)
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message: errorMessage.INVALID_CREDENTIALS + `: OTP token has expired.`,
      };

    // DO ACTIONS BASED ON CONTEXT
    if (context === "reg") {
      // UPDATE USER'S STATUS
      await User?.update(
        { status_id: 2, otp: null, otp_exp: null },
        { where: { uuid: cleanedUuid } }
      );

      // SEND RESPONSE
      res.status(200).json({
        message: "Account was verified successfully.",
        data: cleanedUuid,
      });
    }

    // SEND RESPONSE
    res.status(200).json({
      message: "Successfully verified.",
    });
  } catch (error) {
    next(error);
  }
};

/*----------------------------------------------------*/
// LOGIN
/*----------------------------------------------------*/
export const login = async (req, res, next) => {
  try {
    // USER CAN LOGIN USING THEIR EMAIL, PHONE NUMBER, OR USERNAME
    const { data, password } = req.body;
    await validation.loginValidationSchema.validate(req.body);

    // CHECK IF DATA IS USER'S EMAIL
    const isEmail = await validation.isEmail(data);
    const isPhoneNumber = await validation.isPhoneNumber(data);
    const isUsername = await validation.isUsername(data);

    // BUILD A QUERY BASED ON DATA'S CONTENT
    const whereQuery = isEmail
      ? { email: data }
      : isPhoneNumber
      ? { phone_number: data }
      : { username: data };

    // CHECK IF USER EXIST
    const userExists = await User?.findOne({
      where: whereQuery,
    });

    if (!userExists)
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message: errorMessage.USER_DOES_NOT_EXISTS,
      };

    // CHECK USER'S STATUS (1: not verified, 2: verified, 3: deactivated)
    if (userExists?.dataValues?.status === 3) {
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message: errorMessage.USER_DOES_NOT_EXISTS,
      };
    }

    // CHECK IF PASSWORD CORRECT
    const isPasswordCorrect = helpers.compare(
      password,
      userExists?.dataValues?.password
    );

    if (!isPasswordCorrect) {
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message: errorMessage.INVALID_CREDENTIALS + `: wrong password`,
      };
    }

    // CHECK TOKEN IN REDIS
    client.connect();
    const cachedToken = await client.get(userExists?.dataValues?.uuid);
    const tokenIsValid = cachedToken && helpers.verifyToken(cachedToken);

    let accessToken = null;

    if (tokenIsValid) {
      accessToken = cachedToken;
    } else {
      // GENERATE NEW ACCESS TOKEN
      accessToken = helpers.createToken({
        uuid: userExists?.dataValues?.uuid,
        role: userExists?.dataValues?.role,
        status: userExists?.dataValues?.status,
      });

      // SET ACCESS TOKEN
      await client.set(userExists?.dataValues?.uuid, accessToken, {
        EX: 86400,
      });
    }

    // GET USER'S PROFILE FROM DB
    const profile = await Profile.findOne({
      where: { user_id: userExists?.dataValues?.id },
    });

    // CLEAN UP DATA BEFORE SEND A RESPONSE
    delete userExists?.dataValues?.id;
    delete userExists?.dataValues?.password;
    delete userExists?.dataValues?.otp;
    delete userExists?.dataValues?.otp_exp;
    delete profile?.dataValues?.id;
    delete profile?.dataValues?.user_id;

    // SEND RESPONSE
    res
      .header("Authorization", `Bearer ${accessToken}`)
      .status(200)
      .json({ user: userExists, profile: profile });
  } catch (error) {
    // CHECK IF THE ERROR COMES FROM VALIDATION
    if (error instanceof ValidationError) {
      return next({
        status: errorStatus.BAD_REQUEST_STATUS,
        message: error?.errors?.[0],
      });
    }

    // PASS TO GLOBAL ERROR HANDLER
    next(error);
  }
};

/*----------------------------------------------------*/
// KEEP LOGIN
/*----------------------------------------------------*/
export const keepLogin = async (req, res, next) => {
  try {
    const { uuid } = req.user;

    // GET USER'S DATA AND PROFILE
    const user = await User?.findOne({ where: { uuid } });
    const profile = await Profile?.findOne({
      where: { user_id: user?.dataValues?.id },
    });

    // CLEAN UP DATA BEFORE SEND A RESPONSE
    delete user?.dataValues?.id;
    delete user?.dataValues?.password;
    delete user?.dataValues?.otp;
    delete user?.dataValues?.otp_exp;
    delete profile?.dataValues?.id;
    delete profile?.dataValues?.user_id;

    // SEND RESPONSE
    res.status(200).json({ user, profile });
  } catch (error) {
    next(error);
  }
};

/*----------------------------------------------------*/
// GENERAL OTP REQUEST
/*----------------------------------------------------*/
export const requestOtp = async (req, res, next) => {
  try {
    const { email, context } = req.body;

    // CHECK IF USER EXIST
    const user = await User?.findOne({ where: { email } });
    if (!user)
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message: errorMessage.USER_DOES_NOT_EXISTS,
      };

    // GENERATE OTP TOKEN
    const otpToken = helpers.generateOtp();

    // UPDATE USER'S OTP TOKEN DATA ON DB
    await User?.update(
      {
        otp: otpToken,
        otp_exp: moment().add(1, "days").format("YYYY-MM-DD HH:mm:ss"),
      },
      { where: { email } }
    );

    // COMPOSE EMAIL
    const template = fs.readFileSync(
      path.join(
        process.cwd(),
        "views",
        "generalOtpVerification",
        "generalOtpVerification.html"
      ),
      "utf8"
    );

    // UUID CONTEXT IN REDIRECT URL BASED ON CONTEXT FROM REQ.BODY
    /*----------------------------------------------------------
    "reset password" = rpw
    "change data" = cdt
        --> for change password, email, username, or phone number
    -----------------------------------------------------------*/
    const linkContext = context === "reset password" ? "rpw" : "cdt";

    const emailData = handlebars.compile(template)({
      otpToken,
      link:
        config.REDIRECT_URL +
        `/auth/verify/${linkContext}-${user?.dataValues?.uuid}`,
    });

    // SEND EMAIL
    const mailOptions = {
      from: config.GMAIL,
      to: email,
      subject: "OTP Token for Verification",
      html: emailData,
    };

    helpers.transporter.sendMail(mailOptions, (error, info) => {
      if (error) throw error;
      console.log("Email was sent successfully: " + info.response);
    });

    // SEND RESPONSE
    res.status(200).json({
      message:
        "OTP token was sent successfully. Pleasse check your email to verify.",
    });
  } catch (error) {
    next(error);
  }
};

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

    next(error);
  }
};

/*----------------------------------------------------*/
// CHANGE EMAIL
/*----------------------------------------------------*/
export const changeEmail = async (req, res, next) => {
  const transaction = db.sequelize.transaction();

  try {
    const { uuid } = req.user;
    const { email } = req.body;
    await validation.emailValidationSchema.validate(req.body);

    // CHECK IF USER EXISTS
    const user = await User?.findOne({ where: { uuid } });
    if (!user)
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message: errorMessage.USER_DOES_NOT_EXISTS,
      };

    // GENERATE OTP TOKEN FOR VERIFICATION PROCESS
    const otpToken = helpers.generateOtp();

    // UPDATE USER'S DATA
    await User?.update(
      {
        email,
        otp: otpToken,
        otp_exp: moment().add(1, "days").format("YYYY-MM-DD HH:mm:ss"),
      },
      { where: { uuid } }
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
      link: config.REDIRECT_URL + `/auth/verify/cdt-${user?.dataValues?.uuid}`,
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

    // SEND RESPONSE
    res.status(200).json({
      message: "Email was successfully changed.",
    });
  } catch (error) {
    // ROLLBACK TRANSACTION IF THERE'S ANY ERROR
    await transaction.rollback();

    next(error);
  }
};

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

    next(error);
  }
};

/*----------------------------------------------------*/
// CHANGE USERNAME
/*----------------------------------------------------*/
export const changeUsername = async (req, res, next) => {
  const transaction = db.sequelize.transaction();

  try {
    const { uuid } = req.user;
    const { username } = req.body;
    await validation.usernameValidationSchema.validate(req.body);

    // CHECK IF USER EXISTS
    const user = await User?.findOne({ where: { uuid } });
    if (!user)
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message: errorMessage.USER_DOES_NOT_EXISTS,
      };

    // UPDATE USER'S DATA
    await User?.update({ username }, { where: { uuid } });

    // COMMIT TRANSACTION
    await transaction.commit();

    // SEND RESPONSE
    res.status(200).json({
      message: "Username was successfully changed.",
    });
  } catch (error) {
    // ROLLBACK TRANSACTION IF THERE'S ANY ERROR
    await transaction.rollback();

    next(error);
  }
};
/*----------------------------------------------------*/
// CHANGE PASSWORD
/*----------------------------------------------------*/
export const changePassword = async (req, res, next) => {
  const transaction = db.sequelize.transaction();

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

    // COMMIT TRANSACTION
    await transaction.commit();

    // SEND RESPONSE
    res.status(200).json({
      message: "Password was successfully changed.",
    });
  } catch (error) {
    // ROLLBACK TRANSACTION IF THERE'S ANY ERROR
    await transaction.rollback();

    next(error);
  }
};

/*----------------------------------------------------*/
// (SOFT) DELETE ACCOUNT
/*----------------------------------------------------*/
export const deleteAccount = async (req, res, next) => {
  try {
    const { uuid } = req.user;

    // UPDATE USER'S STATUS TO 3 (DEACTIVATED)
    await User?.update({ status: 3 }, { where: { uuid } });

    // @return response
    res.status(200).json({ message: "Account was deleted." });
  } catch (error) {
    next(error);
  }
};
