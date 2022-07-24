import mongoose from "mongoose";

const UserModule = require("../models/user");
const User = UserModule.User;

import ProblemError from "../util/ProblemError";
import {
  NO_TODO_FOUND,
  NO_MESSAGE_PROVIDED,
  INCORRECT_ID
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
      400,
      NO_MESSAGE_PROVIDED.TYPE,
      NO_MESSAGE_PROVIDED.DETAILS
    );
  if (password !== confirmPassword)
    throw new ProblemError(
      MESSAGE_TYPES.ERROR,
      400,
      "Passwords do not match",
      "Passwords do not match"
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
      400,
      NO_MESSAGE_PROVIDED.TYPE,
      NO_MESSAGE_PROVIDED.DETAILS
    );
  try {
    const user = await User.findOne({ email });
    if (!user)
      throw new ProblemError(
        MESSAGE_TYPES.ERROR,
        404,
        "User not found",
        "User not found"
      );
    const isMatch =  await comparePassword(password, user.password);
    if (!isMatch)
      throw new ProblemError(
        MESSAGE_TYPES.ERROR,
        401,
        "Incorrect password",
        "Incorrect password"
      );
    const token = tokenGenerator(user._id);
    return res.status(200).send({ token });
  } catch (error) {
    next(error);
  }
};
