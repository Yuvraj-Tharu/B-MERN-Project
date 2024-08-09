const express = require("express");

require("./Model/config");
require("dotenv").config();

const app = express();
app.use(express.json());
const userRouter = require("./routes/user.routes");
app.use("/api/v1", userRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ sucess: false, statusCode, message });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`listening on ${process.env.PORT}`);
});
