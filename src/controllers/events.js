import ProblemError from "../util/ProblemError";
import { MESSAGE_TYPES } from "../util/constants";
import { INCORRECT_ID, ERROR_CODES, NO_EVENT_FOUND } from "../util/errors"
import { ValidId, ownerEvents, allEvents, oneEvent, addInvite, addEvent, addRequest, markSent } from "../database/databaseOperations";
import mailer from "../mailsender/mailer";

// get all events from the DB || events owner by userid
export const getAllEvents = async (req, res, next) => {
  try {
    const param = req.params.userid;
    var events;

    if(typeof param !== 'undefined') {
      if (!ValidId(param)) 
        throw new ProblemError(
          MESSAGE_TYPES.ERROR,
          ERROR_CODES.BAD_REQUEST,
          INCORRECT_ID.TYPE,
          INCORRECT_ID.DETAILS
        );
      
      events = await ownerEvents(param);
    } else {
      events = await allEvents();
    }

    if (!events.length)
        throw new ProblemError(
          MESSAGE_TYPES.ERROR,
          ERROR_CODES.NOT_FOUND,
          NO_EVENT_FOUND.TYPE,
          NO_EVENT_FOUND.DETAILS
        );

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
        ERROR_CODES.BAD_REQUEST,
        INCORRECT_ID.TYPE,
        INCORRECT_ID.DETAILS
      );
    const event = await oneEvent(id);
    if (!event)
      throw new ProblemError(
        MESSAGE_TYPES.ERROR,
        ERROR_CODES.NOT_FOUND,
        NO_EVENT_FOUND.TYPE,
        NO_EVENT_FOUND.DETAILS
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
        ERROR_CODES.BAD_REQUEST,
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
    if (!ValidId(invite.event))
      throw new ProblemError(
        MESSAGE_TYPES.ERROR,
        ERROR_CODES.BAD_REQUEST,
        INCORRECT_ID.TYPE,
        INCORRECT_ID.DETAILS
      );

    const responseEvent = await addInvite(invite.event, invite.user);

    if(typeof responseEvent !== 'string'){
      const responseInvite = responseEvent.invites.find(i => i.user.email === invite.user);
      mailer(responseEvent, responseInvite);    
    }
  
    return res.status(200).send(responseEvent);
  } catch (error) {
    next(error);
  }      
};
