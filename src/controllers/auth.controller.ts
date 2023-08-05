import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { AuthServices } from "../services/auth.service"
import { Users } from "../models/User";
import { APIError } from "../utils/apiError";
import { token } from "../utils/createToken";

export class AuthController {
    private authService: AuthServices
    constructor() {
        this.authService = new AuthServices();
    }

    register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const userData: Users = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        const newUser = await this.authService.register(userData);
        if (!newUser) return next(new APIError("Can't Created Your data!", 400))

        res.status(201).json({ newUser, token: token(newUser.id) })
    });

    login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        const user = await this.authService.login(email, password);
        if (!user) return next(new APIError("Invalid email or password", 401));

        res.status(200).json({ user, token: token(user.id) })
    });

}