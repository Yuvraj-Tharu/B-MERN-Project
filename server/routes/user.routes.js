const express = require("express");
const UserRouter = express.Router();
const { register } = require("../controllers/user.controller");

UserRouter.post("/register", register);

module.exports = UserRouter;
