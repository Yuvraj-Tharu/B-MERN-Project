const express = require("express");
const UserRouter = express.Router();
const { register, SignIn } = require("../controllers/user.controller");

UserRouter.post("/register", register);
UserRouter.post("/sign-In", SignIn);

module.exports = UserRouter;
