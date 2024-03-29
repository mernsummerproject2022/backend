import { Router } from "express";
import {
    getEvent,
    putRequest,
    postInvite
  } from "../controllers/events";
import verifyUser from "../middleware/auth";

const viewRouter = new Router();

viewRouter.get("/:id", getEvent);
viewRouter.post("/request/", putRequest);
viewRouter.use(verifyUser);
viewRouter.post("/invite/", postInvite);

export default viewRouter;
