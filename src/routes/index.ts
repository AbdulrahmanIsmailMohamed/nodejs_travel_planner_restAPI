import { Application } from "express";

import usersRoute from "./users.routes";

export const mountRoute = (app: Application) => {
    app.use("/users", usersRoute);
}