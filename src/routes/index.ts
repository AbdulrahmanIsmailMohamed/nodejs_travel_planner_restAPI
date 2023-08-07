import { Application } from "express";

import usersRoute from "./auth.routes";
import { protectRoute } from "../config/auth";
import destinationsRoute from "./destination.routes";

export const mountRoute = (app: Application) => {
    app.use("/users", usersRoute)

    app
        .use(protectRoute)
        .use("/destinations", destinationsRoute)
}