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

const InviteSchema = new Schema({
    user: UserSchema,
    accepted: {
        type: Boolean,
        default: false,
        required: true
    }
});

// Create model
const Invite = mongoose.model("invite", InviteSchema);

//Export model
module.exports = Invite;
