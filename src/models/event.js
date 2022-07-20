const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: false
  }
});

const TypeSchema = new Schema({
  name: String
});

const InviteSchema = new Schema({
  user: UserSchema,
  accepted: {
      type: Boolean,
      default: false,
      required: true
  }
});

const EventSchema = new Schema({
  name: String,
  description: String,
  dateTime: Date,
  deadline: Date,
  repeatEvery:Date,
  duration: Number,
  maxPlayers: Number,
  location: {
    name:  String,
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
module.exports = Event;
