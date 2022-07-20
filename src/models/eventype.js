<<<<<<< HEAD
=======

>>>>>>> a19682fd5d2873c0a2466325791679ed91a98920
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TypeSchema = new Schema({
    name: {
      type: String,
      required: true
    }
});

// Create model
const Type = mongoose.model("eventype", TypeSchema);

//Export model
<<<<<<< HEAD
module.exports = Type;
=======
module.exports = Type;
>>>>>>> a19682fd5d2873c0a2466325791679ed91a98920
