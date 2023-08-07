import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Users } from "../models/User";

export interface DecodedToken extends JwtPayload {
    user_id: string
}

export interface AuthenticatedRequest extends Request {
    user?: Users
}
