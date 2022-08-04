import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { EVENT_SELECTOR } from "../util/constants";

const EventModule = require("../models/event");
const Event = EventModule.Event;
const InviteModule = require("../models/invite");
const Invite = InviteModule.Invite;
const UserModule = require("../models/user");
const User = UserModule.User;

export function ValidId(param) {
  return mongoose.Types.ObjectId.isValid(param);
}

export async function userExists(email) {
  return await User.findOne({ email });
}
export async function userId(email){
  return await User.findOne({ email }).select("_id");
}
export async function userIdExists(id) {
  return await User.findOne({ _id: id });
}
export async function ownerEvents(ownerId) {
  const objectId = new ObjectId(ownerId);
  return await Event.find({ "owner._id": objectId });
}

export async function allEvents() {
  return await Event.find({}).select(EVENT_SELECTOR);
}

export async function oneEvent(eventId) {
  const objectId = new ObjectId(eventId);
  return await Event.findById(objectId);
}

export async function addInvite(eventId, userEmail) {
  const newInvite = new Invite({
    accepted: "undefined",
    user: { email: userEmail }
  });

  const responseEvent = await Event.find(
    { _id: new ObjectId(eventId) },
    {
      invites: {
        $elemMatch: {
          "user.email": userEmail
        }
      }
    }
  );

  const eventRequests = await Event.find(
    { _id: new ObjectId(eventId) },
    {
      requests: {
        $elemMatch: {
          email: userEmail
        }
      }
    }
  );

  if (eventRequests.length) {
    if (eventRequests[0].invites[0]) {
      //remove request
      await Event.updateOne(
        { _id: new ObjectId(eventId) },
        { $pull: { requests: { email: userEmail } } }
      );
    }
  }

  if (responseEvent.length) {
    if (responseEvent[0].invites[0]) {
      return "already invited";
    }
  }

  return await Event.findOneAndUpdate(
    { _id: new ObjectId(eventId) },
    { $push: { invites: [newInvite] } },
    { new: true }
  );
}

export async function addRequest(event, user) {
  return await Event.findOneAndUpdate(
    { _id: new ObjectId(event) },
    { $push: { requests: [{ email: user }] } },
    { new: true }
  );
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
      long: event.location.long
    },
    invites: [],
    reserveInvites: [],
    requests: [],
    eventType: { name: eType },
    owner: { email: email, _id: id }
  });

  newEvent.save();

  return newEvent;
}

export async function updateInviteStatus(eventId, inviteId, accept) {
  let responseMessage = "invite not found";
  let responsePayload = {};

  const eventToUpdate = await Event.find(
    { _id: new ObjectId(eventId) },
    {
      invites: {
        $elemMatch: {
          _id: new ObjectId(inviteId)
        }
      }
    }
  );
  const fullEvent = await Event.find({ _id: new ObjectId(eventId) });

  if (eventToUpdate.length) {
    if (eventToUpdate[0].invites.length) {
      if (eventToUpdate[0].invites[0].accepted === "declined") {
        responseMessage = accept ? "declined" : "already declined";
        responsePayload = {};
      }

      if (eventToUpdate[0].invites[0].accepted === "accepted") {
        responseMessage = accept ? "already accepted" : "accepted";
        responsePayload = {};
      }

      if (eventToUpdate[0].invites[0].accepted === "undefined") {
        const deadline = new Date(fullEvent[0].deadline);
        const now = new Date();
        if (now <= deadline) {
          var participants = 0;
          fullEvent[0].invites.forEach(function (i) {
            let acc = i.accepted === "accepted" ? 1 : 0;
            participants = participants + acc;
          });

          if (participants < fullEvent[0].maxPlayers) {
            responseMessage = accept ? "accepted" : "declined";
            responsePayload = await Event.findOneAndUpdate(
              {
                _id: new ObjectId(eventId),
                "invites._id": inviteId
              },
              {
                $set: { "invites.$.accepted": accept ? "accepted" : "declined" }
              },
              {
                new: true,
                runValidators: true,
                useFindAndModify: false
              }
            );
          } else {
            responseMessage = "participants limit exceeded";
          }
        } else {
          responseMessage = "deadline exceeded";
        }
      }
    }
  }
  return { message: responseMessage, payload: responsePayload };
}
