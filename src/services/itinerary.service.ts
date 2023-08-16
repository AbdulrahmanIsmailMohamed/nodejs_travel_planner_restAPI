import { pool } from '../db/connect';
import { PaginationResult } from '../interfaces/pagination.interface';
import { Itineraries } from '../models/Itinerary';
import { Sort } from '../types/sorting.types';
import { catchError } from '../utils/catchError';
import { paginate } from '../utils/pagination';

export class ItineraryService {
    createItinerary = async (itineraryBody: Itineraries) => {
        const { destination_id, user_id, name_of_day, date, activities } = itineraryBody;

        const { rows } = await catchError(pool.query<Itineraries>(
            `INSERT INTO itinerary (destination_id, user_id, name_of_day, date, activities) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [destination_id, user_id, name_of_day, date, JSON.stringify(activities)]
        ));

        return rows[0];
    }

    updateItinerary = async (itineraryBody: Itineraries) => {
        const { user_id, name_of_day, activities, itinerary_id } = itineraryBody;
        console.log(JSON.stringify(activities));

        const { rows } = await catchError(pool.query<Itineraries>(
            `UPDATE itinerary
            SET name_of_day = COALESCE($1, name_of_day),
                activities = COALESCE($2, activities)
            WHERE itinerary_id = $3 AND user_id = $4
            RETURNING *;`,
            [name_of_day, JSON.stringify(activities), itinerary_id, user_id]
        ));

        return rows[0];
    }

    deleteItinerary = async (itinerary_id: string, user_id: string) => {
        const { rows } = await catchError(pool.query<Itineraries>(
            `DELETE FROM itinerary
            WHERE itinerary_id = $1 AND user_id = $2
            RETURNING *;`,
            [itinerary_id, user_id]
        ));

        return rows[0];
    }

    getItinerary = async (itinerary_id: string, user_id: string) => {
        const { rows } = await catchError(pool.query<Itineraries>(
            `SELECT * FROM itinerary WHERE itinerary_id = $1 AND user_id = $2`,
            [itinerary_id, user_id]
        ));

        return rows[0];
    }

    getItineraries = async (
        destination_id: string,
        user_id: string,
        page: number,
        pageSize: number,
        sort?: Sort
    ): Promise<PaginationResult<Itineraries>> => {
        const sortingClause = sort === "ASC" ? "ORDER BY date ASC" : sort === "DESC" ? "ORDER BY date DESC" : "";
        const query = `
          SELECT * FROM itinerary
          WHERE user_id = $1 AND destination_id = $2
          ${sortingClause}
        `;

        const values: Array<string> = [user_id, destination_id]
        const paginationResult = await paginate<Itineraries>(page, pageSize, query, values)

        return paginationResult;
    }
}