import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const UserModule = require("../models/user");
const User = UserModule.User;
import jwt from "jsonwebtoken";
import ProblemError from "../util/ProblemError";
import {
  NO_TODO_FOUND,
  NO_MESSAGE_PROVIDED,
  INCORRECT_ID
} from "../util/errors";
import { MESSAGE_TYPES } from "../util/constants";



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
  password = await bcrypt.hash(password, 10);
  const user = new User({
    email,
    password
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
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      throw new ProblemError(
        MESSAGE_TYPES.ERROR,
        401,
        "Incorrect password",
        "Incorrect password"
      );
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });
    return res.status(200).send({ token });
  } catch (error) {
    next(error);
  }
};
