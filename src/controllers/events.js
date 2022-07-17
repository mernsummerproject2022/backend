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

export const getAllEvents = async (_req, res, next) => {
    try {
        const events = await Event.find({});
        if (!events.length)
          throw new ProblemError(
            MESSAGE_TYPES.ERROR,
            404,
            NO_TODO_FOUND.TYPE,
            NO_TODO_FOUND.DETAILS
          );
        return res.status(200).send(events);
      } catch (error) {
        next(error);
      }
};

export const getMyEvents = async (_req, res, next) => {
   
};

export const postEvent = async (_req, res, next) => {
      
};

export const getEvent = async (_req, res, next) => {
    
};

export const postRequest = async (_req, res, next) => {
    
};

export const postInvite = async (_req, res, next) => {
   
};
