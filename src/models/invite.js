const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InviteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    event: {
        type: String,
        required: true
    },
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
