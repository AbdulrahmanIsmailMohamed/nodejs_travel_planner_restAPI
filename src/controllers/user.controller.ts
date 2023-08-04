import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { UserServices } from "../services/users.service"
import { Users } from "../models/User";

export class UserController {
    private userService: UserServices
    constructor() {
        this.userService = new UserServices();
    }

    createUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const userData: Users = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        const newUser = await this.userService.createUser(userData);
        if (!newUser) res.status(400).json({ message: `error` });
        else res.status(201).json(newUser)
    })
}