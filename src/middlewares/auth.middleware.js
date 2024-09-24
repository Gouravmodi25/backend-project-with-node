const asyncHandler = require("../utils/asyncHandler.js");
const ApiError = require("../utils/ApiError.js");
const User = require("../models/user.models.js");
const jwt = require("jsonwebtoken");

const jwtVerify = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log("decodedToken:", decodedToken);

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );
    // console.log("logoutUser:", user);

    if (!user) {
      throw new ApiError(401, "Invalid Token");
    }

    req.user = user;
    // console.log("reqUser:", req.user);
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

module.exports = jwtVerify;
