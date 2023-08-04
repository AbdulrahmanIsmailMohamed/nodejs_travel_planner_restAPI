import bcrypt from "bcrypt";

import { pool } from "../db/connect"
import { Users } from "../models/User"

export class UserServices {

    createUser = async (userData: Users): Promise<Users> => {
        const hashPassword = bcrypt.hashSync(userData.password, 12);

        const { rows } = await pool.query<Users>(
            `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
            [userData.name, userData.email, hashPassword]
        );
        console.log(rows);
        return rows[0]
    }

}