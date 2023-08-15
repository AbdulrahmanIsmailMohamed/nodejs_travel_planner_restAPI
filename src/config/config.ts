import dotenv from "dotenv";
dotenv.config();

export const NODE_ENV: string = process.env.NODE_ENV || "production";

export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

export const DB_NAME: string = process.env.DB_NAME || "postgres";

export const DB_USER: string = process.env.DB_USER!;

export const DB_PASSWORD: string = process.env.DB_PASSWORD!;

export const JWT_SECRET: string = process.env.JWT_SECRET || "this is a jwt secret";

export const JWT_EXPIRE: string = process.env.JWT_EXPIRE || "30d";

export const MAILRE_HOST: string = process.env.MAILRE_HOST!;

export const MAILRE_PORT: number = process.env.MAILRE_PORT ? parseInt(process.env.MAILRE_PORT) : 465;

export const MAILRE_USER: string = process.env.MAILRE_USER!;

export const MAILRE_PASS: string = process.env.MAILRE_PASS!;