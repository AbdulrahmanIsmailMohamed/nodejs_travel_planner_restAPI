import { check } from "express-validator";

import { catchError } from "../catchError";
import { pool } from "../../db/connect";
import { Users } from "../../models/User";
import { APIError } from "../apiError";
import { validatorMW } from "../../middlewares/validatorMW";

export const registerValidator = [
    check("name")
        .isString()
        .withMessage("Name must be string")
        .isLength({ min: 2 })
        .withMessage("Name must be at least 2 char")
        .isLength({ max: 150 })
        .withMessage("Name must be at most 150 char"),

    check("email")
        .isEmail()
        .withMessage("Invalid email format!")
        .custom(async (val, { req }) => {
            const { rows } = await catchError(pool.query<Users>(`SELECT * FROM users WHERE email = $1`, [val]))

            if (rows.length === 0) return true;
            throw new APIError("Your email is already exist, please login!", 400);
        }),

    check("password")
        .isString()
        .withMessage("Password must be string")
        .isStrongPassword({
            minLength: 6,
            minLowercase: 1,
            minNumbers: 4,
            minUppercase: 1,
            minSymbols: 1
        }),

    validatorMW
];

export const loginValidator = [
    check("email")
        .isEmail()
        .withMessage("Invalid email format!")
        .custom(async (val) => {
            const { rows } = await catchError(pool.query<Users>(`SELECT * FROM users WHERE email = $1`, [val]))
            
            if (rows.length !== 0) return true;
            throw new APIError("Your email is not exist, please register!", 404);
        }),

    validatorMW
];