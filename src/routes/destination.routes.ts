import { Router } from "express";

import { DestinationController } from "../controllers/destination.controller";
import { createDestinationValidator, deleteDestinationValidator, destinationIdValidator, updateDestinationValidator } from "../utils/validators/destination.validator";

const router = Router();
const destinationController = new DestinationController()

router
    .route("/")
    .post(createDestinationValidator, destinationController.createDestination)
    .get(destinationController.getDestinations)

router
    .route("/:id")
    .patch(updateDestinationValidator, destinationController.updateDestination)
    .get(destinationIdValidator, destinationController.getDestination)
    .delete(deleteDestinationValidator, destinationController.deleteDestination)

export default router;