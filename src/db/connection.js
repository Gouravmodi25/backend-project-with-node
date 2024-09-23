require("dotenv").config();
const mongoose = require("mongoose");
const DB_NAME = require("../constant");

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      "MONGO DB!! Database is connected to server at",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.log("MongoDB connection Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
