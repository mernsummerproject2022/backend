const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TypeSchema = new Schema({
    name: String
});

// Create model
const Type = mongoose.model("eventype", TypeSchema);

//Export model
module.exports = {Type, TypeSchema};
