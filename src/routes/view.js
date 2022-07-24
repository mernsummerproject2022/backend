import { Router } from "express";
import {
    getEvent,
    putRequest,
    postInvite
  } from "../controllers/events";

const viewRouter = new Router();

viewRouter.get("/:id", getEvent);
viewRouter.put("/request/", putRequest);
viewRouter.post("/invite/", postInvite);

export default viewRouter;
