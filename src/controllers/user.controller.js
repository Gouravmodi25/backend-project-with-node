const ApiError = require("../utils/ApiError.js");
const User = require("../models/user.models.js");
const asyncHandler = require("../utils/asyncHandler.js");
const uploadOnCloudinary = require("../utils/cloudinary.js");
const ApiResponse = require("../utils/ApiResponse.js");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullName, password } = req.body;
  console.log(email);

  if (
    [fullName, username, password, email].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "Username and email is already existed");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // upload on cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  // create user entry
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage.url,
    username: username.toLowerCase(),
    email,
    password,
  });

  // remove password and refresh token
  const createUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully ", createUser));
});

module.exports = registerUser;
