const User = require("../Model/user.model");

const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(200).json({ message: "User already registered" });
    }
    if (
      !userName ||
      !email ||
      !password ||
      userName == "" ||
      email == "" ||
      password == ""
    ) {
      return res.status(404).json({ message: "all fields are required" });
    }

    const newUser = new User({ userName, email, password });
    let result = await newUser.save();
    res.status(200).json({ message: "User successfully registered", result });
  } catch (error) {
    console.log("Error: " + error);
  }
};

module.exports = { register };
