import { Router } from "express";
import {
    getAllEvents,
    postEvent
  } from "../controllers/events";

const eventRouter = new Router();

eventRouter.get("/", getAllEvents);
eventRouter.get("/:userid", getAllEvents);
eventRouter.post("/", postEvent);

export default eventRouter;
