import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { loginValidator, registerValidator } from "../utils/validators/auth.validator";

const router = Router();
const authController = new AuthController();

router
    .post("/register", registerValidator, authController.register)
    .post("/login", loginValidator, authController.login)
    .post("/forgot-password", authController.forgotPassword)
    .post("/verify-code", authController.verifyCode)
    .post("/change-password", authController.changePassword)

export default router;