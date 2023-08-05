import { pool } from "../db/connect";

export interface Users {
    id?: string,
    name: string,
    email: string,
    password: string
}