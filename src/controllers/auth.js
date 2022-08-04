const UserModule = require("../models/user");
const User = UserModule.User;
import {
  ERROR_CODES
} from "../util/errors";
import { hashPassword} from "../util/hashPassword";
import tokenGenerator from "../util/tokenGenerator";

export const postUserSignup = async (req, res, next) => {
    const { email, confirmPassword } = req.body;
    let { password } = req.body;
    password = await hashPassword(password);
    const user = new User({
      email: email,
      password: password
    });

    const newUser = await user.save();
    return res.status(ERROR_CODES.CREATED).send(newUser);
};

export const postUserLogin = async (req, res, next) => {
    const { email, password } = req.body;
    const payload = {
      email: email
    };
    const token = tokenGenerator(payload);
    return res.status(ERROR_CODES.SUCCESS).send({ token });
};
