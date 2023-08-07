import { Router } from "express";

import { DestinationController } from "../controllers/destination.controller";

const router = Router();
const destinationController = new DestinationController()

router
    .route("/")
    .post(destinationController.createDestination)
    .get(destinationController.getDestinations)

router
    .route("/:id")
    .patch(destinationController.updateDestination)
    .get(destinationController.getDestination)
    .delete(destinationController.deleteDestination)

export default router;