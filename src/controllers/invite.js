import ProblemError from "../util/ProblemError";
import { ERROR_CODES, INCORRECT_ID } from "../util/errors";
import { MESSAGE_TYPES, frontend_URL } from "../util/constants";
import { eventIdExists, updateInviteStatus, userIdExists, ValidId } from "../database/databaseOperations";

export const setAccepted = async (req, res, next) => {
  try {
    if (!ValidId(req.params.event) || !ValidId(req.params.id))
     { throw new ProblemError(
        MESSAGE_TYPES.ERROR,
        ERROR_CODES.BAD_REQUEST,
        "invite_error",
        INCORRECT_ID.DETAILS
      );
     }
      const eventExists=await eventIdExists(req.params.event);
      const userExists=await userIdExists(req.params.event,req.params.id);
      if (eventExists===null ||  userExists[0].invites.length===0)
      {throw new ProblemError(
        MESSAGE_TYPES.ERROR,
        ERROR_CODES.BAD_REQUEST,
        "invite_error",
        "Event or invite does not exist"
      );
      }

    const response = await updateInviteStatus(
      req.params.event,
      req.params.id,
      true
    );
    
    return res.redirect(frontend_URL + "/view/" + req.params.event);
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
    const response = await updateInviteStatus(
      req.params.event,
      req.params.id,
      false
    );
    return res.redirect(frontend_URL + "/view/" + req.params.event);
  } catch (error) {
    next(error);
  }
};
