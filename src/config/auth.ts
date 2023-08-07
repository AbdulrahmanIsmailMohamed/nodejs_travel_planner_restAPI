import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler';
import { NextFunction, Response } from "express";

import { APIError } from "../utils/apiError";
import { JWT_SECRET } from "./config";
import { AuthenticatedRequest, DecodedToken } from "../interfaces/authentication.interface";
import { catchError } from "../utils/catchError";
import { pool } from "../db/connect";
import { Users } from "../models/User";

export const protectRoute = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1]
    }

    if (!token) return next(new APIError("Your not register", 401));
    const decode = jwt.verify(token, JWT_SECRET) as DecodedToken;
    if (!decode) return next(new APIError("Invalid token", 401));

    const { rows } = await catchError(pool.query<Users>(
        `SECLECT * FROM users WHERE id = $1`, [decode.userId]
    ));
    if (rows.length === 0) return next(new APIError("Your not register!", 404));
    console.log(rows[0]);
    req.user = rows[0];
    next();
});