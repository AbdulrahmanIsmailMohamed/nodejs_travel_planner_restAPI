import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

import { NODE_ENV } from "./config/config";
import ErrorHandlingMW from "./middlewares/errorHandling";
import { APIError } from "./utils/apiError";
import { mountRoute } from "./routes";

const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

if (NODE_ENV === 'development') app.use(morgan("tiny"));

// routes
mountRoute(app)

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new APIError(`Can't Find This Route ${req.originalUrl}!!`, 404));
});

// Glopal error Handling in express
const errorHandling = (err: APIError, req: Request, res: Response, next: NextFunction) => {
    ErrorHandlingMW.handleError(err, req, res, next);
};
app.use(errorHandling);

export default app;