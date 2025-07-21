import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { urlRouter } from "./app/modules/url/url.router";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { swaggerOptions } from "./config/swagger";

const app = express();

app.set("trust proxy", true);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsDoc(swaggerOptions))
);

app.use("/urls", urlRouter);

// global error handler
app.use(globalErrorHandler);

export default app;
