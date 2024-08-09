const express = require("express");
const UserRouter = express.Router();
const { register } = require("../controllers/user.controller");

UserRouter.get("/register", register);

module.exports = UserRouter;
