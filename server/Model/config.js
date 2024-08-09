const mongoose = require("mongoose");
require("dotenv").config();
(async () => {
  try {
    await mongoose.connect(process.env.MongoDbUrl);
    // await mongoose.connect("mongodb://127.0.0.1:27017/mern-blog");
    // console.log(process.env.MongoDbUrl);

    console.log("connect to database");
  } catch (error) {
    console.log("Error connecting to database", error);
  }
})();
