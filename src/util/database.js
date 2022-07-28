require("dotenv").config(); 
export const dbURL = `mongodb://${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}`;
