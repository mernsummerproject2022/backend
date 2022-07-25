import mongoose from "mongoose";
import ProblemError from "../util/ProblemError";
import {
} from "../util/errors";
import { MESSAGE_TYPES } from "../util/constants";

import { acceptInvite, declineInvite } from "../util/databaseOperations";

export const setAccepted = async (req, res, next) => {
    try {
        const response = await acceptInvite(req.params.event, req.params.id);
                return res.status(200).send(response);
      } catch (error) {
        next(error);
      }
};

export const setDeclined = async (req, res, next) => {
    try {
        const response = await declineInvite(req.params.event, req.params.id);
                return res.status(200).send(response);
      } catch (error) {
        next(error);
      }
};

