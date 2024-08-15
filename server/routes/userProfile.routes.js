const express = require("express");
const UserProfileRouter = express.Router();

const { updateProfile } = require("../controllers/user.Profile.Controller");
const { verifyToken } = require("../utils/verifyUser");
UserProfileRouter.put("/update-profile/:userId", verifyToken, updateProfile);

module.exports = UserProfileRouter;
