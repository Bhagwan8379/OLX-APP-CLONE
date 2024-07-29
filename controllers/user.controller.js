const asyncHandler = require("express-async-handler")
const User = require("../models/User")
const sendEmail = require("../utils/email")

exports.VerifyUserEmail = asyncHandler(async (req, res) => {
    console.log(req.loggedInUser)
    const result = await User.findById(req.loggedInUser)
    if (!result) {
        return res.status(401).json({ message: "You are Not logged In. Please Login Again" })
    }
    console.log(result)
    const otp = Math.floor(10000 + Math.random() * 900000)
    await User.findByIdAndUpdate(req.loggedInUser, { emailCode: otp })
    await sendEmail({ to: result.email, subject: "Verify Email", message: `<h1> your OTP is ${otp}</h1>` })
    res.json({ message: "Verify User Email Success" })
})
exports.VerifyEmailOTP = asyncHandler(async (req, res) => {
    const { otp } = req.body
    console.log(req.loggedInUser)
    const result = await User.findById(req.loggedInUser)
    if (!result) {
        return res.status(401).json({ message: "You are Not logged In. Please Login Again" })
    }
    if (otp != result.emailCode) {
        return res.status(400).json({ message: "Invalid OTP" })
    }
    await User.findByIdAndUpdate(req.loggedInUser, { emailVerified: true })
    res.json({ message: "User Email Verifyed Success" })
})
exports.VerifyMobileOTP = asyncHandler(async (req, res) => {
    const { otp } = req.body
    console.log(req.loggedInUser)
    const result = await User.findById(req.loggedInUser)
    if (!result) {
        return res.status(401).json({ message: "You are Not logged In. Please Login Again" })
    }
    if (otp != result.mobileCode) {
        return res.status(400).json({ message: "Invalid OTP" })
    }
    await User.findByIdAndUpdate(req.loggedInUser, { mobileVerified: true })
    res.json({ message: "User Mobile Verifyed Success" })
})