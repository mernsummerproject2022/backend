import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { EVENT_SELECTOR } from "../util/constants";

const EventModule = require("../models/event");
const Event = EventModule.Event;
const InviteModule = require("../models/invite");
const Invite = InviteModule.Invite;

export function ValidId(param) {
    return mongoose.Types.ObjectId.isValid(param);
}

export async function ownerEvents(ownerId) {
    const objectId = new ObjectId(ownerId);
    return await Event.find({ 'owner._id': objectId });
}

export async function allEvents() {
    return await Event.find({}).select(EVENT_SELECTOR);
}

export async function oneEvent(eventId) {
    const objectId = new ObjectId(eventId);
    return await Event.findById(objectId);
}

export async function addInvite(event, user) {
    const newInvite = new Invite({accepted: false, declined: false, user: {email: user}});    
    return await Event.findOneAndUpdate({_id: new ObjectId(event)}, {$push: { invites: [newInvite] }}, {new: true});
}

export async function addRequest(event, user) {       
    return await Event.findOneAndUpdate({_id: new ObjectId(event)}, {$push: { requests: [{email: user}] }}, {new: true});
}

export function addEvent(event) {
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

    newEvent.save();

    return newEvent;
}

export async function acceptInvite(event, invite) {    
    var responseMessage;
    var responsePayload;

    const responseEvent = await Event.find({ _id: new ObjectId(event)},
         {
            invites: {
               $elemMatch: {
                  _id: new ObjectId(invite),
               }
            }
         });

    if(responseEvent[0].invites[0].declined) {
            responseMessage = "declined";
            responsePayload = {}
            return {message: responseMessage, payload: responsePayload};
    }

    if(responseEvent[0].invites[0].accepted) {
        responseMessage = "already accepted";
        responsePayload = {}
        return {message: responseMessage, payload: responsePayload};
    }

    if(!responseEvent[0].invites[0].accepted && !responseEvent[0].invites[0].declined) {
        responseMessage = "accepted";
        responsePayload = await Event.findOneAndUpdate(
            {
              _id: new ObjectId(event),
              'invites._id': invite,
            },
            {
              $set: { 'invites.$.accepted': true },
            },
            {
              new: true,
              runValidators: true,
              useFindAndModify: false,
            }
        );
        return {message: responseMessage, payload: responsePayload};
    }
    
}

export async function declineInvite(event, invite) {    
    var responseMessage;
    var responsePayload;

    const responseEvent = await Event.find({ _id: new ObjectId(event)},
         {
            invites: {
               $elemMatch: {
                  _id: new ObjectId(invite),
               }
            }
         });

    if(responseEvent[0].invites[0].accepted) {
            responseMessage = "accepted";
            responsePayload = {}
            return {message: responseMessage, payload: responsePayload};
    }

    if(responseEvent[0].invites[0].declined) {
        responseMessage = "already declined";
        responsePayload = {}
        return {message: responseMessage, payload: responsePayload};
    }

    if(!responseEvent[0].invites[0].declined && !responseEvent[0].invites[0].accepted) {
        responseMessage = "declined";
        responsePayload = await Event.findOneAndUpdate(
            {
              _id: new ObjectId(event),
              'invites._id': invite,
            },
            {
              $set: { 'invites.$.declined': true },
            },
            {
              new: true,
              runValidators: true,
              useFindAndModify: false,
            }
        );
        return {message: responseMessage, payload: responsePayload};
    }
    
}