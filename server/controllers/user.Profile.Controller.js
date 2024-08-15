const ApiError = require("../utils/ApiError");
const User = require("../Model/user.model");
const bcrypt = require("bcrypt");
const updateProfile = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(
      new ApiError(401, "You are not allowed to update your profile")
    );
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(new ApiError(402, "Password must be at least 6 characters"));
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }

  if (req.body.userName) {
    if (req.body.userName.length < 7 || req.body.userName.length > 20) {
      return next(new ApiError(403, "user name must be at least 7 characters"));
    }

    if (req.body.userName.includes(" ")) {
      return next(new ApiError(404, "username not conatin any space "));
    }

    if (!req.body.userName.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        new ApiError(405, "user name only conatins numbers and letters")
      );
    }
  }

  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          userName: req.body.userName,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {}
};

module.exports = { updateProfile };
