import { Router } from "express";
import {
    getAllEvents,
    postEvent
  } from "../controllers/events";
import verifyUser from "../middleware/auth";
import eventInput from "../middleware/eventInputValidation";

const eventRouter = new Router();

eventRouter.get("/", getAllEvents);
eventRouter.use(verifyUser);
eventRouter.get("/:userid", getAllEvents);
eventRouter.post("/",eventInput, postEvent);

export default eventRouter;
