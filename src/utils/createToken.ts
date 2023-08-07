import jwt from "jsonwebtoken";
import { JWT_EXPIRE, JWT_SECRET } from "../config/config";

export const token = (user_id: string | undefined) =>
    jwt.sign(
        {
            user_id
        },
        JWT_SECRET as string,
        { expiresIn: JWT_EXPIRE }
    )