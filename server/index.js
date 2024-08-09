const express = require("express");

require("./Model/config");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.send("sdsd");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`listening on ${process.env.PORT}`);
});
