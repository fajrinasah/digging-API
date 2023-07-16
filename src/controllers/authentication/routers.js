import { Router } from "express";
import { verifyUser } from "../../middlewares/index.js";
import * as authControllers from "./index.js";

const router = Router();

router.post("/register", authControllers.register);
router.post("/resend-verification", authControllers.resendEmailVerification);
router.post("/verify/:uuidWithContext", authControllers.verify);
router.post("/login", authControllers.login);
router.post("/request-otp", authControllers.requestOtp);

router.patch("/reset-password", verifyUser, authControllers.resetPassword);
router.patch("/change-password", verifyUser, authControllers.changePassword);
router.patch("/change-email", verifyUser, authControllers.changeEmail);
router.patch(
  "/change-phone-number",
  verifyUser,
  authControllers.changePhoneNumber
);
router.patch("/change-username", verifyUser, authControllers.changeUsername);

router.get("/keep-login", verifyUser, authControllers.keepLogin);

router.delete("/account", verifyUser, authControllers.deleteAccount);

export default router;
