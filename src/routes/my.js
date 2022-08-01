import { Router } from "express";
import {
    getMyEvents,
    postEvent
  } from "../controllers/events";
import verifyUser from "../middleware/auth";

const myRouter = new Router();

myRouter.use(verifyUser);
myRouter.get("/:id", getMyEvents);
myRouter.post("/", postEvent);

export default myRouter;
