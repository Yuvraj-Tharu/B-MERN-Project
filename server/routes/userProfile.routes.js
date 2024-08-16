const express = require("express");
const UserProfileRouter = express.Router();

const {
  updateProfile,
  deleteProfile,
  signOut,
} = require("../controllers/user.Profile.Controller");
const { verifyToken } = require("../utils/verifyUser");
UserProfileRouter.put("/update-profile/:userId", verifyToken, updateProfile);
UserProfileRouter.delete("/delete-profile/:userId", verifyToken, deleteProfile);
UserProfileRouter.post("/signout-profile", signOut);

module.exports = UserProfileRouter;
