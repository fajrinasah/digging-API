import { errorHandler } from "./globalErrorHandler/errorHandler.js";
import { verifyStatus } from "./verifyFromToken/verifyStatus.js";
import { verifyUser } from "./verifyFromToken/verifyUser.js";

export const middlewares = {
  errorHandler,
  verifyStatus,
  verifyUser,
};
