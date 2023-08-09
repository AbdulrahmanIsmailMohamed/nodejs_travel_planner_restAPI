import asyncHandler from 'express-async-handler';
import { NextFunction, Response } from 'express';

import { ItineraryService } from '../services/itinerary.service';
import { AuthenticatedRequest } from '../interfaces/authentication.interface';
import { APIError } from '../utils/apiError';

export class ItineraryController {
    public itinerary: ItineraryService
    constructor() {
        this.itinerary = new ItineraryService();
    }

    createItinerary = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (req.user) {
            const newItinerary = await this.itinerary.createItinerary({ ...req.body, user_id: req.user.user_id })

            if (!newItinerary) return next(new APIError("Can't create your Itinerary", 400));
            res.status(201).json({
                status: "Success",
                newItinerary
            })
        }

        else return next(new APIError("you're not register", 401))
    });

    updateItinerary = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (req.user) {
            const itinerary = await this.itinerary.updateItinerary({ ...req.body, user_id: req.user.user_id, itinerary_id: req.params.itineraryId })

            if (!itinerary) return next(new APIError("Can't update your Itinerary", 400));
            res.status(200).json({
                status: "Success",
                itinerary
            });
        }

        else return next(new APIError("you're not register", 401))
    });

    deleteItinerary = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (req.user!) {
            const user_id = req.user.user_id!
            const itinerary_id = req.params.itineraryId

            const itinerary = await this.itinerary.deleteItinerary(itinerary_id, user_id)
            if (!itinerary) return next(new APIError("Your itinerary not exist!", 404));
            res.status(204).json({ status: "Success" });
        }

        else return next(new APIError("you're not register", 401))
    });

    getItinerary = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (req.user!) {
            const user_id = req.user.user_id!
            const itinerary_id = req.params.itineraryId

            const itinerary = await this.itinerary.getItinerary(itinerary_id, user_id)
            if (!itinerary) return next(new APIError("Your itinerary not exist!", 404));
            res.status(200).json({ status: "Success", itinerary });
        }

        else return next(new APIError("you're not register", 401))
    });

    getItineraries = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (req.user!) {
            const user_id = req.user.user_id!
            const destination_id = req.params.destinationId

            const itineraries = await this.itinerary.getItineraries(destination_id, user_id)
            if (!itineraries) return next(new APIError("Your itinerary not exist!", 404));
            res.status(200).json({ status: "Success", itineraries });
        }

        else return next(new APIError("you're not register", 401))
    });

}