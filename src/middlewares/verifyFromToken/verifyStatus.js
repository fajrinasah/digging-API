import { verifyToken } from "../../helpers/token.js";
import * as errorStatus from "../globalErrorHandler/errorStatus.js";
import * as errorMessage from "../globalErrorHandler/errorMessage.js";

// CHECK IF USER'S STATUS IS VERIFIED (status: 1)
export async function verifyStatus(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = verifyToken(token);

    if (decoded?.status !== 1)
      throw new Error({ message: errorMessage.UNAUTHORIZED });

    next();
  } catch (error) {
    return res
      .status(errorStatus.UNAUTHORIZED_STATUS)
      .json({ message: error?.message });
  }
}
