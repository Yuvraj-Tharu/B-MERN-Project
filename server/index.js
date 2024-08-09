const express = require("express");

require("./Model/config");
require("dotenv").config();

const app = express();
const userRouter = require("./routes/user.routes");
app.use("/api/v1", userRouter);
app.listen(process.env.PORT || 5000, () => {
  console.log(`listening on ${process.env.PORT}`);
});
