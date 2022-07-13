const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  repeatEvery: {
    type: Date, 
    required: true
  },
  duration: {
    type: Number, 
    required: true
  },
  maxPlayers: {
    type: Number, 
    required: true
  },
  location: {
    name: {
      type: String,
      required: true
    },
    lat: {
      type: Number,
      required: false
    },
    long: {
      type: Number,
      required: false
    }
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    //here true
    required: false
  },
  eventType: {
    type: String,
    enum: ['football', 'basketball', 'tennis', 'volleyball', 'rugby', 'cycling', 'swimming', 'badminton', 'skiing', 'bowling'],
    required: true
  }, 
invites: [{
  invite: {
    type: Schema.Types.ObjectId,
    ref: 'Invite'
  }
}],
reserveInvites: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
}],
requests: [{
  type: Schema.Types.ObjectId,
  ref: 'User'
}],
});

// Create model
const Event = mongoose.model("event", EventSchema);

//Export model
module.exports = Event;
