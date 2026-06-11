
//import the required modules
const express = require("express")
const router = express.Router()

const { login, signup, sendotp, changePassword } = require("../controllers/Auth")
const { resetPasswordToken, resetPassword } = require("../controllers/ResetPassword");
const { auth } = require("../middlewares/auth")


//routes for Login, signup, and varification
//Authencation routes
//Route for user login
router.post("/login", login)
//Route for user signup
router.post("/signup", signup)
//route for sending OTP to the user's email
router.post("/sendotp", sendotp)
//router for Changing the password
router.post("/changepassword", auth, changePassword)
//route for resetPassword
router.post("/resetPassword", auth, resetPassword,)
//route for resetPasswordToken
router.post("/resetPasswordToken", auth, resetPasswordToken)
module.exports = router;
