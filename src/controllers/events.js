import mongoose from "mongoose";
import ProblemError from "../util/ProblemError";
import {
} from "../util/errors";
import { MESSAGE_TYPES } from "../util/constants";
const EventModule = require("../models/event");
const Event = EventModule.Event;
const InviteModule = require("../models/invite");
const Invite = InviteModule.Invite;
import { ObjectId } from "mongodb";

// get all events from the DB
export const getAllEvents = async (_req, res, next) => {
  try {
    const events = await Event.find({}).select({ "name": 1,"description": 1,"dateTime": 1,"location": 1,"maxPlayers": 1, "owner": 1, "eventType": 1});
      if (!events.length)
        throw new ProblemError(
          
        );
      return res.status(200).send(events);
    } catch (error) {
      next(error);
    }
};

// get events created by a user with given id
export const getMyEvents = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ProblemError(
        
      );
    }

    const objectId = new ObjectId(id);
    const events = await Event.find({ 'owner._id': objectId });
    if (!events) {
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

    const eType = event.eventType; 
    const email = event.owner.email; 
    const id = new ObjectId(event.owner.id);

    const newEvent = new Event({
      name: event.name, 
      description: event.description, 
      dateTime: event.dateTime, 
      deadline: event.deadline, 
      repeatEvery: event.repeatEvery, 
      duration: event.duration, 
      maxPlayers: event.maxPlayers, 
      location: {
        name: event.location.name, 
        lat: event.location.lat,
        long: event.location.long,
      },
      invites: [],
      reserveInvites:[],
      requests: [],
      eventType: {name: eType},
      owner: {email: email, _id: id}
    });

    await newEvent.save(function(err){
      if (err) console.log('Error saving event');
  });
    return res.status(200).send(newEvent);
  } catch (error) {
    next(error);
  }      
};

export const getEvent = async (_req, res, next) => {
    
};

export const putRequest = async (req, res, next) => {
    
    
};

// update an event by adding a new invite to it
export const postInvite = async (req, res, next) => {
  try {
    const invite = req.body;
    const email = invite.user;
    console.log(email);

    const newInvite = new Invite({accepted: false, user: {email: email}});    
   
    await Event.findOneAndUpdate({_id: new ObjectId(invite.event)}, {$push: { invites: [newInvite] }});

    return res.status(200).send(newInvite);
  } catch (error) {
    next(error);
  }      
};
