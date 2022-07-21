import express from "express";
import cors from "cors";
import { serve, setup } from "swagger-ui-express";
import * as OpenApiValidator from "express-openapi-validator";
import swaggerDocument from "../../swagger/spec.yaml";
import errorMiddleware from "../middleware/errorMiddleware";
import healthRouter from "../routes/health";
import eventRouter from "../routes/events";
import userRouter from "../routes/user";
import myRouter from "../routes/my";
import viewRouter from "../routes/view";


export class Server {
  app = null;

  bootstrap() {
    this.app = express();

    this.app.use(express.json());
    this.app.use(cors());

   
    // const IS_NOT_PRODUCTION = process.env.NODE_ENV !== "production";
    // if (IS_NOT_PRODUCTION) {
    //   this.app.use("/docs", serve, setup(swaggerDocument));
    // }

    // //  Swagger error validator
    // this.app.use(
    //   OpenApiValidator.middleware({
    //     apiSpec: swaggerDocument,
    //     validateRequests: true,
    //     validateResponses: true
    //   })
    // );

    //  Declaring API routes
    this.app.use("/health", healthRouter);
    this.app.use("/events", eventRouter);
    this.app.use("/user", userRouter);
    this.app.use("/my", myRouter);
    this.app.use("/view", viewRouter);

    //  Error handling
    // this.app.use(errorMiddleware);
  }
  listen(port) {
    this.app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }
}
