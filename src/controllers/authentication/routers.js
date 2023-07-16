import { Router } from "express";
import { verifyUser } from "../../middlewares/index.js";
import * as authControllers from "./index.js";

const router = Router();

router.post("/register", authControllers.register);
router.post("/verify", authControllers.verify);
router.post("/login", authControllers.login);
router.post("/request-otp", authControllers.requestOtp);

router.get("/keep-login", verifyUser, authControllers.keepLogin);

router.delete("/account", verifyUser, authControllers.deleteAccount);

export default router;
