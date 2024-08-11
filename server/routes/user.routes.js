const express = require("express");
const UserRouter = express.Router();
const {
  register,
  SignIn,
  googleAuth,
} = require("../controllers/user.controller");

UserRouter.post("/register", register);
UserRouter.post("/sign-In", SignIn);
UserRouter.post("/google-Auth", googleAuth);

module.exports = UserRouter;
