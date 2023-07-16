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

/*----------------------------------------------------*/
// GENERAL OTP REQUEST
/*----------------------------------------------------*/
export const requestOtp = async (req, res, next) => {
  // START TRANSACTION
  const transaction = await db.sequelize.transaction();

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

    // COMMIT TRANSACTION
    await transaction.commit();

    // SEND RESPONSE
    res.status(200).json({
      message:
        "OTP token was sent successfully. Pleasse check your email to verify.",
    });
  } catch (error) {
    next(error);
  }
};
