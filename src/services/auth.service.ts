import bcrypt from "bcrypt";

import { pool } from "../db/connect"
import { Users } from "../models/User"
import { catchError } from "../utils/catchError";
import { APIError } from "../utils/apiError";
import { hashCode } from "../utils/hashCode";
import { sendMail } from "../utils/sendMail";

export class AuthServices {

    register = async (userData: Users): Promise<Users> => {
        const hashPassword = bcrypt.hashSync(userData.password, 12);

        const { rows } = await catchError(pool.query<Users>(
            `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
            [userData.name, userData.email, hashPassword]
        ));
        return rows[0];
    }

    login = async (email: string, password: string): Promise<Users> => {
        const { rows } = await catchError(pool.query<Users>(`SELECT * FROM users WHERE email = $1`, [email]))

        if (bcrypt.compareSync(password, rows[0].password) && rows[0]) return rows[0];
        throw new APIError("Invalid email or password", 401);
    }

    forgotPassword = async (email: string): Promise<string> => {
        // Generate hash reset random 6 digits and save via db
        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
        const resetCodeExpire = new Date(Date.now() + 10 * 60 * 1000);

        const updateUser = await catchError(pool.query<Users>(
            `UPDATE users
            SET reset_code = $1,
                reset_code_expire = $2,
                reset_code_verified = $3
            WHERE email = $4
            RETURNING *;`,
            [hashCode(resetCode), resetCodeExpire, false, email]
        ));

        const user = updateUser.rows[0]

        // send reset code via email by nodemailer
        const message = `
           <h2>Hi ${user.name}</h2>
           <p>We received a request to reset the password on your Travel Planning Account.</p>
           <h3>${resetCode}</h3>
           <p>Enter this code to complete the reset</p>
           <p>Thanks for helping us keep your account secure</p>
           <p>The Travel Planning Team</p>
         `;
        try {
            await sendMail({
                email: user.email,
                message,
                subject: "Your Password Rest Code (Valid For 10 Minute)"
            });
        } catch (error) {
            await catchError(pool.query<Users>(
                `UPDATE users
                SET reset_code = $1,
                    reset_code_expire = $2,
                    reset_code_verified = $3
                WHERE email = $4
                RETURNING *;`,
                [undefined, undefined, undefined, email]
            ));

            throw new APIError("Internal Server Error", 500);
        }

        return "The Reset Code send via email"
    }

    verifyCode = async (email: string, resetCode: string): Promise<string> => {
        const { rows } = await catchError(pool.query<Users>(
            `UPDATE users
            SET reset_code_verified = $1
            WHERE email = $2 AND reset_code = $3 AND reset_code_expire > NOW()
            RETURNING *;`,
            [true, email, hashCode(resetCode)]
        ));
        if (rows.length === 0) throw new APIError("Occur Error", 401);
        console.log(rows[0]);

        return "Now you can change passowrd";
    }

    changePassword = async (email: string, newPassword: string): Promise<Users> => {
        const { rows } = await catchError(pool.query<Users>(
            `UPDATE users
            SET password = $1,
                reset_code = $2,
                reset_code_expire = $3,
                reset_code_verified = $4
            WHERE email = $5 AND reset_code_verified = $6 AND reset_code_expire > NOW()
            RETURNING *;`,
            [
                bcrypt.hashSync(newPassword, 12),
                undefined,
                undefined,
                undefined,
                email,
                true
            ]
        ));

        if (rows.length === 0) throw new APIError("Invalid email Or expire reset code", 400);

        return rows[0];
    }

}

/*
    1) generate code and store via db and send code to email user by nodemailer

*/