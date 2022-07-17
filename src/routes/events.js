import { Router } from "express";
import {
    getAllEvents,
    getMyEvents,
    postEvent,
    getEvent,
    postRequest,
    postInvite
  } from "../controllers/events";

const eventRouter = new Router();

eventRouter.get("/", getAllEvents);

eventRouter.get("/my/:id", getMyEvents);
eventRouter.post("/my/", postEvent);

eventRouter.get("/view/:id", getEvent);
eventRouter.post("/view/request/", postRequest);
eventRouter.post("/view/invite/", postInvite);

export default eventRouter;
