import Router from "express";
import {
    postUserSignup,
    postUserLogin
} from "../controllers/user";

const userRouter = new Router();

userRouter.post("/signup", postUserSignup);
userRouter.post("/login", postUserLogin);

export default userRouter;
