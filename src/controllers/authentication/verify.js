import moment from "moment";

import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import * as errorMessage from "../../middlewares/globalErrorHandler/errorMessage.js";
import { User } from "../../models/associations/user.profile.js";

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
