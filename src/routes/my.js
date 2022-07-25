import { Router } from "express";
import {
    getMyEvents,
    postEvent
  } from "../controllers/events";

const myRouter = new Router();

myRouter.get("/:id", getMyEvents);
myRouter.post("/", postEvent);

export default myRouter;
