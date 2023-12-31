import asyncHandler from 'express-async-handler';
import { NextFunction, Response } from "express";

import { DestinationService } from "../services/destination.service";
import { AuthenticatedRequest } from '../interfaces/authentication.interface';
import { APIError } from '../utils/apiError';

export class DestinationController {
    public destinationService: DestinationService;
    constructor() {
        this.destinationService = new DestinationService();
    }

    createDestination = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (req.user) {
            const newDestination = await this.destinationService.createDestination({ ...req.body, user_id: req.user.user_id });

            if (!newDestination) return next(new APIError("Can't create your destination", 400));
            res.status(201).json({ status: "Success", Destination: newDestination });
        }

        else next(new APIError("You're not register, please login!", 401))
    });

    updateDestination = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (req.user) {
            const destination = await this.destinationService.updateDestination({ ...req.body, user_id: req.user.user_id, destination_id: req.params.id });

            if (!destination) return next(new APIError("Your destination not exist", 404));
            res.status(200).json({ status: "Success", destination });
        }

        else next(new APIError("You're not register, please login!", 401))
    });

    deleteDestination = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (req.user) {
            const user_id = req.user.user_id!
            const destination_id = req.params.id

            const destination = await this.destinationService.deleteDestination(destination_id, user_id);
            if (!destination) return next(new APIError("Your destination not exist", 404));
            res.status(204).json({ status: "Success" });
        }

        else next(new APIError("You're not register, please login!", 401));
    });

    getDestinations = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (req.user) {
            const user_id = req.user.user_id!
            const page: number = parseInt(req.query.page as string) || 1;
            const pageSize: number = parseInt(req.query.pageSize as string) || 10;
            const keyword = req.query.keyword ? req.query.keyword.toString() : undefined;
            
            const result = await this.destinationService.getDestinations(user_id, page, pageSize, keyword);
            if (!result) return next(new APIError("Your destinations not exist", 404));
            res.status(200).json({
                status: "Success",
                Destinations: result.data,
                Pagination: {
                    Total: result.total,
                    currentPage: result.currentPage,
                    NextPage: result.nextPage,
                    PreviousPage: result.previousPage,
                }
            });
        }

        else next(new APIError("You're not register, please login!", 401));
    });

    getDestination = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (req.user) {
            const user_id = req.user.user_id!
            const destination_id = req.params.id

            const destination = await this.destinationService.getDestination(destination_id, user_id);
            if (!destination) return next(new APIError("Your destinations not exist", 404));
            res.status(200).json({ status: "Success", destination });
        }

        else next(new APIError("You're not register, please login!", 401));
    });

}