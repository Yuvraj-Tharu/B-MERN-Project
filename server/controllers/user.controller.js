const User = require("../Model/user.model");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  const { userName, email, password } = req.body;

  // Validation check
  if (
    !email ||
    !email ||
    !password ||
    userName.trim() === "" ||
    email.trim() === "" ||
    password.trim() === ""
  ) {
    return next(new ApiError(400, "All fields are required"));
  }

  try {
    const existingUser = await User.findOne({ email });
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

const SignIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email.trim() === "" || password.trim() === "") {
    return next(new ApiError(400, "All fields are required"));
  }

  try {
    const validateUser = await User.findOne({ email });

    if (!validateUser) {
      return next(new ApiError(400, "User not found"));
    }

    const isPasswordValid = await validateUser.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return next(new ApiError(400, "Invalid credentials"));
    }

    const token = jwt.sign({ id: validateUser._id }, process.env.SECRETE_KEY, {
      expiresIn: "1h",
    });

    const { password: pass, ...rest } = validateUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json({ token, message: "Successfully signed in", rest });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, SignIn };
