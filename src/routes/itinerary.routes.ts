import { Router } from "express";

import { ItineraryController } from "../controllers/itinerary.controller";

import {
    createItineraryValidator,
    itinerariesValidator,
    itineraryIdValidator,
    updateItineraryValidator
} from "../utils/validators/itinerary.validator";

const router = Router({ mergeParams: true });
const itineraryController = new ItineraryController();

router
    .route("/")
    .post(createItineraryValidator, itineraryController.createItinerary)
    .get(itinerariesValidator, itineraryController.getItineraries) // nested route

router
    .route("/:itineraryId")
    .get(itineraryIdValidator, itineraryController.getItinerary)
    .patch(updateItineraryValidator, itineraryController.updateItinerary)
    .delete(itineraryIdValidator, itineraryController.deleteItinerary)

router.get("/get/:destinationId", itinerariesValidator, itineraryController.getItineraries)

export default router;