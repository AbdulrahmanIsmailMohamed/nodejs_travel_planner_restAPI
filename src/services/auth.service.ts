import bcrypt from "bcrypt";

import { pool } from "../db/connect"
import { Users } from "../models/User"
import { catchError } from "../utils/catchError";
import { APIError } from "../utils/apiError";

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

}