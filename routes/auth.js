const express = require("express");
const {
  signup,
  signin,
  signout,
  forgotPassword,
  resetPassword,
  socialLogin
} = require("../controllers/auth");
//when the name is index it will auto load in validator folder
const { userSignupValidator, passwordResetValidator } = require("../validator");
const { userById } = require("../controllers/user");
const router = express.Router();

router.post("/social-login", socialLogin);
// password forgot and reset routes
router.put("/forgot-password", forgotPassword);
router.put("/reset-password", passwordResetValidator, resetPassword);

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

//any route contain userId this userById method will run
router.param("userId", userById);

module.exports = router;
