import { Application } from "express";

import usersRoute from "./auth.routes";

export const mountRoute = (app: Application) => {
    app.use("/users", usersRoute);
}