import { Router } from "express";

import { AuthController } from "../controllers/auth.controller";

import {
    forgotPasswordValidator,
    loginValidator,
    registerValidator,
    verifyCodeValidator
} from "../utils/validators/auth.validator";

const router = Router();
const authController = new AuthController();

router
    .post("/register", registerValidator, authController.register)
    .post("/login", loginValidator, authController.login)
    .post("/forgot-password", forgotPasswordValidator, authController.forgotPassword)
    .post("/verify-code", verifyCodeValidator, authController.verifyCode)
    .post("/change-password", loginValidator, authController.changePassword)

export default router;