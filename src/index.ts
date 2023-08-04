import express from "express";
import cors from "cors";
import morgan from "morgan";

import { NODE_ENV, PORT } from "./config/config";
import usersRoute from "./routes/users.routes";

const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cors());

if (NODE_ENV === 'development') app.use(morgan("tiny"));

app.use("/users", usersRoute);

app.listen(PORT, () => {
    console.log(`link: http://localhost:${PORT}`);
    console.log(`The Server Runnig On Port : ${PORT}`);
});