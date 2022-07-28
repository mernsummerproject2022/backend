import validator from "validator";
import { userExists, userIdExists } from "../database/databaseOperations";
import { ERROR_CODES, INCORRECT_ID, NO_USER_FOUND, WRONG_DEADLINE , NO_INPUT_PROVIDED} from "../util/errors";
import { ValidId } from "../database/databaseOperations";
import { ObjectId } from "mongodb";
import { MESSAGE_TYPES } from "../util/constants";
import ProblemError from "../util/ProblemError";

// event input middleware
const UserModule = require("../models/user");
const UserSchema = UserModule.UserSchema;
const InviteModule = require("../models/invite");
const InviteSchema = InviteModule.InviteSchema;
const TypeModule = require("../models/eventype");
const TypeSchema = TypeModule.TypeSchema;

export default async (req, res, next) => {
  try {
    const {
      name,
      description,
      dateTime,
      deadline,
      duration,
      maxPlayers,
      location,
      owner,
      eventType
    } = req.body;
    if (
      typeof name + "" != "string" ||
      typeof description + "" != "string" ||
      typeof dateTime + "" != "string" ||
      typeof deadline + "" != "string" ||
      typeof duration + "" != "number" ||
      typeof maxPlayers + "" != "number" ||
      typeof location.name + "" != "string" ||
      typeof owner.id + "" != "string" ||
      typeof owner.email + "" != "string" ||
      typeof eventType + "" != "string"
    ) {
        throw new ProblemError(
            MESSAGE_TYPES.ERROR,
            ERROR_CODES.BAD_REQUEST,
            NO_INPUT_PROVIDED.TYPE,
            NO_INPUT_PROVIDED.DETAILS
          );
    }

    if (
      validator.isEmpty(name) ||
      validator.isEmpty(description) ||
      validator.isEmpty(dateTime + "") ||
      validator.isEmpty(deadline + "") ||
      validator.isEmpty(duration + "") ||
      validator.isEmpty(maxPlayers + "") ||
      validator.isEmpty(location.name) ||
      validator.isEmpty(owner.id) ||
      validator.isEmpty(owner.email) ||
      validator.isEmpty(eventType)
    ) {
        throw new ProblemError(
            MESSAGE_TYPES.ERROR,
            ERROR_CODES.BAD_REQUEST,
            NO_INPUT_PROVIDED.TYPE,
            NO_INPUT_PROVIDED.DETAILS
          );
    }

    if (dateTime > deadline) {
        throw new ProblemError(
            MESSAGE_TYPES.ERROR,
            ERROR_CODES.BAD_REQUEST,
            WRONG_DEADLINE.TYPE,
            WRONG_DEADLINE.DETAILS
          );
    }

    const user = await userExists(owner.email);
    if (!user) {
        throw new ProblemError(
            MESSAGE_TYPES.ERROR,
            ERROR_CODES.BAD_REQUEST,
            NO_USER_FOUND.TYPE,
            NO_USER_FOUND.DETAILS
          );
    }

    if (!ValidId(owner.id)) {
        throw new ProblemError(
            MESSAGE_TYPES.ERROR,
            ERROR_CODES.BAD_REQUEST,
            INCORRECT_ID.TYPE,
            INCORRECT_ID.DETAILS
          );
    }

    const objectId = new ObjectId(owner.id);
    const userID = await userIdExists(objectId);
    if (!userID) {
        throw new ProblemError(
            MESSAGE_TYPES.ERROR,
            ERROR_CODES.BAD_REQUEST,
            NO_USER_FOUND.TYPE,
            NO_USER_FOUND.DETAILS
          );
    }
  } catch (error) {
    next(error);
  }

  next();
};
