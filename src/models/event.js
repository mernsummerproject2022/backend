const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserModule = require("../models/user");
const UserSchema = UserModule.UserSchema;
const InviteModule = require("../models/invite");
const InviteSchema = InviteModule.InviteSchema;
const TypeModule = require("../models/eventype");
const TypeSchema = TypeModule.TypeSchema;

const EventSchema = new Schema({
  name: String,
  description: String,
  dateTime: Date,
  deadline: Date,
  repeatEvery: Date,
  duration: Number,
  maxPlayers: Number,
  location: {
    name: String,
    lat: Number,
    long: Number
  },
  owner: UserSchema,
  eventType: TypeSchema, 
  invites: [InviteSchema],
  reserveInvites: [UserSchema],
  requests: [UserSchema],
});

// Create model
const Event = mongoose.model("event", EventSchema);

//Export model
module.exports = {Event, EventSchema};
