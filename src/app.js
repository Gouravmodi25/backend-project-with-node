const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config({ path: "./.env" });

// router import
const userRouter = require("./routes/user.routes.js");

// cors middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "20kb" }));
// url encoded
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static(path.join(__dirname, "../public")));

// for cookie
app.use(cookieParser());

// route  declaration
app.use("/api/v1/users", userRouter);

module.exports = app;
