import mongoose from "mongoose";
import Event from "../models/event";
import User from "../models/user";
import ProblemError from "../util/ProblemError";
import {
  NO_TODO_FOUND,
  NO_MESSAGE_PROVIDED,
  INCORRECT_ID
} from "../util/errors";
import { MESSAGE_TYPES } from "../util/constants";
import { ObjectId } from "mongodb";

export const getAllEvents = async (_req, res, next) => {

};

export const getMyEvents = async (_req, res, next) => {
   
};

export const postEvent = async (req, res, next) => {
 
};

export const getEvent = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new ProblemError(
        MESSAGE_TYPES.ERROR,
        400,
        INCORRECT_ID.TYPE,
        INCORRECT_ID.DETAILS
      );
    const event = await Event.findById(id);
    if (!event)
      throw new ProblemError(
        MESSAGE_TYPES.ERROR,
        404,
        NO_TODO_FOUND.TYPE,
        NO_TODO_FOUND.DETAILS
      );
    return res.status(200).send(event);
  } catch (error) {
    next(error);

  }
    
};

export const putRequest = async (req, res, next) => {
  try {
    const request = req.body;
    if (!mongoose.Types.ObjectId.isValid(request.id))
      throw new ProblemError(
        MESSAGE_TYPES.ERROR,
        400,
        INCORRECT_ID.TYPE,
        INCORRECT_ID.DETAILS
      );
    const event = await Event.findById(request.id);
    if (!event)
      throw new ProblemError(
        MESSAGE_TYPES.ERROR,
        404,
        NO_TODO_FOUND.TYPE,
        NO_TODO_FOUND.DETAILS
      );
    
      event.requests.push(request.requests);
   
    const updatedEvent = await event.save();
    return res.status(200).send(updatedEvent);
  } catch (error) {
    next(error);
  }   
    
};

export const postInvite = async (_req, res, next) => {
   
};
