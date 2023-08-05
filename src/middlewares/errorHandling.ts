import { NextFunction, Request, Response } from "express";
import { APIError } from "../utils/apiError";
import { NODE_ENV } from "../config/config";

class ErrorHandlingMW {
    public static forDevelopment(err: APIError, res: Response) {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    }

    public static forProduction(err: APIError, res: Response) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }

    public static handleError(
        err: APIError,
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        err.status = err.status || 'Error';
        err.statusCode = err.statusCode || 500;

        if (NODE_ENV === 'development') {
            ErrorHandlingMW.forDevelopment(err, res);
        } else {
            ErrorHandlingMW.forProduction(err, res);

        }
    }
}

export default ErrorHandlingMW