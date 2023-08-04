import express from "express";
import cors from "cors";
import morgan from "morgan";

import { NODE_ENV, PORT } from "./config/config";

const app = express();

app.use(express.urlencoded({ extended: false, limit: '20k' }));
app.use(express.json({ limit: '20kp' }));
app.use(cors());

if (NODE_ENV === 'development') app.use(morgan("tiny"));

app.listen(PORT, () => {
    console.log(`link: http://localhost:${PORT}`);
    console.log(`The Server Runnig On Port : ${PORT}`);
});