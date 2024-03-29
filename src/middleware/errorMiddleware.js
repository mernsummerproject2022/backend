import { HttpError } from "express-openapi-validator/dist/framework/types";
import { SWAGGER_ERROR } from "../util/errors";
import {ERROR_CODES} from "../util/errors";

/**
 * @description Express middleware to handle application errors
 */
export default (err, _req, res, next) => {
  const status = err.status || ERROR_CODES.INTERNAL_SERVER_ERROR;
  let type = err.type || "error";
  let short = err.short || "error";
  let detail = err.detail || "Something unexpected happened";
  const placement = err.placement || "global";

  if (err instanceof HttpError) {
    type = SWAGGER_ERROR.TYPE;
    detail = `Request${err.errors[0].path} ${err.errors[0].message}`;
  }
  if(short==="invite_error"){
    return res.status(status).json({
      "Error":detail
    });
  }
  return res.status(status).json({
    status,
    type,
    short,
    detail,
    placement
  });
};
