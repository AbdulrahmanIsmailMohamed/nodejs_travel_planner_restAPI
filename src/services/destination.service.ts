import { pool } from "../db/connect"
import { PaginationResult } from "../interfaces/pagination.interface";
import { Destination } from "../models/Destination"
import { catchError } from "../utils/catchError"
import { paginate } from "../utils/pagination";

export class DestinationService {
    createDestination = async (destinationBody: Destination): Promise<Destination> => {
        const { name, city, country, description, image_url, user_id } = destinationBody;

        const { rows } = await catchError(pool.query<Destination>(
            `INSERT INTO destination (name, description, country, city, image_url, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
            [name, description, country, city, image_url, user_id]
        ));
        return rows[0];
    }

    updateDestination = async (destinationBody: Destination): Promise<Destination> => {
        const { name, city, country, description, image_url, user_id, destination_id } = destinationBody;

        const { rows } = await catchError(pool.query<Destination>(
            `UPDATE destination
            SET name = COALESCE($1, name),
                description = COALESCE($2, description),
                country = COALESCE($3, country),
                city = COALESCE($4, city),
                image_url = COALESCE($5, image_url)
            WHERE destination_id = $6 AND user_id = $7
            RETURNING *;`,
            [name, description, country, city, image_url, destination_id, user_id]
        ));
        return rows[0];
    }

    deleteDestination = async (destination_id: string, user_id: string): Promise<Destination> => {
        const { rows } = await catchError(pool.query<Destination>(
            `DELETE FROM destination
            WHERE destination_id = $1 AND user_id = $2
            RETURNING *;`,
            [destination_id, user_id]
        ));
        return rows[0];
    }

    getDestination = async (destination_id: string, user_id: string): Promise<Destination> => {
        const { rows } = await catchError(pool.query<Destination>(
            `SELECT * FROM destination
            WHERE destination_id = $1 AND user_id = $2;`,
            [destination_id, user_id]
        ));
        return rows[0];
    }

    getDestinations = async (userId: string, page: number, pageSize: number): Promise<PaginationResult<Destination>> => {
        const query = `SELECT * FROM destination WHERE user_id = $1`;
        const values = [userId];
        const paginationResult: PaginationResult<Destination> = await paginate(page, pageSize, query, values);        

        return paginationResult
    }

    // search = async (keyword: string) => {
    //     const { rows } = await catchError(pool.query<Destination>(
    //         ``
    //     ))
    // }

}