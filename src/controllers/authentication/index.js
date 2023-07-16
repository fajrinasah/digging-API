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

const client = redis.createClient();
client.on("error", (err) => console.log("Redis Client Error", err));
// await client.connect();

/*----------------------------------------------------*/
// REGISTER
/*----------------------------------------------------*/
export const register = async (req, res, next) => {
  try {
    // START TRANSACTION
    const transaction = await db.sequelize.transaction();

    // VALIDATE DATA
    const { email, phone_number, username, password } = req.body;
    await validation.RegisterValidationSchema.validate(req.body);

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
      return next({ status: 400, message: error?.errors?.[0] });
    }

    next(error);
  }
};

/*----------------------------------------------------*/
// VERIFY
/*----------------------------------------------------*/
export const verify = async (req, res, next) => {
  try {
    const { uuid, token } = req.body;

    // CHECK CONTEXT FROM UUID PREFIX
    const context = uuid.split("-")[0];
    const cleanedUuid = uuid.split("-")?.slice(1)?.join("-");

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
        message: errorMessage.INVALID_CREDENTIALS,
      };

    // CHECK TOKEN'S EXPIRE DATE/TIME
    const isExpired = moment().isAfter(user?.dataValues?.otp_exp);
    if (isExpired)
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message: errorMessage.INVALID_CREDENTIALS,
      };

    // DO QUERY BASED ON CONTEXT
    if (context === "reg") {
      // UPDATE USER'S STATUS
      await User?.update(
        { status: 2, otp: null, otp_exp: null },
        { where: { uuid: cleanedUuid } }
      );
    }

    // SEND RESPONSE
    res
      .status(200)
      .json({ message: "Account was verified successfully.", data: uuid });
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
    // INCLUDES PROFILE IN THE RESULT
    const userExists = await User?.findOne({
      where: whereQuery,
      include: Profile,
    });

    if (!userExists)
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message: errorMessage.USER_DOES_NOT_EXISTS,
      };

    // CHECK USER'S STATUS (1: unverified, 2: verified, 3: deactivated)
    if (userExists?.dataValues?.status === 3)
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message: errorMessage.USER_DOES_NOT_EXISTS,
      };

    // CHECK IF PASSWORD CORRECT
    const isPasswordCorrect = helpers.compare(
      password,
      userExists?.dataValues?.password
    );

    if (!isPasswordCorrect)
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message: errorMessage.USER_DOES_NOT_EXISTS,
      };

    // CHECK TOKEN IN REDIS
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

    // CLEAN UP DATA BEFORE SEND A RESPONSE
    delete userExists?.dataValues?.password;
    delete userExists?.dataValues?.otp;
    delete userExists?.dataValues?.otp_exp;

    // SEND RESPONSE
    res
      .header("Authorization", `Bearer ${accessToken}`)
      .status(200)
      .json({ user: userExists });
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
    const user = await User?.findOne({ where: { uuid }, include: Profile });

    // CLEAN UP DATA BEFORE SEND A RESPONSE
    delete user?.dataValues?.password;
    delete user?.dataValues?.otp;
    delete user?.dataValues?.otp_exp;

    // SEND RESPONSE
    res.status(200).json({ user });
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

    const emailData = handlebars.compile(template)({
      otpToken,
      link:
        config.REDIRECT_URL +
        `/auth/verify/${context}-${user?.dataValues?.uuid}`,
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
    res.status(200).json({ message: "Otp token requested successfully" });
  } catch (error) {
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
