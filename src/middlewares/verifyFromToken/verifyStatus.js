import { verifyToken } from "../../helpers/token.js";
import * as errorStatus from "../globalErrorHandler/errorStatus.js";
import * as errorMessage from "../globalErrorHandler/errorMessage.js";
import { User, Profile } from "../../models/associations/user.profile.js";

// CHECK IF USER'S STATUS IS VERIFIED (status: 2)
export async function verifyStatus(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token)
      throw { message: errorMessage.UNAUTHORIZED + `: no token was provided.` };

    const decoded = verifyToken(token);

    const user = await User?.findOne({
      where: { uuid: decoded?.uuid },
    });

    if (user?.dataValues?.status_id !== 2)
      throw {
        message:
          errorMessage.UNAUTHORIZED +
          `: user's status is unverified. Please verify your account first.`,
      };

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(errorStatus.UNAUTHORIZED_STATUS).json({
      type: "error",
      status: errorStatus.UNAUTHORIZED_STATUS,
      message: error?.message,
      data: null,
    });
  }
}
