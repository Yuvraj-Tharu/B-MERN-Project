const User = require("../Model/user.model");
const ApiError = require("../utils/ApiError");

const register = async (req, res, next) => {
  const { userName, email, password } = req.body;

  // Validation check
  if (
    !userName ||
    !email ||
    !password ||
    userName.trim() === "" ||
    email.trim() === "" ||
    password.trim() === ""
  ) {
    return next(new ApiError(400, "All fields are required"));
  }

  try {
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return next(new ApiError(400, "User already registered"));
    }

    const newUser = new User({ userName, email, password });
    const result = await newUser.save();
    res.status(200).json({ message: "User successfully registered", result });
  } catch (error) {
    next(
      new ApiError(500, "An error occurred during registration", [
        error.message,
      ])
    );
  }
};

module.exports = { register };
