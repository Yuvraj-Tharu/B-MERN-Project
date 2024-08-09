const mongoose = require("mongoose");
require("dotenv").config();
(async () => {
  try {
    await mongoose.connect(process.env.MongoDbUrl);
    console.log("connect to database");
  } catch (error) {
    console.log("Error connecting to database", error);
  }
})();
