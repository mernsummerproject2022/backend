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

// Create model
const User = mongoose.model("user", UserSchema);

//Export model
module.exports = User;
