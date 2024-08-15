const express = require("express");
let cookieParser = require("cookie-parser");
require("./Model/config");
require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
const userRouter = require("./routes/user.routes");
const UserProfileRouter = require("./routes/userProfile.routes");

// ??user Router
app.use("/api/v1", userRouter);
app.use("/api/v1", UserProfileRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ sucess: false, statusCode, message });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`listening on ${process.env.PORT}`);
});
