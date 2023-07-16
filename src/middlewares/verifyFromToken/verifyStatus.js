import { verifyToken } from "../../helpers/token.js";
import * as errorStatus from "../globalErrorHandler/errorStatus.js";
import * as errorMessage from "../globalErrorHandler/errorMessage.js";

// CHECK IF USER'S STATUS IS VERIFIED (status: 2)
export async function verifyStatus(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw { message: errorMessage.UNAUTHORIZED };

    const decoded = verifyToken(token);

    if (decoded?.status_id !== 2) throw { message: errorMessage.UNAUTHORIZED };

    req.user = decoded;

    next();
  } catch (error) {
    return res
      .status(errorStatus.UNAUTHORIZED_STATUS)
      .json({ type: "error", message: error?.message, data: null });
  }
}
