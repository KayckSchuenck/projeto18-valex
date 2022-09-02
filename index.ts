import express, {json} from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorHandlingMiddleware from './middlewares/errorHandler.js'
dotenv.config();

import router from "./routes/index.js";

const app = express();

app.use(json());
app.use(cors());
app.use(router);
app.use(errorHandlingMiddleware)

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
});