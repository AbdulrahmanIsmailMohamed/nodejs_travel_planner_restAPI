import { check } from "express-validator";
import { validatorMW } from "../../middlewares/validatorMW";
import { catchError } from "../catchError";
import { pool } from "../../db/connect";
import { Destination } from "../../models/Destination";
import { APIError } from "../apiError";
import { Itineraries } from "../../models/Itinerary";

export const destinationIdValidator = [
    check("id")
        .notEmpty()
        .withMessage("Destination id must be not null")
        .isUUID()
        .withMessage("Invalid destination_id format!!")
        .custom(async (val, { req }) => {
            const { rows } = await catchError(pool.query<Destination>(
                `SELECT * FROM destination
                 WHERE destination_id = $1 AND user_id = $2;`,
                [val, req.user.user_id]
            ));

            if (rows.length === 0) throw new APIError("Destination not exist", 404);
            return true;
        }),

    validatorMW
];

export const createDestinationValidator = [
    check("name")
        .notEmpty()
        .withMessage("Name must be not null")
        .isString()
        .withMessage("Name must be string")
        .isLength({ min: 2 })
        .withMessage("Name must be at least 2 char")
        .isLength({ max: 150 })
        .withMessage("Name must be at most 150 char"),

    check("description")
        .notEmpty()
        .withMessage("Description must be not null")
        .isString()
        .withMessage("Description must be string")
        .isLength({ min: 2 })
        .withMessage("Description must be at least 2 char")
        .isLength({ max: 1000 })
        .withMessage("Description must be at most 1000 char"),

    check("country")
        .notEmpty()
        .withMessage("Country must be not null")
        .isString()
        .withMessage("Country must be string")
        .isLength({ min: 1 })
        .withMessage("Country must be at least 1 char")
        .isLength({ max: 150 })
        .withMessage("Country must be at most 150 char"),

    check("city")
        .optional()
        .isString()
        .withMessage("City must be string")
        .isLength({ min: 1 })
        .withMessage("City must be at least 1 char")
        .isLength({ max: 150 })
        .withMessage("City must be at most 150 char"),

    validatorMW
];

export const updateDestinationValidator = [
    check("id")
        .notEmpty()
        .withMessage("Destination id must be not null")
        .isUUID()
        .withMessage("Invalid destination_id format!!")
        .custom(async (val, { req }) => {
            const isDestinationExist = await catchError(pool.query<Destination>(
                `SELECT * FROM destination
                 WHERE destination_id = $1 AND user_id = $2;`,
                [val, req.user.user_id]
            ));

            if (!isDestinationExist) throw new APIError("Destination not exist", 404);
            return true;
        }),

    check("name")
        .optional()
        .isString()
        .withMessage("Name must be string")
        .isLength({ min: 2 })
        .withMessage("Name must be at least 2 char")
        .isLength({ max: 150 })
        .withMessage("Name must be at most 150 char"),

    check("description")
        .optional()
        .isString()
        .withMessage("Description must be string")
        .isLength({ min: 2 })
        .withMessage("Description must be at least 2 char")
        .isLength({ max: 1000 })
        .withMessage("Description must be at most 1000 char"),

    check("country")
        .optional()
        .isString()
        .withMessage("Country must be string")
        .isLength({ min: 1 })
        .withMessage("Country must be at least 1 char")
        .isLength({ max: 150 })
        .withMessage("Country must be at most 150 char"),

    check("city")
        .optional()
        .isString()
        .withMessage("City must be string")
        .isLength({ min: 1 })
        .withMessage("City must be at least 1 char")
        .isLength({ max: 150 })
        .withMessage("City must be at most 150 char"),

    validatorMW
];

export const deleteDestinationValidator = [
    check("id")
        .notEmpty()
        .withMessage("Destination id must be not null")
        .isUUID()
        .withMessage("Invalid destination_id format!!")
        .custom(async (val, { req }) => {
            const { rows } = await catchError(pool.query<Destination>(
                `SELECT * FROM destination
                 WHERE destination_id = $1 AND user_id = $2;`,
                [val, req.user.user_id]
            ));

            if (rows.length === 0) throw new APIError("Destination not exist", 404);

            await catchError(pool.query<Itineraries>(
                `DELETE FROM itinerary
                 WHERE destination_id = $1 AND user_id = $2
                 RETURNING *;`,
                [val, req.user.user_id]
            ));

            return true;
        }),

    validatorMW
]