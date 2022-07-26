import ProblemError from "../util/ProblemError";
import { ERROR_CODES, INCORRECT_ID } from "../util/errors";
import { MESSAGE_TYPES } from "../util/constants";
import { updateInviteStatus, ValidId } from "../database/databaseOperations";

export const setAccepted = async (req, res, next) => {
    try {
      if (!ValidId(req.params.event) || !ValidId(req.params.id))
      throw new ProblemError(
        MESSAGE_TYPES.ERROR,
        ERROR_CODES.BAD_REQUEST,
        INCORRECT_ID.TYPE,
        INCORRECT_ID.DETAILS
      );

      const response = await updateInviteStatus(req.params.event, req.params.id, true);
      return res.status(200).send(response);
    } catch (error) {
        next(error);
      }
};

export const setDeclined = async (req, res, next) => {
    try {
      if (!ValidId(req.params.event) || !ValidId(req.params.id))
      throw new ProblemError(
        MESSAGE_TYPES.ERROR,
        ERROR_CODES.BAD_REQUEST,
        INCORRECT_ID.TYPE,
        INCORRECT_ID.DETAILS
      );
      const response = await updateInviteStatus(req.params.event, req.params.id, false);
      return res.status(200).send(response);
    } catch (error) {
        next(error);
      }
};

