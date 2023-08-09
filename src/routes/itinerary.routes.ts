import { Router } from "express";

import { ItineraryController } from "../controllers/itinerary.controller";

import {
    createItineraryValidator,
    itineraryIdValidator,
    updateItineraryValidator
} from "../utils/validators/itinerary.validator";

const router = Router();
const itineraryController = new ItineraryController()

router.post("/", createItineraryValidator, itineraryController.createItinerary)

router
    .route("/:itineraryId")
    .get(itineraryIdValidator, itineraryController.getItinerary)
    .patch(updateItineraryValidator, itineraryController.updateItinerary)
    .delete(itineraryIdValidator, itineraryController.deleteItinerary)

router.get("/get/:destinationId", itineraryController.getItineraries)

export default router;