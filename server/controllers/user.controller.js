const User = require("../Model/user.model");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const { userName, email, password } = req.body;

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
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ApiError(400, "User with this email already exists"));
    }

    const newUser = new User({ userName, email, password });
    const result = await newUser.save();
    res.status(201).json({ message: "User successfully registered", result });
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

const googleAuth = async (req, res, next) => {
  const { userName, email, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.SECRETE_KEY);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json({ token, message: "Successfully signed in", rest });
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-3) +
        Math.random().toString().slice(-3);
      const newUser = new User({
        userName:
          userName.toLowerCase().split("").join("") +
          Math.random().toString(36).slice(-4),
        email: email,
        password: generatePassword,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { googleAuth };

module.exports = { register, SignIn, googleAuth };
