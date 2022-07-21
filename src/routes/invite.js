import { Router } from "express";
import {
    acceptInvite,
    declineInvite
  } from "../controllers/invite";

const inviteRouter = new Router();

// params: event id & (unique) invite id 
// subject to change
inviteRouter.get("/accept/:event&:id", acceptInvite);
inviteRouter.get("/decline/:event&:id", declineInvite);

export default inviteRouter;
