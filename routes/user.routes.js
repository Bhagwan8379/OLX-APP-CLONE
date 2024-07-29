
const router = require("express").Router()
const userController = require("./../controllers/user.controller")
const { userProtected } = require("../middleware/protected")

router
    .post("/verify-user-email", userProtected, userController.VerifyUserEmail)
    .post("/verify-user-email-otp", userProtected, userController.VerifyEmailOTP)
    .post("/verify-user-mobile-otp", userProtected, userController.VerifyMobileOTP)

module.exports = router