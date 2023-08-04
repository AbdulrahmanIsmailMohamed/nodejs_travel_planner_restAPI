import { pool } from "../db/connect";
import { catchError } from "../utils/catchError";

async () => {
    const query = `
   
  `;
  console.log("hi");
  
    await pool.query(query);
};

export interface Users {
    id?: string,
    name: string,
    email: string,
    password: string
}