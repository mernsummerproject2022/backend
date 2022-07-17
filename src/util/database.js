const MONGO_HOSTNAME = "127.0.0.1";
const MONGO_PORT = "27017";

/*
const username = "projectDB";
const password = "projectDBpass";
const cluster = "cluster0.4jlsc";
const dbname = "projectDB";
export const dbURL = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/?retryWrites=true&w=majority`;
*/
    
export const dbURL = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}`;
