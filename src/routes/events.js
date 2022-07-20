import { Router } from "express";
import {
    getAllEvents,
    getMyEvents,
    postEvent,
    getEvent,
<<<<<<< HEAD
    postRequest,
=======
    putRequest,
>>>>>>> a19682fd5d2873c0a2466325791679ed91a98920
    postInvite
  } from "../controllers/events";

const eventRouter = new Router();

eventRouter.get("/", getAllEvents);

eventRouter.get("/my/:id", getMyEvents);
eventRouter.post("/my/", postEvent);

eventRouter.get("/view/:id", getEvent);
<<<<<<< HEAD
eventRouter.post("/view/request/", postRequest);
eventRouter.post("/view/invite/", postInvite);

export default eventRouter;
=======
eventRouter.put("/view/request/", putRequest);
eventRouter.post("/view/invite/", postInvite);

export default eventRouter;
>>>>>>> a19682fd5d2873c0a2466325791679ed91a98920
