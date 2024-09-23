const mongoose = require("mongoose");
const connectDB = require("./db/connection");
require("dotenv").config({ path: "./.env" });
const app = require("./app");
const PORT = process.env.PORT || 3000;

// Data connection to server
connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error", error);
      throw error;
    });
    app.listen(PORT, () => {
      console.log(`Server is started at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection Failed", error);
  });
