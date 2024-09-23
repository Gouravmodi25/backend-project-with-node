const { Router } = require("express");
4;
const registerUser = require("../controllers/user.controller.js");

const router = Router();

router.route("/register").post(registerUser);

module.exports = router;
