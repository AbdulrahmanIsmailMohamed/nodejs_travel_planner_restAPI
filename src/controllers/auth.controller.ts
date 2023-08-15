import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { AuthServices } from "../services/auth.service"
import { Users } from "../models/User";
import { APIError } from "../utils/apiError";
import { token } from "../utils/createToken";
import { SenitizeData } from "../utils/senitizeData";

export class AuthController {
    private authService: AuthServices
    private senitizeData: SenitizeData;
    constructor() {
        this.authService = new AuthServices();
        this.senitizeData = new SenitizeData()
    }

    register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const userData: Users = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        const newUser = await this.authService.register(userData);
        if (!newUser) return next(new APIError("Can't Created Your data!", 400))

        res.status(201).json({
            user: this.senitizeData.user(newUser),
            token: token(newUser.user_id)
        })
    });

    login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        const user = await this.authService.login(email, password);
        if (!user) return next(new APIError("Invalid email or password", 401));

        res.status(200).json({
            user: this.senitizeData.user(user),
            token: token(user.user_id)
        })
    });

    forgotPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const email = req.body.email;

        const forgotPassowrd = await this.authService.forgotPassword(email);
        if (!forgotPassowrd) return next(new APIError("Your email not exist, please register", 401))

        res.status(200).json({ status: "Success", message: forgotPassowrd });
    });

    verifyCode = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const email = req.body.email;
        const resetCode = req.body.resetCode;

        const verifyCode = await this.authService.verifyCode(email, resetCode);
        if (!verifyCode) return next(new APIError("Your email not exist, please register", 401))

        res.status(200).json({ status: "Success", message: verifyCode });
    });

    changePassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const email = req.body.email;
        const newPassword = req.body.newPassword;

        const user = await this.authService.changePassword(email, newPassword);
        if (!user) return next(new APIError("Your email not exist, please register", 401))

        res.status(200).json({
            status: "Success",
            user: this.senitizeData.user(user),
            token: token(user.user_id)
        });
    });

}