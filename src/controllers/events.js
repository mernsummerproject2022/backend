import mongoose from "mongoose";
import ProblemError from "../util/ProblemError";
import {

} from "../util/errors";
import { MESSAGE_TYPES } from "../util/constants";
import {INCORRECT_ID} from "../util/errors"
import { ValidId, ownerEvents, allEvents, oneEvent, addInvite, addEvent, addRequest } from "../util/databaseOperations";

// get all events from the DB || events owner by userid
export const getAllEvents = async (req, res, next) => {
  try {
    const param = req.params.userid;
    var events;

    if(typeof param !== 'undefined') {
      if (!ValidId(param)) {
        throw new ProblemError(
          
        );
      }

      events = await ownerEvents(param);

      if (!events) {
        throw new ProblemError(
          
        );
      }
    } else {
      events = await allEvents();

      if (!events.length)
        throw new ProblemError(
          
        );
    }
      return res.status(200).send(events);
    } catch (error) {
      next(error);
    }
};

// save an event
export const postEvent = async (req, res, next) => {
  try {
    const event = req.body;
    const newEvent = addEvent(event);
    return res.status(200).send(newEvent);
  } catch (error) {
    next(error);
  }      
};

export const getEvent = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!ValidId(id))
      throw new ProblemError(
        MESSAGE_TYPES.ERROR,
        400,
        INCORRECT_ID.TYPE,
        INCORRECT_ID.DETAILS
      );
    const event = await oneEvent(id);
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
    if (!ValidId(request.event))
      throw new ProblemError(
        MESSAGE_TYPES.ERROR,
        400,
        INCORRECT_ID.TYPE,
        INCORRECT_ID.DETAILS
      );
    const updatedEvent = await addRequest(request.event, request.user);

    return res.status(200).send(updatedEvent);
  } catch (error) {
    next(error);
  }   

};

// update an event by adding a new invite to it
export const postInvite = async (req, res, next) => {
  try {
    const invite = req.body;
    const response = await addInvite(invite.event, invite.user);

    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }      
};
