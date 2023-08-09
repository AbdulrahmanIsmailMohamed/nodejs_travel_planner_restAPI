import { Application } from "express";

import usersRoute from "./auth.routes";
import { protectRoute } from "../config/auth";
import destinationsRoute from "./destination.routes";
import itinerariesRoute from "../routes/itinerary.routes";

export const mountRoute = (app: Application) => {
    app
        .use("/auth", usersRoute)
        .use(protectRoute)
        .use("/destinations", destinationsRoute)
        .use("/itineraries", itinerariesRoute)
}