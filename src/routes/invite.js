import { Router } from "express";
import {
    setDeclined,
    setAccepted
  } from "../controllers/invite";

const inviteRouter = new Router();

// params: event id & (unique) invite id 
// subject to change
inviteRouter.get("/accept/:event/:id", setAccepted);
inviteRouter.get("/decline/:event/:id", setDeclined);

export default inviteRouter;
