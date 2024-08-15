const express = require("express");
const UserRouter = express.Router();
const {
  register,
  SignIn,
  googleAuth,
  facebookOauth,
} = require("../controllers/user.controller");

UserRouter.post("/register", register);
UserRouter.post("/sign-In", SignIn);
UserRouter.post("/google-Auth", googleAuth);
UserRouter.post("/facebook-Auth", facebookOauth);
UserRouter.put("/facebook-Auth", facebookOauth);

module.exports = UserRouter;
