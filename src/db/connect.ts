import { Pool } from "pg";

import { DB_NAME, DB_PASSWORD, DB_USER } from "../config/config";

export const pool = new Pool({
    user: DB_USER,
    host: 'localhost',
    database: DB_NAME,
    password: DB_PASSWORD,
    port: 5432
});