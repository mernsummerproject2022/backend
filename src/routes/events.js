import { Router } from "express";
import {
    getAllEvents
  } from "../controllers/events";

const eventRouter = new Router();

eventRouter.get("/", getAllEvents);

export default eventRouter;
