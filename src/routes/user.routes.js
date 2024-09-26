const { Router } = require("express");
const upload = require("../middlewares/multer.middleware.js");
const jwtVerify = require("../middlewares/auth.middleware.js");

const {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changePassword,
  getCurrentUser,
  updateUserDetail,
  updateUserAvatar,
  updateUserCoverImage,
  getChannelProfile,
  getWatchHistory,
} = require("../controllers/user.controller.js");

const router = Router();

// register user route
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

// login route
router.route("/login").post(loginUser);

// secured routes
// logout route
router.route("/logout").post(jwtVerify, logoutUser);

// change Password route
router.route("/changePassword").post(jwtVerify, changePassword);

// get current user after logged in
router.route("/getCurrentUser").get(jwtVerify, getCurrentUser);

// updateUserDetails route
router.route("/updateUserDetails").patch(jwtVerify, updateUserDetail);

// update avatar
router
  .route("/updateUserAvatar")
  .patch(upload.single("avatar"), jwtVerify, updateUserAvatar);

// update coverImage
router
  .route("/updateUserCoverImage")
  .patch(upload.single("coverImage"), jwtVerify, updateUserCoverImage);

// getChannelProfile route
router.route("/getChannelProfile/:username").get(jwtVerify, getChannelProfile);

// get watch history route
router.route("/history").get(jwtVerify, getWatchHistory);

// update refresh access token after logged in
router.route("/refreshAccess-token").post(refreshAccessToken);

module.exports = router;
