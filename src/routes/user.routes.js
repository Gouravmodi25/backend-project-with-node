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
} = require("../controllers/user.controller.js");

const router = Router();

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

router.route("/login").post(loginUser);
// secured routes
router.route("/logout").post(jwtVerify, logoutUser);
router.route("/changePassword").post(jwtVerify, changePassword);
router.route("/getCurrentUser").get(jwtVerify, getCurrentUser);
router.route("/updateUserDetails").post(jwtVerify, updateUserDetail);
// update avatar

router
  .route("/updateUserAvatar")
  .post(upload.single("avatar"), jwtVerify, updateUserAvatar);

// update coverImage
router
  .route("/updateUserCoverImage")
  .post(upload.single("coverImage"), jwtVerify, updateUserCoverImage);

router.route("/getChannelProfile/:username").get(jwtVerify, getChannelProfile);

router.route("/refresh-token").post(refreshAccessToken);

module.exports = router;
