import { Router } from "express";
import {
    getAllEvents,
    getMyEvents,
    postEvent,
    getEvent,
    putRequest,
    postInvite
  } from "../controllers/events";

const eventRouter = new Router();

eventRouter.get("/", getAllEvents);

eventRouter.get("/my/:id", getMyEvents);
eventRouter.post("/my/", postEvent);

eventRouter.get("/view/:id", getEvent);
eventRouter.put("/view/request/", putRequest);
eventRouter.post("/view/invite/", postInvite);

export default eventRouter;