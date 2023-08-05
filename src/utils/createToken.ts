import jwt from "jsonwebtoken";
import { JWT_EXPIRE, JWT_SECRET } from "../config/config";

export const token = (userId: string | undefined) =>
    jwt.sign(
        {
            userId
        },
        JWT_SECRET as string,
        { expiresIn: JWT_EXPIRE }
    )