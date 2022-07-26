const UserModule = require("../models/user");
const User = UserModule.User;

import ProblemError from "../util/ProblemError";
import {
  NO_INPUT_PROVIDED,
  ERROR_CODES,
  NO_USER_FOUND,
  INCORRECT_PASSWORD,
  NOT_MATCHING
} from "../util/errors";
import { MESSAGE_TYPES} from "../util/constants";
import {hashPassword , comparePassword } from "../util/hashPassword";
import tokenGenerator from "../util/tokenGenerator";


export const postUserSignup = async (req, res, next) => {
  const { email, confirmPassword } = req.body;
  let { password } = req.body;
  if (!email || !password || !confirmPassword)
    throw new ProblemError(
      MESSAGE_TYPES.ERROR,
      ERROR_CODES.BAD_REQUEST,
      NO_INPUT_PROVIDED.TYPE,
      NO_INPUT_PROVIDED.DETAILS
    );
  if (password !== confirmPassword)
    throw new ProblemError(
      MESSAGE_TYPES.ERROR,
      ERROR_CODES.BAD_REQUEST,
      NOT_MATCHING.TYPE,
      NOT_MATCHING.DETAILS
    );
  password = await hashPassword(password);
  const user = new User({
    email:email,
    password:password
  });
  try {
    const newUser = await user.save();
    return res.status(201).send(newUser);
  } catch (error) {
    next(error);
  }
};

export const postUserLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new ProblemError(
      MESSAGE_TYPES.ERROR,
      ERROR_CODES.BAD_REQUEST,
      NO_INPUT_PROVIDED.TYPE,
      NO_INPUT_PROVIDED.DETAILS
    );
  try {
    const user = await User.findOne({ email });
    if (!user)
      throw new ProblemError(
        MESSAGE_TYPES.ERROR,
        ERROR_CODES.NOT_FOUND,
        NO_USER_FOUND.TYPE,
        NO_USER_FOUND.DETAILS
      );
    const isMatch =  await comparePassword(password, user.password);
    if (!isMatch)
      throw new ProblemError(
        MESSAGE_TYPES.ERROR,
        ERROR_CODES.UNAUTHORIZED,
        INCORRECT_PASSWORD.TYPE,
        INCORRECT_PASSWORD.DETAILS
      );
    const token = tokenGenerator(user._id);
    return res.status(200).send({ token });
  } catch (error) {
    next(error);
  }
};
