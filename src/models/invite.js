const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserModule = require("../models/user");
const UserSchema = UserModule.UserSchema;

const InviteSchema = new Schema({
    user: UserSchema,
    accepted: {
        type: String,
        default: 'undefined',
        required: true
    }
});

// Create model
const Invite = mongoose.model("invite", InviteSchema);

//Export model
module.exports = {Invite, InviteSchema};
