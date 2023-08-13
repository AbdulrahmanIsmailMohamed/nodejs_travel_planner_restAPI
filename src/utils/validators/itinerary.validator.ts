import { check } from 'express-validator';

import { catchError } from '../catchError';
import { pool } from '../../db/connect';
import { Destination } from '../../models/Destination';
import { APIError } from '../apiError';
import { Itineraries } from '../../models/Itinerary';
import { validatorMW } from '../../middlewares/validatorMW';

export const itineraryIdValidator = [
    check("itineraryId")
        .isUUID()
        .withMessage("Invalid Itinerary id format!!")
        .custom(async (val, { req }) => {
            const { rows } = await catchError(pool.query<Itineraries>(
                `SELECT * FROM itinerary
                 WHERE itinerary_id = $1 AND user_id = $2;`,
                [val, req.user.user_id]
            ));

            if (rows.length === 0) throw new APIError("Itinerary not exist", 404);
            return true;
        }),

    validatorMW
]

export const createItineraryValidator = [
    check("destination_id")
        .isUUID()
        .withMessage("Invalid Destination id format!!")
        .custom(async (val, { req }) => {
            const { rows } = await catchError(pool.query<Destination>(
                `SELECT * FROM destination
                 WHERE destination_id = $1 AND user_id = $2;`,
                [val, req.user.user_id]
            ));

            if (rows.length === 0) throw new APIError("Destination not exist", 404);
            return true;
        }),

    check("date")
        .notEmpty()
        .withMessage("Data must be not null")
        .matches(/^\d{4}-\d{2}-(\d{1}|\d{2})$/)
        .withMessage("Invalid date format. Should be in 'YYYY-MM-D' format."),

    check("name_of_day")
        .optional()
        .isLength({ min: 2 })
        .withMessage("Name of the day must be at least 2 char")
        .isLength({ max: 150 })
        .withMessage("Name of the day must be at most 150 char"),

    check("activities")
        .optional()
        .isArray()
        .withMessage("Activities must be array")
        .custom((val) => {
            for (const activity of val) {
                if (!activity.name || !activity.place) {
                    throw new APIError("Each activity must have a name and a place", 400)
                }
            };
            return true
        }),

    validatorMW
];

export const updateItineraryValidator = [
    check("itineraryId")
        .isUUID()
        .withMessage("Invalid Itinerary id format!!")
        .custom(async (val, { req }) => {
            const { rows } = await catchError(pool.query<Itineraries>(
                `SELECT * FROM itinerary
                 WHERE itinerary_id = $1 AND user_id = $2;`,
                [val, req.user.user_id]
            ));

            if (rows.length === 0) throw new APIError("Itinerary not exist", 404);
            return true;
        }),

    check("name_of_day")
        .optional()
        .isLength({ min: 2 })
        .withMessage("Name of the day must be at least 2 char")
        .isLength({ max: 150 })
        .withMessage("Name of the day must be at most 150 char"),

    check("activities")
        .optional()
        .isArray()
        .withMessage("Activities must be array")
        .custom((val) => {
            for (const activity of val) {
                if (!activity.name || !activity.place) {
                    throw new APIError("Each activity must have a name and a place", 400)
                }
            };
            return true
        }),

    validatorMW
];