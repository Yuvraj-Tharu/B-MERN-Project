const jwt = require("jsonwebtoken");
const ApiError = require("./ApiError");
// const User = require("../Model/user.model");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    next(ApiError(400, "token not found"));
  }

  jwt.verify(token, process.env.SECRETE_KEY, (err, user) => {
    if (err) {
      return next(ApiError(500, "unauthorized", err));
    }
    req.user = user;
    next();
  });
};

module.exports = { verifyToken };
