import { Router } from "express";

import { ItineraryController } from "../controllers/itinerary.controller";

const router = Router();
const itineraryController = new ItineraryController()

router.post("/", itineraryController.createItinerary)

router
    .route("/:itineraryId")
    .get(itineraryController.getItinerary)
    .patch(itineraryController.updateItinerary)
    .delete(itineraryController.deleteItinerary)

router.get("/get/:destinationId", itineraryController.getItineraries)

export default router;