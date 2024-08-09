const { log } = require("console");
const express = require("express");
const PORT = 8080;

const app = express();

app.get("/", (req, res) => {
  res.send("sdsd");
});

app.listen(PORT, (req, res) => {
  console.log("listening on port");
});
